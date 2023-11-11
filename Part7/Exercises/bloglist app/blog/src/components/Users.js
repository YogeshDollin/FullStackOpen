import { useEffect, useState } from 'react'
import userService from '../services/users'

const Users = () => {
    const [users, setUsers] = useState([])
    useEffect(() => {
        try {
            userService.getUsers()
                .then(res => {
                    setUsers(res)
                })
        } catch (error) {
            console.log(error)
        }
    }, [])

    return (
        <div>
            <h1>Users</h1>
            <table>
                <thead>
                    <tr>
                        <th></th>
                        <th>
                            <strong>blogs created</strong>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {
                        users.map(user => 
                        <tr key={user.id}>
                            <td>{user.name}</td>
                            <td>{user.blogs.length}</td>
                        </tr>)
                    }
                </tbody>
            </table> 
        </div>
    )
}

export default Users