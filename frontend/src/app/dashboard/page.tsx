// app/dashboard/page.tsx
"use client";

import { useState, useEffect } from "react";
import OnboardingWrapper from "@/components/onboardingModal.tsx/onboardinWrapper";
import DoctorsDashboard from "@/components/dashboard/doctorDetails";

// Mock function to simulate API call
const saveOnboardingData = async (data: any) => {
  console.log("Saving onboarding data:", data);
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ success: true });
    }, 1000);
  });
};

// New function to check onboarding status from backend
const checkOnboardingStatus = async () => {
  try {
    // Get user data from localStorage or context
    const userData = localStorage.getItem("user");
    if (!userData) return false;

    const user = JSON.parse(userData);

    // In a real app, you would make an API call to check onboarding status
    const response = await fetch(
      `http://localhost:5000/api/users/${user.id}/onboarding-status`
    );
    const data = await response.json();

    return data.onboardingComplete || false;
  } catch (error) {
    console.error("Error checking onboarding status:", error);
    return false;
  }
};

// New function to update onboarding status on backend
const updateOnboardingStatus = async (status: boolean) => {
  try {
    const userData = localStorage.getItem("user");
    if (!userData) return;

    const user = JSON.parse(userData);

    // In a real app, you would make an API call to update onboarding status
    await fetch(
      `http://localhost:5000/api/users/${user.id}/onboarding-status`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ onboardingComplete: status }),
      }
    );
  } catch (error) {
    console.error("Error updating onboarding status:", error);
  }
};

export default function Dashboard() {
  const [onboardingComplete, setOnboardingComplete] = useState(false);
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkStatus = async () => {
      // Check if onboarding was already completed from backend
      const isOnboardingComplete = await checkOnboardingStatus();

      if (!isOnboardingComplete) {
        setShowOnboarding(true);
      } else {
        setOnboardingComplete(true);
      }
      setIsLoading(false);
    };

    checkStatus();
  }, []);

  const handleOnboardingComplete = async (data: any) => {
    try {
      // Save data to your backend
      await saveOnboardingData(data);
      console.log("Onboarding data saved successfully");
    } catch (error) {
      console.error("Failed to save onboarding data:", error);
      alert("Failed to save data. Please try again.");
    }
  };

  const handleProceedToDashboard = async () => {
    setShowOnboarding(false);
    setOnboardingComplete(true);
    // Update onboarding status on backend
    await updateOnboardingStatus(true);
  };

  const handleOnboardingClose = () => {
    if (
      confirm(
        "Are you sure you want to cancel onboarding? You'll need to complete it to access the dashboard."
      )
    ) {
      setShowOnboarding(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-md">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      {/* Onboarding Modal */}
      {showOnboarding && (
        <OnboardingWrapper
          onComplete={handleOnboardingComplete}
          onClose={handleOnboardingClose}
          onProceedToDashboard={handleProceedToDashboard}
        />
      )}

      {/* Dashboard Content - conditionally rendered */}
      {onboardingComplete ? (
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-800 mb-6">Dashboard</h1>
          <DoctorsDashboard />
        </div>
      ) : !showOnboarding ? (
        <div className="max-w-4xl mx-auto">
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Onboarding Required
            </h2>
            <p className="text-gray-600 mb-4">
              You need to complete the onboarding process to access the
              dashboard.
            </p>
            <button
              onClick={() => setShowOnboarding(true)}
              className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            >
              Start Onboarding
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
}
