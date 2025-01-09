import { useState } from 'react'

const Button = ({ onClick, text }) => (
  <button onClick={onClick}>{text}</button>
)

const StatisticsLine = ({ text, value }) => (
  <>
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  </>
)

const Statistics = ({ good, neutral, bad, total, average, positive }) => {
  if (total === 0) {
    return (
      <div>
        No feedback given
      </div>
    )
  }
  return (
    <table>
      <tbody>
        <StatisticsLine text='Good' value={good} />
        <StatisticsLine text='Neutral' value={neutral} />
        <StatisticsLine text='Bad' value={bad} />
        <StatisticsLine text='Total' value={total} />
        <StatisticsLine text='Average' value={average} />
        <StatisticsLine text='Positive' value={positive} />
      </tbody>
    </table>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [total, setTotal] = useState(0)
  const [average, setAverage] = useState(0)
  const [positive, setPositive] = useState(0)

  const givePositiveFeedback = () => {
    const updatedGood = good + 1;
    setGood(updatedGood)
    const updatedTotal = updatedGood + neutral + bad
    setTotal(updatedTotal)
    calculateAverage(updatedGood, bad, updatedTotal)
    calculatePositive(updatedGood, updatedTotal)
  }

  const giveNeutralFeedback = () => {
    const updatedNeutral = neutral + 1;
    setNeutral(updatedNeutral)
    setTotal(good + updatedNeutral + bad)
  }

  const giveBadFeedback = () => {
    const updatedBad = bad + 1;
    setBad(updatedBad)
    const updatedTotal = good + neutral + updatedBad
    setTotal(updatedTotal)
    calculateAverage(good, updatedBad, updatedTotal)
    calculatePositive(good, updatedTotal)
  }

  const calculateAverage = (good, bad, total) => {
    setAverage((good - bad) / total)
  }

  const calculatePositive = (good, total) => {
    setPositive((good / total) * 100)
  }

  return (
    <div>
      <h1>Give feedback</h1>
      <Button onClick={givePositiveFeedback} text='Good' />
      <Button onClick={giveNeutralFeedback} text='Neutral' />
      <Button onClick={giveBadFeedback} text='Bad' />

      <h1>Statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad} total={total} average={average} positive={positive} />
    </div>
  )
}

export default App