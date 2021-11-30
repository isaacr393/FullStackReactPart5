import React, {useState} from 'react'
import PropTypes from 'prop-types'

const Blog = ({blog, handleLike, handleRemove, user}) => {
  const [showDetail, setShowDetail] = useState(false)

  const toggleDetails = () => setShowDetail(!showDetail)

  const like = () => {

    let updateBlog = {
      likes: blog.likes + 1,
      author: blog.author,
      title: blog.title,
      id: blog.id
    }
    handleLike( updateBlog ) 
  }

  const detailDisplayStyle = { display: showDetail?'':'none' }
  return(
    <div style={{border:'1px solid black', margin:'10px'}}>
      {blog.title}  &nbsp;
      <button onClick={toggleDetails} className="showDetailsButton" >
        {showDetail?'Hide':'Details'}
      </button>
      
      <div style={detailDisplayStyle} className="DetailsBlogs" >
        {blog.url} <br />
        {blog.author} <br />
        {blog.likes} <button onClick={ like } className='likeBlogButton' >like</button> <br />
        { user.username === blog.user.username &&  (<button onClick={ ( ) => handleRemove(blog.id)} > Delete </button>) }
      </div>      
    </div>
  ) 
}

Blog.propTypes = {
    blog: PropTypes.object.isRequired,
    handleLike: PropTypes.func.isRequired, 
    handleRemove:PropTypes.func.isRequired,
    user: PropTypes.object.isRequired
}

export default Blog