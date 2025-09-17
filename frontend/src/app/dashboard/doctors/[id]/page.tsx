// app/dashboard/doctors/[id]/page.tsx
"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, Award, Users, Calendar, Clock } from "lucide-react";
import ActionModal from "@/components/ui/modal/actionModal";

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
  profileImage?: string;
  language?: string;
  about?: string;
}

// Field configuration for doctor info display
const getDoctorFields = (doctor: Doctor) => [
  { label: "Email:", key: "email", value: doctor.email },
  { label: "Phone Number:", key: "phoneNumber", value: doctor.phoneNumber },
  { label: "Gender:", key: "gender", value: doctor.gender },
  {
    label: "Consultation Type:",
    key: "consultationType",
    value: doctor.consultationType,
  },
  {
    label: "Qualification:",
    key: "qualification",
    value: doctor.qualification,
  },
  { label: "Specialty", key: "specialty", value: doctor.specialty },
  { label: "Expertise", key: "expertise", value: doctor.expertise },
  { label: "Experience", key: "experience", value: doctor.experience },
  { label: "Services", key: "services", value: "Antenatal Care" },
  { label: "Language", key: "language", value: doctor.language },
  { label: "About", key: "about", value: doctor.about, fullWidth: true },
];

// Analytics data
const analyticsData = [
  { icon: Users, label: "Total Patients", value: "245", color: "blue" },
  { icon: Calendar, label: "Appointments", value: "89", color: "green" },
  { icon: Clock, label: "Hours Worked", value: "156", color: "purple" },
];

// Documents data
const documentsData = [
  { title: "Doctor Picture", type: "image" },
  { title: "Medical License", type: "license", color: "blue" },
  { title: "License With Skills", type: "license", color: "teal" },
];

// Consultations data
const consultationsData = [
  { id: "001", type: "General Checkup", time: "2 hours ago" },
  { id: "002", type: "Follow-up", time: "1 day ago" },
];

// Patients data
const patientsData = [
  {
    name: "John Doe",
    initials: "JD",
    visit: "2 days ago",
    status: "Active",
    color: "blue",
    statusColor: "green",
  },
  {
    name: "Jane Smith",
    initials: "JS",
    visit: "1 week ago",
    status: "Pending",
    color: "purple",
    statusColor: "yellow",
  },
];

// Subscription data
const subscriptionData = [
  { label: "Start Date", value: "January 1, 2024" },
  { label: "End Date", value: "December 31, 2024" },
  { label: "Monthly Fee", value: "$99.00" },
  { label: "Next Billing", value: "February 1, 2024" },
];

// Payment history data
const paymentHistoryData = [
  { month: "January 2024", id: "PAY_001" },
  { month: "December 2023", id: "PAY_002" },
];

// Tab content components
const TabComponents = {
  Analytics: () => (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {analyticsData.map(({ icon: Icon, label, value, color }) => (
        <div key={label} className={`bg-${color}-50 p-4 rounded-lg`}>
          <div className="flex items-center space-x-2">
            <Icon className={`w-5 h-5 text-${color}-600`} />
            <span className="text-sm text-gray-600">{label}</span>
          </div>
          <p className={`text-2xl font-semibold text-${color}-600 mt-2`}>
            {value}
          </p>
        </div>
      ))}
    </div>
  ),

  Documents: () => (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
      {documentsData.map(({ title, type, color }) => (
        <div key={title} className="text-center">
          <h4 className="text-sm font-normal text-gray-700 mb-3">{title}</h4>
          <div className="w-20 h-24 mx-auto mb-2 rounded-lg overflow-hidden">
            {type === "image" ? (
              <img
                src="/api/placeholder/80/96"
                alt="Doctor"
                className="w-full h-full object-cover bg-gray-100"
              />
            ) : (
              <div
                className={`w-full h-full bg-${color}-50 border border-${color}-200 rounded-lg flex items-center justify-center`}
              >
                <div
                  className={`w-12 h-12 bg-${color}-100 rounded-lg flex items-center justify-center`}
                >
                  <Award className={`w-6 h-6 text-${color}-600`} />
                </div>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  ),

  Consultations: () => (
    <div className="space-y-4">
      {consultationsData.map(({ id, type, time }) => (
        <div
          key={id}
          className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
        >
          <div>
            <p className="font-medium">Patient #{id}</p>
            <p className="text-sm text-gray-600">{type}</p>
          </div>
          <span className="text-sm text-gray-500">{time}</span>
        </div>
      ))}
    </div>
  ),

  Patients: () => (
    <div className="space-y-4">
      {patientsData.map(
        ({ name, initials, visit, status, color, statusColor }) => (
          <div
            key={name}
            className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
          >
            <div className="flex items-center space-x-3">
              <div
                className={`w-10 h-10 bg-${color}-500 rounded-full flex items-center justify-center text-white font-medium`}
              >
                {initials}
              </div>
              <div>
                <p className="font-medium">{name}</p>
                <p className="text-sm text-gray-600">Last visit: {visit}</p>
              </div>
            </div>
            <span
              className={`px-2 py-1 bg-${statusColor}-100 text-${statusColor}-700 text-xs rounded-full`}
            >
              {status}
            </span>
          </div>
        )
      )}
    </div>
  ),

  "Subscription Detail": () => (
    <div className="bg-gradient-to-r from-teal-50 to-blue-50 p-6 rounded-lg">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
        <h4 className="text-lg font-semibold mb-2 sm:mb-0">Premium Plan</h4>
        <span className="px-3 py-1 bg-green-100 text-green-700 text-sm rounded-full w-fit">
          Active
        </span>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {subscriptionData.map(({ label, value }) => (
          <div key={label}>
            <p className="text-sm text-gray-600">{label}</p>
            <p className="font-medium">{value}</p>
          </div>
        ))}
      </div>
    </div>
  ),

  "Payment History": () => (
    <div className="space-y-4">
      {paymentHistoryData.map(({ month, id }) => (
        <div
          key={id}
          className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-4 bg-gray-50 rounded-lg"
        >
          <div className="mb-2 sm:mb-0">
            <p className="font-medium">{month} Subscription</p>
            <p className="text-sm text-gray-600">Payment ID: {id}</p>
          </div>
          <div className="text-left sm:text-right">
            <p className="font-medium">$99.00</p>
            <span className="text-sm text-green-600">Paid</span>
          </div>
        </div>
      ))}
    </div>
  ),
};

// Tab titles mapping
const tabTitles = {
  Analytics: "Analytics Overview",
  Documents: "",
  Consultations: "Recent Consultations",
  Patients: "Patient List",
  "Subscription Detail": "Subscription Details",
  "Payment History": "Payment History",
};

export default function DoctorDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const [doctor, setDoctor] = useState<Doctor | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState("Documents");
  const [modalOpen, setModalOpen] = useState(false);
  const [modalAction, setModalAction] = useState<"accept" | "reject">("accept");

  const doctorId = params.id;
  const tabs = Object.keys(TabComponents);

  useEffect(() => {
    const fetchDoctor = async () => {
      if (!doctorId) return;

      try {
        setLoading(true);
        const response = await fetch(
          `http://localhost:5000/api/doctors/${doctorId}`
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data: Doctor = await response.json();
        setDoctor(data);
      } catch (err) {
        console.error("Error fetching doctor:", err);
        setError("Failed to fetch doctor details");
      } finally {
        setLoading(false);
      }
    };

    fetchDoctor();
  }, [doctorId]);

  // Modal handler functions - THESE ARE CRITICAL
  const handleAction = (action: "accept" | "reject") => {
    setModalAction(action);
    setModalOpen(true);
  };

  const handleModalConfirm = (reason?: string) => {
    console.log(`${modalAction}ing doctor:`, doctorId);
    if (reason) {
      console.log("Rejection reason:", reason);
    }
    // Implement your actual accept/reject API call here
    setModalOpen(false);
  };

  const handleModalClose = () => {
    setModalOpen(false);
  };

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="flex items-center space-x-2">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-teal-500"></div>
          <span className="text-gray-600">Loading doctor details...</span>
        </div>
      </div>
    );
  }

  // Error state
  if (error || !doctor) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="bg-red-50 border border-red-200 rounded-md p-4 max-w-md w-full text-center">
          <p className="text-red-800 mb-4">
            Error: {error || "Doctor not found"}
          </p>
          <button
            onClick={() => router.back()}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <button
                onClick={() => router.back()}
                className="p-1 hover:bg-gray-100 rounded transition-colors"
                aria-label="Go back"
              >
                <ArrowLeft className="w-5 h-5 text-gray-600" />
              </button>
              <h1 className="text-lg font-bold text-gray-900">
                Doctor Details
              </h1>
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => handleAction("reject")}
                className="cursor-pointer px-4 py-1.5 text-sm font-normal text-gray-600 bg-[#8DC64533] hover:bg-gray-200 rounded-md transition-colors"
              >
                Reject
              </button>
              <button
                onClick={() => handleAction("accept")}
                className="cursor-pointer px-4 py-1.5 text-sm font-normal text-white bg-cyan-600 hover:bg-cyan-700 rounded-md transition-colors"
              >
                Accept
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-4">
        {/* Doctor Profile Section */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-5 mb-4">
          <div className="flex space-x-4 mb-5 justify-center items-center">
            <div className="w-14 h-14 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
              <img
                src={doctor.profileImage || "/api/placeholder/56/56"}
                alt={`Dr. ${doctor.name}`}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1 min-w-0">
              <h2 className="text-lg font-bold text-gray-900">
                Dr. {doctor.name}
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-4 sm:gap-x-8 gap-y-4">
            {getDoctorFields(doctor).map(({ label, key, value, fullWidth }) => (
              <div
                key={label}
                className={fullWidth ? "sm:col-span-2 lg:col-span-2" : ""}
              >
                <h3 className="text-[18px] font-bold text-gray-900 mb-1">
                  {label}
                </h3>
                <p className="text-sm text-gray-500">{value || "N/A"}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="border-b border-gray-200">
            <nav className="flex px-5 overflow-x-auto">
              {tabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`py-4 px-3 text-sm font-normal border-b-2 transition-colors whitespace-nowrap ${
                    activeTab === tab
                      ? "border-cyan-400 text-[#2CA8E0]"
                      : "border-transparent text-gray-400 hover:text-gray-600 hover:border-gray-300"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </nav>
          </div>

          {/* Tab Content */}
          <div className="p-6">
            {tabTitles[activeTab as keyof typeof tabTitles] && (
              <h3 className="text-lg font-medium text-[#2CA8E0] mb-4">
                {tabTitles[activeTab as keyof typeof tabTitles]}
              </h3>
            )}
            {TabComponents[activeTab as keyof typeof TabComponents]()}
          </div>
        </div>
      </div>

      {/* Action Modal */}
      <ActionModal
        isOpen={modalOpen}
        onClose={handleModalClose}
        onConfirm={handleModalConfirm}
        action={modalAction}
        doctorName={doctor?.name || ""}
      />
    </div>
  );
}
