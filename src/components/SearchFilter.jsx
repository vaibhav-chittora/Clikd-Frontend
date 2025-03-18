import { useState } from "react";
import { LuRefreshCw } from "react-icons/lu";
import DownloadReport from "./DownloadReport"; // Import DownloadReport component

const SearchFilter = ({ onSearch, onFilter, candidates }) => {
    const [search, setSearch] = useState("");
    const [selectedCity, setSelectedCity] = useState("");
    const [selectedGender, setSelectedGender] = useState("");

    // Handle Search
    const handleSearch = (e) => {
        const value = e.target.value;
        setSearch(value);
        onSearch(value);
    };

    // Handle City Filter
    const handleCityChange = (e) => {
        const value = e.target.value;
        setSelectedCity(value);
        onFilter("city", value);
    };

    // Handle Gender Filter
    const handleGenderChange = (e) => {
        const value = e.target.value;
        setSelectedGender(value);
        onFilter("gender", value);
    };

    // Reset Filters
    const resetFilters = () => {
        setSearch("");
        setSelectedCity("");
        setSelectedGender("");
        onSearch("");
        onFilter("city", "");
        onFilter("gender", "");
    };

    return (
        <div className="flex flex-col sm:flex-row gap-4 items-center bg-white p-4 rounded-lg shadow-md w-full max-w-4xl">
            {/* Search Input */}
            <input
                type="text"
                placeholder="Search by name, city, etc..."
                value={search}
                onChange={handleSearch}
                className="border p-2 rounded-lg w-full sm:w-auto focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all"
            />

            {/* City Filter */}
            <select
                value={selectedCity}
                onChange={handleCityChange}
                className="border p-2 rounded-lg w-full sm:w-auto focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all"
            >
                <option value="">Select City</option>
                <option value="Delhi">Delhi</option>
                <option value="Mumbai">Mumbai</option>
                <option value="Kolkata">Kolkata</option>
            </select>

            {/* Gender Filter */}
            <select
                value={selectedGender}
                onChange={handleGenderChange}
                className="border p-2 rounded-lg w-full sm:w-auto focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all"
            >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
            </select>

            {/* Buttons Container */}
            <div className="flex items-center justify-center gap-2">
                {/* Reset Filters Button */}
                <button
                    onClick={resetFilters}
                    className="  transition-all  cursor-pointer"
                    title="Reset Filters"
                >
                    <LuRefreshCw className="text-red-500 hover:text-red-600 size-8" />

                </button>

                {/* Download Report Button (Side by Side) */}
                <DownloadReport candidates={candidates} />
            </div>
        </div>
    );
};

export default SearchFilter;
