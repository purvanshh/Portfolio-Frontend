"use client";
import React from "react";
import { motion } from "framer-motion";

const RippleLoader = ({
    icon,
    size = 250,
    duration = 2,
    logoColor = "grey",
}) => {
    const baseInset = 40;
    const rippleBoxes = Array.from({ length: 5 }, (_, i) => ({
        inset: `${baseInset - i * 10}%`,
        zIndex: 99 - i,
        delay: i * 0.2,
        opacity: 1 - i * 0.2,
    }));

    return (
        <div
            style={{
                position: "relative",
                width: size,
                height: size,
            }}
        >
            {rippleBoxes.map((box, i) => (
                <motion.div
                    key={i}
                    style={{
                        position: "absolute",
                        borderRadius: "9999px",
                        borderTop: `1px solid rgba(100, 100, 100, ${box.opacity})`,
                        backdropFilter: "blur(5px)",
                        WebkitBackdropFilter: "blur(5px)",
                        top: box.inset,
                        left: box.inset,
                        right: box.inset,
                        bottom: box.inset,
                        zIndex: box.zIndex,
                        background:
                            "linear-gradient(0deg, rgba(50, 50, 50, 0.2), rgba(100, 100, 100, 0.2))",
                    }}
                    animate={{
                        scale: [1, 1.3, 1],
                        boxShadow: [
                            "rgba(0, 0, 0, 0.3) 0px 10px 10px 0px",
                            "rgba(0, 0, 0, 0.3) 0px 30px 20px 0px",
                            "rgba(0, 0, 0, 0.3) 0px 10px 10px 0px",
                        ],
                    }}
                    transition={{
                        repeat: Infinity,
                        duration,
                        delay: box.delay,
                        ease: "easeInOut",
                    }}
                />
            ))}

            <div
                style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    display: "grid",
                    placeContent: "center",
                    padding: "30%",
                }}
            >
                <motion.span
                    style={{ width: "100%", height: "100%" }}
                    animate={{ color: [logoColor, "#ffffff", logoColor] }}
                    transition={{
                        repeat: Infinity,
                        duration,
                        ease: "easeInOut",
                    }}
                >
                    <span
                        style={{
                            display: "inline-block",
                            width: "100%",
                            height: "100%",
                        }}
                    >
                        {icon &&
                            React.cloneElement(icon, {
                                style: {
                                    width: "100%",
                                    height: "100%",
                                    fill: "currentColor",
                                },
                            })}
                    </span>
                </motion.span>
            </div>
        </div>
    );
};

export default RippleLoader;
