import React, { useState, useEffect } from "react";
import { NavLink, Outlet, useLocation } from "react-router-dom";
import { FaHome, FaUserCog, FaCog, FaChevronDown, FaChevronUp } from "react-icons/fa";
import "./Prototype.css";
import clientlogo from "./clientlogo.png";
import "./analytics.css";
import analytics from "./analytics.png";
import ing from "./resoluteai.png";
import adminlogo from "./adminlogo.png";

const Analytics = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [isHomeDropdownOpen, setHomeDropdownOpen] = useState(false);
  const location = useLocation();

  // Auto-open Home dropdown if current route starts with /home/
  useEffect(() => {
    if (location.pathname.startsWith("/home")) {
      setHomeDropdownOpen(true);
    }
  }, [location.pathname]);

  const toggleSidebar = () => setSidebarOpen(!isSidebarOpen);
  const toggleHomeDropdown = () => setHomeDropdownOpen(!isHomeDropdownOpen);

  return (
    <div className="app-container">
      {/* SIDEBAR */}
      <div className={`sidebar ${isSidebarOpen ? "open" : "closed"}`}>
        <div className="logo">
          <img src={analytics} alt="AnalyticsKart Logo" />
        </div>

        <nav className="nav-links">
          {/* HOME DROPDOWN */}
          <div className="nav-dropdown">
            <button className="nav-button w-full flex justify-between items-center" onClick={toggleHomeDropdown}>
              <div className="flex items-center gap-2">
                <FaHome />
                <span>Home</span>
              </div>
              {isHomeDropdownOpen ? <FaChevronUp /> : <FaChevronDown />}
            </button>

            {isHomeDropdownOpen && (
              <div className="dropdown-content ml-6 mt-2 flex flex-col gap-2">
                <NavLink to="/home/visualizer" className={({ isActive }) => `sub-link ${isActive ? "active-link" : ""}`}>
                  Visualizer
                </NavLink>
                <NavLink to="/home/kt" className={({ isActive }) => `sub-link ${isActive ? "active-link" : ""}`}>
                  KT Section
                </NavLink>
                <NavLink to="/home/hardware" className={({ isActive }) => `sub-link ${isActive ? "active-link" : ""}`}>
                  Hardware Setup
                </NavLink>
                <NavLink to="/home/software" className={({ isActive }) => `sub-link ${isActive ? "active-link" : ""}`}>
                  Software Setup
                </NavLink>
                <NavLink to="/home/team" className={({ isActive }) => `sub-link ${isActive ? "active-link" : ""}`}>
                  Project Team Arch
                </NavLink>
              </div>
            )}
          </div>

          {/* OTHER NAV LINKS */}
          <NavLink to="/development" className={({ isActive }) => `nav-button ${isActive ? "active-link" : ""}`}>
  <FaCog />
  <span>Development Env</span>
</NavLink>

<NavLink to="/production" className={({ isActive }) => `nav-button ${isActive ? "active-link" : ""}`}>
  <FaCog />
  <span>Production Env</span>
</NavLink>


          <NavLink to="/configuration" className={({ isActive }) => `nav-button ${isActive ? "active-link" : ""}`}>
            <FaCog />
            <span>Current Org</span>
          </NavLink>

          <NavLink to="/orgchart" className={({ isActive }) => `nav-button ${isActive ? "active-link" : ""}`}>
            <FaUserCog />
            <span>Proposed Org</span>
          </NavLink>

          <NavLink to="/users" className={({ isActive }) => `nav-button ${isActive ? "active-link" : ""}`}>
            <FaUserCog />
            <span>User Manager</span>
          </NavLink>
        </nav>

        <div className="footer-logo">
          <p className="powered">Powered by</p>
          <img src={ing} alt="ResoluteAI" />
        </div>
      </div>

      {/* MAIN CONTENT */}
      <div className="main-content">
        <header className="app-header">
          <button className="sidebar-toggle" onClick={toggleSidebar}>
            <div className="toggle-icon"></div>
          </button>

          <h1>Project Management Application</h1>

          <div className="app-client">
            <img src={clientlogo} alt="Client Logo" />
          </div>
          <div className="app-logo">
            <img src={adminlogo} alt="Admin Logo" />
          </div>
        </header>

        <div className="content-body">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Analytics;
