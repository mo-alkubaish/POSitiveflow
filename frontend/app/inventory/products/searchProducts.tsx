/**
 * Filters an array of products based on a search term applied to product names and SKUs.
 * 
 * The function performs a case-insensitive match on the 'name' and 'sku' fields of each product.
 * If the search term is empty, it returns the original list of products without any filtering.
 *
 * @param {Array} products - The array of products to be filtered.
 * @param {string} searchTerm - The search term used to filter products.
 * @returns {Array} A filtered array of products that match the search term in the 'name' or 'sku' fields.
 */


const searchProducts = (products, searchTerm) => {
  if (!searchTerm) return products;
  return products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.sku.toLowerCase().includes(searchTerm.toLowerCase())
  );
};

export default searchProducts;
