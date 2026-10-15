// user.api - Services pour afficher et gérer les utilisateurs
//  import type User from "../pages/dashboard/patient/User";
import type { User } from "../types/user";
 export type {User}
const BASE = import.meta.env.VITE_API;


 export async function  getUsersApi(
    setErrorMessage:(message:string)=>void
): Promise<User> {
    try {
        const token =localStorage.getItem('token');
        const res=await fetch (`${BASE}/users/`,{
            method:'GET',
            headers:{
                'Content-Type':'application/json',
                'Authorization':`Bearer ${token}`
            },
        });
        if(!res.ok){
            const data=await res.json();
            throw new Error(data.message||'Erreur lors de la récupération des Users');

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
//getDctors
export async function  getDoctorsApi(
    setErrorMessage:(message:string)=>void
): Promise<User[]> {
    try {   
        const token =localStorage.getItem('token');
        const res=await fetch (`${BASE}/users/doctors`,{
            method:'GET',
             headers:{
                'Content-Type':'application/json',
                'Authorization':`Bearer ${token}`
            },
        });
        if(!res.ok){
            const data=await res.json();
            throw new Error(data.message||'Erreur lors de la récupération des Doctors');
        }
        const data=await res.json();
        return data;
    } catch (error: unknown) {
        console.error('Erreur:', error);
        if (error instanceof Error) {
            setErrorMessage(error.message);
        } else {
            setErrorMessage('Erreur lors de la récupération des Doctors');
        }   
        return [];
    }
}