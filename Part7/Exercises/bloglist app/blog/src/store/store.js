import { configureStore } from '@reduxjs/toolkit'
import notificationReducer from './notificationReducer'
import errorMessageReducer from './errorMessageReducer'
import blogReducer from './blogReducer'
import userReducer from './userReducer'

const store = configureStore({
    reducer: {
        notification: notificationReducer,
        errorMessage: errorMessageReducer,
        blogs: blogReducer,
        user: userReducer
    }
})

export default store