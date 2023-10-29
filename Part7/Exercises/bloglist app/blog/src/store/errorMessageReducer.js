import { createSlice } from '@reduxjs/toolkit'

const errorMessageSlice = createSlice({
    name: 'errorMessage',
    initialState: '',
    reducers: {
        setErrorMessage(state, action){
            return action.payload
        },
        resetErrorMessage(state, action){
            return ''
        }
    }
})

export const {setErrorMessage, resetErrorMessage} = errorMessageSlice.actions
export default errorMessageSlice.reducer