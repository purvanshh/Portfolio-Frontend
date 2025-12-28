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
import "./ScrollCarousel.css"; // Import CSS

gsap.registerPlugin(ScrollTrigger);

// --- Custom Hook for Animations ---
const useFeatureAnimations = (
    containerRef,
    scrollContainerRef,
    scrollContainerRef2,
    progressBarRef,
    cardRefs,
    cardRefs2,
    isDesktop,
    maxScrollHeight
) => {
    useLayoutEffect(() => {
        let ctx = gsap.context(() => {
            // Desktop horizontal scroll logic
            if (isDesktop && scrollContainerRef.current) {
                const scrollWidth1 = scrollContainerRef.current?.scrollWidth || 0;
                const scrollWidth2 = scrollContainerRef2.current?.scrollWidth || 0;
                const containerWidth = containerRef.current?.offsetWidth || 0;
                const cardWidth = cardRefs.current[0]?.offsetWidth || 0;
                const viewportOffset = (containerWidth - cardWidth) / 2;

                const finalOffset1 = scrollWidth1 - containerWidth + viewportOffset + (containerWidth / 2 - cardWidth / 2);
                const finalOffset2 = scrollWidth2 - containerWidth + viewportOffset;

                // Use the provided maxScrollHeight or the calculated offset as the scroll distance
                const scrollDistance = maxScrollHeight || finalOffset1;

                if (scrollContainerRef2.current) {
                    gsap.set(scrollContainerRef2.current, {
                        x: -finalOffset2 + viewportOffset * 2,
                    });
                }


                const tl = gsap.timeline({
                    scrollTrigger: {
                        trigger: containerRef.current,
                        start: "top top",
                        end: () => `+=${scrollDistance}`,
                        scrub: 1,
                        pin: true,
                    },
                });

                tl.fromTo(
                    scrollContainerRef.current,
                    { x: viewportOffset },
                    { x: -finalOffset1 + viewportOffset, ease: "none", duration: 1 },
                    0
                ).to({}, { duration: 0.2 }); // Hold for a bit

                if (scrollContainerRef2.current) {
                    gsap.timeline({
                        scrollTrigger: {
                            trigger: containerRef.current,
                            start: "top top",
                            end: () => `+=${scrollDistance}`,
                            scrub: 1,
                        },
                    })
                        .to(scrollContainerRef2.current, { x: viewportOffset, ease: "none" });
                }


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
                const allCards = [...cardRefs.current, ...cardRefs2.current];
                allCards.forEach((card, index) => {
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
    }, [isDesktop, maxScrollHeight, scrollContainerRef, scrollContainerRef2, containerRef, progressBarRef, cardRefs, cardRefs2]);
};

// --- Component Definition ---
const ScrollCarousel = forwardRef(
    ({ features, className, maxScrollHeight = 3000, ...props }, ref) => {
        const containerRef = useRef(null);
        const scrollContainerRef = useRef(null);
        const scrollContainerRef2 = useRef(null);
        const progressBarRef = useRef(null);
        const cardRefs = useRef([]);
        const cardRefs2 = useRef([]);
        const [isDesktop, setIsDesktop] = useState(false);

        // Split features into two rows for visual interest if we have enough
        // For now, simpler implementation: just one row if not enough items
        // The original code had two rows. I will keep it but maybe duplicate data if needed or just split.
        // If we only have 5 projects, maybe 1 row is better. 
        // BUT the animation logic relies on scrollContainerRef2 being there for the second row effects.
        // Let's create a secondary randomized set for the 'background' row or just duplications?
        // "The second row of cards -> dynamic sorting".
        // I'll take features and shuffle them for the second row.
        const features2 = [...features].sort(() => Math.random() - 0.5);

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
            scrollContainerRef2,
            progressBarRef,
            cardRefs,
            cardRefs2,
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
                                <h3 className="feature-title">
                                    {feature.title}
                                </h3>
                                <p className="feature-desc">
                                    {feature.description}
                                </p>
                                <div className="feature-actions">
                                    {feature.link && (
                                        <a href={feature.link} target="_blank" rel="noreferrer" className="video-btn">
                                            <Github size={18} />
                                            Code
                                        </a>
                                    )}
                                    {feature.demoLink && (
                                        <a href={feature.demoLink} target="_blank" rel="noreferrer" className="video-btn">
                                            <ExternalLink size={18} />
                                            Live Demo
                                        </a>
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

                    {/* Row 2 (Desktop only usually, or handled by CSS) */}
                    <div
                        ref={scrollContainerRef2}
                        className="scroll-row hidden-mobile"
                    >
                        {renderFeatureCards(features2, cardRefs2)}
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
