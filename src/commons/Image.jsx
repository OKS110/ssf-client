import React from 'react';

export default function Image({img, alt, className}) {
    return (
        <>
            <img src={img || img[0]} alt={alt} className={className} />
        </>
    );
}