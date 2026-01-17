import { useState, useEffect } from 'react';

/**
 * Hook to detect the very first user interaction.
 * Used to defer heavy loads (WebGL, analytics, etc.) until the user is actually present.
 */
export default function useFirstInteraction() {
    const [hasInteracted, setHasInteracted] = useState(false);

    useEffect(() => {
        const handleInteraction = () => {
            setHasInteracted(true);
            // Cleanup listeners immediately after first trigger
            ['mousemove', 'scroll', 'touchstart', 'keydown', 'click'].forEach(event =>
                window.removeEventListener(event, handleInteraction)
            );
        };

        // Attach listeners
        ['mousemove', 'scroll', 'touchstart', 'keydown', 'click'].forEach(event =>
            window.addEventListener(event, handleInteraction, { passive: true, once: true })
        );

        return () => {
            ['mousemove', 'scroll', 'touchstart', 'keydown', 'click'].forEach(event =>
                window.removeEventListener(event, handleInteraction)
            );
        };
    }, []);

    return hasInteracted;
}
