export interface IResetPasswordForm {
    newPassword: string;
    confirmPassword: string;
}

export interface IResetPasswordFormPayload {
    newPassword: string;
    token: string;
}
