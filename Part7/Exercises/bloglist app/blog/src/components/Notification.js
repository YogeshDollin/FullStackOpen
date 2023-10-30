const Notification = ({type, message}) => {
    if(!message){
        return null
    }
    return (
        <p className={`notification ${type}`}>{message}</p>
    )
}

export default Notification