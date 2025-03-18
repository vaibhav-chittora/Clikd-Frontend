import { useState } from "react";
import { FiUpload } from "react-icons/fi";
import { toast } from "react-toastify";
import axios from "axios";

const FileUpload = ({ fetchCandidates }) => {
    const [file, setFile] = useState(null);
    const [loading, setLoading] = useState(false);

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
            fetchCandidates();
        } catch (error) {
            toast.error("Upload failed! " + error.response?.data?.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <div className="flex items-center cursor-pointer justify-center gap-4 p-3 rounded-lg shadow-lg border border-gray-200">
                <input type="file" accept=".xlsx, .xls" onChange={handleFileChange} />
            </div>
            <button
                onClick={uploadFile}
                className={`mt-4 flex items-center px-6 py-2 text-white rounded-lg transition 
                    ${loading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600 cursor-pointer"}`}
                disabled={loading}
            >
                {loading ? "Uploading..." : <><FiUpload className="mr-2" /> Upload</>}
            </button>
        </>
    );
};

export default FileUpload;
