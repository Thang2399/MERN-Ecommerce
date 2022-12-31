export type defaultLoginFormTypes = {
    email: string,
    password: string,
    remember: boolean,
}

export type loginFormErrorMessagesTypes = {
    email: {
        message: string,
        field: string
    },
    password: {
        message: string,
        field: string
    },
}