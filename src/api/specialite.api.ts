// prescription.api
const BASE = import.meta.env.VITE_API;

import type { Specialite } from '../types/specialite';

export type { Specialite };

// Get all prescriptions for the current user
export async function getSpecialiteApi(
    setErrorMessage: (message: string) => void
): Promise<Specialite[]> {
    try {
        const token = localStorage.getItem('token');

        const res = await fetch(`${BASE}/specialites/`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });

        if (!res.ok) {
            const data = await res.json();
            throw new Error(data.message || 'Erreur lors de la récupération des Specialites');
        }

        const data = await res.json();
        return data || [];

    } catch (error: unknown) {
        console.error('Erreur:', error);
        if (error instanceof Error) {
            setErrorMessage(error.message);
        } else {
            setErrorMessage('Erreur lors de la récupération des Specialites');
        }
        return [];
    }
}

// Get prescription by ID
export async function getSpecialiteByIdApi(
    id: string,
    setErrorMessage: (message: string) => void
): Promise<Specialite | null> {
    try {
        const token = localStorage.getItem('token');

        const res = await fetch(`${BASE}/specialites/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });

        if (!res.ok) {
            const data = await res.json();
            throw new Error(data.message || 'Erreur lors de la récupération de l\'Specialite');
        }

        const data = await res.json();
        return data.data;

    } catch (error: unknown) {
        console.error('Erreur:', error);
        if (error instanceof Error) {
            setErrorMessage(error.message);
        } else {
            setErrorMessage('Erreur lors de la récupération de l\'Specialite');
        }
        return null;
    }
}

// Create a new prescription
export async function createSpecialiteApi(
    specialiteData: Partial<Specialite>,
    setErrorMessage: (message: string) => void
): Promise<Specialite | null> {
    try {
        const token = localStorage.getItem('token');

        const res = await fetch(`${BASE}/Specialites`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(specialiteData)
        });

        if (!res.ok) {
            const data = await res.json();
            throw new Error(data.message || 'Erreur lors de la création de l\'Specialite');
        }

        const data = await res.json();
        return data.data;

    } catch (error: unknown) {
        console.error('Erreur:', error);
        if (error instanceof Error) {
            setErrorMessage(error.message);
        } else {
            setErrorMessage('Erreur lors de la création de l\'Specialite');
        }
        return null;
    }
}

// Update Specialite
export async function updateSpecialiteApi(
    id: string,
    specialiteData: Partial<Specialite>,
    setErrorMessage: (message: string) => void
): Promise<Specialite | null> {
    try {
        const token = localStorage.getItem('token');

        const res = await fetch(`${BASE}/specialites/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(specialiteData)
        });

        if (!res.ok) {
            const data = await res.json();
            throw new Error(data.message || 'Erreur lors de la mise à jour de l\'Specialite');
        }

        const data = await res.json();
        return data.data;

    } catch (error: unknown) {
        console.error('Erreur:', error);
        if (error instanceof Error) {
            setErrorMessage(error.message);
        } else {
            setErrorMessage('Erreur lors de la mise à jour de l\'Specialite');
        }
        return null;
    }
}

// Delete Specialite
export async function deleteSpecialiteApi(
    id: string,
    setErrorMessage: (message: string) => void
): Promise<boolean> {
    try {
        const token = localStorage.getItem('token');

        const res = await fetch(`${BASE}/specialites/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });

        if (!res.ok) {
            const data = await res.json();
            throw new Error(data.message || 'Erreur lors de la suppression de l\'Specialite');
        }

        return true;

    } catch (error: unknown) {
        console.error('Erreur:', error);
        if (error instanceof Error) {
            setErrorMessage(error.message);
        } else {
            setErrorMessage('Erreur lors de la suppression de l\'Specialite');
        }
        return false;
    }
}
