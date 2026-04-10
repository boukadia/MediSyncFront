import type { LabResult } from '../types/labResults';

const BASE = import.meta.env.VITE_API;

export const getAllLabResultsApi = async (setErrorMessage: (msg: string) => void): Promise<LabResult[]> => {
  try {
    const token = localStorage.getItem('token');
    const response = await fetch(`${BASE}/labResults`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    });

    if (!response.ok) {
      const data = await response.json();
      throw new Error(data.error || 'Erreur lors de la récupération des résultats de laboratoire');
    }

    const data = await response.json();
    return data.data; // because backend returns { data: labResults }
  } catch (error: any) {
    setErrorMessage(error.message || 'Erreur lors de la récupération des résultats de laboratoire');
    return [];
  }
};

export const getLabResultsApi = async (setErrorMessage: (msg: string) => void): Promise<LabResult[]> => {
  try {
    const token = localStorage.getItem('token');
    const response = await fetch(`${BASE}/labResults/my/results`, { 
      // Adjusted to match common REST patterns for "getMyLabResults".
      // Change to /labResults/my/results if that is what your route actually is
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    });

    if (!response.ok) {
      const data = await response.json();
      throw new Error(data.error || 'Erreur lors de la récupération des résultats de laboratoire');
    }

    const data = await response.json();
    return data; // backend returns labResults directly array
  } catch (error: any) {
    setErrorMessage(error.message || 'Erreur lors de la récupération des résultats de laboratoire');
    return [];
  }
};

export const getLabResultByIdApi = async (id: string, setErrorMessage: (msg: string) => void): Promise<LabResult | null> => {
  try {
    const token = localStorage.getItem('token');
    const response = await fetch(`${BASE}/labResults/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    });

    if (!response.ok) {
      const data = await response.json();
      throw new Error(data.error || 'Erreur lors de la récupération du résultat de laboratoire');
    }

    return await response.json();
  } catch (error: any) {
    setErrorMessage(error.message || 'Erreur lors de la récupération du résultat de laboratoire');
    return null;
  }
};

export const createLabResultApi = async (labResultData: Partial<LabResult>, setErrorMessage: (msg: string) => void): Promise<LabResult | null> => {
  try {
    const token = localStorage.getItem('token');
    const response = await fetch(`${BASE}/labResults`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(labResultData)
    });

    if (!response.ok) {
      const data = await response.json();
      throw new Error(data.error || 'Erreur lors de la création du résultat de laboratoire');
    }

    return await response.json();
  } catch (error: any) {
    setErrorMessage(error.message || 'Erreur lors de la création du résultat de laboratoire');
    return null;
  }
};

export const updateLabResultApi = async (id: string, labResultData: Partial<LabResult>, setErrorMessage: (msg: string) => void): Promise<LabResult | null> => {
  try {
    const token = localStorage.getItem('token');
    const response = await fetch(`${BASE}/labResults/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(labResultData)
    });

    if (!response.ok) {
      const data = await response.json();
      throw new Error(data.error || 'Erreur lors de la mise à jour du résultat de laboratoire');
    }

    return await response.json();
  } catch (error: any) {
    setErrorMessage(error.message || 'Erreur lors de la mise à jour du résultat de laboratoire');
    return null;
  }
};

export const deleteLabResultApi = async (id: string, setErrorMessage: (msg: string) => void): Promise<boolean> => {
  try {
    const token = localStorage.getItem('token');
    const response = await fetch(`${BASE}/labResults/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    });

    if (!response.ok) {
      const data = await response.json();
      throw new Error(data.error || 'Erreur lors de la suppression du résultat de laboratoire');
    }

    return true;
  } catch (error: any) {
    setErrorMessage(error.message || 'Erreur lors de la suppression du résultat de laboratoire');
    return false;
  }
};
