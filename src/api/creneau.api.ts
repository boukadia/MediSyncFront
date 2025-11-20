import type { Creneau } from "../types/creneau";
 export type {Creneau}
const BASE = import.meta.env.VITE_API;


 export async function  getCreneauxApi(
   
    setErrorMessage:(message:string)=>void
): Promise<Creneau> {
    try {
        const token =localStorage.getItem('token');
        const res=await fetch (`${BASE}/Creneaux/`,{
            method:'GET',
            headers:{
                'Content-Type':'application/json',
                'Authorization':`Bearer ${token}`
            },
        });
        if(!res.ok){
            const data=await res.json();
            throw new Error(data.message||'Erreur lors de la récupération des Creneaus');

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
 export async function  getCreneauxByIdApi(
    disponibiliteId: string,
    setErrorMessage:(message:string)=>void
): Promise<Creneau> {
    try {
        const token =localStorage.getItem('token');
        const res=await fetch (`${BASE}/Creneaux/${disponibiliteId}`,{
            method:'GET',
            headers:{
                'Content-Type':'application/json',
                'Authorization':`Bearer ${token}`
            },
        });
        if(!res.ok){
            const data=await res.json();
            throw new Error(data.message||'Erreur lors de la récupération des Creneaus');

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