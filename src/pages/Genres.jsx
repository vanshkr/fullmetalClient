import { useGetAnimeGenresQuery } from "../redux/services/jikanApi";
import { useState, useEffect } from "react";
import { colorArray } from "../assets/constants";
const Genres = () => {
  const [showAllGenres, setShowAllGenres] = useState(false);

  const { data, refetch } = useGetAnimeGenresQuery("", {
    skip: false,
  });
  const genres = data?.data;

  const displayedGenres = showAllGenres ? genres : genres?.slice(0, 24);

  useEffect(() => {
    let timeoutId;
    if (data === undefined) {
      timeoutId = setTimeout(() => {
        refetch();
      }, 2000);
    }

    return () => clearTimeout(timeoutId);
  }, [data, refetch]);

  const toggleGenresVisibility = () => {
    setShowAllGenres(!showAllGenres);
  };

  return (
    <>
      <h3 className='font-semibold text-xl md:text-3xl text-drySeedlings mt-4 '>
        Genres
      </h3>
      <div className='rounded-lg mt-6 bg-stretchLimo px-3'>
        <div className=' grid grid-cols-3 gap-2 '>
          {displayedGenres?.map((item, ind) => (
            <div
              key={item.mal_id}
              className='text-sm font-mono  mt-3 p-1 truncate  hover:bg-blackRibbon rounded-md  cursor-pointer text-center'
              style={{
                color: `${colorArray[ind % 7]}`,
              }}
            >
              {item.name}
            </div>
          ))}
        </div>
        <button
          className='my-4 w-full bg-napolean hover:bg-blackRibbon text-white text-sm  py-2 '
          onClick={toggleGenresVisibility}
        >
          {showAllGenres ? "Show Less" : "Show More"}
        </button>
      </div>
    </>
  );
};

export default Genres;
