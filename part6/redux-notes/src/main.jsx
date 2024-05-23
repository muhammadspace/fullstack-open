import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import noteReducer from './reducers/noteReducer.js'
import filterReducer from "./reducers/filterReducer.js"
import { configureStore } from "@reduxjs/toolkit"
import { Provider } from "react-redux"

const store = configureStore({
    reducer: {
        notes: noteReducer,
        filter: filterReducer
    }
})

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
        <App />
    </Provider>
  </React.StrictMode>,
)
