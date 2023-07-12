import DisplayCard from "../CardLayout/DisplayCard";
import DetailsCard from "../CardLayout/DetailsCard";
import CardContainer from "../CardLayout/CardContainer";
import { RiAddFill } from "react-icons/ri";
import { useState, useEffect } from "react";
import {
  useGetAnimeByRecommendationQuery,
  useGetTopAnimeByTypeQuery,
} from "../../redux/services/jikanApi";
import { useParams } from "react-router-dom";
import useRelatedArr from "../../customhooks/useRelatedArr";

const AnimeDetailsCommon = ({ newArr, path, imgUrl, value, data }) => {
  const [relatedAnimeVisible, setRelatedAnimeVisible] = useState(false);
  const { animeId } = useParams();
  console.log(useParams());
  const {
    data: popularData,
    error,
    isFetching,
    refetch,
  } = useGetTopAnimeByTypeQuery(["bypopularity", 1, 10], {
    skip: false,
  });

  useEffect(() => {
    let timeoutId;
    if (data === undefined) {
      timeoutId = setTimeout(() => {
        refetch();
      }, 2000);
    }

    return () => clearTimeout(timeoutId);
  }, [isFetching]);

  const animeArr = newArr?.map(({ id, animeName }) => (
    <DisplayCard
      id={id}
      animeName={animeName}
      url={imgUrl}
      key={id}
      path={path}
    />
  ));

  const popularArr = popularData?.data?.map((anime) => (
    <DisplayCard
      id={anime?.mal_id}
      animeName={anime?.title}
      url={anime?.images?.webp?.small_image_url}
      key={anime?.mal_id}
      path={path}
    />
  ));

  const visibleAnime = relatedAnimeVisible ? animeArr : animeArr.slice(0, 5);
  const recommendedArr = useGetAnimeByRecommendationQuery(
    animeId
  )?.data?.data?.slice(0, 30);

  return (
    <div className='w-full flex lg:flex-row flex-col mt-10 '>
      <div className='lg:w-[75%]  w-full'>
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
        <div className='px-2'>
          <CardContainer
            containerName={"Recommended for you"}
            newArr={recommendedArr}
          />
        </div>
      </div>
      <div className=' lg:w-[25%]  flex-col w-full lg:ml-8 md:ml-4 '>
        {newArr.length > 0 ? (
          <div className='w-full bg-napolean'>
            <h1 className='font-semibold text-xl md:text-3xl text-chineseGreen text-left mx-2'>
              Related Anime
            </h1>
            <div className='mt-8 w-full flex-col bg-metalise'>
              {visibleAnime}
            </div>
            <div className='h-fit text-white px-12 py-2'>
              <button
                className='bg-metalise text-white font-semibold  py-2 px-4 rounded w-full'
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
          <div className='mt-8 w-full flex-col  '>{popularArr}</div>
        </div>
      </div>
    </div>
  );
};

export default AnimeDetailsCommon;
