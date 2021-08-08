const initialState = {
  username: '',
  isLoggedIn: false
}

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'LOGIN':
      return {
        username: action.payload,
        isLoggedIn: true
      }
    default:
      return initialState;
  }
}