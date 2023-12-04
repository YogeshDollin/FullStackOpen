const Notify = ({message, isError = false}) =>{
    if(!message) return null
    return (
        <div style={{color: isError ? 'red' : 'green'}}>
            {message}
        </div>
    )
}
export default Notify