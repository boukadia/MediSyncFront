// import LoginForm from './components/forms/LoginForm'
// import RegisterForm from './components/forms/RegisterForm'
import Login from './pages/auth/Login'
import Register from './pages/auth/Register'
import PatientDashboard from './pages/dashboard/PatientDashboard'
import Home from './pages/home'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import ProtectedRoute from './routes/ProtectedRoute'
import Unothorized from './pages/Unothorized'

function App() {

  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Home />}/>
      <Route path='/login' element={<Login />}/>
      <Route path='/register' element={<Register />}/>
      <Route path="/unothorized" element={<Unothorized />} />
      <Route path='/dashboard/patient' element={
        <ProtectedRoute allowedRole={'patient'}>
            <PatientDashboard />
        </ProtectedRoute>
        }
      />

    </Routes>
    
    </BrowserRouter>
    
     
    </>
  )
}

export default App
