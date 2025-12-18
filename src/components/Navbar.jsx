import React from "react";
import { Link } from "react-router-dom";
import { Truck } from "lucide-react";

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-40 w-full bg-white/80 backdrop-blur-xl border-b border-slate-200 shadow-sm transition-all">
      <div className="container mx-auto px-4 py-3.5 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group">
          <div className="bg-gradient-to-br from-blue-600 to-indigo-700 text-white p-2 rounded-lg shadow-lg shadow-blue-500/20 group-hover:scale-105 transition-transform duration-300">
            <Truck className="w-5 h-5" />
          </div>
          <span className="text-lg font-bold tracking-tight text-slate-900">
            TruckService<span className="text-blue-600">Pro</span>
          </span>
        </Link>
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600">
          <Link to="/" className="hover:text-blue-600 transition-colors">
            Directory
          </Link>
          <button className="hover:text-blue-600 transition-colors">
            Comparisons
          </button>
          <button className="hover:text-blue-600 transition-colors">
            Reviews
          </button>
        </div>
        <div className="flex items-center gap-4">
          <button className="hidden md:block text-sm font-semibold text-slate-500 hover:text-slate-900">
            Log in
          </button>
          <button className="bg-slate-900 hover:bg-slate-800 text-white px-5 py-2 rounded-full text-sm font-bold shadow-lg shadow-slate-900/10 transition-all hover:-translate-y-0.5">
            Get Listed
          </button>
        </div>
      </div>
    </nav>
  );
}
