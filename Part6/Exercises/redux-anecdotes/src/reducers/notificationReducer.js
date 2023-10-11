import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
    name: 'notification',
    initialState: 'This is initial state message',
    reducers: {
        updateNotificationMessage(state, action){
            state.notificationMessage = action.payload
        }
    }
})

export const {updateNotificationMessage} = notificationSlice.actions
export default notificationSlice.reducer