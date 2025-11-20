import {  useEffect, useState } from 'react';
import SideBare from '../../../components/dashboard/Patient/SideBare';
import '../../../styles/pages/appointment.css';
import { jwtDecode } from 'jwt-decode';
// import type { Appointment } from '../../../api/appointment.api';
import { createAppointmentApi, getAppointmentsApi, type Appointment } from '../../../api/appointment.api';
import { getSpecialiteApi, type Specialite } from '../../../api/specialite.api';
import { getDoctorsApi, type User } from '../../../api/user.api';
import { getDisponibilitesApi, type Disponibilite } from '../../../api/disponibilite.api';
import type { Creneau } from '../../../types/creneau';
import { getCreneauxByIdApi } from '../../../api/creneau.api';

function Appointment() {
    const [showModal, setShowModal] = useState(false);
    const [errorMessage,setErrorMessage]=useState('');
    const [loading, setLoading] = useState(false);
    const [myAppointments,setMyAppointments]=useState<Appointment[]>([])
    const [mySpecialites,setMySpecialites]=useState<Specialite[]>([])
    const [filterDoctors,setFilterDoctors]=useState<User[]>([])
    const [disponibilites,setDisponibilites]=useState<Disponibilite[]>([])
    const [creneaux,setCreneaux]=useState<Creneau[]>([])
    const [doctors,setDoctors]=useState<User[]>([]);
    
    // Form state variables
    const [selectedSpecialite, setSelectedSpecialite] = useState('');
    const [selectedDoctor, setSelectedDoctor] = useState('');
    const [selectedDisponibilite, setSelectedDisponibilite] = useState('');
    const [selectedCreneau, setSelectedCreneau] = useState('');
    const [consultationType, setConsultationType] = useState('');
    const [consultationReason, setConsultationReason] = useState('');
    
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
     useEffect(() => {
     const  fetchDocteur=async()=>{
        const doctors=await getDoctorsApi(setErrorMessage)
        setDoctors(doctors)
        setLoading(false);
     }
     fetchDocteur();
  },[])

//   console.log("spe",mySpecialites);
  
  function handleSpecialiteChange(event: React.ChangeEvent<HTMLSelectElement>) {
    const selectedSpecialiteId = event.target.value;
    setSelectedSpecialite(selectedSpecialiteId);
    const filteredDoctors = doctors.filter((doctor) =>  doctor.specialite=== selectedSpecialiteId);
    setFilterDoctors(filteredDoctors);
    
    // Reset dependent fields
    setSelectedDoctor('');
    setSelectedDisponibilite('');
    setSelectedCreneau('');
    setDisponibilites([]);
    setCreneaux([]);
}
function handlerDoctorChange(event: React.ChangeEvent<HTMLSelectElement>) {
      const selectedDoctorId = event.target.value;
      setSelectedDoctor(selectedDoctorId);
      console.log('docId',selectedDoctorId);
      
      // You can use the selectedDoctorId as needed
     const fetchDisponibilites=async()=>{
        const disponibilites = await getDisponibilitesApi(selectedDoctorId,setErrorMessage);
        // ensure we always set an array of Disponibilite
        setDisponibilites(Array.isArray(disponibilites) ? disponibilites : [disponibilites]);
        
  }
        fetchDisponibilites();
        
        // Reset dependent fields
        setSelectedDisponibilite('');
        setSelectedCreneau('');
        setCreneaux([]);

    }
//  console.log('dispo',disponibilites);
//  disponibilites.forEach((disponibilite) => {
//     console.log(`Disponibilité le ${disponibilite.jour} de ${disponibilite.dateHeureDebut} à ${disponibilite.dateHeureFin}`);
//   }

//  )

 const handleDisponibiliteChange=(event:React.ChangeEvent<HTMLSelectElement>)=>{
    console.log("eventtarget",event.target.value);
    
    const disponibiliteId=event.target.value;
    setSelectedDisponibilite(disponibiliteId);
    const fetchCreneaux=async()=>{
        const creneaux =await getCreneauxByIdApi(disponibiliteId,setErrorMessage);
        // ensure we always set an array of Creneau
        setCreneaux(Array.isArray(creneaux) ? creneaux : [creneaux]);

    }
    fetchCreneaux();
    
    // Reset dependent field
    setSelectedCreneau('');
 }
        const freeCreneaux=creneaux.filter(function (creneau){return creneau.statut==='libre'});

 // Create appointment function
  const patientId = getPatientId();
  const   createAppointment=async (e:React.MouseEvent<HTMLButtonElement>)=> {
    e.preventDefault();
    
    // Validation
    if (!selectedSpecialite || !selectedDoctor || !selectedDisponibilite || !selectedCreneau || !consultationType || !consultationReason) {
        setErrorMessage('Veuillez remplir tous les champs requis');
        return;
    }
    
    try {
      setLoading(true);
      await createAppointmentApi(
        selectedDoctor,          // doctorId
        patientId,              // patientId  
        selectedDisponibilite,   // disponibiliteId (to get date)
        selectedCreneau,        // creneau
        consultationReason,     // consultationReason
        consultationType,       // typeConsultation
        setErrorMessage
      );
      
      // Reset form on success
      setSelectedSpecialite('');
      setSelectedDoctor('');
      setSelectedDisponibilite('');
      setSelectedCreneau('');
      setConsultationType('');
      setConsultationReason('');
      setFilterDoctors([]);
      setDisponibilites([]);
      setCreneaux([]);
      
      // Close modal and refresh appointments
      setShowModal(false);
      const appointments = await getAppointmentsApi(setErrorMessage);
      setMyAppointments(appointments);
      
      alert('Rendez-vous créé avec succès!');
      
    } catch (error) {
      console.error('Error creating appointment:', error);
    } finally {
      setLoading(false);
    }
  }

 console.log(myAppointments);
 
    useEffect(()=>{
    const patientId = getPatientId();
    const  fetchAppointments=async()=>{
        const appointments= await getAppointmentsApi(setErrorMessage)
        setMyAppointments(appointments);
        setLoading(false);
    }
    fetchAppointments();
  
    


    },[])

 
  console.log("doctors",doctors);
  


    useEffect(() =>{
       const fetchSpecialites=async()=>{
         const specialites=await getSpecialiteApi(setErrorMessage)
        setMySpecialites(specialites)
        setLoading(false);
       }
       fetchSpecialites();

    },[])
    // console.log('specia',mySpecialites);
    
//       useEffect(() => {
//     console.log('myAppointments state updated:', myAppointments);
// }, [myAppointments]);

// console.log(myAppointments);

     const upComingAppointments=myAppointments.filter(function(appointment){return appointment.status==="confirmed"})
     const concelledAppointments=myAppointments.filter(function(appointment){return appointment.status==='cancelled'})
     const pastAppointments=myAppointments.filter((appointment)=>appointment.status==="completed")
// console.log()
// console.log(concelledAppointments);


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
                        onClick={() => {
                            setShowModal(true);
                            setErrorMessage('');
                        }}
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
                            {upComingAppointments.map((appointment)=>(

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
                                                    <span className="badge bg-info">{appointment.status}</span>
                                                </div>
                                                <p className="text-muted mb-1">
                                                    {/* <i className="fas fa-eye me-2"></i>{appointment.date} */}
                                                </p>
                                                <p className="text-muted mb-1">
                                                    {/* <i className="far fa-clock me-2"></i>{appointment.creneau} */}
                                                </p>
                                                <p className="text-muted mb-3">
                                                    <i className="fas fa-map-marker-alt me-2"></i>{appointment.doctorId?.address}
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
                                                    <span className="badge bg-info">{appointment.status}</span>
                                                </div>
                                                <p className="text-muted mb-1">
                                                    {/* <i className="fas fa-eye me-2"></i>{appointment.date} */}
                                                </p>
                                                <p className="text-muted mb-1">
                                                    {/* <i className="far fa-clock me-2"></i>{appointment.creneau} */}
                                                </p>
                                                <p className="text-muted mb-3">
                                                    <i className="fas fa-map-marker-alt me-2"></i>{appointment.doctorId?.address}
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

                    {/* Cancelled Appointments */}
                    <div className="tab-pane fade" id="cancelled">
                        {concelledAppointments.length===0 ? (
                            <div className="alert alert-info">
                            <i className="fas fa-info-circle me-2"></i>
                            Aucun rendez-vous annulé pour le moment
                        </div>):(
                             <div className="row g-4">
                            {concelledAppointments.map((appointment)=>(

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
                                                    <span className="badge bg-info">{appointment.status}</span>
                                                </div>
                                                <p className="text-muted mb-1">
                                                    {/* <i className="fas fa-eye me-2"></i>{appointment.date} */}
                                                </p>
                                                <p className="text-muted mb-1">
                                                    {/* <i className="far fa-clock me-2"></i>{appointment.creneau} */}
                                                </p>
                                                <p className="text-muted mb-3">
                                                    <i className="fas fa-map-marker-alt me-2"></i>{appointment.doctorId?.address}
                                                </p>
                                                {/* <div className="d-flex gap-2">
                                                    <button className="btn btn-sm btn-outline-primary">
                                                        <i className="fas fa-edit me-1"></i>Modifier
                                                    </button>
                                                    <button className="btn btn-sm btn-outline-danger">
                                                        <i className="fas fa-times me-1"></i>Annuler
                                                    </button>
                                                    <button className="btn btn-sm btn-outline-success">
                                                        <i className="fas fa-directions me-1"></i>Itinéraire
                                                    </button>
                                                </div> */}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                              ))} 
                        </div>
                        )
                        }
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
                            {errorMessage && (
                                <div className="alert alert-danger" role="alert">
                                    {errorMessage}
                                </div>
                            )}
                            <form>
                                <div className="mb-3">
                                    <label className="form-label">Spécialité</label>
                                    <select value={selectedSpecialite} onChange={handleSpecialiteChange} className="form-select">
                                        <option value="">choisir</option>
                                        { mySpecialites.map(element => (
                                            
                                       
                                        <option key={element._id} value={element._id}>{element.name}</option>
                                         ))}
                                    </select>
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Médecin</label>
                                    {filterDoctors.length===0 ?(<p className="text-muted">Aucun doctor disponible dans cette spécialité .</p>
                                    ):(<select value={selectedDoctor} onChange={handlerDoctorChange} className="form-select">
                                        <option value="">Select</option>
                                        {filterDoctors.map((doctor)=>(
                                            <option key={doctor._id} value={doctor._id}>{doctor.name}</option>
                                        ))}
                                    </select>)}
                                    
                                </div>
                                <div className="row">
                                    <div className="col-md-6 mb-3">
                                        <label className="form-label">Date</label>
                                        {disponibilites.length === 0 ? (
                                            <p className="text-muted">Aucune disponibilité pour ce médecin.</p>
                                        ) : (
                                            <select value={selectedDisponibilite} onChange={handleDisponibiliteChange} className="form-select">
                                                <option value="">Choisir une date</option>
                                                {disponibilites.map((disponibilite) => (
                                                    <option key={disponibilite._id} value={disponibilite._id}>
                                                        {formatDate(disponibilite.dateHeureDebut)}
                                                    </option>
                                                ))}
                                            </select>
                                        )}
                                    </div>
                                    <div className="col-md-6 mb-3">
                                        <label className="form-label">Heure</label>
                                        {freeCreneaux.length === 0 ? (
                                            <p className="text-muted">Sélectionnez d'abord une date.</p>
                                        ) : (
                                            <select value={selectedCreneau} onChange={(e) => setSelectedCreneau(e.target.value)} className="form-select">
                                                <option value="">Choisir un créneau</option>
                                                {freeCreneaux.map((creneau) => (
                                                    <option key={creneau._id} value={creneau._id}>
                                                        {creneau.heure_debut} - {creneau.heure_fin}
                                                    </option>
                                                ))}
                                            </select>
                                        )}
                                    </div>
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Type de consultation</label>
                                    <select value={consultationType} onChange={(e) => setConsultationType(e.target.value)} className="form-select">
                                        <option value="">Choisir le type</option>
                                        <option value="offline">Consultation en présentiel</option>
                                        <option value="online">Consultation en ligne</option>
                                    </select>
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Motif de consultation</label>
                                    <textarea 
                                        value={consultationReason}
                                        onChange={(e) => setConsultationReason(e.target.value)}
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
                            <button type="button" onClick={createAppointment} disabled={loading} className="btn btn-primary">
                                {loading ? 'Création...' : 'Confirmer le rendez-vous'}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Appointment;
