import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";

const AnimeCard = ({ anime }) => {
  const { pathname } = useLocation();

  return (
    <div className='flex  justify-between flex-col lg:w-52 w-32 md:w-48 lg:h-96 md:h-80 h-64 bg-stretchLimo bg-opacity-80 animate-slideup '>
      <div className='relative cursor-pointer w-full md:h-64 lg:h-80 h-52 group'>
        <div
          className={` top-40 bg-gradient-to-t from-nobleBlack absolute inset-0 `}
        />

        {pathname === "/" ? (
          <div className='absolute  bottom-1 right-2 md:p-1 bg-electricBlue rounded-full'>
            <p className='px-0.5 font-bold text-sm text-nobleBlack  '>
              Ep {anime?.episodes?.[0]?.mal_id}
            </p>
          </div>
        ) : undefined}

        <img
          className='w-full h-full object-cover '
          src={anime?.entry?.images?.webp?.large_image_url}
          alt={anime?.entry?.title}
        />
      </div>
      <div className='md:m-4 m-2'>
        <h3 className='text-md text-white truncate hover:text-drySeedlings'>
          <Link to={`/anime/${anime?.entry?.mal_id}/full`}>
            {anime?.entry?.title}
          </Link>
        </h3>
      </div>
    </div>
  );
};

export default AnimeCard;
