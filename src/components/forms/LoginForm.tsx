import { jwtDecode } from "jwt-decode";
import "../../styles/pages/login.css";
import PanelLeft from "../layout/PanelLeft";
import {   useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginApi } from "../../api/auth.api";
function LoginForm() {
  const [email, setEmail] = useState("");
const [errorMessage, setErrorMessage] = useState("");
  const [password, setPassword] = useState("");
  const navigate=useNavigate();
  
console.log(errorMessage);

  const   handleLogin=async (e:React.MouseEvent<HTMLButtonElement>)=> {
    e.preventDefault();
 await loginApi(email,password,navigate,setErrorMessage);


 
}
    

  // const backgroundButton = (e) => {
  //   const btn = document.querySelectorAll(".user-type-btn");
  //   btn.forEach(function (bt) {
  //     bt.classList.remove("active");
  //   });
  //   e.currentTarget.classList.add("active");
  // };


  return (
    <>
      <div className="row g-0">
        <PanelLeft />

        <div className="col-lg-8 bg-white">
          <div className="right-panel p-4 p-lg-5">
            <div className="text-center mb-4">
              <h2 className="fw-bold text-dark mb-2">Bienvenue</h2>
              <p className="text-muted">
                Veuillez vous connecter pour continuer
              </p>
            </div>

            <form>
              {errorMessage && (
  <div className="alert alert-danger text-center">{errorMessage}</div>
)}
              <div className="mb-4">
                <label
                  htmlFor="email"
                  className="form-label fw-semibold text-dark"
                >
                  Adresse e-mail
                </label>
                <div className="input-group input-group-lg">
                  <span className="input-group-text bg-light border-end-0">
                    <i className="fas fa-envelope text-primary"></i>
                  </span>
                  <input
                    onChange={(e) => {setEmail(e.target.value);setErrorMessage("")}}
                    type="email"
                    className="form-control border-start-0"
                    id="email"
                    placeholder="exemple@email.com"
                    required
                  />
                </div>
              </div>

              <div className="mb-4">
                <label
                  htmlFor="password"
                  className="form-label fw-semibold text-dark"
                >
                  Mot de passe
                </label>
                <div className="input-group input-group-lg">
                  <span className="input-group-text bg-light border-end-0">
                    <i className="fas fa-lock text-primary"></i>
                  </span>
                  <input
                    onChange={(e) => {setPassword(e.target.value);setErrorMessage("")}}
                    type="password"
                    className="form-control border-start-0"
                    id="password"
                    placeholder="••••••••"
                    required
                  />
                </div>
              </div>

              <div className="d-flex justify-content-between align-items-center mb-4">
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="rememberMe"
                  />
                  <label className="form-check-label" htmlFor="rememberMe">
                    Se souvenir de moi
                  </label>
                </div>
                <a
                  href="#"
                  className="text-primary text-decoration-none fw-semibold"
                >
                  Mot de passe oublié ?
                </a>
              </div>

              <button
                type="submit"
                onClick={handleLogin}
                className="btn btn-primary btn-lg w-100 py-3 fw-bold rounded-3 shadow-sm mb-3"
              >
                <i className="fas fa-sign-in-alt me-2"></i>Se connecter
              </button>
            </form>

            <div className="position-relative text-center my-4">
              <hr className="text-muted" />
              <span className="position-absolute top-50 start-50 translate-middle bg-white px-3 text-muted">
                ou
              </span>
            </div>

            <div className="text-center">
              <p className="text-muted mb-0">
                Pas de compte ?{" "}
                <a
                  href="#"
                  className="text-primary text-decoration-none fw-semibold"
                >
                  Inscrivez-vous
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default LoginForm;
