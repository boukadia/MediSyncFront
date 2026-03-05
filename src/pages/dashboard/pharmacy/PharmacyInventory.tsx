import { useState } from 'react';
import PharmacySideBar from '../../../components/dashboard/pharmacy/SideBar';
import '../../../styles/pages/doctorDashboard.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function PharmacyInventory() {
    const [searchTerm, setSearchTerm] = useState('');

    const inventory = [
        { id: 1, name: "Paracétamol 500mg", stock: 150, category: "Antalgique", status: "En stock" },
        { id: 2, name: "Amoxicilline 1g", stock: 12, category: "Antibiotique", status: "Stock faible" },
        { id: 3, name: "Ibuprofène 400mg", stock: 0, category: "Anti-inflammatoire", status: "Rupture" },
        { id: 4, name: "Loratadine 10mg", stock: 85, category: "Antihistaminique", status: "En stock" },
    ];

    const getStatusBadge = (status: string) => {
        switch (status) {
            case 'En stock': return <span className="badge badge-success">{status}</span>;
            case 'Stock faible': return <span className="badge badge-warning">{status}</span>;
            case 'Rupture': return <span className="badge badge-danger">{status}</span>;
            default: return <span className="badge badge-light">{status}</span>;
        }
    };

    const filteredInventory = inventory.filter(item => item.name.toLowerCase().includes(searchTerm.toLowerCase()));

    return (
        <div className="doctor-dashboard">
            <PharmacySideBar />
            <div className="container-fluid px-4 py-3">
                <div className="d-flex justify-content-between align-items-center mb-4">
                    <div>
                        <h2><i className="fas fa-boxes-stacked text-primary me-2"></i>Inventaire</h2>
                        <p className="text-muted">Gérez le stock de votre pharmacie</p>
                    </div>
                    <button className="btn btn-primary"><i className="fas fa-plus me-2"></i>Nouveau produit</button>
                </div>

                <div className="card shadow-sm mb-4">
                    <div className="card-body">
                        <div className="input-group">
                            <span className="input-group-text bg-white"><i className="fas fa-search text-muted"></i></span>
                            <input 
                                type="text" 
                                className="form-control border-start-0" 
                                placeholder="Rechercher un médicament..." 
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
                                        <th>Nom du médicament</th>
                                        <th>Catégorie</th>
                                        <th>Quantité en stock</th>
                                        <th>Statut</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredInventory.map((item) => (
                                        <tr key={item.id}>
                                            <td><strong>{item.name}</strong></td>
                                            <td>{item.category}</td>
                                            <td>{item.stock} boîtes</td>
                                            <td>{getStatusBadge(item.status)}</td>
                                            <td>
                                                <div className="d-flex gap-1">
                                                    <button className="btn btn-sm btn-outline-primary" title="Modifier stock"><i className="fas fa-edit"></i></button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                    {filteredInventory.length === 0 && (
                                        <tr>
                                            <td colSpan={5} className="text-center py-4 text-muted">Aucun médicament trouvé</td>
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

export default PharmacyInventory;
