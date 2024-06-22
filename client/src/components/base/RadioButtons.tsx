import * as React from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import { useTranslation } from 'react-i18next';
import { FormikErrors } from 'formik';

interface Props {
    fieldName?: string;
    optionsList: { label: string, value: string }[],
    defaultValue: string,
    handleSelect?: (setFieldValue?: any, value?: any) => any,
    isRow?: boolean;
    setFieldValue?: (field: string, value: any, shouldValidate?: (boolean | undefined)) => Promise<void | FormikErrors<any>>
}

const BaseRadioButtons: React.FC<Props> = ({
    fieldName,
    optionsList,
    defaultValue,
    handleSelect,
    isRow,
    setFieldValue
}) => {
    const { t } = useTranslation();

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (fieldName && setFieldValue && handleSelect) {
            handleSelect(setFieldValue, event.target.value);
        }
    };

    return (
        <FormControl>
            <RadioGroup
                row={isRow}
                aria-labelledby="demo-controlled-radio-buttons-group"
                name="controlled-radio-buttons-group"
                value={defaultValue}
                onChange={handleChange}
            >
                {optionsList.map((option: {label: string, value: string}) => {
                    return (
                            <FormControlLabel
                                key={option.value}
                                value={option.value}
                                control={<Radio />}
                                label={t(option.label)}
                            />
                    );
                })}
            </RadioGroup>
        </FormControl>
    );
};

BaseRadioButtons.defaultProps = {
    isRow: false,
};

export default BaseRadioButtons;
