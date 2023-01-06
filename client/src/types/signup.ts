export type defaultSignUpFormType = {
    userName: string,
    phoneNumber: string,
    email: string,
    password: string,
    confirmPassword: string,
    gender: string,
    dateOfBirth: string,
}

export type signUpFormErrorMessageTypes = {
    userName: {
        message: string,
        field: string
    },
    phoneNumber: {
        message: string,
        field: string
    },
    email: {
        message: string,
        field: string
    },
    password: {
        message: string,
        field: string
    },
    confirmPassword: {
        message: string,
        field: string
    },
    dateOfBirth: {
        message: string,
        field: string
    },
}

export type signUpFormPayloadTypes = {
    userName: string,
    phoneNumber: string,
    email: string,
    password: string,
    gender: string,
    dateOfBirth: string,
}