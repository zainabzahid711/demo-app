// components/onboardingModal/education.tsx
import React, { useState } from "react";
import {
  XMarkIcon,
  PaperClipIcon,
  CalendarIcon,
} from "@heroicons/react/24/outline";

interface EducationData {
  certificationName: string;
  institutionName: string;
  yearOfCertification: string;
  attachment: File | null;
}

interface EducationProps {
  onSubmit: (data: EducationData) => void;
  onPrevious: () => void;
  initialData?: EducationData;
  onClose: () => void;
  currentStep: number;
  totalSteps: number;
}

const Education: React.FC<EducationProps> = ({
  onSubmit,
  onPrevious,
  initialData,
  onClose,
  currentStep,
  totalSteps,
}) => {
  const [educationData, setEducationData] = useState<EducationData>(
    initialData || {
      certificationName: "",
      institutionName: "",
      yearOfCertification: "",
      attachment: null,
    }
  );

  const updateData = (
    field: keyof EducationData,
    value: string | File | null
  ) => {
    setEducationData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    updateData("attachment", file);
  };

  const handleSubmit = () => {
    if (
      !educationData.certificationName ||
      !educationData.institutionName ||
      !educationData.yearOfCertification
    ) {
      alert("Please fill all required fields");
      return;
    }
    onSubmit(educationData);
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
        {/* Certification Name */}
        <div>
          <label className="block text-sm font-medium text-gray-900 mb-2">
            Certification name
          </label>
          <input
            type="text"
            value={educationData.certificationName}
            onChange={(e) => updateData("certificationName", e.target.value)}
            placeholder="Enter name of certification"
            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 placeholder-gray-400"
          />
        </div>

        {/* Institution Name */}
        <div>
          <label className="block text-sm font-medium text-gray-900 mb-2">
            Institution name
          </label>
          <input
            type="text"
            value={educationData.institutionName}
            onChange={(e) => updateData("institutionName", e.target.value)}
            placeholder="Name of institution you get degree from"
            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 placeholder-gray-400"
          />
        </div>

        {/* Year of Certification */}
        <div>
          <label className="block text-sm font-medium text-gray-900 mb-2">
            Year of certification
          </label>
          <div className="relative">
            <input
              type="text"
              value={educationData.yearOfCertification}
              onChange={(e) =>
                updateData("yearOfCertification", e.target.value)
              }
              placeholder="Select year when certification was obtained"
              className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 placeholder-gray-400"
            />
            <CalendarIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-green-500" />
          </div>
        </div>

        {/* Attachment */}
        <div>
          <label className="block text-sm font-medium text-gray-900 mb-2">
            Attachment
          </label>
          <div className="relative">
            <input
              type="file"
              id="education-file"
              onChange={handleFileUpload}
              className="hidden"
              accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
            />
            <label
              htmlFor="education-file"
              className="w-full px-4 py-3 border border-gray-300 rounded-md cursor-pointer hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 flex items-center justify-between text-gray-400"
            >
              <span>
                {educationData.attachment
                  ? educationData.attachment.name
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
          Next
        </button>
      </div>
    </div>
  );
};

export default Education;
