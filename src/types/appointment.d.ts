// appointment types
export interface Appointment {
  _id?: string;
  // patientId?: string;
  patientId: {
    name:string
    _id:string
    address:string
  };
  // doctorId: string;
  doctorId: {
    name:string
    _id:string
    address:string
  };
  date: string;
  // creneau: string;
  creneau: {
    _id:string;
    statut?: string;
    disponibilite?: string;
    heure_fin: string;
    heure_debut: string;
  };
//   specialite: string;
  typeConsultation: string;
  consultationReason: string;
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
  
}