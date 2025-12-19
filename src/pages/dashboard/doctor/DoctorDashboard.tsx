import { useEffect, useState } from 'react';
import '../../../styles/pages/doctorDashboard.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import type { Appointment } from '../../../types/appointment';
import { getAppointmentsApi } from '../../../api/appointment.api';
import type { Prescription } from '../../../types/prescription';
import { getPrescriptionsApi } from '../../../api/prescription.api';
import SideBar from '../../../components/dashboard/doctor/SideBar';





function DoctorDashboard() {
        const [myAppointments,setMyAppointments]=useState<Appointment[]>([])
        const [prescriptions,setPrescriptions]=useState<Prescription[]>([])
        const [loading,setLoading]=useState<boolean>(true);
        const [errorMessage,setErrorMessage]=useState<string>('');
        const [activePatients, setActivePatients] = useState<number>(0);
       
 // Function to format date
    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        const options: Intl.DateTimeFormatOptions = {
            weekday: 'long',
            day: 'numeric',
            month: 'long',
            year: 'numeric',
        };
        return date.toLocaleDateString('fr-FR', options);
    };
      useEffect(()=>{
        const  fetchAppointments=async()=>{
            const appointments= await getAppointmentsApi(setErrorMessage)
            setMyAppointments(appointments);
            
            // Calculate unique patients from appointments
            const uniquePatients = new Set(appointments.map(apt => apt.patientId._id));
            setActivePatients(uniquePatients.size);
            
            setLoading(false);
        }
        fetchAppointments();

        const  fetchPrescription=async()=>{
            const prescriptions= await getPrescriptionsApi(setErrorMessage)
            setPrescriptions(prescriptions);
            setLoading(false);
        }
        fetchPrescription();

        // const patientesIds=myAppointments.map(Appointment)
      
        
    
    
        },[])
        console.log("presscr",myAppointments);

        // const patienteides=myAppointments.map((appointmet=>appointmet.stat))
        
 
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'confirmed':
        return <span className="badge badge-success"><i className="fas fa-circle-check me-1"></i>Confirmé</span>;
      case 'pending':
        return <span className="badge badge-warning"><i className="fas fa-clock me-1"></i>En attente</span>;
      case 'cancelled':
        return <span className="badge badge-secondary"><i className="fas fa-ban me-1"></i>Annulé</span>;
      case 'completed':
        return <span className="badge badge-info"><i className="fas fa-check me-1"></i>Terminé</span>;
      default:
        return <span className="badge badge-light">{status}</span>;
    }
  };

  const getTypeBadge = (type: string) => {
    return <span className="badge badge-primary"><i className="fas fa-stethoscope me-1"></i>{type}</span>;
  };

  return (
    <div className="doctor-dashboard">
    <SideBar />

      {/* Main content */}
      <div className="container-fluid px-4 py-3">
        {/* Page Header */}
        <div className="d-flex justify-content-between align-items-center mb-4 page-header">
          <div>
            <h1 className="h3 mb-1">Bonjour, Dr Martin</h1>
            <div className="d-flex gap-2 flex-wrap">
              <span className="badge badge-info">
                <i className="fas fa-shield-heart me-1"></i>Données chiffrées
              </span>
              <span className="badge badge-success">
                <i className="fas fa-check me-1"></i>4 patients vus aujourd'hui
              </span>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="row g-3 mb-4">
          <div className="col-lg-3 col-md-6">
            <div className="card stat-card h-100">
              <div className="card-body d-flex align-items-center">
                <div className="stat-icon">
                  <i className="fas fa-calendar-day"></i>
                </div>
                <div className="ms-3">
                  <div className="stat-value">12</div>
                  <small className="text-muted">Rendez-vous aujourd'hui</small>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-3 col-md-6">
            <div className="card stat-card h-100">
              <div className="card-body d-flex align-items-center">
                <div className="stat-icon">
                  <i className="fas fa-user-group"></i>
                </div>
                <div className="ms-3">
                  <div className="stat-value">{activePatients}</div>
                  <small className="text-muted">Patients actifs</small>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-3 col-md-6">
            <div className="card stat-card h-100">
              <div className="card-body d-flex align-items-center">
                <div className="stat-icon">
                  <i className="fas fa-prescription-bottle-medical"></i>
                </div>
                <div className="ms-3">
                  <div className="stat-value">5</div>
                  <small className="text-muted">Prescriptions à renouveler</small>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-3 col-md-6">
            <div className="card stat-card h-100">
              <div className="card-body d-flex align-items-center">
                <div className="stat-icon">
                  <i className="fas fa-flask"></i>
                </div>
                <div className="ms-3">
                  <div className="stat-value">3</div>
                  <small className="text-muted">Résultats en attente</small>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Content Grid */}
        <div className="row g-3">
          {/* Left Column - Appointments Table */}
          <div className="col-lg-10">
            <div className="card">
              <div className="card-header d-flex justify-content-between align-items-center">
                <h5 className="card-title mb-0">Derniers rendez-vous</h5>
                <div className="d-flex gap-2">
                  <button className="btn btn-outline-secondary btn-sm">
                    <i className="fas fa-filter me-1"></i>Filtres
                  </button>
                  <button className="btn btn-primary btn-sm">
                    <i className="fas fa-plus me-1"></i>Nouveau
                  </button>
                </div>
              </div>
              <div className="card-body p-0">
                <div className="table-responsive">
                  <table className="table table-hover mb-0">
                    <thead className="table-light">
                      <tr>
                        <th>Patient</th>
                        <th>Date</th>
                        <th>Heure</th>
                        <th>Type</th>
                        <th>Raison</th>
                        <th>Statut</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {myAppointments.map((appointment) => (
                        <tr key={appointment._id}>
                          <td>{appointment.patientId.name}</td>
                          <td>{formatDate(appointment.date)}</td>
                          <td>{appointment.creneau.heure_debut}</td>
                          <td>{getTypeBadge(appointment.typeConsultation)}</td>
                          <td>{getStatusBadge(appointment.consultationReason)}</td>
                          <td>{getStatusBadge(appointment.status)}</td>
                          <td>
                            <div className="d-flex gap-1">
                              <button 
                                className="btn btn-outline-primary btn-sm"
                                title="Voir dossier"
                              >
                                <i className="fas fa-folder-open"></i>
                              </button>
                              {appointment.status === 'confirmed' && (
                                <>
                                  <button 
                                    className="btn btn-outline-success btn-sm"
                                    title="Prescrire"
                                  >
                                    <i className="fas fa-prescription-bottle"></i>
                                  </button>
                                  <button 
                                    className="btn btn-outline-info btn-sm"
                                    title="Créer ordre de labo"
                                  >
                                    <i className="fas fa-flask"></i>
                                  </button>
                                </>
                              )}
                              {appointment.status === 'pending' && (
                                <button 
                                  className="btn btn-outline-warning btn-sm"
                                  title="Envoyer rappel"
                                >
                                  <i className="fas fa-bell"></i>
                                </button>
                              )}
                              {appointment.status === 'cancelled' && (
                                <button 
                                  className="btn btn-outline-secondary btn-sm"
                                  title="Reprogrammer"
                                >
                                  <i className="fas fa-rotate"></i>
                                </button>
                              )}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Notifications and Calendar */}
         
        </div>

        {/* Second Row */}
        <div className="row g-3 mt-3">
          {/* Prescriptions récentes */}
          <div className="col-lg-6">
            <div className="card">
              <div className="card-header">
                <h6 className="card-title mb-0">Prescriptions récentes</h6>
              </div>
              <div className="card-body">
                <div className="d-flex flex-column gap-2">
                  {prescriptions.map((prescription) => (
                    <div key={prescription._id} className="notification-item">
                      <i className="fas fa-prescription-bottle notification-icon"></i>
                      <div className="notification-content">
                        <div>
                             {prescription.medications.map(medication=>(
                          <strong>{medication.name}</strong>
                        ))}
                        </div>
                        <small className="text-muted" title={prescription.createdAt}>
                          {formatDate(prescription.createdAt)}
                        </small>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Rappels */}
          <div className="col-lg-6">
            <div className="card">
              <div className="card-header">
                <h6 className="card-title mb-0">Rappels</h6>
              </div>
              <div className="card-body">
                <ul className="list-unstyled mb-0 text-muted">
                  <li className="mb-2">
                    <i className="fas fa-circle-check text-primary me-2"></i>
                    Valider 2 résultats de labo
                  </li>
                  <li className="mb-2">
                    <i className="fas fa-circle-check text-primary me-2"></i>
                    Envoyer compte-rendu à Élodie P.
                  </li>
                  <li className="mb-0">
                    <i className="fas fa-circle-check text-primary me-2"></i>
                    Confirmer l'ordre de test pour Karim Ali
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DoctorDashboard;