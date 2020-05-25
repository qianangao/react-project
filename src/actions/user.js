import actionTypes from './actionTypes'
import { loginReq } from '../services/index'

const startLogin = () => ({
    type: actionTypes.START_LOGIN
})
const loginSuccess = (data) => ({
    type: actionTypes.LOGIN_SUCCESS,
    payload: {
        data
    }
})

const loginFailed = () => {
    window.localStorage.removeItem('token')
    window.sessionStorage.removeItem('token')
    window.localStorage.removeItem('data')
    window.sessionStorage.removeItem('data')
    return {
        type:actionTypes.LOGIN_FAILED
    }
}

export const login = (userInfo) => {
    return dispatch => {
        dispatch(startLogin())
        loginReq(userInfo).then(res => {
            if (res.data.code === 200) {
                if(userInfo.remember===true){
                    window.localStorage.setItem('token', res.data.data.token)
                    window.localStorage.setItem('data', JSON.stringify(res.data.data))
                    
                }else{
                    window.sessionStorage.setItem('token', res.data.data.token)
                    window.sessionStorage.setItem('data', JSON.stringify(res.data.data))
                }
                dispatch(loginSuccess(res.data.data))
            } else {
                dispatch(loginFailed())
            }

        })
    }
}


export const logout=()=>{
    return dispatch=>{
        dispatch(loginFailed())
    }
}


export const changeAvatar = (imageUrl) => ({
    type: actionTypes.CHANGE_AVATAR,
    payload: {
        imageUrl
    }
})

