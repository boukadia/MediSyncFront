// import LoginForm from './components/forms/LoginForm'
// import RegisterForm from './components/forms/RegisterForm'
import Login from './pages/auth/Login'
import Register from './pages/auth/Register'
import Home from './pages/home'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import ProtectedRoute from './routes/ProtectedRoute'
import Unothorized from './pages/Unothorized'
import PatientDashboard from './pages/dashboard/patient/PatientDashboard.tsx'
import Appointment from './pages/dashboard/patient/Appointment.tsx'
import Prescriptions from './pages/dashboard/patient/Prescription.tsx'

function App() {

  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Home />}/>
      <Route path='/login' element={<Login />}/>
      <Route path='/register' element={<Register />}/>
      <Route path="/unothorized" element={<Unothorized />} />
      <Route path="/dashboard/patient/appointments" element={<Appointment />} />  
      <Route path='/dashboard/patient/prescriptions' element={<Prescriptions />}/>
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
