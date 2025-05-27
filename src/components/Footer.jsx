import React from "react";
import "../css/Footer.css";
import { FaInstagram, FaFacebook } from "react-icons/fa";

const Footer = () => {
    return (
        <>
        <div className="footer h-[350px] bg-[#4B2C2C] flex flex-col items-center justify-center">
            <p className="text-3xl " style={{color:"white"}}>Síguenos</p>
            <div className="footer-socials">
                <FaInstagram size={40} className= "mt-5 social-icon " />
                <FaFacebook size={40}  className=" mt-5 social-icon" />
            </div>
            <div className="footer-links">
                <a href="#" className=" text-2xl ">Pedidos telefónicos</a>
                <a href="#" className="text-2xl " >Ubicación</a>
                <a href="https://petalart-blog.blogspot.com" className="text-2xl ">Blog</a>
            </div>
            <p className="mt-20 mb-5 sub-heading">© 2025 PetalArt - Todos los derechos reservados</p>
        </div>
        </>
    );
};

export default Footer;
