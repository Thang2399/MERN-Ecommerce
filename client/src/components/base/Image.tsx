import React from 'react';

type Props = {
	imgUrl: string;
	alt?: string;
	className?: string;
};

const Image: React.FC<Props> = ({ imgUrl, alt, className }) => {
	return (
		<div>
            <img
                src={imgUrl}
                alt={alt}
                className={className}
            />
		</div>
	);
};

Image.defaultProps = {
    alt: "img-item",
    className: ""
};

export default Image;
