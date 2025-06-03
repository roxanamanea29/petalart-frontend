import React from "react";
import { useNavigate } from "react-router-dom";

export default function Banner_gallery() {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate("/");
    };

    return (
        <div className="w-full max-w-7xl mx-auto mt-12 px-4 overflow-x-hidden">
            {/* Contenedor relativo para posicionar bien el overlay */}
            <div className="relative w-full aspect-video">
                {/* iframe del banner */}
                <iframe
                    src="/banner_html/index.html"
                    title="Banner Gallery petalArt"
                    className="w-full h-full border-none"
                    style={{ border: "none" }}
                />
                {/*  overlay semi-transparente para ver la zona cliqueable*/}
                <div
                    className="absolute inset-0 z-10 cursor-pointer"
                    onClick={handleClick}
                />
            </div>
        </div>
    );
}