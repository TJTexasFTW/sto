import axios from 'axios';

const initialState = {
    user: {},
    redirect: false,
    admin: false
};

//constants
const UPDATE_USER = 'UPDATE_USER';
const LOGIN_USER = 'LOGIN_USER';

export default function reducer(state=initialState, action) {
    console.log(action)
    switch(action.type) {
        case UPDATE_USER:
            return {
                ...state,
                user: action.payload
            }
        case LOGIN_USER + '_FULFILLED':
            // console.log("reducer:", action.payload);
            // console.log('history: ', this.props.history)
            
            return {
                ...state, admin: true,
                user: action.payload
            }            
        default: 
            return state
    }
}

export const loginUser = (name, password) => {
    console.log("loginUser before return", name, password)

    return {
        type: LOGIN_USER,
        payload: axios.post('/api/login', {
            name, password
        }).then(res => res.data)
    }

  }