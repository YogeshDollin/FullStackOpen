import { ContentProps } from "../types";

const Content = (props:ContentProps) => {
    return (
        <div>
            {props.course.map((part, index) => <p key={index}>{part.name} {part.exerciseCount}</p>)}
        </div>
    );
};

export default Content;