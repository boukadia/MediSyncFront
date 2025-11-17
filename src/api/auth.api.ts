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

export async function registerApi( // Common fields for all roles
  email: string,
  password: string,
  name: string,
  phone: string,
  role: string,
  
  // Doctor fields
  specialite?: string,
  numLicence?: string,
  anneExperience?: string,
  
  // Patient fields
  dateNaissance?: string,
  Sexe?: string,
  ContactUrgence?: string,
  
  // Pharmacy fields
  PharmacyName?: string,
   // Laboratoire fields
  laboratoireName?: string,
  responsable?: string,
  horaires?: string,
  
  // Admin/Secretary fields
  employeeId?: string,
  
  // Common address field
  address?: string,
  
  // Navigation and error handling
  navigate: any,
  setErrorMessage: (message: string) => void

  ) {
     fetch("http://localhost:3000/api/auth/register",{
        method:'POST',
        headers:{
          "Content-Type":"application/json"
        },
        body:JSON.stringify({
            email:email,
            password:password,
            name:name,
            address:address,
            PharmacyName:PharmacyName,
            phone:phone,
            role:role,
            specialite:specialite,

            
            // confirmPassword:confirmPassword,
            numLicence:numLicence,
            anneExperience:anneExperience,
            ContactUrgence:ContactUrgence,
            // employeeId:employeeId,
            // responsable:responsable,
            // houresTravail:horaires
            dateNaissance:dateNaissance

        }),
        
    })
    .then((res)=>res.json())
    .then((data)=>{
      console.log(data)
          setErrorMessage("");
          alert("Inscription réussie! Vous pouvez maintenant vous connecter.");
            navigate("/login");
    })
    .catch((err)=>{console.log(err); setErrorMessage(err.message || "Erreur lors de l'inscription");})
}

export async function validateApi(token: string) {
  return fetch(`${BASE}/auth/validate`, {
    headers: { Authorization: `Bearer ${token}` }
  }).then(r => r.json());
}
