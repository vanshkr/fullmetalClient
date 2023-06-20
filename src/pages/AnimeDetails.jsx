import { useParams, useLocation } from "react-router-dom";
import {
  useGetAnimeDetailsQuery,
  useGetActorsDetailsQuery,
} from "../redux/services/jikanApi";
import { AnimeDetailsCommon } from "../components";
import useRelatedArr from "../customhooks/useRelatedArr";

import { useState, useEffect } from "react";
import { FaPlayCircle, FaPlus } from "react-icons/fa";
import { Link } from "react-router-dom";

const AnimeDetails = () => {
  const { animeId: id } = useParams();
  const [visible, setVisible] = useState(false);
  const location = useLocation();
  const { data } = useGetAnimeDetailsQuery(id);
  const arr = data?.data?.relations;
  const newArr = useRelatedArr(arr);
  const value = useGetActorsDetailsQuery(id);
  const imgUrl = data?.data?.images?.webp?.small_image_url;
  const genre = data?.data?.genres.map((genres) => genres.name);
  const studios = data?.data?.studios?.[0]?.name;
  const producers = data?.data?.producers.map((producers) => producers.name);
  const synopsis = data?.data?.synopsis;
  const slicedSynopsis = synopsis?.slice(0, 300);
  const restSlicedSynopsis = synopsis?.slice(300);

  return (
    <div className='md:flex-row flex-col bg-stretchLimo h-fit w-full'>
      <div className=' h-full'>
        <div className='h-full w-full relative'>
          <div className='h-full absolute inset-0 overflow-hidden '>
            <div
              className='bg-cover bg-no-repeat bg-center h-full w-[480px]'
              style={{
                backgroundImage: `url(${data?.data?.images?.webp?.large_image_url})`,
                filter: "blur(20px)",
                opacity: "0.5",
                width: "100%",
              }}
            ></div>
          </div>
          <div className='grid md:grid-cols-10 text-white relative '>
            <div className='xl:col-span-2 md:col-span-3'>
              <div className='md:top-20 top-10 mx-auto relative xl:w-56 md:w-48 w-44'>
                <div className='w-full h-full'>
                  <img
                    className='absolute object-cover'
                    src={data?.data?.images?.webp?.image_url}
                  />
                </div>
              </div>
            </div>
            <div className=' xl:col-span-6 md:col-span-7  mt-96 md:mt-20  min-h-[150px] md:min-h-[450px]'>
              <div>
                <div className='text-justify'>
                  <div className='text-center text-3xl md:text-4xl'>
                    {data?.data?.titles?.[0]?.title}
                  </div>
                  <div className='m-10 flex flex-col gap-y-6 md:flex-row justify-center font-bold'>
                    <button className='bg-drySeedlings text-black py-2 px-5 rounded-full mx-auto md:mr-4'>
                      <Link
                        className='flex justify-center items-center '
                        to={`/anime/${id}/episodes`}
                      >
                        <FaPlayCircle className='mr-2 text-xl md:text-2xl' />
                        <p className='text-md md:text-lg'>Watch Now</p>
                      </Link>
                    </button>

                    <button className='bg-white text-black py-2 px-5  rounded-full  mx-auto'>
                      <Link
                        className='flex justify-center items-center '
                        to={`/anime-details/${id}/full`}
                      >
                        <FaPlus className='mr-2 text-xl md:text-2xl' />
                        <p className='text-md md:text-lg'>Add to List</p>
                      </Link>
                    </button>
                  </div>

                  <div className='my-14 mx-10 hidden md:block'>
                    {slicedSynopsis}
                    {visible ? restSlicedSynopsis : "... "}
                    <span
                      className='cursor-pointer'
                      onClick={() => setVisible(!visible)}
                    >
                      {visible ? " -Less" : " +More"}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className='bg-[rgba(37,38,41,0.3)] xl:col-span-2  md:col-span-10 p-5 py-10 relative'>
              <div className='relative xl:top-14 mb-10'>
                <div className='text-white '>
                  <div className='md:hidden  block h-36 mb-10'>
                    <h2 className='mb-2'>Overview:</h2>
                    <p className='overflow-y-scroll h-28 text-justify'>
                      {synopsis}
                    </p>
                  </div>
                  <div className=' p-2'>
                    <span className='font-bold'>Japanese:</span>{" "}
                    {data?.data?.title_japanese}
                  </div>
                  <div className='p-2'>
                    <span className='font-bold'>Aired:</span>{" "}
                    {data?.data?.aired?.["string"]}
                  </div>
                  <div className='p-2'>
                    <span className='font-bold'>Duration:</span>{" "}
                    {data?.data?.duration}
                  </div>
                  <div className='p-2'>
                    <span className='font-bold'>Status:</span>{" "}
                    {data?.data?.status}
                  </div>
                  <div className='p-2'>
                    <span className='font-bold'>Rank:</span> {data?.data?.rank}
                  </div>
                  <div className='p-2'>
                    <span className='font-bold'>MAL Score:</span>{" "}
                    {data?.data?.score}
                  </div>
                  <div className='p-2'>
                    <span className='font-bold'>Favorites:</span>{" "}
                    {data?.data?.favorites}
                  </div>
                  <div className='p-2'>
                    <span className='font-bold'>Genres:</span>{" "}
                    {genre?.join(", ")}
                  </div>
                  <div className='p-2'>
                    <span className='font-bold'>Studios:</span> {studios}
                  </div>
                  <div className='p-2'>
                    <span className='font-bold'>Producers:</span>{" "}
                    {producers?.join(", ")}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {
          <AnimeDetailsCommon
            newArr={newArr}
            path={location?.pathname}
            value={value}
            imgUrl={imgUrl}
            data={data}
          />
        }
      </div>
    </div>
  );
};

export default AnimeDetails;
