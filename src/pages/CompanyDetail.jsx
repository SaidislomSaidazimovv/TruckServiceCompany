import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { supabase } from "../lib/supabase";
import { motion } from "framer-motion";
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
  Truck,
  CreditCard,
  Utensils,
} from "lucide-react";

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
  36: 4.3,
  37: 4.8,
  38: 4.5,
  39: 4.2,
  40: 4.0,
  41: 4.1,
  42: 4.4,
  43: 4.3,
  44: 4.2,
  45: 4.6,
  46: 4.5,
  47: 4.1,
  48: 3.9,
  49: 4.5,
  50: 4.6,
  51: 4.4,
  52: 4.5,
  53: 4.0,
  54: 4.2,
  55: 4.6,
  56: 4.3,
  57: 4.7,
  58: 4.1,
  59: 4.2,
  60: 4.3,
  61: 4.1,
  62: 3.8,
  63: 4.6,
  64: 4.3,
  65: 4.4,
  66: 4.5,
  67: 4.0,
  68: 4.7,
  69: 4.1,
  70: 4.5,
  71: 4.7,
  72: 4.4,
  73: 4.2,
  74: 4.6,
  75: 4.0,
  76: 4.2,
  77: 4.4,
  78: 4.6,
  79: 4.0,
  80: 4.1,
  81: 4.8,
  82: 4.3,
  83: 4.1,
  84: 4.7,
  85: 4.4,
  86: 4.0,
  87: 4.3,
  88: 4.8,
  89: 4.5,
  90: 4.1,
  91: 4.8,
  92: 4.6,
  93: 4.3,
  94: 4.2,
  95: 4.5,
  96: 4.0,
  97: 4.1,
  98: 3.8,
  99: 4.4,
  100: 4.5,
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 50 },
  },
};

export default function CompanyDetail() {
  const { id } = useParams();
  const [company, setCompany] = useState(null);
  const [loading, setLoading] = useState(true);

  const rating = REAL_RATINGS[id] || 4.0;

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
          <p className="text-slate-500 font-medium animate-pulse">
            Loading company details...
          </p>
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
          <h2 className="text-2xl font-bold text-slate-800 mb-2">
            Company Not Found
          </h2>
          <p className="text-slate-500 mb-6">
            The company you are looking for might have been removed or does not
            exist.
          </p>
          <Link
            to="/"
            className="inline-flex items-center justify-center w-full py-3 px-6 bg-slate-900 text-white rounded-xl font-bold hover:bg-slate-800 transition-all active:scale-95"
          >
            Go back to Home
          </Link>
        </div>
      </div>
    );
  }

  const logoUrl = `https://ui-avatars.com/api/?name=${company.name}&background=random&color=fff&size=128&font-size=0.33`;
  const primaryServices = company.services_hub?.primary_services || [];
  const amenities = company.amenities_detailed || {};
  const paymentMethods = company.metrics?.payment_methods || [];
  const techSpecs = [
    { key: "towing_service", label: "Towing Service" },
    { key: "tire_service", label: "Tire Service" },
    { key: "trailer_repair", label: "Trailer Repair" },
    { key: "engine_diagnostics", label: "Engine Diag" },
    { key: "dot_inspections", label: "DOT Inspection" },
    { key: "welding", label: "Welding" },
    { key: "hazmat_certified", label: "Hazmat Cert." },
    { key: "mobile_service", label: "Mobile Service" },
  ];

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="min-h-screen bg-slate-50 pb-20 relative overflow-hidden"
    >
      <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-b from-blue-50 to-slate-50 -z-10" />
      <div className="absolute top-[-100px] right-[-100px] w-[500px] h-[500px] bg-blue-100/40 rounded-full blur-[100px] -z-10" />
      <div className="sticky top-0 z-30 bg-white/80 backdrop-blur-xl border-b border-slate-200/60 shadow-sm transition-all">
        <div className="container mx-auto px-4 py-6">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-slate-500 hover:text-blue-600 font-medium transition-colors mb-6 group"
          >
            <div className="p-1.5 rounded-full bg-slate-100 group-hover:bg-blue-50 transition-colors">
              <ArrowLeft
                size={16}
                className="group-hover:-translate-x-0.5 transition-transform"
              />
            </div>
            Back to Directory
          </Link>
          <motion.div
            variants={itemVariants}
            className="flex flex-col md:flex-row gap-8 items-start"
          >
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
                {company.slogan ||
                  "Providing top-tier services for the trucking industry."}
              </p>
              <div className="flex flex-wrap gap-4">
                <a
                  href={company.website}
                  target="_blank"
                  rel="noreferrer"
                  className="bg-slate-900 text-white px-6 py-3 rounded-xl font-bold hover:bg-blue-600 transition-all flex items-center gap-2 shadow-lg shadow-slate-900/20 active:scale-95 group"
                >
                  Visit Website{" "}
                  <ExternalLink
                    size={18}
                    className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
                  />
                </a>
                <div className="flex items-center gap-2 text-slate-700 font-bold text-lg border border-slate-200 px-5 py-3 rounded-xl bg-white shadow-sm">
                  <Star className="fill-yellow-400 text-yellow-400 w-5 h-5" />
                  {rating}
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
        <div className="lg:col-span-2 space-y-8">
          <motion.section
            variants={itemVariants}
            className="bg-white rounded-3xl p-8 shadow-sm border border-slate-200 overflow-hidden relative"
          >
            <h2 className="text-xl font-bold mb-6 flex items-center gap-3 text-slate-900 relative z-10">
              <div className="p-2 bg-blue-100 text-blue-600 rounded-lg">
                <Wrench size={20} />
              </div>
              Technical Capabilities
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 relative z-10 mb-6">
              {techSpecs.map((spec) => {
                const isAvail = company.services_hub?.[spec.key];
                return (
                  <div
                    key={spec.key}
                    className={`p-3 rounded-xl border text-center transition-colors ${
                      isAvail
                        ? "bg-green-50 border-green-100"
                        : "bg-slate-50 border-slate-100 opacity-50"
                    }`}
                  >
                    <div className="flex justify-center mb-2">
                      {isAvail ? (
                        <Check className="text-green-600 w-5 h-5" />
                      ) : (
                        <X className="text-slate-400 w-5 h-5" />
                      )}
                    </div>
                    <span
                      className={`text-xs font-bold ${
                        isAvail ? "text-green-800" : "text-slate-500"
                      }`}
                    >
                      {spec.label}
                    </span>
                  </div>
                );
              })}
            </div>
          </motion.section>
          <motion.section
            variants={itemVariants}
            className="bg-white rounded-3xl p-8 shadow-sm border border-slate-200"
          >
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
                  <span className="text-slate-700 font-semibold">
                    {service}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.section>
          <motion.section
            variants={itemVariants}
            className="bg-white rounded-3xl p-8 shadow-sm border border-slate-200"
          >
            <h2 className="text-xl font-bold mb-6 flex items-center gap-3">
              <div className="p-2 bg-orange-100 text-orange-600 rounded-lg">
                <Truck size={20} />
              </div>
              Driver Amenities
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-6">
              {Object.entries(amenities).map(([key, value]) => {
                if (key === "food_options" || Array.isArray(value)) return null;
                const isAvailable =
                  value === true ||
                  (typeof value === "string" && value !== "No");
                return (
                  <div
                    key={key}
                    className={`p-4 rounded-2xl border text-center transition-all ${
                      isAvailable
                        ? "bg-slate-50 border-slate-100"
                        : "bg-slate-50/50 border-slate-50 opacity-60"
                    }`}
                  >
                    <div className="text-[10px] text-slate-400 uppercase font-extrabold tracking-wider mb-2">
                      {key.replace(/_/g, " ")}
                    </div>
                    <div
                      className={`font-bold text-sm ${
                        isAvailable ? "text-slate-900" : "text-slate-400"
                      }`}
                    >
                      {value === true
                        ? "Available"
                        : value === false
                        ? "Not Available"
                        : value}
                    </div>
                  </div>
                );
              })}
            </div>
            {amenities.food_options &&
              Array.isArray(amenities.food_options) &&
              amenities.food_options.length > 0 && (
                <div className="mt-6 pt-6 border-t border-slate-100">
                  <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2 mb-3">
                    <Utensils size={16} className="text-slate-400" /> Food
                    Options
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {amenities.food_options.map((food, i) => (
                      <span
                        key={i}
                        className="px-3 py-1 bg-orange-50 text-orange-700 text-xs font-bold rounded-lg border border-orange-100"
                      >
                        {food}
                      </span>
                    ))}
                  </div>
                </div>
              )}
          </motion.section>
        </div>
        <motion.div variants={itemVariants} className="space-y-6">
          <div className="bg-slate-900 text-white rounded-3xl p-8 shadow-2xl ring-1 ring-white/10 relative overflow-hidden">
            <h3 className="text-lg font-bold mb-6 flex items-center gap-3 relative z-10">
              <Briefcase className="text-blue-400" /> Company Metrics
            </h3>
            <div className="space-y-6 relative z-10">
              <div className="flex justify-between items-center pb-4 border-b border-white/10">
                <span className="text-slate-400 text-sm font-medium flex items-center gap-2">
                  <Calendar size={14} /> Founded
                </span>
                <span className="font-bold text-lg">
                  {company.founded_year}
                </span>
              </div>
              <div className="flex justify-between items-center pb-4 border-b border-white/10">
                <span className="text-slate-400 text-sm font-medium flex items-center gap-2">
                  <MapPin size={14} /> Locations
                </span>
                <span className="font-bold text-lg">
                  {company.metrics?.locations_count || "N/A"}
                </span>
              </div>
              <div className="flex justify-between items-center pb-4 border-b border-white/10">
                <span className="text-slate-400 text-sm font-medium flex items-center gap-2">
                  <Users size={14} /> Employees
                </span>
                <span className="font-bold text-lg">
                  {company.metrics?.employees_count || "N/A"}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-400 text-sm font-medium">
                  Est. Revenue
                </span>
                <span className="font-bold text-lg text-green-400">
                  {company.metrics?.annual_revenue_est || "Private"}
                </span>
              </div>
            </div>
            <div className="mt-8 pt-6 border-t border-white/10 relative z-10">
              <div className="text-xs text-slate-500 uppercase font-bold mb-3 flex items-center gap-2">
                <CreditCard size={12} /> Accepted Payments
              </div>
              <div className="flex flex-wrap gap-2">
                {paymentMethods.length > 0 ? (
                  paymentMethods.map((pm, i) => (
                    <span
                      key={i}
                      className="px-2 py-1 rounded bg-white/10 text-[10px] font-semibold text-slate-300 border border-white/10"
                    >
                      {pm}
                    </span>
                  ))
                ) : (
                  <span className="text-slate-500 text-sm">
                    Contact for details
                  </span>
                )}
              </div>
            </div>
            <div className="mt-8 pt-6 border-t border-white/10 relative z-10">
              <div className="text-xs text-slate-500 uppercase font-bold mb-2">
                Support Contact
              </div>
              <div className="text-xl font-bold text-white mb-1 tracking-wide">
                {company.contact?.main_phone || "N/A"}
              </div>
              <div className="text-sm text-blue-400 truncate hover:text-blue-300 cursor-pointer transition-colors">
                {company.contact?.email}
              </div>
            </div>
          </div>
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm">
            <h3 className="font-bold mb-4 flex items-center gap-3 text-slate-900">
              <div className="p-2 bg-red-100 text-red-500 rounded-lg">
                <MapPin size={18} />
              </div>
              Headquarters
            </h3>
            <div className="text-slate-600 text-sm leading-relaxed pl-1">
              <p className="font-bold text-slate-900 text-base mb-1">
                {company.headquarters?.address}
              </p>
              <p>
                {company.headquarters?.city}, {company.headquarters?.state}{" "}
                {company.headquarters?.zip}
              </p>
              <p className="mt-2 text-slate-400 font-medium uppercase text-xs tracking-wider">
                {company.headquarters?.country}
              </p>
            </div>
          </div>
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm">
            <h3 className="font-bold mb-4 flex items-center gap-3 text-slate-900">
              <div className="p-2 bg-purple-100 text-purple-600 rounded-lg">
                <Smartphone size={18} />
              </div>
              Mobile App
            </h3>
            {company.app_info?.app_name ? (
              <div>
                <div className="font-bold text-lg text-slate-900 mb-3">
                  {company.app_info.app_name}
                </div>
                <div className="flex gap-2 mb-5">
                  {company.app_info.platforms?.map((p) => (
                    <span
                      key={p}
                      className="bg-slate-100 text-slate-600 px-3 py-1.5 rounded-lg text-xs font-bold border border-slate-200"
                    >
                      {p}
                    </span>
                  ))}
                </div>
                <ul className="space-y-3">
                  {company.app_info.features?.map((feat, i) => (
                    <li
                      key={i}
                      className="text-sm text-slate-600 flex items-start gap-3"
                    >
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
