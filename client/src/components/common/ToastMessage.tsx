import React from 'react';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import { useTranslation } from 'react-i18next';
import { setHideToastMessage } from '../../store/common';

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props,
    ref,
) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const ToastMessage: React.FC = () => {
    const { t } = useTranslation();     
    const dispatch = useDispatch();

    const toastMessage = useSelector((state: RootState) => state.commonReducer.showToastMessage);

    const handleClose = () => {
        dispatch(setHideToastMessage());
    };

    return (
        <div>
            <Snackbar
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                autoHideDuration={5000}
                open={toastMessage.show}
                key={'key'}
                onClose={handleClose}
            >
                {
                    toastMessage.type === 'error'
                        ? (
                            <Alert severity='error' sx={{ width: '100%' }} onClose={handleClose}>
                                {t(toastMessage.message)}
                            </Alert>
                        )
                        : (
                            <Alert severity='success' sx={{ width: '100%' }} onClose={handleClose}>
                            {t(toastMessage.message)}
                        </Alert>
                        )
                }

            </Snackbar>
        </div>
    );
};

export default ToastMessage;