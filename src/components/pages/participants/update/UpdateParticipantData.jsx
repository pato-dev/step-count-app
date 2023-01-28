import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Button, Form } from "semantic-ui-react"
import { Link, useParams } from 'react-router-dom';
import Navbar from '../../../layouts/navbar/Navbar';

const UpdateParticipantData = () => {

    const { id } = useParams()
    const [data, setData] = useState({
        name: '',
        email: '',
        phone_number: '',
        date_of_birth: '',
        gender: '',
    });

    const { name, email, phone_number, date_of_birth, gender, height } = data;

    const handleChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value })
    }

    const getDataToUpdate = async () => {
        try {
            const updateRecord = await axios.get(`http://localhost:8080/api/participants/participant/${id}`)
            setData(updateRecord.data)
        } catch (error) {
            console.log(error);
        }
    }

    const sendDataToAPI = async (e) => {
        try {
            e.preventDefault()
            await axios.put(`http://localhost:8080/api/participants/update-data/${id}`, data)
            window.location = '/allparticipants'
        } catch (error) {
            console.log(error, "Unable to update record!");
        }
    }

    useEffect(() => {
        getDataToUpdate()
    }, [])

    return (
        <>
            <Navbar />
            <div className="record_cont">
                <h1 className='record_header'>Update Participant</h1>
                <Form className='form_field'>
                    <Form.Field>
                        <label>Full Name:</label>
                        <input
                            type='text'
                            name='name'
                            value={name}
                            onChange={e => handleChange(e)}
                            placeholder='Enter full name'
                        />
                    </Form.Field>
                    <Form.Field>
                        <label>Email:</label>
                        <input
                            type='email'
                            name='email'
                            value={email}
                            onChange={e => handleChange(e)}
                            placeholder='Email'
                        />
                    </Form.Field>
                    <Form.Field>
                        <label>Phone Number:</label>
                        <input
                            type='number'
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
                            type='number'
                            name='height'
                            value={height}
                            onChange={e => handleChange(e)}
                            placeholder='Enter height'
                        />
                    </Form.Field>
                    <Form.Field className='gender__form-field'>
                        <label>Gender:</label>
                        <select name="gender" value={gender} onChange={e => handleChange(e)}>
                            <option value=""></option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                        </select>
                    </Form.Field>
                    <div style={{ display: 'flex', }}>
                        <Button type='submit' color='green' onClick={sendDataToAPI}>
                            Update
                        </Button>
                        <Button color='yellow'>
                            <Link to="/allparticipants">
                                Back
                            </Link>
                        </Button>
                    </div>
                </Form>
            </div>
        </>
    )
}
export default UpdateParticipantData
