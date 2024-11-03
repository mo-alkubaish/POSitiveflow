export const addCustomer = (customers, setCustomers, customer) => {
    setCustomers([...customers, customer]);
    // Clear form handled in component after adding
};

// Additional functions related to customer operations can be added here later
