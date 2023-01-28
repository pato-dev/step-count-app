import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Button, Table, Form } from "semantic-ui-react"
import Navbar from '../../../layouts/navbar/Navbar'
import ScrollButton from '../../../ScrollButton'
// import Participants from './dummy'

const AllParticipantData = () => {
    const [records, setRecords] = useState([])

    // search guery
    const [query, setQuery] = useState("");
    const keys = ["name", "email", "gender"];
    const Search = (data) => {
        return data.filter((item) =>
            keys.some((key) => item[key].toLowerCase().includes(query))
        );
    };

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
    // Search query...
    const data = Search(records)

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
                        <Form style={{ width: "15rem" }} >
                            <Form.Field>
                                <label>Search</label>
                                <input
                                    type='text'
                                    className='search'
                                    onChange={(e) => setQuery(e.target.value.toLowerCase())}
                                    placeholder='Search...' />
                            </Form.Field>
                        </Form>
                    </div>
                    <Table celled>
                        <Table.Header>
                            <Table.Row>
                                <Table.HeaderCell>Name</Table.HeaderCell>
                                <Table.HeaderCell>Email</Table.HeaderCell>
                                <Table.HeaderCell>Phone Number</Table.HeaderCell>
                                <Table.HeaderCell>Date of Birth</Table.HeaderCell>
                                <Table.HeaderCell>Height(cm)</Table.HeaderCell>
                                <Table.HeaderCell>Gender</Table.HeaderCell>
                                <Table.HeaderCell style={{ textAlign: "center" }} >Action</Table.HeaderCell>
                            </Table.Row>
                        </Table.Header>

                        <Table.Body>
                            {data?.map((data) => {
                                return (
                                    <Table.Row key={data._id} className="odd_even-bg">
                                        <Table.Cell>{data.name}</Table.Cell>
                                        <Table.Cell>{data.email}</Table.Cell>
                                        <Table.Cell>{data.phone_number}</Table.Cell>
                                        <Table.Cell>{data.date_of_birth}</Table.Cell>
                                        <Table.Cell>{data.height}</Table.Cell>
                                        <Table.Cell>{data.gender}</Table.Cell>
                                        <Table.Cell className='action'>
                                            <Link to={`/clinical_data/${data._id}`}>
                                                <Button color='yellow' title='Add Clinical' style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}><i className="eye icon"></i></Button>
                                            </Link>
                                            <Link to={`/update-data/${data._id}`}>
                                                <Button color='green' title='Edit'><i className="edit icon"></i></Button>
                                            </Link>
                                            <Link onClick={() => deleteData(data._id)}>
                                                <Button color="red" title='Delete'><i className="trash alternate icon"></i></Button>
                                            </Link>
                                        </Table.Cell>
                                    </Table.Row>
                                )
                            })
                            }
                        </Table.Body>
                    </Table>
                </div>
                <center style={{ display: "flex", }}>
                    <Link to="/all_clinicals" className='back__btn' style={{ width: "fit-content", }}>All Clinical Data</Link>
                    <Link to="/add-participant" className='back__btn'>Back</Link>
                </center>
            </div>
            <ScrollButton />
        </>
    )
}

export default AllParticipantData