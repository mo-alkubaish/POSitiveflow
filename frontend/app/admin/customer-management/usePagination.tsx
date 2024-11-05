/**
 * Custom hook to handle pagination logic. Calculates page indices and provides a function to change pages.
 * 
 * @param {number} totalItems - Total number of items to paginate.
 * @param {number} itemsPerPage - Number of items per page.
 * @returns {Object} - Contains currentPage, totalPages, changePage function, indexOfFirstItem, and indexOfLastItem.
 */


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
