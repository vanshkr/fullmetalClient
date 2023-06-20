import {
  LatestEpisodes,
  Trending,
  Airing,
  Completed,
  Favorite,
  Popular,
} from "../components";
import { Slider } from "../components";
import Genres from "./Genres";
import { Link } from "react-router-dom";
import { componentArray } from "../assets/constants";
const Home = () => {
  return (
    <div className='w-full flex flex-col px-2'>
      <div className='w-full'>
        <Slider />
      </div>
      <div className='w-full flex-col justify-start items-center mt-8 bg-black'>
        <div className=' flex'>
          <h3 className='font-semibold text-xl md:text-3xl text-drySeedlings text-left '>
            Trending
          </h3>
        </div>
        <Trending />
      </div>
      <div className=' grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4  xl:p-8 md:p-4 p-2  mt-12  bg-nobleBlack xl:gap-12 md:gap-6 gap-3 px-2'>
        {componentArray.map((component) => {
          const word = component[0].split(" ");
          return (
            <div className='  bg-blackRibbon '>
              <div className='font-semibold text-md md:text-xl text-drySeedlings m-3 '>
                {component[0]}
              </div>
              {component[1]}
              <Link
                to={`/${
                  word.length > 1
                    ? word[1].toLowerCase()
                    : word[0].toLowerCase()
                }`}
              >
                <div className='font-semibold text-md  text-nonChalantWhite text-center m-3 cursor-pointer '>
                  View More &gt;
                </div>
              </Link>
            </div>
          );
        })}
      </div>
      <div className='flex xl:flex-row flex-col bg-nobleBlack'>
        <div className='xl:w-[70%]  px-2 '>
          <LatestEpisodes />
        </div>
        <div className=' xl:w-[25%] px-2 xl:ml-auto'>
          <Genres />
        </div>
      </div>
      <div
        className='text-white
      '
      >
        estimated schedule
      </div>
      {/* <div>
        <div className='xl:w-[70%]  px-2 '>
          <LatestEpisodes />
        </div>
      </div> */}
    </div>
  );
};

export default Home;
