import { Link } from "react-router-dom";


function Navbar() {
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light sticky-top shadow-sm">
            <div className="container">
                <Link className="navbar-brand fw-bold" to="/">
                    <i className="fas fa-heartbeat me-2"></i>
                    Careflow
                </Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav ms-auto">
                        <li className="nav-item">
                            <Link to="/" className="nav-link active">Accueil</Link>
                        </li>
                       
                        <li className="nav-item">
                            <Link to="/dashboard/doctor" className="nav-link active">Doctors</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/dashboard/patient" className="nav-link active">Patients</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/" className="nav-link active">Contact</Link>
                        </li>
                       
                       {/* <Link to="" className="nav-item">
                            <a className="nav-link" href="#features">Features</a>
                        </Link> */}
                      
                       
                      
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;