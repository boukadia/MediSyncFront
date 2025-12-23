// import LoginForm from './components/forms/LoginForm'
// import RegisterForm from './components/forms/RegisterForm'
import Login from './pages/auth/Login'
import Register from './pages/auth/Register'
import Home from './pages/home'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import ProtectedRoute from './routes/ProtectedRoute'
import Unothorized from './pages/Unothorized'
import Appointment from './pages/dashboard/patient/Appointment.tsx'
import Prescriptions from './pages/dashboard/patient/Prescription.tsx'
import Test from './pages/dashboard/patient/Test.tsx'
import DashboardPrincipalDoctor from './pages/dashboard/doctor/DashboardPrincipalDoctor.tsx'
import DashboardPrincipalPatient from './pages/dashboard/patient/DashboardPrincipalPatient.tsx'
import DoctorPrescriptions from './pages/dashboard/doctor/DoctorPrescriptions.tsx'
import DoctorAppointments from './pages/dashboard/doctor/DoctorAppointments.tsx'
import DoctorLaboOrderTests from './pages/dashboard/doctor/DoctorLaboOrderTests.tsx'
import DoctorConsultations from './pages/dashboard/doctor/DoctorConsultations.tsx'

function App() {

  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Home />}/>
      <Route path='/login' element={<Login />}/>
      <Route path='/register' element={<Register />}/>
      <Route path="/unothorized" element={<Unothorized />} />
      {/* <Route path="/logout" element={<Logout />} /> */}
      <Route path='/dashboard/doctor' element={<ProtectedRoute allowedRole='doctor'><DashboardPrincipalDoctor/></ProtectedRoute>}/>' 
      <Route path='/dashboard/doctor/prescriptions' element={<ProtectedRoute allowedRole='doctor'><DoctorPrescriptions /></ProtectedRoute>} />
      <Route path='/dashboard/doctor/appointments' element={<ProtectedRoute allowedRole='doctor'><DoctorAppointments /></ProtectedRoute>} />
      <Route path='/dashboard/doctor/consultations' element={<ProtectedRoute allowedRole='doctor'><DoctorConsultations /></ProtectedRoute>} />
      <Route path='/dashboard/doctor/labo-tests' element={<ProtectedRoute allowedRole='doctor'><DoctorLaboOrderTests /></ProtectedRoute>} />
      <Route path="/dashboard/patient/appointments" element={<ProtectedRoute allowedRole='patient'><Appointment /></ProtectedRoute>} />  
      <Route path="/dashboard/patient/tests" element={<ProtectedRoute allowedRole='patient'><Test /></ProtectedRoute>} />  
      <Route path='/dashboard/patient/prescriptions' element={ <ProtectedRoute allowedRole={'patient'}><Prescriptions /></ProtectedRoute>}/>
      <Route path='/dashboard/patient' element={
        <ProtectedRoute allowedRole={'patient'}>
            <DashboardPrincipalPatient />
        </ProtectedRoute>
        }
      />

    </Routes>
    
    </BrowserRouter>
    
     
    </>
  )
}

export default App
