import { useEffect, useState } from "react";
import LOCALSERVERBASEURL from "@/Configuration/ConectionConfig.js";

export const useProfile = () => {
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    //Hook que se encarga de obtener el perfil del usuario autenticado del backend
    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await fetch(`${LOCALSERVERBASEURL}/user/profile`, {
                    headers: {
                        "Authorization": `Bearer ${localStorage.getItem("token")}`
                    }
                });

                if (!response.ok) {
                    throw new Error(`Error: ${response.status} ${response.statusText}`);
                }

                const data = await response.json();
                setProfile(data);
            } catch (err) {
                console.error("Failed to fetch profile:", err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchProfile();
    }, []);

    return { profile, loading, error };
};