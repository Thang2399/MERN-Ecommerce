export type singleItemTypes = {
    _id: string,
    name: string,
    description: string,
    currency: string,
    price: string,
    imageUrl: string,
    brandId: string,
    categoryId: string,
    subCategoryId: string,
    quantity: number,
    isFavoriteItem: boolean
}

export type subCategoryTypes = {
    _id: string,
    categoryName: string
}

export type brandTypes = {
    _id: string,
    brandName: string
}

export type singleCategoryWithTypicalItemTypes = {
    _id: string,
    categoryName: string,
    subCategories: subCategoryTypes[],
    brands: brandTypes[],
    listFavoriteItems: singleItemTypes[]
}
