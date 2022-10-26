export const LOAD_BUSINESSES = 'businesses/LOAD_BUSINESSES';
export const LOAD_BUSINESS = 'businesses/LOAD_BUSINESS';
export const ADD_BUSINESS = 'businesses/ADD_BUSINESS';
export const UPDATE_BUSINESS = 'businesses/UPDATE_BUSINESS';
export const DELETE_BUSINESS = 'businesses/DELETE_BUSINESS';

// actions

const loadALL = businesses => ({
    type: LOAD_BUSINESSES,
    businesses
})
const loadOne = business => ({
    type: LOAD_BUSINESS,
    business
})
const add = business => ({
    type: ADD_BUSINESS,
    business
})
const update = business => ({
    type: UPDATE_BUSINESS,
    business
})
const remove = businessId => ({
    type: DELETE_BUSINESS,
    businessId
})

// thunks
export const getBusinesses = () => async dispatch => {
    const response = await fetch(`/api/businesses`)

    if (response.ok) {
        const businesses = await response.json()
        dispatch(loadALL(businesses))
        return businesses
    }
}
export const getBusinessByCategoryId = (categoryId) => async dispatch => {
    const response = await fetch(`/api/categories/${categoryId}/businesses`)
    if (response.ok) {
        const businesses = await response.json()
        dispatch(loadALL(businesses))
        return businesses
    }
}

export const getBusinessesByUser = () => async dispatch => {
    const response = await fetch(`/api/businesses/current`)
    if (response.ok) {
        const businesses = await response.json()
        dispatch(loadALL(businesses))
        return businesses
    }
}
export const getBusinessById = (businessId) => async dispatch => {
    const response = await fetch(`/api/businesses/${businessId}`)
    if (response.ok) {
        const business = await response.json()
        dispatch(loadOne(business))
        return business
    }
}
export const createBusiness = formData => async dispatch => {
    const response = await fetch(`/api/businesses`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
    })
    const data = await response.json()
    if (response.ok) {
        dispatch(add(data))
        return data
    }
    if (data.errors.length) {
        return data.errors
    }
}
export const updateBusiness = (data, businessId) => async dispatch => {
    const response = await fetch(`/api/businesses/${businessId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    })
    const resBody = await response.json()
    if (response.ok) {
        dispatch(update(resBody))
        return null
    }
    if (resBody.errors.length) {
        return resBody.errors
    }
}
export const deleteBusiness = businessId => async dispatch => {
    const response = await fetch(`/api/businesses/${businessId}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' }
    })
    if (response.ok) {
        dispatch(remove(businessId))
    }
}


// reducer
const initialState = {}
const businessesReducer = (state = initialState, action) => {
    let newState = {}
    switch (action.type) {
        case LOAD_BUSINESSES:
            newState = { ...action.businesses }
            return newState
        case LOAD_BUSINESS:
            newState = { ...state }
            newState[action.business.id] = action.business
            return newState
        case ADD_BUSINESS:
            newState = { ...state }
            newState[action.business.id] = action.business
            return newState
        case UPDATE_BUSINESS:
            newState = { ...state }
            newState[action.business.id] = action.business
            return newState
        case DELETE_BUSINESS:
            newState = { ...state }
            delete newState[action.businessId]
            return newState
        default:
            return state
    }
}

export default businessesReducer
