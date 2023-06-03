import Part from "./Part"
const Content = ({parts}) => {
    return (
        <div>
            <Part partTitle = {parts[0].part} exercises={parts[0].exercises}/>
            <Part partTitle = {parts[1].part} exercises={parts[1].exercises}/>
            <Part partTitle = {parts[2].part} exercises={parts[2].exercises}/>
        </div>
    )
}

export default Content