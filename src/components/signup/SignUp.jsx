import React, { useState } from 'react'
import './signup.css';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Policy from '../privacy/Policy';


const SignUp = () => {

    const [policyOpen, setPolicyOpen] = useState(false)

    const [data, setData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
    });
    const [error, setError] = useState("")

    const navigate = useNavigate();

    const handleChange = ({ currentTarget: input }) => {
        setData({ ...data, [input.name]: input.value })
    };

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const url = "http://localhost:8080/api/users";
            const { data: res } = await axios.post(url, data);
            navigate('/login')
            console.log(res.message)
            res.save()
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
        <div className='signup_container'>
            <div className='signup_form_container'>
                <div className='left'>
                    <h1>Welcome Back</h1>
                    <Link to='/login'>
                        <button type='button' className='white_btn'>Login</button>
                    </Link>
                </div>
                <div className='right'>
                    <form action="" className='form_container'>
                        <h1>Create Account</h1>
                        {error && <div className='error_msg'>{error}</div>}
                        <input
                            type="text"
                            placeholder='First Name'
                            name='firstName'
                            value={data.firstName}
                            required
                            className='input'
                            onChange={handleChange}
                        />
                        <input
                            type="text"
                            placeholder='Last Name'
                            name='lastName'
                            value={data.lastName}
                            required
                            className='input'
                            onChange={handleChange}
                        />
                        <input
                            type="email"
                            placeholder='Email'
                            name='email'
                            value={data.email}
                            required
                            className='input'
                            onChange={handleChange}
                        />
                        <input
                            type="password"
                            placeholder='Password'
                            name='password'
                            value={data.password}
                            required
                            className='input'
                            onChange={handleChange}
                        />
                        <div className='policy'>
                            <span>
                                Accept policy?
                            </span>
                            <span className="openModalBtn"
                                onClick={() => {
                                    setPolicyOpen(!policyOpen);
                                }}>
                                <button className='btn policy_btn'>Click here</button>
                            </span>
                            <div className="cont">
                                {policyOpen && <Policy setPolicyOpen={setPolicyOpen} />}
                            </div>
                        </div>

                        <button onClick={handleSubmit} className='green_btn' >
                            Create Account
                        </button>
                    </form>
                </div>
            </div >
        </div >
    )
}

export default SignUp