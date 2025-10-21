import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Analytics from "./Analytics";
import Configuration from "./pages/Configuration";
import Users from "./pages/Users";
import OrgChart from "./pages/OrgChart";
import KTSection from "./pages/home/KTSection";
import HardwareSetup from "./pages/home/HardwareSetup";
import SoftwareSetup from "./pages/home/SoftwareSetup";
import ProjectTeamArch from "./pages/home/ProjectTeamArch";
import UploadVisualizer from "./pages/home/Visualizer";
import DevelopmentEnv from "./pages/DevelopmentEnv";
import ProductionEnv from "./pages/ProductionEnv";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Analytics />}>
          <Route index element={<Navigate to="home/kt" replace />} />

          {/* New Environment Routes */}
          <Route path="development" element={<DevelopmentEnv />} />
          <Route path="production" element={<ProductionEnv />} />
          <Route path="configuration" element={<Configuration />} />
          <Route path="users" element={<Users />} />
          <Route path="orgchart" element={<OrgChart />} />

          {/* Nested Home Routes */}
          <Route path="home">
            <Route path="visualizer" element={<UploadVisualizer />} />
            <Route path="kt" element={<KTSection />} />
            <Route path="hardware" element={<HardwareSetup />} />
            <Route path="software" element={<SoftwareSetup />} />
            <Route path="team" element={<ProjectTeamArch />} />
          </Route>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
