export const LOAD_REVIEWS = 'reviews/LOAD_REVIEWS';
export const LOAD_REVIEW = 'reviews/LOAD_REVIEW';
export const ADD_REVIEW = 'reviews/ADD_REVIEW';
export const UPDATE_REVIEW = 'reviews/UPDATE_REVIEW';
export const DELETE_REVIEW = 'reviews/DELETE_REVIEW';

// actions

const loadALL = reviews => ({
    type: LOAD_REVIEWS,
    reviews
})
const loadOne = review => ({
    type: LOAD_REVIEW,
    review
})
const add = review => ({
    type: ADD_REVIEW,
    review
})
const update = review => ({
    type: UPDATE_REVIEW,
    review
})
const remove = reviewId => ({
    type: DELETE_REVIEW,
    reviewId
})

// thunks
export const getReviewsByUser = () => async dispatch => {
    const response = await fetch(`/api/reviews`)
    if (response.ok) {
        const reviews = await response.json()
        dispatch(loadALL(reviews))
        return reviews
    }
}

export const getReviewById = (reviewId) => async dispatch => {
    const response = await fetch(`/api/reviews/${reviewId}`)
    if (response.ok) {
        const review = await response.json()
        dispatch(loadOne(review))
        return review
    }
}

export const getReviewsByBusinessId = (businessId) => async dispatch => {
    const response = await fetch(`/api/businesses/${businessId.businessId}/reviews`)
    if (response.ok) {
        const reviews = await response.json()
        dispatch(loadALL(reviews))
        return reviews
    }
}

export const createReview = formData => async dispatch => {
    const response = await fetch(`/api/businesses/${formData.businessId}/reviews`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
    })
    const data = await response.json()
    if (response.ok) {
        dispatch(add(data))
        return null
    }
    if (data.errors.length) {
        return data.errors
    }
}

export const updateReview = (data, businessId, reviewId) => async dispatch => {
    const response = await fetch(`/api/businesses/${businessId}/reviews/${reviewId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    })
    const resBody = await response.json()
    if (response.ok) {
        dispatch(update(resBody))
        return null
    }
    if (data.errors.length) {
        return data.errors
    }
}

export const deleteReview = reviewId => async dispatch => {
    const response = await fetch(`/api/reviews/${reviewId}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' }
    })
    if (response.ok) {
        dispatch(remove(reviewId))
    }
}

//reducer
const initialState = {}
const reviewsReducer = (state = initialState, action) => {
    let newState = {}
    switch (action.type) {
        case LOAD_REVIEWS:
            newState = { ...action.reviews }
            return newState
        case LOAD_REVIEW:
            newState = { ...state }
            newState[action.review.id] = action.review
            return newState
        case ADD_REVIEW:
            newState = { ...state }
            newState[action.review.id] = action.review
            return newState
        case UPDATE_REVIEW:
            newState = { ...state }
            newState[action.review.id] = action.review
            return newState
        case DELETE_REVIEW:
            newState = { ...state }
            delete newState[action.reviewId]
            return newState
        default:
            return state
    }
}

export default reviewsReducer
