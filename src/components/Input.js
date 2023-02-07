import React, { useState } from "react";

const Input = ({ type, label, value, name, maxLength, onInput }) => {
  const [isValid, setIsValid] = useState(true);
  const [touched, setTouched] = useState(false);

  const handleChange = (e) => {
    setIsValid(e.target.validity.valid);
    onInput(e);
  };

  const handleBlur = (e) => {
    setTouched(true);
  };

  return (
    <div className={`input-box ${touched && !isValid && "hasError"}`}>
      <span className="label">{label}</span>
      <input
        maxLength={maxLength}
        required
        type={type}
        value={value}
        name={name}
        onChange={handleChange}
        onBlur={handleBlur}
      />
    </div>
  );
};

export default Input;
