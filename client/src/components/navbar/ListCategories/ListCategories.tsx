import React from 'react';
import { BsList } from 'react-icons/bs';
import Typography from '@/components/base/Typography';
import { Popover, Tooltip } from '@mui/material';
import { Menu, MenuProps } from 'antd';
import './ListCategories.scss';

import { IoPhonePortraitOutline, IoHeadsetOutline, IoLaptopOutline } from 'react-icons/io5';
import { VscWatch } from 'react-icons/vsc';
import { MdKeyboardArrowRight } from 'react-icons/md';

import { useTranslation } from 'react-i18next';

type MenuItem = Required<MenuProps>['items'][number];

const MenuSubmenuItem: React.FC<any> = ({ item }) => {
    const { Item } = Menu;
    return (
        < Item className={'flex w-full items-center'}>
            <div className={'flex items-center gap-2'}>
                <div
                    className={'text-xl'}>
                    {item.icon}
                </div>
                <Typography content={item?.label} className={'text-sm'}/>
            </div>

            <MdKeyboardArrowRight/>
        </Item>
    )
        ;
};


const TooltipOptionComponent: React.FC = () => {
        const { t } = useTranslation();
        const { Item, SubMenu } = Menu;

        const items: MenuItem[] = [
            {
                key: 'Smartphone',
                icon: <div className={'text-xl'}><IoPhonePortraitOutline/></div>,
                label: t('navbar.list_categories.smartphone'),
                children: [
                    {
                        key: '1-1',
                        label: 'Item 1',
                        type: 'group',
                        children: [
                            { key: '1', label: 'Option 1' },
                            { key: '2', label: 'Option 2' },
                        ],
                    },
                    {
                        key: '1-2',
                        label: 'Item 2',
                        type: 'group',
                        children: [
                            { key: '3', label: 'Option 3' },
                            { key: '4', label: 'Option 4' },
                        ],
                    },
                ],
            },
            {
                key: 'Sound',
                icon: <div className={'text-xl'}> <IoHeadsetOutline/></div>,
                label: t('navbar.list_categories.sound'),
                children: [
                    { key: '5', label: 'Option 5' },
                    { key: '6', label: 'Option 6' },
                    {
                        key: 'sub3',
                        label: 'Submenu',
                        children: [
                            { key: '7', label: 'Option 7' },
                            { key: '8', label: 'Option 8' },
                        ],
                    },
                ],
            },
            {
                key: 'Laptop',
                label: t('navbar.list_categories.laptop'),
                icon: <div className={'text-xl'}><IoLaptopOutline/></div> ,
                children: [
                    { key: '9', label: 'Option 9' },
                    { key: '10', label: 'Option 10' },
                    { key: '11', label: 'Option 11' },
                    { key: '12', label: 'Option 12' },
                ],
            },
            {
                key: 'Smartwatch',
                label: t('navbar.list_categories.smart_watch'),
                icon: <VscWatch/>,
                children: [
                    { key: '9', label: 'Option 9' },
                    { key: '10', label: 'Option 10' },
                    { key: '11', label: 'Option 11' },
                    { key: '12', label: 'Option 12' },
                ],
            },
        ];


        const onClick: MenuProps['onClick'] = (e) => {
            console.log('click', e);
        };
        return (
            <div className={'categories-menu-container'}>
                <Menu
                    onClick={onClick}
                    style={{ width: '12rem' }}
                    mode="vertical"
                    items={items}
                    expandIcon={
                    <div className={'text-sm'}>
                        <MdKeyboardArrowRight/>
                    </div>
                }
                >
                    {/*{items.map((item: any, index: number) => {*/}
                    {/*    return (*/}
                    {/*        <>*/}
                    {/*            <Item key={index} className={'flex w-full items-center'}>*/}
                    {/*                    <div className={'flex items-center gap-2'}>*/}
                    {/*                        <div className={'text-xl'}>*/}
                    {/*                            {item.icon}*/}
                    {/*                        </div>*/}
                    {/*                        <Typography content={item?.label} className={'text-sm'}/>*/}
                    {/*                    </div>*/}

                    {/*                    <MdKeyboardArrowRight/>*/}
                    {/*            </Item>*/}
                    {/*        </>*/}
                    {/*    );*/}
                    {/*})}*/}
                </Menu>
            </div>
        )
            ;
    }
;


const ListCategories = () => {
    return (
        <div className={'h-full cursor-pointer'}>
            <Tooltip title={<TooltipOptionComponent/>} open={true}>
                <div className={'h-full flex items-center text-white border border-white rounded p-2 gap-2'}>
                    <BsList/>
                    <Typography content={'navbar.list_categories.label'}/>
                </div>
            </Tooltip>

        </div>
    );
};


export default ListCategories;
