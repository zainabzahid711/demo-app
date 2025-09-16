// components/layout/AuthLayout.tsx
import React from "react";
import { AuthLayoutProps } from "../../types/auth";

const AuthLayout: React.FC<AuthLayoutProps> = ({
  leftContent,
  rightContent,
}) => {
  return (
    <div className="min-h-screen flex bg-white">
      {/* Left Side - Form */}
      <div className="flex-1 bg-white flex flex-col">
        <div className="flex-1 max-w-md mx-auto w-full px-6 py-8 lg:px-8">
          {leftContent}
        </div>
      </div>

      {/* Right Side - Hero Section */}
      <div className="hidden lg:flex lg:flex-1">{rightContent}</div>
    </div>
  );
};

export default AuthLayout;
