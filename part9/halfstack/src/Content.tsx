import Part from "./Part";
import { CoursePart } from "./types";

type ContentProps = {
    courseParts: CoursePart[]
};

const Content = (props: ContentProps) => {
    return (
        props.courseParts.map(part => (
            <Part key={part.name} part={part} />
        ))
    );
};

export default Content;