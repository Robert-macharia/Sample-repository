import { createContext, useEffect, useState } from "react";

export const ShoppingcartContext = createContext();
const Myshoppingprovider = ({ children }) => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [products, setproducts] = useState([]);
    const [getCurrentElement, setCurrentElement] = useState(null);


    useEffect(() => {
        const controller = new AbortController();
        const signal = controller.signal;

        const fetchProducts = async () => {
            try {
                const response = await fetch("https://dummyjson.com/products", {
                    signal,
                });
                if (!response.ok) {
                    throw new Error("Network error");
                }
                const { products: productsList } = await response.json();
                productsList && productsList?.length > 0
                    ? setproducts(productsList)
                    : setproducts([]);
                setLoading(false);
            } catch (error) {
                if (error.name !== "AbortError") {
                    setError(error.message);
                    console.error(error.message + "error");
                }
                setLoading(false);
            }
        };
        fetchProducts();
        return () => {
            controller.abort();
        };
    }, []);

    return (
        <ShoppingcartContext.Provider
            value={
                {
                    loading,
                    error,
                    products,
                    getCurrentElement, 
                    setLoading,
                    setError,
                    setCurrentElement,
                }
            }
        >
            {children}
        </ShoppingcartContext.Provider>
    );
}

export default Myshoppingprovider