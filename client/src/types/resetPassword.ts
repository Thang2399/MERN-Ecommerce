export interface IResetPasswordForm {
    otp: string;
    newPassword: string;
    confirmPassword: string;
}

export type IResetPasswordErrorMessages = {
    otp: {
        message: string,
        field: string
    };
    newPassword: {
        message: string,
        field: string
    };
    confirmPassword: {
        message: string,
        field: string
    };
}

export interface IResetPasswordFormPayload {
    otp: string;
    newPassword: string;
    email: string;
}