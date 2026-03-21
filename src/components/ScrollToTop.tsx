import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function ScrollToTop() {
    const { pathname } = useLocation();

    useEffect(() => {
        // Prevent browser from restoring scroll position automatically
        // so users always see the Hero/Pantalla Principal when entering the site or reloading
        if ('scrollRestoration' in history) {
            history.scrollRestoration = 'manual';
        }
    }, []);

    useEffect(() => {
        // Force scroll to top immediately
        window.scrollTo(0, 0);
        
        // Double guarantee after layout shifts
        const timeoutId = setTimeout(() => {
            window.scrollTo(0, 0);
        }, 50);

        return () => clearTimeout(timeoutId);
    }, [pathname]);

    return null;
}
