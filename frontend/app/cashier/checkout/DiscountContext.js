/**
 * DiscountContext provides a context for managing a discount value across the application.
 * 
 * Hooks:
 * - `useDiscount`: Custom hook to access the current discount and setDiscount function from the context.
 * 
 * Provider:
 * - `DiscountProvider`: Wraps part of the application tree, allowing descendant components to access and update the discount value.
 * 
 * State:
 * - `discount`: Holds the current discount value as a number.
 * - `setDiscount`: Function to update the discount value, enabling dynamic changes based on user actions or application logic.
 * 
 * Usage:
 * - Wrap the application or specific component tree with `DiscountProvider` to enable access to discount functionality.
 * - Use `useDiscount` in child components to read or update the discount.
 * 
 * This context simplifies the management of a shared discount state, allowing seamless integration of discounts across various components.
 */


import { type } from 'os';
import React, { createContext, useContext, useState } from 'react';

const DiscountContext = createContext();

export const useDiscount = () => useContext(DiscountContext);

export const DiscountProvider = ({ children }) => {
    const [discount, setDiscount] = useState(0);

    return (
        <DiscountContext.Provider value={{ discount, setDiscount }}>
            {children}
        </DiscountContext.Provider>
    );
};
