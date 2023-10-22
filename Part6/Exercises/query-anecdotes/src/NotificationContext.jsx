import { createContext, useContext, useReducer } from "react"

const NotificationContext = createContext()

const notificationReducer = (state, action) => {
    switch(action.type){
        case 'CREATE':
            return `new anecdote '${action.payload.content}' created`
        case 'VOTE':
            return `anecdote '${action.payload.content}' voted`
        case 'RESET':
            return ''
    }
}

export const NotificationContextProvider = (props) => {
    const [message, notificationDispatch] = useReducer(notificationReducer, '')

    return (
    <NotificationContext.Provider value = {[message, notificationDispatch]}>
        {props.children}
    </NotificationContext.Provider>)
}

export const useMessage = () => {
    const messageAndDispatch = useContext(NotificationContext)
    return messageAndDispatch[0]
}

export const useNotificationDispatch = () => {
    const messageAndDispatch = useContext(NotificationContext)
    return messageAndDispatch[1]
}


export default NotificationContext