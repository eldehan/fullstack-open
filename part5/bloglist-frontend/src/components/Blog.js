const Blog = ({ blog, handleUpdateBlog, deleteBlog }) => {


  return (
    <div>
      {blog.title} {blog.author} {blog.likes} likes <button onClick={handleUpdateBlog}>Like</button> <button onClick={deleteBlog}>remove</button>
    </div>  
  )
}
export default Blog