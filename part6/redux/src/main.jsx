import React from "react"
import ReactDOM from "react-dom/client"
import { createStore } from "redux"

const counterReducer = (state = 0, action) => {
    switch (action.type)
    {
        case "INCREMENT":
            return state + 1
        case "DECREMENT":
            return state - 1
        case "ZERO":
            return 0
        default:
            return state
    }
}

const store = createStore(counterReducer)

const App = () => {
  return (
    <div>
        <p>{ store.getState() }</p>
        <button onClick={ e => store.dispatch({ type: "INCREMENT"}) }>inc</button>
        <button onClick={ e => store.dispatch({ type: "DECREMENT"}) }>dec</button>
        <button onClick={ e => store.dispatch({ type: "ZERO"}) }>zro</button>
    </div>
  )
}

const root = ReactDOM.createRoot(document.getElementById("root"))

const renderApp = () => {
    root.render(<App />)
}

renderApp()
store.subscribe(renderApp)