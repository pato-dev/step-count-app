import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Button, Form } from "semantic-ui-react"
import "./addParticipant.css"
import { Link } from 'react-router-dom';
import Navbar from '../../../layouts/navbar/Navbar';

const AddParticipant = () => {
    const [error, setError] = useState('')
    const [data, setData] = useState({
        name: '',
        email: '',
        phone_number: '',
        date_of_birth: '',
        gender: '',
        height: '',
    });

    const { name, email, phone_number, date_of_birth, gender, height } = data;

    const handleChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const url = "http://localhost:8080/api/participants/add-patient";
            const { data: res } = await axios.post(url, data);
            window.location = '/allparticipants'
        } catch (error) {
            if (error.response &&
                error.response.status >= 400 &&
                error.response.status <= 500
            ) {
                setError(error.response.data.message)
            }
        }
    };

    useEffect(() => {
        handleSubmit()
    }, [])

    return (
        <>
            <Navbar />
            <div className="participant_cont">
                {error && <div className='error_msg' style={{ position: "absolute", left: '33.6%', width: "30rem", top: '6rem' }}>{error}</div>}
                <div>
                    <h1 className='participant_header'>Add New Participant</h1>
                    <Form className='form_field'>
                        <Form.Field>
                            <label>Full Name:</label>
                            <input
                                name='name'
                                value={name}
                                onChange={e => handleChange(e)}
                                placeholder='Enter full name'
                            />
                        </Form.Field>
                        <Form.Field>
                            <label>Email:</label>
                            <input
                                name='email'
                                value={email}
                                onChange={e => handleChange(e)}
                                placeholder='Email'
                            />
                        </Form.Field>
                        <Form.Field>
                            <label>Phone Number:</label>
                            <input
                                name='phone_number'
                                value={phone_number}
                                onChange={e => handleChange(e)}
                                placeholder='Enter Phone number'
                            />
                        </Form.Field>
                        <Form.Field>
                            <label>Date of Birth:</label>
                            <input
                                type='date'
                                name='date_of_birth'
                                value={date_of_birth}
                                onChange={e => handleChange(e)}
                                placeholder='Enter DOB'
                            />
                        </Form.Field>
                        <Form.Field>
                            <label>Height:</label>
                            <input
                                name='height'
                                value={height}
                                onChange={e => handleChange(e)}
                                placeholder='Enter height'
                            />
                        </Form.Field>
                        <Form.Field className='gender__form-field'>
                            <label>Gender:</label>
                            <select name="gender" onChange={e => handleChange(e)}>
                                <option value=""></option>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                            </select>
                        </Form.Field>
                        <div style={{ display: "flex", gap: "5rem", marginBottom: "1rem" }}>
                            <Button type='submit' color='green' onClick={handleSubmit} >Submit</Button>
                            <Button type='submit' color='yellow'>
                                <Link to='/allparticipants'>All Participant</Link>
                            </Button>
                        </div>
                    </Form>
                </div>
            </div>
        </>
    )
}
export default AddParticipant