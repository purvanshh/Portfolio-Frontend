import React, { useState, useEffect, useRef } from 'react';

/**
 * LazyRender component
 * 
 * Only renders its children when the component enters the viewport.
 * This effectively prevents the browser from downloading code chunks, images, 
 * or executing logic for components that are off-screen.
 * 
 * @param {Object} props
 * @param {React.ReactNode} props.children - The content to lazy load
 * @param {string} props.rootMargin - Margin around the root to detect intersection (default: '200px')
 * @param {number} props.threshold - Percentage of visibility to trigger (default: 0.1)
 * @param {React.ReactNode} props.fallback - Placeholder to show before loading
 */
const LazyRender = ({
    children,
    rootMargin = '200px',
    threshold = 0.0,
    fallback = null,
    ...props
}) => {
    const [isVisible, setIsVisible] = useState(false);
    const containerRef = useRef(null);

    useEffect(() => {
        // If IntersectionObserver is not supported, render immediately (safeguard)
        if (!window.IntersectionObserver) {
            setIsVisible(true);
            return;
        }

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.disconnect(); // Once visible, we don't need to observe anymore
                }
            },
            {
                rootMargin,
                threshold
            }
        );

        if (containerRef.current) {
            observer.observe(containerRef.current);
        }

        return () => {
            observer.disconnect();
        };
    }, [rootMargin, threshold]);

    return (
        <div ref={containerRef} style={{ minHeight: '10px' }} {...props}>
            {isVisible ? children : fallback}
        </div>
    );
};

export default LazyRender;
