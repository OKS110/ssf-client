import { useState } from "react";
import Brands from "./Brands.jsx";

export default function HotBrand(){
    const [ curSlide, setCurSlide ] = useState(0); // 이미지 인덱스 번호

    const moveToSlide = (value) => {
        if (value === 'next' && curSlide < 2) {
            setCurSlide(curSlide + 1);
        }
        if (value === 'prev' && curSlide > 0) {
            setCurSlide(curSlide - 1);
        }
    }

    return (
        <section className="hot-brand">
            <div className="swiper swiper-initialized swiper-horizontal swiper-pointer-events swiper-autoheight swiper-backface-hidden"
                style={{overflow: "hidden"}}>
                <div className="swiper-wrapper" id="swiper-wrapper-513dfba940703eb2"
                    style={{
                        "height": "260px",
                        transform: `translateX(${-100 * curSlide}%)`,
                        transition: 'all 0.4s ease-in-out'
                    }}>
                    <Brands />
                </div>
                

                <div className="swiper-button-control">
                    <div className="swiper-button-prev swiper-button-disabled" 
                     onClick={() => moveToSlide("prev")}>
                    </div>
                    <div className="swiper-pagination swiper-pagination-fraction swiper-pagination-horizontal">
                        <span className="swiper-pagination-current">{curSlide + 1}</span> / <span className="swiper-pagination-total">3</span>
                    </div>
                    <div className="swiper-button-next" 
                    tabindex="0" role="button"  onClick={() => moveToSlide("next")}></div>
                </div>
            <span className="swiper-notification"></span></div>
        </section>
    );
}