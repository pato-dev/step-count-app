import React, { useState } from 'react'
import './login.css';
import { Link } from 'react-router-dom';
import axios from 'axios';
import GoogleIcon from '../../assets/Google_Icon.webp'

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
      window.location = "/";
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
      <h1 style={{ marginTop: "2rem" }}>Fitness App</h1>
      <div className='login_form_container'>
        <div className='left'>
          <div className='socials'>
            <Link to=''>
              <button type='button' className='google_btn'>
                <span><img src={GoogleIcon} className='google_logo' alt='google icon' /></span> Continue with Google</button>
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
          <form action="" className='form_container'>
            <h2>Login to Your Account</h2>
            {error && <div className='error_msg'>{error}</div>}
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
            <button onClick={handleSubmit} className='btn green_btn' >
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Login