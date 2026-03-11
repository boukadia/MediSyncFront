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
  appointmentDate: string,
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
    
    console.log("date",appointmentDate);
    
    
    const res = await fetch(`${BASE}/appointments/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        patientId,
        doctorId,
        date: appointmentDate, // Required by backend
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

export async function updateAppointmentStatusApi(
  appointmentId: string,
  status: string,
  setErrorMessage: (message: string) => void,
  onSuccess: () => void
) {
  try {
    const token = localStorage.getItem('token');
    
    // If cancelling, using the cancel endpoint might be safer if the backend expects it.
    // Wait, let's just use the PUT /appointments/:id which handles req.body
    const url = status === 'cancelled' ? `${BASE}/appointments/${appointmentId}/cancel` : `${BASE}/appointments/${appointmentId}`;
    const method = 'PUT';
    
    const res = await fetch(url, {
      method: method,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: status === 'cancelled' ? undefined : JSON.stringify({ status })
    });

    if (!res.ok) {
        // Try fallback to standard update if cancel endpoint fails because it wasn't confirmed
        if (status === 'cancelled' && res.status === 400) {
           const fallbackRes = await fetch(`${BASE}/appointments/${appointmentId}`, {
               method: 'PUT',
               headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
               body: JSON.stringify({ status: 'cancelled' })
           });
           if (!fallbackRes.ok) {
               const data = await fallbackRes.json();
               throw new Error(data.message || 'Erreur lors de la modification du statut');
           }
        } else {
            const data = await res.json();
            throw new Error(data.message || 'Erreur lors de la modification du statut');
        }
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