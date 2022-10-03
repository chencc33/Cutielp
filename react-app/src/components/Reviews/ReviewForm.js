import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useHistory, useParams } from "react-router-dom"
import { createReview, deleteReview, getReviewById, updateReview } from "../../store/review"

import { Rating } from 'react-simple-star-rating'
import './ReviewForm.css'

const ReviewForm = ({ reviewId, setShowModal }) => {
    const dispatch = useDispatch()
    const history = useHistory()
    const businessId = useParams().businessId
    const [targetReview, setTargetReview] = useState(null)
    const [review, setReview] = useState('')
    const [stars, setStars] = useState(0)


    const user = useSelector((state) => state.session.user)
    const userId = user?.id

    const [errors, setErrors] = useState([])
    const [hasSubmitted, setHasSubmitted] = useState(false)
    const [content, setContent] = useState("")

    const handleRating = (rate) => {
        setStars(rate)
    }

    useEffect(async () => {
        if (reviewId) {
            const foundReview = await dispatch(getReviewById(reviewId))

            setTargetReview(foundReview)

            setReview(foundReview.review)
            setStars(foundReview.stars * 20)
        } else {
            setReview('')
            setStars(0)
            setErrors([])
        }
    }, [dispatch, businessId, userId])


    useEffect(() => {
        let errs = []
        if (content.length < 6 || content.length > 1000) errs.push('error: Review needs to be between 6-1000.')
    }, [content])

    const handleSubmit = async (e) => {
        e.preventDefault()
        setHasSubmitted(true)

        let formData = {
            review, stars: stars / 20, businessId, userId
        }
        if (!targetReview && !errors.length) {
            let data = await dispatch(createReview(formData))
            if (Array.isArray(data)) {
                setErrors(data)
            }
        } else {
            await dispatch(createReview(formData))
            setShowModal(false)
        }
        if (targetReview && !errors.length) {
            let data = await dispatch(updateReview(formData, businessId, reviewId))
            if (Array.isArray(data)) {
                setErrors(data)
            } else {
                await dispatch(updateReview(formData, businessId, reviewId))
                setShowModal(false)
            }
        }
    }

    return (
        <div>
            <form onSubmit={handleSubmit} className="review-form">
                <div className="review-form-title">My Review</div>

                {hasSubmitted && errors.length > 0 && (<div className='errorContainer'>
                    {errors.map((error, ind) => (
                        <div key={ind} className='errorText'>{error.split(":")[1]}</div>
                    ))}
                </div>)}

                <div className="review-form-stars">
                    <Rating
                        onClick={handleRating}
                        ratingValue={stars}
                        transition />
                </div>
                <div className='review-form-fields'>
                    <textarea className='form-textarea' required
                        type='textarea' value={review} onChange={e => setReview(e.target.value)}></textarea>
                </div>
                <button className='form-submit-button' type='submit'>Submit</button>
                <button className='form-submit-button'
                    onClick={async () => {
                        await dispatch(deleteReview(reviewId))
                        history.push(`/businesses/${businessId}`)
                        setShowModal(false)
                    }}>Delete</button>
            </form>
        </div>
    )
}

export default ReviewForm
