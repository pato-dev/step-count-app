import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Button, Form,TextArea } from "semantic-ui-react"
import { Link, useParams } from 'react-router-dom';
import Navbar from '../../../layouts/navbar/Navbar';

const UpdateClinicalData = () => {
    const [data, setData] = useState({
        visit_date: '',
        a1c: '',
        systolic_blood_pressure: '',
        height: '',
        weight: '',
        bmi: '',
        prescription: '',
    });

    const { visit_date, a1c, systolic_blood_pressure, height, weight,bmi, prescription } = data;
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

    const sendDataToAPI = async (e) => {
        try {
            e.preventDefault()
            await axios.put(`http://localhost:8080/api/records/update-result/${id}`, data)
            window.location = '/all-test-result'
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
                        <Button type='submit' color='green' onClick={sendDataToAPI} >Submit</Button>
                        <Button type='submit' color='yellow'>
                            <Link to='/allpatients'>All Patients Data</Link>
                        </Button>
                        <Button type='submit' color='yellow'>
                            <Link to='/all-test-result'>All Test Results</Link>
                        </Button>
                    </div>
                </Form>
            </div>
            {/* <div style={{ display: "flex", justifyContent: "space-between" }}>
                <Button type='submit' color='green' onClick={sendDataToAPI} className='record_btn green_btn'>
                    Update
                </Button>
                <Button color='yellow'>
                    <Link to='/all-test-result'>
                        Back
                    </Link>
                </Button>
            </div> */}
        </>
    )
}
export default UpdateClinicalData
