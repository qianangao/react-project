import actionTypes from '../actions/actionTypes'
const initState={
    isLoading:false,
    list:[]
}
export default (state=initState,action)=>{
    switch(action.type){
        case actionTypes.MARK_NOTIFICATION_AS_READ_BY_ID:
            const newList=state.list.map(item=>{
                if (item.id === action.payload.id){
                    item.hasRead=true
                }
                return item
            })
            
            return {
                ...state,
                list:newList,
                isLoading:true
            }
        case actionTypes.MARK_NOTIFICATION_AS_READ:
            return {
                ...state,
                list:state.list.map(item=>{
                    item.hasRead=true
                    return item
                }),
                isLoading: true
            }
        case actionTypes.RECEIVED_NOTIFICATIONS:
            return {
                ...state,
                list: action.payload.list,
                isLoading: true
            }
        case actionTypes.START_NOTIFICATION_POST:
            return {...state,isLoading:true}
        case actionTypes.FINISH_NOTIFICATION_POST:
            return {...state,isLoading:false}
        default:
            return state
    }
}