import Part from "./Part";
import Total from "./Total";
const Content = ({parts}) => {
    const total = parts.reduce((s, p) => s + p.exercises, 0)
    return (
        <>
            {parts.map((part) => {return <Part key={part.id} part={part} />})}
            <Total count={total}/>
        </>
    )
}

export default Content