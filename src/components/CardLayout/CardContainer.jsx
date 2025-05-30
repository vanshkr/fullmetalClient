import { AnimeCard } from "..";
import { Link } from "react-router-dom";

const CardContainer = ({ containerName, newArr, data }) => {
  return (
    <div className='w-full flex flex-col mt-4 '>
      <div className='w-full flex '>
        <h3 className='font-semibold text-xl md:text-3xl text-drySeedlings'>
          {containerName}
        </h3>
        {containerName === "Latest Episodes" ? (
          <Link
            to={`/recent`}
            className='text-greyHeather md:mt-4 mt-2  text-sm font-semibold cursor-pointer ml-auto'
          >
            View more &gt;
          </Link>
        ) : undefined}
      </div>

      <div className=' w-full mt-6 justify-center items-center  grid xl:grid-cols-4 md:grid-cols-3 grid-cols-2 md:gap-6 gap-3'>
        {newArr?.map((anime, i) => (
          <AnimeCard
            key={`${anime?.entry?.mal_id}-${anime?.entry?.title}`}
            anime={anime}
            i={i}
          />
        ))}
      </div>
    </div>
  );
};
export default CardContainer;
