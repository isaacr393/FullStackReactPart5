import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import BlogForm from './BlogForm'
import Toggable from './Toggable'


const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState('')
  const [errMessage, setErrMessage] = useState('')
  const [successMessage, setSuccessMessage] = useState('')


  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect( () => {
    let user = window.localStorage.getItem('user')
    if(user){
      let parsedUser = JSON.parse(user)
      setUser(parsedUser)
      blogService.setToken(parsedUser.token)
    }
  },[])

  const handleLogin = async (e)=> {
    e.preventDefault()
    try {
      let user = await blogService.login({username, password})

      setUser(user)
      setUsername('')
      setPassword('')
      blogService.setToken(user.token)
      window.localStorage.setItem('user', JSON.stringify(user) )

    } catch (err) {
      //console.log('Err Here',err.response)
      setErrMessage(err.response.data.error)
      setTimeout( () => setErrMessage(''), 5000)
    }
  }

  const handleLogout = ()=>{
    setUser('')
    setUsername('')
    setPassword('')
    blogService.setToken('')
    window.localStorage.removeItem('user')
  }

  const handleSubmitBlog = async (e, blog) =>{
    e.preventDefault()
    try {
      let response = await blogService.create(blog)
      setBlogs([...blogs, response])
      setSuccessMessage('Blog created Successfully')
      setTimeout( () => setSuccessMessage(''), 5000)
    } catch (err) {
      setErrMessage(err.response.data.error)
      setTimeout( () => setErrMessage(''), 5000)
    }
  } 

  const handleLike = async (blog) =>{
    try {
      await blogService.update(blog.id, blog)
      setBlogs( blogs.map( prevBlog => prevBlog.id === blog.id?blog:prevBlog  ) )
      setSuccessMessage('Blog Liked ')
      setTimeout( () => setSuccessMessage(''), 5000)
    } catch (err) {
      setErrMessage(err.response.data.error)
      setTimeout( () => setErrMessage(''), 5000)
    }
  }

  if( !user ){
    return (
      <>
        <LoginForm username={username} password={password} 
        handleUsernameChange={ ({target}) => setUsername(target.value) } 
        handlePasswordChange={ ({target}) => setPassword(target.value) } 
        onSubmit = {handleLogin}
        />
        <span style={{color: 'red'}} >{errMessage}</span>
      </>
    )
  }

  const blogSorted = blogs.sort( (prev, current) => current.likes - prev.likes)
  return (
    <div>      
      { `${user.user} logged in ` } <button onClick={handleLogout} >logout</button>
      <br /> <br />
      <Toggable showVisibilityText='Create Blog' hiddenVisibilityText='Cancel Register'>
        <BlogForm onSubmit={handleSubmitBlog}/>
      </Toggable>      

      <span style={{color: 'red'}} >{errMessage}</span>
      <span style={{color: 'green'}} >{successMessage}</span>

      <h2>blogs</h2>
      {blogSorted.map(blog =>
        <Blog key={blog.id} blog={blog} handleLike={handleLike} />
      )}
    </div>
  )
}


const LoginForm = ({onSubmit, username, handleUsernameChange, password, handlePasswordChange}) => {

  return (
    <form onSubmit={onSubmit} >
      <label htmlFor="usernameInput">username</label>
      <input id="usernameInput" type="text" value={username} onChange={handleUsernameChange} /> <br />
      <label htmlFor="passwordInput">password</label>
      <input id='passwordInput' type="text" value={password} onChange={handlePasswordChange} /> <br />

      <button onClick={onSubmit}>Log in</button>
    </form>
  )
}

export default App