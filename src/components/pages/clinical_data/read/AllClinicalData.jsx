import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import { Button, Form, Table } from "semantic-ui-react"
import Navbar from '../../../layouts/navbar/Navbar'
import '../../css/clinicals/styles.css'
import ScrollButton from '../../../ScrollButton'

const AllClinicalData = () => {
    const [clinicalData, setClinicalData] = useState([])

    const { id } = useParams()
    const [setName] = useState('')
    const [setEmail] = useState('')
    const [setHeight] = useState(0)

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

    const getAllData = async (req, res) => {
        try {
            await axios.get(`http://localhost:8080/api/clinicals/all-test-result`)
                .then((res) => setClinicalData(res.data))
            getParticipantData()
        } catch (error) {
            console.log(error, 'Error occured!...')
        }
    }

    // search guery
    const [query, setQuery] = useState("");
    const keys = ["name"];
    const Search = (data) => {
        return data.filter((item) =>
            keys.some((key) => item[key].toLowerCase().includes(query))
        );
    };
    const data = Search(clinicalData)

    const deleteData = async id => {
        await axios.delete(`http://localhost:8080/api/clinicals/delete/${id}`)
        getAllData()
        alert('Clinical data result removed successfully!')
    }

    useEffect(() => {
        getAllData()
    },[])

    return (
        <>
            <Navbar />
            <div className="all_container">
                <div className='table_cont'>
                    <div>
                        <center><h2>Test Result table</h2></center>
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
                                <Table.HeaderCell>Visit Date</Table.HeaderCell>
                                <Table.HeaderCell>HbA1c</Table.HeaderCell>
                                <Table.HeaderCell>Blood Pressure</Table.HeaderCell>
                                <Table.HeaderCell>Height(cm)</Table.HeaderCell>
                                <Table.HeaderCell>Weight (Kg)</Table.HeaderCell>
                                <Table.HeaderCell>BMI</Table.HeaderCell>
                                <Table.HeaderCell>Prescription</Table.HeaderCell>
                                <Table.HeaderCell style={{ textAlign: "center" }} >Action</Table.HeaderCell>
                            </Table.Row>
                        </Table.Header>

                        <Table.Body>
                            {data?.map((data) => {
                                return (
                                    <Table.Row key={data._id} className="odd_even-bg">
                                        <Table.Cell>{data.name}</Table.Cell>
                                        <Table.Cell>{data.visit_date}</Table.Cell>
                                        <Table.Cell>{data.a1c}</Table.Cell>
                                        <Table.Cell>{data.systolic_blood_pressure}</Table.Cell>
                                        <Table.Cell>{data.height}</Table.Cell>
                                        <Table.Cell>{data.weight}</Table.Cell>
                                        <Table.Cell>{data.bmi}</Table.Cell>
                                        <Table.Cell>{data.prescription}</Table.Cell>
                                        <Table.Cell className='action'>
                                            <Link to={`/clinicals/${data._id}`}>
                                                <Button color='yellow' title='Eligible' style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>Eligible</Button>
                                            </Link>
                                            <Link to={`/update-result/${data._id}`}>
                                                <Button color='green' title='Edit'><i class="edit icon"></i></Button>
                                            </Link>
                                            <Link onClick={() => deleteData(data._id)}>
                                                <Button color="red" title='Delete'><i class="trash alternate icon"></i></Button>
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
                    <Link to="/allparticipants" className='back__btn'>Back</Link>
                </center>
            </div>
            <ScrollButton />
        </>
    )
}
export default AllClinicalData