import React from 'react';

type Props = {
	imgUrl: string;
	alt?: string;
	className?: string;
};

const Image: React.FC<Props> = ({ imgUrl, alt, className }) => {
	return (
		<div className={'w-full h-full'}>
            <img
                src={imgUrl}
                alt={alt}
                className={className}
            />
		</div>
	);
};

Image.defaultProps = {
    alt: 'img-item',
    className: 'w-full h-full'
};

export default Image;
