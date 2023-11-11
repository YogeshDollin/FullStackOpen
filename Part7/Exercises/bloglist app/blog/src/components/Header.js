import Notification from './Notification'
import AppContext from '../context/appContext'
import { useContext } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { resetUser } from '../store/userReducer'
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'

const Header = () => {
    const dispatch = useDispatch()
    const [notification, notificationDispatch] = useContext(AppContext)
    const user = useSelector(state => state.user)

    const handleLogout = () => {
        localStorage.removeItem('loggedBlogappUser')
        dispatch(resetUser())
    }
    return (
        <div className='header'>
            <Navbar bg='dark' expand='sm' data-bs-theme='dark'>
                <Container>
                    <Navbar.Brand href='/'>BlogApp</Navbar.Brand>
                    <Nav variant='underline' className='me-auto'>
                        <Nav.Link href='/blogs'>Blogs</Nav.Link>
                        <Nav.Link href='/users'>Users</Nav.Link>
                    </Nav>
                    <Navbar.Text className='navbar-text'>{user.name} logged in <Button variant='primary' onClick={handleLogout}>logout</Button></Navbar.Text>
                </Container>
            </Navbar>
            
            <br/>
            <div className='container'>
                <Notification type={notification.type} message={notification.message}/>
            </div>
        </div>
    )
}

export default Header