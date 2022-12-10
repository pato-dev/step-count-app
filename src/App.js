import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import SignUp from './components/signup/SignUp';
import Login from './components/login/Login';
import Main from './components/main/Main';

function App() {
  const user = localStorage.getItem("token");
  return (
    <Routes>
      {user && <Route exact path='/' element={<Main />} />}
      <Route exact path='/login' element={<Login />} />
      <Route exact path='/signup' element={<SignUp />} />
      <Route exact path='/' element={<Navigate replace to="/login" />} />
    </Routes>
  );
}

export default App;