/**
 * Discounts component provides an interface for managing discounts. It includes:
 * - A list of discounts with options to update and delete individual entries.
 * - A form for adding new discounts, automatically assigning each a unique ID.
 * 
 * State is managed with useState, initializing discounts from a JSON file. The component
 * uses DiscountList to display existing discounts and DiscountForm to handle new entries.
 */

// Discounts.tsx
"use client";

import React, { useState, useEffect } from "react";
import { DiscountForm } from "./DiscountForm";
import { DiscountList } from "./DiscountList";
import discountsData from "../../data/discounts.json";
import { Discount } from "./Discount";
import DiscountListSkeleton from "./DiscountListSkeleton";
import DiscountFormSkeleton from "./DiscountFormSkeleton";

const Discounts = () => {
  const [discounts, setDiscounts] = useState<Discount[]>([]);
  const [isLoading, setIsLoading] = useState(true); // Add isLoading state

  useEffect(() => {
    // Simulate data fetching
    const timer = setTimeout(() => {
      setDiscounts(discountsData as Discount[]);
      setIsLoading(false);
    }, 2000); // 2 seconds delay

    return () => clearTimeout(timer);
  }, []);

  const addDiscount = (newDiscount) => {
    const discountWithId = { ...newDiscount, id: Date.now().toString() };
    setDiscounts([...discounts, discountWithId]);
  };

  const updateDiscount = (updatedDiscount) => {
    setDiscounts((prevDiscounts) =>
      prevDiscounts.map((discount) =>
        discount.id === updatedDiscount.id ? updatedDiscount : discount
      )
    );
  };

  const deleteDiscount = (discountToDelete) => {
    setDiscounts((prevDiscounts) =>
      prevDiscounts.filter((discount) => discount.id !== discountToDelete.id)
    );
  };

  return (
    <div className="container mx-auto p-6">
      {isLoading ? (
        <DiscountListSkeleton />
      ) : (
        <DiscountList
          discounts={discounts}
          updateDiscount={updateDiscount}
          deleteDiscount={deleteDiscount}
        />
      )}
      {isLoading ? (
        <DiscountFormSkeleton />
      ) : (
        <DiscountForm addDiscount={addDiscount} />
      )}
    </div>
  );
};

export default Discounts;
