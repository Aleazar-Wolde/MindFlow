import React from 'react';

export interface SelectOption {
  value: string;
  label: string;
}

export interface SelectProps {
  options: SelectOption[];
  value: string;
  onChange: (value: string) => void;
  label?: string;
  disabled?: boolean;
  className?: string;
}

const Select: React.FC<SelectProps> = ({
  options,
  value,
  onChange,
  label,
  disabled = false,
  className = '',
}) => (
  <div className={className}>
    {label && <label className="block mb-1 font-medium">{label}</label>}
    <select
      value={value}
      onChange={e => onChange(e.target.value)}
      disabled={disabled}
      className="border rounded px-3 py-2 w-full"
    >
      {options.map(opt => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
  </div>
);

export default Select;