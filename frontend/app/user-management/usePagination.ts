/**
 * usePagination hook provides pagination logic for managing paginated data in a component.
 * 
 * @param {number} totalItems - The total number of items to paginate.
 * @param {number} itemsPerPage - Number of items to display per page.
 * @returns {Object} - Returns pagination details and functions:
 *    - `currentPage`: The currently active page.
 *    - `totalPages`: Total number of pages based on items and items per page.
 *    - `indexOfFirstItem`: The index of the first item on the current page.
 *    - `indexOfLastItem`: The index of the last item on the current page.
 *    - `changePage`: Function to update the current page within valid page bounds.
 * 
 * This hook enables easy integration of pagination controls and dynamic page data management.
 */

import { useState } from 'react';

const usePagination = (totalItems: number, itemsPerPage: number) => {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  const changePage = (pageNumber: number) => {
    if (pageNumber > 0 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  return {
    currentPage,
    totalPages,
    indexOfFirstItem,
    indexOfLastItem,
    changePage,
  };
};

export default usePagination;
