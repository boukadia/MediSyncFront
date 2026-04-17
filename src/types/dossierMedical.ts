export interface ConsultationHistorique {
  _id: string;
  consultation: any;
  date: string;
  notes?: string;
}

export interface DossierMedical {
  _id: string;
  patientId: string;
  allergies: string;
  groupeSanguin: string;
  historiqueConsultations: ConsultationHistorique[];
  createdAt: string;
  updatedAt: string;
}
