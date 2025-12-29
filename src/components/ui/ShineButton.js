import React from "react";
import "./ShineButton.css";

const sizeStyles = {
  sm: { padding: "0.5rem 1rem", fontSize: "0.875rem" },
  md: { padding: "0.6rem 1.4rem", fontSize: "1rem" },
  lg: { padding: "0.8rem 1.8rem", fontSize: "1.125rem" },
};

function ShineButton({
  label = "Shine now",
  children,
  onClick,
  className = "",
  size = "md",
  bgColor = "linear-gradient(325deg, hsl(217 100% 56%) 0%, hsl(194 100% 69%) 55%, hsl(217 100% 56%) 90%)",
  type = "button",
}) {
  const { padding, fontSize } = sizeStyles[size] || sizeStyles.md;

  const backgroundImage =
    typeof bgColor === "string" && bgColor.startsWith("linear-gradient")
      ? bgColor
      : `linear-gradient(to right, ${bgColor}, ${bgColor})`;

  const content = children || label;

  return (
    <button
      type={type}
      onClick={onClick}
      className={`shine-button ${className}`}
      style={{
        backgroundImage,
        fontSize,
        padding,
      }}
    >
      <span className="shine-button__label">{content}</span>
      <span className="shine-button__shine" />
    </button>
  );
}

export default ShineButton;


