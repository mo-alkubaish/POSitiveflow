// simmilar to product file


import { useState } from 'react';

function usePagination(totalItems: number, itemsPerPage: number) {
  const [currentPage, setCurrentPage] = useState(1);
  
  const totalPages = Math.max(1, Math.ceil(totalItems / itemsPerPage)); 
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  function changePage(pageNumber: number) {
    setCurrentPage(pageNumber);
  }

  return { currentPage, totalPages, changePage, indexOfFirstItem, indexOfLastItem };
}

export default usePagination;
