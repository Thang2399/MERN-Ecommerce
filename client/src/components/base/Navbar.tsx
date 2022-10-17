import React from 'react';
import LocalesSwitcher from '../common/LocalesSwitcher';
import Logo from '../common/Logo';
import InputTextField from './InputTextField';

export default function Navbar(): JSX.Element {
    return (
			<div
				className={'bg-black/80 flex items-center justify-between px-3 py-2'}>
				<Logo />
				<div className={'w-1/3'}>
					<InputTextField
						type={'text'}
						placeholder={'home_page.search_box_placeholder'}
					/>
				</div>
				<LocalesSwitcher />
			</div>
		);
}
