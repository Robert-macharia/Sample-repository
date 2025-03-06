import React, { useContext } from 'react'
import './Product.css'
import { ShoppingcartContext } from '../../Contextprovider/Myshoppingprovider'
import Productitem from '../../Components/Productitem'
import Loadingcontainer from '../../Components/Loadingcontainer'
const Product = () => {
    const { loading, error, products } = useContext(ShoppingcartContext)
    if (loading) {
      return <Loadingcontainer/>
    }
    if (error) {
      return <h2>Error while fetching products</h2>
    }
  
    return (
      <div className='main-wrapper'>
        <div className='product-wrapper'>
            {
              products && products?.length > 0 ?(
                products.map((singleproduct)=>{
                  return <Productitem key={singleproduct.id} singleproduct={singleproduct}/>
                })
              ) : (<h2>No products found</h2>)
            }
        </div>
      </div>
    )
}

export default Product