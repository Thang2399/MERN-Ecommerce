import React from 'react';
import { useTranslation } from 'react-i18next';

type Props = {
    value: string,
    handleChange: (params: any) => any,
    type: string,
    placeholder: string,
    inputName: string,
    className?: string,
    minLength?: number,
    maxLength?: number
};

const InputTextField: React.FC<Props> =
    ({
        value,
        handleChange,
        type,
        placeholder,
        inputName,
        className,
        minLength, maxLength
    }) => {
    const { t } = useTranslation();

    return (
        <>
            <input
                value={value}
                type={type}
                name={inputName}
                placeholder={t(placeholder)}
                className={`py-3 px-2 rounded w-full ${className}`}
                onChange={handleChange}
                minLength={minLength}
                maxLength={maxLength}
            />
        </>
    );
};

InputTextField.defaultProps = {
    minLength: 1,
    maxLength: 255
};

export default InputTextField;