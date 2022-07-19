import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import NewBlogForm from './components/NewBlogForm'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [messageState, setMessage] = useState(null)
  const [blogFormVisible, setBlogFormVisible] = useState(false)

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
              <div style={{display: blogFormVisible ? '' : 'none' }}>
                <NewBlogForm blogs={blogs} setBlogs={setBlogs} setMessage={setMessage}/>
                <button onClick={() => setBlogFormVisible(false)}>cancel</button>
              </div>
              <div style={{display: blogFormVisible ? 'none' : '' }}>
                <button onClick={() => setBlogFormVisible(true)}> create new note</button>
              </div>
              {blogs.map(blog => <Blog user={user.username} key={blog.id} blog={blog} />)}
          </div>
      }
    </div>
  )
}

export default App
