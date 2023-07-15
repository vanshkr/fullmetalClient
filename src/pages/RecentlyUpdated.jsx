import { useGetWatchRecentEpisodesQuery } from "../redux/services/jikanApi";
import Genres from "../components/Genres";
import { useEffect, useState } from "react";
import { TopCardContainer, PagePagination } from "../components";

const RecentlyUpdated = () => {
  const [pageNumber, setPageNumber] = useState(1);
  const { data, isFetching, refetch } = useGetTopAnimeByTypeQuery([
    "airing",
    pageNumber,
    25,
  ]);

  const pageCount = data?.pagination?.last_visible_page;

  const handlePageClick = (value) => {
    setPageNumber(value);
  };
  return (
    <div className=' grid xl:grid-cols-12 md:mx-0 mx-3'>
      <div className=' xl:col-span-9 mb-4'>
        <div className=''>
          <TopCardContainer containerName={"Top Airing"} data={data?.data} />
        </div>
        <div className='text-white flex  justify-center items-center  '>
          <PagePagination
            pageCount={pageCount}
            value={pageNumber}
            onPageChange={handlePageClick}
          />
        </div>
      </div>
      <div className='xl:col-span-3 md:mx-2 mx-0'>
        <Genres />
      </div>
    </div>
  );
};

export default RecentlyUpdated;
