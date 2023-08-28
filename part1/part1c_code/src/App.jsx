import { useState } from 'react'

const App = (props) => {
    const [counter, setCounter] = useState(0)

    let t = setTimeout(
        () => setCounter(counter + 1),
        1000
    )

    return (
        <div>
            <p>{counter}</p>
            <button onClick={()=>clearTimeout(t)}>Stop timer</button>
        </div>
    )
}

export default App