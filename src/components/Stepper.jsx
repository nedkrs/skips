import React, { useState, useEffect } from "react";
import {
    MapPinIcon,
    TrashIcon,
    TruckIcon,
    ShieldCheckIcon,
    CalendarIcon,
    CreditCardIcon,
} from "@heroicons/react/24/outline";

const ICONS = [
    MapPinIcon,
    TrashIcon,
    TruckIcon,
    ShieldCheckIcon,
    CalendarIcon,
    CreditCardIcon,
];

function useMediaQuery(query) {
    const [match, setMatch] = useState(() => window.matchMedia(query).matches);
    useEffect(() => {
        const mq = window.matchMedia(query);
        const handler = () => setMatch(mq.matches);
        mq.addEventListener("change", handler);
        return () => mq.removeEventListener("change", handler);
    }, [query]);
    return match;
}

export default function Stepper({ currentStep, onStepClick }) {
    const labels = [
        "Postcode",
        "Waste Type",
        "Select Skip",
        "Permit Check",
        "Choose Date",
        "Payment",
    ];
    const total = labels.length;
    const under380 = useMediaQuery("(max-width: 380px)");
    const under900 = useMediaQuery("(max-width: 900px)");
    const under300 = useMediaQuery("(max-width: 300px)");

    if (under300) {
        const current = currentStep;
        const nextLabel =
            current < total - 1 ? labels[current + 1] : labels[current];
        const size = 48;
        const stroke = 5;
        const radius = (size - stroke) / 2;
        const circumference = 2 * Math.PI * radius;
        const progress = ((current + 1) / total) * circumference;
        const offset = circumference - progress;

        return (
            <nav
                aria-label="Progress"
                className="w-full flex items-center justify-between p-4 space-x-4"
            >
                <div className="relative w-12 h-12">
                    <svg width={size} height={size} className="-rotate-90">
                        <circle
                            cx={size / 2}
                            cy={size / 2}
                            r={radius}
                            strokeWidth={stroke}
                            className="text-gray-300"
                            stroke="currentColor"
                            fill="none"
                        />
                        <circle
                            cx={size / 2}
                            cy={size / 2}
                            r={radius}
                            strokeWidth={stroke}
                            className="text-green-600"
                            stroke="currentColor"
                            fill="none"
                            strokeDasharray={circumference}
                            strokeDashoffset={offset}
                        />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-sm font-semibold text-gray-900">
                            {current + 1}/{total}
                        </span>
                    </div>
                </div>
                <div className="flex flex-col">
                    <p className="text-sm font-medium text-gray-900 leading-tight">
                        {labels[current]}
                    </p>
                    {current < total - 1 && (
                        <p className="text-xs text-gray-500">
                            Next: {nextLabel}
                        </p>
                    )}
                </div>
            </nav>
        );
    }

    let windowIdxs;
    if (under380) {
        if (currentStep === total - 1) {
            windowIdxs = [total - 2, total - 1];
        } else {
            windowIdxs = [currentStep, currentStep + 1];
        }
    } else if (under900) {
        if (currentStep === 0) {
            windowIdxs = [0, 1, 2];
        } else if (currentStep === total - 1) {
            windowIdxs = [total - 3, total - 2, total - 1];
        } else {
            windowIdxs = [currentStep - 1, currentStep, currentStep + 1];
        }
    } else {
        windowIdxs = labels.map((_, i) => i);
    }

    return (
        <nav aria-label="Progress" className="flex items-center w-full">
            {windowIdxs.map((stepIdx, i) => {
                const isDone = stepIdx <= currentStep;
                const Icon = ICONS[stepIdx];
                const label = labels[stepIdx];

                return (
                    <React.Fragment key={stepIdx}>
                        <button
                            onClick={() => isDone && onStepClick(stepIdx)}
                            disabled={!isDone}
                            className={`flex flex-col items-center focus:outline-none ${
                                isDone ? "cursor-pointer" : "cursor-not-allowed"
                            }`}
                        >
                            <div
                                className={`p-1 rounded-full border-2 ${
                                    isDone
                                        ? "border-green-600 bg-green-50"
                                        : "border-gray-400 bg-gray-100"
                                }`}
                            >
                                <Icon
                                    className={`h-8 w-8 ${
                                        isDone
                                            ? "text-green-600"
                                            : "text-gray-400"
                                    }`}
                                />
                            </div>
                            <span
                                className={`mt-1 font-medium ${
                                    isDone ? "text-green-600" : "text-gray-400"
                                }`}
                            >
                                {label}
                            </span>
                        </button>

                        {i < windowIdxs.length - 1 && (
                            <div
                                className={`flex-1 h-[1.2px] mx-2 self-center ${
                                    windowIdxs[i] < currentStep
                                        ? "bg-green-600"
                                        : "bg-gray-400"
                                }`}
                            />
                        )}
                    </React.Fragment>
                );
            })}
        </nav>
    );
}
