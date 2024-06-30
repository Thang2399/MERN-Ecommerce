import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { useSearchParams } from 'react-router-dom';
import Typography from '@/components/base/Typography';
import { FieldProps } from '@/types/field';
import { FIELD_TYPE } from '@/constants/field';
import { optionsAddressTypes } from '@/constants/checkout';
import { useState } from 'react';
import { createUserAddressType } from '@/types/userAddress';
import { Form, Formik, FormikErrors } from 'formik';
import RenderFormField from '@/components/base/RenderFormField';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import { useTranslation } from 'react-i18next';
import Button from '@/components/base/Button';
import { modalStyle } from '@/constants/modal';
import { modalTypes } from '@/types/modal';
import * as yup from 'yup';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';

const CreateEditAddressModal: React.FC<modalTypes> = ({ open, handleClose, handleSubmit }) => {
    const commonUserInfor = useSelector((state: RootState) => state.commonReducer.userCommonInfor);
    const { t } = useTranslation();
    const [ searchParams, setSearchParams ] = useSearchParams();
    const id = searchParams.get('id') || '';

    const [ userAddressForm, setUserAddressForm ] = useState<createUserAddressType>({
            address: '',
            city: 'Ha Noi',
            district: '',
            isDefaultAddress: false,
            isWorkingAddress: false,
            nation: 'Viet Nam',
            phoneNumber: '',
            userId: '',
            userName: ''
        }
    );

    const userAddressValidationSchema = yup.object({
        userName: yup.string().required('error_messages.filed_required'),
        phoneNumber: yup.string().required('error_messages.filed_required'),
        nation: yup.string().required('error_messages.filed_required'),
        city: yup.string().required('error_messages.filed_required'),
        district: yup.string().required('error_messages.filed_required'),
        address: yup.string().required('error_messages.filed_required'),
    });

    const formUserInforFieldsArr: FieldProps[] = [
        {
            label: 'my_address_page.form.user_name.label',
            htmlFor: 'userName',
            inputName: 'userName',
            fieldType: FIELD_TYPE.INPUT,
            placeholder: 'my_address_page.form.user_name.placeholder',
            dataTest: 'userName',
            errorMessageField: 'form.customer_name',
            errorMessageDataTest: 'errUserName'
        },
        {
            label: 'my_address_page.form.phone_number.label',
            htmlFor: 'phoneNumber',
            inputName: 'phoneNumber',
            fieldType: FIELD_TYPE.INPUT,
            placeholder: 'my_address_page.form.phone_number.placeholder',
            dataTest: 'phoneNumber',
            errorMessageField: 'form.phone_number',
            errorMessageDataTest: 'errPhoneNumber',
            isPhoneNumberInput: true,
        },
        {
            label: 'my_address_page.form.country.label',
            htmlFor: 'nation',
            inputName: 'nation',
            fieldType: FIELD_TYPE.INPUT,
            placeholder: 'my_address_page.form.country.placeholder',
            dataTest: 'country',
            errorMessageField: 'form.country',
            errorMessageDataTest: 'errCountry'
        },
        {
            label: 'my_address_page.form.city.label',
            htmlFor: 'city',
            inputName: 'city',
            fieldType: FIELD_TYPE.INPUT,
            placeholder: 'my_address_page.form.city.placeholder',
            dataTest: 'city',
            errorMessageField: 'form.city',
            errorMessageDataTest: 'errCity',
        },
        {
            label: 'my_address_page.form.district.label',
            htmlFor: 'district',
            inputName: 'district',
            fieldType: FIELD_TYPE.INPUT,
            placeholder: 'my_address_page.form.district.placeholder',
            dataTest: 'district',
            errorMessageField: 'form.district',
            errorMessageDataTest: 'errDistrict'
        },
        {
            label: 'my_address_page.form.address.label',
            htmlFor: 'address',
            inputName: 'address',
            fieldType: FIELD_TYPE.INPUT,
            placeholder: 'my_address_page.form.address.placeholder',
            dataTest: 'address',
            errorMessageField: 'form.address',
            errorMessageDataTest: 'errAddress',
        },
        {
            label: 'my_address_page.form.address_type.label',
            htmlFor: 'address_type',
            inputName: 'isWorkingAddress',
            fieldType: FIELD_TYPE.RADIO,
            placeholder: 'my_address_page.form.address.placeholder',
            dataTest: 'addressType',
            checkboxList: optionsAddressTypes,
            isRowRadio: true,
            className: 'flex items-baseline',
            handleChange: (setFieldValue: (field: string, value: any, shouldValidate?: (boolean | undefined)) => Promise<void | FormikErrors<any>>, value: string) => {
                setFieldValue('isWorkingAddress', (value === 'true'));
            }
        },
    ];

    const handleCreateEditUserAddress = (values: any) => {
        const payload = {
            ...values,
            userId: commonUserInfor.id,
            isDefaultAddress: userAddressForm.isDefaultAddress,
        };

        if (commonUserInfor.id) {
            handleSubmit(payload, id);
        }
    };

    return (
        <div>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={modalStyle}>
                    <Typography
                        content={`my_address_page.${id ? 'edit' : 'create'}_label`}
                        needTranslate={true}
                        variant={'h1'}
                        className={'text-3xl font-bold text-center'}
                    />

                    <div className={'mt-4'}>
                        <Formik
                            initialValues={userAddressForm}
                            onSubmit={handleCreateEditUserAddress}
                            validationSchema={userAddressValidationSchema}
                        >
                            {({
                                  values: formikValues,
                                  errors,
                                  touched,
                                  handleChange,
                                  handleBlur,
                                  handleSubmit,
                                  setFieldValue,
                                  getFieldProps
                              }) => (
                                <Form onSubmit={handleSubmit}>
                                    <div className={'grid grid-cols-2 gap-4'}>
                                        {formUserInforFieldsArr.map((field: FieldProps) => (
                                            <React.Fragment key={field.inputName}>
                                                <div
                                                    className={`${field.inputName === 'address' || field.inputName === 'userName' || field.inputName === 'isWorkingAddress' ? 'col-span-2' : ''}`}>
                                                    <RenderFormField
                                                        field={field}
                                                        formikValues={formikValues}
                                                        errors={errors}
                                                        touched={touched}
                                                        handleChangeForm={handleChange}
                                                        handleBlur={handleBlur}
                                                        setFieldValue={setFieldValue}/>
                                                </div>

                                            </React.Fragment>
                                        ))}
                                    </div>

                                    {getFieldProps('isWorkingAddress').value && (
                                            <div className={'my-2 bg-gray-300 rounded p-4'}>
                                                <Typography
                                                    content={'my_address_page.form.address_type.note'}
                                                    needTranslate={true}
                                                />
                                            </div>
                                        )}

                                    <div>
                                        <FormControlLabel
                                            control={
                                                <Checkbox
                                                    checked={userAddressForm.isDefaultAddress}
                                                    onChange={(event) => setUserAddressForm((prev) => ({
                                                        ...prev,
                                                        isDefaultAddress: event.target.checked
                                                    }))}
                                                />
                                            }
                                            label={t('my_address_page.form.default_address.label')}
                                        />

                                        <div className={'mt-3 flex justify-end items-center flex-row gap-2'}>
                                            <Button
                                                buttonClassName={'border border-gray-400 text-black w-fit'}
                                                content={'my_address_page.form.buttons.cancel'}
                                                typoClassName={'text-gray-600 text-2xl'}
                                                dataTest={'submitBtn'}
                                                handleClick={handleClose}
                                            />

                                            <Button
                                                buttonClassName={'bg-gray-400 w-fit'}
                                                btnType={'submit'}
                                                content={`my_address_page.form.buttons.${id ? 'edit' : 'create'}`}
                                                typoClassName={'text-white text-2xl'}
                                                dataTest={'submitBtn'}
                                            />
                                        </div>
                                    </div>
                                </Form>
                            )}
                        </Formik>
                    </div>


                </Box>
            </Modal>
        </div>
    );
};

export default CreateEditAddressModal;
