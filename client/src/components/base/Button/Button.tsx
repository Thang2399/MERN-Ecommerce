import React from 'react';
import Typography from '../Typography';
import ReactLoading from 'react-loading';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import MuiButton from '@mui/material/Button';
import './Button.scss';

type Props = {
	content: string;
	needTranslate?: boolean;
    buttonClassName?: string;
    typoClassName?: string;
	handleClick?: (params?: any) => any;
	dataTest?: string;
	btnType?: 'submit' | 'button' | 'reset' | undefined;
	icon?: any;
	btnVariant?: 'text' | 'outlined' | 'contained' | undefined
};

const Button: React.FC<Props> = ({
	content,
	needTranslate,
    buttonClassName,
    typoClassName,
	handleClick,
	dataTest,
	btnType = 'button',
	icon,
	btnVariant = 'contained'
}) => {
	const showLoadingBtn = useSelector((state: RootState) => state.commonReducer.showLoadingBtn);
	const onClick = () => {
		if (handleClick) {
			handleClick();
		}
	};

	return (
		<div className={`base-button-container w-full rounded ${buttonClassName}`}>
			<MuiButton
				variant={btnVariant}
				type={btnType}
				onClick={() => onClick()}
				data-test={dataTest}
				disabled={showLoadingBtn}
				className={'w-full rounded disabled:cursor-not-allowed disabled:opacity-50 hover:backdrop-opacity-20'}
			>
				<div className={`flex justify-center ${showLoadingBtn ? 'items-center' : ''}`}>
					{showLoadingBtn && (
						<div className={'mr-2'}>
							<ReactLoading type={'spin'} color={'#ffffff'} width={'20px'} height={'20px'}/>
						</div>
					)}

					{icon && (
						<div className={'mr-2 flex justify-center items-center text-2xl'}>
							{icon}
						</div>
					)}

					<Typography
						content={content}
						needTranslate={needTranslate}
						className={typoClassName}
					/>
				</div>

			</MuiButton>
		</div>
	);
};

Button.defaultProps = {
	buttonClassName: 'bg-primary',
	dataTest: ''
};


export default Button;
