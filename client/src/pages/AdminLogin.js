import React, { useState, useEffect } from 'react'
import { decodeToken } from 'react-jwt'
import { useNavigate } from 'react-router-dom'
function AdminLogin() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState();

  const loginAdmin = async (event) => {
    event.preventDefault()
    if (!email || !password) {
      setError('Enter all the details')
    } else {
      const response = await fetch('http://localhost:3002/api/admin-login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
        }),
      })
      console.log('admin data :', response)
      const data = await response.json()
      console.log('admin data after json :', data)

      if (data.admin) {
        localStorage.setItem('adminToken', data.admin)
        alert('login success')
        navigate('/admin')
      } else {
        alert('please check Email and Passsword')
      }
    }
  }
  useEffect(() => {
    const adminToken = localStorage.getItem('adminToken')
    if (adminToken) {
      const admin = decodeToken(adminToken)
      if (admin) {
        navigate('/admin')
      }
    }
  }, [])
  return (
    <div>
      <section className="login">
        <div className=" p-5 ">
          <h1 className="text-center mt-5">Admin Login</h1>
          <div className="  d-flex justify-content-center align-items-center ">
            <form onSubmit={loginAdmin} className="p-3  d-flex flex-column  ">
            {error && <h5 style={{ color: 'red' }}>{error}</h5>}
              <input
                className="login-input my-3 rounded-pill border-0 p-1"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="text"
                placeholder="Email"
              />

              <input
                className="my-3 rounded-pill border-0 p-1"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="text"
                placeholder="Passsword"
              />

              <button className="my-2  btn btn-primary " type="submit">
                Submit
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  )
}

export default AdminLogin
