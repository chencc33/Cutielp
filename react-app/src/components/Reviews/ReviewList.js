import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { getReviewsByBusinessId } from "../../store/review"

const ReviewList = () => {
    const dispatch = useDispatch()
    const businessId = useParams()
    const reviews = useSelector((state) => state.reviews)
    const reviewsArr = Object.values(reviews)

    useEffect(() => {
        dispatch(getReviewsByBusinessId(businessId))
    }, [dispatch, businessId])

    if (!reviewsArr.length) return null
    return (
        <div>
            {reviewsArr.map((review) => (
                <>
                    <div>{review.review}</div>
                    <div>Stars{review.stars}</div>
                    <button>Edit </button>
                </>
            ))}
        </div>
    )
}
export default ReviewList
