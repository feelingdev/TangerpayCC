import { useState, useRef, useEffect } from "react";

const baseUrl = 'api/';

export default function useFetch(url, method, body) {
    const isMountedRef = useRef(false);
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        isMountedRef.current = true;
        async function init() {
            try {
                const response = await fetch(baseUrl + url.toLowerCase(),
                    {
                        method: method,
                        body: JSON.stringify(body),
                        headers: {
                            "Content-Type": "application/json",
                        },
                    });
                if (response.ok) {
                    const json = await response.json();
                    if (isMountedRef.current) setData(json);
                } else {
                    throw response;
                }
            } catch (e) {
                if (isMountedRef.current) setError(e);
            } finally {
                if (isMountedRef.current) setLoading(false);
            }
        }
        init();
        return () => {
            isMountedRef.current = false;
        }
    }, [url, method, body]);

    return { data, error, loading };
}