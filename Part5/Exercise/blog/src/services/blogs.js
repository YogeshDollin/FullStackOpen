import axios from 'axios'
const baseUrl = 'http://localhost:3003/api/blogs'

let token = ''

const setToken = (userToken) => {
    token = `Bearer ${userToken}`
}

const getToken = () => {
    return token
}

const getAll = async () => {
    const response = await axios.get(baseUrl)
    return response.data
}

const create = async newBlog => {
    const config = {
        headers: {Authorization: token}
    }
    const response = await axios.post(baseUrl, newBlog, config)
    return response.data
}

const update = async (id, updateBlog) => {
    const config = {
        headers: {Authorization: token}
    }
    const response = await axios.put(`${baseUrl}/${id}`, updateBlog, config)
    return response.data
}

export default {getAll, create, setToken, getToken, update}