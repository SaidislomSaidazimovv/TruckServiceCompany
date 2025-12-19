import React from "react";

export default function CompanyCardSkeleton() {
  return (
    <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm h-full flex flex-col">
      <div className="flex justify-between items-start mb-6 animate-pulse">
        <div className="w-16 h-16 bg-slate-200 rounded-xl"></div>
        <div className="flex flex-col items-end gap-2">
          <div className="w-20 h-5 bg-slate-200 rounded-md"></div>
          <div className="w-12 h-5 bg-slate-200 rounded-md"></div>
        </div>
      </div>
      <div className="flex-1 animate-pulse">
        <div className="h-6 bg-slate-200 rounded w-3/4 mb-4"></div>
        <div className="h-4 bg-slate-200 rounded w-full mb-2"></div>
        <div className="h-4 bg-slate-200 rounded w-5/6 mb-6"></div>
        <div className="flex gap-2 mb-4">
          <div className="h-6 w-20 bg-slate-200 rounded-lg"></div>
          <div className="h-6 w-24 bg-slate-200 rounded-lg"></div>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-3 mt-6 animate-pulse">
        <div className="h-10 bg-slate-200 rounded-xl"></div>
        <div className="h-10 bg-slate-200 rounded-xl"></div>
      </div>
    </div>
  );
}
