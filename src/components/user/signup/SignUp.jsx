import React, { useState } from 'react'
import './signup.css';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Policy from '../../pages/privacy/Policy';

const SignUp = () => {
    const [policyOpen, setPolicyOpen] = useState(true)

    const [isDisabled, setIsDisabled] = useState(true)
    const [checked] = useState(false)

    const canBeSubmitted = () => {
        return checked ? setIsDisabled(true) : setIsDisabled(false)
    }

    const onCheckboxClick = () => {
        setPolicyOpen(!policyOpen)
        return canBeSubmitted()
    }

    const [error, setError] = useState("")
    const navigate = useNavigate();

    const [data, setData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        gender: '',
        role: '',
        password: '',
    });

    const handleChange = ({ currentTarget: input }) => {
        setData({ ...data, [input.name]: input.value })
    };


    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const url = "http://localhost:8080/api/users";
            const { data: res } = await axios.post(url, data);
            navigate('/')
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
                        <center>
                            <h1>Create Account</h1>
                        </center>
                        <div className='policy'>
                            <span onClick={() => { setPolicyOpen(!policyOpen) }}>
                                {""}
                            </span>
                            <div className="cont">
                                {policyOpen && <Policy setPolicyOpen={setPolicyOpen} onCheckboxClick={onCheckboxClick} />}
                            </div>
                        </div>
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
                            type="phone"
                            placeholder='Phone'
                            name='phone'
                            value={data.phone}
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

                        <div className='input'>
                            <label>Gender:</label>
                            <select name="gender" onChange={e => handleChange(e)}>
                                <option value=""></option>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                                <option value="others">Other</option>
                            </select>
                        </div>
                        <div className='input'>
                            <label>Roles:</label>
                            <select name="role" onChange={e => handleChange(e)}>
                                <option value=""></option>
                                <option value="1">Patient</option>
                                <option value="2">Doctor</option>
                                <option value="3">Admin</option>
                            </select>
                        </div>
                        <center>
                            <button disabled={isDisabled} onClick={handleSubmit} className='green_btn'>
                                Create Account
                            </button>
                        </center>

                    </form>
                </div>
            </div >
        </div >
    )
}

export default SignUp