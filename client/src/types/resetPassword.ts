export interface IResetPasswordForm {
    newPassword: string;
    confirmPassword: string;
}

export type IResetPasswordErrorMessages = {
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
    newPassword: string;
    token: string;
}
