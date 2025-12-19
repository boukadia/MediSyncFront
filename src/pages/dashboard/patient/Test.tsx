import { useEffect, useState } from "react";
import SideBare from "../../../components/dashboard/Patient/SideBare";
import type { Test } from "../../../types/test";
import { getTestsApi } from "../../../api/test.api";
import { jwtDecode } from "jwt-decode";
import Header from "../../../components/dashboard/Patient/Header";
import { getDoctorsApi, getUsersApi, type User } from "../../../api/user.api";
import { getLaboratoiresApi } from "../../../api/laboratoire.api";
import type { Laboratoire } from "../../../types/laboratoire";

function Test() {
  const token = localStorage.getItem("token");
  const decodedToken = jwtDecode(token);
  const user: { role: string; name: string; email: string } = decodedToken;
  const [loading, setLoading] = useState(false);
  const [doctors, setDoctors] = useState<User[]>([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [myTests, setMyTests] = useState<Test[]>([]);
  const [laboratoires, setLaboratoires] = useState<Laboratoire[]>([]);
function dateEstime(id: string) {
    const date = new Date(id);
    date.setDate(date.getDate() + 3);
    return date.toLocaleDateString("fr-FR", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
    }); // Formats the date to a readable string
}

  useEffect(() => {
    const getTests = async () => {
      setLoading(true);
      const tests = await getTestsApi(setErrorMessage);
      setMyTests(tests);
      setLoading(false);
    };
    getTests();
    const getDoctores = async () => {
      const doctors = await getDoctorsApi(setErrorMessage);
      setDoctors(doctors);
      setLoading(false);

      return doctors;
    };
    getDoctores();
    const getLab=async ()=>{
        const lab=await getLaboratoiresApi(setErrorMessage);
        
        setLoading(false);
        setLaboratoires(lab);
        return lab; 
    }
    getLab();
  }, []);
  console.log("lab", laboratoires);

  function filterDoctors(id: string) {
    const doctor = doctors.find((doctor) => doctor._id === id);
    return doctor ? doctor.name : "Docteur inconnu";
  }
  const completedTests=myTests.filter((test)=>test.status==="completed");
  const pendingTests=myTests.filter((test)=>test.status==="pending");
  const enCoursTests=myTests.filter((test)=>test.status==="en-cours");
  const filterLaboratoire=(id:string)=>{
    const lab=laboratoires.find((lab)=>lab._id===id);
    return lab ? lab.name : "Laboratoire inconnu";
  }

  // Function to format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    };
    return date.toLocaleDateString("fr-FR", options);
  };

  return (
    <>
      <SideBare />

      <div className="main-content">
        <Header user={user} />

        <div className="d-flex justify-content-between align-items-center mb-4">
          <div>
            <h2>
              <i className="fas fa-flask text-success me-2"></i>Mes Analyses
            </h2>
            <p className="text-muted">
              Consultez vos résultats d'analyses médicales
            </p>
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
                    <h3>{myTests.length}</h3>
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
                    <h3>{enCoursTests.length}</h3>
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
            <button
              className="nav-link active"
              data-bs-toggle="tab"
              data-bs-target="#available"
            >
              <i className="fas fa-check-circle me-2"></i>Disponibles (
              {completedTests.length})
            </button>
          </li>
          <li className="nav-item">
            <button
              className="nav-link"
              data-bs-toggle="tab"
              data-bs-target="#pending"
            >
              <i className="fas fa-clock me-2"></i>En cours ({enCoursTests.length})
            </button>
          </li>
          <li className="nav-item">
            <button
              className="nav-link"
              data-bs-toggle="tab"
              data-bs-target="#history"
            >
              <i className="fas fa-history me-2"></i>Historique
            </button>
          </li>
        </ul>

        <div className="tab-content">
          {/* <!-- Available Results --> */}
          <div className="tab-pane fade show active" id="available">
            <div className="row g-4">
              {completedTests.map((test) => (
                <div className="col-md-6">
                  <div className="card test-card shadow-sm border-start border-success border-4">
                    <div className="card-body">
                      <div className="d-flex justify-content-between align-items-start mb-3">
                        <div>
                          <h5> {test.labOrderTestId.name} ({test.labOrderTestId.code})</h5>
                          <p className="text-muted mb-1">
                            <i className="fas fa-hospital me-2"></i>{filterLaboratoire(test.labOrderTestId.labOrderId.laboratoireId)}
                          </p>
                          <p className="text-muted mb-1">
                            <i className="fas fa-calendar me-2"></i>{formatDate(test.date)}
                          </p>
                          <p className="text-muted">
                            <i className="fas fa-user-md me-2"></i>Prescrit par:
                            {filterDoctors(test.labOrderTestId.labOrderId.doctorId)}
                          </p>
                        </div>
                        <span className="badge bg-success">{test.status}</span>
                      </div>
                      <div className="d-flex gap-2">
                        <button className="btn btn-primary btn-sm">
                          <i className="fas fa-download me-1"></i>Télécharger
                          PDF
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
              ))}
            </div>
          </div>

          {/* <!-- Pending Tests --> */}
          <div className="tab-pane fade" id="pending">
            <div className="row g-4">
                {enCoursTests.map((test)=>(
              <div className="col-md-6">
                <div className="card test-card shadow-sm border-start border-warning border-4">
                  <div className="card-body">
                    <div className="d-flex justify-content-between align-items-start mb-3">
                      <div>
                        <h5>{test.labOrderTestId.name} ({test.labOrderTestId.code})</h5>
                        <p className="text-muted mb-1">
                          <i className="fas fa-hospital me-2"></i>{filterLaboratoire(test.labOrderTestId.labOrderId.laboratoireId)}
                        </p>
                        <p className="text-muted mb-1">
                          <i className="fas fa-calendar me-2"></i>Demandé le:{formatDate(test.date)}
                        </p>
                        <p className="text-muted">
                          <i className="fas fa-user-md me-2"></i>Prescrit par:
                          {filterDoctors(test.labOrderTestId.labOrderId.doctorId)}
                        </p>
                      </div>
                      <span className="badge bg-warning text-dark">
                        {test.status}
                      </span>
                    </div>
                    <div className="progress mb-2" style={{ height: "25px" }}>
                      {/* <div
                        className="progress-bar bg-warning"
                        style={{ width: "65%" }}
                      >
                        65%
                      </div> */}
                    </div>
                    <small className="text-muted">

                      <i className="fas fa-clock me-1"></i>Résultat estimé: {dateEstime(test.date)}
                    </small>
                  </div>
                </div>
              </div>
              ))}

             
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
                        {myTests.map((test)=>(
                      <tr>
                        <td>
                          <strong>{test.labOrderTestId.code}</strong>
                        </td>
                        <td>{filterLaboratoire(test.labOrderTestId.labOrderId.laboratoireId)}</td>
                        <td>{formatDate(test.date)}</td>
                        <td>{filterDoctors(test.labOrderTestId.labOrderId.doctorId)}</td>
                        <td>
                          <span className="badge bg-success">{test.status}</span>
                        </td>
                        <td>
                          <button className="btn btn-sm btn-primary">
                            <i className="fas fa-download"></i>
                          </button>
                          <button className="btn btn-sm btn-info">
                            <i className="fas fa-eye"></i>
                          </button>
                        </td>
                      </tr>
                      ))}
                      
                      
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default Test;
