import React from 'react';

export interface SelectProps {
  value: string;
  onChange: (value: string) => void;
  label?: string;
  disabled?: boolean;
  className?: string;
  children?: React.ReactNode;
}

const Select: React.FC<SelectProps> = ({
  value,
  onChange,
  label,
  disabled = false,
  className = '',
  children,
}) => (
  <div className={className}>
    {label && <label className="block mb-1 font-medium">{label}</label>}
    <select
      value={value}
      onChange={e => onChange(e.target.value)}
      disabled={disabled}
      className="border rounded px-3 py-2 w-full"
    >
      {children}
    </select>
  </div>
);

export default Select;