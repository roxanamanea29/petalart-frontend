import { useParams } from "react-router-dom";//se utiliza para obtener el id de la categoría de la URL
import { useEffect, useState } from "react";//se utiliza para manejar el estado en el componente de productos y categorías
import axios from "axios";//se utiliza para realizar solicitudes HTTP
import CategoryCard from "../components/CategoryCard";//se utiliza para mostrar la tarjeta de categoría
import NavbarH from "@/components/NavbarH.jsx"; // se utiliza para mostrar la barra de navegación


const CategoryProducts = () => {//se define el componente CategoryProducts que se renderiza cuando visitas /categorias/:id.

    const { id } = useParams();//se obtiene el id de la categoría de la URL
    const [products, setProducts] = useState([]);//se define el estado para almacenar los productos
    const [categoryName, setCategoryName] = useState("");//se define el estado para almacenar el nombre de la categoría para mostrarlo arriba de los productos

    useEffect(() => {//se utiliza para realizar efectos secundarios en el componente
        axios.get(`http://localhost:8080/categories/${id}`)//se realiza una solicitud HTTP para obtener la categoría por id al backend y se almacena en el estado categoryName
            .then(res => setCategoryName(res.data.categoryName))//
            .catch(err => console.error("Error cargando categoría:", err));

        axios.get(`http://localhost:8080/products/by-category/${id}`)////se realiza una solicitud HTTP para obtener los productos por id de categoría al backend y se almacena en el estado products
            .then(res => setProducts(res.data))
            .catch(err => console.error("Error cargando productos:", err));
    }, [id]);

    return (
        <>
        <NavbarH />
        <section className="p-6">
            <h1 className="text-2xl font-bold mb-4">Productos de {categoryName}</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {products.map((prod) => (
                    <CategoryCard
                        key={prod.id}
                        title={prod.name}
                        description={prod.description}
                        imageSrc={prod.imageUrl || "/placeholder.svg"}
                        href={`/producto/${prod.id}`} // o "#" si aún no hay página de producto
                    />
                ))}
            </div>
        </section>
        </>
    );
};

export default CategoryProducts;