import type { Appointment } from "../types/appointment";

// appointment.api
const BASE = import.meta.env.VITE_API;



export async function getAppointmentsApi(
//   patientId: string,
  setErrorMessage: (message: string) => void
): Promise<Appointment[]> {
  try {
    const token = localStorage.getItem('token');
    
    const res = await fetch(`${BASE}/appointments/my`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    });

    if (!res.ok) {
      const data = await res.json();
      throw new Error(data.message || 'Erreur lors de la récupération des rendez-vous');
    }

    const data = await res.json();
    return data.data || [];
    
  } catch (error: unknown) {
    console.error('Erreur:', error);
    const errorMsg = error instanceof Error ? error.message : 'Erreur inconnue';
    setErrorMessage(errorMsg);
    return [];
  }
}

export async function createAppointmentApi(
  doctorId: string,
  patientId: string,
  disponibiliteId: string,
  creneau: string,
  consultationReason: string,
  typeConsultation: string,
  setErrorMessage: (message: string) => void,
  // onSuccess: () => void
) {
  try {
    const token = localStorage.getItem('token');
    
    // Get the date from disponibilite since backend requires it
    const disponibiliteRes = await fetch(`${BASE}/disponibilites/${disponibiliteId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    });
    
    if (!disponibiliteRes.ok) {
      throw new Error('Erreur lors de la récupération de la disponibilité');
    }
    
    const disponibiliteData = await disponibiliteRes.json();
    const date = disponibiliteData.dateHeureDebut || disponibiliteData.date;
    
    const res = await fetch(`${BASE}/appointments/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        patientId,
        doctorId,
        date: date, // Required by backend
        creneau, // Backend expects 'creneau' not 'creneauId'
        consultationReason, // Backend expects 'consultationReason' not 'motif'
        typeConsultation // Backend expects 'typeConsultation' not 'type'
        // Removed specialite as it's not needed in backend
      })
    });

    console.log('body',res);
    
    if (!res.ok) {
      const data = await res.json();
      throw new Error(data.error || data.message || 'Erreur lors de la création du rendez-vous');
    }

    const data = await res.json();
    console.log('Rendez-vous créé avec succès:', data);
    setErrorMessage('');
    return data;
    // onSuccess();
    
  } catch (error: unknown) {
    console.error('Erreur:', error);
    const errorMsg = error instanceof Error ? error.message : 'Erreur inconnue';
    setErrorMessage(errorMsg);
    throw error;
  }
}

export async function cancelAppointmentApi(
  appointmentId: string,
  setErrorMessage: (message: string) => void,
  onSuccess: () => void
) {
  try {
    const token = localStorage.getItem('token');
    
    const res = await fetch(`${BASE}/appointments/${appointmentId}/cancel`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    });

    if (!res.ok) {
      const data = await res.json();
      throw new Error(data.message || 'Erreur lors de l\'annulation du rendez-vous');
    }

    setErrorMessage('');
    onSuccess();
    
  } catch (error: unknown) {
    console.error('Erreur:', error);
    const errorMsg = error instanceof Error ? error.message : 'Erreur inconnue';
    setErrorMessage(errorMsg);
  }
}

export async function updateAppointmentApi(
  appointmentId: string,
  date: string,
  creneau: string,
  consultationReason: string,
  setErrorMessage: (message: string) => void,
  onSuccess: () => void
) {
  try {
    const token = localStorage.getItem('token');
    
    const res = await fetch(`${BASE}/appointments/${appointmentId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        date,
        creneau,
        consultationReason
      })
    });

    if (!res.ok) {
      const data = await res.json();
      throw new Error(data.message || 'Erreur lors de la modification du rendez-vous');
    }

    setErrorMessage('');
    onSuccess();
    
  } catch (error: unknown) {
    console.error('Erreur:', error);
    const errorMsg = error instanceof Error ? error.message : 'Erreur inconnue';
    setErrorMessage(errorMsg);
  }
}

export type { Appointment };