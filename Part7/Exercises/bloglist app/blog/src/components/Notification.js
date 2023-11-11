import Alert from 'react-bootstrap/Alert'

const Notification = ({variant, message}) => {
    if(!message){
        return null
    }
    return (
        <Alert variant={variant}>{message}</Alert>
    )
}

export default Notification