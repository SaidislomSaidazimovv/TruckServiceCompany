import React, { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";

const Home = lazy(() => import("./pages/Home"));
const CompanyDetail = lazy(() => import("./pages/CompanyDetail"));

const LoadingSpinner = () => (
  <div className="flex items-center justify-center min-h-screen bg-slate-50">
    <div className="animate-spin rounded-full h-12 w-12 border-b-4 border-blue-600"></div>
  </div>
);

function App() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/company/:id" element={<CompanyDetail />} />
      </Routes>
    </Suspense>
  );
}

export default App;
