import React from 'react';
import Typography from './Typography';

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
	const onClick = () => {
		if (handleClick) {
			handleClick();
		}
	};

	return (
		<>
			<button
				type={btnType}
				className={`p-2 w-full rounded-lg ${buttonClassName}`}
				onClick={() => onClick()}
				data-test={dataTest}
			>
				<div className={'flex justify-center'}>
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
