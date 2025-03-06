import './Component.css'
import Reviews from './Review'
import SubMainImages from './Submainimage'
import { useNavigate } from 'react-router-dom'
import { MdStarOutline } from "react-icons/md";

const DetailedImagedesc = ({ getCurrentElement }) => {
    const navigate = useNavigate()

    const { title, description, category, price, dimensions,
        availabilityStatus, discountPercentage, images,
        rating, returnPolicy, reviews,
        shippingInformation
        , stock, thumbnail, weight, warrantyInformation,
    } = getCurrentElement
    
  return (
    <div className='detailed-main-wrapper'>
    <div className='detailed-container'>
        <h3 className='card-description-text'>{title} : Description Details</h3>
        <div className='card-sections'>
            <div className='card-description'>

                <div className='card-images'>
                    <img src={thumbnail} alt={title} />
                </div>
                <div className='sub-images-description'>
                    {
                        images && images?.length > 0 ? images.map((subImage) => {
                            return ((<SubMainImages key={subImage} subImage={subImage} />))
                        }) : []
                    }
                </div>
            </div>
            <div className='product-decription-container'>
                <div className='availability-container'>
                    <section className={stock <= 20 ? "in-stock-danger" : "in-stock-good"}>{availabilityStatus}</section>
                    <section className='availability-status'> <span>stock left : </span> {stock}</section>
                </div>
                <div className='brand-description'>
                    <section className='brand-category'>Category :{category}</section>
                    <section className='brand-tags'>Rating :{rating}</section>
                </div>

                <div className='product-description'>
                    <section className='product-description-tag'>{description}</section>
                    <div className='product-measurements'>
                        <span className='measurements'>product-measurements</span>
                        <hr />
                        <section className='product-witdh'>product-witdh :{dimensions.width}</section>
                        <section className='product-height'>product-height :{dimensions.height}</section>
                        <section className='product-depth'>product-depth :{dimensions.depth}</section>
                    </div>
                </div>

                <div className='product-ratings-container'>
                <MdStarOutline  size={25}  style={{backgroundColor:"yellow"}} />
                    <MdStarOutline  size={25}  style={{backgroundColor:"yellow"}}/>
                    <MdStarOutline size={25}  style={{backgroundColor:"yellow"}}/>
                    <MdStarOutline size={25}  style={{backgroundColor:"yellow"}}/>
                    <span className='product-rating'>Rating : {rating}</span>
                </div>
            </div>
            <div className='policy-decription-container'>

                <div className='shopping-policy-container'>
                    <section className='shipping-policy'>Warranty :{warrantyInformation}</section>
                    <section className='shipping-policy'>Return policy :{returnPolicy}</section>
                    <section className='shipping-policy'>Shipping info :{shippingInformation}</section>
                    <section className='shipping-policy'>weight :{weight} </section>
                </div>
                <div className='product-cost-discount'>
                    <section className='product-cost'>Cost : $$ {price}</section>
                    <section className='product-discount'>Discount :{discountPercentage}%</section>
                </div>
                <div className='btn-container'>
                    <button className='btn' onClick={() => { navigate("/Cart") }}>Add to cart</button>
                    <button className='btn' onClick={() => { navigate("/products") }}>Back to shopping</button>
                    <button className='btn'>Buy now</button>
                </div>
            </div>
        </div>

    </div>
            <h2 style={{textAlign:"center"}}>Reviews</h2>
        <div className='reveiwes-containers'>
        {
          reviews && reviews?.length > 0 ? reviews.map((review, index) => {
                    return ((<Reviews key={index} review={review} />))
                }) : []
        }
        </div>
</div>
  )
}

export default DetailedImagedesc