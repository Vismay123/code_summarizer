import React, { useState, useEffect, useRef } from "react";
import Tree from "react-d3-tree";
import { motion } from "framer-motion";

// 🌳 Default organizational data
const defaultOrgData = {
  name: "Project Manager",
  children: [
    {
      name: "Pralay Kumar",
      attributes: { title: "Project Lead" },
      children: [
        {
          name: "Backend Developer",
          attributes: { title: "Team" },
          children: [
            {
              name: "Anant K",
              attributes: { title: "Associate AI Engineer" },
            },
          ],
        },
        {
          name: "Frontend Developer",
          attributes: { title: "Team" },
          children: [
            { name: "Gopinath", attributes: { title: "Frontend Engineer" } },
          ],
        },
        {
          name: "Deployments and Integration",
          attributes: { title: "Team" },
          children: [
            { name: "Mukul", attributes: { title: "Software Engineer" } },
          ],
        },
        {
          name: "Scrum Master",
          attributes: { title: "Team" },
          children: [
            {
              name: "Mr. Joice Johnson",
              attributes: { title: "Technical Scrum Master" },
            },
          ],
        },
      ],
    },
  ],
};

// 🎨 Branch color mapping
const branchColors = {
  //"Parikshit Bangde": "bg-gradient-to-br from-purple-600 to-purple-400",
  "Project Manager": "bg-gradient-to-br from-purple-600 to-purple-400",
  "Project Lead": "bg-gradient-to-br from-purple-600 to-purple-400",
  "Backend Developer": "bg-gradient-to-br from-purple-600 to-purple-400",
  "Frontend Developer": "bg-gradient-to-br from-purple-600 to-purple-400",
  "Deployments and Integration": "bg-gradient-to-br from-purple-600 to-purple-400",
  "Scrum Master": "bg-gradient-to-br from-purple-600 to-purple-400",
  Default: "bg-gradient-to-br from-purple-600 to-purple-400",
};

// 🧠 Helper function to get color based on hierarchy
const getBranchColor = (nodeDatum) => {
  if (branchColors[nodeDatum.name]) return branchColors[nodeDatum.name];
  let current = nodeDatum.parent;
  while (current) {
    if (branchColors[current.data.name]) {
      return branchColors[current.data.name];
    }
    current = current.parent;
  }
  return branchColors.Default;
};

// 🎨 Custom Node Renderer
const renderNode = ({ nodeDatum }) => {
  const branchColor = getBranchColor(nodeDatum);

  return (
    <foreignObject width={220} height={120} x={-110} y={-50}>
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        whileHover={{
          scale: 1.07,
          boxShadow: "0 8px 20px rgba(0,0,0,0.15)",
        }}
        className={`border border-gray-200 rounded-xl p-3 text-gray-900 shadow-md w-[200px] text-center ${branchColor}`}
      >
        <strong className="block text-base font-semibold text-white drop-shadow-md">
          {nodeDatum.name}
        </strong>
        <p className="text-xs text-gray-100 m-0">{nodeDatum.attributes?.title}</p>
      </motion.div>
    </foreignObject>
  );
};

// 🌐 Main Component
const ProjectTeamArch = () => {
  const treeRef = useRef(null);
  const [orgData, setOrgData] = useState(defaultOrgData);
  const [size, setSize] = useState({ width: 0, height: 0 });

  // 🔄 Load org data from localStorage (if any)
  useEffect(() => {
    const savedData = localStorage.getItem("projectOrgData");
    if (savedData) {
      setOrgData(JSON.parse(savedData));
    } else {
      localStorage.setItem("projectOrgData", JSON.stringify(defaultOrgData));
    }
  }, []);

  // 🔁 Update tree size dynamically
  useEffect(() => {
    const update = () =>
      setSize({
        width: treeRef.current.offsetWidth,
        height: treeRef.current.offsetHeight,
      });
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  return (
    <div
      className="w-full h-[80vh] bg-gradient-to-b from-gray-50 to-indigo-50 p-4 rounded-2xl overflow-hidden"
      ref={treeRef}
    >
      <h2 className="text-2xl font-semibold text-center mb-4 text-gray-800">
        Project Team Architecture
      </h2>

      {size.width > 0 && (
        <Tree
          data={orgData}
          translate={{ x: size.width / 2, y: 150 }}
          zoom={0.9}
          orientation="vertical"
          pathFunc="step"
          nodeSize={{ x: 280, y: 200 }}
          separation={{ siblings: 0.8, nonSiblings: 1 }}
          renderCustomNodeElement={renderNode}
          pathClassFunc={() => "linkPath"}
          svgProps={{
            style: { overflow: "visible" },
          }}
        />
      )}

      {/* Connection line animation */}
      <style>{`
        .linkPath {
          stroke: #9ca3af;
          stroke-width: 2px;
          fill: none;
          stroke-dasharray: 8;
          animation: dash 1.5s linear infinite;
        }
        @keyframes dash {
          to {
            stroke-dashoffset: -20;
          }
        }
      `}</style>
    </div>
  );
};

export default ProjectTeamArch;
