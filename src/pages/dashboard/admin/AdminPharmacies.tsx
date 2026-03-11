import { useEffect, useState } from 'react';
import AdminSideBar from '../../../components/dashboard/admin/SideBar';
import '../../../styles/pages/doctorDashboard.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { getAllPharmaciesApi } from '../../../api/admin.api';

function AdminPharmacies() {
    const [pharmacies, setPharmacies] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        const fetch_ = async () => {
            const data = await getAllPharmaciesApi(setErrorMessage);
            if (Array.isArray(data)) setPharmacies(data);
            setLoading(false);
        };
        fetch_();
    }, []);

    return (
        <div className="doctor-dashboard">
            <AdminSideBar />
            <div className="container-fluid px-4 py-3">
                <div className="d-flex justify-content-between align-items-center mb-4">
                    <div>
                        <h2><i className="fas fa-pills text-primary me-2"></i>Pharmacies</h2>
                        <p className="text-muted">Gestion des pharmacies du système</p>
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
                                            <th>Nom</th>
                                            <th>Pharmacien</th>
                                            <th>Adresse</th>
                                            <th>Téléphone</th>
                                            <th>Horaires</th>
                                            <th>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {pharmacies.map((ph: any) => (
                                            <tr key={ph._id}>
                                                <td><strong>{ph.name}</strong></td>
                                                <td>{ph.pharmacistName || '-'}</td>
                                                <td>{ph.address || '-'}</td>
                                                <td>{ph.phone || '-'}</td>
                                                <td>{ph.horaires || '-'}</td>
                                                <td>
                                                    <div className="d-flex gap-1">
                                                        <button className="btn btn-sm btn-outline-warning"><i className="fas fa-edit"></i></button>
                                                        <button className="btn btn-sm btn-outline-danger"><i className="fas fa-trash"></i></button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                        {pharmacies.length === 0 && <tr><td colSpan={6} className="text-center py-3 text-muted">Aucune pharmacie</td></tr>}
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

export default AdminPharmacies;
