import { CoursePart } from "../types"
const Part = (props: {part: CoursePart}) => {
    const part = props.part;
    switch (part.kind) {
        case 'basic':
            return (<>
                        <h2>{part.name} {part.exerciseCount}</h2>
                        <p>{part.description}</p>
                    </>);
        case 'group':
            return <>
                        <h2>{part.name} {part.exerciseCount}</h2>
                        <p>project exercises {part.groupProjectCount}</p>
                    </>
        case 'background':
            return <>
                        <h2>{part.name} {part.exerciseCount}</h2>
                        <p>{part.description}</p>
                        <p>{part.backgroundMaterial}</p>
                    </>
        case 'special':
            return <>
                        <h2>{part.name} {part.exerciseCount}</h2>
                        <p>{part.description}</p>
                        <p>required skills: {part.requirements.join(', ')}</p>
                    </>
        default:
            break;
    }
}

export default Part;