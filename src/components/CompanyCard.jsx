import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Star, Trash2, Plus, ArrowRight, Check, Users } from "lucide-react";

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 50 } },
};

export default function CompanyCard({ company, isSelected, toggleSelection }) {
  const logoUrl = `https://ui-avatars.com/api/?name=${company.name}&background=random&color=fff&size=128&font-size=0.33`;
  const description =
    company.slogan || "Leading provider in the trucking industry.";
  const services = company.services_hub?.primary_services || [
    "Truck Service",
    "Maintenance",
  ];

  return (
    <motion.div
      variants={cardVariants}
      whileHover={{ y: -8 }}
      className={`group relative flex flex-col h-full bg-white rounded-2xl transition-all duration-300 overflow-hidden border ${
        isSelected
          ? "border-blue-500 shadow-xl ring-1 ring-blue-500"
          : "border-slate-100 shadow-sm hover:shadow-2xl hover:shadow-blue-900/5 hover:border-blue-200"
      }`}
    >
      <div className="p-6 flex items-start justify-between border-b border-slate-50 bg-gradient-to-b from-slate-50/50 to-white">
        <div className="w-16 h-16 bg-white rounded-xl p-2 shadow-sm border border-slate-100 flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
          <img
            src={logoUrl}
            alt={company.name}
            className="max-w-full max-h-full object-contain rounded-md"
          />
        </div>
        <div className="text-right">
          <span className="inline-block px-2.5 py-1 rounded-md bg-slate-100 text-slate-600 text-[10px] font-bold uppercase tracking-wider mb-1.5">
            {company.category?.split("&")[0] || "Service"}
          </span>
          <div className="flex items-center justify-end gap-1 text-yellow-500 text-xs font-bold bg-yellow-50 px-2 py-1 rounded-md border border-yellow-100/50">
            <Star size={12} className="fill-current" />
            <span>4.8</span>
          </div>
        </div>
      </div>
      <div className="p-6 flex-1 flex flex-col">
        <Link to={`/company/${company.id}`} className="block">
          <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors line-clamp-1">
            {company.name}
          </h3>
        </Link>
        <p className="text-slate-500 text-sm leading-relaxed mb-5 line-clamp-3">
          {description}
        </p>
        <div className="flex flex-wrap gap-2 mb-6 mt-auto">
          {services.slice(0, 2).map((service, i) => (
            <span
              key={i}
              className="inline-flex items-center gap-1.5 text-[11px] font-medium text-slate-600 bg-slate-50 px-2.5 py-1.5 rounded-lg border border-slate-100"
            >
              <Check size={12} className="text-green-500" strokeWidth={3} />
              <span className="truncate max-w-[120px]">{service}</span>
            </span>
          ))}
        </div>
        <div className="flex items-center gap-2 text-xs text-slate-400 mb-5 border-t border-slate-50 pt-4">
          <Users size={14} />
          <span>Category: {company.category || "General"}</span>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={(e) => toggleSelection(e, company.id)}
            className={`py-2.5 rounded-xl font-bold text-xs transition-all flex items-center justify-center gap-2 border active:scale-95 ${
              isSelected
                ? "bg-red-50 text-red-600 border-red-200 hover:bg-red-100"
                : "bg-white text-slate-600 border-slate-200 hover:border-blue-300 hover:text-blue-600"
            }`}
          >
            {isSelected ? (
              <>
                <Trash2 size={14} /> Remove
              </>
            ) : (
              <>
                <Plus size={14} /> Compare
              </>
            )}
          </button>
          <Link
            to={`/company/${company.id}`}
            className="py-2.5 rounded-xl font-bold text-xs bg-slate-900 text-white hover:bg-blue-600 hover:shadow-lg hover:shadow-blue-600/25 border border-transparent flex items-center justify-center gap-2 transition-all active:scale-95 group/btn"
          >
            Details
            <ArrowRight
              size={14}
              className="group-hover/btn:translate-x-1 transition-transform"
            />
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
