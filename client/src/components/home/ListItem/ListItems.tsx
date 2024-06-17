import React from 'react';
import SingleItem from '../SingleItem';
import { brandTypes, singleCategoryWithTypicalItemTypes, singleItemTypes } from '@/types/home';
import Button from '@/components/base/Button';
import { Carousel } from 'antd';
import './index.css';
import Typography from '@/components/base/Typography';

type Props = {
    listItems: singleCategoryWithTypicalItemTypes[];
};

const ListItems: React.FC<Props> = ({ listItems }) => {
    const handleClickBrand = () => {
        console.log('handleClickBrand');
    };

    return (
        <>
            <div className={'flex flex-col justify-center items-center gap-5 w-full'}>
                {listItems.map((item: singleCategoryWithTypicalItemTypes) => (
                    <div key={item._id} className={'h-full w-full mb-5'}>
                        <div className={'flex flex-row justify-between items-center'}>
                            <Typography variant={'h1'} className={'text-3xl font-semibold'} content={item.categoryName} />

                            <div className={'flex flex-row justify-between items-center gap-2'}>
                                {item.brands.map((brand: brandTypes) => {
                                    return (
                                        <div key={brand._id}>
                                            <Button
                                                handleClick={handleClickBrand}
                                                content={brand.brandName}
                                                buttonClassName={'bg-gray-100 p-2'}
                                                typoClassName={'text-sm'}
                                            />
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                        {item.listFavoriteItems.length > 0 && (
                            <div className={'mt-4'}>
                                <Carousel autoplay={true} infinite={false} arrows={true} dots={false} slidesToShow={5}>
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
