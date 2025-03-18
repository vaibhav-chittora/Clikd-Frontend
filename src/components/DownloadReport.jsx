import * as XLSX from "xlsx";
import { FiDownload } from "react-icons/fi";

const DownloadReport = ({ candidates }) => {
    const handleDownload = () => {
        if (candidates.length === 0) {
            alert("No data available to download!");
            return;
        }

        const worksheet = XLSX.utils.json_to_sheet(candidates);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Candidates Report");

        XLSX.writeFile(workbook, "Candidates_Report.xlsx");
    };

    return (
        <button
            onClick={handleDownload}
            className="mt-4 flex items-center cursor-pointer p-1 text-xs rounded-lg transition"
            title="Download Excel Report"
        >
            <FiDownload className=" size-8" />
            {/* Download Excel Report */}
        </button>
    );
};

export default DownloadReport;
