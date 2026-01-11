import { useEffect } from 'react';

const useMobileRedirect = () => {
    useEffect(() => {
        const checkMobileAndRedirect = () => {
            // Check user agent for mobile devices
            const userAgent = navigator.userAgent || navigator.vendor || window.opera;
            const isMobileUserAgent = /android|ipad|iphone|ipod/i.test(userAgent);

            // Check screen width (typical mobile breakpoint)
            const isSmallScreen = window.innerWidth <= 768;

            // Combine checks to be sure it's likely a phone/mobile device
            if (isMobileUserAgent || isSmallScreen) {
                // Redirect to the specified URL
                window.location.href = "https://purvansh-html.vercel.app";
            }
        };

        checkMobileAndRedirect();

        // Optional: Listen for resize events to redirect if window becomes small? 
        // Usually for "mobile redirect" we just care about initial load or device type.
        // Adding resize listener might be annoying for desktop users resizing windows.
        // So sticking to initial check + device type is safer.

    }, []);
};

export default useMobileRedirect;
