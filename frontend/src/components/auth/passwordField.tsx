// components/auth/PasswordField.tsx
import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { PasswordFieldProps } from "../../types/auth";

const PasswordField: React.FC<PasswordFieldProps> = ({
  label,
  placeholder,
  value,
  name,
  onChange,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div>
      <label
        htmlFor={name}
        className="block text-sm font-normal text-gray-400 mb-1.5"
      >
        {label}
      </label>
      <div className="relative">
        <input
          type={showPassword ? "text" : "password"}
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className="w-full px-3.5 py-3 border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-400 focus:border-blue-400 text-sm text-gray-600 placeholder-gray-300 bg-white pr-10"
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute inset-y-0 right-0 pr-3 flex items-center"
        >
          {showPassword ? (
            <EyeOff className="h-4 w-4 text-gray-300" />
          ) : (
            <Eye className="h-4 w-4 text-gray-300" />
          )}
        </button>
      </div>
    </div>
  );
};

export default PasswordField;
