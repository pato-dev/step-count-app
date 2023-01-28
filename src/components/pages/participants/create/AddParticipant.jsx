
// ------- Main code Start------
import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Button, Form } from "semantic-ui-react"
import "../../css/participants/styles.css"
import { Link } from 'react-router-dom';
import Navbar from '../../../layouts/navbar/Navbar';

const AddParticipant = () => {
    const [error, setError] = useState({})
    const initialValues = {
        name: '',
        email: '',
        phone_number: '',
        date_of_birth: '',
        gender: '',
        height: '',
    }
    const [data, setData] = useState(initialValues);

    const handleChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value })
    }

    const { name, email, phone_number, date_of_birth, height, gender } = data;

    const handleSubmit = async (event) => {
        try {
            event.preventDefault()
            if (name !== ''&& email !=='' && phone_number !=='' && date_of_birth !=='' && height !=='' && gender !=='') {
                const url = "http://localhost:8080/api/participants/add-participant";
                const {data:res} = await axios.post(url,data);
                console.log(res)
                window.location = '/allparticipants'
            } else {
                alert('Imput field can not be empty!')
            }
            
        } catch (error) {
            if (error.response &&
                error.response.status >= 400 &&
                error.response.status <= 500
            ){
               console.log(error.response.message)
            }
        }     
    };

    useEffect(() => {
        handleSubmit()
    })

    const validate = (values) => {
        const errors = {};
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
        if (!values.name) {
          errors.name = "Name is required!";
        }
        if (!values.email) {
          errors.email = "Email is required!";
        } else if (!regex.test(values.email)) {
          errors.email = "This is not a valid email format!";
        }
        if (!values.phone_number) {
          errors.phone_number = "Phone number is required";
        } else if (values.phone_number.length < 10) {
          errors.phone_number = "Phone number must be more than 10 characters";
        } else if (values.phone_number.length > 15) {
          errors.phone_number = "Phone number cannot exceed more than 15 characters";
        }
        if (!values.date_of_birth) {
            errors.date_of_birth = "DOB is required!";
        }
        if (!values.height) {
            errors.height = "Height is required";
          } else if (values.height.length < 2) {
            errors.height = "Height must be more than 2 characters";

        if (!values.gender) {
            errors.gender = "Gender is required!";
        }
        return errors;
      };
    }

    return (
        <>
            <Navbar />
            <div className="main_container">
                <div className='container'>
                <Form>
                        <h1>Add New Participant.</h1>
                        <div className="ui form">
                            <div className="field">
                                <label>Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    placeholder="Name"
                                    value={name}
                                    onChange={handleChange}
                                    // required
                                />
                            </div>
                            <p>{error?.name}</p>
                            <div className="field">
                            <label>Email:</label>
                            <input
                                type='email'
                                name='email'
                                value={email}
                                // required
                                onChange={e => handleChange(e)}
                                placeholder='Email'
                            />
                            </div>
                            <p>{error?.email}</p>

                            <div className="field">
                            <label>Phone Number:</label>
                            <input
                                type='number'
                                name='phone_number'
                                value={phone_number}
                                // required
                                onChange={e => handleChange(e)}
                                placeholder='Enter Phone number'
                            />
                            </div>
                            <p>{error?.phone_number}</p>

                            <div className="field">
                            <label>Date of Birth:</label>
                            <input
                                type='date'
                                name='date_of_birth'
                                // required
                                value={date_of_birth}
                                onChange={e => handleChange(e)}
                                placeholder='Enter DOB'
                            />
                            </div>
                            <p>{error?.date_of_birth}</p>

                            <div className="field">
                            <label>Height:</label>
                            <input
                                type='number'
                                name='height'
                                value={height}
                                // required
                                onChange={e => handleChange(e)}
                                placeholder='Enter height'
                            />
                            </div>
                            <p>{error?.height}</p>

                            <div className="field">
                            <label>Gender:</label>
                            <select name="gender" value={gender} onChange={e => handleChange(e)}>
                                <option value=""></option>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                            </select>
                            </div>
                            <p>{error?.gender}</p>
                            
                            <div>
                                <button className="fluid ui button blue" type='submit' onClick={handleSubmit} >Submit</button>
                                <Button style={{ marginTop: ".5rem" }}>
                                <Link to='/allparticipants'>All Participant</Link>
                                </Button>
                            </div>
                        </div>
                    </Form>
                </div>
            </div>
        </>
    )}
export default AddParticipant

// ------- LocalStorage section------
// import React, { useRef, useState } from 'react'
// import { Link } from 'react-router-dom'
// import { Button, Form, Table } from 'semantic-ui-react'
// import { v4 as uuidv4 } from 'uuid'
// import Pagination from '../../../Pagination'

// const AddParticipantLocal = () => {
//     const list = [
//         {
//             id: uuidv4(),
//             name: "Uche Carine",
//             email: "uche@gmail.com",
//             phone_number: "+234(0)704 992 8888",
//             date_of_birth: "1990-01-21",
//             height: 233,
//             gender: "female"
//         },
//         {
//             id: uuidv4(),
//             name: "Femi Code",
//             email: "femi@gmail.com",
//             phone_number: "+234(0)704 442 4455",
//             date_of_birth: "2000-12-15",
//             height: 230,
//             gender: "male"
//         },
//     ]
//     const [lists, setList] = useState(list)
//     const [updateState, setUpdateState] = useState(-1)
//     const [show, setShow] = useState(false)

//     const sortedList = lists.sort((a,b)=>(a.name < b.name ? -1 : 1));
//     const [currentPage, setCurrentPage] = useState(1);
//     const [listPerPage] = useState(1)

//     const indexOfLastList = currentPage * listPerPage;
//     const indexOfFirstList = indexOfLastList - listPerPage;
//     const currentList = sortedList.slice(indexOfFirstList, indexOfLastList);
//     const totalPagesNum = Math.ceil(sortedList.length / listPerPage);

//     return (
//         <div className=''>
//             <center><h2>Add New Participant</h2></center>
//             <div style={{ textAlign:"end",marginRight:'20rem', marginBottom:'1rem'}}>
//                 {show? <Button onClick={()=>setShow(!show)}>Add New</Button>: <Button onClick={()=>setShow(!show)}>View All</Button>}    
//             </div>
//             <div>
//                 {!show?<AddList setList={setList} /> :
//                 <Form onSubmit={handleSubmit}>
//                     <Table celled>
//                     <Table.Header>
//                             <Table.Row>
//                                 <Table.HeaderCell>Name</Table.HeaderCell>
//                                 <Table.HeaderCell>Email</Table.HeaderCell>
//                                 <Table.HeaderCell>Phone Number</Table.HeaderCell>
//                                 <Table.HeaderCell>Date of Birth</Table.HeaderCell>
//                                 <Table.HeaderCell>Height</Table.HeaderCell>
//                                 <Table.HeaderCell>Gender</Table.HeaderCell>
//                                 <Table.HeaderCell style={{ textAlign: "center" }} >Action</Table.HeaderCell>
//                             </Table.Row>
//                         </Table.Header>
//                         <Table.Body>
//                         {
//                             currentList.map((current) => (
//                                 updateState === current.id ? <EditList current={current} lists={lists} setList={setList} /> :
//                                     <Table.Row>
//                                         <Table.Cell>{current.name}</Table.Cell>
//                                         <Table.Cell>{current.email}</Table.Cell>
//                                         <Table.Cell>{current.phone_number}</Table.Cell>
//                                         <Table.Cell>{current.date_of_birth}</Table.Cell>
//                                         <Table.Cell>{current.height}</Table.Cell>
//                                         <Table.Cell>{current.gender}</Table.Cell>
//                                         <Table.Cell>
//                                             <Link to="">
//                                                 <Button className='add_result' color='green'>Result</Button>
//                                             </Link>
//                                             <Button className='edit' color='yellow' onClick={() => handleEdit(current.id)}>Edit</Button>
//                                             <Button className='delete' color='red' type='button' onClick={() => handleDelete(current.id)}>Delete</Button>
//                                         </Table.Cell>
//                                     </Table.Row>
//                             ))
//                         }
//                         </Table.Body>
//                     </Table>
//                 </Form>}
//             </div>
//             {show?<Pagination 
//             sortedList={sortedList} 
//             pages={totalPagesNum}
//                 setCurrentPage={setCurrentPage}
//                 currentList={currentList}
//             />:null}
            
//         </div>
//     )

//     function handleEdit(id) {
//         setUpdateState(id)
//     }
//     function handleDelete(id) {
//         const newlist = lists.filter((li) => li.id !== id)
//         setList(newlist)
//     }
//     function handleSubmit(event) {
//         event.preventDefault()
//         const name = event.target.elements.name.value
//         const email = event.target.elements.email.value
//         const phone_number = event.target.elements.phone_number.value
//         const date_of_birth = event.target.elements.date_of_birth.value
//         const height = event.target.elements.height.value
//         const gender = event.target.elements.gender.value

//         const newlist = lists.map((li) => (
//             li.id === updateState ? { ...li, name: name, email: email, phone_number: phone_number, date_of_birth: date_of_birth, height: height, gender: gender } : li
//         ))

//         setList(newlist)
//         setUpdateState(-1)
//     }
// }

// function EditList({ current, lists, setList }) {
//     function handInputname(event) {
//         const value = event.target.value;
//         const newlist = lists.map((li) => (
//             li.id === current.id ? { ...li, name: value } : li
//         ))
//         setList(newlist)
//     }
//     function handInputemail(event) {
//         const value = event.target.value;
//         const newlist = lists.map((li) => (
//             li.id === current.id ? { ...li, email: value } : li
//         ))
//         setList(newlist)
//     }
//     function handInputphone(event) {
//         const value = event.target.value;
//         const newlist = lists.map((li) => (
//             li.id === current.id ? { ...li, phone_number: value } : li
//         ))
//         setList(newlist)
//     }
//     function handInputdob(event) {
//         const value = event.target.value;
//         const newlist = lists.map((li) => (
//             li.id === current.id ? { ...li, date_of_birth: value } : li
//         ))
//         setList(newlist)
//     }
//     function handInputheight(event) {
//         const value = event.target.value;
//         const newlist = lists.map((li) => (
//             li.id === current.id ? { ...li, height: value } : li
//         ))
//         setList(newlist)
//     }
//     function handInputgender(event) {
//         const value = event.target.value;
//         const newlist = lists.map((li) => (
//             li.id === current.id ? { ...li, gender: value } : li
//         ))
//         setList(newlist)
//     }
//     return (
//         <Table.Row>
//               <Table.Cell>
//                 <input
//                     type="text"
//                     name='name'
//                     value={current.name}
//                     onChange={handInputname} />
//             </Table.Cell> 
//             <Table.Cell>
//                 <input
//                     type="email"
//                     name='email'
//                     value={current.email}
//                     onChange={handInputemail} />
//             </Table.Cell>
//             <Table.Cell>
//                 <input
//                     type="text"
//                     name='phone_number'
//                     value={current.phone_number}
//                     onChange={handInputphone} />
//             </Table.Cell>
//             <Table.Cell>
//                 <input
//                     type="Date"
//                     name='date_of_birth'
//                     value={current.date_of_birth}
//                     onChange={handInputdob} />
//             </Table.Cell>
//             <Table.Cell style={{width:'6.5rem'}}>
//                 <input
//                     type="number"
//                     name='height'
//                     value={current.height}
//                     onChange={handInputheight} />
//             </Table.Cell>
//             <Table.Cell>
//                 <select name="gender" value={current.gender} onChange={handInputgender}>
//                     <option value=""></option>
//                     <option value="male">Male</option>
//                     <option value="female">Female</option>
//                 </select>
//             </Table.Cell>
//             <Table.Cell>
//                 <Button type='submit' color='green'>Update</Button>
//             </Table.Cell>
//         </Table.Row>
//     )
// }

// function AddList({ setList }) {
//     const nameRef = useRef()
//     const emailRef = useRef()
//     const phoneRef = useRef()
//     const dobRef = useRef()
//     const heightRef = useRef()
//     const genderRef = useRef()
//     const [show, setShow] = useState(false)

//     function handleSubmit(event) {
//         event.preventDefault();
//         const name = event.target.elements.name.value
//         const email = event.target.elements.email.value
//         const phone_number = event.target.elements.phone_number.value
//         const date_of_birth = event.target.elements.date_of_birth.value
//         const height = event.target.elements.height.value
//         const gender = event.target.elements.gender.value
//         const newlist = {
//             id: uuidv4(),
//             name, email, phone_number, date_of_birth, height, gender
//         }
//         if (name !=='' && email!==''&& phone_number!==''&& date_of_birth!==''&& height!==''&&gender!=='') {
//           setList((prevList) => {
//             return prevList.concat(newlist)
//         })  
//         } else {
//             alert('Input field cannot be empty!')
//         }
//         nameRef.current.value = ""
//         emailRef.current.value = ""
//         phoneRef.current.value = ""
//         dobRef.current.value = ""
//         heightRef.current.value = ""
//         genderRef.current.value = ""
//     }
//     return (
//         <Form className='addForm' onSubmit={handleSubmit} style={{width:"25rem", margin:"auto"}}>
//             <Form.Field>
//                 <label>Name:</label>
//                 <input
//                 type="text"
//                 name="name"
//                 ref={nameRef}
//                 placeholder="Enter Name"
//             />
//             </Form.Field>
//             <Form.Field>
//                 <label>Email:</label>
//                 <input
//                 type="email"
//                 name="email"
//                 ref={emailRef}
//                 placeholder="Enter Email"
//             />
//             </Form.Field>
//             <Form.Field>
//                 <label>Phone Number</label>
//             <input
//                 type="text"
//                 name="phone_number"
//                 ref={phoneRef}
//                 placeholder="Enter Phone Number"
//             />
//             </Form.Field>
//             <Form.Field>
//                 <label>Date of Birth</label>
//                 <input
//                 type="Date"
//                 name="date_of_birth"
//                 ref={dobRef}
//                 placeholder="Enter Date of Birth"
//             />
//             </Form.Field>
//             <Form.Field>
//                 <label>Height</label>
//                 <input
//                 type="number"
//                 name="height"
//                 ref={heightRef}
//                 placeholder="Enter Height"
//             />
//             </Form.Field>
//             <Form.Field>
//                 <label>Gender</label>
//                 <select name="gender" ref={genderRef}>
//                 <option value=""></option>
//                 <option value="male">Male</option>
//                 <option value="female">Female</option>
//             </select>
//             </Form.Field>
//             <center>
//             <Button style={{marginBottom:"1rem"}} onClick={()=>setShow(!show)} color="green" type="submit">Add</Button>
//             </center>   
//         </Form>
//     )
// }

