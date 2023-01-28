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
    // console.log(formValues)
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

    const bmi = (weight / (height ** 2)) * 1000

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
    }, []);

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
                                <label>Start Date</label>
                                <input
                                    type="date"
                                    name="start_datetime"
                                    placeholder="Start_datetime"
                                    value={start_datetime}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="field">
                                <label>End Date</label>
                                <input
                                    type="date"
                                    name="end_datetime"
                                    placeholder="End_datetime"
                                    value={End_datetime}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="field">
                                <label>Step Count</label>
                                <input
                                    type="number"
                                    name="step_count"
                                    placeholder="Step Count"
                                    value={step_count}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="field">
                                <label>Step Goal</label>
                                <input
                                    type="number"
                                    name="step_goal"
                                    placeholder="Step Goal"
                                    value={step_goal}
                                    onChange={handleChange}
                                />
                            </div>
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


