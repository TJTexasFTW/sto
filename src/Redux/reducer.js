import axios from 'axios';

const initialState = {
    user: {},
    redirect: false
    // admin: false
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
            console.log("reducer action.payload FULFILLED:", action.payload);
            // console.log('history: ', this.props.history)
            if (action.payload.length === 0) {
                return {
                    // ...state, admin: true,
                    ...state,
                    user: {admin: false, id: 0, initials: '', name: ''}}
            } else {
                return {
                    // ...state, admin: true,
                    ...state,
                    user: action.payload}
            } 
        case LOGIN_USER + '_REJECTED': 
        console.log("reducer action.payload REJECTED:", action.payload);
            state = {
                ...state,
                user: {admin: false, id: 0, initials: '', name: ''}} 
                return state;
        default: 
            return state
    }
}

export const loginUser = (name, password) => {
    console.log("loginUser in reducer before return", name, password)

    return {
        type: LOGIN_USER,
        payload: axios.post('/api/login', {
            name, password
        }).then(res => res.data).catch(err => console.log(err))
    }

  }