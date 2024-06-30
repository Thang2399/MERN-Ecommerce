import React from 'react';
import Typography from './Typography';
import ReactLoading from 'react-loading';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';

type Props = {
	content: string;
	needTranslate?: boolean;
    buttonClassName?: string;
    typoClassName?: string;
	handleClick?: (params?: any) => any;
	dataTest?: string;
	btnType?: 'submit' | 'button' | 'reset' | undefined;
	icon?: any
};

const Button: React.FC<Props> = ({
	content,
	needTranslate,
    buttonClassName,
    typoClassName,
	handleClick,
	dataTest,
	btnType = 'button',
	icon
}) => {
	const showLoadingBtn = useSelector((state: RootState) => state.commonReducer.showLoadingBtn);
	const onClick = () => {
		if (handleClick) {
			handleClick();
		}
	};

	return (
		<>
			<button
				type={btnType}
				className={`py-2 h-12 px-5 w-full rounded-lg disabled:cursor-not-allowed disabled:opacity-50 ${buttonClassName}`}
				onClick={() => onClick()}
				data-test={dataTest}
				disabled={showLoadingBtn}
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

			</button>
		</>
	);
};

Button.defaultProps = {
	buttonClassName: 'bg-gray-400',
	dataTest: ''
};


export default Button;
