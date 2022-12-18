import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import SignUp from './components/signup/SignUp';
import Login from './components/login/Login';
import Main from './components/main/Main';
import CreateUser from './components/records/create/CreateUser';
import User from './components/records/users/User';
import Update from './components/records/update/Update';


function App() {
  const user = localStorage.getItem("token");
  return (
    <Routes>
      {user && <Route exact path='/' element={<Main />} />}
      <Route exact path='/login' element={<Login />} />
      <Route exact path='/signup' element={<SignUp />} />
      <Route exact path='/create' element={<CreateUser />} />
      <Route exact path='/record/:id' element={<User />} />
      <Route exact path='/update/:id' element={<Update />} />
      <Route exact path='/' element={<Navigate replace to="/login" />} />
    </Routes>
  );
}

export default App;