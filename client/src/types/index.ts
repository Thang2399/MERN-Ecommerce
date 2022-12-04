export type supportsLanguagesArrTypes = {
    code: string,
    language: string,
    flag: string
};

export type singleItemTypes = {
    _id: string,
    name: string,
    description: string,
    currency: string,
    price: string,
    isPromoted: boolean,
    promotion: string,
    imageUrl: string,
    discountPercentage: string,
    brand: string,
    category: string,
    quantity: number
}

export type userInformation = {
    firstName: string,
    lastName: string,
    phoneNumber: string,
    emailAddress: string,
}

export type userInforFormErrorMessages = {
    firstName: {
        message: string,
        field: string
    },
    lastName: {
        message: string,
        field: string
    },
    phoneNumber: {
        message: string,
        field: string
    },
    emailAddress: {
        message: string,
        field: string
    }
}

export type userAddress = {
    country: string,
    city: string,
    district: string,
    streetAddress: string,
};

export type userAddressFormErrorMessages = {
    country: {
        message: string,
        field: string
    },
    city: {
        message: string,
        field: string
    },
    district: {
        message: string,
        field: string
    },
    streetAddress: {
        message: string,
        field: string
    }
}