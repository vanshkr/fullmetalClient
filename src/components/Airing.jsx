import { useGetLimitedTopAnimeByTypeQuery } from "../redux/services/jikanApi";
import DisplayCard from "./DisplayCard";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const Airing = () => {
  const { data, error, isFetching, promise, refetch } =
    useGetLimitedTopAnimeByTypeQuery(["airing", 5], {
      skip: false,
    });
  const location = useLocation();
  useEffect(() => {
    let timeoutId;
    if (data === undefined) {
      timeoutId = setTimeout(() => {
        refetch();
      }, 2000);
    }

    return () => clearTimeout(timeoutId);
  }, [isFetching]);

  return data?.data?.map((anime, index) => (
    <DisplayCard
      id={anime?.mal_id}
      animeName={anime?.title}
      url={anime?.images?.webp?.small_image_url}
      key={anime?.mal_id}
      path={location?.pathname}
    />
  ));
};

export default Airing;
