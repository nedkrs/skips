import Stepper from "./components/Stepper";
import { useState } from "react";
import DateSelector from "./components/DateSelector";
import Payment from "./components/Payment";
import PermitCheck from "./components/PermitCheck";
import PostCode from "./components/PostCode";
import SkipSelector from "./components/SkipSelector";
import Waste from "./components/Waste";
import NavigationButtons from "./components/NavigationButtons";

const STEPS = [
    PostCode,
    Waste,
    SkipSelector,
    PermitCheck,
    DateSelector,
    Payment,
];
function App() {
    const [step, setStep] = useState(0);
    const [stepsCompleted, setStepsCompleted] = useState([
        true,
        true,
        false,
        true,
        true,
        true,
    ]);
    const StepComponent = STEPS[step];

    const handleCompleted = (id, val) => {
        setStepsCompleted((prev) => {
            const next = [...prev];
            next[id] = val;
            return next;
        });
    };

    return (
        <div className="w-full max-w-[1300px] mx-auto sm:px-4 text-gray-900 min-h-screen flex flex-col text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl">
            <div className="bg-white shadow-md rounded p-4 sticky top-0 z-10">
                <Stepper currentStep={step} onStepClick={setStep} />
            </div>
            <main className="flex-1 px-4 overflow-auto sm:pt-12 py-6">
                <StepComponent
                    onCompleted={(id, val) => handleCompleted(id, val)}
                />
            </main>
            <footer
                className="bg-white  sticky bottom-0 z-10"
                style={{ boxShadow: "0 -4px 6px -1px rgba(0,0,0,0.1)" }}
            >
                <NavigationButtons
                    totalSteps={STEPS.length}
                    currentStep={step}
                    onBack={() => setStep((s) => Math.max(s - 1, 0))}
                    onNext={() => {
                        if (stepsCompleted[step]) {
                            setStep((s) => Math.min(s + 1, STEPS.length - 1));
                        }
                    }}
                    disableNext={!stepsCompleted[step]}
                />
            </footer>
        </div>
    );
}

export default App;
