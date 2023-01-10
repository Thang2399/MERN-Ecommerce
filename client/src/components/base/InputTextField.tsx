import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';

type Props = {
    value: string,
    handleChange: (params: any) => any,
    type: string,
    placeholder: string,
    inputName: string,
    className?: string,
    minLength?: number,
    maxLength?: number,
    isPasswordField?: boolean,
};

const InputTextField: React.FC<Props> =
    ({
         value,
         handleChange,
         type,
         placeholder,
         inputName,
         className,
         minLength, maxLength,
         isPasswordField,
     }) => {
        const { t } = useTranslation();
        const [ showPassword, setShowPassword ] = useState<boolean>(false);

        const handleShowPassword = () => {
            setShowPassword((show: boolean) => !show);
        };

        return (
            <>
                {
                    isPasswordField
                        ? (
                            <div className={'relative'}>
                                <input
                                    value={value}
                                    type={showPassword ? 'text' : 'password'}
                                    name={inputName}
                                    placeholder={t(placeholder)}
                                    className={`py-3 pl-2 pr-10 rounded w-full hover:border hover:border-black focus:outline-4 focus:outline-primary ${className}`}
                                    onChange={handleChange}
                                    minLength={minLength}
                                    maxLength={maxLength}
                                />
                                <div className={'absolute top-0 right-0 h-full pr-2.5 text-2xl flex justify-center items-center text-gray-400 cursor-pointer'} onClick={handleShowPassword}>
                                    <div>
                                        {showPassword ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}
                                    </div>
                                </div>
                            </div>

                        )
                        : (
                            <input
                                value={value}
                                type={type}
                                name={inputName}
                                placeholder={t(placeholder)}
                                className={`py-3 px-2 rounded w-full hover:border hover:border-black focus:outline-4 focus:outline-primary ${className}`}
                                onChange={handleChange}
                                minLength={minLength}
                                maxLength={maxLength}
                            />
                        )
                }

            </>
        );
    };

InputTextField.defaultProps = {
    minLength: 1,
    maxLength: 255,
    isPasswordField: false
};

export default InputTextField;