import Notification from './Notification'
import AppContext from '../context/appContext'
import { useContext } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { resetUser } from '../store/userReducer'

const Header = () => {
    const dispatch = useDispatch()
    const [notification, notificationDispatch] = useContext(AppContext)
    const user = useSelector(state => state.user)

    const handleLogout = () => {
        localStorage.removeItem('loggedBlogappUser')
        dispatch(resetUser())
    }
    return (
        <div>
            <h2>Blogs</h2>
            <Notification type={notification.type} message={notification.message}/>
            <p>{user.name} logged in <button onClick={handleLogout}>logout</button></p>
        </div>
    )
}

export default Header