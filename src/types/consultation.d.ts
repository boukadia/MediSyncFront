export interface Consultation {
    _id: string;
    appointment: {
        _id: string;
        patientId: {
            _id: string;
            name: string;
            email: string;
            phone: string;
        };
        doctorId: {
            _id: string;
            name: string;
            specialite: string;
        };
        consultationReason: string;
        date: string;
        typeConsultation: string;
        status: string;
        creneau?: {
            heure_debut: string;
            heure_fin: string;
        };
    };
    medecin: {
        _id: string;
        name: string;
        email: string;
        specialite?: string;
    };
    diagnostic: string; // tachkhis
    symptomes: string; // al2a3rad
    notes: string; // molahadat
    dateConsultation: string;
    createdAt: string;
    updatedAt: string;
}
