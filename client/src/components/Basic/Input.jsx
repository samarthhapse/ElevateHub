import React from "react";

function Input({ label, value, onChange, readonly = true }) {
  return (
    <div className="flex flex-col   ">
      {label && (
        <label htmlFor={label} className="text-xl text-white">
          {label}
        </label>
      )}
      <input
        type="text"
        readOnly={readonly}
        value={value}
        onChange={(e) => onChange(e)}
        className={` w-72 h-12 py-6 px-2 rounded-md  text-gray-800 }`}
        name={label}
      />
    </div>
  );
}

export default Input;
