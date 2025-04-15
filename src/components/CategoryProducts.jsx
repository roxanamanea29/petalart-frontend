import { Link } from "react-router-dom";
import Card from "react-bootstrap/Card";

export default function ProductCard({ title, description, imageSrc, href }) {
    return (
        <section className="grid [grid-template-columns:repeat(auto-fit,minmax(400px,1fr))] gap-6">
            <Link
                to={href}
                className="block w-full h-[650px] relative overflow-hidden group shadow-lg rounded-lg"
            >
                <img
                    src={imageSrc}
                    alt={title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center text-white text-center px-5">
                    <h2 className="text-xl font-bold mb-2">{title}</h2>
                    <p className="text-sm">{description}</p>
                </div>
            </Link>
        </section>
    );
}