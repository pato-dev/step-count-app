import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Button, Form } from "semantic-ui-react"
import { Link, useParams } from 'react-router-dom';
import Navbar from '../../../layouts/navbar/Navbar';

const UpdatePatientData = () => {
    const [data, setData] = useState({
        firstName: '',
        lastName: '',
        phone: '',
    });

    const { id } = useParams()
    const { firstName, lastName, phone } = data;

    const handleChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value })
    }

    const getDataToUpdate = async () => {
        try {
            const updateRecord = await axios.get(`http://localhost:8080/api/patients/patient/${id}`)
            setData(updateRecord.data)
        } catch (error) {
            console.log(error);
        }
    }

    const sendDataToAPI = async (e) => {
        try {
            e.preventDefault()
            await axios.put(`http://localhost:8080/api/patients/update/${id}`, data)
            window.location = '/allpatients'
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
                <h1 className='record_header'>Update Record</h1>
                <Form className='form_field'>
                    <Form.Field>
                        <label>First Name:</label>
                        <input
                            type="text"
                            name='firstName'
                            value={firstName}
                            onChange={e => handleChange(e)}
                            placeholder='First Name'
                        />
                    </Form.Field>
                    <Form.Field>
                        <label>Last Name:</label>
                        <input
                            type="text"
                            name='lastName'
                            value={lastName}
                            onChange={e => handleChange(e)}
                            placeholder='Last Name'
                        />
                    </Form.Field>
                    <Form.Field>
                        <label>Phone Number:</label>
                        <input
                            name='phone'
                            value={phone}
                            onChange={e => handleChange(e)}
                            placeholder='Enter Phone number'
                        />
                    </Form.Field>
                    <div style={{ display: 'flex', }}>
                        <Button type='submit' color='green' onClick={sendDataToAPI}>
                            Update
                        </Button>
                        <Button color='yellow'>
                            <Link to="/allpatients">
                                Back
                            </Link>
                        </Button>
                    </div>

                </Form>
            </div>
        </>
    )
}
export default UpdatePatientData
