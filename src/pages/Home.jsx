// Home.jsx (Updated with Modal & API Integration)
import { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SearchFilter from "../components/SearchFilter";
import FileUpload from "../components/FileUpload";
import CandidateCard from "../components/CandidateCard";
import DownloadReport from "../components/DownloadReport";
import CandidateModal from "../components/CandidateModal";

const Home = () => {
    const [candidates, setCandidates] = useState([]);
    const [filteredCandidates, setFilteredCandidates] = useState([]);
    const [selectedCandidate, setSelectedCandidate] = useState(null);

    useEffect(() => {
        fetchCandidates();
    }, []);

    const fetchCandidates = async () => {
        try {
            const res = await axios.get("http://localhost:5000/api/candidates");
            setCandidates(res.data.data);
            setFilteredCandidates(res.data.data);
        } catch (error) {
            toast.error("Failed to fetch data!");
        }
    };

    const handleSearch = (query) => {
        const filtered = candidates.filter((c) =>
            c.name.toLowerCase().includes(query.toLowerCase())
        );
        setFilteredCandidates(filtered);
    };

    const handleFilter = (type, value) => {
        if (!value) {
            setFilteredCandidates(candidates);
            return;
        }
        const filtered = candidates.filter((c) => c[type] === value);
        setFilteredCandidates(filtered);
    };

    const handleUpdateCandidate = async (updatedCandidate) => {
        try {
            const res = await axios.put(
                `http://localhost:5000/api/candidates/${updatedCandidate._id}`,
                updatedCandidate
            );

            // Update UI immediately without refetching all candidates
            setCandidates((prev) =>
                prev.map((c) => (c._id === updatedCandidate._id ? res.data.data : c))
            );
            setFilteredCandidates((prev) =>
                prev.map((c) => (c._id === updatedCandidate._id ? res.data.data : c))
            );

            toast.success("Candidate updated successfully!");
        } catch (error) {
            toast.error("Failed to update candidate!");
        }
    };


    return (
        <div className="min-h-screen flex flex-col items-center bg-gray-100 p-4">
            <ToastContainer />
            <h1 className="text-3xl font-bold mb-6 text-gray-800">Candidate Details</h1>
            <div className="flex sm:flex-row gap-4 items-center justify-center mb-6 p-4 bg-white rounded-lg shadow-md w-full ">
                <FileUpload fetchCandidates={fetchCandidates} />
                <SearchFilter onSearch={handleSearch} onFilter={handleFilter} />
                {/* <DownloadReport candidates={filteredCandidates} /> */}
            </div>
            <h2 className="text-2xl font-semibold mt-8 text-gray-700">Profiles</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6 w-full max-w-6xl">
                {filteredCandidates.map((c, i) => (
                    <CandidateCard key={i} candidate={c} onClick={() => setSelectedCandidate(c)} />
                ))}
            </div>
            {selectedCandidate && (
                <CandidateModal
                    candidate={selectedCandidate}
                    onClose={() => setSelectedCandidate(null)}
                    onSave={handleUpdateCandidate}
                />
            )}
        </div>
    );
};

export default Home;
