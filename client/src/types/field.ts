export type FieldProps = {
    showLabel?: boolean,
    label?: string,
    fieldType: string,
    htmlFor: string,
    placeholder?: string,
    inputName: string,
    dataTest: string,
    errorMessageField?: string,
    errorMessageDataTest?: string,
    checkboxList?: any[],
    disabledField?: boolean,
    isRowRadio?: boolean,
    handleChange?: (setFieldValue?: any, value?: any) => void,
    isPhoneNumberInput?: boolean
}
