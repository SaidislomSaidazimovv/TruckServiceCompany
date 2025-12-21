import React from "react";
import { Link } from "react-router-dom";
import { Truck } from "lucide-react";

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-40 w-full bg-white/95 backdrop-blur-xl border-b border-slate-200 shadow-sm transition-all">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group">
          <div className="bg-gradient-to-br from-orange-500 to-orange-600 text-white p-2 rounded-lg shadow-lg shadow-orange-500/20 group-hover:scale-105 transition-transform duration-300">
            <Truck className="w-5 h-5" />
          </div>
          <span className="text-lg font-bold tracking-tight text-slate-900">
            TruckService<span className="text-orange-500">Pro</span>
          </span>
        </Link>
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600">
          <Link to="/" className="hover:text-orange-500 transition-colors">
            Directory
          </Link>
          <button className="hover:text-orange-500 transition-colors">
            Comparisons
          </button>
          <button className="hover:text-orange-500 transition-colors">
            Reviews
          </button>
        </div>
        <div className="flex items-center gap-4">
          <button className="hidden md:block text-sm font-semibold text-slate-600 hover:text-slate-900 transition-colors">
            Log in
          </button>
          <button className="bg-orange-500 hover:bg-orange-600 text-white px-5 py-2.5 rounded-full text-sm font-bold shadow-lg shadow-orange-500/20 transition-all hover:-translate-y-0.5">
            Get Listed
          </button>
        </div>
      </div>
    </nav>
  );
}
