import React, { useState } from "react";

const Text = ({ label, name, value, onUpdate, maxLength = 200 }) => {
  const [isValid, setIsValid] = useState(true);
  const [touched, isTouched] = useState(false);

  const handleChange = (e) => {
    setIsValid(e.target.validity.valid);
    const { name, value } = e.target;
    const target = { name, value: value.replace(/(?:\\r)/g, "\\n\\n") };
    onUpdate({ target });
  };

  const handleBlur = (e) => {
    isTouched(true);
  };

  return (
    <div className={`text-box ${touched && !isValid && "hasError"}`}>
      <span className="label">{label}</span>
      <textarea
        maxLength={maxLength}
        required
        name={name}
        value={value}
        onChange={handleChange}
        onBlur={handleBlur}
      />
    </div>
  );
};

export default Text;
