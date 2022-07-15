import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const [likes, setLikes] = useState('')
  const [messageState, setMessage] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUserJSON) {
      const userLoggedIn = JSON.parse(loggedUserJSON)
      setUser(userLoggedIn)
      blogService.setToken(userLoggedIn.token)
    }
  }, [])

  const handleLogin = async event => {
    event.preventDefault()

    try {
      const userToLogIn = {
        username,
        password
      }
      const userLoggedIn = await loginService.login(userToLogIn)
      window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(userLoggedIn))
      blogService.setToken(userLoggedIn.token)
      setUser(userLoggedIn)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setMessage('Wrong username or password')
      setTimeout(() => setMessage(null), 5000)
    }
  }

  const handleLogOut = () => {
    window.localStorage.removeItem('loggedBlogAppUser')
    setUser(null)
  }

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
      setBlogs(blogs.concat(returnedBlog))
      setMessage(`a new blog ${title} by ${author}`)
      setTimeout(() => setMessage(null), 5000)
      setTitle('')
      setAuthor('')
      setUrl('')
      setLikes('')
    })
  }

  return (
    <div>
      {
        user === null ?
          <div>   
            <h2>log in to application</h2>
            <Notification message={messageState} colorearEn={'red'}/>
            <form onSubmit={handleLogin}>
              <div>
                username
                <input
                type='text'
                value={username}
                name='Username'
                onChange={({ target }) => setUsername(target.value)}
                />
              </div>
              <div>
                password
                <input
                type='password'
                value={password}
                name='Password'
                onChange={({ target }) => setPassword(target.value)}
                />
              </div>
              <button type='submit'>login</button>
            </form>
          </div> :
            <div>
              <h2>blogs</h2>
            <Notification message={messageState} colorearEn={'green'}/>
              {user.username} logged in <button onClick={handleLogOut}>logout</button>
              <h2>create new</h2>
              <form onSubmit={addBlog}>
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
              {blogs.map(blog => <Blog key={blog.id} blog={blog} />)}
          </div>
      }
    </div>
  )
}

export default App
