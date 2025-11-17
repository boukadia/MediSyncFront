import React, { use, useEffect, useState } from 'react';
import SideBare from '../../../components/dashboard/Patient/SideBare';
import '../../../styles/pages/appointment.css';
import { jwtDecode } from 'jwt-decode';
import { getAppointmentsApi, type Appointment } from '../../../api/appointment.api';

function Appointment() {
    const [showModal, setShowModal] = useState(false);
    const [errorMessage,setErrorMessage]=useState('');
    const [loading, setLoading] = useState(false);
    const [myAppointments,setMyAppointments]=useState<Appointment[]>([])
    const getPatientId = () => {
        const token = localStorage.getItem('token');
        if (token) {
            const decoded: any = jwtDecode(token);
            return decoded.userId || decoded.id;
        }
        return null;
    };

    
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

    // Function to get day number
    const getDayNumber = (dateString: string) => {
        const date = new Date(dateString);
        return date.getDate();
    };

    // Function to get month name
    const getMonthName = (dateString: string) => {
        const date = new Date(dateString);
        const options: Intl.DateTimeFormatOptions = { month: 'long' };
        return date.toLocaleDateString('fr-FR', options);
    };

    // Function to get year
    const getYear = (dateString: string) => {
        const date = new Date(dateString);
        return date.getFullYear();
    };
    useEffect(()=>{
    const patientId = getPatientId();
    const  fetchAppointments=async()=>{
        const appointments= await getAppointmentsApi(setErrorMessage)
        setMyAppointments(appointments);
        setLoading(false);
    }
    fetchAppointments();
  
    


    },[showModal])
//       useEffect(() => {
//     console.log('myAppointments state updated:', myAppointments);
// }, [myAppointments]);

console.log(myAppointments);

     



    return (
        <div>
            {/* Sidebar */}
            <SideBare />

            {/* Main Content */}
            <div className="main-content">
                {/* Header */}
                <div className="d-flex justify-content-between align-items-center mb-4">
                    <div>
                        <h2>
                            <i className="fas fa-calendar-check text-primary me-2"></i>
                            Mes Rendez-vous
                        </h2>
                        <p className="text-muted">Gérez vos consultations médicales</p>
                    </div>
                    <button 
                        className="btn btn-primary" 
                        onClick={() => setShowModal(true)}
                        data-bs-toggle="modal" 
                        data-bs-target="#newAppointmentModal"
                    >
                        <i className="fas fa-plus me-2"></i>Nouveau Rendez-vous
                    </button>
                </div>

                {/* Tabs Navigation */}
                <ul className="nav nav-tabs mb-4" id="appointmentTabs" role="tablist">
                    <li className="nav-item" role="presentation">
                        <button 
                      
                            className="nav-link active" 
                            data-bs-toggle="tab" 
                            data-bs-target="#upcoming"
                        >
                            <i className="fas fa-clock me-2"></i>À venir (3)
                        </button>
                    </li>
                    <li className="nav-item" role="presentation">
                        <button 
                        
                            className="nav-link" 
                            data-bs-toggle="tab" 
                            data-bs-target="#past"
                        >
                            <i className="fas fa-history me-2"></i>Tous
                        </button>
                    </li>
                    <li className="nav-item" role="presentation">
                        <button 
                        
                            className="nav-link" 
                            data-bs-toggle="tab" 
                            data-bs-target="#cancelled"
                        >
                            <i className="fas fa-times-circle me-2"></i>Annulés
                        </button>
                    </li>
                </ul>

                {/* Tab Content */}
                <div className="tab-content">
                    {/* Upcoming Appointments */}
                    <div className="tab-pane fade show active" id="upcoming">
                        <div className="row g-4">
                            {myAppointments.map((appointment)=>(

                            <div className="col-md-6" key={appointment._id}>
                                <div className="card appointment-card shadow-sm">
                                    <div className="card-body">
                                        <div className="d-flex gap-3">
                                            <div className="bg-primary text-white rounded p-3 text-center" style={{ minWidth: '80px' }}>
                                                <div className="fw-bold" style={{ fontSize: '28px' }}>{getDayNumber(appointment.date)}</div>
                                                <small>{getMonthName(appointment.date)}</small>
                                                <div className="mt-2"><small>{getYear(appointment.date)}</small></div>
                                            </div>
                                            <div className="flex-grow-1">
                                                <div className="d-flex justify-content-between align-items-start mb-2">
                                                    <h5 className="mb-0">{appointment.doctorId?.name}</h5>
                                                    <span className="badge bg-info">Confirmé</span>
                                                </div>
                                                <p className="text-muted mb-1">
                                                    {/* <i className="fas fa-eye me-2"></i>{appointment.date} */}
                                                </p>
                                                <p className="text-muted mb-1">
                                                    {/* <i className="far fa-clock me-2"></i>{appointment.creneau} */}
                                                </p>
                                                <p className="text-muted mb-3">
                                                    <i className="fas fa-map-marker-alt me-2"></i>Centre Médical Vision, Marrakech
                                                </p>
                                                <div className="d-flex gap-2">
                                                    <button className="btn btn-sm btn-outline-primary">
                                                        <i className="fas fa-edit me-1"></i>Modifier
                                                    </button>
                                                    <button className="btn btn-sm btn-outline-danger">
                                                        <i className="fas fa-times me-1"></i>Annuler
                                                    </button>
                                                    <button className="btn btn-sm btn-outline-success">
                                                        <i className="fas fa-directions me-1"></i>Itinéraire
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                              ))} 
                        </div>
                    </div>

                    {/* Past Appointments */}
                    <div className="tab-pane fade " id="past">
                        <div className="row g-4">
                            <div className="col-md-6">
                                <div className="card shadow-sm">
                                    <div className="card-body">
                                        <div className="d-flex gap-3">
                                            <div className="bg-secondary text-white rounded p-3 text-center" style={{ minWidth: '80px' }}>
                                                <div className="fw-bold" style={{ fontSize: '28px' }}>15</div>
                                                <small>Décembre</small>
                                                <div className="mt-2"><small>2023</small></div>
                                            </div>
                                            <div className="flex-grow-1">
                                                <div className="d-flex justify-content-between align-items-start mb-2">
                                                    <h5 className="mb-0">Dr. Khalid Youssef</h5>
                                                    <span className="badge bg-success">Complété</span>
                                                </div>
                                                <p className="text-muted mb-1">
                                                    <i className="fas fa-stethoscope me-2"></i>Médecine Interne - Suivi
                                                </p>
                                                <p className="text-muted mb-3">
                                                    <i className="far fa-clock me-2"></i>5:00 PM
                                                </p>
                                                <button className="btn btn-sm btn-outline-primary">
                                                    <i className="fas fa-redo me-1"></i>Reprendre RDV
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        
                        </div>
                    </div>

                    {/* Cancelled Appointments */}
                    <div className="tab-pane fade" id="cancelled">
                        <div className="alert alert-info">
                            <i className="fas fa-info-circle me-2"></i>
                            Aucun rendez-vous annulé pour le moment
                        </div>
                    </div>
                </div>
            </div>

            {/* New Appointment Modal */}
            <div className="modal fade" id="newAppointmentModal" tabIndex={-1}>
                <div className="modal-dialog modal-lg">
                    <div className="modal-content">
                        <div className="modal-header bg-primary text-white">
                            <h5 className="modal-title">Nouveau Rendez-vous</h5>
                            <button 
                                type="button" 
                                className="btn-close btn-close-white" 
                                data-bs-dismiss="modal"
                            ></button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div className="mb-3">
                                    <label className="form-label">Spécialité</label>
                                    <select className="form-select">
                                        <option>Médecine Générale</option>
                                        <option>Dentiste</option>
                                        <option>Ophtalmologie</option>
                                        <option>Cardiologie</option>
                                        <option>Dermatologie</option>
                                    </select>
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Médecin</label>
                                    <select className="form-select">
                                        <option>Dr. Sarah Ahmed</option>
                                        <option>Dr. Mohamed Ali</option>
                                        <option>Dr. Khalid Youssef</option>
                                    </select>
                                </div>
                                <div className="row">
                                    <div className="col-md-6 mb-3">
                                        <label className="form-label">Date</label>
                                        <input type="date" className="form-control" />
                                    </div>
                                    <div className="col-md-6 mb-3">
                                        <label className="form-label">Heure</label>
                                        <select className="form-select">
                                            <option>09:00</option>
                                            <option>10:00</option>
                                            <option>11:00</option>
                                            <option>14:00</option>
                                            <option>15:00</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Motif de consultation</label>
                                    <textarea 
                                        className="form-control" 
                                        rows={3} 
                                        placeholder="Décrivez brièvement votre motif..."
                                    ></textarea>
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button 
                                type="button" 
                                className="btn btn-secondary" 
                                data-bs-dismiss="modal"
                            >
                                Annuler
                            </button>
                            <button type="button" className="btn btn-primary">
                                Confirmer le rendez-vous
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Appointment;
