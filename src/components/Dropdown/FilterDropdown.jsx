const FilterDropdown = ({ label, options, value, onValueChange }) => {
  return (
    <div className='border-2 text-xs border-lilacChampagne xl:mx-8  md:m-4 m-1 p-2 rounded-lg'>
      <label className='text-white mr-4'>{label}</label>
      <select
        value={value}
        onChange={(e) => onValueChange(e.target.value)}
        className={`text-drySeedlings bg-metalise appearance-none outline-none cursor-pointer text-center`}
      >
        <option value>{label === "Sort" ? "Default" : "All"}</option>
        {options.map((option, i) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};

export default FilterDropdown;
