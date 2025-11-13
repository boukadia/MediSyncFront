function Testimonial() {
    return (
        <section className="py-5 bg-white">
            <div className="container py-5">
                <div className="text-center mb-5">
                    <h2 className="display-5 fw-bold mb-3">What Healthcare Professionals Say</h2>
                    <p className="text-muted lead">Trusted by clinics and medical professionals worldwide</p>
                </div>
                <div className="row g-4">
                    <div className="col-lg-4 col-md-6">
                        <div className="card h-100 border-0 shadow-sm">
                            <div className="card-body p-4">
                                <div className="text-warning mb-3">
                                    <i className="fas fa-star"></i>
                                    <i className="fas fa-star"></i>
                                    <i className="fas fa-star"></i>
                                    <i className="fas fa-star"></i>
                                    <i className="fas fa-star"></i>
                                </div>
                                <p className="text-muted mb-4">
                                    "Careflow transformed how we manage our clinic. The appointment system alone saved us 10 hours a week!"
                                </p>
                                <div className="d-flex align-items-center">
                                    <div 
                                        className="rounded-circle bg-primary text-white d-flex align-items-center justify-content-center me-3"
                                        style={{ width: '50px', height: '50px', fontSize: '1.2rem', fontWeight: 'bold' }}
                                    >
                                        DR
                                    </div>
                                    <div>
                                        <h6 className="mb-0 fw-bold">Dr. Sarah Mitchell</h6>
                                        <small className="text-muted">Family Medicine Clinic</small>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-4 col-md-6">
                        <div className="card h-100 border-0 shadow-sm">
                            <div className="card-body p-4">
                                <div className="text-warning mb-3">
                                    <i className="fas fa-star"></i>
                                    <i className="fas fa-star"></i>
                                    <i className="fas fa-star"></i>
                                    <i className="fas fa-star"></i>
                                    <i className="fas fa-star"></i>
                                </div>
                                <p className="text-muted mb-4">
                                    "The digital records system is incredibly secure and easy to use. Our entire team adapted within days."
                                </p>
                                <div className="d-flex align-items-center">
                                    <div 
                                        className="rounded-circle bg-primary text-white d-flex align-items-center justify-content-center me-3"
                                        style={{ width: '50px', height: '50px', fontSize: '1.2rem', fontWeight: 'bold' }}
                                    >
                                        JL
                                    </div>
                                    <div>
                                        <h6 className="mb-0 fw-bold">Dr. James Lee</h6>
                                        <small className="text-muted">Pediatrics Specialist</small>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-4 col-md-6">
                        <div className="card h-100 border-0 shadow-sm">
                            <div className="card-body p-4">
                                <div className="text-warning mb-3">
                                    <i className="fas fa-star"></i>
                                    <i className="fas fa-star"></i>
                                    <i className="fas fa-star"></i>
                                    <i className="fas fa-star"></i>
                                    <i className="fas fa-star"></i>
                                </div>
                                <p className="text-muted mb-4">
                                    "Outstanding support team and the analytics features help us make better business decisions daily."
                                </p>
                                <div className="d-flex align-items-center">
                                    <div 
                                        className="rounded-circle bg-primary text-white d-flex align-items-center justify-content-center me-3"
                                        style={{ width: '50px', height: '50px', fontSize: '1.2rem', fontWeight: 'bold' }}
                                    >
                                        MP
                                    </div>
                                    <div>
                                        <h6 className="mb-0 fw-bold">Maria Patel</h6>
                                        <small className="text-muted">Clinic Administrator</small>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Testimonial;