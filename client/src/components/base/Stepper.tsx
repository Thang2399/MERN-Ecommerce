import React from 'react';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepButton from '@mui/material/StepButton';
import { useTranslation } from 'react-i18next';

type Props = {
    steps: string[],
    activeStep: number,
    disabled?: boolean
};

const BaseStepper: React.FC<Props> = ({
    steps,
    activeStep,
    disabled
}) => {
    const { t } = useTranslation();

    return (
        <>
            <Stepper activeStep={activeStep}>
                {steps.map((label: string) => (
                    <Step key={label} disabled={disabled}>
                        <StepButton color="inherit">
                            {t(label)}
                        </StepButton>
                    </Step>
                ))}
            </Stepper>
        </>
    );
};

BaseStepper.defaultProps = {
    disabled: true
};

export default BaseStepper;