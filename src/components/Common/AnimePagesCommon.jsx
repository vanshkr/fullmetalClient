import { useGetAnimePagesByTypeQuery } from "../../redux/services/jikanApi";
import { Genres } from "../../pages";
import { useState } from "react";
import TopCardContainer from "../CardLayout/TopCardContainer";
import PagePagination from "../Pagination/PagePagination";

const AnimePagesCommon = ({ path, heading }) => {
  const [pageNumber, setPageNumber] = useState(1);
  const { data } = useGetAnimePagesByTypeQuery([path, pageNumber], {
    skip: false,
  });
  const pageCount = data?.pagination?.last_visible_page;
  console.log(path, heading);
  const handlePageClick = (value) => {
    setPageNumber(value);
  };
  return (
    <div className=' grid xl:grid-cols-12 md:mx-0 mx-3'>
      <div className=' xl:col-span-9 mb-4'>
        <div className=''>
          <TopCardContainer containerName={heading} data={data} />
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

export default AnimePagesCommon;
