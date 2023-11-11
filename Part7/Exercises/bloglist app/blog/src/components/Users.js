import { Link } from 'react-router-dom'
import Table from 'react-bootstrap/Table'

const Users = ({users = []}) => {
    
    return (
        <div className='container'>
            <h1>Users</h1>
            <Table striped variant='light'>
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
                            <td><Link to={`/users/${user.id}`}>{user.name}</Link></td>
                            <td>{user.blogs.length}</td>
                        </tr>)
                    }
                </tbody>
            </Table>
        </div>
    )
}

export default Users