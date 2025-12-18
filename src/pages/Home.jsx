import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { supabase } from "../lib/supabase";
import Layout from "../components/Layout";
import CompanyCard from "../components/CompanyCard";
import {
  Search,
  X,
  BarChart3,
  ShieldCheck,
  Truck,
  Smartphone,
  Users,
  ArrowRight,
  Check,
  ChevronRight,
  MapPin,
  Wifi,
} from "lucide-react";

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

  const categories = [
    "All",
    ...new Set(companies.map((c) => c.category || "General")),
  ];
  const visibleCompanies = companies.filter((c) => {
    const matchesSearch =
      c.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.slogan?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      activeCategory === "All" || c.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  const selectedCompanies = companies.filter((c) => selectedIds.includes(c.id));

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

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const comparisonRows = [
    {
      section: "Company Overview",
      icon: <BarChart3 className="w-5 h-5 text-blue-600" />,
      rows: [
        { label: "Founded", value: (c) => c.founded_year },
        {
          label: "Locations",
          value: (c) => c.metrics?.locations_count || "N/A",
        },
        { label: "Ownership", value: (c) => c.metrics?.ownership || "Private" },
      ],
    },
    {
      section: "Service Capabilities",
      icon: <ShieldCheck className="w-5 h-5 text-green-600" />,
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
      ],
    },
    {
      section: "Amenities & Tech",
      icon: <Truck className="w-5 h-5 text-orange-600" />,
      rows: [
        { label: "Showers", value: (c) => c.amenities_detailed?.showers },
        {
          label: "Parking",
          value: (c) =>
            c.amenities_detailed?.parking_spots ||
            c.amenities_detailed?.parking,
        },
        { label: "Wi-Fi", value: (c) => c.amenities_detailed?.wifi },
      ],
    },
    {
      section: "Support & App",
      icon: <Smartphone className="w-5 h-5 text-purple-600" />,
      rows: [
        { label: "Mobile App", value: (c) => c.app_info?.app_name || "N/A" },
        { label: "Main Phone", value: (c) => c.contact?.main_phone || "N/A" },
        {
          label: "Rewards",
          value: (c) => c.loyalty_program?.program_name || "None",
        },
      ],
    },
  ];

  const renderValue = (val) => {
    if (val === true)
      return <Check className="w-5 h-5 text-green-500 mx-auto" />;
    if (val === false || val === undefined || val === null)
      return <span className="text-slate-300">—</span>;
    return <span className="text-sm font-medium text-slate-700">{val}</span>;
  };
  const getLogoUrl = (company) => {
    return `https://ui-avatars.com/api/?name=${company.name}&background=random&color=fff&size=128&font-size=0.33`;
  };

  return (
    <Layout>
      <section className="relative bg-gradient-to-b from-slate-50 via-white to-white pt-20 pb-24 px-4 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-blue-100/50 rounded-full blur-3xl -z-10" />
        <div className="container mx-auto text-center max-w-4xl">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-5xl md:text-7xl font-extrabold text-slate-900 mb-6 tracking-tight"
          >
            Find the Best{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
              Trucking Services
            </span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl text-slate-600 mb-10 leading-relaxed max-w-2xl mx-auto"
          >
            Compare 15+ top service providers, truck stops, and fleet
            maintenance companies instantly.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="relative max-w-2xl mx-auto group"
          >
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full blur opacity-20 group-hover:opacity-40 transition duration-500"></div>
            <div className="relative bg-white rounded-full shadow-xl flex items-center p-2">
              <div className="pl-4 text-slate-400">
                <Search className="w-6 h-6" />
              </div>
              <input
                type="text"
                placeholder="Search companies (e.g. Love's, Penske)..."
                className="w-full px-4 py-3 rounded-full outline-none text-lg text-slate-700 placeholder:text-slate-400 bg-transparent"
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </motion.div>
        </div>
      </section>
      <div className="sticky top-[73px] z-30 bg-white/80 backdrop-blur-md border-b border-slate-100 py-4">
        <div className="container mx-auto px-4 overflow-x-auto">
          <div className="flex justify-center min-w-max gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-5 py-2 rounded-full text-sm font-bold transition-all duration-300 ${
                  activeCategory === cat
                    ? "bg-slate-900 text-white shadow-lg transform scale-105"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>
      {isLoading ? (
        <div className="flex justify-center items-center py-32">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      ) : (
        <div className="container mx-auto px-4 py-12 pb-32">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            <AnimatePresence>
              {visibleCompanies.length > 0 ? (
                visibleCompanies.map((company) => (
                  <div key={company.id}>
                    <CompanyCard
                      company={company}
                      isSelected={selectedIds.includes(company.id)}
                      toggleSelection={toggleSelection}
                    />
                  </div>
                ))
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="col-span-full text-center py-20"
                >
                  <div className="inline-flex bg-slate-100 p-6 rounded-full mb-4">
                    <Search className="w-10 h-10 text-slate-400" />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-700">
                    No results found
                  </h3>
                  <p className="text-slate-500 mt-2">
                    Try adjusting your search or filter.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      )}
      <AnimatePresence>
        {selectedIds.length > 0 && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            className="fixed bottom-8 left-1/2 transform -translate-x-1/2 bg-slate-900 text-white p-2 pl-6 pr-2 rounded-full shadow-2xl z-40 flex items-center gap-6 max-w-md w-[90%] backdrop-blur-xl border border-slate-700"
          >
            <div className="flex flex-col">
              <span className="font-bold text-sm">
                {selectedIds.length} Selected
              </span>
              <span className="text-xs text-slate-400">Ready to compare</span>
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
                className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-2 rounded-full text-sm font-bold shadow-lg shadow-blue-900/50 transition-transform active:scale-95 flex items-center gap-2"
              >
                Compare <ChevronRight size={16} />
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
            className="fixed inset-0 bg-white/95 backdrop-blur-sm z-50 overflow-auto"
          >
            <div className="container mx-auto px-4 py-8">
              <div className="flex justify-between items-center mb-8 sticky top-0 bg-white/80 backdrop-blur py-4 border-b z-20">
                <div>
                  <h2 className="text-2xl font-bold text-slate-900">
                    Feature Comparison
                  </h2>
                  <p className="text-slate-500 text-sm">
                    Side-by-side analysis
                  </p>
                </div>
                <button
                  onClick={() => setIsComparing(false)}
                  className="bg-slate-100 p-2 rounded-full hover:bg-slate-200 transition text-slate-600 hover:rotate-90 duration-300"
                >
                  <X size={24} />
                </button>
              </div>
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="overflow-x-auto pb-20 rounded-2xl border border-slate-200 shadow-xl bg-white"
              >
                <table className="w-full min-w-[900px]">
                  <thead>
                    <tr>
                      <th className="w-1/4 p-6 text-left text-slate-400 font-medium bg-slate-50/50 sticky left-0 z-10 border-b">
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
                              className="h-12 w-auto mb-3 object-contain"
                            />
                            <h3 className="font-bold text-slate-900 text-lg">
                              {company.name}
                            </h3>
                            <div className="flex items-center gap-1 text-xs text-slate-500 mt-1 mb-3">
                              <Users size={12} /> {company.category}
                            </div>
                            <Link
                              to={`/company/${company.id}`}
                              className="text-xs font-bold bg-blue-50 text-blue-600 px-3 py-1 rounded-full hover:bg-blue-100 flex items-center gap-1 transition-colors"
                            >
                              Full Details <ArrowRight size={12} />
                            </Link>
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
                            className="p-4 py-3 sticky left-0 z-10 bg-slate-50/90 backdrop-blur-sm border-y border-slate-200"
                          >
                            <div className="flex items-center gap-2 font-bold text-slate-800 uppercase tracking-wider text-xs">
                              {section.icon} {section.section}
                            </div>
                          </td>
                        </tr>
                        {section.rows.map((row, rIdx) => (
                          <tr
                            key={rIdx}
                            className="hover:bg-blue-50/30 transition-colors"
                          >
                            <td className="p-4 text-sm font-medium text-slate-600 sticky left-0 bg-white z-10 border-r border-slate-50 shadow-[2px_0_5px_-2px_rgba(0,0,0,0.05)]">
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
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </Layout>
  );
}
