import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Button, Form } from "semantic-ui-react"
import { Link, useParams } from 'react-router-dom';
import Navbar from '../../../layouts/navbar/Navbar';
import '../../css/clinicals/styles.css'

const UpdateClinicalData = () => {
    const { id } = useParams()

    const [data, setData] = useState({
        name: '',
        visit_date: '',
        a1c: '',
        systolic_blood_pressure: '',
        height: '',
        weight: '',
        bmi: '',
        prescription: '',
    });

    const { name, visit_date, a1c, systolic_blood_pressure, height, weight, prescription } = data;

    const bmi = parseInt((weight / (height ** 2)) * 1000)

    const handleChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value })
    }

    const getDataToUpdate = async () => {
        try {
            const updateRecord = await axios.get(`http://localhost:8080/api/clinicals/clinical_data/${id}`)
            setData(updateRecord.data)
            console.log(updateRecord.data)

        } catch (error) {
            console.log(error);
        }
    }

    const sendDataToAPI = async (e) => {
        try {
            e.preventDefault()
            const data = { name, visit_date, a1c, systolic_blood_pressure, height, weight, bmi, prescription }
            await axios.put(`http://localhost:8080/api/clinicals/update-result/${id}`, data)
            window.location = '/all_clinicals'
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
            <div className="main_container">
                <div className="container">
                    <Form>
                        <h1>Update Clinical Data.</h1>
                        <div className="ui form">
                            <div className="field">
                                <label>Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    placeholder="Name"
                                    value={name}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="field">
                                <label>Visit Date</label>
                                <input
                                    type="date"
                                    name="visit_date"
                                    placeholder="Visit_date"
                                    value={visit_date}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="field">
                                <label>HaB1c</label>
                                <input
                                    type="number"
                                    name="a1c"
                                    placeholder="HaB1c"
                                    value={a1c}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="field">
                                <label>Blood Pressure</label>
                                <input
                                    type="number"
                                    name="systolic_blood_pressure"
                                    placeholder="Blood pressure"
                                    value={systolic_blood_pressure}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="field">
                                <label>Height (cm)</label>
                                <input
                                    type="number"
                                    name="height"
                                    placeholder="Height"
                                    value={height}
                                // onChange={handleChange}
                                />
                            </div>

                            <div className="field">
                                <label>Weight (Kg)</label>
                                <input
                                    type="number"
                                    name="weight"
                                    placeholder="Weight"
                                    value={weight}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="field">
                                <label>Body Mass Index</label>
                                <input
                                    type="number"
                                    name="bmi"
                                    placeholder="Body mass index"
                                    value={bmi}
                                />
                            </div>

                            <div className="field">
                                <label>Prescription</label>
                                <textarea
                                    type="text"
                                    name="prescription"
                                    placeholder="Prescription"
                                    value={prescription}
                                    rows={4}
                                    onChange={handleChange}
                                />
                            </div>
                            <div>
                                <button className="fluid ui button blue" type='submit' onClick={sendDataToAPI} >Submit</button>
                                <Button style={{ marginTop: ".5rem" }}>
                                    <Link to='/all_clinicals'>Clinicals</Link>
                                </Button>
                            </div>
                        </div>
                    </Form>
                </div>
            </div>
        </>
    )
}
export default UpdateClinicalData