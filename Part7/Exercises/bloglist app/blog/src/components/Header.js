import Notification from './Notification'
import AppContext from '../context/appContext'
import { useContext } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { resetUser } from '../store/userReducer'
import { Link } from 'react-router-dom'

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
            <div className='header-top-section'>
                <Link to='/blogs'>blogs</Link>
                <Link to='/users'>users</Link>
                {user.name} logged in <button onClick={handleLogout}>logout</button>
            </div>
            
            <br/>
            <h2>Blogs</h2>
            <Notification type={notification.type} message={notification.message}/>
        </div>
    )
}

export default Header