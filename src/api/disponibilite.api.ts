import type { Disponibilite } from "../types/disponibilite";
 export type {Disponibilite}
const BASE = import.meta.env.VITE_API;


 export async function  getDisponibilitesApi(
    disponibiliteId: string,
    setErrorMessage:(message:string)=>void
): Promise<Disponibilite> {
    try {
        const token =localStorage.getItem('token');
        const res=await fetch (`${BASE}/disponibilites/${disponibiliteId}`,{
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