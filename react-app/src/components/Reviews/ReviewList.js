import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { getReviewsByBusinessId } from "../../store/review"
import ReviewForm from "./ReviewForm"
import { Modal } from "../context/Modal"

import './ReviewList.css'

const ReviewList = () => {
    const dispatch = useDispatch()
    const businessId = useParams()
    const reviews = useSelector((state) => state.reviews)
    const reviewsArr = Object.values(reviews)
    // console.log('*********review', reviewsArr)

    const [showModal, setShowModal] = useState(false)
    const [onClickId, setOnClickId] = useState(null)

    useEffect(() => {
        dispatch(getReviewsByBusinessId(businessId))
    }, [dispatch, businessId])

    if (!reviewsArr.length) return null
    return (
        <div className="review-list-main">
            <div className="rating-container"></div>
            {reviewsArr.map((review) => (
                <div className="review-card" key={review.id}>
                    <div className="review-profile-container">
                        <span>
                            <img className="review-profile-image" src={review.user.profileImage} alt='profile image' />
                        </span>
                        <span className="review-profile-name">{review.user.firstName} {review.user.lastName[0]}.</span>
                    </div>
                    <div className="review-content">{review.review}</div>
                    <div className="reivew-stars">Stars{review.stars}</div>
                    <button
                        onClick={() => {
                            setShowModal(true)
                            setOnClickId(review.id)
                        }}
                    >Edit </button>
                </div>
            ))}
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <ReviewForm reviewId={onClickId} setShowModal={setShowModal} />
                </Modal>
            )}
        </div>
    )
}
export default ReviewList
