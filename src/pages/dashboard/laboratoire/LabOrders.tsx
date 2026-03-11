import { useState } from 'react';
import LabSideBar from '../../../components/dashboard/laboratoire/SideBar';
import '../../../styles/pages/doctorDashboard.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { toast } from 'react-toastify';

function LabOrders() {
    const [searchTerm, setSearchTerm] = useState('');

    const orders = [
        { id: 1, patient: "Yassine Ahmed", doctor: "Dr. Lahlou", date: "12-03-2026", tests: ["NFS", "Glycémie"], status: "Nouveau" },
        { id: 2, patient: "Salma Benali", doctor: "Dr. Idrissi", date: "11-03-2026", tests: ["Hémoglobine", "Fer"], status: "En cours" },
        { id: 3, patient: "Karim Rachidi", doctor: "Dr. Tazi", date: "10-03-2026", tests: ["Cholestérol", "Triglycérides"], status: "Terminé" },
    ];

    const getStatusBadge = (status: string) => {
        switch (status) {
            case 'Nouveau': return <span className="badge badge-primary">{status}</span>;
            case 'En cours': return <span className="badge badge-warning">{status}</span>;
            case 'Terminé': return <span className="badge badge-success">{status}</span>;
            default: return <span className="badge badge-light">{status}</span>;
        }
    };

    const filteredOrders = orders.filter(o => o.patient.toLowerCase().includes(searchTerm.toLowerCase()));

    return (
        <div className="doctor-dashboard">
            <LabSideBar />
            <div className="container-fluid px-4 py-3">
                <div className="d-flex justify-content-between align-items-center mb-4">
                    <div>
                        <h2><i className="fas fa-clipboard-list text-primary me-2"></i>Ordres de laboratoire</h2>
                        <p className="text-muted">Gérez les prescriptions d'analyses médicales reçues</p>
                    </div>
                </div>

                <div className="card shadow-sm mb-4">
                    <div className="card-body">
                        <div className="input-group">
                            <span className="input-group-text bg-white"><i className="fas fa-search text-muted"></i></span>
                            <input 
                                type="text" 
                                className="form-control border-start-0" 
                                placeholder="Rechercher par patient..." 
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                    </div>
                </div>

                <div className="card shadow-sm">
                    <div className="card-body p-0">
                        <div className="table-responsive">
                            <table className="table table-hover mb-0">
                                <thead className="table-light">
                                    <tr>
                                        <th>Patient</th>
                                        <th>Médecin prescriptant</th>
                                        <th>Date</th>
                                        <th>Analyses demandées</th>
                                        <th>Statut</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredOrders.map((order) => (
                                        <tr key={order.id}>
                                            <td><strong>{order.patient}</strong></td>
                                            <td>{order.doctor}</td>
                                            <td>{order.date}</td>
                                            <td>
                                                <div className="d-flex flex-wrap gap-1">
                                                    {order.tests.map(test => (
                                                        <span key={test} className="badge badge-info">{test}</span>
                                                    ))}
                                                </div>
                                            </td>
                                            <td>{getStatusBadge(order.status)}</td>
                                            <td>
                                                <div className="d-flex gap-1">
                                                    <button className="btn btn-sm btn-outline-primary" title="Voir ordre" onClick={() => toast.info('Détails de l\'ordre en cours...')}><i className="fas fa-eye"></i></button>
                                                    <button className="btn btn-sm btn-outline-success" title="Créer analyses" onClick={() => toast.info('Création d\'analyses en cours...')}><i className="fas fa-plus"></i></button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                    {filteredOrders.length === 0 && (
                                        <tr>
                                            <td colSpan={6} className="text-center py-4 text-muted">Aucun ordre de labo trouvé</td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LabOrders;
