"use client";

import React, { useEffect, useRef, useState } from 'react';

export const GlowingCard = ({
    children,
    className,
    glowColor = "#3b82f6",
    style = {},
    ...props
}) => {
    return (
        <div
            style={{
                minWidth: '14rem',
                padding: '1.5rem',
                borderRadius: '1rem',
                color: 'white',
                backgroundColor: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(255,255,255,0.1)',
                transition: 'all 0.4s ease-out',
                flex: 1,
                position: 'relative',
                ...style,
            }}
            data-glow-color={glowColor}
            {...props}
        >
            {children}
        </div>
    );
};

export const GlowingCards = ({
    children,
    className,
    enableGlow = true,
    glowRadius = 300,
    glowOpacity = 1,
    animationDuration = 400,
    gap = "2rem",
    maxWidth = "75rem",
    padding = "2rem 1rem",
}) => {
    const containerRef = useRef(null);
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
    const [isHovering, setIsHovering] = useState(false);

    useEffect(() => {
        const container = containerRef.current;
        if (!container || !enableGlow) return;

        const handleMouseMove = (e) => {
            const rect = container.getBoundingClientRect();
            setMousePos({
                x: e.clientX - rect.left,
                y: e.clientY - rect.top,
            });
            setIsHovering(true);
        };

        const handleMouseLeave = () => {
            setIsHovering(false);
        };

        container.addEventListener('mousemove', handleMouseMove);
        container.addEventListener('mouseleave', handleMouseLeave);

        return () => {
            container.removeEventListener('mousemove', handleMouseMove);
            container.removeEventListener('mouseleave', handleMouseLeave);
        };
    }, [enableGlow]);

    return (
        <div style={{ position: 'relative', width: '100%' }}>
            <div
                ref={containerRef}
                style={{
                    position: 'relative',
                    maxWidth: maxWidth,
                    margin: '0 auto',
                    padding: padding,
                }}
            >
                {/* Main cards layer */}
                <div
                    style={{
                        display: 'flex',
                        alignItems: 'stretch',
                        justifyContent: 'center',
                        flexWrap: 'wrap',
                        gap: gap,
                    }}
                >
                    {children}
                </div>

                {/* Glow overlay layer */}
                {enableGlow && (
                    <div
                        style={{
                            position: 'absolute',
                            inset: 0,
                            pointerEvents: 'none',
                            userSelect: 'none',
                            opacity: isHovering ? glowOpacity : 0,
                            transition: `opacity ${animationDuration}ms ease-out`,
                            WebkitMaskImage: `radial-gradient(${glowRadius}px ${glowRadius}px at ${mousePos.x}px ${mousePos.y}px, black 1%, transparent 50%)`,
                            maskImage: `radial-gradient(${glowRadius}px ${glowRadius}px at ${mousePos.x}px ${mousePos.y}px, black 1%, transparent 50%)`,
                        }}
                    >
                        <div
                            style={{
                                display: 'flex',
                                alignItems: 'stretch',
                                justifyContent: 'center',
                                flexWrap: 'wrap',
                                gap: gap,
                                padding: padding,
                            }}
                        >
                            {React.Children.map(children, (child) => {
                                if (React.isValidElement(child) && child.type === GlowingCard) {
                                    const cardGlowColor = child.props.glowColor || "#3b82f6";
                                    return React.cloneElement(child, {
                                        style: {
                                            ...child.props.style,
                                            backgroundColor: cardGlowColor + "25",
                                            border: `1px solid ${cardGlowColor}`,
                                            boxShadow: `0 0 20px ${cardGlowColor}40, inset 0 0 0 1px ${cardGlowColor}`,
                                        },
                                    });
                                }
                                return child;
                            })}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default GlowingCards;
