import { useState, useEffect } from "react";

export default function useSkips() {
    const [skips, setSkips] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch(
            "https://app.wewantwaste.co.uk/api/skips/by-location?postcode=NR32&area=Lowestoft"
        )
            .then((res) => res.json())
            .then((data) => {
                setSkips(data);
            })
            .catch(console.error)
            .finally(() => setLoading(false));
    }, []);

    return { skips, loading };
}
