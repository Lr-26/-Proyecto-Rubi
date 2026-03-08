import Hero from '../components/Hero';
import Catalog from '../components/Catalog';
import AboutPreview from '../components/AboutPreview';
import Testimonials from '../components/Testimonials';

const Home = () => {
    return (
        <div className="overflow-x-hidden">
            <Hero />
            <AboutPreview />
            <Catalog />
            <Testimonials />
        </div>
    );
};

export default Home;
