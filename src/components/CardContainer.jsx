import { AnimeCard } from "../components";

const CardContainer = ({ containerName, newArr, data }) => {
  return (
    <div className='w-full flex flex-col mt-4 '>
      <div className='w-full flex '>
        <h3 className='font-semibold text-xl md:text-3xl text-drySeedlings'>
          {containerName}
        </h3>
        <div className='text-greyHeather md:mt-4 mt-2  text-sm font-semibold cursor-pointer ml-auto'>
          View more &gt;
        </div>
      </div>

      <div className=' w-full mt-6 flex flex-1 flex-wrap justify-around md:gap-y-6 gap-y-3'>
        {newArr?.map((anime, i) => (
          <AnimeCard
            key={`${anime?.entry?.mal_id}-${anime?.entry?.title}`}
            anime={anime}
            data={data}
            i={i}
          />
        ))}
      </div>
    </div>
  );
};
export default CardContainer;
