const LOAD_USER = 'session/LOAD_USER';
const EDIT_USER = 'session/EDIT_USER';

const loadUser = (user) => ({
    type: LOAD_USER,
    user
})

const update = user => ({
    type: EDIT_USER,
    user: user
})

export const getUser = (userId) => async dispatch => {
    const response = await fetch(`/api/users/${userId}`)
    if (response.ok) {
        const user = await response.json()
        dispatch(loadUser(user))
        return user
    }
}

export const updateUser = (data, userId) => async dispatch => {
    const response = await fetch(`/api/users/${userId}`, {
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

const initialState = {}
const profileReducer = (state = initialState, action) => {
    let newState = {}
    switch (action.type) {
        case LOAD_USER:
            newState = { ...state }
            newState.profile = action.profile
            return newState
        case EDIT_USER:
            newState = { ...state }
            newState.profile = action.profile
            return newState
        default:
            return state;
    }
}

export default profileReducer
