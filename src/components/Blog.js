import React, {useState} from 'react'

const Blog = ({blog}) => {
  const [showDetail, setShowDetail] = useState(false)

  const toggleDetails = () => setShowDetail(!showDetail)

  const detailDisplayStyle = { display: showDetail?'':'none' }
  return(
    <div style={{border:'1px solid black', margin:'10px'}}>
      {blog.title}  &nbsp;
      <button onClick={toggleDetails} >
        {showDetail?'Hide':'Details'}
      </button>
      
      <div style={detailDisplayStyle}>
        {blog.author} <br />
        {blog.likes} <button>like</button>
      </div>      
    </div>
  ) 
}



export default Blog