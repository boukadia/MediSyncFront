import RegisterForm from "../../components/forms/RegisterForm";

// Register
function Register() {
    return(
        <>
         <div className="container-fluid min-vh-100 d-flex align-items-center justify-content-center py-4">
                    <div className="register-container bg-white rounded-4 shadow-lg overflow-hidden position-relative d-flex flex-column" style={{maxWidth: '1100px', minHeight: '600px', zIndex: 1, backdropFilter: 'blur(10px)'}}>
                        <RegisterForm />
                </div>
            </div>
        </>

    )
    
}
export default Register;