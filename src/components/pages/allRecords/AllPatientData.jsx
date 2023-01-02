import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Button, Table,Form } from "semantic-ui-react"
import Navbar from '../../layouts/navbar/Navbar'

const AllPatientData = () => {
    const [records, setRecords] = useState([])
    const [searchResults, setSearchResults] = useState([])
    // const [query, setQuery] = useState('')
    // console.log(query);

    const getAllData = async (req, res) => {
        try {
            await axios.get(`http://localhost:8080/api/patients/allpatients`)
                .then((res) => setRecords(res.data))
        } catch (error) {
            console.log(error, 'Error occured!...')
        }
    }

    const deleteData = async id => {
        await axios.delete(`http://localhost:8080/api/patients/delete/${id}`)
        getAllData()
    }

    const handleSubmit = (e) => e.preventDefault()
    // const handleSearchChange = (e) => {
    //     if (!e.target.value) return setSearchResults(records)

    //     const resultsArray = records.filter(post => post.firstName.includes(e.target.value) || post.lastName.includes(e.target.value))

    //     setSearchResults(resultsArray)
    //     console.log(resultsArray)
    // }

    useEffect(() => {
        getAllData()
    }, [])
    return (
        <>
            <Navbar />
            <div className="main_continer">
                <div className='table_cont'>
                    <div>
                        <center><h2>All Patient Data</h2></center>
                    </div>
                    <div>
                        <Form style={{ width: "15rem" }} onSubmit={handleSubmit} >
                            <Form.Field>
                                <label>Search</label>
                                <input
                                    type='text'
                                    className='search'
                                    // onChange={handleSearchChange}
                                    placeholder='Search...' />
                            </Form.Field>
                        </Form>
                    </div>
                    <Table celled>
                        <Table.Header>
                            <Table.Row>
                                <Table.HeaderCell>S/N</Table.HeaderCell>
                                <Table.HeaderCell>First Name</Table.HeaderCell>
                                <Table.HeaderCell>Last Name</Table.HeaderCell>
                                <Table.HeaderCell>Phone Number</Table.HeaderCell>
                                <Table.HeaderCell>Gender</Table.HeaderCell>
                                <Table.HeaderCell style={{ textAlign: "center" }} >Action</Table.HeaderCell>
                            </Table.Row>
                        </Table.Header>

                        <Table.Body>
                            {records.map((data) => {
                                return (
                                    <Table.Row key={data._id} className="odd_even-bg">
                                        <Table.Cell>{data._id}</Table.Cell>
                                        <Table.Cell>{data.firstName}</Table.Cell>
                                        <Table.Cell>{data.lastName}</Table.Cell>
                                        <Table.Cell>{data.phone}</Table.Cell>
                                        <Table.Cell>{data.gender}</Table.Cell>
                                        <Table.Cell className='action'>
                                            <Link to={`/record`}>
                                                <Button color='yellow'>Add Result</Button>
                                            </Link>
                                            <Link to={`/update-data/${data._id}`}>
                                                <Button color='green'>Update</Button>
                                            </Link>
                                            <Link onClick={() => deleteData(data._id)}>
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
                <center style={{ marginTop: "2rem" }}>
                    <Link to="/add-patient" className='back__btn'>Back</Link>
                </center>
            </div>
        </>
    )
}

export default AllPatientData