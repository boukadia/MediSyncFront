import { Link } from 'react-router-dom';

interface HeroProps {
    heroData?: {
        title: string;
        subtitle: string;
        bannerImage: string;
        ctaText: string;
        ctaLink: string;
    };
}

export default function Hero({ heroData }: HeroProps) {
   

    const data = heroData 

    return (
        <section className="py-5 bg-light" id="home">
            <div className="container py-5">
                <div className="row align-items-center">
                    <div className="col-lg-6 mb-4 mb-lg-0">
                        <h1 className="display-4 fw-bold mb-4">
                            {data?.title}
                        </h1>
                        <p className="lead text-muted mb-4">
                            {data?.subtitle}
                        </p>
                        <div className="d-flex gap-3 flex-wrap">
                            <Link to={data.ctaLink} className="btn btn-primary btn-lg px-4">
                                {data?.ctaText}
                            </Link>
                            <Link to="/" className="btn btn-outline-primary btn-lg px-4">
                                Learn More
                                <i className="fas fa-play-circle ms-2"></i>
                            </Link>
                        </div>
                    </div>
                    <div className="col-lg-6 text-center">
                        <img 
                            src={data?.bannerImage} 
                            alt="Healthcare Professionals"
                            className="img-fluid rounded"
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}