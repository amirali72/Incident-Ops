import React from 'react'
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { Outlet } from 'react-router-dom';

const DashboardLayout = () => {
  return (
    <div>
      <Navbar />
      <div className="flex">
        <Sidebar />
        <div className="flex-1 p-6 bg-gray-100">
            <Outlet/>
        </div>
      </div>
    </div>
  );
}

export default DashboardLayout
