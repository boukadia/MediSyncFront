import "../../styles/pages/login.css";
import PanelLeft from "../layout/PanelLeft";
import { useEffect, useState } from "react";

function LoginForm() {
  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");
  // useEffect(()=>{

  // },[email])

  //  function handleLogin() {
  //   fetch("http://localhost:3000/api/disponibilites/",{
  //     method:"GET",
  //     headers:{
  //       "Content-Type":"application/json"
  //     }

  //   })
  //   .then(res=>res.json())
  //   .then(data=>{
  //     console.log(data[0].medecin.name)
  //   })
  //   .catch(err=>console.log(err))

  //  }

  const backgroundButton = (e) => {
    const btn = document.querySelectorAll(".user-type-btn");
    btn.forEach(function (bt) {
      bt.classList.remove("active");
    });
    e.currentTarget.classList.add("active");
  };
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
                    onChange={(e) => setEmail(e.target.value)}
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
                    onChange={(e) => setPassword(e.target.value)}
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
