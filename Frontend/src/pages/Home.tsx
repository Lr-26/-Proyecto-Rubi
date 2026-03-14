import Hero from '../components/Hero';
import Catalog from '../components/Catalog';
import AboutPreview from '../components/AboutPreview';
import BrandExperience from '../components/BrandExperience';

const Home = () => {
    return (
        <div className="overflow-x-hidden">
            <Hero />
            <AboutPreview />
            <Catalog />
            <BrandExperience />
        </div>
    );
};

export default Home;
