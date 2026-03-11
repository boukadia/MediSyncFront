// admin.api.ts - Admin-specific API calls
const BASE = import.meta.env.VITE_API;

// Get ALL appointments (admin route: GET /appointments/)
export async function getAllAppointmentsApi(
    setErrorMessage: (message: string) => void
): Promise<any[]> {
    try {
        const token = localStorage.getItem('token');
        const res = await fetch(`${BASE}/appointments/`, {
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
        return data.data || data || [];
    } catch (error: unknown) {
        console.error('Erreur:', error);
        if (error instanceof Error) setErrorMessage(error.message);
        else setErrorMessage('Erreur lors de la récupération des rendez-vous');
        return [];
    }
}

// Get ALL consultations (admin: GET /consultations/)
export async function getAllConsultationsApi(
    setErrorMessage: (message: string) => void
): Promise<any[]> {
    try {
        const token = localStorage.getItem('token');
        const res = await fetch(`${BASE}/consultations/`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });
        if (!res.ok) {
            const data = await res.json();
            throw new Error(data.message || 'Erreur lors de la récupération des consultations');
        }
        const data = await res.json();
        return data.data || data || [];
    } catch (error: unknown) {
        console.error('Erreur:', error);
        if (error instanceof Error) setErrorMessage(error.message);
        else setErrorMessage('Erreur lors de la récupération des consultations');
        return [];
    }
}

// Get ALL pharmacies (admin: GET /pharmacies/)
export async function getAllPharmaciesApi(
    setErrorMessage: (message: string) => void
): Promise<any[]> {
    try {
        const token = localStorage.getItem('token');
        const res = await fetch(`${BASE}/pharmacies/`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });
        if (!res.ok) {
            const data = await res.json();
            throw new Error(data.message || 'Erreur lors de la récupération des pharmacies');
        }
        const data = await res.json();
        return data.data || data || [];
    } catch (error: unknown) {
        console.error('Erreur:', error);
        if (error instanceof Error) setErrorMessage(error.message);
        else setErrorMessage('Erreur lors de la récupération des pharmacies');
        return [];
    }
}

// Get ALL laboratoires (admin: GET /laboratoires/)
export async function getAllLaboratoiresApi(
    setErrorMessage: (message: string) => void
): Promise<any[]> {
    try {
        const token = localStorage.getItem('token');
        const res = await fetch(`${BASE}/laboratoires/`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });
        if (!res.ok) {
            const data = await res.json();
            throw new Error(data.message || 'Erreur lors de la récupération des laboratoires');
        }
        const data = await res.json();
        return data.data || data || [];
    } catch (error: unknown) {
        console.error('Erreur:', error);
        if (error instanceof Error) setErrorMessage(error.message);
        else setErrorMessage('Erreur lors de la récupération des laboratoires');
        return [];
    }
}
