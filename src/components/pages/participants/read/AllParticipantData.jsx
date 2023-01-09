import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Button, Table, Form } from "semantic-ui-react"
import Navbar from '../../../layouts/navbar/Navbar'
import data from './dummy'

const AllParticipantData = () => {
    const [records, setRecords] = useState([])
    const [searchResults, setSearchResults] = useState([])
    // const [query, setQuery] = useState('')
    // console.log(query);

    const getAllData = async (req, res) => {
        try {
            await axios.get(`http://localhost:8080/api/participants/allparticipants`)
                .then((res) => setRecords(res.data))
        } catch (error) {
            console.log(error, 'Error occured!...')
        }
    }

    const deleteData = async id => {
        await axios.delete(`http://localhost:8080/api/participants/delete/${id}`)
        getAllData()
    }

    const handleSubmit = (e) => e.preventDefault()
    const handleSearchChange = (e) => {
        if (!e.target.value) return setSearchResults(data)

        const resultsArray = data.filter(post => post.name.includes(e.target.value) || post.email.includes(e.target.value))

        setSearchResults(resultsArray)
        console.log(resultsArray)
    }

    useEffect(() => {
        getAllData()
    }, [])
    return (
        <>
            <Navbar />
            <div className="main_continer">
                <div className='table_cont'>
                    <div>
                        <center><h2>All participants Data</h2></center>
                    </div>
                    <div>
                        <Form style={{ width: "15rem" }} onSubmit={handleSubmit} >
                            <Form.Field>
                                <label>Search</label>
                                <input
                                    type='text'
                                    className='search'
                                    onChange={handleSearchChange}
                                    placeholder='Search...' />
                            </Form.Field>
                        </Form>
                    </div>
                    <Table celled>
                        <Table.Header>
                            <Table.Row>
                                <Table.HeaderCell>S/N</Table.HeaderCell>
                                <Table.HeaderCell>Name</Table.HeaderCell>
                                <Table.HeaderCell>Email</Table.HeaderCell>
                                <Table.HeaderCell>Phone Number</Table.HeaderCell>
                                <Table.HeaderCell>Date of Birth</Table.HeaderCell>
                                <Table.HeaderCell>Height</Table.HeaderCell>
                                <Table.HeaderCell>Gender</Table.HeaderCell>
                                <Table.HeaderCell style={{ textAlign: "center" }} >Action</Table.HeaderCell>
                            </Table.Row>
                        </Table.Header>

                        <Table.Body>
                            {data.map((data) => {
                                return (
                                    <Table.Row key={data.id} className="odd_even-bg">
                                        <Table.Cell>{data.id}</Table.Cell>
                                        <Table.Cell>{data.name}</Table.Cell>
                                        <Table.Cell>{data.email}</Table.Cell>
                                        <Table.Cell>{data.phone_number}</Table.Cell>
                                        <Table.Cell>{data.date_of_birth}</Table.Cell>
                                        <Table.Cell>{data.height}</Table.Cell>
                                        <Table.Cell>{data.gender}</Table.Cell>
                                        <Table.Cell className='action'>
                                            <Link to={`/clinical_data`}>
                                                <Button color='yellow'>Add Result</Button>
                                            </Link>
                                            <Link to={`/update-data/${data.id}`}>
                                                <Button color='green'>Update</Button>
                                            </Link>
                                            <Link onClick={() => deleteData(data.id)}>
                                                <Button color="red">Delete</Button>
                                            </Link>
                                        </Table.Cell>
                                    </Table.Row>
                                )
                            })
                            }
                        </Table.Body>
                    </Table>
                </div>
                <center style={{ marginTop: "2rem", display: "flex" }}>
                    <Link to="/all_clinical_data" className='back__btn'>All Clinical Data</Link>
                    <Link to="/add-participant" className='back__btn'>Back</Link>
                </center>
            </div>
        </>
    )
}

export default AllParticipantData