import React from 'react';
import { useTranslation } from 'react-i18next';
import TextField from '@mui/material/TextField';

export type InputProps = {
    id?: string,
    label?: string,
    value: string,
    handleChange: (params: any) => any,
    placeholder: string,
    inputName: string,
    className?: string,
    minLength?: number,
    maxLength?: number,
    isPasswordField?: boolean,
    isInvalidField?: boolean,
    dataTest?: string,
    helpText?: any
};

const InputTextField: React.FC<InputProps> =
    ({
         id,
         label,
         value,
         handleChange,
         placeholder,
         inputName,
         className,
         isInvalidField,
         dataTest,
        helpText
    }) => {
        const { t } = useTranslation();

        return (
            <>
                <TextField
                    id={id}
                    label={label}
                    variant={'outlined'}
                    placeholder={t(placeholder)}
                    className={`w-full bg-white rounded ${className}`}
                    name={inputName}
                    data-test={dataTest}
                    error={isInvalidField}
                    value={value}
                    onChange={handleChange}
                    helperText={helpText}
                />
            </>
        );
    };

InputTextField.defaultProps = {
    minLength: 1,
    maxLength: 255,
    isPasswordField: false,
    isInvalidField: false,
    dataTest: '',
};

export default InputTextField;
