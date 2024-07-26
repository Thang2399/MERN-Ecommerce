import React, { useState } from 'react';
import { BsList } from 'react-icons/bs';
import Typography from '@/components/base/Typography';
import { Tooltip } from '@mui/material';
import { Menu, MenuProps } from 'antd';
import './ListCategories.scss';

import { IoPhonePortraitOutline, IoHeadsetOutline, IoLaptopOutline } from 'react-icons/io5';
import { VscWatch } from 'react-icons/vsc';
import { MdKeyboardArrowRight } from 'react-icons/md';

import { useTranslation } from 'react-i18next';

type MenuItem = Required<MenuProps>['items'][number];

const MenuSubmenuItem: React.FC<any> = ({ item }) => {
    return (
        <>
            <div className={'flex items-center gap-2 px-3 py-2 bg-white text-black border border-dark rounded'}>
                <div
                    className={'text-xl'}>
                    {item.key}
                </div>
                {/*<Typography content={item?.label} className={'text-sm'}/>*/}
            </div>
        </>
    );
};


const TooltipOptionComponent: React.FC = () => {
    const { t } = useTranslation();
    const { Item, SubMenu } = Menu;
    const [ selectedItem, setSelectedItem ] = useState<any>({});

    const items: MenuItem[] = [
        {
            key: 'Smartphone',
            icon: <div className={'text-xl'}><IoPhonePortraitOutline/></div>,
            label: <Typography content={'navbar.list_categories.smartphone'} className={'text-xs capitalize font-semibold'}/>,
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
            icon: <div className={'text-xl'}><IoHeadsetOutline/></div>,
            label: <Typography content={'navbar.list_categories.sound'} className={'text-xs capitalize font-semibold'}/>,
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
            label: <Typography content={'navbar.list_categories.laptop'} className={'text-xs capitalize font-semibold'}/>,
            icon: <div className={'text-xl'}><IoLaptopOutline/></div>,
            children: [
                { key: '9', label: 'Option 9' },
                { key: '10', label: 'Option 10' },
                { key: '11', label: 'Option 11' },
                { key: '12', label: 'Option 12' },
            ],
        },
        {
            key: 'Smartwatch',
            label: <Typography content={'navbar.list_categories.smart_watch'} className={'text-xs capitalize font-semibold'}/>,
            icon: <div className={'text-xl'}><VscWatch/></div>,
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

    const handleShowHideSubMenu = (item: any) => {
        console.log('item', item);
        console.log('isMouseOut');
        setSelectedItem({ ...item });
    };

    return (
        <>
            <Tooltip title={<MenuSubmenuItem item={selectedItem}/>} placement={'right-start'} className={'submenu-tooltip'}>
                <div className={'categories-menu-container'}>
                    <Menu
                        onClick={onClick}
                        style={{ width: '12rem' }}
                        mode="vertical"
                    >
                        {items.map((item: any, index: number) => {
                            return (
                                <React.Fragment key={index}>
                                    <Item
                                        className={'flex w-full items-center flex-row py-2 hover:bg-dark hover:text-white'}
                                        onMouseEnter={() => handleShowHideSubMenu(item)}
                                    >
                                        <div className={'flex items-center gap-3'}>
                                            {item.icon}
                                            {item?.label}
                                        </div>
                                        <MdKeyboardArrowRight/>
                                    </Item>

                                </React.Fragment>
                            );
                        })}
                    </Menu>

                </div>
            </Tooltip>


        </>

    );
};

const ListCategories = () => {
    return (
        <div className={'h-full cursor-pointer'}>
            <Tooltip title={<TooltipOptionComponent/>}>
                <div className={'h-full flex items-center text-white border border-white rounded p-2 gap-2'}>
                    <div className={'text-white'}>
                        <BsList/>
                    </div>
                        <Typography content={'navbar.list_categories.label'}/>
                </div>
            </Tooltip>
        </div>
    );
};


export default ListCategories;
