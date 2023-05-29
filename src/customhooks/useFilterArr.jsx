import { useGetLimitedTopAnimeByTypeQuery } from "../redux/services/jikanApi";

const useFilterArr = ({ type, limit }) => {
  const newArr = [];
  const { data } = useGetLimitedTopAnimeByTypeQuery([type, limit]);
  data?.data?.map((anime, i) => {
    newArr.push({
      id: anime?.mal_id,
      title: anime?.title,
      img: [
        anime?.images?.webp?.image_url,
        anime?.images?.webp?.small_image_url,
      ],
      type: anime?.type,
      episodes: anime?.episodes,
      duration: anime?.duration,
      airingStatus: anime?.airing,
    });
  });
  return newArr;
};

export default useFilterArr;
