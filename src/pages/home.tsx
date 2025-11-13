import Footer   from "../components/home/Footer";
import Hero from "../components/home/Hero";
import Navbar   from "../components/home/Navbar";
import Testimonial from "../components/home/Testimonial";

function Home(){

    return(
        <>
        <Navbar/>
        <Hero/>
        <Testimonial />
        <Footer />
        </>
    )
}
export default Home;