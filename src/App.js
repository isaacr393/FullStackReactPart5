import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'


const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState('')
  const [errMessage, setErrMessage] = useState('')


  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect( () => {
    let user = window.localStorage.getItem('user')
    if(user){
      setUser(JSON.parse(user))
      blogService.setToken(JSON.parse(user).token)
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

  return (
    <div>      
      { `${user.user} logged in ` } <button onClick={handleLogout} >logout</button>
      <br />
      <span style={{color: 'red'}} >{errMessage}</span>

      <h2>blogs</h2>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
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