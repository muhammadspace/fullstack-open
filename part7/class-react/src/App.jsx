import React from "react"
import axios from "axios"

class App extends React.Component 
{
    constructor(props)
    {
        super(props)

        this.state = {
            anecdotes: [],
            current: 0
        }
    }

    componentDidMount = () => {
        axios.get("http://localhost:3001/anecdotes").then(response => this.setState({ anecdotes: response.data }))
    }

    handleClick = () => {
        this.setState({ current: Math.floor(Math.random() * this.state.anecdotes.length) })
    }

    render()
    {
        if (!this.state.anecdotes.length)
            return <h1>no anecdotes :(</h1>

        return (
            <div>
                <h1>Anecdote of the day</h1>
                <p>{ this.state.anecdotes[this.state.current].content }</p>
                <button onClick={this.handleClick}>next</button>
            </div>
        )
    }
}

export default App