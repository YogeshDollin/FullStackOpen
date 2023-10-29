import { configureStore } from '@reduxjs/toolkit'
import notificationReducer from './notificationReducer'
import errorMessageReducer from './errorMessageReducer'
import blogReducer from './blogReducer'

const store = configureStore({
    reducer: {
        notification: notificationReducer,
        errorMessage: errorMessageReducer,
        blogs: blogReducer
    }
})

export default store