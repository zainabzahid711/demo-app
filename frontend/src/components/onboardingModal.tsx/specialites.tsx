// components/onboardingModal/specialites.tsx
import React, { useState, useEffect } from "react";
import { ChevronDownIcon, XMarkIcon } from "@heroicons/react/24/outline";

interface SpecialitiesProps {
  onSubmit: (data: { field: string; subField: string }) => void;
  onPrevious?: () => void;
  initialData?: { field: string; subField: string };
  onClose: () => void;
  currentStep: number;
  totalSteps: number;
}

const Specialities: React.FC<SpecialitiesProps> = ({
  onSubmit,
  onPrevious,
  initialData,
  onClose,
  currentStep,
  totalSteps,
}) => {
  const [selectedSpecialty, setSelectedSpecialty] = useState(
    initialData?.field || ""
  );
  const [selectedSubSpecialty, setSelectedSubSpecialty] = useState(
    initialData?.subField || ""
  );
  const [specialtyDropdownOpen, setSpecialtyDropdownOpen] = useState(false);
  const [subSpecialtyDropdownOpen, setSubSpecialtyDropdownOpen] =
    useState(false);

  const specialties = [
    "Cardiology",
    "Neurology",
    "Orthopedics",
    "Pediatrics",
    "Dermatology",
    "Radiology",
  ];

  const subSpecialties: Record<string, string[]> = {
    Cardiology: [
      "Electrophysiology",
      "Interventional Cardiology",
      "Heart Failure",
      "Nuclear Cardiology",
      "Cardiac Surgery",
    ],
    Neurology: [
      "Epilepsy",
      "Stroke",
      "Movement Disorders",
      "Neuromuscular Medicine",
      "Pediatric Neurology",
    ],
    Orthopedics: [
      "Sports Medicine",
      "Joint Replacement",
      "Spine Surgery",
      "Hand Surgery",
      "Trauma",
    ],
    Pediatrics: [
      "Neonatology",
      "Pediatric Cardiology",
      "Pediatric Emergency Medicine",
      "Pediatric Endocrinology",
      "Pediatric Gastroenterology",
    ],
    Dermatology: [
      "Dermatopathology",
      "Pediatric Dermatology",
      "Procedural Dermatology",
      "Cosmetic Dermatology",
      "Mohs Surgery",
    ],
    Radiology: [
      "Neuroradiology",
      "Interventional Radiology",
      "Musculoskeletal Radiology",
      "Breast Imaging",
      "Abdominal Imaging",
    ],
  };

  useEffect(() => {
    if (initialData) {
      setSelectedSpecialty(initialData.field);
      setSelectedSubSpecialty(initialData.subField);
    }
  }, [initialData]);

  const removeSelectedSpecialty = () => {
    setSelectedSpecialty("");
    setSelectedSubSpecialty("");
  };

  const removeSelectedSubSpecialty = () => {
    setSelectedSubSpecialty("");
  };

  const handleSubmit = () => {
    if (!selectedSpecialty || !selectedSubSpecialty) {
      alert("Please select both a specialty and sub-specialty");
      return;
    }

    onSubmit({
      field: selectedSpecialty,
      subField: selectedSubSpecialty,
    });
  };

  const availableSubSpecialties = selectedSpecialty
    ? subSpecialties[selectedSpecialty] || []
    : [];

  // Generate step indicators
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
        <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
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

      {/* Field of specialization */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-900 mb-2">
          Field of specialization
        </label>
        <div className="relative">
          <button
            onClick={() => setSpecialtyDropdownOpen(!specialtyDropdownOpen)}
            className="w-full px-4 py-3 text-left border border-gray-300 rounded-md bg-white text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 flex items-center justify-between"
          >
            <span>{selectedSpecialty || "Select a specialty"}</span>
            <ChevronDownIcon className="h-5 w-5 text-gray-400" />
          </button>

          {specialtyDropdownOpen && (
            <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-y-auto">
              {specialties.map((specialty) => (
                <button
                  key={specialty}
                  onClick={() => {
                    setSelectedSpecialty(specialty);
                    setSelectedSubSpecialty("");
                    setSpecialtyDropdownOpen(false);
                  }}
                  className="block w-full px-4 py-2 text-left text-gray-900 hover:bg-gray-50"
                >
                  {specialty}
                </button>
              ))}
            </div>
          )}
        </div>

        {selectedSpecialty && (
          <div className="mt-2">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-green-100 text-green-800">
              {selectedSpecialty}
              <button
                onClick={removeSelectedSpecialty}
                className="ml-2 text-green-600 hover:text-green-800"
              >
                <XMarkIcon className="h-4 w-4" />
              </button>
            </span>
          </div>
        )}
      </div>

      {/* Sub-specialty */}
      <div className="mb-8">
        <label className="block text-sm font-medium text-gray-900 mb-2">
          Sub-specialty
        </label>
        <div className="relative">
          <button
            onClick={() =>
              setSubSpecialtyDropdownOpen(!subSpecialtyDropdownOpen)
            }
            disabled={!selectedSpecialty}
            className={`w-full px-4 py-3 text-left border border-gray-300 rounded-md bg-white text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 flex items-center justify-between ${
              !selectedSpecialty ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            <span>{selectedSubSpecialty || "Select a sub-specialty"}</span>
            <ChevronDownIcon className="h-5 w-5 text-gray-400" />
          </button>

          {subSpecialtyDropdownOpen && selectedSpecialty && (
            <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-y-auto">
              {availableSubSpecialties.map((subSpecialty) => (
                <button
                  key={subSpecialty}
                  onClick={() => {
                    setSelectedSubSpecialty(subSpecialty);
                    setSubSpecialtyDropdownOpen(false);
                  }}
                  className="block w-full px-4 py-2 text-left text-gray-900 hover:bg-gray-50"
                >
                  {subSpecialty}
                </button>
              ))}
            </div>
          )}
        </div>

        {selectedSubSpecialty && (
          <div className="mt-2">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-green-100 text-green-800">
              {selectedSubSpecialty}
              <button
                onClick={removeSelectedSubSpecialty}
                className="ml-2 text-green-600 hover:text-green-800"
              >
                <XMarkIcon className="h-4 w-4" />
              </button>
            </span>
          </div>
        )}
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-between">
        <div>
          {onPrevious && (
            <button
              onClick={onPrevious}
              className="px-6 py-3 bg-gray-200 text-gray-700 rounded-md font-medium hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
            >
              Previous
            </button>
          )}
        </div>
        <button
          onClick={handleSubmit}
          disabled={!selectedSpecialty || !selectedSubSpecialty}
          className="px-8 py-3 bg-blue-500 text-white rounded-md font-medium hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Specialities;
