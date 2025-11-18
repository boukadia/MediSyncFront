// prescription.api
const BASE = import.meta.env.VITE_API;

import type { Prescription } from '../types/prescription';

export type { Prescription };

// Get all prescriptions for the current user
export async function getPrescriptionsApi(
    setErrorMessage: (message: string) => void
): Promise<Prescription[]> {
    try {
        const token = localStorage.getItem('token');

        const res = await fetch(`${BASE}/prescriptions/`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });

        if (!res.ok) {
            const data = await res.json();
            throw new Error(data.message || 'Erreur lors de la récupération des ordonnances');
        }

        const data = await res.json();
        return data || [];

    } catch (error: unknown) {
        console.error('Erreur:', error);
        if (error instanceof Error) {
            setErrorMessage(error.message);
        } else {
            setErrorMessage('Erreur lors de la récupération des ordonnances');
        }
        return [];
    }
}

// Get prescription by ID
export async function getPrescriptionByIdApi(
    id: string,
    setErrorMessage: (message: string) => void
): Promise<Prescription | null> {
    try {
        const token = localStorage.getItem('token');

        const res = await fetch(`${BASE}/prescriptions/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });

        if (!res.ok) {
            const data = await res.json();
            throw new Error(data.message || 'Erreur lors de la récupération de l\'ordonnance');
        }

        const data = await res.json();
        return data.data;

    } catch (error: unknown) {
        console.error('Erreur:', error);
        if (error instanceof Error) {
            setErrorMessage(error.message);
        } else {
            setErrorMessage('Erreur lors de la récupération de l\'ordonnance');
        }
        return null;
    }
}

// Create a new prescription
export async function createPrescriptionApi(
    prescriptionData: Partial<Prescription>,
    setErrorMessage: (message: string) => void
): Promise<Prescription | null> {
    try {
        const token = localStorage.getItem('token');

        const res = await fetch(`${BASE}/prescriptions`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(prescriptionData)
        });

        if (!res.ok) {
            const data = await res.json();
            throw new Error(data.message || 'Erreur lors de la création de l\'ordonnance');
        }

        const data = await res.json();
        return data.data;

    } catch (error: unknown) {
        console.error('Erreur:', error);
        if (error instanceof Error) {
            setErrorMessage(error.message);
        } else {
            setErrorMessage('Erreur lors de la création de l\'ordonnance');
        }
        return null;
    }
}

// Update prescription
export async function updatePrescriptionApi(
    id: string,
    prescriptionData: Partial<Prescription>,
    setErrorMessage: (message: string) => void
): Promise<Prescription | null> {
    try {
        const token = localStorage.getItem('token');

        const res = await fetch(`${BASE}/prescriptions/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(prescriptionData)
        });

        if (!res.ok) {
            const data = await res.json();
            throw new Error(data.message || 'Erreur lors de la mise à jour de l\'ordonnance');
        }

        const data = await res.json();
        return data.data;

    } catch (error: unknown) {
        console.error('Erreur:', error);
        if (error instanceof Error) {
            setErrorMessage(error.message);
        } else {
            setErrorMessage('Erreur lors de la mise à jour de l\'ordonnance');
        }
        return null;
    }
}

// Delete prescription
export async function deletePrescriptionApi(
    id: string,
    setErrorMessage: (message: string) => void
): Promise<boolean> {
    try {
        const token = localStorage.getItem('token');

        const res = await fetch(`${BASE}/prescriptions/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });

        if (!res.ok) {
            const data = await res.json();
            throw new Error(data.message || 'Erreur lors de la suppression de l\'ordonnance');
        }

        return true;

    } catch (error: unknown) {
        console.error('Erreur:', error);
        if (error instanceof Error) {
            setErrorMessage(error.message);
        } else {
            setErrorMessage('Erreur lors de la suppression de l\'ordonnance');
        }
        return false;
    }
}
