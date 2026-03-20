import Hero from '../components/Hero';
import Catalog from '../components/Catalog';
import AboutPreview from '../components/AboutPreview';
import BrandExperience from '../components/BrandExperience';
import PaymentMethods from '../components/PaymentMethods';

const Home = () => {
    return (
        <div className="overflow-x-hidden">
            <Hero />
            <AboutPreview />
            <Catalog />
            <BrandExperience />
            <PaymentMethods />
        </div>
    );
};

export default Home;
