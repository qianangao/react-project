import {createStore,applyMiddleware} from 'redux'
import {createLogger} from 'redux-logger'
import thunk from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import rootReducers from './reducers'
// 使用日志打印方法， collapsed让action折叠，看着舒服。
const loggerMiddleware = createLogger({
    collapsed: true,
    duration:true,
    diff:true
})
export default createStore(rootReducers, composeWithDevTools(applyMiddleware(thunk,loggerMiddleware)))