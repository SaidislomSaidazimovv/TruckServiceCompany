// import React, { useEffect, useState } from "react";
// import { useParams, Link } from "react-router-dom";
// import { supabase } from "../lib/supabase";
// import {
//   Check,
//   X,
//   ExternalLink,
//   Star,
//   Shield,
//   Smartphone,
//   ArrowLeft,
//   MapPin,
//   Briefcase,
//   Users,
//   Wrench,
//   Globe,
// } from "lucide-react";

// export default function CompanyDetail() {
//   const { id } = useParams();
//   const [company, setCompany] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     async function fetchCompany() {
//       try {
//         const { data, error } = await supabase
//           .from("companies")
//           .select("*")
//           .eq("id", id)
//           .single();

//         if (error) throw error;
//         setCompany(data);
//       } catch (error) {
//         console.error("Error fetching company:", error);
//       } finally {
//         setLoading(false);
//       }
//     }
//     fetchCompany();
//   }, [id]);

//   if (loading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-slate-50">
//         <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
//       </div>
//     );
//   }

//   if (!company) {
//     return (
//       <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50">
//         <h2 className="text-2xl font-bold text-slate-800 mb-4">
//           Company Not Found
//         </h2>
//         <Link to="/" className="text-blue-600 hover:underline">
//           Go back to Home
//         </Link>
//       </div>
//     );
//   }

//   const logoUrl = `https://ui-avatars.com/api/?name=${company.name}&background=random&color=fff&size=128&font-size=0.33`;
//   const primaryServices = company.services_hub?.primary_services || [];
//   const amenities = company.amenities_detailed || {};

//   return (
//     <div className="min-h-screen bg-slate-50 pb-20">
//       <div className="bg-white border-b sticky top-0 z-20">
//         <div className="container mx-auto px-4 py-6">
//           <Link
//             to="/"
//             className="text-slate-500 hover:text-blue-600 flex items-center gap-2 mb-6 text-sm font-medium transition-colors w-fit"
//           >
//             <ArrowLeft size={16} /> Back to Directory
//           </Link>
//           <div className="flex flex-col md:flex-row gap-8 items-start">
//             <div className="w-28 h-28 bg-white border rounded-2xl p-4 flex items-center justify-center shadow-sm shrink-0">
//               <img
//                 src={logoUrl}
//                 alt={company.name}
//                 className="w-full h-full object-contain rounded-md"
//               />
//             </div>
//             <div className="flex-1">
//               <div className="flex flex-wrap items-center gap-3 mb-3">
//                 <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 leading-tight">
//                   {company.name}
//                 </h1>
//                 <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide border border-blue-200">
//                   {company.category}
//                 </span>
//               </div>
//               <p className="text-lg text-slate-600 max-w-3xl leading-relaxed mb-6">
//                 {company.slogan ||
//                   "Providing top-tier services for the trucking industry."}
//               </p>
//               <div className="flex flex-wrap gap-4">
//                 <a
//                   href={company.website}
//                   target="_blank"
//                   rel="noreferrer"
//                   className="bg-blue-600 text-white px-6 py-2.5 rounded-lg font-bold hover:bg-blue-700 transition flex items-center gap-2 shadow-lg shadow-blue-600/20 active:scale-95"
//                 >
//                   Visit Website <ExternalLink size={18} />
//                 </a>
//                 <div className="flex items-center gap-1.5 text-yellow-500 font-bold text-lg border px-4 py-2 rounded-lg bg-white shadow-sm">
//                   <Star className="fill-current w-5 h-5" /> 4.8
//                   <span className="text-slate-400 font-normal text-sm ml-1">
//                     (Verified)
//                   </span>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//       <div className="container mx-auto px-4 py-10 grid grid-cols-1 lg:grid-cols-3 gap-8">
//         <div className="lg:col-span-2 space-y-8">
//           <section className="bg-white rounded-2xl p-8 shadow-sm border border-slate-200">
//             <h2 className="text-xl font-bold mb-6 flex items-center gap-2 text-slate-900">
//               <Wrench className="text-blue-600" /> Service Capabilities
//             </h2>
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               <div className="flex justify-between items-center p-4 bg-slate-50 rounded-xl border border-slate-100">
//                 <span className="font-medium text-slate-700">
//                   24/7 Availability
//                 </span>
//                 {company.services_hub?.is_24_7 ? (
//                   <Check className="text-green-500" />
//                 ) : (
//                   <X className="text-red-400" />
//                 )}
//               </div>
//               <div className="flex justify-between items-center p-4 bg-slate-50 rounded-xl border border-slate-100">
//                 <span className="font-medium text-slate-700">
//                   Roadside Assistance
//                 </span>
//                 {company.services_hub?.roadside_assistance ? (
//                   <Check className="text-green-500" />
//                 ) : (
//                   <X className="text-red-400" />
//                 )}
//               </div>
//               <div className="flex justify-between items-center p-4 bg-slate-50 rounded-xl border border-slate-100">
//                 <span className="font-medium text-slate-700">
//                   Mobile Service
//                 </span>
//                 {company.services_hub?.mobile_service ? (
//                   <Check className="text-green-500" />
//                 ) : (
//                   <X className="text-red-400" />
//                 )}
//               </div>
//               <div className="md:col-span-2 mt-2 p-4 bg-blue-50 rounded-xl border border-blue-100 text-blue-800 text-sm">
//                 <span className="font-bold">Warranty Policy:</span>{" "}
//                 {company.services_hub?.warranty_policy ||
//                   "Contact for details."}
//               </div>
//             </div>
//           </section>
//           <section className="bg-white rounded-2xl p-8 shadow-sm border border-slate-200">
//             <h2 className="text-xl font-bold mb-6 flex items-center gap-2 text-slate-900">
//               <Shield className="text-green-600" /> Primary Services Offered
//             </h2>
//             <div className="grid md:grid-cols-2 gap-x-8 gap-y-3">
//               {primaryServices.map((service, index) => (
//                 <div
//                   key={index}
//                   className="flex items-start gap-3 p-2 hover:bg-slate-50 rounded-lg transition-colors"
//                 >
//                   <div className="bg-green-100 p-1 rounded-full mt-0.5">
//                     <Check
//                       size={14}
//                       className="text-green-600"
//                       strokeWidth={3}
//                     />
//                   </div>
//                   <span className="text-slate-700 font-medium">{service}</span>
//                 </div>
//               ))}
//             </div>
//           </section>
//           <section className="bg-white rounded-2xl p-8 shadow-sm border border-slate-200">
//             <h2 className="text-xl font-bold mb-6">Amenities & Features</h2>
//             <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
//               {Object.entries(amenities).map(([key, value]) => {
//                 if (key === "food_options") return null; // Food options ni alohida chiqaramiz pastroqda
//                 return (
//                   <div
//                     key={key}
//                     className="p-4 bg-slate-50 rounded-xl border text-center"
//                   >
//                     <div className="text-xs text-slate-500 uppercase font-bold mb-1">
//                       {key.replace(/_/g, " ")}
//                     </div>
//                     <div className="font-semibold text-slate-900">
//                       {value === true ? "Yes" : value === false ? "No" : value}
//                     </div>
//                   </div>
//                 );
//               })}
//             </div>
//           </section>
//         </div>
//         <div className="space-y-6">
//           <div className="bg-slate-900 text-white rounded-2xl p-6 shadow-xl ring-1 ring-white/10">
//             <h3 className="text-lg font-bold mb-5 flex items-center gap-2">
//               <Briefcase size={18} className="text-blue-400" /> Company Metrics
//             </h3>
//             <div className="space-y-5">
//               <div className="flex justify-between items-center border-b border-slate-700 pb-3">
//                 <span className="text-slate-400 text-sm">Founded</span>
//                 <span className="font-bold">{company.founded_year}</span>
//               </div>
//               <div className="flex justify-between items-center border-b border-slate-700 pb-3">
//                 <span className="text-slate-400 text-sm">Locations</span>
//                 <span className="font-bold text-white">
//                   {company.metrics?.locations_count || "N/A"}
//                 </span>
//               </div>
//               <div className="flex justify-between items-center border-b border-slate-700 pb-3">
//                 <span className="text-slate-400 text-sm">Employees</span>
//                 <span className="font-bold">
//                   {company.metrics?.employees_count || "N/A"}
//                 </span>
//               </div>
//               <div className="flex justify-between items-center">
//                 <span className="text-slate-400 text-sm">Revenue (Est)</span>
//                 <span className="font-bold text-green-400">
//                   {company.metrics?.annual_revenue_est || "Private"}
//                 </span>
//               </div>
//             </div>
//             <div className="mt-8 pt-6 border-t border-slate-700">
//               <div className="text-xs text-slate-500 uppercase font-bold mb-2">
//                 Contact Support
//               </div>
//               <div className="text-lg font-bold text-white mb-1">
//                 {company.contact?.main_phone || "N/A"}
//               </div>
//               <div className="text-sm text-blue-400 truncate">
//                 {company.contact?.email}
//               </div>
//             </div>
//           </div>
//           <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
//             <h3 className="font-bold mb-4 flex items-center gap-2 text-slate-900">
//               <MapPin className="text-red-500" /> Headquarters
//             </h3>
//             <div className="text-slate-600 text-sm leading-relaxed">
//               <p className="font-semibold text-slate-900">
//                 {company.headquarters?.address}
//               </p>
//               <p>
//                 {company.headquarters?.city}, {company.headquarters?.state}{" "}
//                 {company.headquarters?.zip}
//               </p>
//               <p className="mt-1 text-slate-400">
//                 {company.headquarters?.country}
//               </p>
//             </div>
//           </div>
//           <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
//             <h3 className="font-bold mb-4 flex items-center gap-2">
//               <Smartphone className="text-purple-600" /> Mobile App
//             </h3>
//             {company.app_info?.app_name ? (
//               <div>
//                 <div className="font-bold text-lg text-slate-900 mb-2">
//                   {company.app_info.app_name}
//                 </div>
//                 <div className="flex gap-2 mb-4">
//                   {company.app_info.platforms?.map((p) => (
//                     <span
//                       key={p}
//                       className="bg-slate-100 text-slate-600 px-2 py-1 rounded text-xs font-bold border"
//                     >
//                       {p}
//                     </span>
//                   ))}
//                 </div>
//                 <ul className="space-y-2">
//                   {company.app_info.features?.map((feat, i) => (
//                     <li
//                       key={i}
//                       className="text-sm text-slate-500 flex items-center gap-2"
//                     >
//                       <div className="w-1.5 h-1.5 bg-purple-500 rounded-full"></div>{" "}
//                       {feat}
//                     </li>
//                   ))}
//                 </ul>
//               </div>
//             ) : (
//               <div className="text-slate-500 italic">
//                 No official mobile app listed.
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }



import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { supabase } from "../lib/supabase";
import { motion } from "framer-motion"; // Animatsiya uchun
import {
  Check,
  X,
  ExternalLink,
  Star,
  Shield,
  Smartphone,
  ArrowLeft,
  MapPin,
  Briefcase,
  Users,
  Wrench,
  Zap,
  Clock,
  Calendar,
  Truck
} from "lucide-react";

// Animatsiya variantlari
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { type: "spring", stiffness: 50 } 
  }
};

export default function CompanyDetail() {
  const { id } = useParams();
  const [company, setCompany] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCompany() {
      try {
        const { data, error } = await supabase
          .from("companies")
          .select("*")
          .eq("id", id)
          .single();

        if (error) throw error;
        setCompany(data);
      } catch (error) {
        console.error("Error fetching company:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchCompany();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="flex flex-col items-center gap-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-4 border-blue-600"></div>
          <p className="text-slate-500 font-medium animate-pulse">Loading company details...</p>
        </div>
      </div>
    );
  }

  if (!company) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 text-center px-4">
        <div className="bg-white p-8 rounded-2xl shadow-xl border border-slate-100 max-w-md w-full">
          <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-4">
            <X size={32} className="text-red-500" />
          </div>
          <h2 className="text-2xl font-bold text-slate-800 mb-2">Company Not Found</h2>
          <p className="text-slate-500 mb-6">The company you are looking for might have been removed or does not exist.</p>
          <Link to="/" className="inline-flex items-center justify-center w-full py-3 px-6 bg-slate-900 text-white rounded-xl font-bold hover:bg-slate-800 transition-all active:scale-95">
            Go back to Home
          </Link>
        </div>
      </div>
    );
  }

  const logoUrl = `https://ui-avatars.com/api/?name=${company.name}&background=random&color=fff&size=128&font-size=0.33`;
  const primaryServices = company.services_hub?.primary_services || [];
  const amenities = company.amenities_detailed || {};

  return (
    <motion.div 
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="min-h-screen bg-slate-50 pb-20 relative overflow-hidden"
    >
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-b from-blue-50 to-slate-50 -z-10" />
      <div className="absolute top-[-100px] right-[-100px] w-[500px] h-[500px] bg-blue-100/40 rounded-full blur-[100px] -z-10" />

      {/* Sticky Header */}
      <div className="sticky top-0 z-30 bg-white/80 backdrop-blur-xl border-b border-slate-200/60 shadow-sm transition-all">
        <div className="container mx-auto px-4 py-6">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-slate-500 hover:text-blue-600 font-medium transition-colors mb-6 group"
          >
            <div className="p-1.5 rounded-full bg-slate-100 group-hover:bg-blue-50 transition-colors">
               <ArrowLeft size={16} className="group-hover:-translate-x-0.5 transition-transform" /> 
            </div>
            Back to Directory
          </Link>
          
          <motion.div variants={itemVariants} className="flex flex-col md:flex-row gap-8 items-start">
            <motion.div 
              whileHover={{ scale: 1.02 }}
              className="w-24 h-24 md:w-32 md:h-32 bg-white rounded-2xl p-4 flex items-center justify-center shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 shrink-0"
            >
              <img
                src={logoUrl}
                alt={company.name}
                className="w-full h-full object-contain rounded-lg"
              />
            </motion.div>
            
            <div className="flex-1 w-full">
              <div className="flex flex-wrap items-center gap-3 mb-3">
                <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 leading-tight tracking-tight">
                  {company.name}
                </h1>
                <span className="bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-700 px-3 py-1 rounded-lg text-xs font-bold uppercase tracking-wide border border-blue-100/50 shadow-sm">
                  {company.category?.split("&")[0]}
                </span>
              </div>
              
              <p className="text-lg text-slate-600 max-w-3xl leading-relaxed mb-6 font-medium">
                {company.slogan || "Providing top-tier services for the trucking industry."}
              </p>

              <div className="flex flex-wrap gap-4">
                <a
                  href={company.website}
                  target="_blank"
                  rel="noreferrer"
                  className="bg-slate-900 text-white px-6 py-3 rounded-xl font-bold hover:bg-blue-600 transition-all flex items-center gap-2 shadow-lg shadow-slate-900/20 active:scale-95 group"
                >
                  Visit Website <ExternalLink size={18} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </a>
                <div className="flex items-center gap-2 text-slate-700 font-bold text-lg border border-slate-200 px-5 py-3 rounded-xl bg-white shadow-sm">
                  <Star className="fill-yellow-400 text-yellow-400 w-5 h-5" /> 
                  4.8
                  <span className="text-slate-400 font-normal text-sm border-l border-slate-200 pl-2 ml-1">
                    Verified
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-10 grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* LEFT COLUMN */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* Capabilities Card */}
          <motion.section variants={itemVariants} className="bg-white rounded-3xl p-8 shadow-sm border border-slate-200 overflow-hidden relative">
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50 rounded-bl-[100px] -z-0 opacity-50" />
            <h2 className="text-xl font-bold mb-6 flex items-center gap-3 text-slate-900 relative z-10">
              <div className="p-2 bg-blue-100 text-blue-600 rounded-lg">
                <Wrench size={20} /> 
              </div>
              Service Capabilities
            </h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 relative z-10">
              <div className="flex justify-between items-center p-4 bg-slate-50 rounded-2xl border border-slate-100 hover:border-blue-200 transition-colors">
                <div className="flex items-center gap-3">
                  <Clock size={18} className="text-slate-400" />
                  <span className="font-semibold text-slate-700">24/7 Availability</span>
                </div>
                {company.services_hub?.is_24_7 ? (
                  <div className="bg-green-100 text-green-700 px-2 py-1 rounded-md text-xs font-bold flex items-center gap-1">
                    <Check size={12} strokeWidth={4} /> YES
                  </div>
                ) : (
                  <div className="bg-slate-200 text-slate-500 px-2 py-1 rounded-md text-xs font-bold">NO</div>
                )}
              </div>

              <div className="flex justify-between items-center p-4 bg-slate-50 rounded-2xl border border-slate-100 hover:border-blue-200 transition-colors">
                <div className="flex items-center gap-3">
                  <Zap size={18} className="text-slate-400" />
                  <span className="font-semibold text-slate-700">Roadside Assist</span>
                </div>
                {company.services_hub?.roadside_assistance ? (
                  <div className="bg-green-100 text-green-700 px-2 py-1 rounded-md text-xs font-bold flex items-center gap-1">
                    <Check size={12} strokeWidth={4} /> YES
                  </div>
                ) : (
                  <div className="bg-slate-200 text-slate-500 px-2 py-1 rounded-md text-xs font-bold">NO</div>
                )}
              </div>

              <div className="flex justify-between items-center p-4 bg-slate-50 rounded-2xl border border-slate-100 hover:border-blue-200 transition-colors">
                <div className="flex items-center gap-3">
                  <Truck size={18} className="text-slate-400" />
                  <span className="font-semibold text-slate-700">Mobile Service</span>
                </div>
                {company.services_hub?.mobile_service ? (
                  <div className="bg-green-100 text-green-700 px-2 py-1 rounded-md text-xs font-bold flex items-center gap-1">
                    <Check size={12} strokeWidth={4} /> YES
                  </div>
                ) : (
                  <div className="bg-slate-200 text-slate-500 px-2 py-1 rounded-md text-xs font-bold">NO</div>
                )}
              </div>
              
              <div className="sm:col-span-2 mt-2 p-5 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl border border-blue-100/50 flex gap-4 items-start">
                 <Shield className="text-blue-600 shrink-0 mt-0.5" size={20} />
                 <div>
                    <h4 className="font-bold text-blue-900 text-sm mb-1">Warranty Policy</h4>
                    <p className="text-blue-700 text-sm leading-relaxed opacity-90">
                      {company.services_hub?.warranty_policy || "Contact the provider for specific warranty details."}
                    </p>
                 </div>
              </div>
            </div>
          </motion.section>

          {/* Primary Services */}
          <motion.section variants={itemVariants} className="bg-white rounded-3xl p-8 shadow-sm border border-slate-200">
            <h2 className="text-xl font-bold mb-6 flex items-center gap-3 text-slate-900">
              <div className="p-2 bg-green-100 text-green-600 rounded-lg">
                <Check size={20} strokeWidth={3} /> 
              </div>
              Primary Services
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
               {primaryServices.map((service, index) => (
                 <motion.div 
                    whileHover={{ x: 5 }}
                    key={index} 
                    className="flex items-center gap-3 p-3 pl-4 bg-slate-50 rounded-xl border border-slate-100 hover:bg-white hover:shadow-md hover:border-blue-100 transition-all cursor-default"
                 >
                    <div className="w-2 h-2 bg-green-500 rounded-full shrink-0" />
                    <span className="text-slate-700 font-semibold">{service}</span>
                 </motion.div>
               ))}
            </div>
          </motion.section>

          {/* Amenities */}
          <motion.section variants={itemVariants} className="bg-white rounded-3xl p-8 shadow-sm border border-slate-200">
            <h2 className="text-xl font-bold mb-6 flex items-center gap-3">
               <div className="p-2 bg-orange-100 text-orange-600 rounded-lg">
                <Star size={20} /> 
              </div>
              Amenities & Features
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {Object.entries(amenities).map(([key, value]) => {
                if (key === "food_options") return null;
                const isAvailable = value === true || (typeof value === 'string' && value !== "No");
                
                return (
                  <div key={key} className={`p-4 rounded-2xl border text-center transition-all ${
                    isAvailable ? "bg-slate-50 border-slate-100" : "bg-slate-50/50 border-slate-50 opacity-60"
                  }`}>
                    <div className="text-[10px] text-slate-400 uppercase font-extrabold tracking-wider mb-2">
                      {key.replace(/_/g, " ")}
                    </div>
                    <div className={`font-bold text-sm ${isAvailable ? "text-slate-900" : "text-slate-400"}`}>
                      {value === true ? "Available" : value === false ? "Not Available" : value}
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.section>
        </div>

        {/* RIGHT COLUMN (Sidebar) */}
        <motion.div variants={itemVariants} className="space-y-6">
          
          {/* Metrics Card (Dark Theme) */}
          <div className="bg-slate-900 text-white rounded-3xl p-8 shadow-2xl ring-1 ring-white/10 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-40 h-40 bg-blue-600 rounded-full blur-[80px] opacity-20 -z-0"></div>
            
            <h3 className="text-lg font-bold mb-6 flex items-center gap-3 relative z-10">
              <Briefcase className="text-blue-400" /> Company Metrics
            </h3>
            
            <div className="space-y-6 relative z-10">
              <div className="flex justify-between items-center pb-4 border-b border-white/10">
                <span className="text-slate-400 text-sm font-medium flex items-center gap-2">
                   <Calendar size={14} /> Founded
                </span>
                <span className="font-bold text-lg">{company.founded_year}</span>
              </div>
              <div className="flex justify-between items-center pb-4 border-b border-white/10">
                <span className="text-slate-400 text-sm font-medium flex items-center gap-2">
                   <MapPin size={14} /> Locations
                </span>
                <span className="font-bold text-lg">{company.metrics?.locations_count || "N/A"}</span>
              </div>
              <div className="flex justify-between items-center pb-4 border-b border-white/10">
                <span className="text-slate-400 text-sm font-medium flex items-center gap-2">
                   <Users size={14} /> Employees
                </span>
                <span className="font-bold text-lg">{company.metrics?.employees_count || "N/A"}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-400 text-sm font-medium">Est. Revenue</span>
                <span className="font-bold text-lg text-green-400">{company.metrics?.annual_revenue_est || "Private"}</span>
              </div>
            </div>
            
            <div className="mt-8 pt-6 border-t border-white/10 relative z-10">
               <div className="text-xs text-slate-500 uppercase font-bold mb-2">Support Contact</div>
               <div className="text-xl font-bold text-white mb-1 tracking-wide">{company.contact?.main_phone || "N/A"}</div>
               <div className="text-sm text-blue-400 truncate hover:text-blue-300 cursor-pointer transition-colors">
                 {company.contact?.email}
               </div>
            </div>
          </div>

          {/* Headquarters */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm">
            <h3 className="font-bold mb-4 flex items-center gap-3 text-slate-900">
              <div className="p-2 bg-red-100 text-red-500 rounded-lg">
                 <MapPin size={18} /> 
              </div>
              Headquarters
            </h3>
            <div className="text-slate-600 text-sm leading-relaxed pl-1">
               <p className="font-bold text-slate-900 text-base mb-1">{company.headquarters?.address}</p>
               <p>{company.headquarters?.city}, {company.headquarters?.state} {company.headquarters?.zip}</p>
               <p className="mt-2 text-slate-400 font-medium uppercase text-xs tracking-wider">{company.headquarters?.country}</p>
            </div>
          </div>

          {/* Mobile App */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm">
            <h3 className="font-bold mb-4 flex items-center gap-3 text-slate-900">
              <div className="p-2 bg-purple-100 text-purple-600 rounded-lg">
                 <Smartphone size={18} /> 
              </div>
              Mobile App
            </h3>
            {company.app_info?.app_name ? (
              <div>
                 <div className="font-bold text-lg text-slate-900 mb-3">{company.app_info.app_name}</div>
                 <div className="flex gap-2 mb-5">
                    {company.app_info.platforms?.map(p => (
                       <span key={p} className="bg-slate-100 text-slate-600 px-3 py-1.5 rounded-lg text-xs font-bold border border-slate-200">
                         {p}
                       </span>
                    ))}
                 </div>
                 <ul className="space-y-3">
                    {company.app_info.features?.map((feat, i) => (
                       <li key={i} className="text-sm text-slate-600 flex items-start gap-3">
                          <div className="w-1.5 h-1.5 bg-purple-500 rounded-full mt-1.5 shrink-0"></div> 
                          <span className="leading-snug">{feat}</span>
                       </li>
                    ))}
                 </ul>
              </div>
            ) : (
              <div className="text-slate-400 italic text-sm p-4 bg-slate-50 rounded-xl text-center">
                No official mobile app listed.
              </div>
            )}
          </div>

        </motion.div>
      </div>
    </motion.div>
  );
}