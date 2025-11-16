import { jwtDecode } from "jwt-decode";
import { Navigate } from "react-router-dom";

// ProtectedRoute
// type ProtectedRouteProps ={
//   allowedRoule: string;
//   children: React.ReactElement;
// }
 function ProtectedRoute({children, allowedRole}: {children: React.ReactElement, allowedRole:string}) {
    const token = localStorage.getItem("token");
if (!token) {
    return <Navigate to="/login" />;
  }
  try {
     const decodedToken = jwtDecode(token);
     const currentTime=Math.floor(Date.now()/1000);
        if (decodedToken.exp < currentTime) {
        console.log("Le token est expiré");
        localStorage.removeItem("token");
    return <Navigate to="/login" />;
    }
    if (decodedToken.role === allowedRole) {
      return children; // Afficher le composant enfant si tout est valide
    } else {
      return <Navigate to="/unauthorized" />;
    }
    
  } catch (error) {
    
    console.error("Erreur lors du décodage du token :", error);
    return <Navigate to="/login" />;
  }
}
export default ProtectedRoute;