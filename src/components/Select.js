import React from "react";

const Select = ({ label, value, options, onChange }) => {
  const handleChange = (e) => {
    onChange(e.target.value);
  };

  return (
    <div className="select-list">
      <span className="label">{label}</span>
      <select defaultValue={value} onChange={handleChange}>
        <option>Select</option>
        {options &&
          options.map(({ id, title }) => (
            <option key={id} value={id}>
              {title}
            </option>
          ))}
      </select>
    </div>
  );
};

export default Select;
