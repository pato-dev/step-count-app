import React, { useEffect, useState } from 'react'
import axios from 'axios';
import "../../css/clinicals/styles.css"
import { Link, useParams } from 'react-router-dom';
import { Button, Form } from 'semantic-ui-react'
import Navbar from '../../../layouts/navbar/Navbar'

const AddClinicalData = () => {

    const { id } = useParams()
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [height, setHeight] = useState(0)

    const initialValues = {
        name: '',
        visit_date: '',
        a1c: '',
        systolic_blood_pressure: '',
        height: '',
        weight: '',
        bmi: '',
        prescription: '',
    };
    const [formValues, setFormValues] = useState(initialValues);
    const [formErrors, setFormErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value });
    };
    const { visit_date, a1c, systolic_blood_pressure, weight, prescription } = formValues
    const getParticipantData = async () => {
        try {
            const participantData = await axios.get(`http://localhost:8080/api/participants/participant/${id}`)
            setName(participantData.data.name)
            setHeight(participantData.data.height)
            setEmail(participantData.data.email)
        } catch (error) {
            console.log(error);
        }
    }

    const bmi = parseInt((weight / (height ** 2)) * 1000)

    const handleSubmit = async (e) => {
        try {
            e.preventDefault()
            const newFormValues = { name, email, visit_date, a1c, systolic_blood_pressure, height, weight, bmi, prescription }
            console.log(newFormValues)
            const url = "http://localhost:8080/api/clinicals/add-clinical";
            await axios.post(url, newFormValues);
            window.location = '/all_clinicals'
        } catch (error) {
            if (error.response &&
                error.response.status >= 400 &&
                error.response.status <= 500
            ) {
                setFormErrors(validate(formValues));
            }
        }
    };

    useEffect(() => {
        handleSubmit()
        getParticipantData()
    });

    const validate = (values) => {
        const errors = {};
        if (!values.visit_date) {
            errors.visit_date = "Visit date is required!";
        }
        if (!values.a1c) {
            errors.a1c = "HbA1c score is required";
        } else if (values.a1c.length > 2) {
            errors.a1c = "HbA1c cannot exceed more than two characters";
        }
        if (!values.systolic_blood_pressure) {
            errors.systolic_blood_pressure = "Blood pressure is required";
        } else if (values.systolic_blood_pressure.length < 2) {
            errors.systolic_blood_pressure = "Blood pressure must be more than two characters";
        } else if (values.systolic_blood_pressure.length > 3) {
            errors.systolic_blood_pressure = "Blood pressure cannot exceed three characters";
        }

        if (!values.weight) {
            errors.weight = "Weight is required";
        }
        if (!values.prescription) {
            errors.prescription = "Prescription is required!";
        }
        return errors;
    };

    return (
        <>
            <Navbar />
            <div className="main_container">
                <div className="container">
                    <Form>
                        <h1>Add Clinical Data.</h1>
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
                            <p>{formErrors.visit_date}</p>

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
                            <p>{formErrors.a1c}</p>

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
                            <p>{formErrors.systolic_blood_pressure}</p>

                            <div className="field">
                                <label>Height (cm)</label>
                                <input
                                    type="number"
                                    name="height"
                                    placeholder="Height"
                                    value={height}
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
                            <p>{formErrors.weight}</p>

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
                            <p>{formErrors.prescription}</p>
                            <div>
                                <button className="fluid ui button blue" type='submit' onClick={handleSubmit} >Submit</button>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: ".5rem" }}>
                                    <Button>
                                        <Link to='/all_clinicals'>All Test Results</Link>
                                    </Button>
                                    <Button>
                                        <Link to='/allparticipants'>Back</Link>
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </Form>
                </div>
            </div>
        </>
    );
}
export default AddClinicalData

