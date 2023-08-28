import { useState } from 'react'

const StatisticLine = ({text, value}) => (
  <tr>
    <td>{text}</td>
    <td>{value}</td>
  </tr>
)

const Statistics = (props) => {
  const {good, neutral, bad, all} = props.statistics
  
  if (all === 0) return (
    <>
      <h1>Statistics</h1>
      <p>No feedback has been given.</p>
    </>
    )

  return (
    <>
      <h1>Statistics</h1>
      <table>
        <StatisticLine text="good" value={good} />
        <StatisticLine text="neutral" value={neutral} />
        <StatisticLine text="bad" value={bad} />
        <StatisticLine text="all" value={all} />
        <StatisticLine text="average" value={(1 * good + 0 * neutral - 1 * bad)/all} />
        <StatisticLine text="positive" value={(100 * good/all) + "%"} />
      </table>
    </>
  )
}

const Button = ({handleFunction, text}) => <button onClick={handleFunction}>{text}</button>

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGood = () => setGood(good + 1)
  const handleNeutral = () => setNeutral(neutral + 1)
  const handleBad = () => setBad(bad + 1)

  let all = good + neutral + bad
  
  return (
    <>
      <h1>Give feedback</h1>

      <Button handleFunction={handleGood} text="good" />
      <Button handleFunction={handleNeutral} text="neutral" />
      <Button handleFunction={handleBad} text="bad" />

      <Statistics statistics={{good, neutral, bad, all}} />
    </>
  )
}

export default App