import { useEffect, useState } from "react";

export const useCart = () => {
    const [cart, setCart] = useState({ items: [], totalPrice: 0 });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const userId = localStorage.getItem("userId");

    // Calcular el total del carrito
    const calcularTotal = (items) => {
        return items.reduce((total, item) => {
            return total + item.quantity * item.price;
        }, 0);
    };

    // Cargar carrito al montar el componente
    useEffect(() => {
        if (userId) {
            console.log("🧠 Renderizando CartView");

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
            {/* Si no hay userId, cargar carrito de localStorage */}
            const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
            console.log("📦 Carrito desde localStorage:", storedCart); // 👈 si es modo invitado
            setCart({ items: storedCart, totalPrice: calcularTotal(storedCart) });
            setLoading(false);
        }
    }, [userId]);

    // Añadir producto al carrito
    const addToCart = async (product, quantity) => {
        try {
            if (userId) {
                const respuesta = await fetch(`http://localhost:8080/cart/add`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({userId, productId: product.id, quantity }),
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
                setCart({ items: stored, totalPrice:calcularTotal(stored)});
            }
        } catch (error) {
            setError(error);
        }
    };

    // Actualizar cantidad de un producto
    const updateQuantity = async (productId, quantity) => {
        try {
            if(!userId) {
                {/* Carrito en localStorage - usuario invitado - actualiza el localstorage*/}
                const stored = JSON.parse(localStorage.getItem("cart")) || [];
                const existing = stored.find((item) => item.productId === productId);

                if (existing) {
                    existing.quantity = quantity;
                }
                localStorage.setItem("cart", JSON.stringify(stored));
                setCart({ items: stored, totalPrice: calcularTotal(stored) });
                return;
            }
            {/* Carrito en el servidor - usuario autenticado - actualiza el servidor*/}
            const respuesta = await fetch(
                `http://localhost:8080/cart/update/${userId}/${productId}/${quantity}`,
                {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ userId, productId, quantity }),
                }
            );
            if (!respuesta.ok) {
                throw new Error("Error al actualizar la cantidad");
            }
            const updatedCart = await respuesta.json();
            setCart(updatedCart);
            console.log("updatedCart");
        } catch (error) {
            setError(error);
        }
    };

    // Eliminar producto
    const removeFromCart = async (productId) => {
        try {
            if(!userId) {
                {/* Carrito en localStorage - usuario invitado -borra del localstorage*/}
                const stored = JSON.parse(localStorage.getItem("cart")) || [];
                const updatedCart = stored.filter((item) => item.productId !== productId);
                localStorage.setItem("cart", JSON.stringify(updatedCart));
                setCart({ items: updatedCart, totalPrice: calcularTotal(updatedCart) });
                return;
            }
            {/* Carrito en el servidor - usuario autenticado - borra del servidor*/}
            const respuesta = await fetch(
                `http://localhost:8080/cart/remove/${userId}/${productId}`,
                {
                    method: "DELETE",
                }
            );
            if (!respuesta.ok) {

                throw new Error("Error al eliminar del carrito");
            }
            const updatedCart = await respuesta.json();
            {console.log("updatedCart")}
            setCart(updatedCart);
        } catch (error) {
            setError(error);
        }
    };

    // Vaciar carrito
    const clearCart = async () => {
        try {
            if(!userId) {
                {/* Carrito en localStorage - usuario invitado - borra del localstorage*/}
                localStorage.removeItem("cart");
                setCart({ items: [], totalPrice: 0 });
                return;
            }
            {/* Carrito en el servidor - usuario autenticado - borra del servidor*/}
            const respuesta = await fetch(
                `http://localhost:8080/cart/clear/${userId}`,
                {
                    method: "DELETE",
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
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
    };
};