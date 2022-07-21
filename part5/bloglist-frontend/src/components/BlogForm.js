const BlogForm = ({ addBlog, handleTitleInputChange, handleAuthorInputChange, handleURLInputChange }) => {
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