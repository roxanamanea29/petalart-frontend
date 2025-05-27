import { useEffect, useState } from "react";
import LOCALSERVERBASEURL from "@/Configuration/ConectionConfig.js";

export const useProfile = () => {
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProfile = async () => {
            const token = localStorage.getItem("token");
            if (!token) {
                setError("No token found");
                setLoading(false);
                return;
            }

            try {
                const response = await fetch(`${LOCALSERVERBASEURL}auth/profile`, {
                    headers: {
                        "Authorization": `Bearer ${token}`
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