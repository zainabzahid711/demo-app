// components/dashboard/doctorDetails.tsx
"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
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
  gender?: string;
  specialty?: string;
  expertise?: string;
  experience?: string;
}

// Configuration objects to reduce redundancy
const CONSULTATION_TYPE_STYLES = {
  Both: "bg-purple-100 text-purple-700",
  "Urgent care": "bg-orange-100 text-orange-700",
  default: "bg-teal-100 text-teal-700",
};

const ITEMS_PER_PAGE_OPTIONS = [5, 10, 15, 25, 50];

const ACTION_BUTTONS = [
  {
    action: "view",
    icon: Eye,
    title: "View",
    hoverColor: "hover:text-teal-600 hover:bg-teal-50",
  },
  {
    action: "edit",
    icon: Edit,
    title: "Edit",
    hoverColor: "hover:text-teal-600 hover:bg-teal-50",
  },
  {
    action: "delete",
    icon: Trash2,
    title: "Delete",
    hoverColor: "hover:text-red-600 hover:bg-red-50",
  },
];

const TABLE_HEADERS = [
  { key: "firstName", label: "First Name", className: "text-gray-700" },
  {
    key: "lastName",
    label: "Last Name",
    className: "text-gray-700",
    hideOnMobile: true,
  },
  {
    key: "qualification",
    label: "Qualification",
    className: "text-gray-700",
    hideOnMobile: true,
  },
  {
    key: "phoneNumber",
    label: "Phone No",
    className: "text-gray-500",
    hideOnMobile: true,
  },
  {
    key: "email",
    label: "Email",
    className: "text-gray-500",
    hideOnMobile: true,
  },
  {
    key: "consultationType",
    label: "Consultation Type",
    className: "text-gray-700",
  },
  { key: "action", label: "Action", className: "" },
];

export default function DoctorsDashboard() {
  const router = useRouter();
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [allDoctors, setAllDoctors] = useState<Doctor[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  // Memoized filtered doctors to avoid unnecessary re-filtering
  const filteredDoctors = useMemo(() => {
    if (!searchQuery) return allDoctors;

    return allDoctors.filter(
      (doctor) =>
        doctor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        doctor.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        doctor.phoneNumber.includes(searchQuery)
    );
  }, [allDoctors, searchQuery]);

  // Update doctors state when filtered results change
  useEffect(() => {
    setDoctors(filteredDoctors);
    setCurrentPage(1); // Reset to first page when search changes
  }, [filteredDoctors]);

  const fetchDoctors = async () => {
    try {
      setLoading(true);
      const response = await fetch(`http://localhost:5000/api/doctors`);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data: Doctor[] = await response.json();
      setAllDoctors(data);
    } catch (err) {
      console.error("Error fetching doctors:", err);
      setError("Failed to fetch doctors data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDoctors();
  }, []);

  // Memoized pagination calculations
  const paginationData = useMemo(() => {
    const totalDoctors = doctors.length;
    const totalPages = Math.ceil(totalDoctors / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const paginatedDoctors = doctors.slice(
      startIndex,
      startIndex + itemsPerPage
    );

    return {
      totalDoctors,
      totalPages,
      startIndex,
      paginatedDoctors,
    };
  }, [doctors, currentPage, itemsPerPage]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Search is handled by the useMemo hook automatically
  };

  const handlePageChange = useCallback(
    (page: number) => {
      if (page >= 1 && page <= paginationData.totalPages) {
        setCurrentPage(page);
      }
    },
    [paginationData.totalPages]
  );

  const handleAction = useCallback(
    (action: string, doctorId: number) => {
      console.log(`${action} action for doctor ID: ${doctorId}`);

      switch (action) {
        case "view":
          router.push(`/dashboard/doctors/${doctorId}`);
          break;
        case "edit":
          // Handle edit doctor
          break;
        case "delete":
          if (confirm("Are you sure you want to delete this doctor?")) {
            // Implement delete functionality
          }
          break;
      }
    },
    [router]
  );

  // Memoized name splitting function
  const splitName = useCallback((fullName: string) => {
    const parts = fullName.trim().split(" ");
    return {
      firstName: parts[0] || "",
      lastName: parts.length > 1 ? parts.slice(1).join(" ") : "",
    };
  }, []);

  // Memoized consultation type styling
  const getConsultationTypeClass = useCallback((type: string) => {
    return (
      CONSULTATION_TYPE_STYLES[type as keyof typeof CONSULTATION_TYPE_STYLES] ||
      CONSULTATION_TYPE_STYLES.default
    );
  }, []);

  // Optimized pagination renderer
  const renderPagination = useCallback(() => {
    const { totalPages, totalDoctors, startIndex } = paginationData;
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
          className={`w-8 h-8 flex items-center justify-center text-sm transition-colors ${
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
      <div className="flex flex-col sm:flex-row items-center justify-between px-4 sm:px-6 py-4 bg-white border-t gap-4">
        <div className="flex items-center space-x-1 order-2 sm:order-1">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-gray-600 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          <div className="hidden sm:flex space-x-1">{pages}</div>

          {/* Mobile pagination info */}
          <div className="sm:hidden flex items-center space-x-2">
            <span className="text-sm text-gray-500">
              Page {currentPage} of {totalPages}
            </span>
          </div>

          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-gray-600 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
          >
            <ChevronRight className="w-4 h-4" />
          </button>

          <span className="ml-2 sm:ml-6 text-sm text-orange-500 whitespace-nowrap">
            {startIndex + 1} -{" "}
            {Math.min(startIndex + itemsPerPage, totalDoctors)} of{" "}
            {totalDoctors}
          </span>
        </div>

        <div className="flex items-center space-x-2 order-1 sm:order-2">
          <span className="text-sm text-gray-500 whitespace-nowrap">
            Rows per page
          </span>
          <select
            value={itemsPerPage}
            onChange={(e) => {
              setItemsPerPage(Number(e.target.value));
              setCurrentPage(1);
            }}
            className="px-2 py-1 text-sm border border-gray-300 rounded bg-white min-w-16"
          >
            {ITEMS_PER_PAGE_OPTIONS.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
      </div>
    );
  }, [paginationData, currentPage, itemsPerPage, handlePageChange]);

  // Loading state
  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-teal-500"></div>
        <span className="ml-2 text-gray-600">Loading doctors...</span>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-md p-4">
        <p className="text-red-800">Error: {error}</p>
        <button
          onClick={fetchDoctors}
          className="mt-2 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm">
      {/* Header */}
      <div className="px-4 sm:px-6 py-4 bg-gray-50 border-b border-l-4 border-l-teal-500 rounded-t-lg">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
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
                className="pl-10 pr-4 py-2 w-full sm:w-80 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-teal-500 focus:border-teal-500"
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
              {TABLE_HEADERS.map((header) => (
                <th
                  key={header.key}
                  className={`px-4 sm:px-6 py-3 text-left text-sm font-medium text-gray-600 ${
                    header.hideOnMobile ? "hidden sm:table-cell" : ""
                  }`}
                >
                  {header.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white">
            {paginationData.paginatedDoctors.length > 0 ? (
              paginationData.paginatedDoctors.map((doctor) => {
                const { firstName, lastName } = splitName(doctor.name);
                return (
                  <tr
                    key={doctor.id}
                    className="border-b border-gray-100 hover:bg-gray-50 cursor-pointer transition-colors"
                    onClick={() => handleAction("view", doctor.id)}
                  >
                    <td className="px-4 sm:px-6 py-4 text-sm text-gray-700">
                      <div className="sm:hidden">
                        <div className="font-medium">
                          {firstName} {lastName}
                        </div>
                        <div className="text-xs text-gray-500 mt-1">
                          {doctor.qualification}
                        </div>
                      </div>
                      <div className="hidden sm:block">{firstName}</div>
                    </td>
                    <td className="hidden sm:table-cell px-4 sm:px-6 py-4 text-sm text-gray-700">
                      {lastName}
                    </td>
                    <td className="hidden sm:table-cell px-4 sm:px-6 py-4 text-sm text-gray-700">
                      {doctor.qualification}
                    </td>
                    <td className="hidden sm:table-cell px-4 sm:px-6 py-4 text-sm text-gray-500">
                      {doctor.phoneNumber}
                    </td>
                    <td className="hidden sm:table-cell px-4 sm:px-6 py-4 text-sm text-gray-500">
                      {doctor.email}
                    </td>
                    <td className="px-4 sm:px-6 py-4 text-sm text-gray-700">
                      <span
                        className={`px-2 py-1 text-xs rounded-full ${getConsultationTypeClass(
                          doctor.consultationType
                        )}`}
                      >
                        {doctor.consultationType}
                      </span>
                    </td>
                    <td
                      className="px-4 sm:px-6 py-4 text-sm"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <div className="flex items-center space-x-1">
                        <span className="text-gray-500 text-xs mr-2 hidden sm:inline">
                          Disable
                        </span>
                        {ACTION_BUTTONS.map(
                          ({ action, icon: Icon, title, hoverColor }) => (
                            <button
                              key={action}
                              onClick={() => handleAction(action, doctor.id)}
                              className={`w-6 h-6 flex items-center justify-center text-gray-400 ${hoverColor} rounded transition-colors`}
                              title={title}
                            >
                              <Icon className="w-4 h-4" />
                            </button>
                          )
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td
                  colSpan={TABLE_HEADERS.length}
                  className="px-4 sm:px-6 py-8 text-center text-gray-500"
                >
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
