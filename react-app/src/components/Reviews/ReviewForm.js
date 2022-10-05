import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useHistory, useParams } from "react-router-dom"
import { createReview, deleteReview, getReviewById, getReviewsByBusinessId, updateReview } from "../../store/review"

import './ReviewForm.css'

const ReviewForm = ({ reviewId, setShowEditModal }) => {
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

    useEffect(async () => {
        if (reviewId) {
            const foundReview = await dispatch(getReviewById(reviewId))

            setTargetReview(foundReview)

            setReview(foundReview?.review)
            setStars(foundReview?.stars)
        } else {
            setReview('')
            setStars(0)
            setErrors([])
        }
    }, [dispatch, businessId, userId])


    useEffect(() => {
        let errs = []
        if (!stars) errs.push('error: Star is required.!!!')
        if (review?.length < 6 || review?.length > 1000) errs.push('error: Review needs to be between 6-1000 characters.')
        setErrors(errs)
    }, [review, stars])

    const handleSubmit = async (e) => {
        e.preventDefault()
        setHasSubmitted(true)

        let formData = {
            review, stars, businessId, userId
        }

        if (!targetReview && !errors.length) {
            // let data = await dispatch(createReview(formData))
            // if (Array.isArray(data)) {
            //     setErrors(data)
            // } else {
            //     await dispatch(createReview(formData))
            //     setShowModal(false)
            // }
            await dispatch(createReview(formData))
            setShowEditModal(false)
        }
        if (targetReview && !errors.length) {
            let data = await dispatch(updateReview(formData, businessId, reviewId))
            if (Array.isArray(data)) {
                setErrors(data)
            } else {
                await dispatch(updateReview(formData, businessId, reviewId))
                setShowEditModal(false)
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
                    <span
                        onClick={() => { setStars(1) }}>
                        <i className="fa-solid fa-star review-star star1"
                            style={{ color: stars >= 1 ? 'gold' : 'lightgray' }} />
                    </span>
                    <span
                        onClick={() => { setStars(2) }}>
                        <i className="fa-solid fa-star review-star star2"
                            style={{ color: stars >= 2 ? 'gold' : 'lightgray' }} />
                    </span>
                    <span
                        onClick={() => { setStars(3) }}>
                        <i className="fa-solid fa-star review-star star3"
                            style={{ color: stars >= 3 ? 'gold' : 'lightgray' }}></i>
                    </span>
                    <span
                        onClick={() => { setStars(4) }}>
                        <i className="fa-solid fa-star review-star star4"
                            style={{ color: stars >= 4 ? 'gold' : 'lightgray' }}></i>
                    </span>
                    <span
                        onClick={() => { setStars(5) }}>
                        <i className="fa-solid fa-star review-star star5"
                            style={{ color: stars >= 5 ? 'gold' : 'lightgray' }}></i>
                    </span>
                </div>
                <div className='review-form-fields'>
                    <textarea className='form-textarea' required
                        type='textarea'
                        value={review} onChange={e => setReview(e.target.value)}
                        placeholder='The decor was unique and incredible. Everything was simply decadent. Try out the huge selection of incredible appetizers. They got a new customer for life!'
                    ></textarea>
                </div>
                <button className='form-submit-button' type='submit'>Submit</button>
                {/* <button className='form-submit-button'
                    onClick={async () => {
                        await dispatch(deleteReview(reviewId))
                        // await dispatch(getReviewsByBusinessId(businessId))
                        // history.push(`/businesses/${businessId}`)
                        setShowModal(false)
                    }}>Delete</button> */}
            </form>
        </div>
    )
}

export default ReviewForm
