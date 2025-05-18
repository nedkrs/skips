import React, { useState, useMemo } from "react";
import useSkips from "../useSkips";
import FilterBar from "./FilterBar";
import SkipCard from "./SkipCard";

export default function SkipSelector({ onCompleted }) {
    const [skip, setSkip] = useState(null);
    const { skips, loading } = useSkips();
    const [sizeRange, setSizeRange] = useState([0, 50]);
    const [priceRange, setPriceRange] = useState([0, 1200]);
    const [onlyRoadLegal, setOnlyRoadLegal] = useState(false);
    const [onlyHeavyWaste, setOnlyHeavyWaste] = useState(false);

    const [sortBy, setSortBy] = useState({ key: "size", dir: 1 });
    const filtered = useMemo(() => {
        return skips
            .filter((s) => s.size >= sizeRange[0] && s.size <= sizeRange[1])
            .filter(
                (s) =>
                    s.price_before_vat >= priceRange[0] &&
                    s.price_before_vat <= priceRange[1]
            )
            .filter((s) => (onlyRoadLegal ? s.allowed_on_road : true))
            .filter((s) => (onlyHeavyWaste ? s.allows_heavy_waste : true))
            .sort((a, b) => {
                const diff = a[sortBy.key] - b[sortBy.key];
                return sortBy.dir * diff;
            });
    }, [skips, sizeRange, priceRange, onlyRoadLegal, onlyHeavyWaste, sortBy]);

    if (loading) {
        return (
            <div className="w-full flex justify-center items-center py-20">
                <div className="w-12 h-12 border-4 border-green-500 border-t-transparent rounded-full animate-spin" />
            </div>
        );
    }

    const handleSelect = (id) => {
        const newSelected = skip === id ? null : id;
        setSkip(newSelected);
        onCompleted(2, newSelected !== null);
    };

    return (
        <div className="w-full">
            <FilterBar
                sizeRange={sizeRange}
                setSizeRange={setSizeRange}
                priceRange={priceRange}
                setPriceRange={setPriceRange}
                onlyRoad={onlyRoadLegal}
                setOnlyRoad={setOnlyRoadLegal}
                onlyHeavy={onlyHeavyWaste}
                setOnlyHeavy={setOnlyHeavyWaste}
                sortBy={sortBy}
                setSortBy={setSortBy}
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-6">
                {filtered.map((s) => (
                    <SkipCard
                        key={s.id}
                        skip={s}
                        isSelected={skip === s.id}
                        onSelect={handleSelect}
                    />
                ))}
            </div>
        </div>
    );
}
