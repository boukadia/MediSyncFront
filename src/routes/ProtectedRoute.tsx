import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

function ProtectedRoute({ children, allowedRole }: { children: React.ReactElement; allowedRole: string }) {
  const [isValid, setIsValid] = useState<boolean | null>(null); // null = en cours de validation
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      setIsValid(false); // Pas de token, accès refusé
      return;
    }


    // Vérifier la validité du token auprès du backend
    fetch("http://localhost:3000/api/auth/validate", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (!res.ok) {
          console.error("Erreur lors de la validation du token :", res.status);
          throw new Error("Erreur lors de la validation du token");
        }
        return res.json();
      })
      .then((data) => {
        console.log(data);
        
        if (data.valid && data.role === allowedRole) {
          setIsValid(true); // Token valide et rôle autorisé
        } else {
          setIsValid(false); // Token invalide ou rôle non autorisé
        }
      })
      .catch((error) => {
        console.error("Erreur dans ProtectedRoute :", error);
        setIsValid(false); // En cas d'erreur, refuser l'accès
      });
  }, [token, allowedRole]);

  // Afficher un écran de chargement pendant la validation
  if (isValid === null) {
    return <div>Chargement...</div>;
  }

  // Rediriger vers /login si le token est invalide ou absent
  if (!isValid) {
    return <Navigate to="/login" />;
  }

  // Afficher le composant enfant si tout est valide
  return children;
}

export default ProtectedRoute;