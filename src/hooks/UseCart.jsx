import { useEffect, useState } from "react";
import LOCALSERVERBASEURL from "@/Configuration/ConectionConfig.js";

export const useCart = () => {
    const [cart, setCart] = useState({ items: [], totalPrice: 0 });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const userId = localStorage.getItem("userId");
    const token = localStorage.getItem("token");
    const isLoggedIn = !!userId && !!token;

    const getAuthHeaders = () => ({
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
    });

    const calcularTotal = (items) =>
        items.reduce((total, item) => total + item.quantity * item.price, 0);

    const loadCart = () => {
        if (isLoggedIn) {
            console.log("♻️ Cargando carrito del backend");
            fetch(`${LOCALSERVERBASEURL}/cart/my-cart`, {
                method: "GET",
                headers: getAuthHeaders(),
            })
                .then((res) => {
                    if (!res.ok) throw new Error("Error al cargar el carrito");
                    return res.json();
                })
                .then((data) => {
                    setCart(data);
                    setLoading(false);
                })
                .catch((err) => {
                    console.error("❌ Error al cargar carrito autenticado:", err);
                    setError(err);
                    setLoading(false);
                });
        } else {
            console.log("📦 Cargando carrito local");
            const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
            setCart({ items: storedCart, totalPrice: calcularTotal(storedCart) });
            setLoading(false);
        }
    };

    // 🔄 Cargar carrito al montar y al recibir el evento "cart-updated"
    useEffect(() => {
        loadCart();
        const handleCartUpdate = () => {
            setLoading(true);
            loadCart();
        };
        window.addEventListener("cart-updated", handleCartUpdate);
        return () => window.removeEventListener("cart-updated", handleCartUpdate);
    }, [isLoggedIn]);

    const addToCart = async (product, quantity) => {
        try {
            if (isLoggedIn) {
                const res = await fetch(`${LOCALSERVERBASEURL}/cart/add`, {
                    method: "POST",
                    headers: getAuthHeaders(),
                    body: JSON.stringify({ userId, productId: product.id, quantity }),
                });
                if (!res.ok) throw new Error("Error al agregar al carrito");
                const updated = await res.json();
                setCart(updated);
            } else {
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
                        imageUrl: product.imageUrl,
                    });
                }
                localStorage.setItem("cart", JSON.stringify(stored));
                setCart({ items: stored, totalPrice: calcularTotal(stored) });
            }
        } catch (err) {
            setError(err);
        }
    };

    const updateQuantity = async (productId, quantity) => {
        try {
            if (!isLoggedIn) {
                const stored = JSON.parse(localStorage.getItem("cart")) || [];
                const existing = stored.find((item) => item.productId === productId);
                if (existing) existing.quantity = quantity;
                localStorage.setItem("cart", JSON.stringify(stored));
                setCart({ items: stored, totalPrice: calcularTotal(stored) });
                return;
            }

            const res = await fetch(`${LOCALSERVERBASEURL}/cart/update`, {
                method: "PUT",
                headers: getAuthHeaders(),
                body: JSON.stringify({ productId, quantity }),
            });
            if (!res.ok) throw new Error("Error al actualizar la cantidad");
            const updated = await res.json();
            setCart(updated);
        } catch (err) {
            setError(err);
        }
    };

    const removeFromCart = async (productId) => {
        try {
            if (!isLoggedIn) {
                const stored = JSON.parse(localStorage.getItem("cart")) || [];
                const updated = stored.filter((item) => item.productId !== productId);
                localStorage.setItem("cart", JSON.stringify(updated));
                setCart({ items: updated, totalPrice: calcularTotal(updated) });
                return;
            }

            const res = await fetch(`${LOCALSERVERBASEURL}/cart/update`, {
                method: "PUT",
                headers: getAuthHeaders(),
                body: JSON.stringify({ productId, quantity: 0 }),
            });
            if (!res.ok) throw new Error("Error al eliminar del carrito");
            const updated = await res.json();
            setCart(updated);
        } catch (err) {
            setError(err);
        }
    };

    const clearCart = async () => {
        try {
            if (!isLoggedIn) {
                localStorage.removeItem("cart");
                setCart({ items: [], totalPrice: 0 });
                return;
            }

            const res = await fetch(`${LOCALSERVERBASEURL}/cart/clear/${userId}`, {
                method: "DELETE",
                headers: getAuthHeaders(),
            });
            if (!res.ok) throw new Error("Error al vaciar el carrito");
            const updated = await res.json();
            setCart(updated);
        } catch (err) {
            setError(err);
        }
    };

    return {
        cart,
        loading,
        error,
        isLoggedIn,
        getAuthHeaders,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
    };
};