import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { getReviewsByBusinessId } from "../../store/review"
import ReviewForm from "./ReviewForm"

const ReviewList = () => {
    const dispatch = useDispatch()
    const businessId = useParams()
    const reviews = useSelector((state) => state.reviews)
    const reviewsArr = Object.values(reviews)

    const [showForm, setShowForm] = useState(false)
    const [onClickId, setOnClickId] = useState(null)

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
                    <button
                        onClick={() => {
                            setShowForm(true)
                            setOnClickId(review.id)
                        }}
                    >Edit </button>
                </>
            ))}
            {showForm && (<ReviewForm reviewId={onClickId} />)}
        </div>
    )
}
export default ReviewList
