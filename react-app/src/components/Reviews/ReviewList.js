import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getReviewsByBusinessId, deleteReview } from "../../store/review"
import ReviewForm from "./ReviewForm"
import { Modal } from "../context/Modal"

import './ReviewList.css'
import ReviewDelete from "./ReviewDelete"

const ReviewList = ({ businessId }) => {
    const dispatch = useDispatch()
    // const businessId = useParams().businessId
    const reviews = useSelector((state) => state.reviews)
    const user = useSelector((state) => state.session.user)
    const reviewsArr = Object.values(reviews)


    const [showEditModal, setShowEditModal] = useState(false)
    const [showDeleteModal, setShowDeleteModal] = useState(false)
    const [onClickId, setOnClickId] = useState(null)

    useEffect(() => {
        dispatch(getReviewsByBusinessId(businessId))
    }, [dispatch, businessId])

    const showCreateButton = () => {
        if (!user) return false
        if (!reviewsArr.length && user) return true
        if (reviewsArr.length) {
            if (!user?.id) return false
            for (let review of reviewsArr) {
                if (review?.userId == user?.id) return false
            }
        }
        return true
    }

    return (
        <div className="review-list-main">
            {showCreateButton() && (
                <button className="form-button"
                    onClick={() => { setShowEditModal(true) }}>
                    <i className="fa-regular fa-star"
                        style={{ WebkitTextStrokeColor: 'white' }} />
                    Write a review
                </button>
            )}
            <div className="rating-container"></div>
            {reviewsArr.length > 0 && (reviewsArr.map((review) => (
                <div className="review-card">
                    <div className="review-profile-container">
                        <div className="review-profile-container">
                            <div key={review?.id}>
                                <img className="review-profile-image"
                                    src={review?.user?.profileImage}
                                    alt='profile image'
                                    onError={e => { e.currentTarget.src = "https://st2.depositphotos.com/2805411/8085/i/450/depositphotos_80851650-stock-photo-sketch-design-of-coffee-shop.jpg" }}
                                />
                            </div>
                            <div className="review-profile-name">{review?.user?.firstName} {review?.user?.lastName[0]}.</div>
                        </div>
                        {user?.id == review?.userId && (
                            <div className="review-edit-button">
                                <i
                                    onClick={() => {
                                        setShowEditModal(true)
                                        setOnClickId(review?.id)
                                    }}
                                    className="fa-solid fa-pen-to-square"></i>

                                <div className="review-delete-button">
                                    <i className="fa-solid fa-trash"
                                        onClick={() => {
                                            setShowDeleteModal(true)
                                            setOnClickId(review?.id)
                                        }}>
                                    </i>
                                    {/* <i
                                        onClick={async () => {
                                            await dispatch(deleteReview(review?.id))
                                        }}
                                        className="fa-solid fa-trash"></i> */}
                                </div>
                            </div>
                        )}
                    </div>
                    <div className="stars-container">
                        {Array.apply(null, { length: Math.ceil(review?.stars) }).map((e, i) => (
                            <i key={i} className="fa-solid fa-star"></i>
                        ))}
                        {Array.apply(null, { length: Math.floor(5 - review?.stars) }).map((e, i) => (
                            <i key={i} className="fa-regular fa-star"></i>
                        ))}
                    </div>
                    <div className="review-content">{review?.review}</div>
                </div>
            )))}
            {showEditModal && (
                <Modal onClose={() => setShowEditModal(false)}>
                    <ReviewForm reviewId={onClickId} setShowEditModal={setShowEditModal} />
                </Modal>
            )}
            {showDeleteModal && (
                <Modal onClose={() => setShowDeleteModal(false)}>
                    <ReviewDelete reviewId={onClickId} setShowDeleteModal={setShowDeleteModal} />
                </Modal>
            )}
        </div>
    )
}
export default ReviewList
