import { useGetTopAnimeByTypeQuery } from "../redux/services/jikanApi";
import Genres from "./Genres";
import { useEffect, useState } from "react";
import { TopCardContainer, PagePagination } from "../components";

import "./styles.css";

const Upcoming = () => {
  const [pageNumber, setPageNumber] = useState(1);
  const { data, isFetching, refetch } = useGetTopAnimeByTypeQuery(
    ["upcoming", pageNumber, 25],
    {
      skip: false,
    }
  );
  const pageCount = data?.pagination?.last_visible_page;
  useEffect(() => {
    let timeoutId;
    if (data === undefined) {
      timeoutId = setTimeout(() => {
        refetch();
      }, 5000);
    }

    return () => clearTimeout(timeoutId);
  }, [isFetching]);
  const handlePageClick = (value) => {
    setPageNumber(value);
  };
  return (
    <div className=' grid xl:grid-cols-12 md:mx-0 mx-3'>
      <div className=' xl:col-span-9 mb-4'>
        <div className=''>
          <TopCardContainer containerName={"Upcoming"} data={data} />
        </div>
        <div className='text-white flex  justify-center items-center  '>
          <PagePagination
            pageCount={pageCount}
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

export default Upcoming;
