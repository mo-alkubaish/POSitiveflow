/**
 * Filters a list of customers based on a search term. Returns all customers if no search term is provided.
 * Matches are found if the search term is included in the customer's name, email, or phone number.
 *
 * @param {Array} customers - List of customer objects to search through.
 * @param {string} searchTerm - Term to search for in customer fields.
 * @returns {Array} - Filtered list of customers matching the search term.
 */



const searchCustomers = (customers, searchTerm) => {
    if (!searchTerm) return customers;
    return customers.filter(customer =>
      customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.phone.includes(searchTerm)
    );
  };
  
  export default searchCustomers;
  