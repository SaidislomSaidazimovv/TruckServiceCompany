import React, { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { supabase } from "../lib/supabase";
import Layout from "../components/Layout";
import CompanyCard from "../components/CompanyCard";
import CompanyCardSkeleton from "../components/CompantCardSkeleton";
import {
  Search,
  X,
  BarChart3,
  ShieldCheck,
  Truck,
  ArrowRight,
  Check,
  ChevronRight,
  Zap,
  Wrench,
  CreditCard,
} from "lucide-react";

import HomeImage from "../assets/home_img.png";

export default function Home() {
  const [companies, setCompanies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedIds, setSelectedIds] = useState([]);
  const [isComparing, setIsComparing] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  useEffect(() => {
    fetchCompanies();
  }, []);

  async function fetchCompanies() {
    try {
      setIsLoading(true);
      let { data, error } = await supabase
        .from("companies")
        .select("*")
        .order("id", { ascending: true });

      if (error) throw error;
      if (data) setCompanies(data);
    } catch (error) {
      console.error("Xatolik:", error.message);
    } finally {
      setIsLoading(false);
    }
  }

  const categories = useMemo(() => {
    return ["All", ...new Set(companies.map((c) => c.category || "General"))];
  }, [companies]);

  const visibleCompanies = useMemo(() => {
    return companies.filter((c) => {
      const matchesSearch =
        c.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.slogan?.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory =
        activeCategory === "All" || c.category === activeCategory;
      return matchesSearch && matchesCategory;
    });
  }, [companies, searchTerm, activeCategory]);

  const selectedCompanies = useMemo(() => {
    return companies.filter((c) => selectedIds.includes(c.id));
  }, [companies, selectedIds]);

  const toggleSelection = (e, id) => {
    if (e) e.preventDefault();
    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter((itemId) => itemId !== id));
    } else {
      if (selectedIds.length >= 3) {
        alert("Siz birdaniga ko'pi bilan 3 ta kompaniyani solishtira olasiz.");
        return;
      }
      setSelectedIds([...selectedIds, id]);
    }
  };

  const getLogoUrl = (company) => {
    return `https://ui-avatars.com/api/?name=${company.name}&background=random&color=fff&size=128&font-size=0.33`;
  };

  const renderValue = (val) => {
    if (val === true)
      return <Check className="w-5 h-5 text-green-500 mx-auto" />;
    if (val === false) return <X className="w-5 h-5 text-red-300 mx-auto" />;
    if (val === undefined || val === null)
      return <span className="text-slate-300">—</span>;

    if (Array.isArray(val)) {
      return (
        <div className="flex flex-wrap justify-center gap-1">
          {val.slice(0, 3).map((v, i) => (
            <span
              key={i}
              className="text-[10px] bg-slate-100 px-2 py-1 rounded-full text-slate-600 border border-slate-200 whitespace-nowrap"
            >
              {v}
            </span>
          ))}
          {val.length > 3 && (
            <span className="text-[10px] text-slate-400 self-center">
              +{val.length - 3}
            </span>
          )}
        </div>
      );
    }

    return <span className="text-sm font-medium text-slate-700">{val}</span>;
  };

  const comparisonRows = [
    {
      section: "Overview",
      icon: <BarChart3 className="w-5 h-5 text-blue-600" />,
      rows: [
        { label: "Founded", value: (c) => c.founded_year },
        { label: "Ownership", value: (c) => c.metrics?.ownership || "Private" },
        {
          label: "Locations",
          value: (c) => c.metrics?.locations_count || "N/A",
        },
        {
          label: "Employees",
          value: (c) => c.metrics?.employees_count || "N/A",
        },
      ],
    },
    {
      section: "Technical Services",
      icon: <Wrench className="w-5 h-5 text-indigo-600" />,
      rows: [
        { label: "24/7 Service", value: (c) => c.services_hub?.is_24_7 },
        {
          label: "Roadside Assist",
          value: (c) => c.services_hub?.roadside_assistance,
        },
        {
          label: "Mobile Service",
          value: (c) => c.services_hub?.mobile_service,
        },
        { label: "Towing", value: (c) => c.services_hub?.towing_service },
        { label: "Tire Service", value: (c) => c.services_hub?.tire_service },
        {
          label: "Trailer Repair",
          value: (c) => c.services_hub?.trailer_repair,
        },
        {
          label: "Engine Diag",
          value: (c) => c.services_hub?.engine_diagnostics,
        },
        { label: "Welding", value: (c) => c.services_hub?.welding },
      ],
    },
    {
      section: "Amenities & Comfort",
      icon: <Truck className="w-5 h-5 text-orange-600" />,
      rows: [
        {
          label: "Parking Spots",
          value: (c) =>
            c.amenities_detailed?.parking_spots ||
            c.amenities_detailed?.parking,
        },
        { label: "Showers", value: (c) => c.amenities_detailed?.showers },
        { label: "Wi-Fi", value: (c) => c.amenities_detailed?.wifi },
        { label: "Laundry", value: (c) => c.amenities_detailed?.laundry },
        {
          label: "Drivers Lounge",
          value: (c) => c.amenities_detailed?.lounge_area,
        },
        {
          label: "Food Options",
          value: (c) => c.amenities_detailed?.food_options,
        },
      ],
    },
    {
      section: "Financials",
      icon: <CreditCard className="w-5 h-5 text-green-600" />,
      rows: [
        { label: "Payment Methods", value: (c) => c.metrics?.payment_methods },
        {
          label: "Loyalty Program",
          value: (c) => c.program_name || c.loyalty_program?.program_name,
        },
        { label: "Warranty", value: (c) => c.services_hub?.warranty_offered },
      ],
    },
  ];

  return (
    <Layout>
      <section className="relative pt-32 pb-24 px-4 overflow-hidden min-h-[650px] flex flex-col justify-center items-center isolate">
        <div className="absolute inset-0 -z-20 w-full h-full">
          <motion.img
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 10, ease: "linear" }}
            src={HomeImage}
            alt="Truck Services Background"
            className="w-full h-full object-cover object-center"
          />
        </div>
        <div className="absolute inset-0 -z-10 bg-white/40 backdrop-blur-[1px]"></div>
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-white/20 via-white/40 to-white/90"></div>
        <div className="container mx-auto text-center max-w-4xl relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="inline-block mb-4 px-4 py-1.5 rounded-full bg-blue-50/90 backdrop-blur-md border border-blue-100 text-blue-700 text-xs font-bold uppercase tracking-wider shadow-sm"
          >
            Nationwide Network Coverage
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-5xl md:text-7xl font-extrabold text-slate-900 mb-6 tracking-tight leading-tight drop-shadow-sm"
          >
            Find Top{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
              Truck Services
            </span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-lg md:text-xl text-slate-800 mb-10 leading-relaxed max-w-2xl mx-auto font-medium"
          >
            Compare the best truck stops, fleet maintenance, and repair services
            across the USA with our interactive directory.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 }}
            className="relative max-w-xl mx-auto group z-20"
          >
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full blur opacity-20 group-hover:opacity-40 transition duration-500"></div>
            <div className="relative bg-white rounded-full shadow-2xl shadow-blue-900/10 flex items-center p-2 border border-slate-200">
              <div className="pl-4 text-slate-400">
                <Search className="w-6 h-6" />
              </div>
              <input
                type="text"
                placeholder="Search services (e.g. Love's, Towing, Tire)..."
                className="w-full px-4 py-3.5 rounded-full outline-none text-lg text-slate-700 placeholder:text-slate-400 bg-transparent"
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <button className="hidden sm:block bg-slate-900 text-white px-6 py-2.5 rounded-full font-bold hover:bg-blue-600 transition-colors shadow-lg">
                Search
              </button>
            </div>
          </motion.div>
        </div>
      </section>
      <div className="sticky top-[73px] z-30 bg-white/80 backdrop-blur-xl border-b border-slate-100 py-3">
        <div className="container mx-auto px-4 overflow-x-auto no-scrollbar">
          <div className="flex justify-center min-w-max gap-2 px-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-full text-xs font-bold transition-all duration-200 border ${
                  activeCategory === cat
                    ? "bg-slate-900 text-white border-slate-900 shadow-md transform scale-105"
                    : "bg-white text-slate-600 border-slate-200 hover:border-slate-300 hover:bg-slate-50"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>
      <div className="container mx-auto px-4 py-12 pb-32">
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <CompanyCardSkeleton key={i} />
            ))}
          </div>
        ) : (
          <motion.div
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            <AnimatePresence mode="popLayout">
              {visibleCompanies.length > 0 ? (
                visibleCompanies.map((company) => (
                  <CompanyCard
                    key={company.id}
                    company={company}
                    isSelected={selectedIds.includes(company.id)}
                    toggleSelection={toggleSelection}
                  />
                ))
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="col-span-full text-center py-20"
                >
                  <div className="inline-flex bg-slate-50 p-6 rounded-full mb-4">
                    <Search className="w-10 h-10 text-slate-300" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-700">
                    No services found
                  </h3>
                  <p className="text-slate-500 mt-2">
                    Try changing your search term.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </div>
      <AnimatePresence>
        {selectedIds.length > 0 && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            className="fixed bottom-8 left-1/2 transform -translate-x-1/2 bg-slate-900/90 backdrop-blur-lg text-white p-2 pl-6 pr-2 rounded-full shadow-2xl z-40 flex items-center gap-6 max-w-md w-[90%] border border-white/10"
          >
            <div className="flex flex-col">
              <span className="font-bold text-sm">
                {selectedIds.length} Selected
              </span>
              <span className="text-[10px] text-slate-400 uppercase tracking-wider font-bold">
                To Compare
              </span>
            </div>
            <div className="flex gap-2 ml-auto">
              <button
                onClick={() => setSelectedIds([])}
                className="px-4 py-2 rounded-full text-xs font-bold text-slate-400 hover:text-white transition"
              >
                Clear
              </button>
              <button
                onClick={() => setIsComparing(true)}
                className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-2 rounded-full text-xs font-bold shadow-lg shadow-blue-600/30 transition-transform active:scale-95 flex items-center gap-2"
              >
                Compare <ChevronRight size={14} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {isComparing && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-white/95 backdrop-blur-md z-50 overflow-auto"
          >
            <div className="container mx-auto px-4 py-8">
              <div className="flex justify-between items-center mb-8 sticky top-0 bg-white/90 backdrop-blur py-4 border-b z-20">
                <div>
                  <h2 className="text-2xl font-bold text-slate-900">
                    Compare Services
                  </h2>
                </div>
                <button
                  onClick={() => setIsComparing(false)}
                  className="bg-slate-100 p-2 rounded-full hover:bg-slate-200 transition text-slate-600"
                >
                  <X size={24} />
                </button>
              </div>
              <div className="overflow-x-auto pb-20 rounded-2xl border border-slate-200 shadow-xl bg-white">
                <table className="w-full min-w-[800px]">
                  <thead>
                    <tr>
                      <th className="w-1/4 p-6 text-left text-slate-400 font-medium bg-slate-50/50 sticky left-0 z-10 border-b border-r">
                        Features
                      </th>
                      {selectedCompanies.map((company) => (
                        <th
                          key={company.id}
                          className="w-1/4 p-6 align-top border-b border-l border-slate-100"
                        >
                          <div className="flex flex-col items-center text-center">
                            <img
                              src={getLogoUrl(company)}
                              alt={company.name}
                              className="h-10 w-auto mb-3 object-contain"
                            />
                            <h3 className="font-bold text-slate-900 text-sm">
                              {company.name}
                            </h3>
                          </div>
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {comparisonRows.map((section, idx) => (
                      <React.Fragment key={idx}>
                        <tr className="bg-slate-50/80">
                          <td
                            colSpan={selectedCompanies.length + 1}
                            className="p-3 pl-6 sticky left-0 z-10 bg-slate-50/95 backdrop-blur-sm font-bold text-xs uppercase text-slate-500 tracking-wider flex items-center gap-2"
                          >
                            {section.icon} {section.section}
                          </td>
                        </tr>
                        {section.rows.map((row, rIdx) => (
                          <tr key={rIdx} className="hover:bg-blue-50/20">
                            <td className="p-4 text-sm font-semibold text-slate-600 sticky left-0 bg-white z-10 border-r border-slate-100">
                              {row.label}
                            </td>
                            {selectedCompanies.map((company) => (
                              <td
                                key={company.id}
                                className="p-4 text-center border-l border-slate-50"
                              >
                                {renderValue(row.value(company))}
                              </td>
                            ))}
                          </tr>
                        ))}
                      </React.Fragment>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </Layout>
  );
}
