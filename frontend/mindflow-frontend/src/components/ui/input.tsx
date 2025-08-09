import React from 'react';

export interface InputProps {
  value: string;
  onChange: (value: string) => void;
  label?: string;
  placeholder?: string;
  type?: string;
  disabled?: boolean;
  className?: string;
}

const Input: React.FC<InputProps> = ({
  value,
  onChange,
  label,
  placeholder = '',
  type = 'text',
  disabled = false,
  className = '',
}) => (
  <div className={className}>
    {label && <label className="block mb-1 font-medium">{label}</label>}
    <input
      type={type}
      value={value}
      onChange={e => onChange(e.target.value)}
      placeholder={placeholder}
      disabled={disabled}
      className="border rounded px-3 py-2 w-full"
    />
  </div>
);

export default Input;
