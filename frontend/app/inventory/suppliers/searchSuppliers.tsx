// simmilar to product file


const searchSuppliers = (suppliers, searchTerm) => {
  if (!searchTerm) return suppliers;
  return suppliers.filter(supplier =>
    supplier.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    supplier.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    supplier.phone.includes(searchTerm)
  );
};

export default searchSuppliers;
