import React, { useState } from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import TextField from '@mui/material/TextField';
import { DesktopDatePicker } from '@mui/x-date-pickers';
import dayjs, { Dayjs } from 'dayjs';
import { useTranslation } from 'react-i18next';

interface Props {
    selectedDay: Dayjs | string,
    dateFormat?: string,
    dateLabel?: string,
    handleChangeDate: (params: any) => any
}

const DatePicker: React.FC<Props> = ({
    selectedDay,
    dateFormat,
    dateLabel,
    handleChangeDate
}) => {
    const { t } = useTranslation();
    return (
        <LocalizationProvider dateAdapter={AdapterDayjs} className={'w-full'}>
            <DesktopDatePicker
                className={'w-full focus:outline-2 focus:outline-amber-800'}
                label={dateLabel && t(dateLabel)}
                inputFormat={dateFormat}
                value={selectedDay}
                onChange={handleChangeDate}
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