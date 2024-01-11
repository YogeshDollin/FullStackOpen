import { ContentProps } from "../types";

const Total = (props: ContentProps) => {
    const total = props.course.reduce((sum, part) => (sum + part.exerciseCount), 0);

    return <p>Total number of exercises {total}</p>
}

export default Total;