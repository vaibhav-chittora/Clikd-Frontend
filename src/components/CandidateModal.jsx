import React, { useState, useEffect } from "react";
import { IoMdClose } from "react-icons/io";
import axios from "axios";

const CandidateModal = ({ candidate, onClose, onSave }) => {
    const [formData, setFormData] = useState({ ...candidate });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    // Sync modal state when candidate changes
    useEffect(() => {
        setFormData({ ...candidate });
    }, [candidate]);

    // Handle input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSave = async () => {
        setLoading(true);
        setError("");

        try {
            // API call to update candidate
            const res = await axios.put(
                `http://localhost:5000/api/candidates/${candidate._id}`,
                formData
            );

            // Call parent update function with the new data
            onSave(res.data.data);
            onClose();
        } catch (err) {
            console.error(err);
            setError("Update failed. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="relative bg-white rounded-lg shadow-xl p-6 w-full max-w-2xl">
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-600 hover:text-red-600"
                >
                    <IoMdClose size={24} />
                </button>
                <h2 className="text-2xl font-semibold mb-4">Edit Candidate Details</h2>
                <div className="flex flex-col md:flex-row gap-6">
                    {/* Candidate Image */}
                    <div className="flex-shrink-0 flex flex-col items-center">
                        <img
                            className="w-40 h-40 rounded-full object-cover"
                            src={
                                formData.avatar ||
                                `https://robohash.org/${formData.name}?size=200x200`
                            }
                            alt={formData.name}
                        />
                    </div>
                    {/* Form Fields */}
                    <div className="flex-1 grid grid-cols-1 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Name</label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                className="mt-1 p-2 border rounded w-full"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Email</label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                className="mt-1 p-2 border rounded w-full"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Phone</label>
                            <input
                                type="tel"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                className="mt-1 p-2 border rounded w-full"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">City</label>
                            <input
                                type="text"
                                name="city"
                                value={formData.city}
                                onChange={handleChange}
                                className="mt-1 p-2 border rounded w-full"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Date of Birth</label>
                            <input
                                type="date"
                                name="dob"
                                value={formData.dob ? formData.dob.split("T")[0] : ""}
                                onChange={handleChange}
                                className="mt-1 p-2 border rounded w-full"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Status</label>
                            <select
                                name="status"
                                value={formData.status}
                                onChange={handleChange}
                                className="mt-1 p-2 border rounded w-full"
                            >
                                <option value="Active">Active</option>
                                <option value="Rejected">Rejected</option>
                                <option value="Pending">Pending</option>
                            </select>
                        </div>
                    </div>
                </div>
                {error && <p className="text-red-600 mt-2">{error}</p>}
                <div className="flex justify-end gap-4 mt-6">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleSave}
                        disabled={loading}
                        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                    >
                        {loading ? "Saving..." : "Save Changes"}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CandidateModal;
