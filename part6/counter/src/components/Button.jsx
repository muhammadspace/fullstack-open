import { useCounterDispatch } from "../CounterContext.jsx"

const Button = (props) => {
    const counterDispatch = useCounterDispatch()

    return (
        <button onClick={() => counterDispatch({ type: props.type })}>
            { props.children }
        </button>
    )
}

export default Button