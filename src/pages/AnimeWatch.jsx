import { useGetAnimeWatchQuery } from "../redux/services/jikanApi";
import { useParams } from "react-router-dom";
import {
  useGetAnimeDetailsQuery,
  useGetActorsDetailsQuery,
} from "../redux/services/jikanApi";
import DetailsCard from "../components/DetailsCard";
import { Pagination } from "../components";
import { RiAddFill } from "react-icons/ri";
import useRelatedArr from "../customhooks/useRelatedArr";
import DisplayCard from "../components/DisplayCard";
import { useLocation } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import { FaPlayCircle, FaPlus } from "react-icons/fa";
import { Link } from "react-router-dom";

const AnimeWatch = () => {
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [visible, setVisible] = useState(false);
  const [pageNumber, setPageNumber] = useState(1);
  const [result, setResult] = useState(null);
  const { id } = useParams();
  const { data } = useGetAnimeDetailsQuery(id);

  useEffect(() => {
    fetchData(id, pageNumber);
    console.log(pageNumber, " anime watch useEffect");
  }, [pageNumber]);
  const fetchData = async (id, pageNumber) => {
    try {
      const response = await fetch(
        `https://api.jikan.moe/v4/anime/${id}/episodes?page=${pageNumber}`
      );
      const jsonData = await response.json();
      setResult(jsonData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  const arr = data?.data?.relations;
  const newArr = useRelatedArr(arr);
  const value = useGetActorsDetailsQuery(id);
  const imgUrl = data?.data?.images?.webp?.small_image_url;
  const playerRef = useRef(null);
  const handlePageChange = (value) => {
    setPageNumber(value);
  };
  const handleEpsiodeChange = (value) => {
    setCurrentVideoIndex(value);
  };
  const playPreviousVideo = () => {
    setCurrentVideoIndex((prevIndex) => {
      if (prevIndex === 0) {
        setPageNumber((prevPageNumber) => prevPageNumber - 1);
        return 99; // Assuming there are 100 videos per page
      } else {
        return prevIndex - 1;
      }
    });
  };
  {
    console.log("anime watch render");
  }

  const playNextVideo = () => {
    setCurrentVideoIndex((prevIndex) =>
      prevIndex < videoUrls.length - 1 ? prevIndex + 1 : prevIndex
    );
  };
  return (
    <div className='md:flex-row flex-col bg-stretchLimo h-full w-full '>
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
            <div className='bg-cursedBlack xl:m-14 md:m-10 sm:m-5 m-3 relative min-h-[540px] grid xl:grid-cols-12'>
              <div className='bg-stretchLimo xl:col-span-3'>
                <Pagination
                  data={result}
                  onPageChange={handlePageChange}
                  onEpisodeChange={handleEpsiodeChange}
                  firstPageItems={pageNumber}
                />
              </div>
              <div className='xl:col-span-9'>
                <div className='w-full '>
                  <div ref={playerRef}>
                    {result?.data?.[currentVideoIndex]?.title}
                  </div>
                  <button onClick={playPreviousVideo}>Previous</button>
                  <button onClick={playNextVideo}>Next</button>
                </div>
              </div>
            </div>
            <div></div>
          </div>
        </div>
      </div>

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
          <div
            className='w-full'
            style={{ display: `${newArr?.length} ? block:none` }}
          >
            <h1 className='font-semibold text-xl md:text-3xl text-chineseGreen text-left'>
              Related Anime
            </h1>
            <div className='mt-8 w-full flex-col bg-metalise'>
              {newArr.map(({ id, animeName }, index) => (
                <DisplayCard
                  id={id}
                  animeName={animeName}
                  url={imgUrl}
                  key={id}
                  path={location?.pathname}
                />
              ))}
              {newArr.length > 5 ? (
                <div className='font-semibold text-md   text-nonChalantWhite text-center m-3 '>
                  {visible ? "Show More" : "Show Less"} &gt;
                </div>
              ) : null}
            </div>
          </div>
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
    </div>
  );
};

export default AnimeWatch;
