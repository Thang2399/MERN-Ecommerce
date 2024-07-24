import React from 'react';
import SingleItem from '../SingleItem';
import { brandTypes, singleCategoryWithTypicalItemTypes, singleItemTypes } from '@/types/home';
import Button from '@/components/base/Button/Button';
import { Carousel } from 'antd';
import './index.css';
import Typography from '@/components/base/Typography';
import useScreenSize from '@/hook/useScreenSize';
import { listCategoriesArr } from '@/constants/home';

type Props = {
    listItems: singleCategoryWithTypicalItemTypes[];
};

const ListItems: React.FC<Props> = ({ listItems }) => {
    const { width } = useScreenSize();

    const handleClickBrand = () => {
        console.log('handleClickBrand');
    };

    const renderNumberOfShowSlides = () => {
        if (width >= 1600) return 5;
        else if (width < 1600 && width > 600) return 3;
        else return 1;
    };

    const getCategoryName = (categoryName: string) => {
        const specificCategory = listCategoriesArr.find((category: {key: string, label: string}) => category.key === categoryName);
        return `home_page.list_categories.${specificCategory?.label}`;
    };

    return (
        <>
            <div className={'flex flex-col justify-center items-center gap-5 w-full'}>
                {listItems.map((item: singleCategoryWithTypicalItemTypes) => (
                    <div key={item._id} className={'h-full w-full mb-5'}>
                        <div className={'flex flex-row justify-between items-center'}>
                            <Typography variant={'h1'} className={'text-3xl font-bold uppercase'} content={getCategoryName(item.categoryName)} />

                            <div className={'flex flex-row justify-between items-center gap-2'}>
                                {item.brands.map((brand: brandTypes) => {
                                    return (
                                        <div key={brand._id}>
                                            <Button
                                                handleClick={handleClickBrand}
                                                content={brand.brandName}
                                                buttonClassName={'bg-secondary p-1'}
                                                typoClassName={'text-sm'}
                                            />
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                        {item.listFavoriteItems.length > 0 && (
                            <div className={'mt-4'}>
                                <Carousel autoplay={true} infinite={true} arrows={true} dots={false} slidesToShow={renderNumberOfShowSlides()}>
                                    {item.listFavoriteItems.map((favoriteItem: singleItemTypes) => {
                                        return (
                                            <div key={favoriteItem._id}>
                                                <SingleItem item={favoriteItem}/>
                                            </div>
                                        );
                                    })}
                                </Carousel>

                            </div>
                        )}
                    </div>
                ))}
            </div>
        </>
    );
};

export default ListItems;
