import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
// import 'slick-carousel/slick/slick-theme.css';

export default function SlideWrap(){
    const [ testList, setTestList ] = useState([]);

    useEffect(() => {
        axios.get("/data/main.json")
            .then(res => setTestList(res.data.mainTopSlide))
            .catch(error => console.log(error));
    }, []);

    return (
        <>
        { testList && testList.map((array) => 
            <div className="swiper-slide"
                    style={{"width": "100%"}}>
                <div className="slide-lists">
                {array.items.map((item) => 
                    <div className="slide-item">
                        <a href="#">
                            <div className="brand-info-area">
                                <p className="brand-name">{item.name}</p>
                                <p className="brand-tit">{item.tit}</p>
                                <p className="brand-desc">{item.desc}</p>
                            </div>
                            <img 
                                className="swiper-lazy swiper-lazy-loaded" 
                                src={item.img}
                                alt="" 
                            />
                        </a>
                    </div>
                )}
                </div>
            </div> 
        ) }

        </>
    );
}