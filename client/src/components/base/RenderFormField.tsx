import InputLabel from '@mui/material/InputLabel';
import Typography from '@/components/base/Typography';
import React from 'react';
import { FieldProps } from '@/types/field';
import { FIELD_TYPE } from '@/constants/field';
import InputTextField from '@/components/base/InputTextField';
import InputPasswordField from '@/components/base/InputPasswordField';
import { FormikErrors, FormikTouched } from 'formik';
import ErrorMessage from '@/components/base/ErrorMessage';
import BaseCheckbox from '@/components/base/Checkbox';
import DatePicker from '@/components/base/DatePicker';
import BaseRadioButtons from '@/components/base/RadioButtons';

interface IRenderFormField {
    field: FieldProps,
    formikValues: any,
    errors: FormikErrors<any>,
    touched: FormikTouched<any>,
    handleChangeForm: (param?: any) => void,
    handleBlur: (param?: any) => void,
    setFieldValue: (field: string, value: any, shouldValidate?: (boolean | undefined)) => Promise<void | FormikErrors<any>>
}

const RenderFormField: React.FC<IRenderFormField> = ({ field, formikValues, errors, touched, handleBlur, handleChangeForm, setFieldValue }) => {
    const {
        showLabel = true,
        fieldType,
        label = '',
        htmlFor,
        placeholder = '',
        inputName,
        dataTest,
        errorMessageField = '',
        errorMessageDataTest = '',
        checkboxList = [],
        disabledField = false,
        isRowRadio = false,
        handleChange,
        isPhoneNumberInput,
        className = ''
    } = field;

    return (
        <div className={`${className}`}>
            {showLabel && (
                <InputLabel shrink htmlFor={htmlFor}>
                    <Typography
                        content={label}
                        className={'text-2xl mb-2 text-black cursor-pointer w-fit capitalize'}
                    />
                </InputLabel>
            )}


            {fieldType === FIELD_TYPE.INPUT && (
                <InputTextField
                    id={htmlFor}
                    inputName={inputName}
                    handleChange={handleChangeForm}
                    placeholder={placeholder}
                    value={formikValues[`${inputName}`]}
                    dataTest={dataTest}
                    isInvalidField={Boolean(errors[`${inputName}`])}
                    disabled={disabledField}
                    setFieldValue={setFieldValue}
                    isPhoneNumberInput={isPhoneNumberInput}
                />
            )}

            {fieldType === FIELD_TYPE.PASSWORD && (
                <InputPasswordField
                    id={htmlFor}
                    inputName={inputName}
                    handleChange={handleChangeForm}
                    placeholder={placeholder}
                    value={formikValues[`${inputName}`]}
                    dataTest={dataTest}
                    isInvalidField={Boolean(errors[`${inputName}`])}
                />
            )}

            {fieldType === FIELD_TYPE.CHECKBOX && (
                <BaseCheckbox
                    checkboxList={checkboxList}
                    inputName={inputName}
                    value={formikValues[`${inputName}`]}
                    handleChange={handleChangeForm}
                    setFieldValue={setFieldValue}
                />
            )}

            {fieldType === FIELD_TYPE.RADIO && (
                <BaseRadioButtons
                    fieldName={inputName}
                    handleSelect={handleChange}
                    optionsList={checkboxList}
                    defaultValue={formikValues[`${inputName}`]}
                    isRow={isRowRadio}
                    setFieldValue={setFieldValue}
                />
            )}

            {fieldType === FIELD_TYPE.CALENDAR && (
                <DatePicker
                    handleChangeDate={handleChange}
                    selectedDay={formikValues[`${inputName}`]}
                    setFieldValue={setFieldValue}
                />
            )}

            {errors[`${inputName}`] && (
                <ErrorMessage
                    errorMessage={errors[`${inputName}`] || ''}
                    field={errorMessageField}
                    dataTest={errorMessageDataTest}
                />
            )}
        </div>
    );
};

export default RenderFormField;
