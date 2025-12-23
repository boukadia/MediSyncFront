//  import type Test from "../pages/dashboard/patient/Test";
import type { Test } from "../types/test";
 export type {Test}
const BASE = import.meta.env.VITE_API;


export async function getTestsApi(
    setErrorMessage: (message: string) => void
): Promise<Test[]> {
    try {
        const token = localStorage.getItem('token');
        const res = await fetch(`${BASE}/labOrderTests/my/tests`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
        });
        if (!res.ok) {
            const data = await res.json();
            throw new Error(data.message || 'Erreur lors de la récupération des tests');
        }
        const data = await res.json();
        return data;
        
    } catch (error: unknown) {
        console.error('Erreur:', error);
        if (error instanceof Error) {
            setErrorMessage(error.message);
        } else {
            setErrorMessage('Erreur lors de la récupération des tests');
        }
        return [];
    }
}
export async function getMyTestsApi(
    setErrorMessage: (message: string) => void
): Promise<Test[]> {
    try {
        const token = localStorage.getItem('token');
        const res = await fetch(`${BASE}/labOrderTests/my/tests`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
        });
        if (!res.ok) {
            const data = await res.json();
            throw new Error(data.message || 'Erreur lors de la récupération des tests');
        }
        const data = await res.json();
        return data;
        
    } catch (error: unknown) {
        console.error('Erreur:', error);
        if (error instanceof Error) {
            setErrorMessage(error.message);
        } else {
            setErrorMessage('Erreur lors de la récupération des tests');
        }
        return [];
    }
}
export async function createTest(
    setErrorMessage:(message:string)=>void,
    testData:Partial<Test>
    ):Promise<Test>
    {
    try {
        const token=localStorage.getItem('token');
        const res=await fetch(`${BASE}/tests/`,{
            method:"POST",
            headers:{
                'Content-Type':'application/json',
                'Authorization':`Bearer ${token}`
            },
            body:JSON.stringify(testData)
        })
        if(!res.ok){
            const data=await res.json();
            throw new  Error(data.message||'Erreur lors de la récupération des tests');
            
        }
        const data=await res.json();
        return data.data;
       
        
    } catch (error) {
         console.error('Erreur:', error);
        if (error instanceof Error) {
            setErrorMessage(error.message);
        } else {
            setErrorMessage('Erreur lors de la récupération des ordonnances');
        }
        return [];
    
    }

} 
