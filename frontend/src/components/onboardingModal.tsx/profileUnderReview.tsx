// components/onboardingModal/profileUnderReview.tsx
import React, { useEffect, useState } from "react";
import { XMarkIcon } from "@heroicons/react/24/outline";

interface ProfileUnderReviewProps {
  onClose: () => void;
  onProceedToDashboard: () => void;
  autoRedirect?: boolean;
  redirectDelay?: number; // in milliseconds
}

const ProfileUnderReview: React.FC<ProfileUnderReviewProps> = ({
  onClose,
  onProceedToDashboard,
  autoRedirect = true,
  redirectDelay = 3000, // 3 seconds default
}) => {
  const [countdown, setCountdown] = useState(Math.floor(redirectDelay / 1000));

  useEffect(() => {
    if (!autoRedirect) return;

    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          onProceedToDashboard();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [autoRedirect, redirectDelay, onProceedToDashboard]);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-lg max-w-md w-full p-6 sm:p-8 text-center">
        {/* Close Button */}
        <div className="flex justify-end mb-4">
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <XMarkIcon className="h-6 w-6" />
          </button>
        </div>

        {/* Under Review Image */}
        <div className="mb-6">
          <img
            src="/underReview.png"
            alt="Profile Under Review"
            className="mx-auto w-32 h-32 object-contain"
          />
        </div>

        {/* Title */}
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">
          Please Wait Your Profile Is Under Review
        </h2>

        {/* Description */}
        <p className="text-gray-500 text-sm leading-relaxed mb-6">
          Our team is carefully reviewing your information. You'll be notified
          once the process is complete or any extra information is needed.
        </p>

        {/* Auto-redirect countdown (if enabled) */}
        {autoRedirect && (
          <p className="text-blue-500 text-sm mb-4">
            Redirecting to dashboard in {countdown} seconds...
          </p>
        )}

        {/* Manual Proceed Button */}
        <div className="space-y-3">
          <button
            onClick={onProceedToDashboard}
            className="w-full px-6 py-3 bg-blue-500 text-white rounded-md font-medium hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
          >
            Go to Dashboard
          </button>

          <button
            onClick={onClose}
            className="w-full px-6 py-3 bg-gray-100 text-gray-700 rounded-md font-medium hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileUnderReview;
