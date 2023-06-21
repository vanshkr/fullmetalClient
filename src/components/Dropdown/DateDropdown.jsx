const DateDropdown = ({
  label,
  selectedYear,
  selectedMonth,
  selectedDay,
  onYearChange,
  onMonthChange,
  onDayChange,
}) => {
  const generateOptions = (start, end) => {
    const options = [];
    for (let i = start; i <= end; i++) {
      options.push(i);
    }
    return options;
  };
  const years = generateOptions(1900, new Date().getFullYear());
  const months = generateOptions(1, 12);
  const days = generateOptions(1, 31);
  return (
    <div className='border-2 text-xs flex w-fit border-lilacChampagne xl:mx-8 m-1 md:m-4  p-2 rounded-lg'>
      <label className='text-white mr-4' htmlFor='date'>
        {label}:
      </label>
      <div className='flex space-x-2'>
        <select
          id='year'
          value={selectedYear}
          onChange={(e) => onYearChange(e.target.value)}
          className={`text-drySeedlings bg-metalise appearance-none outline-none cursor-pointer text-center`}
        >
          <option value=''>Year</option>
          {years.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>

        <select
          id='month'
          value={selectedMonth}
          onChange={(e) => onMonthChange(e.target.value)}
          className={`text-drySeedlings bg-metalise appearance-none outline-none cursor-pointer text-center`}
        >
          <option value=''>Month</option>
          {months.map((month) => (
            <option key={month} value={month}>
              {month}
            </option>
          ))}
        </select>

        <select
          id='day'
          value={selectedDay}
          onChange={(e) => onDayChange(e.target.value)}
          className={`text-drySeedlings bg-metalise appearance-none outline-none cursor-pointer text-center`}
        >
          <option value=''>Day</option>
          {days.map((day) => (
            <option key={day} value={day}>
              {day}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default DateDropdown;
