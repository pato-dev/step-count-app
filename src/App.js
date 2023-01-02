import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import SignUp from './components/user/signup/SignUp';
import Login from './components/user/login/Login';
import Home from './components/pages/home/Home';
import ReadRecord from './components/pages/read/ReadRecord';
import AddPatient from './components/pages/create/addpatient/AddPatient';
import AllPatientsTestResult from './components/pages/allRecords/AllPatientsTestResult';
import AddPatientTestResult from './components/pages/create/addrecord/AddPatientTestResult';
import UpdatePatientData from './components/pages/update/patientRecord/UpdatePatientData';
// import Navbar from './components/layouts/navbar/Navbar';
import UpdateTestResult from './components/pages/update/patientTestResult/UpdateTestResult';
import AllPatientData from './components/pages/allRecords/AllPatientData';
import AddTest from './components/pages/update/AddTest';

function App() {
  const user = localStorage.getItem("token");
  return (
    <>
      {/* <Navbar /> */}
      <Routes>
        {user && <Route exact path='/' element={<Home />} />}
        <Route exact path='/login' element={<Login />} />
        <Route exact path='/signup' element={<SignUp />} />
        <Route exact path='/add-patient' element={<AddPatient />} />
        <Route exact path='/record' element={<AddPatientTestResult />} />
        <Route exact path='/addtest:id' element={<AddTest />} />
        <Route exact path='/all-test-result' element={<AllPatientsTestResult />} />
        <Route exact path='/allpatients' element={<AllPatientData />} />
        <Route exact path='/record/:id' element={<ReadRecord />} />
        <Route exact path='/update-data/:id' element={<UpdatePatientData />} />
        <Route exact path='/update-result/:id' element={<UpdateTestResult />} />
        <Route exact path='/' element={<Navigate replace to="/login" />} />
      </Routes>

    </>
  );
}
export default App;