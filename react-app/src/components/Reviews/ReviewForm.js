import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useHistory, useParams } from "react-router-dom"
import { createReview, deleteReview, getReviewById, updateReview } from "../../store/review"

import { Rating } from 'react-simple-star-rating'

const ReviewForm = ({ reviewId, setShowModal }) => {
    const dispatch = useDispatch()
    const history = useHistory()
    const businessId = useParams().businessId
    const [targetReview, setTargetReview] = useState(null)
    const [review, setReview] = useState('')
    const [stars, setStars] = useState(0)


    const user = useSelector((state) => state.session.user)
    const userId = user?.id

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
        }
    }, [dispatch, businessId, userId])

    // const ratingChanged = (newRating) => {
    //     console.log(newRating)
    // }

    const handleSubmit = async (e) => {
        e.preventDefault()
        let formData = {
            review, stars: stars / 20, businessId, userId
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
                <Rating onClick={handleRating}
                    ratingValue={stars}
                    transition />
                {/* <div className='form-fields'>
                    <label className='form-labels'>Stars</label>
                    <input type='number' value={stars} onChange={e => setStars(e.target.value)}></input>
                </div> */}
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
