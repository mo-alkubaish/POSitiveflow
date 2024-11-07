/**
 * Page Component
 * 
 * This is the main page component that serves as the wrapper for the entire layout.
 * It renders two key components: 
 * 1. **DraftsNavbar**: The navigation bar that typically handles the user's draft-related interactions
 *    and user profile settings (sign out, etc.). This is displayed at the top of the page.
 * 2. **Store**: The main content area that represents the store functionality, where users can view
 *    products, add items to the cart, and perform other related actions.
 * 
 * The layout is composed of these two parts:
 * - **DraftsNavbar** is placed at the top of the screen, providing navigation.
 * - **Store** is the main body content where users can interact with store items or products.
 * 
 * The Page component doesn't maintain its own state but simply serves as a layout container 
 * for organizing and rendering these two components.
 * 
 * Usage:
 * - Used within a larger app to provide the main interface where users interact with the store
 *   while navigating through drafts or user settings in the navbar.
 */
"use client";

import React, { useState } from 'react';
import Store from './store';          
import DraftsNavbar from './DraftsNavbar'; 


const Page = () => {
    const [draft, setDraft] = useState(1);
    return (
        <div>
            <DraftsNavbar selectedDraft={draft} setDraft={setDraft}/>
            <Store selectedDraft={draft}/>
        </div>
    );
};

export default Page;
