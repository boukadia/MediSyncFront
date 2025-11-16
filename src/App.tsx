// import LoginForm from './components/forms/LoginForm'
// import RegisterForm from './components/forms/RegisterForm'
import Login from './pages/auth/Login'
import Register from './pages/auth/Register'
import PatientDashboard from './pages/dashboard/PatientDashboard'
import Home from './pages/home'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

function App() {

  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Home />}/>
      <Route path='/login' element={<Login />}/>
      <Route path='/register' element={<Register />}/>
      {/* <Route path='/dashboard' element={<ProtectedRoute/> */}

    {/* }
    /> */}

    </Routes>
    
    </BrowserRouter>
    
     
    </>
  )
}

export default App
