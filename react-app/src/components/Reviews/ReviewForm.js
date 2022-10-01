import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useHistory, useParams } from "react-router-dom"
import { createReview, deleteReview, getReviewById, updateReview } from "../../store/review"
import StarsRating from 'stars-rating'
import React from 'react'
import { render } from 'react-dom'

const ReviewForm = ({ reviewId, setShowModal }) => {
    const dispatch = useDispatch()
    const history = useHistory()
    const businessId = useParams().businessId
    const [targetReview, setTargetReview] = useState(null)
    const [review, setReview] = useState('')
    const [stars, setStars] = useState(0)
    // const [userId, setUserId] = useState(userId || 0)
    // const [businessId, setBusinessId] = useState(businessId || 0)

    const user = useSelector((state) => state.session.user)
    const userId = user?.id

    useEffect(async () => {
        if (reviewId) {
            const foundReview = await dispatch(getReviewById(reviewId))

            setTargetReview(foundReview)

            setReview(foundReview.review)
            setStars(foundReview.stars)
        } else {
            setReview('')
            setStars(0)
        }
    }, [dispatch, businessId, userId])

    // const ratingChanged = (newRating) => {
    //     console.log(newRating)
    // }

    const handleSubmit = async (e) => {
        e.preventDefault()
        let formData = {
            review, stars, businessId, userId
        }
        if (!targetReview) {
            await dispatch(createReview(formData))
            setShowModal(false)
        } else {
            await dispatch(updateReview(formData, businessId, reviewId))
            setShowModal(false)
        }
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div className='form-fields'>
                    <label className='form-labels'>Review</label>
                    <input type='text' value={review} onChange={e => setReview(e.target.value)}></input>
                </div>
                {/* <StarsRating
                    onChange={ratingChanged}
                    ratingValue={stars}
                    count={5}
                    size={20}
                    transition
                    fillColor="gold"
                    allowHover={false}
                    emptyColor="gray"
                /> */}
                <div className='form-fields'>
                    <label className='form-labels'>Stars</label>
                    <input type='number' value={stars} onChange={e => setStars(e.target.value)}></input>
                </div>
                <button className='form-submit-button' type='submit'>Submit</button>
                <button className='form-submit-button'
                    onClick={async () => {
                        await dispatch(deleteReview(reviewId))
                        history.push(`/businesses/${businessId}`)
                    }}>Delete</button>
            </form>
        </div>
    )
}

export default ReviewForm
