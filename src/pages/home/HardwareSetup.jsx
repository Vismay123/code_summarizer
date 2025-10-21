import React, { useState, useEffect } from "react";

const HardwareSetup = () => {
  const [instructions, setInstructions] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [newInstruction, setNewInstruction] = useState("");

  // Load stored data
  useEffect(() => {
    const storedData = localStorage.getItem("hardwareInstructions");
    if (storedData) setInstructions(JSON.parse(storedData));
  }, []);

  // Save data to local storage
  useEffect(() => {
    localStorage.setItem("hardwareInstructions", JSON.stringify(instructions));
  }, [instructions]);

  const handleAddInstruction = () => {
    if (newInstruction.trim() === "") return;
    const newItem = {
      id: Date.now(),
      text: newInstruction,
    };
    setInstructions([...instructions, newItem]);
    setNewInstruction("");
    setShowModal(false);
  };

  const handleDelete = (id) => {
    setInstructions(instructions.filter((i) => i.id !== id));
  };

  return (
    <div className=" w-full bg-gradient-to-br from-indigo-50 via-blue-100 to-cyan-100 flex flex-col items-center py-12 px-6">
      {/* Header */}
      <div className="text-center mb-12">
        <h2 className="text-4xl font-extrabold text-indigo-800 tracking-tight drop-shadow-sm">
          🧩 Hardware Setup Steps
        </h2>
        <p className="text-gray-600 mt-3 text-lg">
          Follow your setup process step-by-step — or add your own!
        </p>
      </div>

      {/* Add Step Button */}
      <button
        onClick={() => setShowModal(true)}
        className="fixed bottom-8 right-8 bg-indigo-600 text-white px-5 py-3 rounded-full shadow-lg hover:bg-indigo-700 hover:scale-105 transition-all duration-300 flex items-center gap-2 z-50"
      >
        <span className="text-xl">➕</span> Add Step
      </button>

      {/* Instructions Display */}
      {instructions.length > 0 ? (
        <div className="max-w-4xl w-full flex flex-col gap-6">
          {instructions.map((item, index) => (
            <div
              key={item.id}
              className="bg-white/80 backdrop-blur-md border border-gray-200 shadow-md rounded-2xl p-6 flex items-start gap-4 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
            >
              <div className="flex-shrink-0 bg-indigo-600 text-white w-10 h-10 flex items-center justify-center rounded-full font-bold shadow-md">
                {index + 1}
              </div>
              <div className="flex-1">
                <p className="text-gray-800 text-lg leading-relaxed">
                  {item.text}
                </p>
              </div>
              <button
                onClick={() => handleDelete(item.id)}
                className="text-red-500 hover:text-red-700 transition text-xl font-semibold"
                title="Delete Step"
              >
                🗑
              </button>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center mt-20 text-gray-600 text-lg italic">
          No setup steps added yet. Click “Add Step” to begin!
        </div>
      )}

      {/* Add Step Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 px-4">
          <div className="bg-white/95 rounded-2xl shadow-2xl w-full max-w-md p-6 relative border border-gray-100 animate-fadeIn">
            <h3 className="text-2xl font-semibold text-indigo-700 mb-4 text-center">
              ✏️ Add Setup Step
            </h3>

            <textarea
              value={newInstruction}
              onChange={(e) => setNewInstruction(e.target.value)}
              placeholder="Describe this step clearly..."
              className="w-full border border-gray-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-indigo-400 mb-6 resize-none text-gray-800"
              rows="4"
            />

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowModal(false)}
                className="px-5 py-2 bg-gray-300 rounded-lg hover:bg-gray-400 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleAddInstruction}
                className="px-5 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
              >
                Save Step
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HardwareSetup;
