import React from 'react';
import { useTranslation } from 'react-i18next';
import TextField from '@mui/material/TextField';
import { FormikErrors } from 'formik';

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
    helpText?: any,
    disabled?: boolean,
    isPhoneNumberInput?: boolean,
    setFieldValue?: (field: string, value: any, shouldValidate?: (boolean | undefined)) => Promise<void | FormikErrors<any>>
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
        helpText,
        disabled,
        isPhoneNumberInput,
        setFieldValue
    }) => {
        const { t } = useTranslation();

        const onChange = (event: any) => {
            let inputValue = event.target.value;

            if (isPhoneNumberInput) {
                inputValue = event.target.value.replace(/\D/g, '');
            }

            if (setFieldValue) {
                setFieldValue(inputName, inputValue);
            }
        };

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
                    onChange={onChange}
                    helperText={helpText}
                    disabled={disabled}
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
    disabled: false,
    isPhoneNumberInput: false
};

export default InputTextField;
