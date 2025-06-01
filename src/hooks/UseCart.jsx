import { useEffect, useState } from "react";
import LOCALSERVERBASEURL from "@/Configuration/ConectionConfig.js";

export const useCart = () => {
    // 1) Sólo leemos el objeto “user” y el token (no necesitamos userId explícito)
    const storedUser = localStorage.getItem("user");
    const userObj = storedUser ? JSON.parse(storedUser) : null;
    const token = localStorage.getItem("token");
    const isLoggedIn = !!userObj && !!token;

    const [cart, setCart] = useState({ items: [], totalPrice: 0 });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Construye las cabeceras de autorización con el token más reciente
    const getAuthHeaders = () => ({
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
    });

    // Suma total local para invitados
    const calcularTotal = (items) =>
        items.reduce((total, item) => total + item.quantity * item.price, 0);

    // 2) loadCart: obtiene el carrito del backend (si está logueado) o de localStorage (invitado)
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

    // 3) useEffect: carga inicial y añade listener para “cart-updated”
    useEffect(() => {
        loadCart();

        const handleCartUpdate = () => {
            setLoading(true);
            loadCart();
        };

        window.addEventListener("cart-updated", handleCartUpdate);
        return () => window.removeEventListener("cart-updated", handleCartUpdate);
    }, [isLoggedIn]);

    // 4) addToCart: añade al carrito y dispara “cart-updated”
    const addToCart = async (product, quantity) => {
        try {
            if (isLoggedIn) {
                const res = await fetch(`${LOCALSERVERBASEURL}/cart/add`, {
                    method: "POST",
                    headers: getAuthHeaders(),
                    body: JSON.stringify({
                        productId: product.id,
                        quantity,
                    }),
                });
                if (!res.ok) throw new Error("Error al agregar al carrito");
                const updated = await res.json();
                setCart(updated);

                // ➡️ Dispara recarga del carrito en segundo plano
                window.dispatchEvent(new Event("cart-updated"));
            } else {
                // Carrito de invitado en localStorage
                const stored = JSON.parse(localStorage.getItem("cart")) || [];
                const existing = stored.find((i) => i.productId === product.id);
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

                // ➡️ Notifica recarga local
                window.dispatchEvent(new Event("cart-updated"));
            }
        } catch (err) {
            setError(err);
        }
    };

    // 5) updateQuantity: actualiza cantidad y dispara “cart-updated”
    const updateQuantity = async (productId, quantity) => {
        try {
            if (!isLoggedIn) {
                const stored = JSON.parse(localStorage.getItem("cart")) || [];
                const existing = stored.find((i) => i.productId === productId);
                if (existing) existing.quantity = quantity;
                localStorage.setItem("cart", JSON.stringify(stored));
                setCart({ items: stored, totalPrice: calcularTotal(stored) });

                window.dispatchEvent(new Event("cart-updated"));
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

            window.dispatchEvent(new Event("cart-updated"));
        } catch (err) {
            setError(err);
        }
    };

    // 6) removeFromCart: elimina ítem y dispara “cart-updated”
    const removeFromCart = async (productId) => {
        try {
            if (!isLoggedIn) {
                const stored = JSON.parse(localStorage.getItem("cart")) || [];
                const updatedList = stored.filter((i) => i.productId !== productId);
                localStorage.setItem("cart", JSON.stringify(updatedList));
                setCart({ items: updatedList, totalPrice: calcularTotal(updatedList) });

                window.dispatchEvent(new Event("cart-updated"));
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

            window.dispatchEvent(new Event("cart-updated"));
        } catch (err) {
            setError(err);
        }
    };

    // 7) clearCart: vacía carrito invitado o hace DELETE en backend, luego dispara “cart-updated”
    const clearCart = async () => {
        try {
            if (!isLoggedIn) {
                localStorage.removeItem("cart");
                setCart({ items: [], totalPrice: 0 });

                window.dispatchEvent(new Event("cart-updated"));
                return;
            }

            // Ahora la ruta es sólo /cart/clear (sin path param)
            const res = await fetch(`${LOCALSERVERBASEURL}/cart/clear`, {
                method: "DELETE",
                headers: getAuthHeaders(),
            });
            if (!res.ok) throw new Error("Error al vaciar el carrito");
            const updated = await res.json();
            setCart(updated);

            window.dispatchEvent(new Event("cart-updated"));
        } catch (err) {
            setError(err);
        }
    };

    return {
        cart,
        loading,
        error,
        isLoggedIn,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
    };
};