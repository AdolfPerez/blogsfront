import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  const handleLogin = async event => {
    event.preventDefault()
      const userToLogIn = {
        username,
        password
      }
      const userLoggedIn = await loginService.login(userToLogIn)
      setUser(userLoggedIn)
      setUsername('')
      setPassword('')
  }

  return (
    <div>
      {
        user === null ?
          <div>   
            <h2>log in to application</h2>
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
              {user.username} logged in
              <br/><br/>
              {blogs.map(blog => <Blog key={blog.id} blog={blog} />)}
          </div>
      }
    </div>
  )
}

export default App