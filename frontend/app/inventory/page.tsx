"use client";
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

const Page = () => {
  const [currentView, setCurrentView] = useState('suppliers');
  const router = useRouter();

  useEffect(() => {
    // Check if current path is inventory
    if (window.location.pathname === '/inventory') {
      router.push('/inventory/products');
    }
  }, []);

  return ( <div> </div> );
};

export default Page;
