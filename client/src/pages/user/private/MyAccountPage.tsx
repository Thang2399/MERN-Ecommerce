import React, { useEffect, useState } from 'react';
import Typography from '@/components/base/Typography';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store';
import services from '@/services';
import { setShowLoadingIcon, setShowToastMessage } from '@/store/common';
import { userInformationTypes } from '@/types/user';
import { FIELD_TYPE } from '@/constants/field';
import { Form, Formik, FormikErrors } from 'formik';
import { FieldProps } from '@/types/field';
import RenderFormField from '@/components/base/RenderFormField';
import { gendersOptions } from '@/constants/user';
import Button from '@/components/base/Button';
import { useNavigate } from 'react-router-dom';
import { formatDateTime } from '@/utils/misc';
import * as yup from 'yup';

const MyAccountPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const userId = useSelector((state: RootState) => state.commonReducer.userCommonInfor.id);
    const [ userInfor, setUserInfor ] = useState<userInformationTypes>({
        id: '',
        userName: '',
        phoneNumber: '',
        email: '',
        dateOfBirth: '',
        gender: '',
        role: '',
    });

    const handleGetDetailUserInformation = async () => {
        try {
            dispatch(setShowLoadingIcon(true));
            const res = await services.getDetailUserInformation(userId);
            const data = res.data;
            if (data) {
                setUserInfor({
                    ...data,
                    id: data._id
                });
            }

        } catch (err) {
            console.log('err', err);
        }
        dispatch(setShowLoadingIcon(false));
    };

    useEffect(() => {
        if (userId) {
            handleGetDetailUserInformation();
        }
    }, [ userId ]);

    const userInformationValidationSchema = yup.object({
        userName: yup.string().required('error_messages.filed_required'),
        email: yup.string(),
        phoneNumber: yup.string().required('error_messages.filed_required'),
        dateOfBirth: yup.string().required('error_messages.filed_required'),
    });

    const userInformationFieldArr = [
        {
            label: 'my_account_page.form.user_name.label',
            htmlFor: 'userName',
            fieldType: FIELD_TYPE.INPUT,
            placeholder: 'my_account_page.form.user_name.placeholder',
            inputName: 'userName',
            dataTest: 'userName',
            errorMessageField: 'form.user_name',
            errorMessageDataTest: 'errorUserName'
        },
        {
            label: 'my_account_page.form.email.label',
            htmlFor: 'email',
            fieldType: FIELD_TYPE.INPUT,
            placeholder: 'my_account_page.form.email.placeholder',
            inputName: 'email',
            dataTest: 'email',
            errorMessageField: 'form.email',
            errorMessageDataTest: 'errorEmail',
            disabledField: true
        },
        {
            label: 'my_account_page.form.gender.label',
            htmlFor: 'gender',
            fieldType: FIELD_TYPE.RADIO,
            placeholder: 'my_account_page.form.phone_number.placeholder',
            inputName: 'gender',
            dataTest: 'gender',
            errorMessageField: 'form.gender',
            errorMessageDataTest: 'errorDateOfBirth',
            checkboxList: gendersOptions,
            isRowRadio: true,
            handleChange: (setFieldValue: (field: string, value: any, shouldValidate?: (boolean | undefined)) => Promise<void | FormikErrors<any>>, value: string) => {
                setFieldValue('gender', value);
            }
        },
        {
            label: 'my_account_page.form.phone_number.label',
            htmlFor: 'phoneNumber',
            fieldType: FIELD_TYPE.INPUT,
            placeholder: 'my_account_page.form.phone_number.placeholder',
            inputName: 'phoneNumber',
            dataTest: 'phoneNumber',
            errorMessageField: 'form.phone_number',
            errorMessageDataTest: 'errorPhoneNumber',
            isPhoneNumberInput: true
        },
        {
            label: 'my_account_page.form.date_of_birth.label',
            htmlFor: 'dateOfBirth',
            fieldType: FIELD_TYPE.CALENDAR,
            placeholder: 'my_account_page.form.phone_number.placeholder',
            inputName: 'dateOfBirth',
            dataTest: 'dateOfBirth',
            errorMessageField: 'form.date_of_birth',
            errorMessageDataTest: 'errorDateOfBirth',
            handleChange: (setFieldValue: (field: string, value: any, shouldValidate?: (boolean | undefined)) => Promise<void | FormikErrors<any>>, value: string) => {
                const convertDate = formatDateTime(value);
                setFieldValue('dateOfBirth', convertDate);
            }
        },

    ];

    const handleUpdateUserInformation = async (values: any) => {

        const userId = values._id;
        const payload = {
            userName: values.userName,
            phoneNumber: values.phoneNumber,
            gender: values.gender,
            dateOfBirth: values.dateOfBirth,
        };

        try {
            dispatch(setShowLoadingIcon(true));
            const res = await services.updateUserInformation(userId, payload);
            if (res) {
                dispatch(setShowToastMessage({
                    show: true,
                    type: 'success',
                    message: 'my_account_page.form.response.update_success'
                }));
            }
        } catch (err: any) {
            dispatch(setShowToastMessage({
                    show: true,
                    type: 'error',
                    message: 'my_account_page.form.response.update_failed'
                }));
        }

        dispatch(setShowLoadingIcon(false));
    };

    return (
        <div>
            <Typography
                content={'my_account_page.label'}
                variant={'h1'}
                className={'text-4xl text-black font-semibold'}
            />
            <Formik
                initialValues={userInfor}
                validationSchema={userInformationValidationSchema}
                onSubmit={handleUpdateUserInformation}
                enableReinitialize={true}
            >
                {({ values: formikValues, errors, touched, handleChange, handleBlur, handleSubmit, setFieldValue }) => (
                    <Form onSubmit={handleSubmit}>
                        <div className={'grid grid-rows-3 grid-flow-col gap-4'}>
                            {userInformationFieldArr.map((field: FieldProps) => {
                                return (
                                    <React.Fragment key={field.inputName}>
                                        <div className="mt-3">
                                            <RenderFormField
                                                field={field}
                                                formikValues={formikValues}
                                                errors={errors}
                                                touched={touched}
                                                handleChangeForm={handleChange}
                                                handleBlur={handleBlur}
                                                setFieldValue={setFieldValue}
                                            />
                                        </div>
                                    </React.Fragment>
                                );
                            })}
                        </div>

                        <div className={'flex gap-5'}>
                            <div className={'w-1/4'}>
                                <Button
                                content={'my_account_page.form.button.go_back'}
                                buttonClassName={'border rounded-xl'}
                                handleClick={() => navigate('/')}
                            />
                            </div>

                            <div className="w-1/4">
                                <Button
                                    typoClassName={'text-white'}
                                    content={'my_account_page.form.button.update'}
                                    btnType={'submit'}
                                />
                            </div>

                        </div>
                    </Form>
                    )}

            </Formik>
        </div>
    );
};

export default MyAccountPage;
