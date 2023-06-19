import { useGetTopAnimeByTypeQuery } from "../redux/services/jikanApi";
import Genres from "./Genres";
import { useEffect, useState } from "react";
import { TopCardContainer } from "../components";
import ReactPaginate from "react-paginate";
import "./styles.css";

const MostPopular = () => {
  const [pageNumber, setPageNumber] = useState(1);
  const { data, isFetching, refetch } = useGetTopAnimeByTypeQuery(
    ["bypopularity", pageNumber],
    {
      skip: false,
    }
  );
  console.log(data);
  const handlePageClick = (selectedPage) => {
    setPageNumber(selectedPage.selected + 1);
  };

  useEffect(() => {
    let timeoutId;
    if (data === undefined) {
      timeoutId = setTimeout(() => {
        refetch();
      }, 5000);
    }

    return () => clearTimeout(timeoutId);
  }, [isFetching]);
  return (
    <div className=' grid xl:grid-cols-12'>
      <div className=' xl:col-span-9 mb-4'>
        <div className=''>
          <TopCardContainer containerName={"Most Popular"} data={data} />
        </div>
        <div className='text-white flex  justify-center items-center  '>
          <ReactPaginate
            className='flex justify-center mt-2'
            previousLabel={"←"}
            nextLabel={"→"}
            pageCount={data?.pagination?.last_visible_page}
            pageRangeDisplayed={1}
            onPageChange={handlePageClick}
            marginPagesDisplayed={1}
            breakLabel={"..."}
            breakClassName={"break-me"}
            pageClassName={"page-item"}
            pageLinkClassName={"page-link"}
            previousClassName={"page-item"}
            nextClassName={"page-item"}
            previousLinkClassName={"page-link"}
            nextLinkClassName={"page-link"}
            activeClassName={"active"}
          />
        </div>
      </div>
      <div className='xl:col-span-3'>
        <Genres />
      </div>
    </div>
  );
};

export default MostPopular;
