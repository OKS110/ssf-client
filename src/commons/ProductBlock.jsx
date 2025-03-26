import React from 'react';
import { Link } from 'react-router-dom';
import { FaStar, FaHeart } from "react-icons/fa";
import Image from './Image.jsx';

export default function ProductBlock({detailList, ulClassName, liClassName, className}) {
    const name = className.substring(0, 12);

    return (
        <ul className={ulClassName}>
            { detailList && detailList.map((item, i) => 
                <li className={liClassName}>
                    <Link to={`/detail/${item.pid}`}>
                        <div className={`${className}-img`}>
                            {name === "sub-category" && <p>{i+1}</p>}
                            <Image img={item.img} alt={item.alt} className='' />
                        </div>
                        
                        <div className={`${className}-info`}>
                            <p className={`${className}-brand`}>{item.brand}</p>
                            <p className={`${className}-title`}>{item.title}</p>
                            <p className={`${className}-price-wrap`}>
                                <p className={`${className}-costprice`}>{item.costprice}</p>
                                <p className={`${className}-price-container`}>
                                    <span>{item.discount}%</span><span>{item.saleprice}</span>
                                </p>
                            </p>
                            <p className={`${className}-star-likes-container`}>
                                <span className={`${className}-star-wrap`}>
                                    <span><FaStar /></span>
                                    <span>{item.star}</span>
                                    <span>({item.reviewCount})</span>
                                </span>
                                <span className={`${className}-likes-wrap`}>
                                    <span><FaHeart /></span>
                                    <span>{item.likes}</span>
                                </span>
                            </p>
                        </div>
                    </Link>
                </li>
            ) }
        </ul>
    );
}
