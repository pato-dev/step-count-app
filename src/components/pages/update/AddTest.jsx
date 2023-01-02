import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Button, Form } from "semantic-ui-react"
import { Link, useParams } from 'react-router-dom';
import Navbar from '../../layouts/navbar/Navbar';

const AddTest = () => {
    const [data, setData] = useState({
        firstName: '',
        lastName: '',
        HbA1c: '',
        glucose: ''
    });

    const { id } = useParams()
    const { firstName, lastName, HbA1c, glucose } = data;

    const handleChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value })
    }

    const getDataToUpdate = async () => {
        try {
            const updateRecord = await axios.get(`http://localhost:8080/api/records/record/${id}`)
            setData(updateRecord.data)
        } catch (error) {
            console.log(error);
        }
    }

    const sendDataToAPI = async (e) => {
        try {
            e.preventDefault()
            await axios.put(`http://localhost:8080/api/records/update/${id}`, data)
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
                <h1 className='record_header'>Update Test Result</h1>
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
                        <label>HbA1c:</label>
                        <input
                            type="number"
                            name='HbA1c'
                            value={HbA1c}
                            onChange={e => handleChange(e)}
                            placeholder='HbA1c'
                        />
                    </Form.Field>
                    <Form.Field>
                        <label>Glucose:</label>
                        <input
                            type="number"
                            name='glucose'
                            value={glucose}
                            onChange={e => handleChange(e)}
                            placeholder='Glucose level'
                        />
                    </Form.Field>
                    <Button type='submit' color='green' onClick={sendDataToAPI} className='record_btn green_btn'>
                        Update Test Result
                    </Button>
                    <Link to="/all-test-result"
                        className='back__btn'>
                        Back
                    </Link>
                </Form>
            </div>
        </>
    )
}
export default AddTest
