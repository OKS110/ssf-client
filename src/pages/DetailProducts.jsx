import { useState, useRef, useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import useFixedScroll from "../hooks/useFixedScroll.js";
import axios from 'axios';
import ProductMypage from "../commons/ProductMypage";
import DetailImage from "../components/DetailProducts/DetailImage";
import DetailOrder from "../components/DetailProducts/DetailOrder";
import DetailTop from "../components/DetailProducts/DetailTop";
import { useProduct } from '../hooks/useProduct.js';
import { ProductContext } from '../context/ProductContext.js';
import GoodsDetail from "../components/DetailProducts/tabsData/GoodsDetail";
import Recommend from "../components/DetailProducts/tabsData/Recommend";
import Review from "../components/DetailProducts/tabsData/Review";
import Size from "../components/DetailProducts/tabsData/Size";
import { DetailProductContext } from '../context/DetailProductContext.js';
import SlideUp from '../commons/SlideUp.jsx';

export default function DetailProducts() {
    const { pidItem } = useContext(ProductContext); // 상품 정보
    const { getPidItem } = useProduct(); //상품 정보 가져오기
    const { pid } = useParams(); //상품 번호
    const { setCount, setSelectColor, setSelectedSize } = useContext(DetailProductContext);
    const [reviews, setReviews] = useState([]);
    const [reviewsLength, setReviewsLength] = useState(0);
    const [averageRating, setAverageRating] = useState(0); //  평균 별점 상태 추가
    // 상품 상세페이지 진입 시 전역 변수(사이즈, 색상, 수량) 초기화
    useEffect(() => {
        setCount(1);  // 수량 초기화
        setSelectColor(0);  // 색상 초기화
        setSelectedSize(0);  // 사이즈 초기화
    }, [pidItem]); // 새로운 상품이 로드될 때 초기화

    useEffect(() => {
        getPidItem(pid);
        sessionStorage.setItem("pid", pid);
    }, []);

    const tabsData = [
        { id: "goodsDetailTab", label: "상품정보", href: "#goodsDetailTabs", content: <GoodsDetail /> },
        { id: "sizeTab", label: "사이즈&핏", href: "#goodsDetailTabs", content: <Size pidItem={pidItem} /> },
        { id: "reviewTab", label: "리뷰", href: "#goodsDetailTabs", content: <Review pid = {pid} setAverageRating={setAverageRating} reviews={reviews}/> },
        { id: "recommendTab", label: "추천", href: "#goodsDetailTabs", content: <Recommend /> }
    ];
    
    const [activeTab, setActiveTab] = useState(tabsData[0]?.id || "");
    const contentRef = useRef(null); // 콘텐츠 위치 추적 Ref
    const { ref: tabRef, isFixed } = useFixedScroll(); // 커스텀 훅 사용하여 스크롤 고정 관리
        //ref를 tabRef로 별칭 사용

    // 탭 클릭 시 해당 콘텐츠로 스크롤 이동
    const handleTabClick = (tabId) => {
        setActiveTab(tabId);
        
        if (contentRef.current) {
            contentRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
        }
    };

    // 현재 활성화된 탭의 콘텐츠 찾기
    const renderContent = () => {
        const activeContent = tabsData.find(tab => tab.id === activeTab);
        return activeContent ? activeContent.content : null; //tabsData의 content 키 활성화
    };

    //  리뷰 데이터를 서버에서 가져오는 함수
    const fetchReviews = async () => {
            try {
                const response = await axios.post("http://3.36.70.100:9000/review/list", { product_id: pid });
                if (response.data.success) {
                    setReviews(response.data.reviews);
                }
                //  별점 평균 계산
                const totalRating = response.data.reviews.reduce((sum, review) => sum + Number(review.rating), 0);
                const avgRating = response.data.reviews.length > 0 ? (totalRating / response.data.reviews.length).toFixed(1) : 0; //toFixed 소수점 1자리까지 계산
    
                setReviewsLength(response.data.reviews.length); //리뷰 길이            
                setAverageRating(avgRating);
            } catch (error) {
                console.error("ERROR 리뷰 데이터를 불러오는 중 오류 발생:", error);
            }
        };
    
    useEffect(() => {
        fetchReviews();
    }, [pid]); // 상품 ID가 변경될 때마다 실행

    return (
        <div className="detail-wrap content-wrap" style={{ position: "relative" }}>
            <DetailTop pidItem={pidItem} pid={pid}/>
            <div className="gods-summary" view-section="summary">
                <DetailImage pidItem={pidItem}/>
                <DetailOrder pid={pid} pidItem={pidItem} averageRating={averageRating} reviewsLength={reviewsLength}/>
            </div>

            {/* 탭 고정 */}
            <div
                ref={tabRef}
                className={`product-mypage-container ${isFixed ? "fixed" : ""}`}
                style={{
                    position: isFixed ? "fixed" : "relative", //useFiexdScroll에서 받아온 isFixed의 불리언 값에 따라 고정 여부 확인
                    top: isFixed ? "0" : "auto",
                    width: "100%",
                    maxWidth: "1440px",
                    zIndex: 1000,
                }}
            >
                {/* 탭 메뉴 */}
                <ProductMypage
                    pidItem={pidItem}
                    tabs={tabsData}
                    activeTab={activeTab}
                    setActiveTab={handleTabClick} // 클릭 시 스크롤 이동 추가
                /> 
            </div>
            {/* 기존 컨텐츠 영역 활용 & 스크롤 이동 */}
            <div ref={contentRef}>
                {renderContent()}
            </div>
            <SlideUp/>
        </div>
    );
}
