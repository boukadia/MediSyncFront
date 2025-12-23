import type { Consultation } from "../types/consultation";
export type { Consultation };

const BASE = import.meta.env.VITE_API;

/**
 * Récupérer toutes les consultations du médecin connecté
 */
export async function getConsultationsApi(
    setErrorMessage: (message: string) => void
): Promise<Consultation[]> {
    try {
        const token = localStorage.getItem('token');
        const res = await fetch(`${BASE}/consultations/`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
        });
        
        if (!res.ok) {
            const data = await res.json();
            throw new Error(data.message || 'Erreur lors de la récupération des consultations');
        }
        
        const data = await res.json();
        return data.data || [];
    } catch (error: unknown) {
        console.error('Erreur:', error);
        if (error instanceof Error) {
            setErrorMessage(error.message);
        } else {
            setErrorMessage('Erreur lors de la récupération des consultations');
        }
        return [];
    }
}

/**
 * Récupérer toutes les consultations du médecin connecté
 */
export async function getMyConsultationsApi(
    setErrorMessage: (message: string) => void
): Promise<Consultation[]> {
    try {
        const token = localStorage.getItem('token');
        const res = await fetch(`${BASE}/consultations/my`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
        });
        
        if (!res.ok) {
            const data = await res.json();
            throw new Error(data.message || 'Erreur lors de la récupération des consultations');
        }
        
        const data = await res.json();
        return data || [];
    } catch (error: unknown) {
        console.error('Erreur:', error);
        if (error instanceof Error) {
            setErrorMessage(error.message);
        } else {
            setErrorMessage('Erreur lors de la récupération des consultations');
        }
        return [];
    }
}

/**
 * Récupérer une consultation par son ID
 */
export async function getConsultationByIdApi(
    id: string,
    setErrorMessage: (message: string) => void
): Promise<Consultation | null> {
    try {
        const token = localStorage.getItem('token');
        const res = await fetch(`${BASE}/consultations/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
        });
        
        if (!res.ok) {
            const data = await res.json();
            throw new Error(data.message || 'Erreur lors de la récupération de la consultation');
        }
        
        const data = await res.json();
        return data.data;
    } catch (error: unknown) {
        console.error('Erreur:', error);
        if (error instanceof Error) {
            setErrorMessage(error.message);
        } else {
            setErrorMessage('Erreur lors de la récupération de la consultation');
        }
        return null;
    }
}

/**
 * Créer une nouvelle consultation
 */
export async function createConsultationApi(
    consultationData: Partial<Consultation>,
    setErrorMessage: (message: string) => void
): Promise<Consultation | null> {
    try {
        const token = localStorage.getItem('token');
        const res = await fetch(`${BASE}/consultations/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(consultationData)
        });
        
        if (!res.ok) {
            const data = await res.json();
            throw new Error(data.message || 'Erreur lors de la création de la consultation');
        }
        
        const data = await res.json();
        return data.data;
    } catch (error: unknown) {
        console.error('Erreur:', error);
        if (error instanceof Error) {
            setErrorMessage(error.message);
        } else {
            setErrorMessage('Erreur lors de la création de la consultation');
        }
        return null;
    }
}

/**
 * Mettre à jour une consultation
 */
export async function updateConsultationApi(
    id: string,
    consultationData: Partial<Consultation>,
    setErrorMessage: (message: string) => void
): Promise<Consultation | null> {
    try {
        const token = localStorage.getItem('token');
        const res = await fetch(`${BASE}/consultations/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(consultationData)
        });
        
        if (!res.ok) {
            const data = await res.json();
            throw new Error(data.message || 'Erreur lors de la mise à jour de la consultation');
        }
        
        const data = await res.json();
        return data.data;
    } catch (error: unknown) {
        console.error('Erreur:', error);
        if (error instanceof Error) {
            setErrorMessage(error.message);
        } else {
            setErrorMessage('Erreur lors de la mise à jour de la consultation');
        }
        return null;
    }
}

/**
 * Supprimer une consultation
 */
export async function deleteConsultationApi(
    id: string,
    setErrorMessage: (message: string) => void
): Promise<boolean> {
    try {
        const token = localStorage.getItem('token');
        const res = await fetch(`${BASE}/consultations/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
        });
        
        if (!res.ok) {
            const data = await res.json();
            throw new Error(data.message || 'Erreur lors de la suppression de la consultation');
        }
        
        return true;
    } catch (error: unknown) {
        console.error('Erreur:', error);
        if (error instanceof Error) {
            setErrorMessage(error.message);
        } else {
            setErrorMessage('Erreur lors de la suppression de la consultation');
        }
        return false;
    }
}

/**
 * Récupérer les consultations d'un patient spécifique
 */
export async function getConsultationsByPatientApi(
    patientId: string,
    setErrorMessage: (message: string) => void
): Promise<Consultation[]> {
    try {
        const token = localStorage.getItem('token');
        const res = await fetch(`${BASE}/consultations/patient/${patientId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
        });
        
        if (!res.ok) {
            const data = await res.json();
            throw new Error(data.message || 'Erreur lors de la récupération des consultations du patient');
        }
        
        const data = await res.json();
        return data.data || [];
    } catch (error: unknown) {
        console.error('Erreur:', error);
        if (error instanceof Error) {
            setErrorMessage(error.message);
        } else {
            setErrorMessage('Erreur lors de la récupération des consultations du patient');
        }
        return [];
    }
}
