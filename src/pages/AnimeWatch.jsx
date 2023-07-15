import { useParams } from "react-router-dom";
import {
  useGetAnimeDetailsQuery,
  useGetActorsDetailsQuery,
  useGetAnimeWatchQuery,
} from "../redux/services/jikanApi";
import { AnimeDetailsCommon, WatchPagination } from "../components";

import useRelatedArr from "../customhooks/useRelatedArr";

import { useState, useRef, useEffect } from "react";

const AnimeWatch = () => {
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [pageNumber, setPageNumber] = useState(1);

  const { animeId: id } = useParams();
  const { data } = useGetAnimeDetailsQuery(id);
  const arr = data?.data?.relations;
  const newArr = useRelatedArr(arr);
  const value = useGetActorsDetailsQuery(id);
  const imgUrl = data?.data?.images?.webp?.small_image_url;
  const playerRef = useRef(null);

  const val = useGetAnimeWatchQuery([id, pageNumber]);
  const result = val?.data;
  useEffect(() => {
    const res = check();

    if (currentVideoIndex === -1) {
      if (res) {
        setCurrentVideoIndex(0);
      } else {
        setCurrentVideoIndex(99);
        setPageNumber((prevPageNumber) => prevPageNumber - 1);
      }
    } else if (currentVideoIndex === 100) {
      setCurrentVideoIndex(0);
      setPageNumber((prevPageNumber) => prevPageNumber + 1);
    }
  }, [currentVideoIndex]);

  const check = () => {
    const val = result?.pagination?.has_next_page
      ? result?.data?.[0]?.mal_id
      : result?.data?.[data?.length - 1]?.mal_id;
    return (pageNumber - 1) * 100 + (currentVideoIndex + 1) === val;
  };

  const handlePageChange = (value) => {
    setPageNumber(value);
    setCurrentVideoIndex(0);
  };
  const handleEpsiodeChange = (value) => {
    setCurrentVideoIndex(value - (100 * (pageNumber - 1) + 1));
  };
  const playPreviousVideo = () => {
    if (currentVideoIndex === 0) return;
    setCurrentVideoIndex((prevIndex) => (prevIndex >= 0 ? prevIndex - 1 : -1));
  };

  const playNextVideo = () => {
    // const value1 = result?.data?.[currentVideoIndex]?.mal_id;
    // const value2 = result?.pagination?.has_next_page
    // console.log(value);
    setCurrentVideoIndex((prevIndex) =>
      prevIndex <= 99 ? prevIndex + 1 : 100
    );
  };
  return (
    <div className='md:flex-row flex-col bg-stretchLimo h-fit w-full '>
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
          <div className='grid text-white relative '>
            <div className='bg-cursedBlack xl:m-14 relative  min-h-[540px] grid xl:grid-cols-12'>
              <div className='bg-stretchLimo xl:order-1 order-2 xl:col-span-3'>
                <WatchPagination
                  data={result}
                  onPageChange={handlePageChange}
                  onEpisodeChange={handleEpsiodeChange}
                  firstPageItems={pageNumber}
                  animeId={id}
                />
              </div>
              <div className='xl:col-span-9 overflow-auto   xl:order-2 order-1 min-h-[340px]'>
                <div className='w-full h-full '>
                  <div ref={playerRef} className='h-[85%]'>
                    <div className='w-full h-full'>
                      <iframe
                        className='w-full h-full'
                        src='https://www.youtube.com/embed/S-9fS8X-o_g'
                        frameborder='0'
                        allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
                        allowfullscreen
                      ></iframe>
                    </div>
                  </div>
                  <div className='bg-gray-600 mt-3'>
                    <div>
                      <p>{result?.data?.[currentVideoIndex]?.title}</p>
                      <p>{result?.data?.[currentVideoIndex]?.mal_id}</p>
                    </div>
                    <div>
                      <button onClick={playPreviousVideo}>Previous</button>
                      <button onClick={playNextVideo}>Next</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div></div>
          </div>
        </div>
        {
          <AnimeDetailsCommon
            newArr={newArr}
            data={data}
            value={value}
            imgUrl={imgUrl}
          />
        }
      </div>
    </div>
  );
};

export default AnimeWatch;
