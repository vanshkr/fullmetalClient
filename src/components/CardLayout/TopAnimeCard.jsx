import { Link } from "react-router-dom";

const TopAnimeCard = ({ anime }) => {
  return (
    <div className='flex  justify-between flex-col lg:w-52 w-32 md:w-48 lg:h-96 md:h-80 h-64 bg-stretchLimo bg-opacity-80 animate-slideup '>
      <div className='relative cursor-pointer w-full md:h-64 lg:h-80 h-52 group'>
        <div
          className={` top-40 bg-gradient-to-t from-nobleBlack absolute inset-0 `}
        />

        <img
          className='w-full h-full object-cover '
          src={anime?.images?.webp?.image_url}
          alt={anime?.title}
        />
      </div>
      <div>
        <h3 className='m-2 xl:text-lg text-md text-white truncate hover:text-drySeedlings'>
          <Link to={`/anime/${anime?.mal_id}/full`}>{anime?.title}</Link>
        </h3>
      </div>
    </div>
  );
};

export default TopAnimeCard;
