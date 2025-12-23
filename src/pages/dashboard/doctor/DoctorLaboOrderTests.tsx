import { useEffect, useState } from 'react';
import SideBar from '../../../components/dashboard/doctor/SideBar';
import '../../../styles/pages/doctorDashboard.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { getMyTestsApi, type Test } from '../../../api/test.api';

function DoctorLaboOrderTests() {
    const [errorMessage, setErrorMessage] = useState('');
    const [loading, setLoading] = useState(true);
    const [myTests, setMyTests] = useState<Test[]>([]);

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

    // Function to get badge color based on status
    const getBadgeColor = (status: string) => {
        switch (status) {
            case 'en-attent':
                return 'badge-warning';
            case 'completed':
                return 'badge-success';
            default:
                return 'badge-light';
        }
    };

    // Function to get badge color for test result
    const getResultBadgeColor = (isNormal: boolean) => {
        return isNormal ? 'badge-success' : 'badge-danger';
    };

    useEffect(() => {
        const fetchTests = async () => {
            setLoading(true);
            const tests = await getMyTestsApi(setErrorMessage);
            console.log('Tests reçus:', tests);
            setMyTests(Array.isArray(tests) ? tests : []);
            setLoading(false);
        };
        fetchTests();
    }, []);

    // Filter tests by status
    const pendingTests = myTests.filter(test => test.labOrderId?.status === 'en-attent');
    const completedTests = myTests.filter(test => test.labOrderId?.status === 'completed');
    const abnormalTests = myTests.filter(test => !test.isNormal && test.labOrderId?.status === 'completed');

    return (
        <div className="doctor-dashboard">
            <SideBar />

            {/* Main Content */}
            <div className="container-fluid px-4 py-3">
                <div className="d-flex justify-content-between align-items-center mb-4">
                    <div>
                        <h2>
                            <i className="fas fa-flask text-info me-2"></i>
                            Analyses de Laboratoire
                        </h2>
                        <p className="text-muted">Consultez les résultats des tests de vos patients</p>
                    </div>
                </div>

                {/* Error Message */}
                {errorMessage && (
                    <div className="alert alert-danger alert-dismissible fade show" role="alert">
                        <i className="fas fa-exclamation-circle me-2"></i>
                        {errorMessage}
                        <button
                            type="button"
                            className="btn-close"
                            onClick={() => setErrorMessage('')}
                        ></button>
                    </div>
                )}

                {/* Stats */}
                <div className="row g-3 mb-4">
                    <div className="col-lg-4 col-md-6">
                        <div className="card shadow-sm border-start border-warning border-4">
                            <div className="card-body">
                                <h6 className="text-muted">En attente</h6>
                                <h3>{pendingTests.length}</h3>
                                <small className="text-warning">Tests en cours</small>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-4 col-md-6">
                        <div className="card shadow-sm border-start border-success border-4">
                            <div className="card-body">
                                <h6 className="text-muted">Complétés</h6>
                                <h3>{completedTests.length}</h3>
                                <small className="text-success">Résultats disponibles</small>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-4 col-md-6">
                        <div className="card shadow-sm border-start border-danger border-4">
                            <div className="card-body">
                                <h6 className="text-muted">Anormaux</h6>
                                <h3>{abnormalTests.length}</h3>
                                <small className="text-danger">Nécessitent attention</small>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Tabs Navigation */}
                <ul className="nav nav-tabs mb-4" id="testTabs" role="tablist">
                    <li className="nav-item" role="presentation">
                        <button
                            className="nav-link active"
                            data-bs-toggle="tab"
                            data-bs-target="#pending"
                        >
                            <i className="fas fa-clock me-2"></i>En attente ({pendingTests.length})
                        </button>
                    </li>
                    <li className="nav-item" role="presentation">
                        <button
                            className="nav-link"
                            data-bs-toggle="tab"
                            data-bs-target="#completed"
                        >
                            <i className="fas fa-check-circle me-2"></i>Complétés ({completedTests.length})
                        </button>
                    </li>
                    <li className="nav-item" role="presentation">
                        <button
                            className="nav-link"
                            data-bs-toggle="tab"
                            data-bs-target="#all"
                        >
                            <i className="fas fa-list me-2"></i>Tous ({myTests.length})
                        </button>
                    </li>
                </ul>

                {/* Tab Content */}
                <div className="tab-content">
                    {/* Pending Tests */}
                    <div className="tab-pane fade show active" id="pending">
                        {loading ? (
                            <div className="text-center py-5">
                                <div className="spinner-border text-primary" role="status">
                                    <span className="visually-hidden">Chargement...</span>
                                </div>
                            </div>
                        ) : pendingTests.length === 0 ? (
                            <div className="alert alert-info">
                                <i className="fas fa-info-circle me-2"></i>
                                Aucun test en attente
                            </div>
                        ) : (
                            <div className="table-responsive">
                                <table className="table table-hover">
                                    <thead>
                                        <tr>
                                            <th>Patient</th>
                                            <th>Test</th>
                                            <th>Code</th>
                                            <th>Laboratoire</th>
                                            <th>Date Commande</th>
                                            <th>Statut</th>
                                            <th>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {pendingTests.map((test) => (
                                            <tr key={test._id}>
                                                <td>
                                                    <div>
                                                        <strong>{test.labOrderId?.patientId?.name || 'N/A'}</strong>
                                                        <br />
                                                        <small className="text-muted">{test.labOrderId?.patientId?.email || ''}</small>
                                                    </div>
                                                </td>
                                                <td>{test.name || 'N/A'}</td>
                                                <td>
                                                    <code>{test.code || 'N/A'}</code>
                                                </td>
                                                <td>{test.labOrderId?.laboratoireId?.name || 'N/A'}</td>
                                                <td>{test.labOrderId?.dateOrder ? formatDate(test.labOrderId.dateOrder) : 'N/A'}</td>
                                                <td>
                                                    <span className={`badge ${getBadgeColor(test.labOrderId?.status)}`}>
                                                        {test.labOrderId?.status || 'N/A'}
                                                    </span>
                                                </td>
                                                <td>
                                                    <div className="d-flex gap-1">
                                                        <button className="btn btn-sm btn-outline-primary" title="Voir détails">
                                                            <i className="fas fa-eye"></i>
                                                        </button>
                                                        <button className="btn btn-sm btn-outline-info" title="Contacter labo">
                                                            <i className="fas fa-phone"></i>
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>

                    {/* Completed Tests */}
                    <div className="tab-pane fade" id="completed">
                        {completedTests.length === 0 ? (
                            <div className="alert alert-info">
                                <i className="fas fa-info-circle me-2"></i>
                                Aucun test complété
                            </div>
                        ) : (
                            <div className="table-responsive">
                                <table className="table table-hover">
                                    <thead>
                                        <tr>
                                            <th>Patient</th>
                                            <th>Test</th>
                                            <th>Code</th>
                                            <th>Résultat</th>
                                            <th>Unité</th>
                                            <th>Normal</th>
                                            <th>Date</th>
                                            <th>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {completedTests.map((test) => (
                                            <tr key={test._id} className={!test.isNormal ? 'table-warning' : ''}>
                                                <td>
                                                    <div>
                                                        <strong>{test.labOrderId?.patientId?.name || 'N/A'}</strong>
                                                        <br />
                                                        <small className="text-muted">{test.labOrderId?.patientId?.email || ''}</small>
                                                    </div>
                                                </td>
                                                <td>
                                                    <strong>{test.name || 'N/A'}</strong>
                                                    {test.commentaire && (
                                                        <div>
                                                            <small className="text-muted">
                                                                <i className="fas fa-comment me-1"></i>
                                                                {test.commentaire}
                                                            </small>
                                                        </div>
                                                    )}
                                                </td>
                                                <td>
                                                    <code>{test.code || 'N/A'}</code>
                                                </td>
                                                <td>
                                                    <strong className={!test.isNormal ? 'text-danger' : 'text-success'}>
                                                        {test.resultValue || 'N/A'}
                                                    </strong>
                                                </td>
                                                <td>{test.unite || 'N/A'}</td>
                                                <td>
                                                    <span className={`badge ${getResultBadgeColor(test.isNormal)}`}>
                                                        {test.isNormal ? 'Normal' : 'Anormal'}
                                                    </span>
                                                </td>
                                                <td>{test.date ? formatDate(test.date) : 'N/A'}</td>
                                                <td>
                                                    <div className="d-flex gap-1">
                                                        <button className="btn btn-sm btn-outline-primary" title="Voir détails">
                                                            <i className="fas fa-eye"></i>
                                                        </button>
                                                        <button className="btn btn-sm btn-outline-success" title="Télécharger">
                                                            <i className="fas fa-download"></i>
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>

                    {/* All Tests */}
                    <div className="tab-pane fade" id="all">
                        {myTests.length === 0 ? (
                            <div className="alert alert-info">
                                <i className="fas fa-info-circle me-2"></i>
                                Aucun test
                            </div>
                        ) : (
                            <div className="table-responsive">
                                <table className="table table-hover">
                                    <thead>
                                        <tr>
                                            <th>Patient</th>
                                            <th>Test</th>
                                            <th>Code</th>
                                            <th>Résultat</th>
                                            <th>Unité</th>
                                            <th>Normal</th>
                                            <th>Date</th>
                                            <th>Statut</th>
                                            <th>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {myTests.map((test) => (
                                            <tr key={test._id} className={!test.isNormal && test.labOrderId?.status === 'completed' ? 'table-warning' : ''}>
                                                <td>
                                                    <div>
                                                        <strong>{test.labOrderId?.patientId?.name || 'N/A'}</strong>
                                                        <br />
                                                        <small className="text-muted">{test.labOrderId?.patientId?.email || ''}</small>
                                                    </div>
                                                </td>
                                                <td>
                                                    <strong>{test.name || 'N/A'}</strong>
                                                    {test.commentaire && (
                                                        <div>
                                                            <small className="text-muted">
                                                                <i className="fas fa-comment me-1"></i>
                                                                {test.commentaire}
                                                            </small>
                                                        </div>
                                                    )}
                                                </td>
                                                <td>
                                                    <code>{test.code || 'N/A'}</code>
                                                </td>
                                                <td>
                                                    {test.resultValue ? (
                                                        <strong className={!test.isNormal ? 'text-danger' : 'text-success'}>
                                                            {test.resultValue}
                                                        </strong>
                                                    ) : (
                                                        <span className="text-muted">En attente</span>
                                                    )}
                                                </td>
                                                <td>{test.unite || 'N/A'}</td>
                                                <td>
                                                    {test.labOrderId?.status === 'completed' ? (
                                                        <span className={`badge ${getResultBadgeColor(test.isNormal)}`}>
                                                            {test.isNormal ? 'Normal' : 'Anormal'}
                                                        </span>
                                                    ) : (
                                                        <span className="text-muted">-</span>
                                                    )}
                                                </td>
                                                <td>{test.labOrderId?.dateOrder ? formatDate(test.labOrderId.dateOrder) : 'N/A'}</td>
                                                <td>
                                                    <span className={`badge ${getBadgeColor(test.labOrderId?.status)}`}>
                                                        {test.labOrderId?.status || 'N/A'}
                                                    </span>
                                                </td>
                                                <td>
                                                    <div className="d-flex gap-1">
                                                        <button className="btn btn-sm btn-outline-primary" title="Voir détails">
                                                            <i className="fas fa-eye"></i>
                                                        </button>
                                                        {test.labOrderId?.status === 'completed' && (
                                                            <button className="btn btn-sm btn-outline-success" title="Télécharger">
                                                                <i className="fas fa-download"></i>
                                                            </button>
                                                        )}
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DoctorLaboOrderTests;
