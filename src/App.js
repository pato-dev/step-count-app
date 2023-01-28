import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import SignUp from './components/user/signup/SignUp';
import Login from './components/user/login/Login';
import Home from './components/pages/home/Home';
import AllParticipantData from './components/pages/participants/read/AllParticipantData';
import UpdateParticipantData from './components/pages/participants/update/UpdateParticipantData';
import AllClinicalData from './components/pages/clinical_data/read/AllClinicalData';
import AddClinicalData from './components/pages/clinical_data/create/AddClinicalData';
import AddParticipant from './components/pages/participants/create/AddParticipant';
import UpdateClinicalData from './components/pages/clinical_data/update/UpdateClinicalData';

function App() {
  return (
    <>
      <Routes>
        {/* {user && <Route exact path='/' element={<Home />} />} */}
        <Route exact path='/' element={<Home />} />
        <Route exact path='/login' element={<Login />} />
        <Route exact path='/signup' element={<SignUp />} />
        <Route exact path='/add-participant' element={<AddParticipant />} />
        <Route exact path='/allparticipants' element={<AllParticipantData />} />
        <Route exact path='/update-data/:id' element={<UpdateParticipantData />} />

        <Route exact path='/clinical_data/:id' element={<AddClinicalData />} />
        <Route exact path='/all_clinicals' element={<AllClinicalData />} />
        <Route exact path='/update-result/:id' element={<UpdateClinicalData />} />

        <Route exact path='/' element={<Navigate replace to="/login" />} />
      </Routes>
    </>
  );
}
export default App;