import React, { useEffect, useState } from 'react'
import axios from 'axios';
import Navbar from '../../layouts/navbar/Navbar';
import { Link, useParams } from 'react-router-dom';

const Update = () => {
    const [error, setError] = useState("")
    const [data, setData] = useState({
        firstName: '',
        lastName: '',
        score: '',
        HbA1c: '',
        meanBlood: '',
        glucose: ''
    });

    const { id } = useParams()
    const { firstName, lastName, score, HbA1c, meanBlood, glucose } = data;
    const url = `http://localhost:8080/api/records/update/${id}`

    const handleChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value })
    }

    const getAllData = async () => {
        const res = await axios.get(`http://localhost:8080/api/records/`)
        console.log(res)
    }

    const getDataToUpdate = async () => {
        const res = await axios.get(url)
        setData(res.data)
    }

    const sendDataToAPI = async (e) => {
        e.preventDefault()
        await axios.put(url, data)
        getAllData()
    }

    useEffect(() => {
        getDataToUpdate()
    }, [])

    return (
        <div>
            <Navbar />
            <div className="record_cont">
                <center className='record_header'>Record Table</center>
                <form action="" className='form_container record_form'>
                    {error && <div className='error_msg'>{error}</div>}
                    <input
                        type="text"
                        placeholder='First Name'
                        name='firstName'
                        value={firstName}
                        className='input'
                        onChange={handleChange}
                    />
                    <input
                        type="text"
                        placeholder='Last Name'
                        name='lastName'
                        value={lastName}
                        className='input'
                        onChange={handleChange}
                    />
                    <input
                        type="number"
                        placeholder='Score'
                        name='score'
                        value={score}
                        className='input'
                        onChange={handleChange}
                    />
                    <input
                        type="number"
                        placeholder='HbA1c'
                        name='HbA1c'
                        value={HbA1c}
                        className='input'
                        onChange={handleChange}
                    />
                    <input
                        type="number"
                        placeholder='meanBlood'
                        name='meanBlood'
                        value={meanBlood}
                        className='input'
                        onChange={handleChange}
                    />
                    <input
                        type="number"
                        placeholder='glucose'
                        name='glucose'
                        value={glucose}
                        className='input'
                        onChange={handleChange}
                    />
                    <button onClick={sendDataToAPI} className='record_btn green_btn'>
                        Update
                    </button>
                    <Link to="/create"
                        className=''>
                        Back
                    </Link>
                </form>
            </div>
        </div>
    )
}

export default Update
