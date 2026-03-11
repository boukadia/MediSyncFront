import { useEffect, useState } from 'react';
import LabSideBar from '../../../components/dashboard/laboratoire/SideBar';
import '../../../styles/pages/doctorDashboard.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { getTestsApi, type Test } from '../../../api/test.api';

function LabResults() {
    const [tests, setTests] = useState<Test[]>([]);
    const [loading, setLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState('');

    const formatDate = (dateString: string) => new Date(dateString).toLocaleDateString('fr-FR');

    useEffect(() => {
        const fetch_ = async () => {
            const data = await getTestsApi(setErrorMessage);
            // Only show completed tests with results
            setTests(data.filter((t: Test) => t.status === 'completed' || t.resultValue != null));
            setLoading(false);
        };
        fetch_();
    }, []);

    return (
        <div className="doctor-dashboard">
            <LabSideBar />
            <div className="container-fluid px-4 py-3">
                <div className="d-flex justify-content-between align-items-center mb-4">
                    <div>
                        <h2><i className="fas fa-file-medical text-primary me-2"></i>Résultats</h2>
                        <p className="text-muted">Résultats des analyses terminées</p>
                    </div>
                </div>
                {errorMessage && (
                    <div className="alert alert-danger"><i className="fas fa-exclamation-circle me-2"></i>{errorMessage}</div>
                )}
                <div className="card shadow-sm">
                    <div className="card-body p-0">
                        {loading ? (
                            <div className="text-center py-5"><div className="spinner-border text-primary"></div></div>
                        ) : tests.length === 0 ? (
                            <div className="p-4 text-center text-muted"><p>Aucun résultat disponible</p></div>
                        ) : (
                            <div className="table-responsive">
                                <table className="table table-hover mb-0">
                                    <thead className="table-light">
                                        <tr>
                                            <th>Analyse</th>
                                            <th>Patient</th>
                                            <th>Résultat</th>
                                            <th>Valeurs normales</th>
                                            <th>Normal?</th>
                                            <th>Date</th>
                                            <th>Commentaire</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {tests.map((test) => (
                                            <tr key={test._id}>
                                                <td><strong>{test.name}</strong><br/><small className="text-muted">{test.code}</small></td>
                                                <td>{test.labOrderId?.patientId?.name || 'N/A'}</td>
                                                <td>
                                                    <strong>{test.resultValue ?? '-'}</strong> {test.unite}
                                                </td>
                                                <td>
                                                    {test.valeur_normale_min != null && test.valeur_normale_max != null
                                                        ? `${test.valeur_normale_min} - ${test.valeur_normale_max} ${test.unite}`
                                                        : '-'}
                                                </td>
                                                <td>
                                                    {test.isNormal != null ? (
                                                        test.isNormal
                                                            ? <span className="badge badge-success">Normal</span>
                                                            : <span className="badge badge-danger">Anormal</span>
                                                    ) : '-'}
                                                </td>
                                                <td>{formatDate(test.createdAt)}</td>
                                                <td>{test.commentaire || '-'}</td>
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

export default LabResults;
