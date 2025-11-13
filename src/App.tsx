import LoginForm from './components/forms/LoginForm'
import Home from './pages/home'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

function App() {

  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Home />}/>
      <Route path='/login' element={<LoginForm />}/>

    </Routes>
    
    </BrowserRouter>
    
     
    </>
  )
}

export default App
