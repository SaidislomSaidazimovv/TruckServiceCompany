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
              className="text-xs bg-slate-100 px-2.5 py-1 rounded-md text-slate-700 font-medium"
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
            className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50"
          >
            <div className="bg-slate-900 text-white px-6 py-4 rounded-full shadow-2xl flex items-center gap-6 border border-slate-700">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center font-bold text-lg">
                  {selectedIds.length}
                </div>
                <span className="font-semibold">Selected</span>
              </div>
              <div className="flex gap-3">
                <button
                  onClick={() => setSelectedIds([])}
                  className="px-4 py-2 rounded-full text-sm font-semibold hover:bg-slate-800 transition-colors"
                >
                  Clear
                </button>
                <button
                  onClick={() => setIsComparing(true)}
                  className="flex items-center gap-2 bg-orange-500 px-6 py-2 rounded-full text-sm font-bold hover:bg-orange-600 transition-colors"
                >
                  Compare Now
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
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-white z-50 overflow-auto"
          >
            <div className="container mx-auto px-4 py-8">
              <div className="flex justify-between items-center mb-8 pb-6 border-b border-slate-200">
                <div>
                  <h2 className="text-3xl font-bold text-slate-900">
                    Service Comparison
                  </h2>
                  <p className="text-slate-600 mt-1">
                    {selectedCompanies.length} companies selected
                  </p>
                </div>
                <button
                  onClick={() => setIsComparing(false)}
                  className="p-3 hover:bg-slate-100 rounded-lg transition-colors"
                >
                  <X size={24} className="text-slate-600" />
                </button>
              </div>
              <div className="overflow-x-auto rounded-lg border border-slate-200">
                <table className="w-full min-w-[900px] bg-white">
                  <thead>
                    <tr className="border-b border-slate-200">
                      <th className="w-64 p-6 text-left bg-slate-50 font-bold text-slate-700 sticky left-0 z-10">
                        Features
                      </th>
                      {selectedCompanies.map((company) => (
                        <th key={company.id} className="p-6 bg-slate-50">
                          <div className="flex flex-col items-center">
                            <div className="w-16 h-16 bg-white rounded-lg p-2 mb-3 shadow-sm border border-slate-100">
                              <img
                                src={getLogoUrl(company)}
                                alt={company.name}
                                className="w-full h-full object-contain"
                              />
                            </div>
                            <div className="font-bold text-slate-900 text-center">
                              {company.name}
                            </div>
                          </div>
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {comparisonRows.map((section, idx) => (
                      <React.Fragment key={idx}>
                        <tr className="bg-slate-50">
                          <td
                            colSpan={selectedCompanies.length + 1}
                            className="p-4 sticky left-0 z-10"
                          >
                            <div className="flex items-center gap-2 text-slate-700 font-bold">
                              {section.icon}
                              <span>{section.section}</span>
                            </div>
                          </td>
                        </tr>
                        {section.rows.map((row, rIdx) => (
                          <tr
                            key={rIdx}
                            className="border-b border-slate-100 hover:bg-slate-50 transition-colors"
                          >
                            <td className="p-4 font-semibold text-slate-700 sticky left-0 bg-white z-10">
                              {row.label}
                            </td>
                            {selectedCompanies.map((company) => (
                              <td
                                key={company.id}
                                className="p-4 text-center border-l border-slate-100"
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
