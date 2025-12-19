interface TestimonialProps {
    testimonials?: Array<{
        name: string;
        message: string;
        avatar: string;
    }>;
}

function Testimonial({ testimonials }: TestimonialProps) {
    

    const data = testimonials ;

    return (
        <section className="py-5 bg-white">
            <div className="container py-5">
                <div className="text-center mb-5">
                    <h2 className="display-5 fw-bold mb-3">What Healthcare Professionals Say</h2>
                    <p className="text-muted lead">Trusted by clinics and medical professionals worldwide</p>
                </div>
                <div className="row g-4">
                    {data?.map((testimonial, index) => (
                        <div key={index} className="col-lg-4 col-md-6">
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
                                        "{testimonial.message}"
                                    </p>
                                    <div className="d-flex align-items-center">
                                        <img 
                                            src={testimonial.avatar}
                                            alt={testimonial.name}
                                            className="rounded-circle me-3"
                                            style={{ width: '50px', height: '50px', objectFit: 'cover' }}
                                        />
                                        <div>
                                            <h6 className="mb-0 fw-bold">{testimonial.name}</h6>
                                            <small className="text-muted">Healthcare Professional</small>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default Testimonial;