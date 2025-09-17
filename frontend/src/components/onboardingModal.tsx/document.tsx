// components/onboardingModal/documents.tsx
import React, { useState } from "react";
import {
  XMarkIcon,
  PaperClipIcon,
  ChevronDownIcon,
} from "@heroicons/react/24/outline";

interface DocumentsData {
  country: string;
  state: string;
  licenseAttachment: File | null;
}

interface DocumentsProps {
  onSubmit: (data: DocumentsData) => void;
  onPrevious: () => void;
  initialData?: DocumentsData;
  onClose: () => void;
  currentStep: number;
  totalSteps: number;
}

const Documents: React.FC<DocumentsProps> = ({
  onSubmit,
  onPrevious,
  initialData,
  onClose,
  currentStep,
  totalSteps,
}) => {
  const [documentsData, setDocumentsData] = useState<DocumentsData>(
    initialData || {
      country: "USA",
      state: "USA",
      licenseAttachment: null,
    }
  );

  const [countryDropdownOpen, setCountryDropdownOpen] = useState(false);
  const [stateDropdownOpen, setStateDropdownOpen] = useState(false);

  const countries = ["USA", "Canada", "UK", "Australia", "Germany", "France"];
  const states = [
    "USA",
    "California",
    "Texas",
    "New York",
    "Florida",
    "Illinois",
  ];

  const updateData = (
    field: keyof DocumentsData,
    value: string | File | null
  ) => {
    setDocumentsData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    updateData("licenseAttachment", file);
  };

  const removeCountry = () => {
    updateData("country", "");
  };

  const removeState = () => {
    updateData("state", "");
  };

  const handleSubmit = () => {
    if (!documentsData.country || !documentsData.state) {
      alert("Please select both country and state");
      return;
    }
    onSubmit(documentsData);
  };

  const renderSteps = () => {
    return (
      <div className="flex items-center w-full max-w-3xl mx-auto">
        {Array.from({ length: totalSteps }, (_, i) => {
          const step = i + 1;
          const isActive = step === currentStep;
          const isCompleted = step < currentStep;

          return (
            <React.Fragment key={step}>
              {/* Step circle */}
              <div
                className={`flex items-center justify-center w-8 h-8 rounded-full text-sm font-medium ${
                  isActive
                    ? "bg-blue-500 text-white border-2 border-blue-500"
                    : isCompleted
                    ? "bg-green-500 text-white border-2 border-green-500"
                    : "bg-gray-200 text-gray-600 border-2 border-gray-300"
                }`}
              >
                {isCompleted ? "✓" : step}
              </div>

              {/* Line (don’t render after the last circle) */}
              {step < totalSteps && (
                <div
                  className={`flex-1 h-0.5 ${
                    isCompleted ? "bg-green-500" : "bg-gray-300"
                  }`}
                />
              )}
            </React.Fragment>
          );
        })}
      </div>
    );
  };

  return (
    <div className="bg-white rounded-lg p-6 sm:p-8">
      {/* Header */}
      <div className="flex justify-between items-start mb-6">
        <div>
          <h2 className="text-2xl font-semibold text-gray-900 mb-2">
            Complete your onboarding
          </h2>
          <p className="text-gray-500">
            Provide your complete detail to proceed.
          </p>
        </div>
        <button onClick={onClose} className="text-blue-500 hover:text-blue-600">
          <XMarkIcon className="h-6 w-6" />
        </button>
      </div>

      {/* Progress Steps */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          {renderSteps()}
        </div>
        <div className="flex justify-between text-xs text-gray-600 px-2">
          <span className="w-16 text-center">Specialties</span>
          <span className="w-16 text-center">Education</span>
          <span className="w-16 text-center">Experience</span>
          <span className="w-16 text-center">Documents</span>
          {/* <span className="w-16 text-center">Payments</span> */}
        </div>
      </div>

      {/* Form Fields */}
      <div className="space-y-6 mb-8">
        {/* Country */}
        <div>
          <label className="block text-sm font-medium text-gray-900 mb-2">
            Country
          </label>
          <div className="relative">
            <button
              onClick={() => setCountryDropdownOpen(!countryDropdownOpen)}
              className="w-full px-4 py-3 text-left border border-gray-300 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 flex items-center justify-between"
            >
              <span className="text-gray-900">
                {documentsData.country || "Select country"}
              </span>
              <ChevronDownIcon className="h-5 w-5 text-gray-400" />
            </button>

            {countryDropdownOpen && (
              <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-y-auto">
                {countries.map((country) => (
                  <button
                    key={country}
                    onClick={() => {
                      updateData("country", country);
                      setCountryDropdownOpen(false);
                    }}
                    className="block w-full px-4 py-2 text-left text-gray-900 hover:bg-gray-50"
                  >
                    {country}
                  </button>
                ))}
              </div>
            )}
          </div>

          {documentsData.country && (
            <div className="mt-2">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-green-100 text-green-800">
                {documentsData.country}
                <button
                  onClick={removeCountry}
                  className="ml-2 text-green-600 hover:text-green-800"
                >
                  <XMarkIcon className="h-4 w-4" />
                </button>
              </span>
            </div>
          )}
        </div>

        {/* State */}
        <div>
          <label className="block text-sm font-medium text-gray-900 mb-2">
            State
          </label>
          <div className="relative">
            <button
              onClick={() => setStateDropdownOpen(!stateDropdownOpen)}
              className="w-full px-4 py-3 text-left border border-gray-300 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 flex items-center justify-between"
            >
              <span className="text-gray-900">
                {documentsData.state || "Select state"}
              </span>
              <ChevronDownIcon className="h-5 w-5 text-gray-400" />
            </button>

            {stateDropdownOpen && (
              <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-y-auto">
                {states.map((state) => (
                  <button
                    key={state}
                    onClick={() => {
                      updateData("state", state);
                      setStateDropdownOpen(false);
                    }}
                    className="block w-full px-4 py-2 text-left text-gray-900 hover:bg-gray-50"
                  >
                    {state}
                  </button>
                ))}
              </div>
            )}
          </div>

          {documentsData.state && (
            <div className="mt-2">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-green-100 text-green-800">
                {documentsData.state}
                <button
                  onClick={removeState}
                  className="ml-2 text-green-600 hover:text-green-800"
                >
                  <XMarkIcon className="h-4 w-4" />
                </button>
              </span>
            </div>
          )}
        </div>

        {/* License Attachment */}
        <div>
          <label className="block text-sm font-medium text-gray-900 mb-2">
            license Attachment
          </label>
          <div className="relative">
            <input
              type="file"
              id="license-file"
              onChange={handleFileUpload}
              className="hidden"
              accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
            />
            <label
              htmlFor="license-file"
              className="w-full px-4 py-3 border border-gray-300 rounded-md cursor-pointer hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 flex items-center justify-between text-gray-400"
            >
              <span>
                {documentsData.licenseAttachment
                  ? documentsData.licenseAttachment.name
                  : "No file attached"}
              </span>
              <PaperClipIcon className="h-5 w-5 text-green-500" />
            </label>
          </div>
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-between items-center">
        <button
          onClick={onPrevious}
          className="px-6 py-3 text-green-500 font-medium hover:text-green-600 focus:outline-none"
        >
          Back
        </button>
        <button
          onClick={handleSubmit}
          className="px-8 py-3 bg-blue-500 text-white rounded-md font-medium hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Finish
        </button>
      </div>
    </div>
  );
};

export default Documents;
