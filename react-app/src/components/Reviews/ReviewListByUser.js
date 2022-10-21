import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { getReviewsByUser } from "../../store/review"
import ReviewForm from "./ReviewForm"
import { Modal } from "../context/Modal"

import './ReviewList.css'
import NavBar from "../Navigation/NavBar"

const ReviewListByUser = () => {
    const dispatch = useDispatch()
    // const businessId = useParams().businessId
    const reviews = useSelector((state) => state.reviews)
    const user = useSelector((state) => state.session.user)
    const reviewsArr = Object.values(reviews)
    // console.log('*********reviewsArr', typeof reviewsArr)

    const [showModal, setShowModal] = useState(false)
    const [onClickId, setOnClickId] = useState(null)

    useEffect(() => {
        dispatch(getReviewsByUser())
    }, [dispatch])

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
        <>
            <NavBar />
            <div className="review-list-main"
                style={{ marginLeft: '50px' }}>
                {showCreateButton() && (
                    <button className="form-button"
                        onClick={() => { setShowModal(true) }}>
                        <i className="fa-regular fa-star" />Write a review
                    </button>
                )}
                <div className="rating-container"></div>
                {reviewsArr.map((review) => (
                    <div className="review-card" key={review.id}>
                        <div className="review-profile-container"
                            style={{ justifyContent: 'flex-start' }}>
                            <div >
                                <img className="review-profile-image" src={review.user.profileImage} alt='profile image' />
                            </div>
                            <div className="review-profile-name">{review.user.firstName} {review.user.lastName[0]}.</div>
                        </div>
                        {user?.id == review.userId && (
                            <div className="review-edit-button"
                                onClick={() => {
                                    setShowModal(true)
                                    setOnClickId(review.id)
                                }}>
                                <i className="fa-solid fa-pen-to-square"></i>
                            </div>
                        )}
                        <div className="review-business-name">Business: {review.businessName}</div>
                        <div className="stars-container">
                            {Array.apply(null, { length: Math.ceil(review.stars) }).map((e, i) => (
                                <i className="fa-solid fa-star"></i>
                            ))}
                            {Array.apply(null, { length: Math.floor(5 - review.stars) }).map((e, i) => (
                                <i className="fa-regular fa-star"></i>
                            ))}
                        </div>
                        <div className="review-content">{review.review}</div>
                    </div>
                ))}
                {showModal && (
                    <Modal onClose={() => setShowModal(false)}>
                        <ReviewForm reviewId={onClickId} setShowModal={setShowModal} />
                    </Modal>
                )}
            </div>
        </>
    )
}
export default ReviewListByUser
