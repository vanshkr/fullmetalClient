import { useGetAnimeGenresQuery } from "../../redux/services/jikanApi";
import { useState, useEffect } from "react";
import { colorArray } from "../../assets/constants";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { RiDriveFill } from "react-icons/ri";
const GenreFilter = ({ activeGenres, onGenreSelect }) => {
  const { data, refetch } = useGetAnimeGenresQuery("", {
    skip: false,
  });
  const genres = data?.data;

  useEffect(() => {
    let timeoutId;
    if (data === undefined) {
      timeoutId = setTimeout(() => {
        refetch();
      }, 2000);
    }

    return () => clearTimeout(timeoutId);
  }, [data, refetch]);

  return (
    <div className='my-6'>
      <h2 className=' text-white mt-4 text-sm '>Genres</h2>
      <div className='rounded-lg mt-6 bg-metalise px-2'>
        <div className=' flex flex-wrap gap-2 '>
          {genres?.map((item, ind) => (
            <div
              key={item.mal_id}
              onClick={() => onGenreSelect(item?.mal_id)}
              className='text-xs font-mono text-white  hover:text-drySeedlings  cursor-pointer text-center border-2 border-lilacChampagne   p-2 rounded-lg'
            >
              {item.name}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GenreFilter;
