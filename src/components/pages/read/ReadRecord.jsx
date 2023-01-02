import React, { useState, useEffect } from 'react';
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { Button, Table } from 'semantic-ui-react';
import Navbar from '../../layouts/navbar/Navbar';

const ReadRecord = () => {
    const { id } = useParams()

    const [data, setData] = useState({
        firstName: '',
        lastName: '',
        score: '',
        HbA1c: '',
        glucose: ''
    });
    const { firstName, lastName, score, HbA1c, glucose } = data;

    const getData = async () => {
        try {
            const res = await axios.get(`http://localhost:8080/api/records/record/${id}`)
            setData(res.data)
        } catch (error) {
            console.log(error, 'Error occured!...')
        }
    }

    useEffect(() => {
        getData()
    })

    return (
        <>
            <Navbar />
            <div className='table_cont'>
                <div style={{ margin: "3rem 0" }}>
                    <center>
                        <h1><i style={{ color: "blue" }}>{firstName} {lastName}'s</i> Record.</h1>
                    </center>
                </div>
                <Table celled>
                    <Table.Header className='t_header'>
                        <Table.Row>
                            <Table.HeaderCell>Total Step</Table.HeaderCell>
                            <Table.HeaderCell>GLUCOSE mmol/L</Table.HeaderCell>
                            <Table.HeaderCell>HbA1c Result</Table.HeaderCell>
                            <Table.HeaderCell>Eligible for Payment</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>

                    <Table.Body>
                        <Table.Row className="odd_even-bg">
                            <Table.Cell>{score}</Table.Cell>
                            <Table.Cell>{HbA1c}</Table.Cell>
                            <Table.Cell>{glucose}</Table.Cell>
                        </Table.Row>
                    </Table.Body>
                </Table>
            </div>
            <center style={{ "marginTop": "20px" }}>
                <Link to={"/all-test-result"}>
                    <Button className='back__btn'>Back</Button>
                </Link>
            </center>
        </>
    )
}

export default ReadRecord