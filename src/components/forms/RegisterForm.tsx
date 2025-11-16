
// RegisterForm
import '../../styles/pages/register.css';
import PanelLeft from '../layout/PanelLeft';
import { useEffect, useState } from 'react';
import { Modal, Button } from 'react-bootstrap';

function RegisterForm() {
    const backgroundButton = (e: React.MouseEvent<HTMLDivElement>) => {
        const target = e.currentTarget.children[1] as HTMLElement;
        const fields = document.querySelectorAll(".fields")
        const selectedRole=target.textContent;
        if (selectedRole) {
            setRole(selectedRole);
        }
        // fields.forEach(element => {
        //     element.classList.remove('d-none')
        // });
        fields.forEach(element => {
            element.classList.add('d-none')
        });
        
        if (target.textContent === 'doctor') {
            const doctorField = document.getElementById("doctorFields")
            if (doctorField) {
                doctorField.classList.remove("d-none")
                doctorField.classList.add("fields")
            }

            
        } else if(target.textContent === 'Patient') {
            const patientFields = document.getElementById('patientFields')
            if (patientFields) {
                patientFields.classList.remove("d-none")
            }
            
            
        } else if(target.textContent === 'Secretaire') {
            const adminFields = document.getElementById('adminFields')
            if (adminFields) {
                adminFields.classList.remove("d-none")
            }
            
            
        } else if(target.textContent === 'Pharmacy') {
            const pharmacyFields = document.getElementById('pharmacyFields')
            if (pharmacyFields) {
                pharmacyFields.classList.remove("d-none")
            }
            
            
        } else if(target.textContent === 'Laboratoire') {
            const laboratoireFields = document.getElementById('laboratoireFields')
            if (laboratoireFields) {
                laboratoireFields.classList.remove("d-none")
            }
            
            
        } else if(target.textContent === 'Admin') {
            const adminFields = document.getElementById('adminFields')
            if (adminFields) {
                adminFields.classList.remove("d-none")
            }
            
            
        }

    const btn = document.querySelectorAll(".user-type-card");
    btn.forEach(function (bt) {
      bt.classList.remove("active");
    });
    e.currentTarget.classList.add("active");
    
  };


    // State names aligned with Mongoose schema
    const [role,setRole]=useState("doctor");
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");
    const [name,setName]=useState("");
    const [phone,setPhone]=useState("");
    const [specialite,setSpecialite]=useState("");
    const [address,setAddress]=useState("");
    const [horaires,setHoraires]=useState("");
    const [numLicence,setNumLicence]=useState("");
    const [anneExperience,setAnneExperience]=useState("");
    const [PharmacyName,setPharmacyName]=useState("");
    const [laboratoireName,setLaboratoireName]=useState("");
    const [dateNaissance,setDateNaissance]=useState("");
    const [Sexe,setSexe]=useState("");
     const [ContactUrgence,setContactUrgence]=useState("");
     // Additional states for UI fields not in schema
     const [responsable,setResponsable]=useState("");
     const [confirmPassword,setConfirmPassword]=useState("");
     const [employeeId,setEmployeeId]=useState("");
    // useEffect(()=>{
      
    // },[email])
    // const [passwordMatch, setPasswordMatch] = useState(true);

     const [showModal, setShowModal] = useState(false);

    const checkPasswordMatch = () => {
     {
        if (password !== confirmPassword || confirmPassword=="") {
            setShowModal(true);
        } else {
            setShowModal(false);
        }
    }
};
useEffect(() => {
    
    const handleKeyPress = (e: KeyboardEvent) => {
        if (e.key === "Enter" && showModal) {
            setShowModal(false);
        }
    };

    if (showModal) {
        document.addEventListener("keydown", handleKeyPress);
    }

    return () => {
        document.removeEventListener("keydown", handleKeyPress);
    };
}, [showModal]);
    
console.log(role);

    function sendUser(e){
        e.preventDefault();
        const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

         if (!email) {
        alert("L'email est requis !");
        return;
    }

    if (!validateEmail(email)) {
        alert("L'email n'est pas valide !");
        return;
    }
        if (password !== confirmPassword) {
        alert("Les mots de passe ne correspondent pas !");
        return;
    }
    if (password.length < 6) {
        alert("Le mot de passe doit contenir au moins 6 caractères !");
        return;
    }
    console.log("eeee");
    
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
    })
    .catch((err)=>console.log(err))
      
     
  }
    return(
      
                <>
                 <div className="row g-0 flex-fill">
                     
                   <PanelLeft />
        
                     <div className="col-lg-8">
                        <div className="right-panel p-4 p-lg-5 overflow-y-auto" style={{maxHeight: '95vh'}}>
                            <div className="text-center mb-4">
                                <h2 className="fw-bold">Créer un compte</h2>
                                <p className="text-muted">Remplissez le formulaire ci-dessous</p>
                            </div>
        
                          
                            <div className="alert alert-success d-none" id="successAlert">
                                <i className="fas fa-check-circle"></i> Inscription réussie! Redirection...
                            </div>
        
                            <div className="alert alert-danger d-none" id="errorAlert">
                                <i className="fas fa-exclamation-circle"></i> <span id="errorMessage"></span>
                            </div>
        
                            
                            <div className="row g-3 mb-4">
                                <div className="col-4">
                                    <div onClick={backgroundButton} className="user-type-card active border border-2 rounded-3 p-3 text-center cursor-pointer bg-white transition-all " >
                                        <i className="fas fa-user-md fs-2 text-secondary d-block mb-2"></i>
                                        <span className="d-block fw-semibold small text-secondary">doctor</span>
                                    </div>
                                </div>
                                <div className="col-4">
                                    <div onClick={backgroundButton} className="user-type-card  border border-2 rounded-3 p-3 text-center cursor-pointer bg-white transition-all " >
                                        <i className="fas fa-user-md fs-2 text-secondary d-block mb-2"></i>
                                        <span className="d-block fw-semibold small text-secondary">Pharmacy</span>
                                    </div>
                                </div>
                                <div className="col-4">
                                    <div onClick={backgroundButton} className="user-type-card  border border-2 rounded-3 p-3 text-center cursor-pointer bg-white transition-all " >
                                        <i className="fas fa-user-md fs-2 text-secondary d-block mb-2"></i>
                                        <span className="d-block fw-semibold small text-secondary">Laboratoire</span>
                                    </div>
                                </div>
                                <div className="col-4">
                                    <div onClick={backgroundButton} className="user-type-card  border border-2 rounded-3 p-3 text-center cursor-pointer bg-white transition-all " >
                                        <i className="fas fa-user-md fs-2 text-secondary d-block mb-2"></i>
                                        <span className="d-block fw-semibold small text-secondary">Secretaire</span>
                                    </div>
                                </div>
                                <div className="col-4">
                                    <div onClick={backgroundButton} className="user-type-card border border-2 rounded-3 p-3 text-center cursor-pointer bg-white transition-all" >
                                        <i className="fas fa-user-injured fs-2 text-secondary d-block mb-2"></i>
                                        <span className="d-block fw-semibold small text-secondary">Patient</span>
                                    </div>
                                </div>
                                <div className="col-4">
                                    <div onClick={backgroundButton} className="user-type-card border border-2 rounded-3 p-3 text-center cursor-pointer bg-white transition-all" >
                                        <i className="fas fa-user-shield fs-2 text-secondary d-block mb-2"></i>
                                        <span className="d-block fw-semibold small text-secondary">Admin</span>
                                    </div>
                                </div>
                            </div>
        
                            <form id="registerForm" >
                             
                                <div className="row g-3 mb-3">
                                   
                                    <div className="col-md-6">
                                        <label className="form-label fw-semibold">Nom *</label>
                                        <div className="position-relative">
                                            <input onChange={(e)=>{setName(e.target.value)}} type="text" className="form-control" id="name" placeholder="Entrez votre nom" required />
                                            <i className="fas fa-user input-icon text-secondary small"></i>
                                        </div>
                                    </div>
                                </div>


 <div id="pharmacyFields"   className="d-none fields">


                        <div className="row g-3 mb-3">
                                    <div className="col-md-6">
                                        <label className="form-label fw-semibold">Addresse *</label>
                                        <div className="position-relative">
                                            <input onChange={(e)=>{setAddress(e.target.value)}} type="text" className="form-control" id="Addresse" placeholder="Entrez votre address" required />
                                            <i className="fas fa-user input-icon text-secondary small"></i>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <label className="form-label fw-semibold">PharmacyName *</label>
                                        <div className="position-relative">
                                            <input onChange={(e)=>{setPharmacyName(e.target.value)}} type="text" className="form-control" id="PharmacyName" name="PharmacyName" placeholder="Entrez le nom du pharmacy" required />
                                            <i className="fas fa-user input-icon text-secondary small"></i>
                                        </div>
                                    </div>
                                </div>

 </div>

 <div id="laboratoireFields" className="d-none fields" >


                        <div className="row g-3 mb-3">
                                    <div className="col-md-6">
                                        <label className="form-label fw-semibold">Addresse *</label>
                                        <div className="position-relative">
                                            <input onChange={(e)=>{setAddress(e.target.value)}} type="text" className="form-control" id="Addresse" name="address" placeholder="Entrez votre address" required />
                                            <i className="fas fa-user input-icon text-secondary small"></i>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <label className="form-label fw-semibold">responsable *</label>
                                        <div className="position-relative">
                                            <input onChange={(e)=>{setResponsable(e.target.value)}}  type="text" className="form-control" id="responsable" name="responsable" placeholder="Entrez le nom du responsable" required />
                                            <i className="fas fa-user input-icon text-secondary small"></i>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <label className="form-label fw-semibold">Horaires *</label>
                                        <div className="position-relative">
                                            <input onChange={(e)=>{setHoraires(e.target.value)}} type="text" className="form-control" id="horaires" name="horaires" placeholder="Entrez horaires" required />
                                            <i className="fas fa-user input-icon text-secondary small"></i>
                                        </div>
                                    </div>
                                </div>

 </div>

        
                                <div className="row g-3 mb-3">
                                    <div className="col-md-6">
                                        <label className="form-label fw-semibold">Email *</label>
                                        <div className="position-relative">
                                            <input onChange={(e)=>{setEmail(e.target.value)}} type="email" className="form-control" id="email" placeholder="exemple@email.com" required />
                                            <i className="fas fa-envelope input-icon text-secondary small"></i>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <label className="form-label fw-semibold">Téléphone *</label>
                                        <div className="position-relative">
                                            <input onChange={(e)=>{setPhone(e.target.value)}} type="tel" className="form-control" id="phone" name="phone" placeholder="0612345678" required />
                                            <i className="fas fa-phone input-icon text-secondary small"></i>
                                        </div>
                                    </div>
                                </div>
        
                                <div className="row g-3 mb-3">
                                    <div className="col-md-6">
                                        <label className="form-label fw-semibold">Mot de passe *</label>
                                        <div className="position-relative">
                                            <input onChange={(e)=>{setPassword(e.target.value);}} type="password" className="form-control" id="password" placeholder="Mot de passe fort" required  /> {/*oninput={checkPasswordStrength}*/}
                                            <i className="fas fa-lock input-icon text-secondary small"></i>
                                        </div>
                                        <div className="password-strength mt-2 bg-light rounded-1 overflow-hidden" style={{height: '4px'}}>
                                            <div className="password-strength-bar rounded-1 transition-all" id="passwordStrengthBar" style={{width: '0%', height: '100%'}}></div>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <label className="form-label fw-semibold">Confirmer *</label>
                                        <div className="position-relative">
                                            <input onBlur={checkPasswordMatch} onChange={(e)=>{setConfirmPassword(e.target.value);}} type="password" className="form-control" id="confirmPassword" placeholder="Répétez le mot de passe" required />
                                            <i className="fas fa-lock input-icon text-secondary small"></i>
                                        </div>
                                    </div>
                                </div>
        
                               
                                <div id="doctorFields" className='fields' >
                                    <div className="row g-3 mb-3">
                                        <div className="col-md-6">
                                            <label className="form-label fw-semibold">Spécialité *</label>
                                            <div className="position-relative">
                                                <select className="form-select" id="specialite" name="specialite" onChange={(e)=>{setSpecialite(e.target.value)}} required>
                                                    <option value="">Choisir une spécialité</option>
                                                    <option value="general">Médecine générale</option>
                                                    <option value="cardiology">Cardiologie</option>
                                                    <option value="pediatrics">Pédiatrie</option>
                                                    <option value="orthopedics">Orthopédie</option>
                                                    <option value="dermatology">Dermatologie</option>
                                                    <option value="neurology">Neurologie</option>
                                                </select>
                                                <i className="fas fa-stethoscope input-icon text-secondary small"></i>
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <label className="form-label fw-semibold">N° de licence *</label>
                                            <div className="position-relative">
                                                <input onChange={(e)=>{setNumLicence(e.target.value)}} type="text" className="form-control" id="numLicence" name="numLicence" placeholder="Numéro de licence médicale" />
                                                <i className="fas fa-id-card input-icon text-secondary small"></i>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label fw-semibold">Années d'expérience *</label>
                                        <div className="position-relative">
                                            <input onChange={(e)=>{setAnneExperience(e.target.value)}} type="number" className="form-control" id="anneExperience" name="anneExperience" placeholder="Nombre d'années" min="0" />
                                            <i className="fas fa-briefcase input-icon text-secondary small"></i>
                                        </div>
                                    </div>
                                </div>
        





        
                               
                                <div id="patientFields" className="d-none fields">
                                    <div className="row g-3 mb-3">
                                        <div className="col-md-6">
                                            <label className="form-label fw-semibold">Date de naissance *</label>
                                            <div className="position-relative">
                                                <input onChange={(e)=>{setDateNaissance(e.target.value)}} type="date" className="form-control" id="dateNaissance" name="dateNaissance" />
                                                <i className="fas fa-calendar input-icon text-secondary small"></i>
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <label className="form-label fw-semibold">Sexe *</label>
                                            <div className="position-relative">
                                                <select className="form-select" id="Sexe" name="Sexe" onChange={(e)=>{setSexe(e.target.value)}}>
                                                    <option value="">Sélectionner</option>
                                                    <option value="male">Homme</option>
                                                    <option value="female">Femme</option>
                                                </select>
                                                <i className="fas fa-venus-mars input-icon text-secondary small"></i>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label fw-semibold">Adresse *</label>
                                        <div className="position-relative">
                                            <input onChange={(e)=>{setAddress(e.target.value)}} type="text" className="form-control" id="address" placeholder="Votre adresse complète" />
                                            <i className="fas fa-map-marker-alt input-icon text-secondary small"></i>
                                        </div>
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label fw-semibold">Contact d'urgence</label>
                                        <div className="position-relative">
                                            <input onChange={(e)=>{setContactUrgence(e.target.value)}} type="tel" className="form-control" id="ContactUrgence" name="ContactUrgence" placeholder="Numéro en cas d'urgence" />
                                            <i className="fas fa-phone-square-alt input-icon text-secondary small"></i>
                                        </div>
                                    </div>
                                </div>
        
                                
                                <div id="adminFields" className="d-none fields">
                                    <div className="row g-3 mb-3">
                                        <div className="col-md-6">
                                            <label className="form-label fw-semibold">Département *</label>
                                            <div className="position-relative">
                                                <select className="form-select" id="department">
                                                    <option value="">Choisir un département</option>
                                                    <option value="reception">Réception</option>
                                                    <option value="accounting">Comptabilité</option>
                                                    <option value="hr">Ressources Humaines</option>
                                                    <option value="it">Informatique</option>
                                                </select>
                                                <i className="fas fa-building input-icon text-secondary small"></i>
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <label className="form-label fw-semibold">ID Employé *</label>
                                            <div className="position-relative">
                                                <input onChange={(e)=>{setEmployeeId(e.target.value)}} type="text" className="form-control" id="employeeId" placeholder="Numéro d'employé" />
                                                <i className="fas fa-id-badge input-icon text-secondary small"></i>
                                            </div>
                                        </div>
                                    </div>
                                </div>
        
                                
                                <div className="form-check mb-4">
                                    <input className="form-check-input" type="checkbox" id="terms" required />
                                    <label className="form-check-label small" >
                                        J'accepte les <a href="#" className="text-decoration-none text-primary">Conditions d'utilisation</a> et la <a href="#" className="text-decoration-none text-primary">Politique de confidentialité</a>
                                    </label>
                                </div>
        
                                <button onClick={sendUser} type="submit" className="btn btn-primary w-100 py-3 fw-semibold shadow btn-register bg-gradient-primary border-0 transition-all">
                                    <i className="fas fa-user-plus me-2"></i>Créer mon compte
                                </button>
                            </form>
        
                            <hr className="my-4" />
        
                            <div className="text-center">
                                <small className="text-muted">Vous avez déjà un compte? <a href="#" className="text-decoration-none fw-semibold text-primary">Se connecter</a></small>
                            </div>
                        </div>
                    </div>
                </div>
                    <Modal 
  show={showModal}   
  onHide={() => setShowModal(false)} 
  centered
  className="custom-error-modal"
>
  <div className="modal-gradient-header">
    <div className="error-icon-container">
      <i className="fas fa-exclamation-triangle"></i>
    </div>
    <button 
      type="button" 
      className="custom-close-btn" 
      onClick={() => setShowModal(false)}
    >
      <i className="fas fa-times"></i>
    </button>
  </div>
  
  <Modal.Body className="text-center px-4 pb-4">
    <h4 className="error-title mb-3">Désoller!</h4>
    <p className="error-message">mts du passe n'est pas meme<br/>essaie a neveau</p>
  </Modal.Body>
  
  <Modal.Footer className="border-0 justify-content-center pb-4">
    <Button 
       
      className="custom-ok-btn"
      onClick={() => setShowModal(false)}
    >
      <i className="fas fa-check-circle me-2"></i>
       D'accord
    </Button>
  </Modal.Footer>
</Modal>
                </>
    );
}
export default RegisterForm;