import React from "react";
import "./NameField.css";

const NameField = ({
  label,
  name,
  type = "text",
  placeholder,
  value,
  onChange,
  error,
}) => {
  return (
    <div className="form-group">
      <label>{label}</label>
      <input
        className={`input-box ${error ? "input-error" : ""}`}
        name={name}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required
      />
      {error && <p className="error-text">{error}</p>}
    </div>
  );
};

export default NameField;
