import React from "react";
import "../css/Footer.css";
import { FaInstagram, FaFacebook } from "react-icons/fa";

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-links">
                <a href="#">Pedidos telefónicos</a>
                <a href="#">Ubicación</a>
                <a href="#">Blog</a>
            </div>
            <div className="footer-socials">
                <FaInstagram className="social-icon" />
                <FaFacebook className="social-icon" />
            </div>
            <p className="footer-text">© 2025 PetalArt - Todos los derechos reservados</p>
        </footer>
    );
};

export default Footer;
