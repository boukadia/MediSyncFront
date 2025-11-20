// function MainContent() {
//     return (
//         <>
        
//         {/* Main Content Grid */}
//         <div className="row g-4">
//           {/* Upcoming Appointments */}
//           <div className="col-md-6">
//             <div className="card shadow-sm">
//               <div className="card-header bg-primary text-white d-flex justify-content-between align-items-center">
//                 <h5 className="mb-0"><i className="fas fa-calendar-alt me-2"></i>Prochains Rendez-vous</h5>
//                 <a href="#" className="btn btn-sm btn-light">Voir tout</a>
//               </div>
//               <div className="card-body">
               
//                 <div className="appointment-card bg-light p-3">
//                   <div className="d-flex gap-3">
//                     <div className="bg-primary text-white rounded p-2 text-center" style={{minWidth: '60px'}}>
//                       <div className="fw-bold" style={{fontSize: '24px'}}>02</div>
//                       <small>Fév</small>
//                     </div>
//                     <div className="flex-grow-1">
//                       <h6 className="mb-1">Dr. Mohamed Ali</h6>
//                       <p className="text-muted mb-1 small">Dentiste - Nettoyage</p>
//                       <small className="text-primary"><i className="far fa-clock"></i> 2:30 PM</small>
//                     </div>
//                     <span className="badge bg-warning align-self-start">En attente</span>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Recent Test Results */}
//           <div className="col-md-6">
//             <div className="card shadow-sm">
//               <div className="card-header bg-success text-white d-flex justify-content-between align-items-center">
//                 <h5 className="mb-0"><i className="fas fa-vial me-2"></i>Résultats Récents</h5>
//                 <a href="#" className="btn btn-sm btn-light">Voir tout</a>
//               </div>
//               <div className="card-body">
//                 <div className="border-start border-success border-4 bg-light p-3 mb-3">
//                   <div className="d-flex justify-content-between align-items-center">
//                     <div>
//                       <h6>NFS - Numération Formule Sanguine</h6>
//                       <small className="text-muted">20 Janvier 2024</small>
//                     </div>
//                     <span className="badge bg-success">Disponible</span>
//                   </div>
//                   <button className="btn btn-sm btn-primary mt-2">
//                     <i className="fas fa-download"></i> Télécharger
//                   </button>
//                 </div>
               
//               </div>
//             </div>
//           </div>

//           {/* Active Prescriptions */}
//           <div className="col-md-6">
//             <div className="card shadow-sm">
//               <div className="card-header bg-warning text-white d-flex justify-content-between align-items-center">
//                 <h5 className="mb-0"><i className="fas fa-prescription me-2"></i>Ordonnances Actives</h5>
//                 <a href="#" className="btn btn-sm btn-light">Voir tout</a>
//               </div>
//               <div className="card-body">
//                 <div className="mb-3 p-3 bg-light rounded">
//                   <div className="d-flex justify-content-between mb-2">
//                     <h6>Dr. Khalid Youssef</h6>
//                     <small className="text-muted">15 Déc 2023</small>
//                   </div>
//                   <div className="d-flex justify-content-between align-items-center bg-white p-2 rounded mb-2">
//                     <div>
//                       <strong>Metformine 500mg</strong>
//                       <small className="text-muted d-block">2 fois/jour après repas</small>
//                     </div>
//                     <span className="badge bg-success">30 jours</span>
//                   </div>
//                   <div className="d-flex justify-content-between align-items-center bg-white p-2 rounded">
//                     <div>
//                       <strong>Vitamine D3 1000 UI</strong>
//                       <small className="text-muted d-block">1 fois/jour</small>
//                     </div>
//                     <span className="badge bg-success">90 jours</span>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Health Tips */}
//           <div className="col-md-6">
//             <div className="card shadow-sm">
//               <div className="card-header bg-info text-white">
//                 <h5 className="mb-0"><i className="fas fa-lightbulb me-2"></i>Conseils Santé</h5>
//               </div>
//               <div className="card-body">
//                 <div className="mb-3">
//                   <div className="d-flex gap-2">
//                     <i className="fas fa-check-circle text-success mt-1"></i>
//                     <div>
//                       <strong>Hydratation</strong>
//                       <p className="text-muted small mb-0">Buvez au moins 1.5L d'eau par jour</p>
//                     </div>
//                   </div>
//                 </div>
//                 <div className="mb-3">
//                   <div className="d-flex gap-2">
//                     <i className="fas fa-check-circle text-success mt-1"></i>
//                     <div>
//                       <strong>Activité Physique</strong>
//                       <p className="text-muted small mb-0">30 minutes de marche quotidienne recommandée</p>
//                     </div>
//                   </div>
//                 </div>
//                 <div>
//                   <div className="d-flex gap-2">
//                     <i className="fas fa-check-circle text-success mt-1"></i>
//                     <div>
//                       <strong>Sommeil</strong>
//                       <p className="text-muted small mb-0">Dormez 7-8 heures par nuit</p>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//         </>
//     );
// }

// export default MainContent;