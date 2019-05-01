// import {createStore} from 'redux';
// import reducer from './reducer';

// export default createStore(reducer);

import { createStore, applyMiddleware, combineReducers } from 'redux';
import promiseMiddleware from 'redux-promise-middleware';
// import budgetReducer from './ducks/budgetReducer';
// import userReducer from './ducks/userReducer';
import loginUser from './reducer';  

const rootReducer = combineReducers({
//   budget: budgetReducer,
     loginUser
})

export default createStore(rootReducer, applyMiddleware(promiseMiddleware));