import { useEffect, useState } from 'react';
import AdminSideBar from '../../../components/dashboard/admin/SideBar';
import '../../../styles/pages/doctorDashboard.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { getSpecialiteApi, type Specialite } from '../../../api/specialite.api';

function AdminSpecialites() {
    const [specialites, setSpecialites] = useState<Specialite[]>([]);
    const [loading, setLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        const fetch_ = async () => {
            const data = await getSpecialiteApi(setErrorMessage);
            if (Array.isArray(data)) setSpecialites(data);
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
                        <h2><i className="fas fa-tags text-primary me-2"></i>Spécialités</h2>
                        <p className="text-muted">Gestion des spécialités médicales</p>
                    </div>
                    <button className="btn btn-primary"><i className="fas fa-plus me-2"></i>Ajouter</button>
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
                                            <th>Description</th>
                                            <th>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {specialites.map((s) => (
                                            <tr key={s._id}>
                                                <td><strong>{s.name}</strong></td>
                                                <td>{s.description || '-'}</td>
                                                <td>
                                                    <div className="d-flex gap-1">
                                                        <button className="btn btn-sm btn-outline-warning"><i className="fas fa-edit"></i></button>
                                                        <button className="btn btn-sm btn-outline-danger"><i className="fas fa-trash"></i></button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                        {specialites.length === 0 && <tr><td colSpan={3} className="text-center py-3 text-muted">Aucune spécialité</td></tr>}
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

export default AdminSpecialites;
