const initialState = {
    user: {}
}

//constants
const UPDATE_USER = 'UPDATE_USER';
const USER_DATA = 'USER_DATA';
const REQUEST_USER_DATA = 'REQUEST_USER_DATA'


//action creators
export function updateUser(user) {
    return {
        type: UPDATE_USER,
        payload: user
    }
}

export const requestUserData = () => {
    let data = axios.get('/auth/user-data').then(res => res.data)
    return {
        type: REQUEST_USER_DATA,
        payload: data
    }
  }

export default function reducer(state=initialState, action) {
    switch(action.type) {
        case UPDATE_USER:
            return {
                ...state,
                user: action.payload
            }
        case REQUEST_USER_DATE:
            return {
                ...state,
                user: action.payload
            }            
        default: return state;
    }
}
