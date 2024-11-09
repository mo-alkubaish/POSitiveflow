const searchProducts = (products, searchTerm) => {
  if (!searchTerm) return products;
  return products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.sku.toLowerCase().includes(searchTerm.toLowerCase())
  );
};

export default searchProducts;
