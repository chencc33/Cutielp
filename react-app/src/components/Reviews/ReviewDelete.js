import { useDispatch } from "react-redux"
import { deleteReview } from "../../store/review"

function ReviewDelete({ reviewId, setShowDeleteModal }) {
    const dispatch = useDispatch()

    return (
        <div className="confirm-delete-modal">
            <div className="confirm-delete-title">Are you sure you want to delete this review?</div>
            <div className='confirm-delete-button-container'>
                <button className='confirm-delete-button'
                    onClick={async () => {
                        await dispatch(deleteReview(reviewId))
                        setShowDeleteModal(false)
                    }}>Yes</button>
                <button className='cancel-delete-button'
                    onClick={() => {
                        setShowDeleteModal(false)
                    }}>Cancel</button>
            </div>
        </div>
    )
}

export default ReviewDelete
