import { jwtDecode } from "jwt-decode";

// auth.api
const BASE = import.meta.env.VITE_API;

export async function loginApi(email: string, password: string,navigate:any,setErrorMessage: (message: string) => void) {
    console.log(BASE);
    
//   const res = await fetch(`${BASE}/auth/login`, {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify({ email, password })
//   });
//   return res.json();
// const [errorMessage, setErrorMessage] = useState("");


 fetch(`${BASE}/auth/login`,{
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify({
        email,
        password
    }),
    

    })
    .then((res)=>{
      if (!res.ok) {
        return res.json().then((data) => {
          throw new Error(data.message);
        });
      }
      return res.json();
    })
    .then((data)=>{
      if (data.token) {
     const decodedToken = jwtDecode(data.token);
         setErrorMessage("");


        console.log("Connexion réussie :", decodedToken);
        localStorage.setItem("token", data.token);
        // console.log(data.user.role);
        

        // const decodedToken = jwtDecode(data.token);
        const userRole:string = (decodedToken as {role:string}).role;
        if (userRole==='patient') {
          navigate("/dashboard/patient");
          
        } else if(userRole==='doctor'){
          navigate("/dashboard/doctor");
        }
        else if(userRole==='admin'){
          navigate("/dashboard/admin");
        }
        else if(userRole==='secretaire'){
          navigate("/dashboard/secretaire");
        }
        else if (userRole==="pharmacy") {
          navigate("/dashboard/pharmacy");
        }
        else if (userRole==="laboratoire") {
          navigate("/dashboard/laboratoire");
        }
        
        // navigate("/dashboard"); 
      } else {
        console.error("Aucun token reçu !");
        alert("Erreur : Aucun token reçu !");
      }
      
  })
  .catch((error) => {
      // Mettre à jour le message d'erreur
      console.error("Erreur :", error.message);
      setErrorMessage(error.message);
    });
}

export async function validateApi(token: string) {
  return fetch(`${BASE}/auth/validate`, {
    headers: { Authorization: `Bearer ${token}` }
  }).then(r => r.json());
}
