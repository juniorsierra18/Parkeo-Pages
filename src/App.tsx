import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Home } from './pages/Home';
import { AdminLogin } from './pages/AdminLogin';
import { AdminDashboard } from './pages/AdminDashboard';
import { ClientEntry } from './pages/ClientEntry';
import { ClientExit } from './pages/ClientExit';
import { ParkingProvider } from './context/ParkingContext';

function App() {
  return (
    <BrowserRouter>
      <ParkingProvider>
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            <Route path="/client/entry" element={<ClientEntry />} />
            <Route path="/client/exit" element={<ClientExit />} />
          </Routes>
        </div>
      </ParkingProvider>
    </BrowserRouter>
  );
}

export default App;