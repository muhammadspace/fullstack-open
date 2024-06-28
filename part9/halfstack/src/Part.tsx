import { CoursePart } from "./types";

const Part = ({ part }: { part: CoursePart }) => {
    const assertNever = (part: never): never => {
        throw new Error("Unhandled discriminated union member: " + JSON.stringify(part));
    };

    switch (part.kind)
    {
        case "basic":
            return (
                <div>
                    <p><b>{part.name} {part.exerciseCount}</b></p>
                    <p><i>{part.description}</i></p>
                </div>
            );
        case "background":
            return (
                <div>
                    <p><b>{part.name} {part.exerciseCount}</b></p>
                    <p><i>{part.description}</i></p>
                    <p>submit to: {part.backgroundMaterial}</p>
                </div>
            );
        case "group":
            return (
                <div>
                    <p><b>{part.name} {part.exerciseCount}</b></p>
                    <p>project exercises: {part.groupProjectCount}</p>
                </div>
            );
        case "special":
            return (
                <div>
                    <p><b>{part.name} {part.exerciseCount}</b></p>
                    <p><i>{part.description}</i></p>
                    <p>required skills: {part.requirements.join(" - ")}</p>
                </div>
            );
        default:
            return assertNever(part);

    }
};

export default Part;