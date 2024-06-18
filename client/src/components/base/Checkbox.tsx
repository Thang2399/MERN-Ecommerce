import * as React from 'react';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { useTranslation } from 'react-i18next';
import { FormikErrors } from 'formik';

type Props = {
    checkboxList: { label: string, value: string, name: string }[],
    value: string,
    handleChange: (param?: any) => void,
    inputName: string,
    setFieldValue: (field: string, value: any, shouldValidate?: (boolean | undefined)) => Promise<void | FormikErrors<any>>
}

const BaseCheckbox: React.FC<Props> = ({ checkboxList, inputName, value, handleChange, setFieldValue }) => {
    const { t } = useTranslation();

    const handleChangeCheckbox = (event: any) => {
        setFieldValue(`${inputName}`, event.target.checked);
    };

    return (
        <FormGroup>
            {checkboxList.map((option: { label: string, value: string, name: string }) => {
                return (
                    <FormControlLabel
                        key={option.label}
                        control={
                        <Checkbox
                            checked={value?.includes(option.value)}
                            onChange={handleChangeCheckbox}
                            name={option.name}
                        />
                    }
                        label={t(option.label)}
                    />
                );
            })}
        </FormGroup>
    );
};

export default BaseCheckbox;
