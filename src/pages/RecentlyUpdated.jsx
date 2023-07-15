import { useGetWatchRecentEpisodesQuery } from "../redux/services/jikanApi";
import Genres from "../components/Genres";
import { useEffect, useState } from "react";
import { CardContainer, PagePagination } from "../components";

const RecentlyUpdated = () => {
  const [pageNumber, setPageNumber] = useState(1);
  const [activeData, setActiveData] = useState([]);
  const { data, isFetching, refetch } = useGetWatchRecentEpisodesQuery("", {
    skip: false,
  });
  useEffect(() => {
    let timeoutId;
    if (data === undefined) {
      timeoutId = setTimeout(() => {
        refetch();
      }, 5000);
    }
    setActiveData(data?.data?.slice(0, 17));
    return () => clearTimeout(timeoutId);
  }, [isFetching]);

  const pageCount = 3;

  const handlePageClick = (value) => {
    const startIndex = (value - 1) * 17;
    const endIndex = startIndex + 17;
    const arr = data?.data?.slice(startIndex, endIndex);
    setActiveData(arr);
    setPageNumber(value);
  };
  return (
    <div className=' grid xl:grid-cols-12 md:mx-0 mx-3'>
      <div className=' xl:col-span-9 mb-4'>
        <div className=''>
          <CardContainer
            containerName={"Recently Updated"}
            newArr={activeData}
          />
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
