import 'bootstrap/dist/css/bootstrap.min.css';
import '../../../styles/pages/dashboardPatient.css';
import SideBare from '../../../components/dashboard/Patient/SideBare';
import Header from '../../../components/dashboard/Patient/Header';
// import Statistique from '../../../components/dashboard/Patient/Statistique';
import MainContent from '../../../components/dashboard/Patient/MainContent';
import { useEffect, useState } from 'react';
import type { Prescription } from '../../../types/prescription';
import { getPrescriptionsApi } from '../../../api/prescription.api';
import { getAppointmentsApi, type Appointment } from '../../../api/appointment.api';

const PatientDashboard = () => {
 const  [loading,setLoading] = useState(false)
 const [errorMessage,setErrorMessage]=useState('')
 const [myPrescriptions,setMyPrescriptions]=useState<Prescription[]>([])
 const [myAppointments,setMyAppointments]=useState<Appointment[]>([])

  // Function to format date
    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        const options: Intl.DateTimeFormatOptions = {
            weekday: 'long',
            day: 'numeric',
            month: 'long',
            year: 'numeric'
        };
        return date.toLocaleDateString('fr-FR', options);
    };
    

   useEffect(() => {
          const fetchPrescriptions = async () => {
              setLoading(true);
              const prescriptions = await getPrescriptionsApi(setErrorMessage);
              setMyPrescriptions(prescriptions);
              setLoading(false);
          };
          fetchPrescriptions();
      }, []);


         useEffect(()=>{
          // const patientId = getPatientId();
          const  fetchAppointments=async()=>{
              const appointments= await getAppointmentsApi(setErrorMessage)
              setMyAppointments(appointments);
              setLoading(false);
          }
          fetchAppointments();
        
          
      
      
          },[])
          const confirmedAppointments=myAppointments.filter(function(appointment){return appointment.status==="confirmed"});
          const upComingAppointments=confirmedAppointments[0];//3lach drt '0' hitach confirmedAppointment m sorten b date lighadi ikon fih appointment ( machi la date dyale creation dyal appointment)
          console.log('upc',upComingAppointments);

           const signedPrescriptions = myPrescriptions.filter(function (prescription) {
        return prescription.status === "signed" 
    });
          
  return (
    <>
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" />
      
      <SideBare />
      <div className="main-content">
        <Header />
        <div className="row g-3 mb-4">
            <div className="col-md-3">
                <div className="card stats-card shadow-sm">
                    <div className="card-body">
                        <div className="d-flex justify-content-between">
                            <div>
                                <p className="text-muted mb-1">Prochain RDV</p>
                                {upComingAppointments ? (
                                    <>
                                        <h4>{formatDate(upComingAppointments.date)}</h4>
                                        <small className="text-success">{upComingAppointments.doctorId?.name}</small>
                                    </>
                                ) : (
                                    <>
                                        <h4>Aucun</h4>
                                        <small className="text-muted">Pas de rendez-vous</small>
                                    </>
                                )}
                            </div>
                            <div className="bg-primary bg-opacity-10 rounded p-3">
                                <i className="fas fa-calendar-check fa-2x text-primary"></i>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="col-md-3">
                <div className="card stats-card info shadow-sm">
                    <div className="card-body">
                        <div className="d-flex justify-content-between">
                            <div>
                                <p className="text-muted mb-1">Résultats</p>
                                <h4>2 Nouveaux</h4>
                                <small className="text-info">Disponibles</small>
                            </div>
                            <div className="bg-info bg-opacity-10 rounded p-3">
                                <i className="fas fa-flask fa-2x text-info"></i>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="col-md-3">
                <div className="card stats-card warning shadow-sm">
                    <div className="card-body">
                        <div className="d-flex justify-content-between">
                            <div>
                                <p className="text-muted mb-1">Ordonnances</p>
                                <h4>{myPrescriptions.length}</h4>
                                {/* <small className="text-warning">En cours</small> */}
                            </div>
                            <div className="bg-warning bg-opacity-10 rounded p-3">
                                <i className="fas fa-pills fa-2x text-warning"></i>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="col-md-3">
                <div className="card stats-card danger shadow-sm">
                    <div className="card-body">
                        <div className="d-flex justify-content-between">
                            <div>
                                <p className="text-muted mb-1">Messages</p>
                                <h4>3 Non lus</h4>
                                <small className="text-danger">À lire</small>
                            </div>
                            <div className="bg-danger bg-opacity-10 rounded p-3">
                                <i className="fas fa-envelope fa-2x text-danger"></i>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
         {/* Main Content Grid */}
        <div className="row g-4">
          {/* Upcoming Appointments */}
          <div className="col-md-6">
            <div className="card shadow-sm">
              <div className="card-header bg-primary text-white d-flex justify-content-between align-items-center">
                <h5 className="mb-0"><i className="fas fa-calendar-alt me-2"></i>Prochains Rendez-vous</h5>
                <a href="#" className="btn btn-sm btn-light">Voir tout</a>
              </div>
              <div className="card-body">
                {confirmedAppointments.length !== 0 ? (
                  confirmedAppointments.map((appointment) => (
                    <div className="appointment-card bg-light p-3 mb-3" key={appointment._id}>
                      <div className="d-flex gap-3">
                        <div className="bg-primary text-white rounded p-2 text-center" style={{minWidth: '60px'}}>
                          <div className="fw-bold" style={{fontSize: '24px'}}>
                            {new Date(appointment.date).getDate()}
                          </div>
                          <small>{new Date(appointment.date).toLocaleDateString('fr-FR', { month: 'short' })}</small>
                        </div>
                        <div className="flex-grow-1">
                          <h6 className="mb-1">{appointment.doctorId?.name}</h6>
                          <p className="text-muted mb-1 small">{appointment.specialite} - {appointment.typeConsultation}</p>
                          <small className="text-primary">
                            <i className="far fa-clock"></i> {appointment.creneau?.heure_debut}
                          </small>
                        </div>
                        <span className="badge bg-warning align-self-start">{appointment.status}</span>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center text-muted">
                    <p>Aucun rendez-vous à venir.</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Recent Test Results */}
          <div className="col-md-6">
            <div className="card shadow-sm">
              <div className="card-header bg-success text-white d-flex justify-content-between align-items-center">
                <h5 className="mb-0"><i className="fas fa-vial me-2"></i>Résultats Récents</h5>
                <a href="#" className="btn btn-sm btn-light">Voir tout</a>
              </div>
              <div className="card-body">
                <div className="border-start border-success border-4 bg-light p-3 mb-3">
                  <div className="d-flex justify-content-between align-items-center">
                    <div>
                      <h6>NFS - Numération Formule Sanguine</h6>
                      <small className="text-muted">20 Janvier 2024</small>
                    </div>
                    <span className="badge bg-success">Disponible</span>
                  </div>
                  <button className="btn btn-sm btn-primary mt-2">
                    <i className="fas fa-download"></i> Télécharger
                  </button>
                </div>
               
              </div>
            </div>
          </div>

          {/* Active Prescriptions */}
          <div className="col-md-6">
            <div className="card shadow-sm">
              <div className="card-header bg-warning text-white d-flex justify-content-between align-items-center">
                <h5 className="mb-0"><i className="fas fa-prescription me-2"></i>Ordonnances Actives</h5>
                <a href="#" className="btn btn-sm btn-light">Voir tout</a>
              </div>
              <div className="card-body">
                <div className="mb-3 p-3 bg-light rounded">
                  <div className="d-flex justify-content-between mb-2">
                    <h6>Dr. Khalid Youssef</h6>
                    <small className="text-muted">15 Déc 2023</small>
                  </div>
                  <div className="d-flex justify-content-between align-items-center bg-white p-2 rounded mb-2">
                    <div>
                      <strong>Metformine 500mg</strong>
                      <small className="text-muted d-block">2 fois/jour après repas</small>
                    </div>
                    <span className="badge bg-success">30 jours</span>
                  </div>
                  <div className="d-flex justify-content-between align-items-center bg-white p-2 rounded">
                    <div>
                      <strong>Vitamine D3 1000 UI</strong>
                      <small className="text-muted d-block">1 fois/jour</small>
                    </div>
                    <span className="badge bg-success">90 jours</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Health Tips */}
          <div className="col-md-6">
            <div className="card shadow-sm">
              <div className="card-header bg-info text-white">
                <h5 className="mb-0"><i className="fas fa-lightbulb me-2"></i>Conseils Santé</h5>
              </div>
              <div className="card-body">
                <div className="mb-3">
                  <div className="d-flex gap-2">
                    <i className="fas fa-check-circle text-success mt-1"></i>
                    <div>
                      <strong>Hydratation</strong>
                      <p className="text-muted small mb-0">Buvez au moins 1.5L d'eau par jour</p>
                    </div>
                  </div>
                </div>
                <div className="mb-3">
                  <div className="d-flex gap-2">
                    <i className="fas fa-check-circle text-success mt-1"></i>
                    <div>
                      <strong>Activité Physique</strong>
                      <p className="text-muted small mb-0">30 minutes de marche quotidienne recommandée</p>
                    </div>
                  </div>
                </div>
                <div>
                  <div className="d-flex gap-2">
                    <i className="fas fa-check-circle text-success mt-1"></i>
                    <div>
                      <strong>Sommeil</strong>
                      <p className="text-muted small mb-0">Dormez 7-8 heures par nuit</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PatientDashboard;