import { useDispatch, useSelector } from 'react-redux'
import { updateVote } from '../reducers/anecdoteReducer'
import { createNotification } from '../reducers/notificationReducer'

const AnecdoteList = () => {
  const anecdotes = useSelector((state) =>
    state.filter
      ? state.anecdotes.filter((anecdote) =>
          anecdote.content.toLowerCase().includes(state.filter.toLowerCase())
        )
      : state.anecdotes
  )

  const dispatch = useDispatch()

  const castVote = (anecdote) => {
    dispatch(updateVote(anecdote))
    dispatch(createNotification(`Your vote for ${anecdote.content} has been recorded`, 5))
  }

  return (
    <div>
      {[...anecdotes].sort((a, b) => b.votes - a.votes).map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => castVote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default AnecdoteList