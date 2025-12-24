import React, { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
} from "framer-motion";
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
  Sparkles,
  MapPin,
  Users,
  Phone,
  Mail,
  Clock,
  Trash2,
} from "lucide-react";
import HomeImage from "../assets/home_img.png";

export default function Home() {
  const [companies, setCompanies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedIds, setSelectedIds] = useState([]);
  const [isComparing, setIsComparing] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  const { scrollYProgress } = useScroll();
  const yBackground = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  useEffect(() => {
    fetchCompanies();
  }, []);

  useEffect(() => {
    if (isComparing) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isComparing]);

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
      console.error("Error:", error.message);
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
        alert("You can compare up to 3 companies at a time.");
        return;
      }
      setSelectedIds([...selectedIds, id]);
    }
  };

  const removeFromComparison = (id) => {
    const newSelection = selectedIds.filter((itemId) => itemId !== id);
    setSelectedIds(newSelection);
    if (newSelection.length === 0) {
      setIsComparing(false);
    }
  };

  const getLogoUrl = (company) => {
    return `https://ui-avatars.com/api/?name=${company.name}&background=random&color=fff&size=128&font-size=0.33`;
  };

  const renderValue = (val) => {
    if (val === true)
      return <Check className="w-5 h-5 text-emerald-600 mx-auto" />;
    if (val === false) return <X className="w-5 h-5 text-slate-300 mx-auto" />;
    if (val === undefined || val === null)
      return <span className="text-slate-400">—</span>;

    if (Array.isArray(val)) {
      return (
        <div className="flex flex-wrap justify-center gap-1.5">
          {val.slice(0, 3).map((v, i) => (
            <span
              key={i}
              className="text-xs bg-slate-100 px-2.5 py-1 rounded-md text-slate-700 font-medium whitespace-nowrap"
            >
              {v}
            </span>
          ))}
          {val.length > 3 && (
            <span className="text-xs text-slate-500 self-center font-semibold">
              +{val.length - 3}
            </span>
          )}
        </div>
      );
    }

    return <span className="text-sm font-semibold text-slate-800">{val}</span>;
  };

  const comparisonRows = [
    {
      section: "Overview",
      icon: <BarChart3 className="w-5 h-5" />,
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
      icon: <Wrench className="w-5 h-5" />,
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
      icon: <Truck className="w-5 h-5" />,
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
      icon: <CreditCard className="w-5 h-5" />,
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
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        <motion.div
          className="absolute inset-0"
          style={{ y: yBackground, opacity }}
        >
          <div className="absolute inset-0 bg-slate-900/70 z-10" />
          <img
            src={HomeImage}
            alt="Truck Services"
            className="w-full h-full object-cover"
          />
        </motion.div>
        <div className="relative z-20 container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-5xl mx-auto"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="mb-6"
            >
              <span className="inline-flex items-center gap-2 bg-orange-500/10 border border-orange-500/20 text-orange-400 px-4 py-2 rounded-full text-sm font-semibold backdrop-blur-sm">
                <Sparkles className="w-4 h-4" />
                Trusted by 10,000+ Drivers
              </span>
            </motion.div>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-white mb-6 leading-tight">
              Professional Truck
              <br />
              <span className="bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent">
                Services Directory
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-slate-300 mb-12 max-w-3xl mx-auto font-light leading-relaxed">
              Find and compare the best truck stops, maintenance services, and
              repair facilities nationwide
            </p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="max-w-3xl mx-auto"
            >
              <div className="relative bg-white rounded-2xl shadow-2xl shadow-slate-900/50 overflow-hidden">
                <div className="flex items-stretch">
                  <div className="flex items-center pl-6 pr-4">
                    <Search className="w-6 h-6 text-slate-400" />
                  </div>
                  <input
                    type="text"
                    placeholder="Search for services, locations, or companies..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="flex-1 py-5 pr-4 text-lg text-slate-800 placeholder:text-slate-400 outline-none bg-transparent"
                  />
                  <button className="hidden md:flex items-center gap-2 bg-orange-500 text-white px-8 py-5 font-bold hover:bg-orange-600 transition-all duration-300">
                    <span>Search</span>
                  </button>
                </div>
              </div>
              <button className="md:hidden w-full mt-4 flex items-center justify-center gap-2 bg-orange-500 text-white px-8 py-4 rounded-2xl font-bold hover:bg-orange-600 transition-all">
                <span>Search</span>
                <ArrowRight className="w-5 h-5" />
              </button>
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.6 }}
                className="mt-8 flex flex-wrap justify-center gap-6 text-sm"
              >
                <div className="flex items-center gap-2 text-slate-400">
                  <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
                  <span>500+ Verified Services</span>
                </div>
                <div className="flex items-center gap-2 text-slate-400">
                  <Clock className="w-4 h-4" />
                  <span>24/7 Support Available</span>
                </div>
                <div className="flex items-center gap-2 text-slate-400">
                  <Users className="w-4 h-4" />
                  <span>50K+ Happy Drivers</span>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20"
        >
          <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center pt-2">
            <div className="w-1 h-3 bg-white/50 rounded-full" />
          </div>
        </motion.div>
      </section>
      <div className="sticky top-[73px] z-30 bg-white border-b border-slate-200 shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-4 overflow-x-auto py-4 scrollbar-hide">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-6 py-2.5 rounded-full text-sm font-semibold whitespace-nowrap transition-all ${
                  activeCategory === cat
                    ? "bg-orange-500 text-white"
                    : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>
      <div className="bg-slate-50 py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Browse Services
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Explore our comprehensive directory of professional truck services
            </p>
          </div>
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                <CompanyCardSkeleton key={i} />
              ))}
            </div>
          ) : (
            <motion.div
              layout
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            >
              <AnimatePresence mode="popLayout">
                {visibleCompanies.length > 0 ? (
                  visibleCompanies.map((company) => (
                    <motion.div
                      key={company.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 20 }}
                      className="h-full"
                    >
                      <CompanyCard
                        company={company}
                        isSelected={selectedIds.includes(company.id)}
                        toggleSelection={toggleSelection}
                      />
                    </motion.div>
                  ))
                ) : (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="col-span-full text-center py-20"
                  >
                    <Search className="w-16 h-16 text-slate-300 mx-auto mb-4" />
                    <h3 className="text-2xl font-bold text-slate-700 mb-2">
                      No services found
                    </h3>
                    <p className="text-slate-500">
                      Try adjusting your search or filters
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )}
        </div>
      </div>
      <section className="bg-slate-900 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Need Help Finding the Right Service?
          </h2>
          <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
            Our team is here to assist you 24/7
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="tel:1-800-TRUCK-SERVICE"
              className="flex items-center gap-2 bg-orange-500 text-white px-8 py-4 rounded-lg font-bold hover:bg-orange-600 transition-colors"
            >
              <Phone size={20} />
              1-800-TRUCK-SERVICE
            </a>
            <a
              href="mailto:info@truckservices.com"
              className="flex items-center gap-2 bg-white text-slate-900 px-8 py-4 rounded-lg font-bold hover:bg-slate-100 transition-colors"
            >
              <Mail size={20} />
              Email Us
            </a>
          </div>
        </div>
      </section>
      <AnimatePresence>
        {selectedIds.length > 0 && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-lg"
          >
            <div className="bg-slate-900/95 backdrop-blur-md text-white px-6 py-4 rounded-2xl shadow-2xl flex flex-col sm:flex-row items-center justify-between gap-4 border border-white/10 ring-1 ring-black/5">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center font-bold text-lg shadow-lg shadow-orange-500/30">
                    {selectedIds.length}
                  </div>
                  {selectedIds.length < 2 && (
                    <span className="absolute -bottom-1 -right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-slate-900 animate-pulse"></span>
                  )}
                </div>
                <div className="flex flex-col">
                  <span className="font-bold text-sm">Companies Selected</span>
                  <span className="text-xs text-slate-400">
                    Select at least 2 to compare
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-2 w-full sm:w-auto">
                <button
                  onClick={() => setSelectedIds([])}
                  className="px-4 py-2.5 rounded-xl text-sm font-semibold text-slate-300 hover:bg-white/10 hover:text-white transition-colors flex-1 sm:flex-none"
                >
                  Clear
                </button>
                <button
                  onClick={() => setIsComparing(true)}
                  disabled={selectedIds.length < 2}
                  className={`flex-1 sm:flex-none flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl text-sm font-bold transition-all ${
                    selectedIds.length < 2
                      ? "bg-slate-800 text-slate-500 cursor-not-allowed border border-white/5"
                      : "bg-orange-500 text-white hover:bg-orange-600 shadow-lg shadow-orange-500/25 active:scale-95"
                  }`}
                >
                  Compare
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {isComparing && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-white z-[60] flex flex-col overflow-hidden"
          >
            <div className="flex-shrink-0 bg-white border-b border-slate-200 shadow-sm z-[70] relative">
              <div className="container mx-auto px-4 py-4">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-slate-900 flex items-center gap-2">
                      <div className="p-2 bg-orange-100 rounded-lg hidden md:block">
                        <BarChart3 className="text-orange-500 w-5 h-5 md:w-6 md:h-6" />
                      </div>
                      Service Comparison
                    </h2>
                    <p className="text-slate-500 text-xs md:text-sm mt-1">
                      Comparing{" "}
                      <span className="font-bold text-slate-900">
                        {selectedCompanies.length}
                      </span>{" "}
                      providers side-by-side
                    </p>
                  </div>
                  <div className="flex items-center justify-between md:justify-end gap-3 w-full md:w-auto">
                    <button
                      onClick={() => setSelectedIds([])}
                      className="text-slate-500 hover:text-red-600 font-medium text-xs md:text-sm px-3 py-2 rounded-lg hover:bg-slate-50 transition-colors flex items-center gap-1"
                    >
                      <Trash2 size={14} />
                      <span className="hidden sm:inline">Clear All</span>
                      <span className="sm:hidden">Clear</span>
                    </button>
                    <button
                      onClick={() => setIsComparing(false)}
                      className="flex items-center gap-2 bg-slate-900 text-white px-5 py-2.5 rounded-xl text-sm font-bold hover:bg-slate-800 transition-all active:scale-95"
                    >
                      Close
                      <X size={16} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex-1 overflow-auto bg-slate-50/50 scroll-smooth">
              <div className="min-w-full inline-block align-middle pb-10">
                <table className="min-w-full border-collapse">
                  <thead className="sticky top-0 z-50">
                    <tr>
                      <th className="sticky left-0 z-[60] top-0 bg-white p-3 md:p-6 w-[120px] md:w-[240px] border-b border-r border-slate-200 shadow-[4px_0_10px_-4px_rgba(0,0,0,0.05)] align-bottom">
                        <div className="text-[10px] md:text-xs font-bold text-slate-400 uppercase tracking-widest pb-1">
                          Features
                        </div>
                        <div className="text-slate-900 font-bold text-sm md:text-xl">
                          Metrics
                        </div>
                      </th>
                      {selectedCompanies.map((company) => (
                        <th
                          key={company.id}
                          className="bg-white p-3 md:p-6 min-w-[160px] md:min-w-[280px] border-b border-slate-200 align-top relative group"
                        >
                          <div className="absolute top-2 right-2 z-10">
                            <button
                              onClick={() => removeFromComparison(company.id)}
                              className="p-1.5 md:p-2 bg-slate-50 text-slate-400 rounded-full hover:bg-red-50 hover:text-red-500 transition-colors"
                              title="Remove company"
                            >
                              <X size={14} className="md:w-4 md:h-4" />
                            </button>
                          </div>
                          <div className="flex flex-col items-center pt-2">
                            <div className="w-12 h-12 md:w-20 md:h-20 bg-white rounded-xl md:rounded-2xl p-2 mb-3 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.1)] border border-slate-100 flex items-center justify-center">
                              <img
                                src={getLogoUrl(company)}
                                alt={company.name}
                                className="w-full h-full object-contain rounded-lg"
                              />
                            </div>
                            <h3 className="font-bold text-slate-900 text-center text-sm md:text-lg leading-tight mb-2 line-clamp-2 px-2">
                              {company.name}
                            </h3>
                            <Link
                              to={`/company/${company.id}`}
                              className="inline-flex items-center gap-1 text-[10px] md:text-xs font-bold text-blue-600 bg-blue-50 px-2 py-1 rounded-md hover:bg-blue-100 transition-colors"
                            >
                              View Profile <ArrowRight size={10} />
                            </Link>
                          </div>
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="bg-white">
                    {comparisonRows.map((section, idx) => (
                      <React.Fragment key={idx}>
                        <tr className="bg-slate-50/80 sticky z-30">
                          <td className="sticky left-0 z-40 bg-slate-50 p-3 md:p-4 border-b border-r border-slate-200 shadow-[4px_0_10px_-4px_rgba(0,0,0,0.05)]">
                            <div className="flex items-center gap-2 font-bold text-slate-700 text-xs md:text-sm uppercase tracking-wide">
                              <span className="text-orange-500 bg-orange-100 p-1 rounded md:bg-transparent md:p-0">
                                {React.cloneElement(section.icon, {
                                  size: 16,
                                })}
                              </span>
                              <span className="hidden md:inline">
                                {section.section}
                              </span>
                              <span className="md:hidden">
                                {section.section.split(" ")[0]}
                              </span>
                            </div>
                          </td>
                          <td
                            colSpan={selectedCompanies.length}
                            className="bg-slate-50 border-b border-slate-200"
                          ></td>
                        </tr>
                        {section.rows.map((row, rIdx) => (
                          <tr
                            key={rIdx}
                            className="group hover:bg-slate-50 transition-colors"
                          >
                            <td className="sticky left-0 z-30 bg-white group-hover:bg-slate-50 p-3 md:p-5 text-xs md:text-sm font-semibold text-slate-600 border-b border-r border-slate-100 shadow-[4px_0_10px_-4px_rgba(0,0,0,0.05)] break-words">
                              {row.label}
                            </td>
                            {selectedCompanies.map((company) => (
                              <td
                                key={company.id}
                                className="p-3 md:p-5 text-center border-b border-slate-100 text-sm md:text-base align-middle min-w-[160px] md:min-w-[280px]"
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
