interface ServicesProps {
  services: Array<{
    icon: string;
    title: string;
    description: string;
  }>;
}

export default function Services({ services }: ServicesProps) {
  return (
    <section className="py-5">
      <div className="container">
        <div className="row">
          <div className="col-lg-8 mx-auto text-center mb-5">
            <h2 className="fw-bold text-primary">Nos Services</h2>
            <p className="text-muted lead">
              Découvrez nos solutions complètes pour moderniser votre pratique médicale
            </p>
          </div>
        </div>
        <div className="row g-4">
          {services.map((service, index) => (
            <div key={index} className="col-lg-4 col-md-6">
              <div className="card border-0 shadow-sm h-100 service-card">
                <div className="card-body text-center p-4">
                  <div className="mb-3">
                    <i className={`${service.icon} fa-3x text-primary`}></i>
                  </div>
                  <h4 className="card-title fw-bold">{service.title}</h4>
                  <p className="card-text text-muted">{service.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}