import { useGetAnimePagesByTypeQuery } from "../../redux/services/jikanApi";
import Genres from "../Genres";
import { useState } from "react";
import TopCardContainer from "../CardLayout/TopCardContainer";
import PagePagination from "../Pagination/PagePagination";

const AnimePagesCommon = ({ path, heading }) => {
  const [pageNumber, setPageNumber] = useState(1);
  const { data } = useGetAnimePagesByTypeQuery([path, pageNumber], {
    skip: false,
  });
  const pageCount = data?.pagination?.last_visible_page;
  const animeArr = data?.data;
  const handlePageClick = (value) => {
    setPageNumber(value);
  };
  return (
    <div className=' grid xl:grid-cols-12 md:mx-0 mx-3'>
      <div className=' xl:col-span-9 mb-4'>
        <div className=''>
          <TopCardContainer containerName={heading} data={animeArr} />
        </div>
        <div className='text-white flex  justify-center items-center  '>
          <PagePagination
            value={pageNumber}
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

export default AnimePagesCommon;
