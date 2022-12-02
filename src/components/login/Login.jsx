import React, { useState } from 'react'
import './login.css';
import { Link } from 'react-router-dom';
import axios from 'axios';


const Login = () => {
  const [data, setData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState("")

  const handleChange = ({ currentTarget: input }) => {
    setData({ ...data, [input.name]: input.value })
  };

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const url = "http://localhost:8080/api/auth";
      const { data: res } = await axios.post(url, data);
      localStorage.setItem("token", res.data);
      window.location = "/"
    } catch (error) {
      if (error.response &&
        error.response.status >= 400 &&
        error.response.status <= 500
      ) {
        setError(error.response.data.message)
      }
    }
  };

  return (
    <div className='login_container'>
      <h1>Google Fitness App</h1>
      <div className='login_form_container'>
        <div className='left'>
          <div className='socials'>
            <Link to=''>
              <button type='button' className='google_btn'><span><img src='./assets/Google_icon.webp' alt='google' className='google_logo' /></span> Continue with Google</button>
            </Link>
          </div>
          <div className="new_here">
            <h4>New Here?</h4>
            <Link to="/signup">
              <button className='btn create_account'>Create Account</button>
            </Link>
          </div>
        </div>
        <div className='right'>
          <form action="" className='form_container' onSubmit={handleSubmit}>
            <h2>Login to Your Account</h2>
            <input
              type="email"
              placeholder='Enter Email'
              name='email'
              value={data.email}
              required
              className='input'
              onChange={handleChange}
            />
            <input
              type="password"
              placeholder='Enter Password'
              name='password'
              value={data.password}
              required
              className='input'
              onChange={handleChange}
            />
            {error && <div className='error_msg'>{error}</div>}
            <button type='submit' className='btn green_btn' >
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Login