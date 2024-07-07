import { InputProps } from '@/components/base/InputTextField';
import TextField from '@mui/material/TextField';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';

const InputPasswordField: React.FC<InputProps> = ({
         id,
         label,
         value,
         handleChange,
         placeholder,
         inputName,
         className,
         isInvalidField,
         dataTest,
        variant
    }) => {
    const { t } = useTranslation();
    const [ showPassword, setShowPassword ] = useState<boolean>(false);

    const handleShowPassword = () => {
        setShowPassword((show: boolean) => !show);
    };

    return (
        <div className={'relative'}>
            <TextField
                id={id}
                type={showPassword ? 'text' : 'password'}
                label={label}
                variant={variant}
                placeholder={t(placeholder)}
                className={`w-full bg-white rounded ${className}`}
                name={inputName}
                data-test={dataTest}
                error={isInvalidField}
                value={value}
                onChange={handleChange}
            />

            <div
                className={`absolute top-0 right-0 h-full pr-2.5 text-2xl flex justify-center items-center ${isInvalidField ? 'text-red-400' : 'text-gray-400'} cursor-pointer`}
                onClick={handleShowPassword}
                data-test={`${dataTest}ToggleIcon`}
            >
                <div>
                    {showPassword ? <AiOutlineEye/> : <AiOutlineEyeInvisible/>}
                </div>
            </div>
        </div>

    );
};

export default InputPasswordField;
