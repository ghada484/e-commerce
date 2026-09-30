import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const ProductsContext = createContext();

function ProductsProvider({ children }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await axios.get(
          "https://dummyjson.com/products?limit=100"
        );

        setProducts(response.data.products);
      } catch (err) {
        console.error("Products API Error:", err);

        setError(
          err.response?.data?.message ||
          err.message ||
          "Failed to load products."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <ProductsContext.Provider
      value={{
        products,
        loading,
        error,
      }}
    >
      {children}
    </ProductsContext.Provider>
  );
}

export function useProducts() {
  return useContext(ProductsContext);
}

export default ProductsProvider;

