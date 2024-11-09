
"use client";
import React, { useState } from 'react';
import SupplierManagement from '/Users/abdullah/Documents/GitHub/POSitiveflow/frontend/app/inventory/suppliers/page';
import ProductManagement from '/Users/abdullah/Documents/GitHub/POSitiveflow/frontend/app/inventory/products/page';


const Page = () => {
  const [currentView, setCurrentView] = useState('suppliers');

  return (
    <div className="container mx-auto p-6">
      {currentView === 'suppliers' ? (
        <SupplierManagement />
      ) : (
        <ProductManagement />
      )}
    </div>
  );
};

export default Page;
