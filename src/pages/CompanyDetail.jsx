import React from "react";
import { useParams, Link } from "react-router-dom";
import { companies } from "../lib/data";
import {
  Check,
  X,
  ExternalLink,
  Star,
  Shield,
  Smartphone,
  ArrowLeft,
} from "lucide-react";

export default function CompanyDetail() {
  const { id } = useParams();
  const company = companies.find((c) => c.id === parseInt(id));

  if (!company)
    return <div className="text-center py-20">Company not found!</div>;

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-8">
          <Link
            to="/"
            className="text-slate-500 hover:text-blue-600 flex items-center gap-2 mb-6 text-sm font-medium"
          >
            <ArrowLeft size={16} /> Back to Directory
          </Link>
          <div className="flex flex-col md:flex-row gap-6 items-start">
            <div className="w-24 h-24 bg-white border rounded-2xl p-4 flex items-center justify-center shadow-sm">
              <img
                src={company.logo}
                alt={company.name}
                className="w-full h-full object-contain"
              />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-3xl font-bold text-slate-900">
                  {company.name}
                </h1>
                <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-bold uppercase">
                  {company.category}
                </span>
              </div>
              <p className="text-lg text-slate-600 max-w-2xl">
                {company.description}
              </p>

              <div className="flex gap-4 mt-6">
                <a
                  href={company.website}
                  target="_blank"
                  rel="noreferrer"
                  className="bg-blue-600 text-white px-8 py-3 rounded-lg font-bold hover:bg-blue-700 transition flex items-center gap-2"
                >
                  Visit Website <ExternalLink size={18} />
                </a>
                <div className="flex items-center gap-1 text-yellow-500 font-bold text-lg border px-4 rounded-lg bg-white">
                  <Star className="fill-current" /> 4.8{" "}
                  <span className="text-slate-400 font-normal text-sm ml-1">
                    (User Reviews)
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container mx-auto px-4 py-10 grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <section className="bg-white rounded-2xl p-8 shadow-sm border border-slate-200">
            <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
              <Shield className="text-green-600" /> Key Features & Compliance
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {Object.entries(company.detailed_features.compliance || {}).map(
                ([key, val]) => (
                  <div
                    key={key}
                    className="flex justify-between items-center p-3 bg-slate-50 rounded-lg border"
                  >
                    <span className="font-medium text-slate-700 capitalize">
                      {key.replace(/_/g, " ")}
                    </span>
                    {val ? (
                      <Check className="text-green-500" />
                    ) : (
                      <X className="text-red-400" />
                    )}
                  </div>
                )
              )}
              {Object.entries(company.detailed_features.tracking || {}).map(
                ([key, val]) => (
                  <div
                    key={key}
                    className="flex justify-between items-center p-3 bg-slate-50 rounded-lg border"
                  >
                    <span className="font-medium text-slate-700 capitalize">
                      {key.replace(/_/g, " ")}
                    </span>
                    {val ? (
                      <Check className="text-green-500" />
                    ) : (
                      <X className="text-red-400" />
                    )}
                  </div>
                )
              )}
            </div>
          </section>
          <section className="bg-white rounded-2xl p-8 shadow-sm border border-slate-200">
            <h2 className="text-xl font-bold mb-6">Pros & Cons</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-green-700 font-bold mb-3 flex items-center gap-2">
                  👍 Advantages
                </h3>
                <ul className="space-y-2">
                  {company.pros.map((pro, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-2 text-slate-600 text-sm"
                    >
                      <Check size={16} className="text-green-500 mt-0.5" />{" "}
                      {pro}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="text-red-600 font-bold mb-3 flex items-center gap-2">
                  👎 Drawbacks
                </h3>
                <ul className="space-y-2">
                  {company.cons.map((con, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-2 text-slate-600 text-sm"
                    >
                      <X size={16} className="text-red-400 mt-0.5" /> {con}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>
        </div>
        <div className="space-y-6">
          <div className="bg-slate-900 text-white rounded-2xl p-6 shadow-lg">
            <h3 className="text-lg font-bold mb-4">Pricing Overview</h3>
            <div className="space-y-4">
              <div className="flex justify-between border-b border-slate-700 pb-2">
                <span className="text-slate-400">Hardware</span>
                <span className="font-bold">
                  {company.pricing.hardware_cost}
                </span>
              </div>
              <div className="flex justify-between border-b border-slate-700 pb-2">
                <span className="text-slate-400">Monthly</span>
                <span className="font-bold">{company.pricing.Pro_plan}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Contract</span>
                <span className="font-bold text-green-400">Flexible</span>
              </div>
            </div>
            <button className="w-full mt-6 bg-blue-600 hover:bg-blue-500 py-3 rounded-lg font-bold transition">
              Get Custom Quote
            </button>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
            <h3 className="font-bold mb-4 flex items-center gap-2">
              <Smartphone className="text-purple-600" /> Mobile Ratings
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-3 bg-slate-50 rounded-lg">
                <div className="text-sm text-slate-500">iOS App</div>
                <div className="font-bold text-xl">
                  {company.mobile_app_rating.iOS} ⭐
                </div>
              </div>
              <div className="text-center p-3 bg-slate-50 rounded-lg">
                <div className="text-sm text-slate-500">Android</div>
                <div className="font-bold text-xl">
                  {company.mobile_app_rating.Android} ⭐
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
