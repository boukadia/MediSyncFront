interface FooterProps {
    footerData?: {
        copyright: string;
        links: Array<{
            label: string;
            url: string;
        }>;
    };
}

function Footer({ footerData }: FooterProps) {
    const defaultData = {
        copyright: "© 2025 MediSync. Tous droits réservés.",
        links: [
            { label: "Politique de confidentialité", url: "/privacy" },
            { label: "Conditions d'utilisation", url: "/terms" },
            { label: "Contact", url: "/contact" }
        ]
    };

    const data = footerData || defaultData;

    return (
        <footer className="bg-dark text-white py-4" id="contact">
            <div className="container">
                <div className="row">
                    <div className="col-md-4 mb-3">
                        <h5><i className="fas fa-heartbeat me-2"></i>MediSync</h5>
                        <p className="text-white-50">
                            Plateforme de gestion médicale moderne pour optimiser les soins de santé.
                        </p>
                    </div>
                    
                    <div className="col-md-4 mb-3">
                        <h5>Contact</h5>
                        <ul className="list-unstyled text-white-50">
                            <li><i className="fas fa-envelope me-2"></i>contact@medisync.ma</li>
                            <li><i className="fas fa-phone me-2"></i>+212 (0) 5 22 XX XX XX</li>
                            <li><i className="fas fa-map-marker-alt me-2"></i>Casablanca, Maroc</li>
                        </ul>
                    </div>
                    
                    <div className="col-md-4 mb-3">
                        <h5>Liens utiles</h5>
                        <div className="d-flex flex-column">
                            {data.links.map((link, index) => (
                                <a key={index} href={link.url} className="text-white-50 text-decoration-none mb-1">
                                    {link.label}
                                </a>
                            ))}
                        </div>
                    </div>
                </div>
                
                <hr className="border-secondary" />
                
                <div className="text-center text-white-50">
                    <p className="mb-0">{data.copyright}</p>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
