import { useState, useEffect } from "react";
import axios from "axios";
import * as XLSX from "xlsx";
import { FiUpload } from "react-icons/fi";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [candidates, setCandidates] = useState([]);

  // Fetch candidates on page load
  useEffect(() => {
    fetchCandidates();
    console.log('candiates in app.jsx - ', candidates);
  }, []);

  const handleFileChange = (e) => {
    const reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.onload = () => setFile(reader.result.split(",")[1]);
  };

  const uploadFile = async () => {
    if (!file) {
      toast.error("Please select an Excel file!");
      return;
    }

    setLoading(true);
    try {
      await axios.post("http://localhost:5000/api/upload", { fileData: file });
      toast.success("File uploaded successfully!");
      fetchCandidates(); // Refresh Data
    } catch (error) {
      toast.error("Upload failed! " + error.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchCandidates = async () => {
    setLoading(true);
    try {
      const res = await axios.get("http://localhost:5000/api/candidates");
      setCandidates(res.data.data);
    } catch (error) {
      toast.error("Failed to fetch data!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-100 p-4">
      <ToastContainer />
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Upload Candidate Data</h1>

      {/* <div className="flex flex-col items-center bg-white p-6 rounded-lg shadow-md">
        <input
          type="file"
          accept=".xlsx, .xls"
          onChange={handleFileChange}
          className="mb-4"
        />
        <FiUpload className="mr-2" />
        <button
          onClick={uploadFile}
          className="flex cursor-pointer items-center px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
          disabled={loading}
        >
          {loading ? "Uploading..." : <><FiUpload className="mr-2" /> Upload</>}
        </button>
      </div> */}


      {/* new code for upload button */}

      <div className="flex items-center justify-center gap-4 bg-white p-6 rounded-lg shadow-lg border border-gray-200">
        {/* File Input */}
        <label className="w-full flex flex-col items-center px-4 py-3 bg-gray-100 rounded-lg border border-gray-300 cursor-pointer hover:bg-gray-200 transition">
          {/* <FiUpload className="text-blue-500 mb-2 text-2xl" /> */}
          <input
            type="file"
            id="file-input"
            name="file"
            accept=".xlsx, .xls"
            onChange={handleFileChange}
            className=""
          />
        </label>

        {/* Upload Button */}
        <button
          onClick={uploadFile}
          className={`mt-4 flex items-center px-6 py-2 text-white rounded-lg transition 
            ${loading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600 cursor-pointer"}
            `}
          disabled={loading}
        >
          {loading ? (
            "Uploading..."
          ) : (
            <>
              <FiUpload className="mr-2" /> Upload
            </>
          )}
        </button>
      </div>


      <h2 className="text-2xl font-semibold mt-8 text-gray-700">Profiles</h2>
      {loading && <p className="text-gray-500">Loading...</p>}

      {/* Grid Layout for Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6 w-full max-w-6xl">
        {candidates.map((c, i) => (
          <div
            key={i}
            className="bg-white cursor-pointer rounded-lg shadow-lg overflow-hidden transform transition duration-300 hover:shadow-2xl hover:scale-105"
          >
            {/* Profile Picture - Now Circular and Centered */}
            <div className="flex justify-center pt-6">
              <img
                className="w-24 h-24 rounded-full border-4 border-blue-500 object-cover"
                src={c.avatar || `https://robohash.org/${c.name}?size=200x200`}
                alt={c.name}
              />
            </div>

            {/* Card Content */}
            <div className="px-6 py-4 text-center">
              <h3 className="text-xl font-bold text-gray-900">{c.name}</h3>
              <p className="text-gray-600 text-sm">@{c.email}</p>
              <p className="text-gray-700 font-medium">📞 {c.phone}</p>
              <p className="text-gray-700 font-medium">📍 {c.city}</p>
              <p className="text-gray-500 text-sm mt-1">
                🎂 {c.dob ? new Date(c.dob).toLocaleDateString() : "N/A"}
              </p>
            </div>

            {/* Tag Section - Centered and Styled */}
            <div className="px-6 pb-4 flex flex-wrap justify-center gap-2">
              <span className="bg-gray-200 text-gray-700 px-3 py-1 text-sm font-semibold rounded-full">
                {c.gender}
              </span>
              <span className="bg-blue-200 text-blue-700 px-3 py-1 text-sm font-semibold rounded-full">
                Candidate
              </span>
              <span className="bg-green-200 text-green-700 px-3 py-1 text-sm font-semibold rounded-full">
                Active
              </span>
            </div>
          </div>
        ))}
      </div>


    </div>
  );
}

export default App;
