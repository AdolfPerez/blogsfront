import { useState } from "react"

const Blog = ({blog, user}) => {

  const [blogCompleto, setBlogCompleto] = useState(false)
  
    const blogStyle = {
      paddingTop: 10,
      paddingLeft: 2,
      border: 'solid',
      borderWidth: 1,
      marginBottom: 5
    }

  return (
    <div style={blogStyle}>
      <div style={{display: blogCompleto ? 'none' : ''}}>
        {blog.title} {blog.author} <button onClick={() => setBlogCompleto(true)}>view</button>
      </div>
      <div style={{display: blogCompleto ? '' : 'none' }}>
        {blog.title} {blog.author} <button onClick={() => setBlogCompleto(false)}>hide</button>
        <div>{blog.url}</div>
        <div>Likes: {blog.likes}<button>like</button></div>
        <div>{user}</div>
      </div>
    </div>  
  )
}

export default Blog