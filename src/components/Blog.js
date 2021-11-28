import React, {useState} from 'react'

const Blog = ({blog, handleLike}) => {
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
      <button onClick={toggleDetails} >
        {showDetail?'Hide':'Details'}
      </button>
      
      <div style={detailDisplayStyle}>
        {blog.url} <br />
        {blog.author} <br />
        {blog.likes} <button onClick={ like } >like</button>
      </div>      
    </div>
  ) 
}



export default Blog