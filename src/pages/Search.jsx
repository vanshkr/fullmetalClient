import React, { useState } from "react";
import { FilterDropdown, DateDropdown, GenreFilter } from "../components";
import { fields } from "../assets/constants";
// Replace with your dropdown component

const Search = () => {
  // State for filter section fields
  const [page, setPage] = useState("");
  const [limit, setLimit] = useState("");
  const [type, setType] = useState("");
  const [score, setScore] = useState("");
  const [status, setStatus] = useState("");
  const [rating, setRating] = useState("");
  const [genres, setGenres] = useState([]);
  const [orderBy, setOrderBy] = useState("");
  const [sort, setSort] = useState("");
  const [letter, setLetter] = useState("");
  const [visible, setVisible] = useState(false);
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [startSelectedYear, setStartSelectedYear] = useState("");
  const [startSelectedMonth, setStartSelectedMonth] = useState("");
  const [startSelectedDay, setStartSelectedDay] = useState("");
  const [endSelectedYear, setEndSelectedYear] = useState("");
  const [endSelectedMonth, setEndSelectedMonth] = useState("");
  const [endSelectedDay, setEndSelectedDay] = useState("");

  const dropdownData = [
    {
      label: fields[0][0],
      option: fields[0][1],
      state: type,
      setState: setType,
    },
    {
      label: fields[1][0],
      option: fields[1][1],
      state: status,
      setState: setStatus,
    },
    {
      label: fields[2][0],
      option: fields[2][1],
      state: rating,
      setState: setRating,
    },
    {
      label: fields[3][0],
      option: fields[3][1],
      state: orderBy,
      setState: setOrderBy,
    },
    {
      label: fields[4][0],
      option: fields[4][1],
      state: sort,
      setState: setSort,
    },
  ];

  const handleDropdownChange = (index, value) => {
    const { setState } = dropdownData[index];
    setState(value);
  };

  const handleGenreSelect = (selectedGenre) => {
    if (selectedGenres.includes(selectedGenre)) {
      setSelectedGenres(
        selectedGenres.filter((genre) => genre !== selectedGenre)
      );
    } else {
      setSelectedGenres([...selectedGenres, selectedGenre]);
    }
  };

  const handleSearch = () => {
    console.log("Performing search...");
    console.log("Type:", type);
    console.log("Status:", status);
    console.log("Rated:", rated);
    console.log("Score:", score);
    console.log("Season:", season);
    console.log("Language:", language);
    console.log("Start Date:", startDate);
    console.log("End Date:", endDate);
    console.log("Sort:", sort);
    console.log("Genres:", selectedGenres);
  };

  const handleLetterChange = (event) => {
    const inputValue = event.target.value.toLowerCase();
    const isValidInput = /^[a-z]$/.test(inputValue);
    if (isValidInput || inputValue === "") {
      setLetter(inputValue);
      setVisible(false);
    } else {
      setLetter("");
      setVisible(true);
    }
  };
  const handleBlur = () => {
    if (letter === "") {
      setVisible(false);
    }
  };
  return (
    <div className='bg-nobleBlack p-4 w-full'>
      <div className='flex flex-col justify-between w-full bg-metalise rounded-xl'>
        <div className='p-4 md:p-6 xl:p-8'>
          <h2 className='text-white text-sm mb-6'>Filter</h2>
          <div className='flex flex-col gap-2'>
            <div className='flex flex-wrap'>
              {dropdownData?.map((dropdown, index) => (
                <FilterDropdown
                  key={index}
                  label={dropdown.label}
                  options={dropdown.option}
                  value={dropdown.state}
                  onValueChange={(value) => handleDropdownChange(index, value)}
                />
              ))}
            </div>
            <div className='border-2 h-fit w-fit text-xs border-lilacChampagne xl:mx-8 m-1 md:m-4  p-2 rounded-lg'>
              <label className='text-white mr-6 ' htmlFor='letter'>
                Letter:
              </label>
              <input
                type='text'
                id='letter'
                value={letter}
                onChange={handleLetterChange}
                onBlur={handleBlur}
                placeholder='Enter a lowercase English character'
              />
              {visible && (
                <p
                  className={`text-red-500 text-sm mt-1 break-words  ${
                    visible ? visible : hidden
                  }`}
                >
                  {"Invalid Input.Please enter a lowercase English character."}
                </p>
              )}
            </div>
            <div className='flex flex-wrap'>
              <DateDropdown
                label={"Start Date"}
                selectedYear={startSelectedYear}
                selectedMonth={startSelectedMonth}
                selectedDay={startSelectedDay}
                onYearChange={(value) => setStartSelectedYear(value)}
                onMonthChange={(value) => setStartSelectedMonth(value)}
                onDayChange={(value) => setStartSelectedDay(value)}
              />
              <DateDropdown
                label={"End Date"}
                selectedYear={endSelectedYear}
                selectedMonth={endSelectedMonth}
                selectedDay={endSelectedDay}
                onYearChange={(value) => setEndSelectedYear(value)}
                onMonthChange={(value) => setEndSelectedMonth(value)}
                onDayChange={(value) => setEndSelectedDay(value)}
              />
            </div>
          </div>
          <GenreFilter />
        </div>
      </div>
      <button onClick={handleSearch}>Search</button>
    </div>
  );
};

export default Search;

// <div className='flex flex-wrap'>
// <h2>Date</h2>
// <div>
//   <input
//     type='text'
//     value={startDate}
//     onChange={(e) => setStartDate(e.target.value)}
//     placeholder='Start Date'
//   />
// </div>
//  </div>
//  <div className='flex flex-wrap'>
//  <h2>Genre</h2>
//  <div className='flex flex-wrap'>
//    {Array.from({ length: 76 }, (_, index) => (
//      <label key={index}>
//        <input
//          type='checkbox'
//          checked={selectedGenres.includes(index)}
//          onChange={() => handleGenreSelect(index)}
//        />
//        Genre {index + 1}
//      </label>
//    ))}
//  </div>
//  </div>
