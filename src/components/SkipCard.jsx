import React from "react";
import defaultSkip from "../assets/skip.png";
import { ExclamationTriangleIcon, CubeIcon } from "@heroicons/react/24/solid";

export default function SkipCard({ skip, onSelect, isSelected }) {
    const {
        size,
        hire_period_days,
        price_before_vat,
        allowed_on_road,
        allows_heavy_waste,
        vat,
    } = skip;

    return (
        <div
            onClick={() => onSelect(isSelected ? null : skip.id)}
            className={`
        bg-white rounded-lg shadow-lg overflow-hidden cursor-pointer
        transition hover:shadow-2xl ${isSelected ? "ring-4 ring-green-500" : ""}
      `}
        >
            <div className="relative w-full h-48">
                <img
                    src={defaultSkip}
                    alt={`${size}-yard skip`}
                    className="w-full h-full object-cover"
                />

                <div className="absolute inset-0 flex flex-col justify-center items-center p-4 space-y-1 text-center">
                    <p className="text-xl font-bold">
                        £{price_before_vat + vat}
                    </p>
                    <p className="text-lg">{size}-yard</p>
                    <p className="text-sm">{hire_period_days}-day hire</p>
                    {!allowed_on_road && (
                        <span className="inline-flex items-center w-max whitespace-nowrap bg-black text-yellow-400 text-xs px-2 py-0.5 rounded">
                            <ExclamationTriangleIcon className="h-3 w-3 mr-1" />
                            Not allowed on road
                        </span>
                    )}
                    {!allows_heavy_waste && (
                        <span className="inline-flex items-center w-max whitespace-nowrap bg-black text-yellow-400 text-xs px-2 py-0.5 rounded">
                            <CubeIcon className="h-3 w-3 mr-1" />
                            No heavy waste
                        </span>
                    )}
                </div>
            </div>
        </div>
    );
}
