import React from 'react';
import Typography from './Typography';

type Props = {
	content: string;
	needTranslate?: boolean;
    buttonClassName?: string;
    typoClassName?: string;
	handleClick: (params: any) => any;
	dataTest?: string;
};

const Button: React.FC<Props> = ({
	content,
	needTranslate,
    buttonClassName,
    typoClassName,
	handleClick,
	dataTest
}) => {
	return (
		<>
			<button
				className={`p-2 w-full rounded-lg ${buttonClassName}`}
				onClick={handleClick}
				data-test={dataTest}
			>
				<Typography
					content={content}
					needTranslate={needTranslate}
					className={typoClassName}
				/>
			</button>
		</>
	);
};

Button.defaultProps = {
	buttonClassName: 'bg-gray-400',
	dataTest: ''
};


export default Button;
