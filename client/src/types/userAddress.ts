export type createUserAddressType = {
    userId: string,
    userName: string,
    phoneNumber: string,
    address: string,
    district: string,
    city?: string,
    nation?: string,
    isDefaultAddress?: boolean,
    isWorkingAddress?: boolean
}

export type deleteUserAddressType = {
    ids: string[],
    userId: string
}
