import actionTypes from './actionTypes'
import {
    getNotifications
} from '../services/index.js'

const startNotificationPost = () => (
    {
    type: actionTypes.START_NOTIFICATION_POST
    }
    )

const finishedNotificationPost = () => ({
    type: actionTypes.FINISH_NOTIFICATION_POST
})

const markNotificationAsReadById = (id) => ({
    type: actionTypes.MARK_NOTIFICATION_AS_READ_BY_ID,
    payload:{
        id
    }
})

const markNotificationAsRead = () => ({
    type: actionTypes.MARK_NOTIFICATION_AS_READ
})

const receivedNotification = (list) => ({
    type: actionTypes.RECEIVED_NOTIFICATIONS,
    payload:{list}
})
//通过id标记已读
export const getMarkNotificationAsReadById=(id)=>{
    return dispatch=>{
        dispatch(startNotificationPost())
        setTimeout(() => {
            dispatch(markNotificationAsReadById(id))
            dispatch(finishedNotificationPost())
        }, 2000);
        
    }
}

//标记整体已读
export const getMarkNotificationAsRead = () => {
    return dispatch => {
        dispatch(startNotificationPost())
        setTimeout(() => {
            dispatch(markNotificationAsRead())
            dispatch(finishedNotificationPost())
        }, 2000);
        
    }
}

// 获取通知中心消息
export const getReceivedNotification = () => {
    return dispatch => {
        dispatch(startNotificationPost())
        getNotifications().then(res=>{
           console.log(res); 
           dispatch(receivedNotification(res.data.list))
            dispatch(finishedNotificationPost())
       })
       
    }
}

