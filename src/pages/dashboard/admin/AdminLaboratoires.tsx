import { useEffect, useState } from 'react';
import AdminSideBar from '../../../components/dashboard/admin/SideBar';
import '../../../styles/pages/doctorDashboard.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { getAllLaboratoiresApi } from '../../../api/admin.api';
import { toast } from 'react-toastify';

function AdminLaboratoires() {
    const [labs, setLabs] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        const fetch_ = async () => {
            const data = await getAllLaboratoiresApi(setErrorMessage);
            if (Array.isArray(data)) setLabs(data);
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
                        <h2><i className="fas fa-flask text-primary me-2"></i>Laboratoires</h2>
                        <p className="text-muted">Gestion des laboratoires d'analyses</p>
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
                                            <th>Responsable</th>
                                            <th>Email</th>
                                            <th>Téléphone</th>
                                            <th>Adresse</th>
                                            <th>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {labs.map((lab: any) => (
                                            <tr key={lab._id}>
                                                <td><strong>{lab.name}</strong></td>
                                                <td>{lab.responsable || '-'}</td>
                                                <td>{lab.email || '-'}</td>
                                                <td>{lab.telephone || '-'}</td>
                                                <td>{lab.address || '-'}</td>
                                                <td>
                                                    <div className="d-flex gap-1">
                                                        <button className="btn btn-sm btn-outline-warning" onClick={() => toast.info('Edition laboratoire en cours...')}><i className="fas fa-edit"></i></button>
                                                        <button className="btn btn-sm btn-outline-danger" onClick={() => toast.error('Suppression laboratoire en cours...')}><i className="fas fa-trash"></i></button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                        {labs.length === 0 && <tr><td colSpan={6} className="text-center py-3 text-muted">Aucun laboratoire</td></tr>}
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

export default AdminLaboratoires;
