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
        }
    }
})

export const {setBlogs, appendBlog, deleteBlog} = blogSlice.actions
export default blogSlice.reducer