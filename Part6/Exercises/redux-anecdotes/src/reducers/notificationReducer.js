import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
    name: 'notification',
    initialState: '',
    reducers: {
        updateNotificationMessage(state, action){
            return action.payload
        },
        removeNotification(state, action){
            return ''
        }
    }
})

export const {updateNotificationMessage, removeNotification} = notificationSlice.actions
export default notificationSlice.reducer