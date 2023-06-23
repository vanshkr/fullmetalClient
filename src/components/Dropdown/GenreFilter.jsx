import { useGetAnimeGenresQuery } from "../../redux/services/jikanApi";
import { useState, useEffect } from "react";

const GenreFilter = ({ activeGenres, onGenreSelect }) => {
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
    <div className='my-6'>
      <h2 className=' text-white mt-4 text-sm '>Genres</h2>
      <div className='rounded-lg mt-6 bg-metalise px-2'>
        <div className=' flex flex-wrap gap-2 '>
          {displayedGenres?.map((item, ind) => (
            <div
              key={item.mal_id}
              onClick={() => onGenreSelect(item?.mal_id)}
              className={`text-xs font-mono   ${
                activeGenres.includes(item?.mal_id)
                  ? " text-drySeedlings border-drySeedlings bg-opacity-10 bg-drySeedlings "
                  : "bg-metalise text-lilacChampagne hover:text-drySeedlings border-lilacChampagne "
              }   cursor-pointer text-center border-2    p-2 rounded-lg`}
            >
              {item.name}
            </div>
          ))}
          <div
            className=' my-2 cursor-pointer font-semibold  text-white text-md '
            onClick={toggleGenresVisibility}
          >
            {showAllGenres ? "- Show Less" : "+ Show More"}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GenreFilter;
