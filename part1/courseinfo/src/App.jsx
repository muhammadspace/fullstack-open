const Header = (props) => {
    return (
        <h1>{props.title}</h1>
    )
}

const Part = (props) => {
    const {name, exercises} = props.part 
    return (
        <p>{name} {exercises}</p>
    )
}

const Content = (props) => {
    return (
        <div>
            <Part part={props.parts[0]} />
            <Part part={props.parts[1]} />
            <Part part={props.parts[2]} />
        </div>
    )
}

const Total = (props) => {
    const [part1, part2, part3] = props.total
    return (
        <p>Number of exercises {part1.exercises + part2.exercises + part3.exercises}</p>
    )
}

const App = () => {
    const course = {
        name: 'Half Stack application development',
        parts: [
            {
                name: 'Fundamentals of React',
                exercises: 10
            },
            {
                name: 'Using props to pass data',
                exercises: 7
            },
            {
                name: 'State of a component',
                exercises: 14
            }
        ]
    }

    return (
        <div>
            <Header title={course.name} />
            <Content parts={course.parts} />
            <Total total={course.parts} />
        </div>
    )
}

export default App