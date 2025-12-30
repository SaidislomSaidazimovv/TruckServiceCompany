import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { Link } from 'react-router-dom';
import L from 'leaflet';

import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41]
});

L.Marker.prototype.options.icon = DefaultIcon;

const CITY_COORDINATES = {
    "Oklahoma City": [35.4676, -97.5164],
    "Westlake": [41.4587, -81.9287],
    "Knoxville": [35.9606, -83.9207],
    "Reading": [40.3356, -75.9269],
    "Miami": [25.7617, -80.1918],
    "Omaha": [41.2565, -95.9345],
    "Grand Island": [40.9264, -98.3420],
    "Atlanta": [33.7490, -84.3880],
    "Walnut Creek": [37.9101, -122.0652],
    "New Braunfels": [29.7030, -98.1245],
    "Columbia": [34.0007, -81.0348],
    "Minneapolis": [44.9778, -93.2650],
    "Athens": [33.9519, -83.3576],
    "Savannah": [32.0809, -81.0912],
    "Dublin": [40.0992, -83.1141],
    "Leawood": [38.9667, -94.6169],
    "Green Bay": [44.5192, -88.0198],
    "Columbus": [39.9612, -82.9988],
    "La Crosse": [43.8138, -91.2519],
    "New Plymouth": [43.9702, -116.8208],
    "Whittier": [33.9792, -118.0328],
    "Greensboro": [36.0726, -79.7920],
    "Brentwood": [36.0331, -86.7828],
    "Altoona": [40.5187, -78.3947],
    "Overland Park": [38.9822, -94.6708],
    "City of Industry": [34.0197, -117.9587],
    "Amarillo": [35.2220, -101.8313],
    "Jacksonville": [30.3322, -81.6557],
    "Memphis": [35.1495, -90.0490],
    "South St. Paul": [44.8897, -93.0372],
    "Indianapolis": [39.7684, -86.1581],
    "Durand": [44.6291, -91.9644],
    "Lake Success": [40.7709, -73.7118],
    "Irving": [32.8140, -96.9489],
    "Bend": [44.0582, -121.3153],
    "Eugene": [44.0521, -123.0868],
    "Barrington": [42.1539, -88.1362],
    "Downers Grove": [41.8089, -88.0112],
    "Hartland": [43.1053, -88.3370],
    "Houston": [29.7604, -95.3698],
    "Portland": [45.5152, -122.6784],
    "Bethlehem": [40.6259, -75.3705],
    "Monroe": [32.5093, -92.1193],
    "St. Louis": [38.6270, -90.1994],
    "Girard": [41.1556, -80.7018],
    "Milwaukee": [43.0389, -87.9065],
    "Dallas": [32.7767, -96.7970],
    "Springfield": [37.2090, -93.2923],
    "Nashville": [36.1627, -86.7816],
    "Wilkes-Barre": [41.2459, -75.8813],
    "Butte": [46.0038, -112.5348],
    "Salt Lake City": [40.7608, -111.8910],
    "Portsmouth": [43.0718, -70.7626],
    "Dubuque": [42.5006, -90.6648],
    "Brighton": [39.9847, -104.8202],
    "Normal": [40.5142, -88.9906],
    "Jamaica": [40.7027, -73.7890],
    "Montgomery": [32.3668, -86.3000],
    "Abilene": [32.4487, -99.7331],
    "Pacific": [47.2662, -122.2515],
    "Rochester": [44.0121, -92.4802],
    "Roanoke": [37.2710, -79.9414],
    "Canton": [40.7989, -81.3785],
    "Norwell": [42.1618, -70.8245],
    "Avon": [42.9106, -77.7558],
    "Crossville": [35.9470, -85.0270],
    "Potosi": [37.9351, -90.7879],
    "Byron Center": [42.8256, -85.6664],
    "Butler": [40.8612, -79.8953],
    "Alpharetta": [34.0754, -84.2941],
    "Rockford": [42.2711, -89.0940],
    "Tulsa": [36.1540, -95.9928],
    "Norcross": [33.9412, -84.2135],
    "Fargo": [46.8772, -96.7898],
    "Aurora": [39.7294, -104.8319],
    "Burnaby": [49.2488, -122.9805],
    "Toledo": [41.6528, -83.5379],
    "Fresno": [36.7378, -119.7871],
    "Akron": [41.0814, -81.5190],
    "Whiteville": [34.3316, -78.7008],
    "Deland": [29.0283, -81.3031],
    "Ankeny": [41.7305, -93.6002],
    "Vermillion": [42.7794, -96.9292],
    "Teutopolis": [39.1278, -88.4795],
    "Charlotte": [35.2271, -80.8431],
    "Bartlett": [41.9786, -88.2144],
    "Birmingham": [33.5186, -86.8104],
    "Shippensburg": [40.0506, -77.5205],
    "Manasquan": [40.1265, -74.0435],
    "El Paso": [31.7619, -106.4850],
    "White City": [42.4385, -122.8428],
    "Cincinnati": [39.1031, -84.5120],
    "Voorhees": [39.8515, -74.9935],
    "Westborough": [42.2695, -71.6161],
    "Santa Ana": [33.7455, -117.8677]
};

const DEFAULT_CENTER = [39.8283, -98.5795];

export default function MapComponent({ companies }) {
    const markers = companies.map(company => {
        const city = company.headquarters?.city;
        const coords = CITY_COORDINATES[city] || null;
        return { ...company, coords };
    }).filter(c => c.coords !== null);

    return (
        <div className="h-[600px] w-full rounded-2xl overflow-hidden shadow-xl border border-slate-200 z-0 relative">
            <MapContainer
                center={DEFAULT_CENTER}
                zoom={4}
                style={{ height: '100%', width: '100%' }}
                scrollWheelZoom={false}
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {markers.map((company) => (
                    <Marker key={company.id} position={company.coords}>
                        <Popup>
                            <div className="min-w-[200px]">
                                <h3 className="font-bold text-slate-900 text-base mb-1">{company.name}</h3>
                                <p className="text-xs text-slate-500 mb-2">{company.category}</p>
                                <p className="text-xs text-slate-600 mb-3 line-clamp-2">{company.slogan}</p>
                                <Link
                                    to={`/company/${company.id}`}
                                    className="block text-center bg-orange-500 text-white text-xs font-bold py-2 rounded hover:bg-orange-600 transition-colors"
                                >
                                    View Profile
                                </Link>
                            </div>
                        </Popup>
                    </Marker>
                ))}
            </MapContainer>
        </div>
    );
}