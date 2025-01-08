import React, { useState } from "react";
import { FaTachometerAlt, FaExchangeAlt, FaChartLine, FaCog, FaBars, FaSignOutAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { handleLogout } from "../utils/AuthPort";

const SideBar = () => {
  const [activeItem, setActiveItem] = useState("Dashboard");
  const [isCollapsed, setIsCollapsed] = useState(false);
  const navigate = useNavigate();
  const menuItems = [
    { name: "Dashboard", icon: <FaTachometerAlt /> },
    { name: "Transactions", icon: <FaExchangeAlt /> },
    { name: "Reports", icon: <FaChartLine /> },
    { name: "Settings", icon: <FaCog /> },
  ];

  return (
    <div className={`sticky top-0 h-screen ${isCollapsed ? "w-20" : "w-64"} bg-gray-800 text-white transition-width duration-300`}>
      <div className="p-4 flex justify-between items-center">
        <h1 className={`text-2xl font-bold ${isCollapsed ? "hidden" : "block"}`}>Finance Tracker</h1>
        <button onClick={() => setIsCollapsed(!isCollapsed)} className="focus:outline-none">
          <FaBars />
        </button>
      </div>
      <nav className="mt-10">
        {menuItems.map((item) => (
          <a
            key={item.name}
            href="#"
            onClick={() => setActiveItem(item.name)}
            className={`flex items-center rounded px-4 py-2.5 transition duration-200 hover:bg-gray-700 hover:text-white ${
              activeItem === item.name ? "bg-gray-700" : ""
            }`}
          >
            <span className="mr-3">{item.icon}</span>
            <span className={`${isCollapsed ? "hidden" : "block"}`}>{item.name}</span>
          </a>
        ))}
      </nav>
      <div className="absolute bottom-0 w-full p-4">
        <button
          onClick={() => handleLogout(navigate)}
          className="flex items-center w-full rounded px-4 py-2.5 transition duration-200 hover:bg-gray-700 hover:text-white"
        >
          <FaSignOutAlt className="mr-3" />
          <span className={`${isCollapsed ? "hidden" : "block"}`}>Logout</span>
        </button>
      </div>
    </div>
  );
};

export default SideBar;
