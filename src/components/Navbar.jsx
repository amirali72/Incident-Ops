import React from "react";
import { PiFediverseLogoBold } from "react-icons/pi";
import { FaUser } from "react-icons/fa";    
import { useAuth } from "../context/AuthContext";
import { IoLogOut } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate(); 
  const handleLogout = () => {
    logout();
    navigate("/login");
  };
  return (
    <>
      <nav className="w-full shadow-lg transition duration-300 flex h-12">
        <div className="m-2 flex justify-between w-full">
          <div className="flex">
            <PiFediverseLogoBold className="self-center text-blue-800 text-xl" />
            <h2 className="self-center font-semibold px-2">Incident Ops</h2>
          </div>
          <div className="flex">
            <FaUser className="self-center text-blue-800 text-lg"/>
            <h1 className="self-center px-2 text-sm">{user.name}</h1>
            <button onClick={handleLogout} className="px-2"><IoLogOut className="self-center text-blue-800 text-2xl hover:text-blue-950" /></button>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
