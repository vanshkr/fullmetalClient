import DisplayCard from "./DisplayCard";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { useGetLimitedTopAnimeByTypeQuery } from "../redux/services/jikanApi";

const Favorite = () => {
  const { data, error, isFetching, refetch } = useGetLimitedTopAnimeByTypeQuery(
    ["favorite", 5],
    {
      skip: false,
    }
  );
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

export default Favorite;
