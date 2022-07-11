import { useState } from 'react'

const Button = ( {eventHandler, text} ) => {
  return (
    <button onClick={eventHandler}>{text}</button>
  )
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.'
  ]
   
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState({})
  const mostVotes = () => {
    let currentMax = 0
    let maxAnecdoteIndex = 0

    for (let anecdoteIndex in votes) {
      if (votes[anecdoteIndex] > currentMax) {
        currentMax = votes[anecdoteIndex]
        maxAnecdoteIndex = anecdoteIndex
      }
    }

    return maxAnecdoteIndex
  }

  const getRandomIndex = () => {
    let randomIndex = (Math.floor(Math.random()*anecdotes.length))

    return randomIndex
  }

  const handleNextAnecdote = () => {
    setSelected(getRandomIndex)
  }

  const handleVotes = () => {
    const votesCopy = {...votes}

    votesCopy[selected] = votesCopy[selected] ? votesCopy[selected] + 1 : 1
    setVotes(votesCopy)
  }

  return (
    <>
      <h2>Anecdote of the day</h2>
      {anecdotes[selected]}
      <p>has {votes[selected] || 0} votes</p>
      <Button eventHandler={handleVotes} text='vote' />
      <Button eventHandler={handleNextAnecdote} text='next anecdote'/>
    
      <h2>Anecdote with the most votes</h2>
        {anecdotes[mostVotes()]}
        <p>has {votes[mostVotes()] || 0} votes</p>
    </>
  )
}

export default App