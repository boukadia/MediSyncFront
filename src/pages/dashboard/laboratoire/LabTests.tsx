import { useEffect, useState } from 'react';
import LabSideBar from '../../../components/dashboard/laboratoire/SideBar';
import '../../../styles/pages/doctorDashboard.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { getTestsApi, type Test } from '../../../api/test.api';

function LabTests() {
    const [tests, setTests] = useState<Test[]>([]);
    const [loading, setLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        const fetchTests = async () => {
            const data = await getTestsApi(setErrorMessage);
            setTests(data);
            setLoading(false);
        };
        fetchTests();
    }, []);

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('fr-FR');
    };

    const getStatusBadge = (status: string) => {
        switch (status) {
            case 'pending': return <span className="badge badge-warning">En attente</span>;
            case 'completed': return <span className="badge badge-success">Terminé</span>;
            default: return <span className="badge badge-light">{status}</span>;
        }
    };

    return (
        <div className="doctor-dashboard">
            <LabSideBar />
            <div className="container-fluid px-4 py-3">
                <div className="d-flex justify-content-between align-items-center mb-4">
                    <div>
                        <h2><i className="fas fa-vials text-primary me-2"></i>Analyses</h2>
                        <p className="text-muted">Gérez les demandes d'analyses</p>
                    </div>
                </div>

                {errorMessage && (
                    <div className="alert alert-danger"><i className="fas fa-exclamation-circle me-2"></i>{errorMessage}</div>
                )}

                <div className="card shadow-sm">
                    <div className="card-body p-0">
                        {loading ? (
                            <div className="text-center py-5"><div className="spinner-border text-primary"></div></div>
                        ) : (
                            <div className="table-responsive">
                                <table className="table table-hover mb-0">
                                    <thead className="table-light">
                                        <tr>
                                            <th>Test</th>
                                            <th>Patient</th>
                                            <th>Date</th>
                                            <th>Résultat</th>
                                            <th>Statut</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {tests.map((test) => (
                                            <tr key={test._id}>
                                                <td><strong>{test.name}</strong> <br/><small>{test.code}</small></td>
                                                <td>{test.labOrderId?.patientId?.name || 'N/A'}</td>
                                                <td>{formatDate(test.createdAt)}</td>
                                                <td>
                                                    {test.resultValue ? (
                                                        <span className={`badge ${test.isNormal ? 'badge-success' : 'badge-danger'}`}>
                                                            {test.resultValue} {test.unite}
                                                        </span>
                                                    ) : '-'}
                                                </td>
                                                <td>{getStatusBadge(test.status)}</td>
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

export default LabTests;
