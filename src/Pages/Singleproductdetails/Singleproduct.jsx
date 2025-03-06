import React, { useContext, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { ShoppingcartContext } from '../../Contextprovider/Myshoppingprovider'
import DetailedImagedesc from '../../Components/DetailedImagedesc'
import Loadingcontainer from '../../Components/Loadingcontainer'

const Singleproduct = () => {
  const { id } = useParams()
  const { loading, error, getCurrentElement, setLoading, setError, setCurrentElement } = useContext(ShoppingcartContext)

  if (loading) {
    return <Loadingcontainer />
  }
  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    const fetchSingleProductDetails = async () => {
      try {
        const response = await fetch(`https://dummyjson.com/products/${id}`, { signal });
        if (!response.ok) {
          throw new Error("Network error");
        }
        const singleproductdetails = await response.json();
        singleproductdetails ? setCurrentElement(singleproductdetails) : setCurrentElement([]);
        setLoading(false);
      } catch (error) {
        if (error.name !== "AbortError") {
          setError(error.message);
          console.error(error.message);
        }
        setLoading(false);
      }
    };

    fetchSingleProductDetails();
    return () => {
      controller.abort();
    };
  }, [id]);
  { { getCurrentElement } }

  if (loading) {
    return <Loadingcontainer />
  }
  if (error) {
    return <h4>{error}</h4>
  }
  return (
    <>

      {
        getCurrentElement ? (<DetailedImagedesc getCurrentElement={getCurrentElement} />)
          : []
      }
    </>
  )
}

export default Singleproduct