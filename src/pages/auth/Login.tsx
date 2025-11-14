// Login
// import PanelLeft from "../../components/layout/PanelLeft";
import LoginForm from "../../components/forms/LoginForm";
import "../../styles/pages/login.css";


function Login() {
  return (
    <div className="container-fluid">
      <div className="row g-0 justify-content-center align-items-center min-vh-100">
        <div className="col-lg-10 col-xl-8">
          <div className="card shadow-lg border-0 rounded-4 overflow-hidden">
          <LoginForm />
          </div>
        </div>
      </div>
    </div>
  );
}
export default Login;
