// appointment.api
const BASE = import.meta.env.VITE_API;

type Appointment= {
  _id?: string;
  patientId: string;
  doctorId: {
    name:string
    _id:string
  };
  date: string;
  creneau: {
    statut: string;
    disponibilite: string;
    heure_fin: string;
    heure_debut: string;
  };
  specialite: string;
  typeConsultation: string;
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
  
}

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
  date: string,
  creneau: string,
  specialite: string,
  motif: string,
  setErrorMessage: (message: string) => void,
  onSuccess: () => void
) {
  try {
    const token = localStorage.getItem('token');
    
    const res = await fetch(`${BASE}/appointments`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        doctorId,
        date,
        creneau,
        specialite,
        motif
      })
    });

    if (!res.ok) {
      const data = await res.json();
      throw new Error(data.message || 'Erreur lors de la création du rendez-vous');
    }

    const data = await res.json();
    console.log('Rendez-vous créé avec succès:', data);
    setErrorMessage('');
    onSuccess();
    
  } catch (error: unknown) {
    console.error('Erreur:', error);
    const errorMsg = error instanceof Error ? error.message : 'Erreur inconnue';
    setErrorMessage(errorMsg);
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
  motif: string,
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
        motif
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