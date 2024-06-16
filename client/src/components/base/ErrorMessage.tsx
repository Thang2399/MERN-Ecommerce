import React from 'react';
import { useTranslation } from 'react-i18next';

interface Props {
    errorMessage: string,
    field?: string,
    dataTest?: string
}

const ErrorMessage: React.FC<Props> = ({ errorMessage, field, dataTest }) => {
    const { t } = useTranslation();

    const generateErrorMessage = (message: string, field: string|undefined) => {
        if (field) {
            return ( t(message, { field: t(`${field}`) }) );
        } else return t(message);
    };

    return (
        <p className={'text-red-500'} data-test={dataTest}>
            { generateErrorMessage(errorMessage, field) }
        </p>
    );
};

ErrorMessage.defaultProps = {
    field: '',
    dataTest: ''
};

export default ErrorMessage;
