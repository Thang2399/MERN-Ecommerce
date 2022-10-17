import React from "react";
import { useTranslation } from 'react-i18next';

type Props = {
    type: string,
    placeholder: string,
    className?: string
};

const InputTextField: React.FC<Props> = ({ type, placeholder, className }) => {
    const { t } = useTranslation();
    
    const handleChange = (e: any) => {
        console.log( e.target.value );
        };

    return (
        <>
            <input
                type={type} 
                placeholder={t(placeholder)} 
                className={`py-3 px-2 rounded w-full ${className}`}
                onChange={handleChange}
                />
        </>
    );
};

InputTextField.defaultProps = {};

export default InputTextField;