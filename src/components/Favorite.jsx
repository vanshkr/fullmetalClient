import DisplayCard from "./CardLayout/DisplayCard";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { useGetTopAnimeByTypeQuery } from "../redux/services/jikanApi";

const Favorite = () => {
  const { data, error, isFetching, refetch } = useGetTopAnimeByTypeQuery(
    ["favorite", 1, 5],
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
