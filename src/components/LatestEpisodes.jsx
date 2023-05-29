import { useGetWatchRecentEpisodesQuery } from "../redux/services/jikanApi";

import { useEffect, useState } from "react";
import CardContainer from "./CardContainer";

const LatestEpisodes = () => {
  // const [data, setData] = useState({});
  const { data, isFetching, refetch } = useGetWatchRecentEpisodesQuery(
    "hello",
    {
      skip: false,
    }
  );
  useEffect(() => {
    let timeoutId;
    if (data === undefined) {
      timeoutId = setTimeout(() => {
        refetch();
      }, 5000);
    }

    return () => clearTimeout(timeoutId);
  }, [isFetching]);
  const arr = data?.data?.slice(0, 12);
  return (
    <CardContainer containerName={"Latest Episodes"} newArr={arr} data={data} />
  );
};

export default LatestEpisodes;
