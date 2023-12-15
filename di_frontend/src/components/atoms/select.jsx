import React from "react";

const Select = ({ isChecked, labelSelect, listAddressItem,onSelectChange}) => {
  const handleSelectChange = (e) => {
    const selectedValue = e.target.value;
    onSelectChange(selectedValue);
  };

    return (
    <div>
      <label
        htmlFor="countries"
        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
      >
        {labelSelect}
      </label>
      <select
        id="countries"
        disabled={isChecked}
        onChange={handleSelectChange}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      >
        
        {listAddressItem.map((item, index) => (
          <option key={index}>{item}</option>
        ))}
      </select>
    </div>
  );
};

export default Select;
