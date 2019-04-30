// import {createStore} from 'redux';
// import reducer from './reducer';

// export default createStore(reducer);

import { createStore, applyMiddleware, combineReducers } from 'redux';
import promiseMiddleware from 'redux-promise-middleware';
// import budgetReducer from './ducks/budgetReducer';
// import userReducer from './ducks/userReducer';

const rootReducer = combineReducers({
//   budget: budgetReducer,
//   user: userReducer
})

export default createStore(rootReducer, applyMiddleware(promiseMiddleware));