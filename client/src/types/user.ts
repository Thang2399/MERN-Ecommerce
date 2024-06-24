export type updateUserTypes = {
    userName: string,
    phoneNumber: string,
    gender?: string,
    dateOfBirth: string
}

export type changeUserPasswordTypes = {
    userId: string,
    currentPassword: string,
    newPassword: string
}

export type userInformationTypes = {
    id: string,
    userName: string,
    email: string,
    gender: string,
    role: string,
    dateOfBirth: string
    phoneNumber: string
}
