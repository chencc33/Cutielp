// constants
const SET_USER = 'session/SET_USER';
const LOAD_USER = 'session/LOAD_USER'
const REMOVE_USER = 'session/REMOVE_USER';
const EDIT_USER = 'session/EDIT_USER';

const setUser = (user) => ({
  type: SET_USER,
  payload: user
});

const loadUser = (user) => ({
  type: LOAD_USER,
  user
})

const removeUser = () => ({
  type: REMOVE_USER,
})

const update = user => ({
  type: EDIT_USER,
  user
})

const initialState = { user: null };

export const authenticate = () => async (dispatch) => {
  const response = await fetch('/api/auth/', {
    headers: {
      'Content-Type': 'application/json'
    }
  });
  if (response.ok) {
    const data = await response.json();
    if (data.errors) {
      return;
    }

    dispatch(setUser(data));
  }
}

export const login = (email, password) => async (dispatch) => {
  const response = await fetch('/api/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      email,
      password
    })
  });


  if (response.ok) {
    const data = await response.json();
    dispatch(setUser(data))
    return null;
  } else if (response.status < 500) {
    const data = await response.json();
    if (data.errors) {
      return data.errors;
    }
  } else {
    return ['An error occurred. Please try again.']
  }

}

export const logout = () => async (dispatch) => {
  const response = await fetch('/api/auth/logout', {
    headers: {
      'Content-Type': 'application/json',
    }
  });

  if (response.ok) {
    dispatch(removeUser());
  }
};


export const signUp = (firstName, lastName, email, password) => async (dispatch) => {
  const response = await fetch('/api/auth/signup', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      firstName,
      lastName,
      email,
      password,
    }),
  });

  if (response.ok) {
    const data = await response.json();
    dispatch(setUser(data))
    return data;
  } else if (response.status < 500) {
    const data = await response.json();
    if (data.errors) {
      return data.errors;
    }
  } else {
    return ['An error occurred. Please try again.']
  }
}

export const getUser = (userId) => async dispatch => {
  const response = await fetch(`api/users/${userId}`)
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


export default function reducer(state = initialState, action) {
  let newState = {}
  switch (action.type) {
    case SET_USER:
      return { user: action.payload }
    case REMOVE_USER:
      return { user: null }
    case EDIT_USER:
      newState = { ...state }
      newState[action.user.id] = action.user
      return newState
    default:
      return state;
  }
}
