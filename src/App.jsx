import { useState } from "react";
import Login from "./pages/Login";
import { Navigate, Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import { useAuth } from "./context/AuthContext";
import ProtectedRoute from "./utils/ProtectedRoute";
import DashboardLayout from "./components/DashboardLayout";
import Incidents from "./pages/Incidents";
import Analytics from "./pages/Analytics";
import Reports from "./pages/Reports";
import CreateIncident from "./pages/CreateIncident";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route element={<ProtectedRoute />}>
          <Route element={<DashboardLayout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/incidents" element={<Incidents />} />
            <Route path="/incidents/new" element={<CreateIncident />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/reports" element={<Reports />} />
          </Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;
