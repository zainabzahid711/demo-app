// login/page.tsx
"use client";
import React, { useState } from "react";
import InputField from "@/components/auth/inputField";
import PasswordField from "@/components/auth/passwordField";
import { useRouter } from "next/navigation";
import Image from "next/image";

interface LoginFormData {
  email: string;
  password: string;
}

const LoginForm: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();

  const [formData, setFormData] = useState<LoginFormData>({
    email: "",
    password: "",
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage("");

    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success) {
        console.log("User logged in successfully:", data.user);
        // Store user data in localStorage or context
        localStorage.setItem("user", JSON.stringify(data.user));
        router.push("/dashboard");
      } else {
        setErrorMessage(data.message || "Login failed");
        console.error("Login failed:", data.message);
      }
    } catch (error) {
      setErrorMessage("Network error. Please try again.");
      console.error("Error during login:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Logo and Header */}
      <div className="mb-10">
        <div className="">
          <Image src="/logo.png" alt="logo" width={242} height={52} />
        </div>
      </div>

      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Login</h1>
        <p className="text-sm text-gray-400">
          Don't have an account?
          <a
            href="/signup"
            className="text-green-400 hover:text-blue-600 ml-1 font-medium"
          >
            Sign Up
          </a>
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Email */}
        <InputField
          label="E-mail"
          type="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          placeholder="example@gmail.com"
        />

        {/* Password */}
        <PasswordField
          label="Password"
          name="password"
          value={formData.password}
          onChange={handleInputChange}
          placeholder="••••••••"
        />

        {/* Login Button */}
        <button
          type="submit"
          disabled={isLoading}
          className={`w-full bg-blue-500 text-white py-3.5 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 font-medium text-sm transition-colors mt-6 ${
            isLoading ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          {isLoading ? "Logging in..." : "Login"}
        </button>
        {errorMessage && (
          <div className="text-red-500 text-sm mt-2">{errorMessage}</div>
        )}
      </form>
    </>
  );
};

export default LoginForm;
