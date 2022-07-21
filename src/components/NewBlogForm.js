import { useState } from "react"
import blogService from '../services/blogs'
const NewBlogForm = ({ blogs, setBlogs, setMessage }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const [likes, setLikes] = useState('')

  const addBlog = event => {
    event.preventDefault()
    const blogObject = {
      title,
      author,
      url,
      likes
    }

    blogService
    .create(blogObject)
    .then(returnedBlog => {
      setBlogs(blogs.concat(returnedBlog).sort((a, b) => a.likes - b.likes))
      setMessage(`a new blog ${title} by ${author}`)
      setTimeout(() => setMessage(null), 5000)
      setTitle('')
      setAuthor('')
      setUrl('')
      setLikes('')
    })
  }

  return (<form onSubmit={addBlog}>
    <div>
      title:
      <input
      type='text'
      value={title}
      name='title'
      onChange={({ target }) => setTitle(target.value)}
      />
    </div>
    <div>
      author:
      <input
      type='text'
      value={author}
      name='author'
      onChange={({ target }) => setAuthor(target.value)}
      />
    </div>
    <div>
      url:
      <input
      type='text'
      value={url}
      name='url'
      onChange={({ target }) => setUrl(target.value)}
      />
    </div>
    <div>
      likes:
      <input
      type='number'
      value={likes}
      name='likes'
      onChange={({ target }) => setLikes(target.value)}
      />
    </div>
    <button type='submit'>create</button>
  </form>
  )
}

export default NewBlogForm