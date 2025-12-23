import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Star, Check, ArrowRight, MapPin } from "lucide-react";

const REAL_RATINGS = {
  1: 4.5,
  2: 3.9,
  3: 4.2,
  4: 4.4,
  5: 3.8,
  6: 4.7,
  7: 4.3,
  8: 4.1,
  9: 4.0,
  10: 4.2,
  11: 4.6,
  12: 4.5,
  13: 4.3,
  14: 4.4,
  15: 4.1,
  16: 4.2,
  17: 4.6,
  18: 3.9,
  19: 4.8,
  20: 3.7,
  21: 4.1,
  22: 4.3,
  23: 4.0,
  24: 4.4,
  25: 4.7,
  26: 4.5,
  27: 4.2,
  28: 4.4,
  29: 4.1,
  30: 4.0,
  31: 4.2,
  32: 3.5,
  33: 4.3,
  34: 4.6,
  35: 4.0,
};

export default function CompanyCard({ company, isSelected, toggleSelection }) {
  const logoUrl = `https://ui-avatars.com/api/?name=${company.name}&background=random&color=fff&size=128&font-size=0.33`;
  const description =
    company.slogan || "Trusted service provider for trucking fleets.";
  const services = Array.isArray(company.services_hub?.primary_services)
    ? company.services_hub.primary_services
    : ["General Service"];
  const rating = REAL_RATINGS[company.id] || 4.0;
  const category = company.category?.split("&")[0] || "Service";

  return (
    <motion.div
      layout
      whileHover={{ y: -4 }}
      className={`group bg-white rounded-lg overflow-hidden border transition-all duration-300 h-full flex flex-col ${
        isSelected
          ? "border-orange-500 shadow-lg ring-2 ring-orange-500/20"
          : "border-slate-200 hover:border-slate-300 hover:shadow-lg"
      }`}
    >
      <div className="p-6 border-b border-slate-100 flex-shrink-0">
        <div className="flex items-start justify-between mb-4">
          <div className="w-14 h-14 bg-slate-50 rounded-lg p-2 flex items-center justify-center border border-slate-100">
            <img
              src={logoUrl}
              alt={company.name}
              className="w-full h-full object-contain"
            />
          </div>
          <div className="flex items-center gap-1.5 text-amber-500">
            <Star size={14} className="fill-current" />
            <span className="text-sm font-bold text-slate-700">{rating}</span>
          </div>
        </div>
        <Link to={`/company/${company.id}`}>
          <h3 className="text-lg font-bold text-slate-900 mb-2 hover:text-orange-500 transition-colors line-clamp-1">
            {company.name}
          </h3>
        </Link>
        <p className="text-sm text-slate-600 line-clamp-2 mb-3">
          {description}
        </p>
        <span className="inline-block px-3 py-1 bg-slate-100 text-slate-700 text-xs font-semibold rounded-md">
          {category}
        </span>
      </div>
      <div className="p-6 pt-4 flex-grow">
        <div className="space-y-2 mb-4">
          {services.slice(0, 3).map((service, i) => (
            <div
              key={i}
              className="flex items-center gap-2 text-sm text-slate-700"
            >
              <Check size={14} className="text-emerald-500 shrink-0" />
              <span className="truncate">{service}</span>
            </div>
          ))}
          {services.length > 3 && (
            <div className="text-sm text-slate-500 font-medium">
              +{services.length - 3} more services
            </div>
          )}
        </div>
      </div>
      <div className="p-6 pt-0 flex gap-3 mt-auto flex-shrink-0">
        <button
          onClick={(e) => toggleSelection(e, company.id)}
          className={`flex-1 py-2.5 rounded-md text-sm font-semibold transition-all ${
            isSelected
              ? "bg-orange-500 text-white hover:bg-orange-600"
              : "bg-slate-100 text-slate-700 hover:bg-slate-200"
          }`}
        >
          {isSelected ? "Selected" : "Compare"}
        </button>
        <Link
          to={`/company/${company.id}`}
          className="flex items-center justify-center gap-1 px-6 py-2.5 bg-slate-900 text-white rounded-md text-sm font-semibold hover:bg-slate-800 transition-colors"
        >
          View
          <ArrowRight size={14} />
        </Link>
      </div>
    </motion.div>
  );
}
