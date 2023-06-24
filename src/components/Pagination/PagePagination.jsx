import ReactPaginate from "react-paginate";
import "../styles.css";

const PagePagination = ({ value, pageCount, onPageChange }) => {
  const handlePageClick = (selectedPage) => {
    onPageChange(selectedPage.selected + 1);
  };

  return (
    <ReactPaginate
      className='flex justify-center mt-2'
      previousLabel={"←"}
      nextLabel={"→"}
      pageCount={pageCount}
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
      forcePage={value - 1}
    />
  );
};

export default PagePagination;
