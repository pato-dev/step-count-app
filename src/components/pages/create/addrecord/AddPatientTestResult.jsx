import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Button, Form } from "semantic-ui-react"
import "../addpatient/addPatient.css"
import { Link, useParams } from 'react-router-dom';
import Navbar from '../../../layouts/navbar/Navbar';
// import { Link } from 'react-router-dom';

const AddPatientTestResult
    = () => {
        const [error, setError] = useState("")
        const [data, setData] = useState({
            firstName: '',
            lastName: '',
            HbA1c: '',
            glucose: ''
        });

        const { firstName, lastName, HbA1c, glucose } = data;
        const { id } = useParams()

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

        const handleSubmit = async (e) => {
            e.preventDefault()
            try {
                const url = "http://localhost:8080/api/records/add-record";
                const { data: res } = await axios.post(url, data);
                console.log(res.message)
                window.location = '/all-test-result'
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
            getDataToUpdate()
        }, [])

        return (
            <>
                <Navbar />
                <div className="record_cont">
                    {error && <div className='error_msg' style={{ position: "absolute", left: "33.5%", top: "19%" }}>{error}</div>}
                    <div>
                        <h1 className='record_header'>Enter Patient Test Result</h1>
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
                                <label>HbA1c:</label>
                                <input
                                    name='HbA1c'
                                    value={HbA1c}
                                    onChange={e => handleChange(e)}
                                    placeholder='Enter HbA1c result'
                                />
                            </Form.Field>
                            <Form.Field>
                                <label>Glucose:</label>
                                <input
                                    name='glucose'
                                    value={glucose}
                                    onChange={e => handleChange(e)}
                                    placeholder='Enter Glucose result'
                                />
                            </Form.Field>
                            <div style={{ display: "flex", gap: "1.5rem", marginTop: "1rem" }}>
                                <Button type='submit' color='green' onClick={handleSubmit} >Submit</Button>
                                <Button type='submit' color='yellow'>
                                    <Link to='/allpatients'>All Patients Data</Link>
                                </Button>

                                <Button type='submit' color='yellow'>
                                    <Link to='/all-test-result'>All Test Results</Link>
                                </Button>
                            </div>
                        </Form>
                    </div>
                </div>
            </>
        )
    }
export default AddPatientTestResult
