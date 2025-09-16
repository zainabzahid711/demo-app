// components/auth/SignUpForm.tsx
import React, { useState } from "react";
import InputField from "./inputField";
import SelectField from "./selectField";
import PasswordField from "./passwordField";
import { FormData } from "../../types/auth";
import Image from "next/image";
import { useRouter } from "next/navigation";

const SignUpForm: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const router = useRouter();

  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    city: "",
    email: "",
    phoneNumber: "",
    biologicalSex: "Male",
    language: "English",
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
    setSuccessMessage("");

    try {
      const response = await fetch("http://localhost:5000/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success) {
        setSuccessMessage("Account created successfully!");
        console.log("User created successfully:", data.user);

        router.push("./dashboard");
      } else {
        setErrorMessage(data.message || "Signup failed");
        console.error("Signup failed:", data.message);
      }
    } catch (error) {
      setErrorMessage("Network error. Please try again.");
      console.error("Error during signup:", error);
    } finally {
      setIsLoading(false);
    }
  };
  const biologicalSexOptions = [
    { value: "Male", label: "Male" },
    { value: "Female", label: "Female" },
    { value: "Other", label: "Other" },
  ];

  const languageOptions = [
    { value: "English", label: "English" },
    { value: "Spanish", label: "Spanish" },
    { value: "French", label: "French" },
  ];

  return (
    <>
      {/* Logo and Header */}
      <div className="mb-10">
        <div className="">
          <Image src="/logo.png" alt="logo" width={242} height={52} />
        </div>
      </div>

      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Sign Up</h1>
        <p className="text-sm text-gray-400">
          Already have an account?
          <a
            href="#"
            className="text-green-400 hover:text-blue-600 ml-1 font-medium"
          >
            Login
          </a>
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* First Name & Last Name */}
        <div className="grid grid-cols-2 gap-4">
          <InputField
            label="First Name"
            name="firstName"
            value={formData.firstName}
            onChange={handleInputChange}
            placeholder="MarkusFireRoot"
          />
          <InputField
            label="Last Name"
            name="lastName"
            value={formData.lastName}
            onChange={handleInputChange}
            placeholder="Last Name"
          />
        </div>

        {/* City & Email */}
        <div className="grid grid-cols-2 gap-4">
          <InputField
            label="City"
            name="city"
            value={formData.city}
            onChange={handleInputChange}
            placeholder="City"
          />
          <InputField
            label="E-mail"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder="example@gmail.com"
          />
        </div>

        {/* Phone Number & Biological Sex */}
        <div className="grid grid-cols-2 gap-4">
          <InputField
            label="Phone Number"
            type="tel"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleInputChange}
            placeholder="+92"
          />
          <SelectField
            label="Biological Sex"
            name="biologicalSex"
            value={formData.biologicalSex}
            onChange={handleInputChange}
            options={biologicalSexOptions}
          />
        </div>

        {/* Language */}
        <SelectField
          label="Language"
          name="language"
          value={formData.language}
          onChange={handleInputChange}
          options={languageOptions}
        />

        {/* Password */}
        <PasswordField
          label="Password"
          name="password"
          value={formData.password}
          onChange={handleInputChange}
          placeholder="••••••••"
        />

        {/* Sign Up Button */}
        <button
          type="submit"
          disabled={isLoading}
          className={`w-full bg-blue-500 text-white py-3.5 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 font-medium text-sm transition-colors mt-6 ${
            isLoading ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          {isLoading ? "Creating account..." : "Sign Up"}
        </button>
        {errorMessage && (
          <div className="text-red-500 text-sm mt-2">{errorMessage}</div>
        )}
        {successMessage && (
          <div className="text-green-500 text-sm mt-2">{successMessage}</div>
        )}
      </form>

      {/* <div className="relative my-6">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-200"></div>
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-3 bg-white text-gray-400">OR</span>
        </div>
      </div> */}
    </>
  );
};

export default SignUpForm;
