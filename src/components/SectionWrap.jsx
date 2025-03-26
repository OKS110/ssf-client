import React, {useContext, useEffect, useState} from 'react';
import axios from 'axios';
import ProductBlock from '../commons/ProductBlock';
import { IoIosArrowForward } from "react-icons/io";
import { ProductContext } from '../context/ProductContext.js';
import { useProduct } from '../hooks/useProduct.js';
import ProductSlider from '../commons/ProductSlider.jsx';

export default function SectionWrap({id, title, children}) {
    const { productList, detailList, rankList, category, subCategory, setCategory, setSubCategory } = useContext(ProductContext); // 전역 관리
    const { getFilterProducts } = useProduct();

    const [issueList, setIssueList] = useState([]); // 브랜드 이슈 리스트

    const tabList = [
        { tabName: "상의" },
        { tabName: "하의" },
        { tabName: "아우터" },
        { tabName: "신발" }
    ];
    const tabList2 = [
        { tabName: "코트" },
        { tabName: "스웨터" },
        { tabName: "티셔츠" },
        { tabName: "블라우스" },
        { tabName: "셔츠" },
        { tabName: "니트" },
        { tabName: "청바지" },
        { tabName: "슬랙스" },
    ];
    
    useEffect(() => {
        // 필터링 완료된 상품 데이터 호출
        getFilterProducts(category, subCategory);
    }, [category, subCategory]);
    
    // 이 주의 브랜드 이슈
    useEffect(() => {
        axios
            .get("/data/weekly_issue.json")
            .then(res => setIssueList(res.data))
            .catch(error => console.log(error));
    }, []);

    const brand1 = productList.filter((list) => list.brand === "NIKE");
    const brand2 = productList.filter((list) => list.brand === "GUCCI");
    const brand3 = productList.filter((list) => list.brand === "BEANPOLE");


    return (
        <section id={id}>
            <h2>{title}</h2>
            {id === "event" && 
            // Event
                <ul class="ssf-events">
                <li>
                            <a href="" 
                            >
                                <div class="item-img">
                                    <img src="https://img.ssfshop.com/display/category/THM/A30/A16/contents/23369_345896_34_KOR_20250131115729.png"
                                     alt="2월 웰컴딜" class="swiper-lazy swiper-lazy-loaded"/>
                                </div>
                                <div class="item-info">
                                    <p class="tit">아직 구매한 적 없으시다면</p>
                                    <p class="desc">첫 구매 최대 90% 할인 받아가세요</p>
                                </div>
                            </a>
                        </li>
                    <li>
                            <a href="" onclick="cnrClickLoging('23369','2','2','/event/EV202501160146633/view');">
                                <div class="item-img">
                                    <img src="https://img.ssfshop.com/display/category/THM/A30/A16/contents/23369_345896_32_KOR_20241227160250.jpg" alt="친구초대" class="swiper-lazy swiper-lazy-loaded"/>
                                </div>
                                <div class="item-info">
                                    <p class="tit">친구에게 SSF샵을 추천해주세요</p>
                                    <p class="desc">무제한 2천 코인을 챙겨드려요</p>
                                </div>
                            </a>
                        </li>
                    <li>
                            <a href="/event/EV202407240143309/view?utag=ref_tpl:111942$ref_cnr:23369$set:2$dpos:3" onclick="cnrClickLoging('23369','2','3','/event/EV202407240143309/view');">
                                <div class="item-img">
                                    <img src="https://img.ssfshop.com/display/category/THM/A30/A16/contents/23369_345896_3_KOR_20240306114543.jpg" alt="앱첫로그인" class="swiper-lazy swiper-lazy-loaded"/>
                                </div>
                                <div class="item-info">
                                    <p class="tit">앱에서 첫 로그인하고 쿠폰 받으세요</p>
                                    <p class="desc">1만원 쿠폰 즉시 지급</p>
                                </div>
                            </a>
                        </li>
                    </ul>
            }
            {id === 'newSense' && 
            <div className='contents-box god-lists' >
                <ul className='category-select'>
                    { tabList && tabList.map((list) => 
                        <li className={list.tabName === category ? 'category-select-click-tabMenu' : 'category-select-tabMenu'}
                            onClick={() => setCategory(list.tabName)}>
                        {list.tabName}
                        </li>
                    ) }
                </ul>
                <ProductBlock detailList={detailList} ulClassName="category-tab" liClassName="category-tab-list" className="category-list" />
            </div>
            }
            { 
                id === 'rank' &&
                <div className='contents-box god-lists'>
                    <ul className='sub-category-select'>
                        { tabList2 && tabList2.map((list) => 
                            <li className={list.tabName === subCategory ? 'sub-category-select-click-tabMenu' : 'sub-category-select-tabMenu'}
                                onClick={() => setSubCategory(list.tabName)}>
                            {list.tabName}
                            </li>
                        ) }
                    </ul>
                    <ProductBlock detailList={rankList} ulClassName="sub-category-tab" liClassName="sub-category-tab-list" className="sub-category-list" />
                    <button type='button' className='sub-category-btn'>랭킹 바로가기<IoIosArrowForward /></button>
                </div>
            }
            {
                id === "brands" &&
                <div className='contents-box god-lists'>
                    <div className='hotBrand-container'>
                        <div className='hotBrand-img'>
                            <img src="/image/nike.png" alt="" />
                        </div>
                        <ProductSlider slideArray={brand1} ulClassName="hotBrand-tab" liClassName="hotBrand-tab-list" className="hotBrand-list" />
                    </div>
                    <div className='hotBrand-container'>
                        <div className='hotBrand-img'>
                            <img src="/image/example.jpg" alt="" />
                        </div>
                        <ProductSlider slideArray={brand2} ulClassName="hotBrand-tab" liClassName="hotBrand-tab-list" className="hotBrand-list" />
                    </div>
                    <div className='hotBrand-container'>
                        <div className='hotBrand-img'>
                            <img src="/image/beanpole.webp" alt="" />
                        </div>
                        <ProductSlider slideArray={brand3} ulClassName="hotBrand-tab" liClassName="hotBrand-tab-list" className="hotBrand-list" />
                    </div>
                </div>
            }
            {
                id === "issue" &&
                <>
                <div className='contents-box god-lists'>
                    <ul className='issue-section'>
                        { issueList && issueList.map((list) => 
                            <li className='issue-list'>
                                <div className='issue-list-img'>
                                    <img src={list.img} alt="image" />
                                </div>
                                <div className='issue-list-info'>
                                    <p className='issue-list-info-des'>
                                        {list.description.split("\n").map((item) => 
                                            <p>{item}</p>
                                        )}
                                    </p>
                                    <p className='issue-list-info-brand'>{list.brand}</p>
                                </div>
                            </li>
                        ) }
                    </ul>
                </div>

                </>
            }
            {children}
        </section>
    );
}