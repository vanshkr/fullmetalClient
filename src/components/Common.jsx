import DisplayCard from "./CardLayout/DisplayCard";
import DetailsCard from "./CardLayout/DetailsCard";
import { RiAddFill } from "react-icons/ri";
import { useState } from "react";

const Common = ({ newArr, path, imgUrl, value, data }) => {
  const [relatedAnimeVisible, setRelatedAnimeVisible] = useState(false);
  console.log(newArr);
  const x = newArr?.map(({ id, animeName }) => (
    <DisplayCard
      id={id}
      animeName={animeName}
      url={imgUrl}
      key={id}
      path={path}
    />
  ));
  const y = x?.slice(0, 5);
  const z = x?.slice(5);
  return (
    <div className='w-full flex md:flex-row flex-col mt-10 '>
      <div className='lg:w-[75%] md:w-[65%] w-full'>
        <div className='w-full flex flex-col'>
          <h1 className='font-semibold text-xl md:text-3xl text-chineseGreen text-left'>
            Characters & Voice Actors
          </h1>
          <div className=' mt-8 flex flex-wrap justify-between'>
            {value?.data?.data?.map((detail, i) => (
              <DetailsCard details={detail} key={i} />
            ))}
          </div>
        </div>
      </div>
      <div className=' lg:w-[25%] md:w-[35%] flex-col w-full lg:ml-8 md:ml-4 '>
        {newArr.length > 0 ? (
          <div className='w-full'>
            <h1 className='font-semibold text-xl md:text-3xl text-chineseGreen text-left'>
              Related Anime
            </h1>
            <div className='mt-8 w-full flex-col bg-metalise'>
              {y}
              {relatedAnimeVisible ? z : null}
            </div>
            <div className='h-16 text-white '>
              <button
                className='p-4 ml-20 my-2 border-2'
                onClick={() => setRelatedAnimeVisible(!relatedAnimeVisible)}
              >
                {!relatedAnimeVisible ? "Show More" : "Show Less"}
              </button>
            </div>
          </div>
        ) : null}
        <div className='w-full mt-8'>
          <h1 className='font-semibold text-xl md:text-3xl text-chineseGreen text-left'>
            Most Popular
          </h1>
          <div className='mt-8 w-full flex-col  '>
            <div className='bg-metalise gap-6 flex p-3 w-full'>
              <div className=' w-16 h-16'>
                <img
                  className='w-full h-full'
                  src={data?.data?.images?.webp?.small_image_url}
                />
              </div>
              <div className='text-white my-2 text-sm sm:text-lg w-80 '>
                <h1 className='mb-2'>One Piece: The Movie 14 - Stamp</h1>
              </div>
              <div className='text-white hover:text-green text-2xl sm:text-4xl my-3  '>
                <RiAddFill />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Common;
