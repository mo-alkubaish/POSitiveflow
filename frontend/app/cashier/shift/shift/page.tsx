/**
 * Page component serves as a wrapper for the ShiftReconciliation component.
 * 
 * Features:
 * - Loads the "Poppins" font for consistent styling across text elements.
 * - Embeds the `ShiftReconciliation` component to display the shift reconciliation interface.
 * 
 * This component acts as a single page layout, providing a clean container for the ShiftReconciliation module.
 */


import React from 'react';
import ShiftReconciliation from './ShiftReconciliation'; 

const Page = () => {
  return (
    <div>
       <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap" rel="stylesheet" />
      <ShiftReconciliation />
    </div>
  );
}

export default Page;
