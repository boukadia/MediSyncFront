function Footer() {
    return (
        <footer className="bg-dark text-white py-4" id="contact">
            <div className="container">
                <div className="row">
                    <div className="col-md-4 mb-3">
                        <h5><i className="fas fa-heartbeat me-2"></i>Careflow</h5>
                        <p className="text-white-50">
                            Empowering healthcare providers with innovative management solutions.
                        </p>
                    </div>
                    
                    <div className="col-md-4 mb-3">
                        <h5>Contact</h5>
                        <ul className="list-unstyled text-white-50">
                            <li><i className="fas fa-envelope me-2"></i>info@careflow.com</li>
                            <li><i className="fas fa-phone me-2"></i>+1 (234) 567-890</li>
                            <li><i className="fas fa-map-marker-alt me-2"></i>123 Health St</li>
                        </ul>
                    </div>
                    
                    <div className="col-md-4 mb-3">
                        <h5>Suivez-nous</h5>
                        <div className="d-flex gap-2">
                            <a href="#" className="text-white"><i className="fab fa-facebook fa-lg"></i></a>
                            <a href="#" className="text-white"><i className="fab fa-twitter fa-lg"></i></a>
                            <a href="#" className="text-white"><i className="fab fa-linkedin fa-lg"></i></a>
                            <a href="#" className="text-white"><i className="fab fa-instagram fa-lg"></i></a>
                        </div>
                    </div>
                </div>
                
                <hr className="border-secondary" />
                
                <div className="text-center text-white-50">
                    <p className="mb-0">&copy; 2024 Mustapha Boukadi. Tous droits réservés. Développé avec ❤️</p>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
