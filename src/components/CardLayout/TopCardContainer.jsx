import { TopAnimeCard } from "..";

const TopCardContainer = ({ containerName, data }) => {
  const arr = data?.data;
  return (
    <div className='w-full flex flex-col mt-4 '>
      <div className='w-full '>
        <h3 className='font-semibold text-xl md:text-3xl text-drySeedlings'>
          {containerName}
        </h3>
      </div>

      <div className=' mt-6  grid xl:grid-cols-4 md:grid-cols-3 grid-cols-2 md:gap-y-6 gap-y-3'>
        {arr?.map((anime) => (
          <TopAnimeCard
            key={`${anime?.mal_id}-${anime?.title}`}
            anime={anime}
          />
        ))}
      </div>
    </div>
  );
};
export default TopCardContainer;
