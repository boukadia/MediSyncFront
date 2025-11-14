function PanelLeft() {
    return(
        <>
         <div className="col-lg-4">
                <div className="left-panel bg-gradient-primary text-white p-4 p-lg-5 h-100 d-flex flex-column justify-content-center position-relative">
                    <div className="text-center mb-4 position-relative"style={{zIndex: 1}}>
                        <div className="clinic-logo bg-white rounded-circle d-flex align-items-center justify-content-center mx-auto mb-4 shadow" style={{width: '90px', height: '90px'}}>
                            <i className="fas fa-heartbeat fs-1"></i>
                        </div>
                        <h3 className="fw-bold mb-2">Clinique Médicale</h3>
                        <p className="mb-0 small opacity-90">Système de gestion intégré</p>
                    </div>
                    
                    <div className="benefits-list mt-4 position-relative" style={{zIndex: 1}}>
                        <div className="benefit-item d-flex align-items-center gap-3 mb-4">
                            <div className="benefit-icon d-flex align-items-center justify-content-center rounded-3 bg-white bg-opacity-25 flex-shrink-0" style={{width: '45px', height: '45px'}}>
                                <i className="fas fa-shield-alt fs-5"></i>
                            </div>
                            <div>
                                <strong className="d-block">Sécurité élevée</strong>
                                <small className="opacity-90">Protection de vos données</small>
                            </div>
                        </div>
                        
                        <div className="benefit-item d-flex align-items-center gap-3 mb-4">
                            <div className="benefit-icon d-flex align-items-center justify-content-center rounded-3 bg-white bg-opacity-25 flex-shrink-0" style={{width: '45px', height: '45px'}}>
                                <i className="fas fa-clock fs-5"></i>
                            </div>
                            <div>
                                <strong className="d-block">Disponible 24/7</strong>
                                <small className="opacity-90">Accès à tout moment</small>
                            </div>
                        </div>
                        
                        <div className="benefit-item d-flex align-items-center gap-3 mb-4">
                            <div className="benefit-icon d-flex align-items-center justify-content-center rounded-3 bg-white bg-opacity-25 flex-shrink-0" style={{width: '45px', height: '45px'}}>
                                <i className="fas fa-headset fs-5"></i>
                            </div>
                            <div>
                                <strong className="d-block">Support technique</strong>
                                <small className="opacity-90">Assistance permanente</small>
                            </div>
                        </div>

                        <div className="benefit-item d-flex align-items-center gap-3 mb-4">
                            <div className="benefit-icon d-flex align-items-center justify-content-center rounded-3 bg-white bg-opacity-25 flex-shrink-0" style={{width: '45px', height: '45px'}}>
                                <i className="fas fa-mobile-alt fs-5"></i>
                            </div>
                            <div>
                                <strong className="d-block">Facile à utiliser</strong>
                                <small className="opacity-90">Interface intuitive</small>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default PanelLeft;