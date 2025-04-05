"use client";
import * as React from "react";
import { useState } from "react";
import InputDesign from "./InputDesign";

interface InputWithClearButtonProps {
  placeholder?: string;
  className?: string;
  onChange?: (value: string) => void;
}

/**
 * InputWithClearButton - A text input with a clear button
 * This demonstrates how the InputDesign component can be used
 */
function InputWithClearButton({
  placeholder = "Type something...",
  className = "",
  onChange,
}: InputWithClearButtonProps) {
  const [value, setValue] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setValue(newValue);
    onChange?.(newValue);
  };

  const handleClear = () => {
    setValue("");
    onChange?.("");
  };

  return (
    <div className={`relative ${className}`}>
      <input
        type="text"
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        className="w-full px-4 py-2 border border-[var(--theme-border-light)] rounded-md bg-theme-surface text-theme-primary focus:outline-none focus:ring-2 focus:ring-[var(--theme-primary)] focus:border-[var(--theme-primary)]"
      />
      {value && (
        <div className="absolute inset-y-0 right-0 flex items-center pr-3">
          <InputDesign onClick={handleClear} />
        </div>
      )}
    </div>
  );
}

export default InputWithClearButton;
