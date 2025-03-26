import React, { useState } from 'react';
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";

export default function ImageSlider({slideArray}) { // 부모 컴포넌트에서 이미지 배열 props로 넘겨 받음
    const [ curSlide, setCurSlide ]= useState(0); // 이미지 인덱스 번호

    const FIRST_SLIDE_INDEX = 0;
    const LAST_SLIDE_INDEX = slideArray.length - 1; // 이미지 슬라이드 끝 번호
    const MOVE_SLIDE_INDEX = 1; // 이미지 슬라이드 이동값

    const moveToSlide = (value) => {
        if (value === 'next') {
            // 슬라이드 마지막에 도달했을 때 curSlide의 값을 바꿔 처음으로 돌아가게 함
            setCurSlide((prevState) => 
                prevState < LAST_SLIDE_INDEX
                ? prevState + MOVE_SLIDE_INDEX
                : FIRST_SLIDE_INDEX
            );
        }
        if (value === 'prev') {
            // 슬라이드 시작점에 도달했을 때 curSlide의 값을 바꿔 마지막으로 돌아가게 함
            setCurSlide((prevState) => 
                prevState > FIRST_SLIDE_INDEX
                ? prevState - MOVE_SLIDE_INDEX
                : LAST_SLIDE_INDEX
            );
        }
    }

    return (
        <div className='train'>
            <button className='prev-button' onClick={() => moveToSlide('prev')}>
                <IoIosArrowBack />
            </button>
            <div className='show'>
                {
                    slideArray && slideArray.map((item) => 
                        <div className='compartment'
                            style={{
                                transform: `translateX(${-1100 * curSlide}px)`,
                                transition: 'all 0.4s ease-in-out'
                            }}>
                            <img src={item.img} alt="" />
                        </div>
                    )
                }
            </div>
            <button className='next-button' onClick={() => moveToSlide('next')}>
                <IoIosArrowForward />
            </button>
        </div>
    );
}