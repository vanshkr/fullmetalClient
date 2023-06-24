import React, { useState } from "react";
import { FilterDropdown, DateDropdown, GenreFilter } from "../components";
import { fields } from "../assets/constants";
import { useLazyGetAnimeByFilterQuery } from "../redux/services/jikanApi";
import { useEffect } from "react";
import { TopCardContainer, PagePagination } from "../components";
import Calendar from "react-calendar";
import "./styles.css";
import {
  useLocation,
  useSearchParams,
  useParams,
  useNavigate,
} from "react-router-dom";

const Search = () => {
  const location = useLocation();
  const [searchParams] = useSearchParams();

  const getQueryParam = (param) => {
    const value = new URLSearchParams(searchParams).get(param);
    return value ? value : "";
  };
  const [page, setPage] = useState(() => {
    const pageParam = new URLSearchParams(searchParams).get("page");
    const value = parseInt(pageParam, 10);
    return value;
  });
  const [limit, setLimit] = useState("");
  const [type, setType] = useState(() => {
    const param = new URLSearchParams(searchParams).get("type");

    return param ? param : "";
  });
  const [clicked, setClicked] = useState(false);
  const [score, setScore] = useState(getQueryParam("score"));
  const [status, setStatus] = useState(getQueryParam("status"));
  const [rating, setRating] = useState(getQueryParam("rating"));
  const [orderBy, setOrderBy] = useState(getQueryParam("orderBy"));
  const [sort, setSort] = useState(getQueryParam("sort"));
  const [letter, setLetter] = useState(getQueryParam("letter"));
  const [start, setStart] = useState(getQueryParam("start"));
  const [end, setEnd] = useState(getQueryParam("end"));
  const [genres, setGenres] = useState(() => {
    const param = new URLSearchParams(searchParams).get("genres");
    const value = param?.split(",").map(Number);
    return value?.length > 0 ? value : [];
  });

  const [visible, setVisible] = useState(false);

  const [trigger, { data }] = useLazyGetAnimeByFilterQuery();
  useEffect(() => {
    handleTrigger();
  }, [page]);

  useEffect(() => {
    const updatedSearchParams = new URLSearchParams(location.search);
    page
      ? updatedSearchParams.set("page", page)
      : updatedSearchParams.delete("page");

    type
      ? updatedSearchParams.set("type", type.toString())
      : updatedSearchParams.delete("type");

    score
      ? updatedSearchParams.set("score", score.toString())
      : updatedSearchParams.delete("score");
    status
      ? updatedSearchParams.set("status", status.toString())
      : updatedSearchParams.delete("status");
    rating
      ? updatedSearchParams.set("rating", rating.toString())
      : updatedSearchParams.delete("rating");
    orderBy
      ? updatedSearchParams.set("orderBy", orderBy.toString())
      : updatedSearchParams.delete("orderBy");
    sort
      ? updatedSearchParams.set("sort", sort.toString())
      : updatedSearchParams.delete("sort");
    letter
      ? updatedSearchParams.set("letter", letter.toString())
      : updatedSearchParams.delete("letter");
    start
      ? updatedSearchParams.set("start", start.toString())
      : updatedSearchParams.delete("start");
    end
      ? updatedSearchParams.set("end", end.toString())
      : updatedSearchParams.delete("end");

    if (genres.length > 0) {
      updatedSearchParams.set("genres", genres.join(",").toString());
    } else {
      updatedSearchParams.delete("genres");
    }

    const search = updatedSearchParams.toString()
      ? `?${updatedSearchParams.toString()}`
      : "";

    window.history.replaceState(null, "", search);
  }, [page, clicked, location]);

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

  const handleTrigger = async () => {
    await trigger([
      // Pass your filter data here
      page,
      limit,
      type,
      score,
      status,
      rating,
      genres,
      orderBy,
      sort,
      letter,
      start,
      end,
    ]);
  };
  const handleSearch = () => {
    setPage(() => {
      return 1;
    });
    setClicked((prev) => {
      return !prev;
    });
    handleTrigger();
  };
  const handleDropdownChange = (index, value) => {
    const { setState } = dropdownData[index];
    setState(value);
  };

  const handleGenreSelect = (selectedGenreId) => {
    if (genres.includes(selectedGenreId)) {
      setGenres(genres.filter((genre) => genre !== selectedGenreId));
    } else {
      setGenres([...genres, selectedGenreId]);
    }
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
  const pageCount = data?.pagination?.last_visible_page;
  const handlePageClick = (value) => {
    setPage(() => {
      return value;
    });
    handleTrigger();
  };
  const [isStartCalendarOpen, setIsStartCalendarOpen] = useState(false);
  const [isEndCalendarOpen, setIsEndCalendarOpen] = useState(false);
  const handleStartDateChange = (date) => {
    const x = date.toISOString().substr(0, 10);
    setStart(x);
    setIsStartCalendarOpen(false);
  };
  const handleEndDateChange = (date) => {
    const x = date.toISOString().substr(0, 10);
    setEnd(x);
    setIsEndCalendarOpen(false);
  };
  const handleStartInputClick = () => {
    setIsStartCalendarOpen(!isStartCalendarOpen);
  };
  const handleEndInputClick = () => {
    setIsEndCalendarOpen(!isEndCalendarOpen);
  };

  return (
    <div className='bg-nobleBlack p-4 w-full'>
      <div className='flex flex-col justify-between bg-metalise rounded-xl'>
        <div className='p-4 md:p-6 xl:p-8 w-full'>
          <h2 className='text-white text-lg mb-2'>Filter</h2>
          <div className='flex flex-col gap-1'>
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
            <div className='flex flex-wrap md:flex-nowrap'>
              <div className='relative'>
                <div className='border-2 h-fit w-fit text-xs border-lilacChampagne xl:mx-8 m-1 md:m-4  p-2 rounded-lg'>
                  <label htmlFor='date' className='text-white mr-6 '>
                    {" "}
                    Start Date:
                  </label>
                  <input
                    id='date'
                    type='text'
                    value={start}
                    onClick={handleStartInputClick}
                    placeholder='yyyy-mm-dd'
                    readOnly
                  />
                </div>
                {isStartCalendarOpen && (
                  <div className='absolute ml-6 top-full z-10'>
                    <Calendar
                      value={start}
                      onClickDay={handleStartDateChange}
                    />
                  </div>
                )}
              </div>
              <div className='relative'>
                <div className='border-2 h-fit w-fit text-xs border-lilacChampagne xl:mx-8 m-1 md:m-4  p-2 rounded-lg'>
                  <label className='text-white mr-6 ' htmlFor='date'>
                    End Date:
                  </label>
                  <input
                    id='date'
                    type='text'
                    value={end}
                    onClick={handleEndInputClick}
                    placeholder='yyyy-mm-dd'
                    readOnly
                  />
                </div>
                {isEndCalendarOpen && (
                  <div className='absolute ml-6 top-full '>
                    <Calendar value={end} onChange={handleEndDateChange} />
                  </div>
                )}
              </div>
            </div>
          </div>
          <GenreFilter
            activeGenres={genres}
            onGenreSelect={handleGenreSelect}
          />
        </div>
        <div className='px-4 md:px-6 xl:px-8 py-2'>
          <button
            className='bg-drySeedlings font-bold text-nobleBlack w-fit p-2 text-center rounded-lg'
            onClick={handleSearch}
          >
            Filter
          </button>
        </div>
      </div>

      <div>
        <div className=''>
          <TopCardContainer containerName={"Filter Results"} data={data} />
        </div>
        <div className='text-white flex  justify-center items-center  '>
          <PagePagination
            value={page}
            pageCount={pageCount}
            onPageChange={handlePageClick}
          />
        </div>
      </div>
    </div>
  );
};

export default Search;
