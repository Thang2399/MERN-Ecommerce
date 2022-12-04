import React from 'react';
import { useTranslation } from 'react-i18next';

interface Props {
    errorMessage: string,
    field?: string
}

const ErrorMessage: React.FC<Props> = ({ errorMessage, field }) => {
    const { t } = useTranslation();

    const generateErrorMessage = (message: string, field: string|undefined) => {
        if (field) {
            return ( t(message, { field: t(`${field}`) }) );
        } else return t(message);
    };

    return (
        <p className={'text-red-500'}>
            { generateErrorMessage(errorMessage, field) }
        </p>
    );
};

export default ErrorMessage;