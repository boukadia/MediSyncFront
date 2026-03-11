import { useEffect, useState } from 'react';
import LabSideBar from '../../../components/dashboard/laboratoire/SideBar';
import '../../../styles/pages/doctorDashboard.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { getTestsApi, type Test } from '../../../api/test.api';

function LabPatients() {
    const [patients, setPatients] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        const fetchPatients = async () => {
            const tests = await getTestsApi(setErrorMessage);
            const uniquePatients = new Map();
            tests.forEach((test: Test) => {
                const p = test.labOrderId?.patientId;
                if (p?._id && !uniquePatients.has(p._id)) {
                    uniquePatients.set(p._id, {
                        _id: p._id,
                        name: p.name,
                        email: p.email,
                        phone: p.phone,
                        totalTests: 1,
                    });
                } else if (p?._id) {
                    uniquePatients.get(p._id).totalTests++;
                }
            });
            setPatients(Array.from(uniquePatients.values()));
            setLoading(false);
        };
        fetchPatients();
    }, []);

    return (
        <div className="doctor-dashboard">
            <LabSideBar />
            <div className="container-fluid px-4 py-3">
                <div className="d-flex justify-content-between align-items-center mb-4">
                    <div>
                        <h2><i className="fas fa-user-group text-primary me-2"></i>Patients</h2>
                        <p className="text-muted">Patients ayant des analyses au laboratoire</p>
                    </div>
                </div>
                {errorMessage && (
                    <div className="alert alert-danger"><i className="fas fa-exclamation-circle me-2"></i>{errorMessage}</div>
                )}
                <div className="card shadow-sm">
                    <div className="card-body p-0">
                        {loading ? (
                            <div className="text-center py-5"><div className="spinner-border text-primary"></div></div>
                        ) : patients.length === 0 ? (
                            <div className="p-4 text-center text-muted"><p>Aucun patient</p></div>
                        ) : (
                            <div className="table-responsive">
                                <table className="table table-hover mb-0">
                                    <thead className="table-light">
                                        <tr>
                                            <th>Nom</th>
                                            <th>Email</th>
                                            <th>Téléphone</th>
                                            <th>Analyses effectuées</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {patients.map((p: any) => (
                                            <tr key={p._id}>
                                                <td><strong>{p.name}</strong></td>
                                                <td>{p.email || '-'}</td>
                                                <td>{p.phone || '-'}</td>
                                                <td><span className="badge badge-info">{p.totalTests}</span></td>
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

export default LabPatients;
