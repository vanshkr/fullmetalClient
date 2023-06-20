import { useGetAnimeByGenreQuery } from "../redux/services/jikanApi";
import Genres from "../components/Genres";
import { useState } from "react";
import { TopCardContainer, PagePagination } from "../components";
import { useParams } from "react-router-dom";

const Genre = () => {
  const genre = useParams();
  const [pageNumber, setPageNumber] = useState(1);
  const { data } = useGetAnimeByGenreQuery(genre.genreId, {
    skip: false,
  });
  const pageCount = data?.pagination?.last_visible_page;

  const handlePageClick = (value) => {
    setPageNumber(value);
  };
  return (
    <div className=' grid xl:grid-cols-12 md:mx-0 mx-3'>
      <div className=' xl:col-span-9 mb-4'>
        <div className=''>
          <TopCardContainer containerName={genre.genreName} data={data} />
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

export default Genre;
