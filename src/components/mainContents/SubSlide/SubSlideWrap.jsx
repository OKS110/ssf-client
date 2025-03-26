import axios from "axios";
import { useEffect, useState } from "react";

export default function SubSlideWrap(){
    const [ dataList, setDataList ] = useState([]);

    useEffect(() => {
        axios.get("/data/main.json")
            .then(res => setDataList(res.data.subSlide))
            .catch(err => console.log(err));
    }, []);


    return (
    <>
    { dataList && dataList.map((list) => 
        <div className="swiper-slide swiper-slide-active" role="group" aria-label="1 / 8" style={{"width": "692px", "marginRight": "16px"}}>
            <div className="gods-area">
                <div className="gods-main subSlide-left-wrap">
                    <a href="#" >
                        <div className="gods-img">
                            <img src={list.mainImage} alt="" className="swiper-lazy swiper-lazy-loaded" />
                            <div className="gods-desc">
                                <p className="tit">{list.tit}</p>
                                <p className="desc">{list.desc}</p>
                            </div>
                        </div>
                    </a>
                </div>
                <div className="gods-list">
                    { list.items.map((item) => 
                        <div className="gods-item" view-godno="GM0024122750066">
                            <a href="#">
                                <div className="gods-img subSlide-subimage">
                                    <img className="swiper-lazy swiper-lazy-loaded" src={item.subImage} />
                                </div>
                                <div className="gods-info">
                                    <p className="brand">{item.brand}</p>
                                    { item.name.split("\n").map((tit) =>
                                        <p className="name">{tit}</p>
                                    ) }
                                    <p className="price">
                                        <p className="wa_hidden">{item.oprice}</p>
                                        <span className="wa_hidden">{item.dprice}</span>
                                    </p>
                                </div>
                            </a>
                        </div>
                    ) }
                </div>
            </div>
        </div>
    ) }
    </>
    );
}