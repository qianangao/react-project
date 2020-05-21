import {createStore,applyMiddleware} from 'redux'
import rootReducers from './reducers/'
import thunk from 'redux-thunk'

export default createStore(rootReducers, applyMiddleware(thunk))