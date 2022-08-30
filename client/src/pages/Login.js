import React, { useState, useEffect } from 'react'
import './Login.css'
import { useNavigate } from 'react-router-dom'
import { decodeToken } from 'react-jwt'
function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error,setError] = useState();
  const navigate = useNavigate()
  async function loginUser(event) {
    event.preventDefault()
    if (!email || !password) {
      setError('Enter all the details')
    } else {
      const response = await fetch('http://localhost:3002/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
        }),
      })
      const data = await response.json()
      if (data.user) {
        localStorage.setItem('token', data.user)
        alert('login successful ')
        window.location.href = '/'
      } else {
        alert('Please check your username and password')
      }
    }
  }

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      const user = decodeToken(token)
      if (user) {
        navigate('/')
      }
    } 
  }, [])

  return (
    <section className="login">
      <div className=" p-5  ">
       
        <div className="  d-flex justify-content-center align-items-center ">
          <form onSubmit={loginUser} className="p-3  d-flex flex-column ">
          {error && <h5 style={{color:'red'}}>{error}</h5> }
          <h1 className="text-center ">Login</h1>
            <input
              className="login-input my-3 rounded-pill border-0 p-1"
              onChange={(e) => setEmail(e.target.value)}
              type="text"
              placeholder="Email"
            />

            <input
              className="my-3 rounded-pill border-0 p-1"
              onChange={(e) => setPassword(e.target.value)}
              type="text" 
              placeholder="Passsword"
            />

            <button className="my-2  btn btn-primary " type="submit">
              Submit
            </button>

            <button
              onClick={() => navigate('/register')}
              className="my-2  btn btn-warning "
              type="button"
            >
              Sign Up
            </button>
          </form>
        </div>
      </div>
    </section>
  )
}

export default Login
