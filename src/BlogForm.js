import React, { useState} from "react"

const BlogForm = ({onSubmit}) => {
    const [blog, setBlog] = useState({title:'', author:'', url:''})
  
    const handleSubmit = (e) => {
      e.preventDefault()    
      onSubmit(blog)
      setBlog({title:'', author:'', url:''})
    }
  
    return (
      <form onSubmit={ handleSubmit } >
  
        <label htmlFor="titleInput">Title</label>
        <input id="titleInput" type="text" value={blog.title} onChange={({target}) => setBlog({...blog, title:target.value})} /> <br />
        <label htmlFor="authorInput">Author</label>
        <input id="authorInput" type="text" value={blog.author} onChange={({target}) => setBlog({...blog, author:target.value})} /> <br />
        <label htmlFor="urlInput">Url</label>
        <input id="urlInput" type="text" value={blog.url} onChange={({target}) => setBlog({...blog, url:target.value})} /> <br />
  
        <button onClick={ handleSubmit }>Submit</button>
      </form>
    )
}

export default BlogForm;