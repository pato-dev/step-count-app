import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Button, Form, TextArea } from "semantic-ui-react"
import "../create/clinicalData.css"
import { Link, useParams } from 'react-router-dom';
// import Navbar from '../../../layouts/navbar/Navbar';
// import { Link } from 'react-router-dom';

const AddClinicalData
    = () => {
        const [error, setError] = useState("")
        const [data, setData] = useState({
            visit_date: '',
            a1c: '',
            systolic_blood_pressure: '',
            height: '',
            weight: '',
            bmi: '',
            prescription: '',
        });

        const { visit_date, a1c, systolic_blood_pressure, height, weight, prescription } = data;
        const { id } = useParams()

        const handleChange = (e) => {
            setData({ ...data, [e.target.name]: e.target.value })
        }

        const bmi = (weight / (height ** 2)) * 10000

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
                {/* <Navbar /> */}
                <div className="record_cont">
                    {error && <div className='error_msg' style={{ position: "absolute", left: "33.5%", top: "19%" }}>{error}</div>}
                    <div>
                        <h1 className='record_header'>Enter Participant Result</h1>
                        <Form className='form_field'>
                            <Form.Field className='form__field-item'>
                                <label>Visit Date:</label>
                                <input
                                    type='date'
                                    name='visit_date'
                                    value={visit_date}
                                    onChange={e => handleChange(e)}
                                    placeholder='Visit date'
                                    className='input'
                                />
                            </Form.Field>
                            <Form.Field className='form__field-item'>
                                <label>HbA1c:</label>
                                <input
                                    name='a1c'
                                    value={a1c}
                                    onChange={e => handleChange(e)}
                                    placeholder='HbA1c'
                                />
                            </Form.Field>
                            <Form.Field className='form__field-item'>
                                <label>Blood Pressure:</label>
                                <input
                                    name='systolic_blood_pressure'
                                    value={systolic_blood_pressure}
                                    onChange={e => handleChange(e)}
                                    placeholder='blood_pressure'
                                />
                            </Form.Field>
                            <Form.Field className='form__field-item'>
                                <label>Weight (Kg):</label>
                                <input
                                    name='weight'
                                    value={weight}
                                    onChange={e => handleChange(e)}
                                    placeholder='Weight'
                                />
                            </Form.Field>
                            <Form.Field className='form__field-item'>
                                <label>Body Mass Index (BMI):</label>
                                <input
                                    name='bmi'
                                    value={bmi}
                                    onChange={e => handleChange(e)}
                                    placeholder='Body Mass Index'
                                />
                            </Form.Field>
                            <Form.Field className='form__field-item clinical_data-prescription'>
                                <label>Prescription:</label>
                                <TextArea
                                    name="prescription"
                                    onChange={e => handleChange(e)}
                                    value={prescription}
                                    placeholder="Enter prescription" rows='2' />
                            </Form.Field>
                            <div style={{ display: "flex", gap: "1.5rem", marginTop: "1rem" }}>
                                <Button type='submit' color='green' onClick={handleSubmit} >Submit</Button>
                                <Button type='submit' color='yellow'>
                                    <Link to='/all_clinical_data'>All Test Results</Link>
                                </Button>
                            </div>
                        </Form>
                    </div>
                </div>
            </>
        )
    }
export default AddClinicalData
