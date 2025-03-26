import React from 'react';

export function PrevArrow(props) {
    const { className, onClick } = props;
    return (
        <div className={className} onClick={onClick}>
            <img src="/image/left-arrow.png" alt="left-arrow" />
        </div>
    );
}

export function NextArrow(props) {
    const { className, onClick } = props;
    return (
        <div className={className} onClick={onClick}>
            <img src="/image/right-arrow.png" alt="right-arrow" />
        </div>
    );
}