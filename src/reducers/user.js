import actionTypes from '../actions/actionTypes'
const isLogin = Boolean(window.localStorage.getItem('token')) || Boolean(window.sessionStorage.getItem('token'))
const data = JSON.parse(window.localStorage.getItem('data')) || JSON.parse(window.sessionStorage.getItem('data'))
const initState={
    ...data,
    isLogin,
    isLoading:false
}


export default (state=initState,action)=>{
    switch(action.type){
        case actionTypes.START_LOGIN:
            return {...state,isLoading:true}
        case actionTypes.LOGIN_SUCCESS:
            return {...state,...action.payload.data,isLoading:false,isLogin:true}
        case actionTypes.LOGIN_FAILED:
            return {
                    id: '',
                    avatar: '',
                    displayName: '',
                    isLogin:false,
                    isLoading: false
            }
        default:
            return state
    }
}