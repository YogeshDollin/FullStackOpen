// import {createSlice} from '@reduxjs/toolkit'

// const notificationSlice = createSlice({
//     name: 'notification',
//     initialState: '',
//     reducers:{
//         setNotification(state, action) {
//             return action.payload
//         },
//         resetNotification(state, action){
//             return ''
//         }
//     }
// })

// export const {setNotification, resetNotification} = notificationSlice.actions
// export default notificationSlice.reducer

const notificationReducer = (state, action) => {
    switch (action.type) {
        case 'SET':
            return action.payload
        case 'RESET':
            return ''
        default:
            return state
    }
}

const setNotificationAction = (message) => {
    return {
        type: 'SET',
        payload: message
    }
}

const resetNotificationAction = () => {
    return {
        type: 'RESET',
        payload: ''
    }
}

export {setNotificationAction, resetNotificationAction}
export default notificationReducer
