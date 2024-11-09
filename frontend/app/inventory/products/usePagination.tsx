/**
 * Provides pagination logic for lists of items.
 *
 * This custom React hook calculates and manages the pagination states including:
 * - Current page
 * - Total pages
 * - Indexes of the first and last items on the current page
 * 
 * It initializes with the first page loaded and provides a method to change the current page.
 * The number of total pages ensures there's always at least one page.
 *
 * @param {number} totalItems - The total number of items in the full list.
 * @param {number} itemsPerPage - The number of items to display per page.
 * @returns {object} An object containing:
 *   - currentPage: The current active page.
 *   - totalPages: Total number of pages based on the items and items per page.
 *   - changePage: Function to update the current page.
 *   - indexOfFirstItem: The index of the first item on the current page.
 *   - indexOfLastItem: The index of the last item on the current page.
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
