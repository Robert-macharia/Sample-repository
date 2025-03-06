import { MdStarOutline } from "react-icons/md";

const Review = ({ review }) => {
    return (
        <div className='products-reviews-container'>
                <span className="product-profile-name">
                            {review.reviewerName}
                        </span>
            <div className='product-reviews'>

                <div className="email-address">
                   <a href="#"> {review.reviewerEmail}</a>
                </div>
                <div className="reviwer-rating-container">
                    <MdStarOutline size={25}  style={{backgroundColor:"yellow"}} />
                    <MdStarOutline size={25}  style={{backgroundColor:"yellow"}}/>
                    <MdStarOutline size={25}  style={{backgroundColor:"yellow"}}/>
                    <MdStarOutline size={25}  style={{backgroundColor:"yellow"}}/>
                    <span>Rating :{review.rating}</span>
                    <span>{review.date}</span>
                </div>
                <div className="reviwer-comment-container">
                    <span>{review.comment}</span>
                    <div className='review-date'>
                </div>
                </div>

            </div>
        </div>
    )
}

export default Review