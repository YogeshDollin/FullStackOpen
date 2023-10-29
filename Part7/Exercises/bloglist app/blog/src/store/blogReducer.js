import { createSlice } from '@reduxjs/toolkit'

const blogSlice = createSlice({
    name: 'blogs',
    initialState: [],
    reducers: {
        setBlogs(state, action){
            return action.payload
        },
        appendBlog(state, action){
            return state.concat(action.payload)
        },
        deleteBlog(state, action){
            return state.filter(blog => blog.id !== action.payload.id)
        },
        updateBlog(state, action){
            return state.map(blog => blog.id === action.payload.id ? action.payload : blog)
        }
    }
})

export const {setBlogs, appendBlog, deleteBlog, updateBlog} = blogSlice.actions
export default blogSlice.reducer