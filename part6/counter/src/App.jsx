import { useCounterValue } from './CounterContext'
import Button from './components/Button'

function App()
{
    const counter = useCounterValue()
    
    return (
        <div>
            <h1>{ counter }</h1>           
            <Button type="INC">+</Button>
            <Button type="DEC">-</Button>
            <Button type="ZERO">0</Button>
        </div>
    )
}

export default App