import { CoursePart } from "../types";
import Part from "./Part";

const Content = (props:{course: CoursePart[]}) => {
    return (
        <div>
            {props.course.map((part, index) => <Part key={index} part={part}/>)}
        </div>
    );
};

export default Content;