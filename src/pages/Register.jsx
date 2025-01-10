import React, { useState } from 'react'
import {Link , useNavigate} from 'react-router-dom'
import axios from 'axios'

const Register = () => {

  const [userData, setUserData]  = useState({
    name: '',
    email: '',
    password: '',
    password2: ''
  })

  const [error , setError] = useState("")
  const navigate = useNavigate()


  const changeInputHandler = (e) => {
    setUserData(prevState => {
      return {...prevState, [e.target.name]: e.target.value}
    })
  }

  const registerUser = async (e) => {
    e.preventDefault()
    setError('')
    try {
      console.log(userData)
      const response = await axios.post(`${import.meta.env.VITE_REACT_APP_BASE_URL}/users/register` , userData)
      const newUser = await response.data
      console.log(newUser)
      if(!newUser) {
        setError("couldn't register user. Please try again")
      }
      navigate('/login')
    } catch (err) {
      setError(err?.response?.data?.message)
    }
  }

  return (
    <section className='register'>
      <div className="container">
        <h2>Sign Up</h2>
        <form className="form register__form" onSubmit={registerUser}>
          {error && <p className="form__error-message">{error}</p>}
          <input type="text" placeholder='Full Name' name='name' value={userData.name} onChange={changeInputHandler}/>
          <input type="text" placeholder='youremail@gmail.com' name='email' value={userData.email} onChange={changeInputHandler}/>
          <input type="password" placeholder='enter password' name='password' value={userData.password} onChange={changeInputHandler}/>
          <input type="password" placeholder='Confirm password' name='password2' value={userData.password2} onChange={changeInputHandler}/>

          <button type="submit" className='btn primary'>Register</button>

        </form>
        <small>Already Have An Account? <Link to='/login'>Sign In</Link></small>
      </div>
    </section>
  )
}

export default Register