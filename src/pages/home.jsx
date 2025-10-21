import React from "react";
import KTSection from "./home/KTSection";
import HardwareSetup from "./home/HardwareSetup";
import SoftwareSetup from "./home/SoftwareSetup";
import ProjectTeamArch from "./home/ProjectTeamArch";

const Home = () => {
  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-center mb-4">Project Knowledge Hub</h1>

      <KTSection />
      <HardwareSetup />
      <SoftwareSetup />
      <ProjectTeamArch />
    </div>
  );
};

export default Home;
