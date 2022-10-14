import React from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Header, { Main } from './ui/header/Main';
import { Login } from './ui/login/Login';

function App() {
  return <div className='App'>
    <Routes>
      <Route path='/Login_form/' element={<Login />} />
      <Route path='/Login_form/main' element={<Main />} />
    </Routes>
  </div>
}

export default App;
