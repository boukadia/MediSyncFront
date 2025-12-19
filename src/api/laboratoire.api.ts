import type { Disponibilite } from "../types/disponibilite";
import type { Laboratoire } from "../types/laboratoire";
 export type {Disponibilite}
const BASE = import.meta.env.VITE_API;


 export async function  getLaboratoiresApi(
    // disponibiliteId: string,
    setErrorMessage:(message:string)=>void
): Promise<Laboratoire> {
    try {
        const token =localStorage.getItem('token');
        const res=await fetch (`${BASE}/laboratoires/`,{
            method:'GET',
            headers:{
                'Content-Type':'application/json',
                'Authorization':`Bearer ${token}`
            },
        });
        if(!res.ok){
            const data=await res.json();
            throw new Error(data.message||'Erreur lors de la récupération des Disponibilites');

        }
        const data=await res.json();
        return data;
        
        
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
export async function getLaboratoireByIdApi(
    id: string,
    setErrorMessage: (message: string) => void
): Promise<Laboratoire | null> {
    try {
        const token = localStorage.getItem('token');
        const res = await fetch(`${BASE}/disponibilites/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });
        if (!res.ok) {
            const data = await res.json();
            throw new Error(data.message || 'Erreur lors de la récupération de la disponibilite');
        }
        const data = await res.json();
        return data || null;
    } catch (error: unknown) {
        console.error('Erreur:', error);
        if (error instanceof Error) {
            setErrorMessage(error.message);
        } else {
            setErrorMessage('Erreur lors de la récupération de la disponibilite');
        }
        return null;
    }
}