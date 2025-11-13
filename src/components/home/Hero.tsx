import { Link } from 'react-router-dom';

export default function Hero() {
    return (
        <section className="py-5 bg-light" id="home">
            <div className="container py-5">
                <div className="row align-items-center">
                    <div className="col-lg-6 mb-4 mb-lg-0">
                        <h1 className="display-4 fw-bold mb-4">
                            Simplify your <span className="text-primary">clinic management</span> with Careflow
                        </h1>
                        <p className="lead text-muted mb-4">
                            Streamline appointments, manage patient records, and optimize your clinic operations with our all-in-one medical management platform.
                        </p>
                        <div className="d-flex gap-3 flex-wrap">
                            <Link to="/login" className="btn btn-primary btn-lg px-4">
                                Get Started
                            </Link>
                            <a href="#features" className="btn btn-outline-primary btn-lg px-4">
                                Learn More
                                <i className="fas fa-play-circle ms-2"></i>
                            </a>
                        </div>
                    </div>
                    <div className="col-lg-6 text-center">
                        <img 
                            src="https://cdni.iconscout.com/illustration/premium/thumb/doctor-appointment-booking-illustration-download-in-svg-png-gif-file-formats--healthcare-medical-online-consultation-pack-illustrations-4726992.png" 
                            alt="Healthcare Professionals"
                            className="img-fluid rounded"
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}