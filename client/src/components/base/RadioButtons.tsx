import * as React from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import { useTranslation } from 'react-i18next';

interface Props {
    optionsList: { label: string, value: string }[],
    defaultValue: string,
    handleSelect: (params: any) => any
}

const BaseRadioButtons: React.FC<Props> = ({ optionsList, defaultValue, handleSelect }) => {
    const { t } = useTranslation();
    
    // const [ value, setValue ] = React.useState(optionsList[1].value);
    //
    // const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    //     setValue((event.target as HTMLInputElement).value);
    // };

    return (
        <FormControl>
            <RadioGroup
                aria-labelledby="demo-controlled-radio-buttons-group"
                name="controlled-radio-buttons-group"
                value={defaultValue}
                onChange={handleSelect}
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

export default BaseRadioButtons;