import React, { useState } from "react";
import axios from "axios";
import "./upload.css"; 

const UploadVisualizer = () => {
  const [file, setFile] = useState(null);
  const [summaries, setSummaries] = useState({});
  const [imagePath, setImagePath] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [uploadFolder, setUploadFolder] = useState("");
  const [outputFolder, setOutputFolder] = useState("");

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setError("");
    setMessage("");
    setSummaries({});
    setImagePath("");
    setUploadFolder("");
    setOutputFolder("");
  };

  const handleUpload = async () => {
    if (!file) {
      setError("❌ Please select a .zip, .rar, or .tar.gz file.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post("http://localhost:8000/upload", formData);
      const data = response.data;

      setMessage(data.message || "✅ Upload successful.");
      setSummaries(data.file_summaries || {});
      setImagePath(data.visualization ? data.visualization.replace(/\\/g, "/") : "");
      setUploadFolder(data.upload_folder?.replace(/\\/g, "/") || "");
      setOutputFolder(data.output_folder?.replace(/\\/g, "/") || "");
    } catch (err) {
      setError("Upload failed: " + (err.response?.data?.error || err.message));
    }
  };

  return (
    <div className="upload-container">
      <h2>📁 Project Visualizer Upload</h2>

      <div className="upload-controls">
        <input
          type="file"
          accept=".zip,.rar,.tar.gz"
          onChange={handleFileChange}
        />
        <button onClick={handleUpload}>Upload & Analyze</button>
      </div>

      {error && <p className="error-message">{error}</p>}
      {message && <p className="success-message">{message}</p>}

      {/* Show Folders */}
      {(uploadFolder || outputFolder) && (
        <div className="folder-info">
          {uploadFolder && <p><strong>📂 Upload Folder:</strong> {uploadFolder}</p>}
          {outputFolder && <p><strong>📂 Output Folder:</strong> {outputFolder}</p>}
        </div>
      )}

      {/* Show Summaries */}
      {Object.keys(summaries).length > 0 ? (
        <div className="summary-list">
          <h3>📄 File Summaries:</h3>
          <ul>
            {Object.entries(summaries).map(([filename, summary]) => (
              <li key={filename}>
                <strong>{filename}</strong>: {summary}
              </li>
            ))}
          </ul>
        </div>
      ) : (
        message && <p>ℹ️ No file summaries generated.</p>
      )}

      {/* Show Visualization */}
      {imagePath && (
        <div className="visualization">
          <h3>🖼️ Folder Visualization:</h3>
          <img
            src={`http://localhost:7000/${imagePath}`}
            alt="Folder Structure Visualization"
            style={{ maxWidth: "100%", border: "1px solid #ccc", marginTop: "10px" }}
          />
        </div>
      )}
    </div>
  );
};

export default UploadVisualizer;
