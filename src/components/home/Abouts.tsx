

interface AboutProps {
  aboutData: {
    title: string;
    description: string;
    image: string;
    medecin:string;
    patient:string
  };
}

export default function About({ aboutData }: AboutProps) {
  
    return(
        <section className="py-5 bg-light">
            <div className="container">
                <div className="row align-items-center">
                    <div className="col-lg-6">
                        <h2 className="fw-bold text-primary mb-3">{aboutData.title}</h2>
                        <p className="text-muted lead">{aboutData.description}</p>
                        <div className="d-flex gap-3 mt-4">
                            <div className="text-center">
                                <h4 className="text-primary fw-bold">{aboutData.medecin}</h4>
                                <small className="text-muted">Médecins</small>
                            </div>
                            <div className="text-center">
                                <h4 className="text-primary fw-bold">{aboutData.patient}</h4>
                                <small className="text-muted">Patients</small>
                            </div>
                            <div className="text-center">
                                <h4 className="text-primary fw-bold">99%</h4>
                                <small className="text-muted">Satisfaction</small>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-6">
                        <img 
                            src={aboutData.image} 
                            alt="À propos de MediSync" 
                            className="img-fluid rounded shadow"
                        />
                    </div>
                </div>
            </div>
        </section>
    )
}