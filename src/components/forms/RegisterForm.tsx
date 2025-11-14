
// RegisterForm
import '../../styles/pages/register.css';
import PanelLeft from '../layout/PanelLeft';

function RegisterForm() {
    const backgroundButton = (e) => {
        console.log((e.currentTarget.children[1].textContent));
        const test=document.querySelectorAll(".test")
        // test.forEach(element => {
        //     element.classList.remove('d-none')
        // });
        test.forEach(element => {
            element.classList.add('d-none')
        });
        console.log(test);
        
        
        if (e.currentTarget.children[1].textContent==='Medecin') {
           const medecinField= document.getElementById("doctorFields")
           medecinField.classList.remove("d-none")
           medecinField.classList.add("test")

            
        } else if(e.currentTarget.children[1].textContent==='Patient') {
            const patientFields=document.getElementById('patientFields')
            patientFields.classList.remove("d-none")
            
            
        } else if(e.currentTarget.children[1].textContent==='Secretaire') {
            const adminFields=document.getElementById('adminFields')
            adminFields.classList.remove("d-none")
            
            
        } else if(e.currentTarget.children[1].textContent==='Pharmacy') {
            const pharmacyFields=document.getElementById('pharmacyFields')
            pharmacyFields.classList.remove("d-none")
            
            
        } else if(e.currentTarget.children[1].textContent==='Laboratoire') {
            const laboratoireFields=document.getElementById('laboratoireFields')
            laboratoireFields.classList.remove("d-none")
            
            
        } else if(e.currentTarget.children[1].textContent==='Admin') {
            const adminFields=document.getElementById('adminFields')
            
        }

    const btn = document.querySelectorAll(".user-type-card");
    btn.forEach(function (bt) {
      bt.classList.remove("active");
    });
    e.currentTarget.classList.add("active");
    console.log(e.currentTarget);
    
  };
    return(
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
                                        <span className="d-block fw-semibold small text-secondary">Medecin</span>
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
                                        <label className="form-label fw-semibold">Prénom *</label>
                                        <div className="position-relative">
                                            <input type="text" className="form-control" id="firstName" placeholder="Entrez votre prénom" required />
                                            <i className="fas fa-user input-icon text-secondary small"></i>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <label className="form-label fw-semibold">Nom *</label>
                                        <div className="position-relative">
                                            <input type="text" className="form-control" id="lastName" placeholder="Entrez votre nom" required />
                                            <i className="fas fa-user input-icon text-secondary small"></i>
                                        </div>
                                    </div>
                                </div>


 <div id="pharmacyFields"   className="d-none test">


                        <div className="row g-3 mb-3">
                                    <div className="col-md-6">
                                        <label className="form-label fw-semibold">Addresse *</label>
                                        <div className="position-relative">
                                            <input type="text" className="form-control" id="Addresse" placeholder="Entrez votre address" required />
                                            <i className="fas fa-user input-icon text-secondary small"></i>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <label className="form-label fw-semibold">PharmacyName *</label>
                                        <div className="position-relative">
                                            <input type="text" className="form-control" id="PharmacistName" placeholder="Entrez le nom du pharmacy" required />
                                            <i className="fas fa-user input-icon text-secondary small"></i>
                                        </div>
                                    </div>
                                </div>

 </div>

 <div id="laboratoireFields" className="d-none test" >


                        <div className="row g-3 mb-3">
                                    <div className="col-md-6">
                                        <label className="form-label fw-semibold">Addresse *</label>
                                        <div className="position-relative">
                                            <input type="text" className="form-control" id="Addresse" placeholder="Entrez votre address" required />
                                            <i className="fas fa-user input-icon text-secondary small"></i>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <label className="form-label fw-semibold">responsable *</label>
                                        <div className="position-relative">
                                            <input type="text" className="form-control" id="PharmacistName" placeholder="Entrez le nom du pharmacy" required />
                                            <i className="fas fa-user input-icon text-secondary small"></i>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <label className="form-label fw-semibold">houresTravail *</label>
                                        <div className="position-relative">
                                            <input type="text" className="form-control" id="PharmacistName" placeholder="Entrez le nom du pharmacy" required />
                                            <i className="fas fa-user input-icon text-secondary small"></i>
                                        </div>
                                    </div>
                                </div>

 </div>

        
                                <div className="row g-3 mb-3">
                                    <div className="col-md-6">
                                        <label className="form-label fw-semibold">Email *</label>
                                        <div className="position-relative">
                                            <input type="email" className="form-control" id="email" placeholder="exemple@email.com" required />
                                            <i className="fas fa-envelope input-icon text-secondary small"></i>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <label className="form-label fw-semibold">Téléphone *</label>
                                        <div className="position-relative">
                                            <input type="tel" className="form-control" id="phone" placeholder="0612345678" required />
                                            <i className="fas fa-phone input-icon text-secondary small"></i>
                                        </div>
                                    </div>
                                </div>
        
                                <div className="row g-3 mb-3">
                                    <div className="col-md-6">
                                        <label className="form-label fw-semibold">Mot de passe *</label>
                                        <div className="position-relative">
                                            <input type="password" className="form-control" id="password" placeholder="Mot de passe fort" required  /> {/*oninput={checkPasswordStrength}*/}
                                            <i className="fas fa-lock input-icon text-secondary small"></i>
                                        </div>
                                        <div className="password-strength mt-2 bg-light rounded-1 overflow-hidden" style={{height: '4px'}}>
                                            <div className="password-strength-bar rounded-1 transition-all" id="passwordStrengthBar" style={{width: '0%', height: '100%'}}></div>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <label className="form-label fw-semibold">Confirmer *</label>
                                        <div className="position-relative">
                                            <input type="password" className="form-control" id="confirmPassword" placeholder="Répétez le mot de passe" required />
                                            <i className="fas fa-lock input-icon text-secondary small"></i>
                                        </div>
                                    </div>
                                </div>
        
                               
                                <div id="doctorFields" >
                                    <div className="row g-3 mb-3">
                                        <div className="col-md-6">
                                            <label className="form-label fw-semibold">Spécialité *</label>
                                            <div className="position-relative">
                                                <select className="form-select" id="specialization" required>
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
                                                <input type="text" className="form-control" id="licenseNumber" placeholder="Numéro de licence médicale" />
                                                <i className="fas fa-id-card input-icon text-secondary small"></i>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label fw-semibold">Années d'expérience *</label>
                                        <div className="position-relative">
                                            <input type="number" className="form-control" id="experience" placeholder="Nombre d'années" min="0" />
                                            <i className="fas fa-briefcase input-icon text-secondary small"></i>
                                        </div>
                                    </div>
                                </div>
        





        
                               
                                <div id="patientFields" className="d-none test">
                                    <div className="row g-3 mb-3">
                                        <div className="col-md-6">
                                            <label className="form-label fw-semibold">Date de naissance *</label>
                                            <div className="position-relative">
                                                <input type="date" className="form-control" id="birthDate" />
                                                <i className="fas fa-calendar input-icon text-secondary small"></i>
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <label className="form-label fw-semibold">Sexe *</label>
                                            <div className="position-relative">
                                                <select className="form-select" id="gender">
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
                                            <input type="text" className="form-control" id="address" placeholder="Votre adresse complète" />
                                            <i className="fas fa-map-marker-alt input-icon text-secondary small"></i>
                                        </div>
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label fw-semibold">Contact d'urgence</label>
                                        <div className="position-relative">
                                            <input type="tel" className="form-control" id="emergencyContact" placeholder="Numéro en cas d'urgence" />
                                            <i className="fas fa-phone-square-alt input-icon text-secondary small"></i>
                                        </div>
                                    </div>
                                </div>
        
                                
                                <div id="adminFields" className="d-none test">
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
                                                <input type="text" className="form-control" id="employeeId" placeholder="Numéro d'employé" />
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
        
                                <button type="submit" className="btn btn-primary w-100 py-3 fw-semibold shadow btn-register bg-gradient-primary border-0 transition-all">
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
    );
}
export default RegisterForm;