import { Route, Routes } from 'react-router-dom';
import './App.css';
import HeaderContainer from './ui/header/Header';
import { Login } from './ui/login/Login';

function App() {
  return <div className='App'>
    {/* <HeaderContainer /> */}
    <Routes>
      <Route path='/login' element={<Login />} />
    </Routes>
  </div>
}

export default App;
