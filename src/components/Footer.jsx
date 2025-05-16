import React from "react";
import "../css/Footer.css";
import { FaInstagram, FaFacebook } from "react-icons/fa";

const Footer = () => {
    return (
        <div className="footer">
            <p className="sub-heading" style={{color:"white"}}>Síguenos</p>
            <div className="footer-socials">
                <FaInstagram className="social-icon" />
                <FaFacebook className="social-icon" />
            </div>
            <div className="footer-links">
                <a href="#" className="sub-heading">Pedidos telefónicos</a>
                <a href="#" className="sub-heading" >Ubicación</a>
                <a href="https://petalart-blog.blogspot.com" className="sub-heading">Blog</a>
            </div>
            <p className="sub-heading">© 2025 PetalArt - Todos los derechos reservados</p>
        </div>
    );
};

export default Footer;
