const CandidateCard = ({ candidate, onClick }) => {
    return (
        <div
            className="bg-white cursor-pointer rounded-lg shadow-md overflow-hidden transform transition-all duration-300 hover:shadow-lg hover:scale-105 border border-gray-200"
            onClick={onClick}
        >
            {/* Profile Image (Circular) */}
            <div className="flex justify-center pt-5">
                <img
                    className="w-20 h-20 rounded-full border-2 border-gray-300 object-cover"
                    src={candidate.avatar || `https://robohash.org/${candidate.name}?size=200x200`}
                    alt={candidate.name}
                />
            </div>

            {/* Card Content with Side-by-Side Layout */}
            <div className="px-5 py-4">
                {/* Name and City */}
                <div className="flex justify-between items-center mb-2">
                    <div className="flex flex-col">
                        <span className="text-xs text-gray-500">Name</span>
                        <span className="text-sm font-medium text-gray-800">{candidate.name}</span>
                    </div>
                    <div className="flex flex-col text-right">
                        <span className="text-xs text-gray-500">City</span>
                        <span className="text-sm font-medium text-gray-800">{candidate.city}</span>
                    </div>
                </div>

                {/* Email and DOB */}
                <div className="flex justify-between items-center mb-2">
                    <div className="flex flex-col">
                        <span className="text-xs text-gray-500">Email</span>
                        <a
                            href={`mailto:${candidate.email}`}
                            className="text-sm font-medium text-blue-600 hover:underline"
                        >
                            {candidate.email.slice(0, 18)}...
                        </a>
                    </div>
                    <div className="flex flex-col text-right">
                        <span className="text-xs text-gray-500">Date of Birth</span>
                        <span className="text-sm font-medium text-gray-800">
                            {candidate.dob
                                ? new Date(candidate.dob).toLocaleDateString("en-GB", {
                                    day: "2-digit",
                                    month: "2-digit",
                                    year: "numeric"
                                })
                                : "N/A"}
                        </span>


                    </div>
                </div>

                {/* Phone and Status */}
                <div className="flex justify-between items-center">
                    <div className="flex flex-col">
                        <span className="text-xs text-gray-500">Phone</span>
                        <a
                            href={`tel:${candidate.phone}`}
                            className="text-sm font-medium text-blue-600 hover:underline"
                        >
                            {candidate.phone}
                        </a>
                    </div>
                    <div className="flex flex-col text-right">
                        <span className="text-xs text-gray-500">Status</span>
                        <span
                            className={`text-sm font-medium px-2 py-1 rounded-md ${candidate.status === "Active"
                                ? "text-green-600 bg-green-50"
                                : candidate.status === "Rejected"
                                    ? "text-red-600 bg-red-50"
                                    : "text-yellow-600 bg-yellow-50"
                                }`}
                        >
                            {candidate.status}
                        </span>
                    </div>
                </div>
            </div>

            {/* Experience & Skills Section */}
            <div className="px-5 pb-4 flex justify-between">
                <span className="bg-yellow-50 text-yellow-600 px-3 py-1 text-xs rounded-md border border-yellow-100">
                    {candidate.experience || "Fresher"}
                </span>
                <span className="bg-purple-50 text-purple-600 px-3 py-1 text-xs rounded-md border border-purple-100">
                    {candidate.skills?.join(", ") || "N/A"}
                </span>
            </div>

            {/* LinkedIn & Resume Section */}
            <div className="px-5 pb-4 flex justify-between text-sm">
                {candidate.linkedin && (
                    <a
                        href={candidate.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500 hover:underline"
                    >
                        🔗 LinkedIn
                    </a>
                )}
                {candidate.resume && (
                    <a
                        href={candidate.resume}
                        download
                        className="text-green-500 hover:underline"
                    >
                        📄 Resume
                    </a>
                )}
            </div>
        </div>
    );
};

export default CandidateCard;
