import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'

const Welcome = ({ name }: { name: string }) => {
    return <div>Hello, {name}</div>
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Welcome name={1} />
  </React.StrictMode>,
)
