// components/onboardingModal/onboardingWrapper.tsx
"use client";

import { useState } from "react";
import Specialities from "./specialites";
import Education from "./education";
import Experience from "./experience";
import Documents from "./document";
import ProfileUnderReview from "./profileUnderReview";

interface OnboardingData {
  specialties: {
    field: string;
    subField: string;
  };
  education: EducationData;
  experience: ExperienceData;
  documents: DocumentsData;
}

interface EducationData {
  certificationName: string;
  institutionName: string;
  yearOfCertification: string;
  attachment: File | null;
}

interface ExperienceData {
  institute: string;
  fromDate: string;
  toDate: string;
  attachment: File | null;
}

interface DocumentsData {
  country: string;
  state: string;
  licenseAttachment: File | null;
}

interface OnboardingWrapperProps {
  onComplete: (data: OnboardingData) => void;
  onClose: () => void;
  onProceedToDashboard: () => void;
}

const OnboardingWrapper: React.FC<OnboardingWrapperProps> = ({
  onComplete,
  onClose,
  onProceedToDashboard,
}) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [showReviewScreen, setShowReviewScreen] = useState(false);
  const [onboardingData, setOnboardingData] = useState<OnboardingData>({
    specialties: { field: "", subField: "" },
    education: {
      certificationName: "",
      institutionName: "",
      yearOfCertification: "",
      attachment: null,
    },
    experience: {
      institute: "",
      fromDate: "",
      toDate: "",
      attachment: null,
    },
    documents: {
      country: "",
      state: "",
      licenseAttachment: null,
    },
  });

  const steps = [
    { component: Specialities, title: "specialties" },
    { component: Education, title: "education" },
    { component: Experience, title: "experience" },
    { component: Documents, title: "documents" },
  ];

  const handleNext = (data: any) => {
    // Save current step data
    const stepKey = steps[currentStep - 1].title as keyof OnboardingData;

    // Update the onboarding data with the new step data
    const updatedData = {
      ...onboardingData,
      [stepKey]: data,
    };

    setOnboardingData(updatedData);

    // If this is the last step, show the review screen
    if (currentStep >= steps.length) {
      onComplete(updatedData);
      setShowReviewScreen(true);
    } else {
      // Otherwise, move to the next step
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleProceedToDashboardInternal = () => {
    setShowReviewScreen(false);
    onProceedToDashboard();
  };

  const handleCloseReviewScreen = () => {
    setShowReviewScreen(false);
    onClose();
  };

  // Show the review screen after all steps are completed
  if (showReviewScreen) {
    return (
      <ProfileUnderReview
        onClose={handleCloseReviewScreen}
        onProceedToDashboard={handleProceedToDashboardInternal}
        autoRedirect={true}
        redirectDelay={5000} // 5 seconds
      />
    );
  }

  // Show the current onboarding step
  const CurrentComponent = steps[currentStep - 1].component;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <CurrentComponent
          onSubmit={handleNext}
          onPrevious={
            currentStep > 1
              ? handlePrevious
              : (undefined as unknown as (() => void) &
                  (() => void) &
                  (() => void) &
                  (() => void))
          }
          initialData={
            onboardingData[
              steps[currentStep - 1].title as keyof OnboardingData
            ] as any
          }
          onClose={onClose}
          currentStep={currentStep}
          totalSteps={steps.length}
        />
      </div>
    </div>
  );
};

export default OnboardingWrapper;
