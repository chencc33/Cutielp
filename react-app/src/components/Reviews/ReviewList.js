import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { getReviewsByBusinessId } from "../../store/review"
import ReviewForm from "./ReviewForm"
import { Modal } from "../context/Modal"

import './ReviewList.css'

const ReviewList = ({ businessId }) => {
    const dispatch = useDispatch()
    // const businessId = useParams().businessId
    const reviews = useSelector((state) => state.reviews)
    const user = useSelector((state) => state.session.user)
    const reviewsArr = Object.values(reviews)
    console.log('*********reviewsArr', reviewsArr)

    const [showModal, setShowModal] = useState(false)
    const [onClickId, setOnClickId] = useState(null)

    useEffect(() => {
        dispatch(getReviewsByBusinessId(businessId))
    }, [dispatch, businessId])

    const showCreateButton = () => {
        if (!reviewsArr.length) return true
        if (reviewsArr.length) {
            if (!user?.id) return false
            for (let review of reviewsArr) {
                if (review?.userId == user?.id) return false
            }
        }
        return true
    }

    if (!reviewsArr.length) return null
    return (
        <div className="review-list-main">
            {showCreateButton() && (
                <button className="form-button"
                    onClick={() => { setShowModal(true) }}>
                    <i className="fa-regular fa-star" />Write a review
                </button>
            )}
            <div className="rating-container"></div>
            {reviewsArr.map((review) => (
                <div className="review-card">
                    <div className="review-profile-container">
                        <span key={review.id}>
                            <img className="review-profile-image" src={review.user.profileImage} alt='profile image' />
                        </span>
                        <span className="review-profile-name">{review.user.firstName} {review.user.lastName[0]}.</span>
                    </div>
                    <div className="stars">
                        {Array.apply(null, { length: Math.ceil(review.stars) }).map((e, i) => (
                            <i className="fa-regular fa-star"></i>
                        ))}
                    </div>
                    <div className="review-content">{review.review}</div>
                    {user?.id == review.userId && (
                        <button
                            onClick={() => {
                                setShowModal(true)
                                setOnClickId(review.id)
                            }}
                        >Edit </button>
                    )}
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
