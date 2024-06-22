import React, { useState } from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import TextField from '@mui/material/TextField';
import { DesktopDatePicker } from '@mui/x-date-pickers';
import dayjs, { Dayjs } from 'dayjs';
import { useTranslation } from 'react-i18next';
import { FormikErrors } from 'formik';

interface Props {
    selectedDay: Dayjs | string,
    dateFormat?: string,
    dateLabel?: string,
    handleChangeDate?: (setFieldValue?: any, value?: any) => any,
    setFieldValue?: (field: string, value: any, shouldValidate?: (boolean | undefined)) => Promise<void | FormikErrors<any>>
}

const DatePicker: React.FC<Props> = ({
    selectedDay = dayjs(),
    dateFormat,
    dateLabel,
    handleChangeDate,
    setFieldValue
}) => {
    const { t } = useTranslation();

    const handleChange = (dateValue: string | null) => {
        console.log('dateValue', dateValue);
        if (handleChangeDate && setFieldValue) {
            handleChangeDate(setFieldValue, dateValue);
        }
    };

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs} className={'w-full'}>
            <DesktopDatePicker
                className={'w-full focus:outline-2 focus:outline-amber-800'}
                label={dateLabel && t(dateLabel)}
                inputFormat={dateFormat}
                value={selectedDay}
                onChange={handleChange}
                renderInput={(params) => <TextField {...params} />}
            />
        </LocalizationProvider>
    );
};

DatePicker.defaultProps = {
    dateFormat: 'DD/MM/YYYY',
    dateLabel: ''
};

export default DatePicker;
