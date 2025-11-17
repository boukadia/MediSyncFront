import { Link } from "react-router-dom";

function SideBare() {
    return (
       <>
        <div className="sidebar">
            <div className="p-4 text-center border-bottom border-white border-opacity-25">
                <i className="fas fa-hospital fa-2x mb-2"></i>
                <h5>MediSync</h5>
                <small>Espace Patient</small>
            </div>
        <nav className="nav flex-column p-3">
            <Link to="/dashboard/patient" className="nav-link active" >
                <i className="fas fa-home me-2"></i> Tableau de Bord
            </Link>
           
            <Link className="nav-link"   to ="/dashboard/patient/appointments" >
           <i className="fas fa-calendar-check me-2"></i> Mes Rendez-vous
            </Link>

            <Link className="nav-link" to="/dashboard/patient/test" >
                <i className="fas fa-flask me-2"></i> Mes Analyses
            </Link>
            <Link className="nav-link" to="/dashboard/patient/prescriptions" >
                <i className="fas fa-pills me-2"></i> Mes Ordonnances
            </Link>
            <Link className="nav-link" to="/dashboard/patient/dossierMedical" >
                <i className="fas fa-file-medical me-2"></i> Dossier Médical
            </Link>
            <Link className="nav-link" to="/dashboard/patient/doctor" >
                <i className="fas fa-user-md me-2"></i> Trouver un Médecin
            </Link>
            <Link className="nav-link" to="/dashboard/patient/profile" >
                <i className="fas fa-user me-2"></i> Mon Profil
            </Link>
            <hr className="text-white my-2"/>
            <Link className="nav-link text-danger" to="/logout">
                <i className="fas fa-sign-out-alt me-2"></i> Déconnexion
            </Link>
        </nav>
    </div>
    </>
    )
    
}
export default SideBare;