import { useState, useEffect } from "react";
import ReviewSmallTab from "./ReveiwSmallTab.jsx";
import ReviewBanner from "./ReviewBanner.jsx";
import { FaAngleLeft } from "react-icons/fa6";
import { FaAngleRight } from "react-icons/fa";
import { FaAnglesRight } from "react-icons/fa6";
import { FaAnglesLeft } from "react-icons/fa6";
import ReviewFilterTab from "./ReviewFilterTab.jsx";

export default function Review({reviews }) {
    const [currentPage, setCurrentPage] = useState(1); //  현재 페이지 상태
	const [sortedReviews, setSortedReviews] = useState([...reviews]); //  정렬된 리뷰 상태
	const [selectedSort, setSelectedSort] = useState("lately"); //  선택된 정렬 옵션 상태 추가

    const reviewsPerPage = 5; //  한 페이지당 5개의 리뷰
    const pagesPerGroup = 5; //  페이지네이션 그룹 (1~5, 6~10, ...)
    const totalPages = Math.ceil(sortedReviews.length / reviewsPerPage); //  총 페이지 개수

    //  현재 페이지 그룹 계산
    const currentGroup = Math.ceil(currentPage / pagesPerGroup); // 현재 페이지가 속한 그룹
    const startPage = (currentGroup - 1) * pagesPerGroup + 1; // 현재 그룹의 첫 번째 페이지
    const endPage = Math.min(startPage + pagesPerGroup - 1, totalPages); // 현재 그룹의 마지막 페이지

    //  현재 페이지의 리뷰 목록을 가져오기
   //  현재 페이지의 리뷰 목록을 가져오기 (sortedReviews에서 slice)
   	const indexOfLastReview = currentPage * reviewsPerPage;
   	const indexOfFirstReview = indexOfLastReview - reviewsPerPage;
   	const currentReviews = sortedReviews.slice(indexOfFirstReview, indexOfLastReview);

	//  정렬 함수
    const handleSortChange = (sortType) => {
        let sortedData = [...reviews]; // 원본 데이터 유지
        if (sortType === "lately") {
            sortedData.sort((a, b) => new Date(b.created_at) - new Date(a.created_at)); // 최신순 정렬
        } else if (sortType === "top") {
            sortedData.sort((a, b) => b.rating - a.rating); // 높은 평점순 정렬
        } else if (sortType === "low") {
            sortedData.sort((a, b) => a.rating - b.rating); // 낮은 평점순 정렬
        }
        setSortedReviews(sortedData);
        setCurrentPage(1); // 정렬 변경 시 첫 페이지로 이동
		setSelectedSort(sortType); //  선택된 정렬 옵션 업데이트
    };
	//  reviews가 변경될 때마다 정렬 상태 업데이트
    useEffect(() => {
        setSortedReviews([...reviews]); // 원본 리뷰 리스트로 초기화
    }, [reviews]);

    //  페이지 변경 핸들러
    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };
    //  가장 처음 페이지로 이동
    const goToFirstPage = () => {
        setCurrentPage(1);
    };
    //  이전 페이지 그룹으로 이동
    const goToPreviousGroup = () => {
        setCurrentPage(Math.max(1, startPage - pagesPerGroup));
    };
    //  다음 페이지 그룹으로 이동
    const goToNextGroup = () => {
        setCurrentPage(Math.min(totalPages, startPage + pagesPerGroup));
    };
    //  가장 마지막 페이지로 이동
    const goToLastPage = () => {
        setCurrentPage(totalPages);
    };
	
    return (
        <div style={{ height: "auto", marginBottom:"100px"}}>
            <ReviewBanner />
            <div className="gods-bx-wrap" id="searchGoodsReviewListCond">
                <div className="bx-top">
                    <h3>상품리뷰 <em>({reviews.length})</em></h3>
                </div>
                <div className="gods-review-area">

                    <div className="list-leadin opt-check">
                        <ReviewSmallTab onSortChange={handleSortChange} selectedSort={selectedSort}/>
                        <ReviewFilterTab />
                    </div>
                    {/*  리뷰 리스트 UI */}
                    <div className="review-detail-lists" id="searchGoodsReviewList">
                        <ul>
                            {currentReviews.map((review) => (
                                <li key={review.review_id}>
                                    <div className="list-status">
                                        <span className={`rate point${review.rating}`}>
                                            {[...Array(Number(review.rating))].map((_, i) => (
                                                <i key={i} aria-label="star"></i>
                                            ))}
                                        </span>
                                    </div>

                                    <div className="list-content">
                                        <div className="review-contents single">
                                            <p className="review-txts">{review.review_text}</p>
                                        </div>
                                    </div>
                                    <span className="list-id">{review.email}</span>
                                    <span className="list-date">{new Date(review.created_at).toLocaleDateString()}</span>
                                </li>
                            ))}
                        </ul>

                        {/*  페이지네이션 UI (리뷰 개수 5개 이상일 때만 버튼 표시) */}
                        {totalPages > 1 && (
                            <div className="page">
                                <button onClick={goToFirstPage} disabled={currentPage === 1}><FaAnglesLeft /></button>
                                <button onClick={goToPreviousGroup} disabled={currentPage === 1}><FaAngleLeft /></button>

                                {[...Array(endPage - startPage + 1)].map((_, i) => {
                                    const pageNumber = startPage + i;
                                    return (
                                        <button 
                                            key={pageNumber}
                                            className={currentPage === pageNumber ? "on" : ""}
                                            onClick={() => handlePageChange(pageNumber)}
                                        >
                                            {pageNumber}
                                        </button>
                                    );
                                })}
                                <button onClick={goToNextGroup} disabled={currentPage === totalPages}><FaAngleRight /></button>
                                <button onClick={goToLastPage} disabled={currentPage === totalPages}><FaAnglesRight /></button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
