import DisplayCard from "./CardLayout/DisplayCard";
import { useLocation } from "react-router-dom";
import { useGetTopAnimeByTypeQuery } from "../redux/services/jikanApi";

import { useEffect } from "react";

const Popular = () => {
  const location = useLocation()?.pathname;

  const { data, error, isFetching, refetch } = useGetTopAnimeByTypeQuery(
    ["bypopularity", 1, 5],
    {
      skip: false,
    }
  );

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
      path={location}
    />
  ));
};

export default Popular;
