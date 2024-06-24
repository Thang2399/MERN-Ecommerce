import React from 'react';
import Typography from '@/components/base/Typography';
import { FieldProps } from '@/types/field';
import { FIELD_TYPE } from '@/constants/field';
import { Form, Formik } from 'formik';
import { changeUserPasswordTypes } from '@/types/user';
import RenderFormField from '@/components/base/RenderFormField';
import Button from '@/components/base/Button';
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import { useTranslation } from 'react-i18next';
import { COMMON_CONSTANTS, HTTP_STATUS, REGEX } from '@/constants';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store';
import { setShowLoadingIcon, setShowToastMessage, setUserCommonInfor } from '@/store/common';
import services from '@/services';
import { setCookie } from 'typescript-cookie';
import { FORGET_RESET_CHANGE_PASSWORD } from '@/constants/auth';

const ChangePasswordPage: React.FC = () => {
    const navigate = useNavigate();
    const { t } = useTranslation();
    const dispatch = useDispatch();

    const userId = useSelector((state: RootState) => state.commonReducer.userCommonInfor.id);

    const initialValues = {
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
    };

    const changePasswordValidationSchema = yup.object().shape({
        currentPassword: yup.string().required('error_messages.filed_required'),
        newPassword: yup.string()
            .min(8,  t('error_messages.not_enough_length', { min: '8' }))
            .matches(REGEX.CONTAIN_AT_LEAST_ONE_NUMBER, 'error_messages.contain_at_least_one_number')
            .matches(REGEX.CONTAIN_AT_LEAST_ONE_LETTER, 'error_messages.contain_at_least_one_letter')
            .matches(REGEX.CONTAIN_AT_LEAST_ONE_SPECIAL_CHARACTER, 'error_messages.contain_at_least_one_special_character')
            .not([ yup.ref('currentPassword') ], t('error_messages.not_match_current_password', { currentPassword: t('form.current_password_lowercase') }))
            .required('error_messages.filed_required'),
        confirmPassword: yup.string().equals([ yup.ref('newPassword') ], 'Password must match').required('error_messages.filed_required'),
    });

    const changePasswordFieldsArr: FieldProps[] = [
        {
            label: 'change_password_page.form.current_password.label',
            htmlFor: 'currentPassword',
            inputName: 'currentPassword',
            placeholder: 'change_password_page.form.current_password.placeholder',
            fieldType: FIELD_TYPE.PASSWORD,
            dataTest: 'currentPassword',
            errorMessageField: 'form.current_password',
            errorMessageDataTest: 'errorCurrentPassword'
        },
        {
            label: 'change_password_page.form.new_password.label',
            htmlFor: 'newPassword',
            inputName: 'newPassword',
            placeholder: 'change_password_page.form.new_password.placeholder',
            fieldType: FIELD_TYPE.PASSWORD,
            dataTest: 'newPassword',
            errorMessageField: 'form.new_password',
            errorMessageDataTest: 'errorNewPassword'
        },
        {
            label: 'change_password_page.form.confirm_password.label',
            htmlFor: 'confirmPassword',
            inputName: 'confirmPassword',
            placeholder: 'change_password_page.form.new_password.placeholder',
            fieldType: FIELD_TYPE.PASSWORD,
            dataTest: 'confirmPassword',
            errorMessageField: 'form.confirm_password',
            errorMessageDataTest: 'errorConfirmPassword'
        },
    ];

    const handleSubmit = async (values: any) => {
        const payload = {
            userId,
            currentPassword: values.currentPassword,
            newPassword: values.newPassword
        };
        try {
            dispatch(setShowLoadingIcon(true));
            const res = await services.changeUserPassword(payload);
            if (res && res.status === HTTP_STATUS.CREATE_SUCCESS) {
                dispatch(setShowToastMessage({
                    show: true,
                    type: 'success',
                    message: 'change_password_page.form.response.success'
                }));
                setCookie(COMMON_CONSTANTS.ACCESS_TOKEN, '');
                localStorage.removeItem(COMMON_CONSTANTS.REFRESH_TOKEN);
                dispatch(setUserCommonInfor({
                    role: '',
                    id: '',
                    email: '',
                    userName: ''
                }));
                navigate('/');
                dispatch(setShowLoadingIcon(false));
            }
        } catch (err: any) {
            const errorMessage = err.response.data.message;
            dispatch(setShowLoadingIcon(false));
            dispatch(setShowToastMessage({
                    show: true,
                    type: 'error',
                    message: `change_password_page.form.response.${errorMessage === FORGET_RESET_CHANGE_PASSWORD.DUPLICATE_NEW_CURRENT_PASSWORD ?  'duplicate_password' : 'failed'}`
                }));
        }
    };

    return (
        <>
            <Typography
                content={'change_password_page.label'}
                variant={'h1'}
                className={'text-4xl text-black font-semibold capitalize'}
            />

            <div className="mt-10">
                <Formik initialValues={initialValues} validationSchema={changePasswordValidationSchema} onSubmit={handleSubmit}>
                    {({ values: formikValues, errors, touched, handleChange, handleBlur, handleSubmit, setFieldValue }) => (
                        <Form onSubmit={handleSubmit}>
                            <div>
                                {changePasswordFieldsArr.map((field: FieldProps) => {
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

                                            {field.inputName === 'newPassword' && (
                                                <div className={'mt-4 bg-gray-300 rounded p-4'}>
                                                    <Typography
                                                        content={'change_password_page.form.new_password.validation'}
                                                        className={'text-base'}/>
                                                </div>
                                            )}

                                        </React.Fragment>
                                    );
                                })}
                            </div>

                            <div className={'mt-10 flex gap-5'}>
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
        </>
    );
};

export default ChangePasswordPage;
