import React, { useEffect, useState } from 'react'
// import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../../layouts/navbar/Navbar';
import { Link, useParams } from 'react-router-dom';
import { Button, Table } from "semantic-ui-react"
import "./createUserRecord.css"

const CreateUser = () => {
    const [error, setError] = useState("")
    // const navigate = useNavigate();
    const [records, setRecords] = useState([])
    const { id } = useParams()

    const [data, setData] = useState({
        firstName: '',
        lastName: '',
        score: '',
        HbA1c: '',
        meanBlood: '',
        glucose: ''
    });

    const { firstName, lastName, score, HbA1c, meanBlood, glucose } = data;

    const handleChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value })
    }

    const getAllData = async () => {
        try {
            await axios.get("http://localhost:8080/api/records/")
                .then((res) => setRecords(res.data))
            console.log(records)
        } catch (error) {
            console.log(error, 'Error occured!...')
        }
    }

    const deleteData = async id => {
        await axios.delete(`http://localhost:8080/api/records/delete/${id}`)
        getAllData()
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const url = "http://localhost:8080/api/records/create";
            const { data: res } = await axios.post(url, data);
            // navigate('/')
            console.log(res.message)
            res.save()
            window.location.reload()
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
        getAllData()
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
                        required
                        className='input'
                        onChange={handleChange}
                    />
                    <input
                        type="text"
                        placeholder='Last Name'
                        name='lastName'
                        value={lastName}
                        required
                        className='input'
                        onChange={handleChange}
                    />
                    <input
                        type="number"
                        placeholder='Score'
                        name='score'
                        value={score}
                        required
                        className='input'
                        onChange={handleChange}
                    />
                    <input
                        type="number"
                        placeholder='HbA1c'
                        name='HbA1c'
                        value={HbA1c}
                        required
                        className='input'
                        onChange={handleChange}
                    />
                    <input
                        type="number"
                        placeholder='meanBlood'
                        name='meanBlood'
                        value={meanBlood}
                        required
                        className='input'
                        onChange={handleChange}
                    />
                    <input
                        type="number"
                        placeholder='glucose'
                        name='glucose'
                        value={glucose}
                        required
                        className='input'
                        onChange={handleChange}
                    />
                    <button onClick={handleSubmit} className='record_btn green_btn'>
                        Add record
                    </button>
                </form>
            </div>
            <div className='table_cont'>
                <Table celled>
                    <Table.Header className='t_header'>
                        <Table.Row>
                            <Table.HeaderCell className='t_header-item'>S/N</Table.HeaderCell>
                            <Table.HeaderCell className='t_header-item'>First Name</Table.HeaderCell>
                            <Table.HeaderCell className='t_header-item'>Last Name</Table.HeaderCell>
                            <Table.HeaderCell className='t_header-item'>Total Step</Table.HeaderCell>
                            <Table.HeaderCell className='t_header-item'>HbA1c Test Score</Table.HeaderCell>
                            <Table.HeaderCell className='t_header-item'>MEAN BLOOD mg/dL</Table.HeaderCell>
                            <Table.HeaderCell className='t_header-item'>GLUCOSE mmol/L</Table.HeaderCell>
                            <Table.HeaderCell className='t_header-item'>Action</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>

                    <Table.Body>
                        {records.map((data) => {
                            return (
                                <Table.Row key={data._id} className="odd_even-bg">
                                    <Table.Cell className='t_body-data'>{data._id}</Table.Cell>
                                    <Table.Cell className='t_body-data'>{data.firstName}</Table.Cell>
                                    <Table.Cell className='t_body-data'>{data.lastName}</Table.Cell>
                                    <Table.Cell className='t_body-data'>{data.score}</Table.Cell>
                                    <Table.Cell className='t_body-data'>{data.HbA1c}</Table.Cell>
                                    <Table.Cell className='t_body-data'>{data.meanBlood}</Table.Cell>
                                    <Table.Cell className='t_body-data'>{data.glucose}</Table.Cell>
                                    <Table.Cell className='action'>
                                        <Link to={`/record/${data._id}`}>
                                            <Button>Detail</Button>
                                        </Link>
                                        <Link to={`/update/${data._id}`}>
                                            <Button color='green'>Update</Button>
                                        </Link>
                                        <Link onClick={() => deleteData(data._id)}>
                                            <Button className='delete'>Delete</Button>
                                        </Link>
                                    </Table.Cell>
                                </Table.Row>
                            )
                        })
                        }
                    </Table.Body>
                </Table>
            </div>
        </div>
    )
}

export default CreateUser
