interface navbatProps{
    user:{
        name?:string;
        role?:string;
        email?:string
    }

}
function Header({user}:navbatProps) {
    return (
        <>
        <div className="d-flex justify-content-between align-items-center mb-4">
            <div>
                <h2>Bonjour, {user.name}</h2>
                <p className="text-muted">Bienvenue dans votre espace santé</p>
            </div>
            <div className="d-flex gap-3 align-items-center">
                <div className="position-relative">
                    <i className="fas fa-bell fa-lg text-muted" style={{cursor: 'pointer'}}></i>
                    <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">3</span>
                </div>
                <div className="d-flex align-items-center gap-2">
                    <img 
                        src="https://ui-avatars.com/api/?name=Ahmed+Mohamed&background=667eea&color=fff" 
                        className="rounded-circle" 
                        width="40"
                        alt="Avatar"
                    />
                    <div>
                        <small className="d-block fw-bold">{user.name}</small>
                    </div>
                </div>
            </div>
        </div>
        </>
    );
}

export default Header;