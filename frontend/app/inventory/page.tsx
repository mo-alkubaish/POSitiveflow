/**
 * A React component that checks the current window location and navigates to a default child route if necessary.
 *
 * Upon mounting, this component checks if the current pathname in the window's location is `/inventory`. If it is, the component uses Next.js's `useRouter` hook to navigate programmatically to the `/inventory/suppliers` route. This ensures that users are not left at a potentially unhandled or index route under `/inventory`.
 *
 * This pattern is useful for redirecting from a base path to a more specific initial view, particularly in dashboard layouts or sections of an application that have multiple child routes but no default content for the parent route.
 *
 * The component currently returns an empty `<div>` element, as its primary function is to handle routing logic.
 *
 * Note: This component should be used in an environment where `window` and Next.js's router are available, as it relies on these for its operation.
 */


"use client";
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

const Page = () => {
  const [currentView, setCurrentView] = useState('suppliers');
  const router = useRouter();

  useEffect(() => {
    if (window.location.pathname === '/inventory') {
      router.push('/inventory/suppliers');
    }
  }, []);

  return ( <div> </div> );
};

export default Page;
