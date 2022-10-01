import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { createReview, getReviewById, updateReview } from "../../store/review"

const ReviewForm = ({ reviewId }) => {
    const dispatch = useDispatch()
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

    const handleSubmit = async (e) => {
        e.preventDefault()
        let formData = {
            review, stars, businessId, userId
        }
        if (!targetReview) {
            await dispatch(createReview(formData))
        } else {
            await dispatch(updateReview(formData, businessId, reviewId))
        }
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div className='form-fields'>
                    <label className='form-labels'>Review</label>
                    <input type='text' value={review} onChange={e => setReview(e.target.value)}></input>
                </div>
                <div className='form-fields'>
                    <label className='form-labels'>Stars</label>
                    <input type='number' value={stars} onChange={e => setStars(e.target.value)}></input>
                </div>
                <button className='form-submit-button' type='submit'>Submit</button>
                <button className='form-submit-button'>Delete</button>
            </form>
        </div>
    )
}

export default ReviewForm
