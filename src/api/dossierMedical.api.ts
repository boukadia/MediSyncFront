import type { DossierMedical } from '../types/dossierMedical';

const BASE = import.meta.env.VITE_API;

export const getMyDossierMedical = async (): Promise<DossierMedical> => {
  const token = localStorage.getItem("token");
  const res = await fetch(`${BASE}/dossierMedicals/MyDossierMedical`, {
    headers: {
      "Authorization": `Bearer ${token}`
    }
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.error || "Failed to fetch dossier médical");
  }

  return res.json();
};