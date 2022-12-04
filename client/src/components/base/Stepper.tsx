import React, { useState, useEffect } from 'react';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepButton from '@mui/material/StepButton';
import { useTranslation } from 'react-i18next';

type Props = {
    steps: string[],
    activeStep: number,
    completedStep: { [k: number]: boolean }
};

const BaseStepper: React.FC<Props> = ({
    steps,
    activeStep,
    completedStep
}) => {
    const { t } = useTranslation();

    const [ completed, setCompleted ] = useState<{
        [k: number]: boolean;
    }>({});

    const totalSteps = () => {
        return steps.length;
    };

    const completedSteps = () => {
        return Object.keys(completed).length;
    };

    const isLastStep = () => {
        return activeStep === totalSteps() - 1;
    };

    const allStepsCompleted = () => {
        return completedSteps() === totalSteps();
    };

    const handleComplete = () => {
        const newCompleted = completed;
        newCompleted[activeStep] = true;
        console.log(newCompleted, 'newCompleted');
        // setCompleted(newCompleted);
    };

    // useEffect(() => {
    //     handleComplete();
    // }, [ activeStep ]);

    const handleNext = () => {
        const newActiveStep =
            isLastStep() && !allStepsCompleted()
                ? // It's the last step, but not all steps have been completed,
                  // find the first step that has been completed
                steps.findIndex((step, i) => !(i in completed))
                : activeStep + 1;
        // setActiveStep(newActiveStep);
    };

    // completed[activeStep] = true ?


    const handleReset = () => {
        // setActiveStep(0);
        setCompleted({});
    };

    return (
        <>
            <Stepper nonLinear activeStep={activeStep}>
                {steps.map((label, index) => (
                    <Step key={label} completed={completedStep[activeStep]}>
                        <StepButton color="inherit">
                            {t(label)}
                        </StepButton>
                    </Step>
                ))}
            </Stepper>
        </>
    );
};

export default BaseStepper;