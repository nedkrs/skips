import React from "react";

export default function NavigationButtons({
    currentStep,
    onBack,
    onNext,
    disableNext,
    totalSteps,
}) {
    return (
        <div className="flex justify-between items-center p-4 bg-white rounded">
            <button
                onClick={onBack}
                disabled={currentStep === 0}
                className={`
          px-4 py-2 rounded 
          ${
              currentStep === 0
                  ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700 text-white"
          }
        `}
            >
                ← Back
            </button>
            <button
                onClick={onNext}
                disabled={disableNext || currentStep === totalSteps - 1}
                className={`
          px-4 py-2 rounded 
          ${
              disableNext || currentStep === totalSteps - 1
                  ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700 text-white"
          }
        `}
            >
                Next →
            </button>
        </div>
    );
}
