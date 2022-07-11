import { useState } from 'react'

const SectionTitle = ({text}) => (
  <h1>{text}</h1>
) 

const Button = ( {eventHandler, text} ) => {
  return (
    <button onClick={eventHandler}>{text}</button>
  )
}

const Statistics = (props) => {
  if (props.allClicks.length === 0) {
    return (
      <div>
        <SectionTitle text='Statistics' />
        <p>No feedback given</p>
      </div>
    )
  }

  const averageRating = (props.good - props.bad) / props.allClicks.length || 0
  const positiveClickRate = String((props.good / props.allClicks.length) * 100 || 0) + '%'

  return (
    <table>
        <tbody>
          <StatisticsLine text='good' value={props.good} />
          <StatisticsLine text='neutral' value={props.neutral} />
          <StatisticsLine text='bad' value={props.bad} />
          <StatisticsLine text='all' value={props.allClicks.length} />
          <StatisticsLine text='average' value={averageRating} />
          <StatisticsLine text='positive' value={positiveClickRate} />
        </tbody>
    </table>
  )
}

const StatisticsLine = ({ text, value}) => {
  return (
    <tr>
      <td>{text}</td> 
      <td>{value}</td>
    </tr>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [allClicks, setAll] = useState([])

  const handleGoodClick = () => {
    setAll(allClicks.concat(1))
    setGood(good + 1)
  }

  const handleNeutralClick = () => {
    setAll(allClicks.concat(0))
    setNeutral(neutral + 1)
  }

  const handleBadClick = () => {
    setAll(allClicks.concat(-1))
    setBad(bad + 1)
  }

  return (
    <>
      <SectionTitle text='Give Feedback' />
      <Button eventHandler={handleGoodClick} text='good'/>
      <Button eventHandler={handleNeutralClick} text='neutral'/>
      <Button eventHandler={handleBadClick} text='bad'/>

      <Statistics good={good} neutral={neutral} bad={bad} allClicks={allClicks}/>
    </>
  )
}

export default App