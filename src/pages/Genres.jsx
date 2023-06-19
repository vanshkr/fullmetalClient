import { useGetAnimeGenresQuery } from "../redux/services/jikanApi";
import { genres } from "../assets/constants";
const Genres = () => {
  const colorArray = [
    "#778741",
    "#FFBF5B",
    "#C63F31",
    "#CCA5D5",
    "#7EBFD8",
    "#D8B290",
    "#86E3CE",
  ];

  return (
    <>
      <h3 className='font-semibold text-xl md:text-3xl text-drySeedlings mt-4'>
        Genres
      </h3>
      <div className='h-fit rounded-lg  mt-6 grid grid-cols-3 gap-3 bg-stretchLimo'>
        {genres?.map((item, ind) => (
          <div
            className='text-sm font-mono ml-2 mt-2 p-1  hover:bg-blackRibbon rounded-md  cursor-pointer text-center'
            style={{
              color: `${colorArray[ind % 7]}`,
            }}
          >
            {item.name}
          </div>
        ))}
      </div>
    </>
  );
};

export default Genres;
