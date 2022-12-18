import React, { useState, useEffect } from 'react';
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import Navbar from '../../layouts/navbar/Navbar';
import { Button, Table } from 'semantic-ui-react';

const User = () => {
    const { id } = useParams()

    const [data, setData] = useState({
        firstName: '',
        lastName: '',
        score: '',
        HbA1c: '',
        meanBlood: '',
        glucose: ''
    });

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
        <div>
            <Navbar />
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
                            <Table.HeaderCell className='t_header-item'>Eligible for Payment</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>

                    <Table.Body>
                        <Table.Row className="odd_even-bg">
                            <Table.Cell className='t_body-data'>{data._id}</Table.Cell>
                            <Table.Cell className='t_body-data'>{data.firstName}</Table.Cell>
                            <Table.Cell className='t_body-data'>{data.lastName}</Table.Cell>
                            <Table.Cell className='t_body-data'>{data.score}</Table.Cell>
                            <Table.Cell className='t_body-data'>{data.HbA1c}</Table.Cell>
                            <Table.Cell className='t_body-data'>{data.meanBlood}</Table.Cell>
                            <Table.Cell className='t_body-data'>{data.glucose}</Table.Cell>
                        </Table.Row>
                    </Table.Body>
                </Table>
            </div>
            <center style={{"marginTop":"20px"}}>
                <Link to={"/create"}>
                    <Button>Back</Button>
                </Link>
            </center>

        </div>
    );
};
export default User;

