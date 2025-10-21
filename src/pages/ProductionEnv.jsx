import React from "react";

const ProductionEnv = () => {
  const data = [
    {
      environment: "Production (Simulation)",
      purpose: "For live deployment and real users",
      characteristics: "Scalable, optimized, secure, monitored, automated",
    },
  ];

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">
        Production Environment
      </h2>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded-2xl shadow-md overflow-hidden">
          <thead className="bg-gradient-to-r from-blue-600 to-blue-400 text-white">
            <tr>
              <th className="py-3 px-6 text-left text-sm font-semibold uppercase tracking-wider">
                Environment
              </th>
              <th className="py-3 px-6 text-left text-sm font-semibold uppercase tracking-wider">
                Purpose
              </th>
              <th className="py-3 px-6 text-left text-sm font-semibold uppercase tracking-wider">
                Characteristics
              </th>
            </tr>
          </thead>
          <tbody>
            {data.map((row, index) => (
              <tr
                key={index}
                className="border-b hover:bg-green-50 transition-colors duration-150"
              >
                <td className="py-3 px-6 text-gray-800 font-medium">
                  {row.environment}
                </td>
                <td className="py-3 px-6 text-gray-700">{row.purpose}</td>
                <td className="py-3 px-6 text-gray-700">
                  {row.characteristics}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductionEnv;
