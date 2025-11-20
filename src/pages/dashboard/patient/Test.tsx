import { useEffect, useState } from "react";
import SideBare from "../../../components/dashboard/Patient/SideBare";
import type { Test } from "../../../types/test";
import { getTestsApi } from "../../../api/test.api";

function Test() {
    const [loading,setLoading]=useState(false)
    const [errorMessage,setErrorMessage]=useState("")
    const [myTests,setMyTests]=useState<Test[]>([])
    useEffect(()=>{
         const  fetchData=async()=>{
        setLoading(true);
        const tests=await getTestsApi(setErrorMessage);
        setMyTests(tests);
        setLoading(false);

       
    }
    fetchData();
    

    },[])
    console.log(myTests);
    
      
    return(
        <>
        <SideBare/>
         
    <div className="main-content">
        
        <div className="d-flex justify-content-between align-items-center mb-4">
            <div>
                <h2><i className="fas fa-flask text-success me-2"></i>Mes Analyses</h2>
                <p className="text-muted">Consultez vos résultats d'analyses médicales</p>
            </div>
            <button className="btn btn-success">
                <i className="fas fa-plus me-2"></i>Demander une analyse
            </button>
        </div>

        {/* <!-- Stats --> */}
        <div className="row g-3 mb-4">
            <div className="col-md-4">
                <div className="card shadow-sm border-start border-success border-4">
                    <div className="card-body">
                        <div className="d-flex justify-content-between">
                            <div>
                                <h6 className="text-muted">Résultats Disponibles</h6>
                                <h3>4</h3>
                            </div>
                            <i className="fas fa-check-circle fa-2x text-success"></i>
                        </div>
                    </div>
                </div>
            </div>
            <div className="col-md-4">
                <div className="card shadow-sm border-start border-warning border-4">
                    <div className="card-body">
                        <div className="d-flex justify-content-between">
                            <div>
                                <h6 className="text-muted">En cours</h6>
                                <h3>2</h3>
                            </div>
                            <i className="fas fa-hourglass-half fa-2x text-warning"></i>
                        </div>
                    </div>
                </div>
            </div>
            <div className="col-md-4">
                <div className="card shadow-sm border-start border-primary border-4">
                    <div className="card-body">
                        <div className="d-flex justify-content-between">
                            <div>
                                <h6 className="text-muted">Total cette année</h6>
                                <h3>12</h3>
                            </div>
                            <i className="fas fa-vial fa-2x text-primary"></i>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <ul className="nav nav-tabs mb-4">
            <li className="nav-item">
                <button className="nav-link active" data-bs-toggle="tab" data-bs-target="#available">
                    <i className="fas fa-check-circle me-2"></i>Disponibles (4)
                </button>
            </li>
            <li className="nav-item">
                <button className="nav-link" data-bs-toggle="tab" data-bs-target="#pending">
                    <i className="fas fa-clock me-2"></i>En cours (2)
                </button>
            </li>
            <li className="nav-item">
                <button className="nav-link" data-bs-toggle="tab" data-bs-target="#history">
                    <i className="fas fa-history me-2"></i>Historique
                </button>
            </li>
        </ul>

        <div className="tab-content">
            {/* <!-- Available Results --> */}
            <div className="tab-pane fade show active" id="available">
                <div className="row g-4">
                    <div className="col-md-6">
                        <div className="card test-card shadow-sm border-start border-success border-4">
                            <div className="card-body">
                                <div className="d-flex justify-content-between align-items-start mb-3">
                                    <div>
                                        <h5>Numération Formule Sanguine (NFS)</h5>
                                        <p className="text-muted mb-1">
                                            <i className="fas fa-hospital me-2"></i>Laboratoire BioMed
                                        </p>
                                        <p className="text-muted mb-1">
                                            <i className="fas fa-calendar me-2"></i>20 Janvier 2024
                                        </p>
                                        <p className="text-muted">
                                            <i className="fas fa-user-md me-2"></i>Prescrit par: Dr. Khalid Youssef
                                        </p>
                                    </div>
                                    <span className="badge bg-success">Disponible</span>
                                </div>
                                <div className="d-flex gap-2">
                                    <button className="btn btn-primary btn-sm">
                                        <i className="fas fa-download me-1"></i>Télécharger PDF
                                    </button>
                                    <button className="btn btn-outline-primary btn-sm">
                                        <i className="fas fa-eye me-1"></i>Voir détails
                                    </button>
                                    <button className="btn btn-outline-secondary btn-sm">
                                        <i className="fas fa-share me-1"></i>Partager
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                   

                    

                    
                </div>
            </div>

            {/* <!-- Pending Tests --> */}
            <div className="tab-pane fade" id="pending">
                <div className="row g-4">
                    <div className="col-md-6">
                        <div className="card test-card shadow-sm border-start border-warning border-4">
                            <div className="card-body">
                                <div className="d-flex justify-content-between align-items-start mb-3">
                                    <div>
                                        <h5>HbA1c (Hémoglobine Glyquée)</h5>
                                        <p className="text-muted mb-1">
                                            <i className="fas fa-hospital me-2"></i>Laboratoire Central
                                        </p>
                                        <p className="text-muted mb-1">
                                            <i className="fas fa-calendar me-2"></i>Demandé le: 22 Janvier 2024
                                        </p>
                                        <p className="text-muted">
                                            <i className="fas fa-user-md me-2"></i>Prescrit par: Dr. Khalid Youssef
                                        </p>
                                    </div>
                                    <span className="badge bg-warning text-dark">En cours</span>
                                </div>
                                <div className="progress mb-2" style={{height: "25px"}}>
                                    <div className="progress-bar bg-warning" style={{width: "65%"}}>65%</div>
                                </div>
                                <small className="text-muted">
                                    <i className="fas fa-clock me-1"></i>Résultat estimé: 24 Janvier 2024
                                </small>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-6">
                        <div className="card test-card shadow-sm border-start border-warning border-4">
                            <div className="card-body">
                                <div className="d-flex justify-content-between align-items-start mb-3">
                                    <div>
                                        <h5>Fonction Rénale</h5>
                                        <p className="text-muted mb-1">
                                            <i className="fas fa-hospital me-2"></i>Laboratoire BioMed
                                        </p>
                                        <p className="text-muted mb-1">
                                            <i className="fas fa-calendar me-2"></i>Demandé le: 23 Janvier 2024
                                        </p>
                                        <p className="text-muted">
                                            <i className="fas fa-user-md me-2"></i>Prescrit par: Dr. Khalid Youssef
                                        </p>
                                    </div>
                                    <span className="badge bg-warning text-dark">En cours</span>
                                </div>
                                <div className="progress mb-2" style={{height: "25px"}}>
                                    <div className="progress-bar bg-warning" style={{width: "30%"}}>30%</div>
                                </div>
                                <small className="text-muted">
                                    <i className="fas fa-clock me-1"></i>Résultat estimé: 25 Janvier 2024
                                </small>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* <!-- History --> */}
            <div className="tab-pane fade" id="history">
                <div className="card shadow-sm">
                    <div className="card-body">
                        <div className="table-responsive">
                            <table className="table table-hover">
                                <thead>
                                    <tr>
                                        <th>Type d'analyse</th>
                                        <th>Laboratoire</th>
                                        <th>Date</th>
                                        <th>Médecin</th>
                                        <th>Statut</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td><strong>NFS</strong></td>
                                        <td>Laboratoire BioMed</td>
                                        <td>20 Jan 2024</td>
                                        <td>Dr. Khalid Youssef</td>
                                        <td><span className="badge bg-success">Disponible</span></td>
                                        <td>
                                            <button className="btn btn-sm btn-primary"><i className="fas fa-download"></i></button>
                                            <button className="btn btn-sm btn-info"><i className="fas fa-eye"></i></button>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td><strong>Vitamine D</strong></td>
                                        <td>Laboratoire Central</td>
                                        <td>15 Jan 2024</td>
                                        <td>Dr. Sarah Ahmed</td>
                                        <td><span className="badge bg-success">Disponible</span></td>
                                        <td>
                                            <button className="btn btn-sm btn-primary"><i className="fas fa-download"></i></button>
                                            <button className="btn btn-sm btn-info"><i className="fas fa-eye"></i></button>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td><strong>Glycémie</strong></td>
                                        <td>Laboratoire BioMed</td>
                                        <td>10 Jan 2024</td>
                                        <td>Dr. Khalid Youssef</td>
                                        <td><span className="badge bg-success">Disponible</span></td>
                                        <td>
                                            <button className="btn btn-sm btn-primary"><i className="fas fa-download"></i></button>
                                            <button className="btn btn-sm btn-info"><i className="fas fa-eye"></i></button>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
        </>
    )
    
}
export default Test;