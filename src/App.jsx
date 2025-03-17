import { useState } from "react";
import axios from "axios";
import * as XLSX from "xlsx";
import "./App.css";

function App() {
  const [file, setFile] = useState(null);
  const [candidates, setCandidates] = useState([]);

  const handleFileChange = (e) => {
    const reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.onload = () => setFile(reader.result.split(",")[1]);
  };

  const uploadFile = async () => {
    if (!file) return alert("Please select an Excel file!");

    await axios.post("http://localhost:5000/upload", { fileData: file });
    fetchCandidates();
  };

  const fetchCandidates = async () => {
    const res = await axios.get("http://localhost:5000/candidates");
    setCandidates(res.data);
  };

  return (
    <div className="app">
      <h1>Upload Candidate Data</h1>
      <input type="file" accept=".xlsx, .xls" onChange={handleFileChange} />
      <button onClick={uploadFile}>Upload</button>

      <h2>Profiles</h2>
      <div className="profiles">
        {candidates.map((c, i) => (
          <div key={i} className="card">
            <img src={c.avatar} alt={c.name} />
            <h3>{c.name}</h3>
            <p>@{c.username}</p>
            <p>{c.email}</p>
            <p>📞 {c.phone}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
