// components/dashboard/doctorDetails.tsx

"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Search,
  Eye,
  Edit,
  Trash2,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

interface Doctor {
  id: number;
  name: string;
  email: string;
  phoneNumber: string;
  qualification: string;
  consultationType: string;
  // Add other fields from your API response
  gender?: string;
  specialty?: string;
  expertise?: string;
  experience?: string;
}

export default function DoctorsDashboard() {
  const router = useRouter();
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const fetchDoctors = async () => {
    try {
      setLoading(true);
      const response = await fetch(`http://localhost:5000/api/doctors`);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data: Doctor[] = await response.json();

      // Filter doctors based on search query
      const filteredDoctors = data.filter(
        (doctor) =>
          doctor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          doctor.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
          doctor.phoneNumber.includes(searchQuery)
      );

      setDoctors(filteredDoctors);
    } catch (err) {
      console.error("Error fetching doctors:", err);
      setError("Failed to fetch doctors data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDoctors();
  }, [searchQuery]);

  // Calculate pagination values
  const totalDoctors = doctors.length;
  const totalPages = Math.ceil(totalDoctors / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedDoctors = doctors.slice(startIndex, startIndex + itemsPerPage);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentPage(1);
    fetchDoctors();
  };

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const handleAction = (action: string, doctorId: number) => {
    console.log(`${action} action for doctor ID: ${doctorId}`);
    // Implement your action handlers here
    switch (action) {
      case "view":
        // Navigate to doctor details page
        router.push(`/dashboard/doctors/${doctorId}`);
        break;
      case "edit":
        // Handle edit doctor
        break;
      case "delete":
        // Handle delete doctor
        if (confirm("Are you sure you want to delete this doctor?")) {
          // Implement delete functionality
        }
        break;
    }
  };

  const renderPagination = () => {
    const pages = [];
    const maxVisiblePages = 8;
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    if (endPage - startPage < maxVisiblePages - 1) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <button
          key={i}
          onClick={() => handlePageChange(i)}
          className={`w-8 h-8 flex items-center justify-center text-sm ${
            i === currentPage
              ? "bg-teal-500 text-white rounded"
              : "text-gray-500 hover:text-gray-700"
          }`}
        >
          {i}
        </button>
      );
    }

    return (
      <div className="flex items-center justify-between px-6 py-4 bg-white border-t">
        <div className="flex items-center space-x-1">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-gray-600 disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          {pages}

          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-gray-600 disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <ChevronRight className="w-4 h-4" />
          </button>

          <span className="ml-6 text-sm text-orange-500">
            {startIndex + 1} -{" "}
            {Math.min(startIndex + itemsPerPage, totalDoctors)} of{" "}
            {totalDoctors}
          </span>
        </div>

        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-500">Rows per page</span>
          <select
            value={itemsPerPage}
            onChange={(e) => {
              setItemsPerPage(Number(e.target.value));
              setCurrentPage(1);
            }}
            className="px-2 py-1 text-sm border border-gray-300 rounded bg-white min-w-16"
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={15}>15</option>
            <option value={25}>25</option>
            <option value={50}>50</option>
          </select>
        </div>
      </div>
    );
  };

  // Helper function to split name into first and last name
  const splitName = (fullName: string) => {
    const parts = fullName.trim().split(" ");
    if (parts.length === 1) {
      return { firstName: parts[0], lastName: "" };
    }
    const firstName = parts[0];
    const lastName = parts.slice(1).join(" ");
    return { firstName, lastName };
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-teal-500"></div>
        <span className="ml-2 text-gray-600">Loading doctors...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-md p-4">
        <p className="text-red-800">Error: {error}</p>
        <button
          onClick={() => fetchDoctors()}
          className="mt-2 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white">
      {/* Header */}
      <div className="px-6 py-4 bg-gray-50 border-b border-l-4 border-l-teal-500">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-medium text-gray-800">All Doctors</h2>

          {/* Search */}
          <form onSubmit={handleSearch} className="flex items-center">
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search by name, email, or phone..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2 w-80 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-teal-500 focus:border-teal-500"
              />
            </div>
          </form>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-100 border-b">
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">
                First Name
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">
                Last Name
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">
                Qualification
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">
                Phone No
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">
                Email
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">
                Consultation Type
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="bg-white">
            {paginatedDoctors.length > 0 ? (
              paginatedDoctors.map((doctor, index) => {
                const { firstName, lastName } = splitName(doctor.name);
                return (
                  <tr
                    key={doctor.id}
                    className="border-b border-gray-100 hover:bg-gray-50 cursor-pointer"
                    onClick={() => handleAction("view", doctor.id)}
                  >
                    <td className="px-6 py-4 text-sm text-gray-700">
                      {firstName}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700">
                      {lastName}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700">
                      {doctor.qualification}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {doctor.phoneNumber}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {doctor.email}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700">
                      <span
                        className={`px-2 py-1 text-xs rounded-full ${
                          doctor.consultationType === "Both"
                            ? "bg-purple-100 text-purple-700"
                            : doctor.consultationType === "Urgent care"
                            ? "bg-orange-100 text-orange-700"
                            : "bg-teal-100 text-teal-700"
                        }`}
                      >
                        {doctor.consultationType}
                      </span>
                    </td>
                    <td
                      className="px-6 py-4 text-sm"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <div className="flex items-center space-x-1">
                        <span className="text-gray-500 text-xs mr-2">
                          Disable
                        </span>
                        <button
                          onClick={() => handleAction("view", doctor.id)}
                          className="w-6 h-6 flex items-center justify-center text-gray-400 hover:text-teal-600 hover:bg-teal-50 rounded"
                          title="View"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleAction("edit", doctor.id)}
                          className="w-6 h-6 flex items-center justify-center text-gray-400 hover:text-teal-600 hover:bg-teal-50 rounded"
                          title="Edit"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleAction("delete", doctor.id)}
                          className="w-6 h-6 flex items-center justify-center text-gray-400 hover:text-red-600 hover:bg-red-50 rounded"
                          title="Delete"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan={7} className="px-6 py-8 text-center text-gray-500">
                  {searchQuery
                    ? "No doctors match your search"
                    : "No doctors found"}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {doctors.length > 0 && renderPagination()}
    </div>
  );
}
