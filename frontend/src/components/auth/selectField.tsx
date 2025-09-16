// components/auth/SelectField.tsx
import React from "react";
import { SelectFieldProps } from "../../types/auth";

const SelectField: React.FC<SelectFieldProps> = ({
  label,
  options,
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
    <select
      id={name}
      name={name}
      value={value}
      onChange={onChange}
      className="w-full px-3.5 py-3 border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-400 focus:border-blue-400 text-sm text-gray-600 bg-white"
    >
      {options.map((option, index) => (
        <option key={index} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  </div>
);

export default SelectField;
