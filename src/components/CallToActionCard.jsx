import React from "react";
import "./CallToActionCard.css"; // El CSS lo haremos luego

export default function CallToActionCard({ imageSrc, title, subtitle, link }) {
    return (
        <a href={link} className="cta-card">
            <div className="cta-image-wrapper">
                <img src={imageSrc} alt={title} className="cta-image" />
                <div className="cta-overlay" />
            </div>
            <div className="cta-content">
                <h2 className="cta-title">{title}</h2>
                <p className="cta-subtitle">{subtitle}</p>
            </div>
        </a>
    );
}