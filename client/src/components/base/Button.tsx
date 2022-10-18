import React from 'react';
import Typography from './Typography';

type Props = {
	content: string;
	needTranslate?: boolean;
    buttonClassName?: string;
    typoClassName?: string;
	handleClick: (params: any) => any;
};

const Button: React.FC<Props> = ({
	content,
	needTranslate,
    buttonClassName,
    typoClassName,
	handleClick,
}) => {
	return (
		<>
			<button
				className={`p-2 w-full rounded-lg ${buttonClassName}`}
				onClick={handleClick}>
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
	buttonClassName: 'bg-gray-400'
};


export default Button;
