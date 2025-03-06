import { useNavigate } from 'react-router-dom'
const Productitem = ({ singleproduct }) => {
    const navigate = useNavigate()
    const { title, price, thumbnail, availabilityStatus, stock ,id} = singleproduct

    const handleSingleProductId = (curentElementId) => {
        navigate(`/productsdetails/${curentElementId}`)
    }
  return (
    <div className='product-container'>
            <div className={stock < 15 ? "in-stock-danger" : "in-stock-good"}>{availabilityStatus} : {stock}</div>
            <div className='product-image'>
                <img src={thumbnail} />
            </div>
            <div className='product-details'>
                <h3 className='text-description' >{title}</h3>
                <h3 className='price-description' >$ {price}</h3>
            </div>
            <div className='btn-container'>
                <button className='btn view-details' onClick={()=>{handleSingleProductId(id)}} >view details</button>
                <button className='btn Add-to-cart'  onClick={() => { navigate("/Cart") }} >Add to cart</button>
            </div>
        </div>
  )
}

export default Productitem