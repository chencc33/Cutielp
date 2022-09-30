export const LOAD_REVIEWS = 'reviews/LOAD_REVIEWS';
export const LOAD_REVIEW = 'reviews/LOAD_REVIEW';
export const ADD_REVIEW = 'reviews/ADD_REVIEW';
export const UPDATE_REVIEW = 'reviews/UPDATE_REVIEW';
export const DELETE_REVIEW = 'reviews/DELETE_REVIEW';

// actions

const loadALL = reviews => ({
    type: LOAD_BUSINESSES,
    businesses
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
