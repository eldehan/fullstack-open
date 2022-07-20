const totalLikes = (blogList) => {
  if (blogList) {
    return blogList.reduce((totalLikes, currentBlog) => {
      return totalLikes += currentBlog.likes
    }, 0)
  } else return undefined
}

const favoriteBlog = (blogList) => {
  return blogList.map(blog => {
    return {
      title: blog.title,
      author: blog.author,
      likes: blog.likes
    }
  }).reduce((mostLikedBlog, currentBlog) => {
    if (currentBlog.likes > mostLikedBlog.likes) {
      return currentBlog
    } else return mostLikedBlog
  }, {likes: 0})
}

module.exports = {
  totalLikes,
  favoriteBlog
}