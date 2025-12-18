import React from "react";
import { Truck } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-white border-t border-slate-200 pt-16 pb-8 mt-auto">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <Truck className="w-6 h-6 text-blue-600" />
              <span className="text-lg font-bold text-slate-900">
                TruckServicePro
              </span>
            </div>
            <p className="text-slate-500 text-sm leading-relaxed">
              Helping American trucking companies find the best services, save
              money, and stay compliant.
            </p>
          </div>

          <div>
            <h4 className="font-bold text-slate-900 mb-4">Directory</h4>
            <ul className="space-y-2 text-sm text-slate-500">
              <li>
                <a href="#" className="hover:text-blue-600">
                  Factoring
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-600">
                  Fuel Cards
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-600">
                  ELD Devices
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-600">
                  Insurance
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-slate-900 mb-4">Company</h4>
            <ul className="space-y-2 text-sm text-slate-500">
              <li>
                <a href="#" className="hover:text-blue-600">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-600">
                  Contact
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-600">
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-slate-900 mb-4">Newsletter</h4>
            <p className="text-xs text-slate-500 mb-3">
              Get the latest trucking industry updates.
            </p>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="Email address"
                className="bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm w-full outline-none focus:border-blue-500"
              />
              <button className="bg-blue-600 text-white px-3 py-2 rounded-lg text-sm font-bold hover:bg-blue-700">
                Go
              </button>
            </div>
          </div>
        </div>

        <div className="border-t border-slate-100 pt-8 text-center text-slate-400 text-sm">
          &copy; {new Date().getFullYear()} TruckServicePro. All rights
          reserved.
        </div>
      </div>
    </footer>
  );
}
