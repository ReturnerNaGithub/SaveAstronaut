import React from "react";

const FormField = ({
  labelName,
  buttonTxt,
  name,
  placeholder,
  value,
  handleChange,
  fund,
  merge,
}) => {
  return (
    <div>
      <div className="flex items-center gap-2 mb-5">
        <label
          htmlFor={name}
          className="block text-md font-medium text-gray-200"
        >
          {labelName}
        </label>
      </div>
      <div className="flex flex-row">
        <input
          min="0"
          type="number"
          id={name}
          step="0.01"
          name={name}
          placeholder={placeholder}
          onChange={handleChange}
          value={value}
          required
          className="bg-gray-600 border border-gray-400 text-md rounded-lg focus:ring-[#4649ff] focus:border-[#4649ff] outline-none block p-3 mb-7 text-white"
        />
        <button
          type="button"
          className="text-white bg-emerald-600 font-medium rounded-md text-md ml-4 px-3 py-1.5 h-12 text-center"
          onClick={fund}
        >
          Fund {buttonTxt}
        </button>
        <button
          type="button"
          className="text-white bg-gradient-to-br from-primary-500 to-secondary-500 font-medium rounded-md text-md ml-4 px-3 py-1.5 h-12 text-center"
          onClick={merge}
        >
          Merge AstroSuit Parts ({buttonTxt})
        </button>
      </div>
    </div>
  );
};

export default FormField;
