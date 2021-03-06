import { useState } from 'react'
import blogService from '../services/blogs'

const Blog = ({setBlogs, blog, user}) => {

  const [blogCompleto, setBlogCompleto] = useState(false)
  const [thisBlog, setBlog] = useState(blog)
  const thisUser = blog.user.username
  
    const blogStyle = {
      paddingTop: 10,
      paddingLeft: 2,
      border: 'solid',
      borderWidth: 1,
      marginBottom: 5
    }

  return (
    <div style={thisBlog ? blogStyle : {display: 'none'}}>
      <div style={{display: blogCompleto ? 'none' : ''}}>
        {thisBlog.title} {thisBlog.author} <button onClick={() => setBlogCompleto(true)}>view</button>
      </div>
      <div style={{display: blogCompleto ? '' : 'none' }}>
        {thisBlog.title} {thisBlog.author} <button onClick={() => setBlogCompleto(false)}>hide</button>
        <div>{thisBlog.url}</div>
        <div>Likes: {thisBlog.likes}<button onClick={
          () => {
            const blogActualizado = { ...thisBlog, likes: thisBlog.likes + 1 }
            blogService.update(thisBlog.id, blogActualizado)
            setBlog(blogActualizado)
            blogService.getAll().then(blogs => {
              setBlogs(blogs.sort((a, b) => a.likes - b.likes))
            })  
          }
        }>like</button></div>
        <div>{thisUser}</div>
        <button style={{display: user.username === thisUser ? '' : 'none' }} onClick={
          () => {
           if (window.confirm(`Remove blog ${thisBlog.title} ${thisBlog.author}`)) {
            blogService.deleteOne(thisBlog.id).then(eliminado => setBlog(false))
           }
          }
        }>remove</button>
      </div>
    </div>  
  )
}

export default Blog