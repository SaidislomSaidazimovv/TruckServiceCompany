import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import CompanyDetail from './pages/CompanyDetail';

function App() {
  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/company/:id" element={<CompanyDetail />} />
      </Routes>
      <footer className="bg-white border-t py-8 text-center text-slate-500 text-sm">
        &copy; 2025 TruckServicePro. All rights reserved.
      </footer>
    </div>
  );
}

export default App;