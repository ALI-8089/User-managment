import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function App() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState()

  const navigate = useNavigate()

  async function registerUser(event) {
    event.preventDefault()

    if (!name || !email || !password) {
      setError('Enter all the details')
    } else if (password.length < 6) {
      setError('Enter minimum 6 characters for password')
    } else {
      const response = await fetch('http://localhost:3002/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          email,
          password,
        }),
      })
      const data = await response.json()
      console.log(data)
      if (data.status === 'ok') {
        navigate('/login')
      }else{
        alert("user already exist")
      }
    }
  }
  return (
    <section className="login">
      <div className=" p-5 d-flex justify-content-center align-items-center ">
        <form
          onSubmit={registerUser}
          id="loginForm"
          className="p-3  d-flex flex-column  "
        >
          <h1 className="text-center"> Sign Up </h1>

          {error && <h5 style={{ color: 'red' }}>{error}</h5>}
          <input
            className="login-input my-3 rounded-pill border-0 p-1"
            value={name}
            onChange={(e) => setName(e.target.value)}
            type="text"
            placeholder="Name"
          />
          

          <input
            className="login-input my-3 rounded-pill border-0 p-1"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="Email"
          />

          <input
            className="login-input my-3 rounded-pill border-0 p-1"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="text"
            placeholder="Passsword"
          />
          <button
            className="my-2  btn btn-primary "
            type="submit"
            value="Register"
          >
            Submit
          </button>
        </form>
      </div>
    </section>
  )
}

export default App
