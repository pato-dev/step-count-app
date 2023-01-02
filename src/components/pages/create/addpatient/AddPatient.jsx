import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Button, Form } from "semantic-ui-react"
import "../addpatient/addPatient.css"
import { Link } from 'react-router-dom';
import Navbar from '../../../layouts/navbar/Navbar';
// import { Link } from 'react-router-dom';

const AddPatient = () => {
    const [error, setError] = useState('')
    const [data, setData] = useState({
        firstName: '',
        lastName: '',
        gender: '',
        phone: '',
    });

    const { firstName, lastName, phone } = data;

    const handleChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const url = "http://localhost:8080/api/patients/add-patient";
            const { data: res } = await axios.post(url, data);
            console.log(res.message)
            window.location = '/allpatients'
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
            <div className="record_cont">
                {error && <div className='error_msg' style={{ position: "absolute", left: "33.5%", top: "19%" }}>{error}</div>}
                <div>
                    <h1 className='record_header'>Add New Patient</h1>
                    <Form className='form_field'>
                        <Form.Field>
                            <label>First Name:</label>
                            <input
                                name='firstName'
                                value={firstName}
                                onChange={e => handleChange(e)}
                                placeholder='First Name'
                            />
                        </Form.Field>
                        <Form.Field>
                            <label>Last Name:</label>
                            <input
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
                        <Form.Field className='gender__form-field'>
                            <label>Gender:</label>
                            <select name="gender" onChange={e => handleChange(e)}>
                                <option value="">Choose gender</option>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                                <option value="others">Other</option>
                            </select>
                        </Form.Field>
                        <div style={{ display: "flex", gap: "5rem", marginTop: "3rem" }}>
                            <Button type='submit' color='green' onClick={handleSubmit} >Submit</Button>
                            <Button type='submit' color='yellow'>
                                <Link to='/allpatients'>Patients Record</Link>
                            </Button>
                        </div>
                    </Form>
                </div>
            </div>
        </>
    )
}
export default AddPatient