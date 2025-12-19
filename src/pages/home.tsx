import { useEffect, useState } from "react";
import Footer from "../components/home/Footer";
import Hero from "../components/home/Hero";
import Navbar from "../components/home/Navbar";
import Testimonial from "../components/home/Testimonial";
import About from "../components/home/Abouts";
// import Services from "../components/home/Services";
import { getHomeDataApi } from "../api/home.api";
import type { HomeData } from "../api/home.api";

function Home() {
    const [homeData, setHomeData] = useState<HomeData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchHomeData = async () => {
            try {
                setLoading(true);
                const data = await getHomeDataApi();
                setHomeData(data);
                setError(null);
            } catch (err) {
                setError('Erreur lors du chargement des données');
                console.error('Error fetching home data:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchHomeData();
    }, []);

    if (loading) {
        return (
            <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Chargement...</span>
                </div>
            </div>
        );
    }

    if (error || !homeData) {
        return (
            <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
                <div className="alert alert-danger" role="alert">
                    {error || 'Erreur lors du chargement de la page'}
                </div>
            </div>
        );
    }
    console.log(homeData);
    

    return (
        <>
            <Navbar />
            <Hero heroData={homeData.heroSection} />
            <About aboutData={homeData.aboutSection} />
            <Testimonial testimonials={homeData.testimonials} />
            <Footer footerData={homeData.footer} />
        </>
    );
}

export default Home;


