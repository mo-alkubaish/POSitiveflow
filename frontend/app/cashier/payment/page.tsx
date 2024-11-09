/**
 * App Component
 * 
 * This is the main component that combines the `DraftsNavbar` and `Payment` components 
 * to form the core layout of the application. It serves as a container where the 
 * navigation and payment functionalities are presented together.
 * 
 * Functionalities:
 * 1. **DraftsNavbar**: 
 *    - Displays a navigation bar, likely containing options or links for draft management.
 * 
 * 2. **Payment**: 
 *    - Renders the payment section, allowing users to complete their checkout process.
 * 
 * The `App` component is responsible for rendering these two components in a structured manner.
 * 
 * Usage:
 * - This component can be used to handle the main view for users who are in the process of
 *   completing a transaction or reviewing drafts.
 * 
 * Dependencies:
 * - **DraftsNavbar**: A component that likely manages the draft-related navigation.
 * - **Payment**: A component that handles the checkout and payment functionality.
 */


import React from 'react';
import DraftsNavbar from '../items/DraftsNavbar';
import Payment from '../checkout/payment';

function App() {
  return (
    <div>
      <DraftsNavbar />
      <Payment />
    </div>
  );
}

export default App;
