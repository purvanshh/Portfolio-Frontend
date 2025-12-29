import React, {
    useEffect,
    useRef,
    useState,
    useLayoutEffect,
    forwardRef,
} from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ExternalLink, Github } from "lucide-react";
import { cn } from "../../lib/utils";
import ShineButton from "./ShineButton";
import "./ScrollCarousel.css"; // Import CSS

gsap.registerPlugin(ScrollTrigger);

// --- Custom Hook for Animations ---
const useFeatureAnimations = (
    containerRef,
    scrollContainerRef,
    progressBarRef,
    cardRefs,
    isDesktop,
    maxScrollHeight
) => {
    useLayoutEffect(() => {
        let ctx = gsap.context(() => {
            // Desktop horizontal scroll logic
            if (isDesktop && scrollContainerRef.current) {
                const scrollWidth = scrollContainerRef.current?.scrollWidth || 0;
                const containerWidth = containerRef.current?.offsetWidth || 0;
                const cardWidth = cardRefs.current[0]?.offsetWidth || 0;
                const viewportOffset = (containerWidth - cardWidth) / 2;

                const finalOffset = scrollWidth - containerWidth + viewportOffset + (containerWidth / 2 - cardWidth / 2);

                // Use the provided maxScrollHeight or the calculated offset as the scroll distance
                const scrollDistance = maxScrollHeight || finalOffset;

                const tl = gsap.timeline({
                    scrollTrigger: {
                        trigger: containerRef.current,
                        start: "top top",
                        end: () => `+=${scrollDistance}`,
                        scrub: 2,
                        pin: true,
                    },
                });

                tl.fromTo(
                    scrollContainerRef.current,
                    { x: viewportOffset },
                    { x: -finalOffset + viewportOffset, ease: "none", duration: 1 },
                    0
                ).to({}, { duration: 0.2 }); // Hold for a bit

                gsap.to(progressBarRef.current, {
                    width: "100%",
                    ease: "none",
                    scrollTrigger: {
                        trigger: containerRef.current,
                        start: "top top",
                        end: () => `+=${scrollDistance}`,
                        scrub: true,
                    },
                });
            } else {
                // Mobile vertical scroll logic
                cardRefs.current.forEach((card, index) => {
                    if (card) {
                        gsap.fromTo(
                            card,
                            {
                                opacity: 0,
                                x: index % 2 === 0 ? -100 : 100,
                            },
                            {
                                opacity: 1,
                                x: 0,
                                duration: 1,
                                ease: "power2.out",
                                scrollTrigger: {
                                    trigger: card,
                                    start: "top 80%", // Adjusted for mobile view
                                    toggleActions: "play none none none",
                                    once: true,
                                },
                            }
                        );
                    }
                });
            }
        }, containerRef);

        return () => {
            ctx.revert();
        };
    }, [isDesktop, maxScrollHeight, scrollContainerRef, containerRef, progressBarRef, cardRefs]);
};

// --- Component Definition ---
const ScrollCarousel = forwardRef(
    ({ features, className, maxScrollHeight = 3000, ...props }, ref) => {
        const containerRef = useRef(null);
        const scrollContainerRef = useRef(null);
        const progressBarRef = useRef(null);
        const cardRefs = useRef([]);
        const [isDesktop, setIsDesktop] = useState(false);

        useEffect(() => {
            const checkDesktop = () => {
                setIsDesktop(window.matchMedia("(min-width: 768px)").matches);
            };
            checkDesktop();
            window.addEventListener("resize", checkDesktop);
            return () => window.removeEventListener("resize", checkDesktop);
        }, []);

        useFeatureAnimations(
            containerRef,
            scrollContainerRef,
            progressBarRef,
            cardRefs,
            isDesktop,
            maxScrollHeight
        );

        const renderFeatureCards = (featureSet, refs) =>
            featureSet.map((feature, index) => (
                <div
                    key={index}
                    ref={(el) => {
                        if (el) refs.current[index] = el;
                    }}
                    className="feature-card group"
                >
                    <div className="feature-card-inner">
                        <img
                            src={feature.image || "https://images.pexels.com/photos/9934462/pexels-photo-9934462.jpeg"}
                            alt={feature.title}
                            className="feature-bg-img"
                        />

                        <div className="feature-content-wrapper">
                            <div className="feature-content">
                                <div className="feature-info">
                                    <h3 className="feature-title">
                                        {feature.title}
                                    </h3>
                                    <p className="feature-desc">
                                        {feature.description}
                                    </p>
                                </div>
                                <div className="feature-actions">
                                    {feature.link && (
                                        <ShineButton
                                            label="Code"
                                            size="md"
                                            bgColor="linear-gradient(325deg, hsl(217 100% 56%) 0%, hsl(194 100% 69%) 55%, hsl(217 100% 56%) 90%)"
                                            className="project-action-btn"
                                            onClick={() => window.open(feature.link, "_blank", "noopener,noreferrer")}
                                        >
                                            <Github size={18} style={{ marginRight: "0.5rem" }} />
                                            Code
                                        </ShineButton>
                                    )}
                                    {feature.demoLink && (
                                        <ShineButton
                                            label="Live Demo"
                                            size="md"
                                            bgColor="linear-gradient(325deg, hsl(217 100% 56%) 0%, hsl(194 100% 69%) 55%, hsl(217 100% 56%) 90%)"
                                            className="project-action-btn"
                                            onClick={() => window.open(feature.demoLink, "_blank", "noopener,noreferrer")}
                                        >
                                            <ExternalLink size={18} style={{ marginRight: "0.5rem" }} />
                                            Live Demo
                                        </ShineButton>
                                    )}
                                </div>
                            </div>
                        </div>
                        {/* Overlay for hover effect */}
                        <div className="card-overlay" />
                    </div>
                </div>
            ));

        return (
            <section
                className={cn(
                    "scroll-carousel-section",
                    className
                )}
                ref={ref}
                {...props}
            >
                <div
                    ref={containerRef}
                    className="scroll-carousel-container"
                >
                    {/* Row 1 */}
                    <div
                        ref={scrollContainerRef}
                        className="scroll-row"
                    >
                        {renderFeatureCards(features, cardRefs)}
                    </div>

                    {isDesktop && (
                        <div className="progress-bar-container">
                            <div
                                ref={progressBarRef}
                                className="progress-bar"
                                style={{ width: "0%" }}
                            >
                                <div className="animated-water" />
                            </div>
                        </div>
                    )}
                </div>
            </section>
        );
    }
);

ScrollCarousel.displayName = "ScrollCarousel";

export default ScrollCarousel;
