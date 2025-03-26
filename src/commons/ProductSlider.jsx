import React, { useState } from 'react';
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";
import { FaStar } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import Image from './Image.jsx';

export default function ProductSlider({slideArray, ulClassName, liClassName, className}) {
    const [ counter, setCounter ] = useState(0); // 인덱스
    const maxCount = Math.ceil(slideArray.length / 3) - 1; // 최대 슬라이드 개수 (한 화면에 3개씩)

    // 화살표 버튼 이벤트
    const handleSlideBtn = (value) => {
        value === 'prev' && counter > 0 && setCounter(counter - 1);
        value === 'next' && counter < maxCount && setCounter(counter + 1);
    }



    return (
        <div className='productSlide-content-wrap'>
            
                <button className='productSlide-prev-button' onClick={() => handleSlideBtn('prev')}>
                    <IoIosArrowBack />
                </button>
            <div className='productSlide-contents'>
                <ul className={ulClassName}>
                    { slideArray && slideArray.map((item) => 
                        <li className={liClassName}
                            style={{
                                transform : `translateX(-${326 * counter}%)`,
                                transition: 'all 0.4s ease-in-out'
                            }}>
                            <a href={`/detail/${item.pid}`}>
                                <div className={`${className}-img`}>
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
                            </a>
                        </li>
                    ) }
                </ul>
            </div>
            <button className='productSlide-next-button' onClick={() => handleSlideBtn('next')}>
                    <IoIosArrowForward />
            </button>
                
        </div>
    );
}
