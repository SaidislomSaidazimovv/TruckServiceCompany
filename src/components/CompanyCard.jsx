import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Star, Trash2, Plus, ArrowRight, Check, Zap } from "lucide-react";

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
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.2 }}
      className={`group flex flex-col h-full bg-white rounded-2xl overflow-hidden border relative transition-all duration-300 ${
        isSelected
          ? "border-blue-500 shadow-[0_0_0_2px_rgba(59,130,246,1)]"
          : "border-slate-200 shadow-sm hover:shadow-xl hover:border-blue-300 hover:-translate-y-1"
      }`}
    >
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      <div className="p-6 pb-4 flex items-start justify-between">
        <div className="w-16 h-16 bg-white rounded-2xl p-2 shadow-[0_4px_12px_-2px_rgba(0,0,0,0.08)] border border-slate-100 flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
          <img
            src={logoUrl}
            alt={company.name}
            className="max-w-full max-h-full object-contain rounded-lg"
          />
        </div>
        <div className="flex flex-col items-end gap-2">
          <span className="px-2.5 py-1 rounded-full bg-slate-50 text-slate-600 text-[10px] font-bold uppercase tracking-wider border border-slate-100">
            {category}
          </span>
          <div
            className={`flex items-center gap-1 text-xs font-bold px-2 py-0.5 rounded-full border ${
              rating >= 4.5
                ? "bg-green-50 text-green-700 border-green-100"
                : rating >= 4.0
                ? "bg-yellow-50 text-yellow-700 border-yellow-100"
                : "bg-orange-50 text-orange-700 border-orange-100"
            }`}
          >
            <Star size={10} className="fill-current" />
            <span>{rating}</span>
          </div>
        </div>
      </div>
      <div className="px-6 flex-1 flex flex-col">
        <Link to={`/company/${company.id}`} className="block group/title">
          <h3 className="text-lg font-bold text-slate-900 mb-2 leading-tight group-hover/title:text-blue-600 transition-colors line-clamp-1">
            {company.name}
          </h3>
        </Link>
        <p className="text-slate-500 text-sm leading-relaxed mb-5 line-clamp-2 h-[40px]">
          {description}
        </p>
        <div className="flex flex-wrap gap-2 mb-6 mt-auto">
          {services.slice(0, 2).map((service, i) => (
            <span
              key={i}
              className="inline-flex items-center gap-1 text-[10px] font-semibold text-slate-600 bg-slate-50 px-2.5 py-1.5 rounded-lg border border-slate-100"
            >
              {i === 0 ? (
                <Zap size={10} className="text-amber-500" />
              ) : (
                <Check size={10} className="text-blue-500" />
              )}
              <span className="truncate max-w-[120px]">{service}</span>
            </span>
          ))}
          {services.length > 2 && (
            <span className="text-[10px] text-slate-400 font-medium px-1.5 py-1.5 bg-slate-50 rounded-lg border border-slate-100">
              +{services.length - 2}
            </span>
          )}
        </div>
      </div>
      <div className="p-4 pt-0 mt-auto grid grid-cols-2 gap-3">
        <button
          onClick={(e) => toggleSelection(e, company.id)}
          className={`py-2.5 rounded-xl font-bold text-xs transition-all flex items-center justify-center gap-2 border active:scale-95 ${
            isSelected
              ? "bg-red-50 text-red-600 border-red-200 hover:bg-red-100"
              : "bg-white text-slate-600 border-slate-200 hover:border-slate-300 hover:text-slate-900 hover:bg-slate-50"
          }`}
        >
          {isSelected ? (
            <>
              {" "}
              <Trash2 size={14} /> Remove{" "}
            </>
          ) : (
            <>
              {" "}
              <Plus size={14} /> Compare{" "}
            </>
          )}
        </button>
        <Link
          to={`/company/${company.id}`}
          className="py-2.5 rounded-xl font-bold text-xs bg-slate-900 text-white hover:bg-blue-600 hover:shadow-lg hover:shadow-blue-600/20 border border-transparent flex items-center justify-center gap-2 transition-all active:scale-95 group/btn"
        >
          Details
          <ArrowRight
            size={14}
            className="group-hover/btn:translate-x-1 transition-transform"
          />
        </Link>
      </div>
    </motion.div>
  );
}
