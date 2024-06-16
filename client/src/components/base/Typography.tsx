import React from 'react';
import { useTranslation } from 'react-i18next';

type Props = {
	content: string;
	needTranslate?: boolean;
	variant?: string;
	className?: string;
	dataTest?: string;
};

const Typography: React.FC<Props> = ({
	content,
	className,
	variant,
	needTranslate,
	dataTest
}) => {
	const { t } = useTranslation();
	const CustomTag = `${variant}` as keyof JSX.IntrinsicElements;

	return (
		<>
            {needTranslate
                ? <CustomTag className={`text-lg ${className}`} data-test={dataTest}>
                    {t(content)}
                </CustomTag>
                
				: <CustomTag className={`text-lg ${className}`} data-test={dataTest}>
                    {content}
                </CustomTag>
			}
		</>
	);
};

Typography.defaultProps = {
	needTranslate: true,
	variant: 'p',
	className: 'text-lg',
	dataTest: ''
};

export default Typography;
