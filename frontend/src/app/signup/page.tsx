// pages/SignUp.tsx
"use client";

import React from "react";
import AuthLayout from "@/components/layout/authLayout";
import SignUpForm from "@/components/auth/signUpForm";
import HeroSection from "@/components/layout/heroSection";

const SignUp: React.FC = () => {
  return (
    <AuthLayout leftContent={<SignUpForm />} rightContent={<HeroSection />} />
  );
};

export default SignUp;
