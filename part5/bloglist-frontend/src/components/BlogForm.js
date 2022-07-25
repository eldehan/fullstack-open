import { useState } from 'react'

const BlogForm = ({ createBlog }) => {
  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newURL, setNewURL] = useState('')
  
  const handleTitleInputChange = (event) => {
    setNewTitle(event.target.value)
  }

  const handleAuthorInputChange = (event) => {
    setNewAuthor(event.target.value)
  }

  const handleURLInputChange = (event) => {
    setNewURL(event.target.value)
  }

  const addBlog = (event) => {
    event.preventDefault()
    createBlog({
      title: newTitle,
      author: newAuthor,
      url: newURL
    })
    
    setNewTitle('')
    setNewAuthor('')
    setNewURL('')
  }

  return (
    <div>
      <h2>Add New Entry</h2>
      <form onSubmit={addBlog}>
        <div>
          title
          <input 
          type="text" 
          name="title"
          onChange={handleTitleInputChange}
          />
        </div>
        <div>
          author
          <input 
          type="text" 
          name="author"
          onChange={handleAuthorInputChange}
          />
        </div>
        <div>
          url
          <input 
          type="text" 
          name="url"
          onChange={handleURLInputChange}
          />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default BlogForm