import * as React from 'react';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { useTranslation } from 'react-i18next';

type Props = {
    checkboxList: { label: string, value: string | boolean }[]
}

const BaseCheckbox: React.FC<Props> = ({ checkboxList }) => {
    const { t } = useTranslation();
    
    return (
        <FormGroup>
            {checkboxList.map((option: { label: string, value: string | boolean }) => {
                return (
                    <FormControlLabel
                        key={option.label}
                        control={<Checkbox defaultChecked/>}
                        label={t(option.label)}
                    />
                );
            })}
        </FormGroup>
    );
};

export default BaseCheckbox;