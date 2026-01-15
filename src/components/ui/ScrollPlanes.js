import { useEffect, useRef, useState, useLayoutEffect, useMemo, useCallback } from 'react';
import { Github, ExternalLink, X } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ShineButton from './ShineButton';
import './ScrollPlanes.css';

gsap.registerPlugin(ScrollTrigger);

const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789$#@%&';

function MatrixText({ text, active }) {
    const [displayText, setDisplayText] = useState(text);
    const intervalRef = useRef(null);

    useEffect(() => {
        if (!active) {
            setDisplayText(text);
            return;
        }

        let iteration = 0;
        if (intervalRef.current) clearInterval(intervalRef.current);

        intervalRef.current = setInterval(() => {
            setDisplayText(
                text
                    .split('')
                    .map((letter, index) => {
                        if (index < iteration) {
                            return text[index];
                        }
                        return CHARS[Math.floor(Math.random() * CHARS.length)];
                    })
                    .join('')
            );

            if (iteration >= text.length) {
                if (intervalRef.current) clearInterval(intervalRef.current);
            }

            iteration += 1 / 2;
        }, 30);

        return () => {
            if (intervalRef.current) clearInterval(intervalRef.current);
        };
    }, [active, text]);

    return <span className="scroll-planes-matrix-text">{displayText}</span>;
}

export default function ScrollPlanes({ projects = [], id, loops = 2 }) {
    const containerRef = useRef(null);
    const planesRef = useRef([]);
    const [hoveredIndex, setHoveredIndex] = useState(null);
    const [activeImage, setActiveImage] = useState(null);
    const activeImageRef = useRef(null);
    const scrollProgressRef = useRef(0);

    // Configuration
    const spacing = 390;
    // slightly reduced fade distances to ensure the loop is seamless with only 2 sets
    const fadeStart = 1500;
    const fadeEnd = 2400;
    const baseWaveHeight = 180;
    const velocityMultiplier = 12;

    // --- FIX: FORCE EXACTLY 2 COPIES ---
    // Instead of calculating based on width, we just create two sets.
    // This gives you the "Infinity Scroll" effect: Original Set + Buffer Set
    const displayProjects = useMemo(() => {
        if (projects.length === 0) return [];
        return [...projects, ...projects];
    }, [projects]);

    const totalWidth = displayProjects.length * spacing;
    const halfWidth = totalWidth / 2;

    const velocityState = useRef({
        lastProgress: 0,
        velocity: 0,
    });

    const updateCards = useCallback((progress) => {
        const totalScrollDistance = totalWidth * loops;
        const currentScroll = progress * totalScrollDistance;

        const vs = velocityState.current;
        const instantVelocity = (progress - vs.lastProgress) * totalScrollDistance;
        vs.velocity += (instantVelocity - vs.velocity) * 0.3;
        vs.lastProgress = progress;
        const waveIntensity = vs.velocity * 0.1;

        planesRef.current.forEach((plane, index) => {
            if (!plane) return;

            let offset = index * spacing - currentScroll;

            // --- INFINITE LOOP LOGIC ---
            while (offset < -halfWidth) offset += totalWidth;
            while (offset > halfWidth) offset -= totalWidth;

            // --- PHYSICS & POSITION ---
            const baseAngle = -55 * (Math.PI / 180);
            let x = offset * Math.cos(baseAngle);
            let z = offset * Math.sin(baseAngle);
            let y = -offset * 0.17;

            let targetRotateY = -50;

            // --- WAVE ---
            const sigma = 700;
            const normalizedOffset = offset / sigma;
            const t2 = normalizedOffset * normalizedOffset;
            let waveShape = (1 - t2) * Math.exp(-t2 / 2);

            const currentWaveHeight = baseWaveHeight + (Math.abs(waveIntensity) * velocityMultiplier);
            y -= waveShape * currentWaveHeight;

            // --- VISIBILITY & FADING ---
            const dist = Math.abs(offset);
            let opacity = 1;

            if (dist > fadeStart) {
                opacity = 1 - (dist - fadeStart) / (fadeEnd - fadeStart);
                opacity = Math.max(0, Math.min(1, opacity));
            }

            // --- APPLY STYLES ---
            const currentActiveImage = activeImageRef.current;
            if (currentActiveImage === index) {
                plane.style.transform = `translate3d(0px, 0px, 500px) rotateY(0deg)`;
                plane.style.zIndex = '100000';
                plane.style.opacity = '1';
                plane.style.filter = 'none';
                plane.style.display = 'flex';
            } else {
                plane.style.transform = `translate3d(${x}px, ${y}px, ${z}px) rotateY(${targetRotateY}deg)`;

                const zIndex = Math.max(0, Math.floor(10000 - dist));
                plane.style.zIndex = zIndex.toString();

                if (currentActiveImage !== null) {
                    plane.style.opacity = (opacity * 0.3).toString();
                    plane.style.filter = 'blur(10px) brightness(40%)';
                } else {
                    plane.style.opacity = opacity.toString();
                    plane.style.filter = 'none';
                }

                plane.style.display = opacity <= 0.01 ? 'none' : 'flex';
            }
        });
    }, [totalWidth, halfWidth, loops, spacing, fadeStart, fadeEnd, baseWaveHeight, velocityMultiplier]);

    useLayoutEffect(() => {
        if (!containerRef.current || displayProjects.length === 0) return;

        planesRef.current = planesRef.current.slice(0, displayProjects.length);

        // Ensure we only scroll through the length of the display projects (minus one buffer)
        // This keeps the scroll shorter and tighter
        const scrollDistance = spacing * displayProjects.length;

        const ctx = gsap.context(() => {
            ScrollTrigger.create({
                trigger: containerRef.current,
                start: 'top top',
                end: `+=${scrollDistance}`,
                pin: true,
                scrub: 1,
                onUpdate: (self) => {
                    scrollProgressRef.current = self.progress;
                    updateCards(self.progress);
                },
            });
        }, containerRef);

        updateCards(0);

        return () => {
            ctx.revert();
        };
    }, [displayProjects, loops, updateCards, spacing]);

    const closeOverlay = () => setActiveImage(null);

    useEffect(() => {
        activeImageRef.current = activeImage;
        updateCards(scrollProgressRef.current);

        if (activeImage !== null) {
            document.body.classList.add('project-overlay-active');
        } else {
            document.body.classList.remove('project-overlay-active');
        }

        return () => {
            document.body.classList.remove('project-overlay-active');
        };
    }, [activeImage, updateCards]);

    useEffect(() => {
        const handleEsc = (e) => {
            if (e.key === 'Escape') closeOverlay();
        };
        window.addEventListener('keydown', handleEsc);
        return () => window.removeEventListener('keydown', handleEsc);
    }, []);

    const getProjectData = (index) => {
        if (index === null) return null;
        const originalIndex = index % projects.length;
        return projects[originalIndex];
    };

    const activeProject = getProjectData(activeImage);

    return (
        <div
            id={id}
            ref={containerRef}
            className="scroll-planes-container"
        >
            <div className={`scroll-planes-title ${activeImage !== null ? 'scroll-planes-hidden' : ''}`}>
                <div className="scroll-planes-title-line1">FRONTEND</div>
                <div className="scroll-planes-title-line2">
                    PROJECTS
                    <sup className="scroll-planes-title-sup">
                        ({projects.length})
                    </sup>
                </div>
            </div>

            <div className={`scroll-planes-indicator ${activeImage !== null ? 'scroll-planes-hidden' : ''}`}>
                scroll to explore
            </div>

            <div className="scroll-planes-perspective">
                <div className="scroll-planes-3d-wrapper">
                    {displayProjects.map((item, index) => {
                        const visualIndex = (index % projects.length) + 1;

                        return (
                            <div
                                key={index}
                                ref={(el) => { planesRef.current[index] = el; }}
                                className="scroll-planes-card"
                                onClick={() => setActiveImage(index)}
                                onMouseEnter={() => setHoveredIndex(index)}
                                onMouseLeave={() => setHoveredIndex(null)}
                            >
                                <div className="scroll-planes-card-inner">
                                    <img
                                        src={typeof item.image === 'string' ? item.image : item.image}
                                        alt={item.title}
                                        className={`scroll-planes-card-img ${hoveredIndex === index ? 'scroll-planes-card-img-hovered' : ''}`}
                                        loading="eager"
                                    />
                                    <div className={`scroll-planes-card-label ${hoveredIndex === index && activeImage === null ? 'scroll-planes-card-label-visible' : ''}`}>
                                        <div className="scroll-planes-card-label-text">
                                            <MatrixText text={item.title.toUpperCase()} active={hoveredIndex === index} />
                                        </div>
                                    </div>
                                </div>

                                <div className="scroll-planes-card-index">
                                    {String(visualIndex).padStart(2, '0')}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            {activeImage !== null && activeProject && (
                <div className="scroll-planes-overlay">
                    <div className="scroll-planes-overlay-bg" onClick={closeOverlay} />

                    <div className="scroll-planes-overlay-content">
                        <h2 className="scroll-planes-overlay-title">
                            {activeProject.title}
                        </h2>
                        <p className="scroll-planes-overlay-desc">
                            {activeProject.description}
                        </p>
                        <div className="scroll-planes-overlay-meta">
                            <span>Project {String((activeImage % projects.length) + 1).padStart(2, '0')}</span>
                            <span className="scroll-planes-overlay-divider" />
                            <span>Frontend Collection</span>
                        </div>
                        <div className="scroll-planes-overlay-actions">
                            {activeProject.link && (
                                <ShineButton
                                    label="Code"
                                    size="md"
                                    bgColor="linear-gradient(325deg, hsl(217 100% 56%) 0%, hsl(194 100% 69%) 55%, hsl(217 100% 56%) 90%)"
                                    className="project-action-btn"
                                    onClick={() => window.open(activeProject.link, '_blank', 'noopener,noreferrer')}
                                >
                                    <Github size={18} style={{ marginRight: '0.5rem' }} />
                                    Code
                                </ShineButton>
                            )}
                            {activeProject.demoLink && (
                                <ShineButton
                                    label="Live Demo"
                                    size="md"
                                    bgColor="linear-gradient(325deg, hsl(217 100% 56%) 0%, hsl(194 100% 69%) 55%, hsl(217 100% 56%) 90%)"
                                    className="project-action-btn"
                                    onClick={() => window.open(activeProject.demoLink, '_blank', 'noopener,noreferrer')}
                                >
                                    <ExternalLink size={18} style={{ marginRight: '0.5rem' }} />
                                    Live Demo
                                </ShineButton>
                            )}
                        </div>
                    </div>

                    <button
                        onClick={closeOverlay}
                        className="scroll-planes-close-btn"
                    >
                        <X size={32} strokeWidth={1.5} />
                    </button>
                </div>
            )}
        </div>
    );
}
