import React from "react";
import { Range, getTrackBackground } from "react-range";
import {
    TruckIcon,
    CubeIcon,
    ArrowUpIcon,
    ArrowDownIcon,
} from "@heroicons/react/24/outline";

export default function FilterBar({
    sizeRange,
    setSizeRange,
    priceRange,
    setPriceRange,
    onlyRoad,
    setOnlyRoad,
    onlyHeavy,
    setOnlyHeavy,
    sortBy,
    setSortBy,
}) {
    const SIZE_STEP = 1,
        MIN_SIZE = 0,
        MAX_SIZE = 50;
    const PRICE_STEP = 10,
        MIN_PRICE = 0,
        MAX_PRICE = 1200;

    const toggleSort = (key) => {
        setSortBy(({ key: oldKey, dir }) => ({
            key,
            dir: oldKey === key ? -dir : 1,
        }));
    };

    return (
        <div className="bg-white shadow-md rounded p-4 mb-6 space-y-8">
            <div className="flex flex-col md:gap-12 gap-2 md:flex-row space-y-4 md:space-y-0">
                <div className="flex-1">
                    <label className="block text-sm font-medium mb-4">
                        Size: {sizeRange[0]}–{sizeRange[1]} yd
                    </label>
                    <Range
                        values={sizeRange}
                        step={SIZE_STEP}
                        min={MIN_SIZE}
                        max={MAX_SIZE}
                        onChange={setSizeRange}
                        renderTrack={({ props, children }) => {
                            const { key, ...trackProps } = props;

                            return (
                                <div
                                    key={key}
                                    {...trackProps}
                                    className="h-1 rounded mx-2"
                                    style={{
                                        background: getTrackBackground({
                                            values: sizeRange,
                                            colors: ["#ddd", "#4ade80", "#ddd"],
                                            min: MIN_SIZE,
                                            max: MAX_SIZE,
                                        }),
                                    }}
                                >
                                    {children}
                                </div>
                            );
                        }}
                        renderThumb={({ props }) => {
                            const { key, ...trackProps } = props;

                            return (
                                <div
                                    key={key}
                                    {...trackProps}
                                    className="h-4 w-4 rounded-full bg-green-500 ring-2 ring-white shadow"
                                />
                            );
                        }}
                    />
                </div>
                <div className="flex-1">
                    <label className="block text-sm font-medium mb-4">
                        Price: £{priceRange[0]}–£{priceRange[1]}
                    </label>
                    <Range
                        values={priceRange}
                        step={PRICE_STEP}
                        min={MIN_PRICE}
                        max={MAX_PRICE}
                        onChange={setPriceRange}
                        renderTrack={({ props, children }) => {
                            const { key, ...trackProps } = props;

                            return (
                                <div
                                    key={key}
                                    {...trackProps}
                                    className="h-1 rounded mx-2"
                                    style={{
                                        background: getTrackBackground({
                                            values: priceRange,
                                            colors: ["#ddd", "#4ade80", "#ddd"],
                                            min: MIN_PRICE,
                                            max: MAX_PRICE,
                                        }),
                                    }}
                                >
                                    {children}
                                </div>
                            );
                        }}
                        renderThumb={({ props }) => {
                            const { key, ...trackProps } = props;

                            return (
                                <div
                                    key={key}
                                    {...trackProps}
                                    className="h-4 w-4 rounded-full bg-green-500 ring-2 ring-white shadow"
                                />
                            );
                        }}
                    />
                </div>
            </div>
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                <div className="flex items-center space-x-4">
                    <button
                        onClick={() => setOnlyRoad((r) => !r)}
                        className={`flex items-center px-2 py-1 rounded text-sm ${
                            onlyRoad
                                ? "bg-green-100 text-green-700"
                                : "bg-gray-100 text-gray-600"
                        }`}
                    >
                        <TruckIcon className="h-5 w-5 mr-1" /> Road
                    </button>
                    <button
                        onClick={() => setOnlyHeavy((h) => !h)}
                        className={`flex items-center px-2 py-1 rounded text-sm ${
                            onlyHeavy
                                ? "bg-green-100 text-green-700"
                                : "bg-gray-100 text-gray-600"
                        }`}
                    >
                        <CubeIcon className="h-5 w-5 mr-1" /> Heavy
                    </button>
                </div>
                <div className="flex items-center space-x-4">
                    <button
                        onClick={() => toggleSort("size")}
                        className={`flex items-center px-2 py-1 rounded text-sm ${
                            sortBy.key === "size"
                                ? "bg-green-100 text-green-700"
                                : "bg-gray-100 text-gray-600"
                        }`}
                    >
                        Size{" "}
                        {sortBy.key === "size" &&
                            (sortBy.dir > 0 ? (
                                <ArrowUpIcon className="h-4 w-4 ml-1" />
                            ) : (
                                <ArrowDownIcon className="h-4 w-4 ml-1" />
                            ))}
                    </button>
                    <button
                        onClick={() => toggleSort("price_before_vat")}
                        className={`flex items-center px-2 py-1 rounded text-sm ${
                            sortBy.key === "price_before_vat"
                                ? "bg-green-100 text-green-700"
                                : "bg-gray-100 text-gray-600"
                        }`}
                    >
                        Price{" "}
                        {sortBy.key === "price_before_vat" &&
                            (sortBy.dir > 0 ? (
                                <ArrowUpIcon className="h-4 w-4 ml-1" />
                            ) : (
                                <ArrowDownIcon className="h-4 w-4 ml-1" />
                            ))}
                    </button>
                </div>
            </div>
        </div>
    );
}
