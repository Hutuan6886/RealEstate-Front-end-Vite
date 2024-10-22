import { ListingReduxType } from "@/types/types";
import { useState } from "react";

const useListingPagination = (dataLisitngList?: ListingReduxType[]) => {
  const [currentPage, setCurrentPage] = useState<number>(1); //todo: current page number, start page from 1
  const [postsPerPage] = useState<number>(10); //todo: dataItems / page

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;

  //todo: Thực hiện chia số lượng data trong 1 page
  const lisingPaginationData = dataLisitngList?.slice(
    indexOfFirstPost,
    indexOfLastPost
  );
  const paginationNumberClick = (page: number) => {
    setCurrentPage(page);
  };
  const previousPage = () => {
    let page = currentPage;
    page -= 1;
    setCurrentPage(page);
  };
  const nextPage = () => {
    let page = currentPage;
    page += 1;
    setCurrentPage(page);
  };

  return {
    currentPage,
    postsPerPage,
    lisingPaginationData,
    paginationNumberClick,
    previousPage,
    nextPage,
  };
};

export default useListingPagination;
