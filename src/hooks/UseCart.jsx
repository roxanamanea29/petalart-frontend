import {useEffect, useState} from "react";

export const useCart = () => {
    const [cart, setCart] = useState({items: [], totalPrice: 0});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const userId = localStorage.getItem("userId");
    const token = localStorage.getItem("token");

    const isLoggedIn = !!userId && !!token;

    const authHeaders = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
    };

    // Calcular el total del carrito
    const calcularTotal = (items) => {
        return items.reduce((total, item) => {
            return total + item.quantity * item.price;
        }, 0);
    };

    // Cargar carrito al montar el componente
    useEffect(() => {
        if (userId) {
            console.log("Renderizado CartView");

            fetch(`http://localhost:8080/cart/user/${userId}`)

                .then((response) => {
                    if (!response.ok) {
                        throw new Error("Error al cargar el carrito");
                    }
                    return response.json();
                })
                .then((data) => {
                    setCart(data);
                    setLoading(false);
                })
                .catch((error) => {
                    setError(error);
                    setLoading(false);
                });
        } else {
            {/* Si no hay userId, cargar carrito de localStorage */
            }
            const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
            console.log("📦 Carrito desde localStorage:", storedCart); // 👈 si es modo invitado
            setCart({items: storedCart, totalPrice: calcularTotal(storedCart)});
            setLoading(false);
        }
    }, [userId]);

    // Añadir producto al carrito
    const addToCart = async (product, quantity) => {
        try {
            if (isLoggedIn) {
                const respuesta = await fetch(`http://localhost:8080/cart/add`, {
                    method: "POST",
                    headers: authHeaders,
                    body: JSON.stringify({userId, productId: product.id, quantity}),
                });
                if (!respuesta.ok) {
                    throw new Error("Error al agregar al carrito");
                }
                const updatedCart = await respuesta.json();
                setCart(updatedCart);
            } else {

                // Carrito en localStorage
                const stored = JSON.parse(localStorage.getItem("cart")) || [];
                const existing = stored.find((item) => item.productId === product.id);

                if (existing) {
                    existing.quantity += quantity;
                } else {
                    stored.push({
                        productId: product.id,
                        productName: product.name,
                        description: product.description,
                        price: product.price,
                        quantity,
                        imageUrl: product.imageUrl
                    });
                }
                localStorage.setItem("cart", JSON.stringify(stored));
                console.log("Producto añadido al carrito.");
                setCart({items: stored, totalPrice: calcularTotal(stored)});
            }
        } catch (error) {
            setError(error);
        }
    };

    // Actualizar cantidad de un producto
    const updateQuantity = async (productId, quantity) => {
        try {
            {/* Carrito en localStorage - usuario invitado - actualiza el localstorage*/
            }
            if (!isLoggedIn) {
                const stored = JSON.parse(localStorage.getItem("cart")) || [];
                const existing = stored.find((item) => item.productId === productId);
                if (existing) {
                    existing.quantity = quantity;
                }
                localStorage.setItem("cart", JSON.stringify(stored));
                setCart({items: stored, totalPrice: calcularTotal(stored)});
                return;
            }
            // 🔐 Usuario autenticado - actualiza el servidor
            console.log(" Enviando a backend updateQuantity:", { productId, quantity });
            console.log(" Con headers:", authHeaders);

            const respuesta = await fetch(
                `http://localhost:8080/cart/update`, {
                    method: "PUT",
                    headers: authHeaders,
                    body: JSON.stringify({productId, quantity}),
                });
            if (!respuesta.ok) {
                throw new Error("Error al actualizar la cantidad");
            }
            const updatedCart = await respuesta.json();
            setCart(updatedCart);
            console.log("Cantidad actualizada en el servidor");
        } catch (error) {
            console.error("Error al actualizar la cantidad:", error);
            setError(error);
        }
    };

    // Eliminar producto
    const removeFromCart = async (productId) => {
        try {
            if (!isLoggedIn) {
                {/* Carrito en localStorage - usuario no logueado -borra del localstorage*/
                }
                const stored = JSON.parse(localStorage.getItem("cart")) || [];
                const updatedCart = stored.filter((item) => item.productId !== productId);
                localStorage.setItem("cart", JSON.stringify(updatedCart));
                setCart({items: updatedCart, totalPrice: calcularTotal(updatedCart)});
                return;
            }
            {/* Carrito en el servidor - usuario autenticado - borra del servidor*/
            }
            const respuesta = await fetch(
                `http://localhost:8080/cart/update`,
                {
                    method: "PUT",
                    headers: authHeaders,
                    body: JSON.stringify({productId, quantity: 0}),
                });
            if (!respuesta.ok) {

                throw new Error("Error al eliminar del carrito");
            }
            const updatedCart = await respuesta.json();
            {
                console.log("Producto eliminado del carrito", updatedCart);
            }
            setCart(updatedCart);
        } catch (error) {
            setError(error);
        }
    };

    // Vaciar carrito
    const clearCart = async () => {
        try {
            if (!isLoggedIn) {
                {/* Carrito en localStorage - usuario invitado - borra del localstorage*/
                }
                localStorage.removeItem("cart");
                setCart({items: [], totalPrice: 0});
                return;
            }
            {/* Carrito en el servidor - usuario autenticado - borra del servidor*/
            }
            const respuesta = await fetch(
                `http://localhost:8080/cart/clear/${userId}`,
                {
                    method: "DELETE",
                    headers: authHeaders,
                }
            );
            if (!respuesta.ok) {
                throw new Error("Error al vaciar el carrito");
            }
            const updatedCart = await respuesta.json();
            setCart(updatedCart);
        } catch (error) {
            setError(error);
        }
    };

    return {
        cart,
        loading,
        error,
        isLoggedIn,
        authHeaders,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
    };
};