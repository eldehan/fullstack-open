import axios from 'axios'

const baseURL = 'http://localhost:3001/anecdotes'

const getAll = async () => {
  const response = await axios.get(baseURL)
  return response.data
}

const createNew = async (content) => {
  const object = { content, votes: 0 }
  const response = await axios.post(baseURL, object)
  return response.data
}

const update = async (anecdote) => {
  const { id } = anecdote;
  const votes = { votes: anecdote.votes + 1 }
  const response = await axios.patch(`${baseURL}/${id}`, votes)
  return response.data
}

const anecdoteService = { getAll, createNew, update }

export default anecdoteService