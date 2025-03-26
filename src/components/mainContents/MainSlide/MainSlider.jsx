import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Slider from "react-slick"; //react-slick 슬라이더 설정
import { PrevArrow, NextArrow } from './Arrows.jsx'
import '../../../slider/slick.css';
import '../../../slider/slick-theme.css';

export default function MainSlider() {
    const [dataList, setDataList] = useState([]);

    useEffect(() => {
        axios.get("/data/main.json")
            .then(res => setDataList(res.data.mainTopSlide))
            .catch(err => console.log(err));
    }, []);

    const settings = {
        dots: false,          // 하단 네비게이션 점 비활성화
        infinite: true,       // 무한 루프
        speed: 500,           // 슬라이드 속도 (500ms)
        slidesToShow: 1,      // 한 번에 보여줄 슬라이드 개수
        slidesToScroll: 1,    // 한 번에 스크롤할 슬라이드 개수
        arrows: true,         // 이전/다음 화살표 표시
        prevArrow: <PrevArrow />, // 커스텀 이전 화살표
        nextArrow: <NextArrow />, // 커스텀 다음 화살표
        autoplay: true,       // 자동 슬라이드 활성화
        autoplaySpeed: 3000,  // 자동 슬라이드 속도 (3초)
        pauseOnHover: true,   // 마우스를 올리면 자동 슬라이드 일시 정지
    };

    return (
        <>
        <Slider {...settings}>
            { dataList && dataList.map((array) => 
                <div className='mainSlider-wrap'>
                    <ul className='mainSlider-list'>
                        { array.items.map((list) => 
                            <li>
                                <a href="/">
                                    <img src={list.img} alt="" className='mainSlider-img' />
                                    <div className="mainSlider-info">
                                        <div>
                                            <p className="mainSlider-info-brand-tit">{list.name}</p>
                                            <p className="mainSlider-info-brand-name">
                                                { list.tit.split("\n").map((tit) => 
                                                <p>{tit}</p>
                                                ) }
                                            </p>
                                            <p className="mainSlider-info-brand-desc">
                                                { list.desc.split("\n").map((desc) => 
                                                <p>{desc}</p>
                                                ) }
                                            </p>
                                        </div>
                                    </div>
                                </a>
                            </li>
                        ) }
                    </ul>
                </div>
            ) }
        </Slider>
        
        </>
    );
}