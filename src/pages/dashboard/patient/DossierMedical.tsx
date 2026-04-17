import React, { useEffect, useState } from 'react';
import { Card, Spinner, Alert, Badge, ListGroup, Container, Row, Col } from 'react-bootstrap';
import { getMyDossierMedical } from '../../../api/dossierMedical.api';
import type { DossierMedical as IDossierMedical } from '../../../types/dossierMedical';
import SideBare from '../../../components/dashboard/Patient/SideBare';
import Header from '../../../components/dashboard/Patient/Header';
import { jwtDecode } from 'jwt-decode';
import '../../../styles/pages/dashboardPatient.css';

const DossierMedical = () => {
  const token = localStorage.getItem("token");
  let user = { role: '', name: '', email: '' };
  
  if (token) {
    try {
      user = jwtDecode(token);
    } catch (e) {
      console.error("Invalid token");
    }
  }

  const [dossier, setDossier] = useState<IDossierMedical | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchDossier = async () => {
      try {
        const data = await getMyDossierMedical();
        setDossier(data);
      } catch (err: any) {
        setError(err.message || 'Erreur lors du chargement du dossier médical');
      } finally {
        setLoading(false);
      }
    };

    fetchDossier();
  }, []);

  const renderContent = () => {
    if (loading) {
      return (
        <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '60vh' }}>
          <Spinner animation="border" variant="primary" />
        </div>
      );
    }

    if (error) {
      return (
        <Alert variant="danger" className="mt-4 mx-4">
          {error}
        </Alert>
      );
    }

    if (!dossier) {
      return (
        <Alert variant="info" className="mt-4 mx-4">
          Aucun dossier médical trouvé pour votre profil.
        </Alert>
      );
    }

    return (
      <Container fluid className="py-4">
        <h2 className="mb-4">
          <i className="bi bi-file-medical me-2 text-primary"></i>
          Mon Dossier Médical
        </h2>

        <Row>
          <Col md={4} className="mb-4">
            <Card className="shadow-sm h-100">
              <Card.Header className="bg-white">
                <h5 className="mb-0">Informations Générales</h5>
              </Card.Header>
              <Card.Body>
                <div className="mb-4">
                  <h6 className="text-muted mb-2">
                    <i className="bi bi-droplet-half me-2 text-danger"></i>
                    Groupe Sanguin
                  </h6>
                  <h4>
                    <Badge bg="danger" className="px-3 py-2">
                      {dossier.groupeSanguin || 'Non spécifié'}
                    </Badge>
                  </h4>
                </div>

                <div>
                  <h6 className="text-muted mb-2">
                    <i className="bi bi-exclamation-triangle me-2 text-warning"></i>
                    Allergies
                  </h6>
                  {dossier.allergies ? (
                    <p className="mb-0">{dossier.allergies}</p>
                  ) : (
                    <p className="text-muted mb-0 fst-italic">Aucune allergie connue</p>
                  )}
                </div>
              </Card.Body>
            </Card>
          </Col>

          <Col md={8} className="mb-4">
            <Card className="shadow-sm h-100">
              <Card.Header className="bg-white">
                <h5 className="mb-0">
                  <i className="bi bi-clock-history me-2"></i>
                  Historique des Consultations
                </h5>
              </Card.Header>
              <Card.Body className="p-0">
                {dossier.historiqueConsultations && dossier.historiqueConsultations.length > 0 ? (
                  <ListGroup variant="flush">
                    {dossier.historiqueConsultations.map((historique, index) => (
                      <ListGroup.Item key={historique._id || index} className="p-3">
                        <div className="d-flex justify-content-between align-items-center mb-2">
                          <h6 className="mb-0 text-primary">
                            Consultation du {new Date(historique.date).toLocaleDateString('fr-FR')}
                          </h6>
                          <small className="text-muted">
                            {new Date(historique.date).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}
                          </small>
                        </div>
                        <p className="mb-0 text-secondary">
                          {historique.notes ? historique.notes : <span className="fst-italic">Aucune note laissée</span>}
                        </p>
                      </ListGroup.Item>
                    ))}
                  </ListGroup>
                ) : (
                  <div className="p-4 text-center text-muted">
                    <p className="mb-0">Aucune consultation dans l'historique.</p>
                  </div>
                )}
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    );
  };

  return (
    <>
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" />
      <SideBare />
      <div className="main-content">
        <Header user={user} />
        {renderContent()}
      </div>
    </>
  );
};

export default DossierMedical;