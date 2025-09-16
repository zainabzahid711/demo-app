// components/auth/InputField.tsx
import React from "react";
import { InputFieldProps } from "../../types/auth";

const InputField: React.FC<InputFieldProps> = ({
  label,
  type = "text",
  placeholder,
  value,
  name,
  onChange,
  className = "",
}) => (
  <div className={className}>
    <label
      htmlFor={name}
      className="block text-sm font-normal text-gray-400 mb-1.5"
    >
      {label}
    </label>
    <input
      type={type}
      id={name}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="w-full px-3.5 py-3 border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-400 focus:border-blue-400 text-sm text-gray-600 placeholder-gray-300 bg-white"
    />
  </div>
);

export default InputField;
