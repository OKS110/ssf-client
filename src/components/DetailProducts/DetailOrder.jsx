import { CiCircleQuestion } from "react-icons/ci";
import { useState, useEffect, useContext } from "react";
import { DetailProductContext } from "../../context/DetailProductContext";
import { AuthContext } from "../../auth/AuthContext.js";
import { useCart } from "../../hooks/useCart.js";
import { useNavigate } from "react-router-dom";

export default function DetailOrder({ pid, pidItem, averageRating, reviewsLength }) {
    const { isLoggedIn } = useContext(AuthContext);
    const navigate = useNavigate();

    //  pidItem.size, pidItem.color가 undefined일 경우 빈 배열 할당
    const sizePidItemList = pidItem?.size || [];
    const colorPidItemList = pidItem?.color || [];

    const { count, setCount, selectColor, setSelectColor, selectedSize, setSelectedSize, cartList, userId } = useContext(DetailProductContext);
    const { saveToCart, getCartItems, updateDetailQty } = useCart();

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token && !token.startsWith("guest_token_")) {
            getCartItems();
        }
    }, []);

    // 상품 수량, 색상, 사이즈 선택 시
    const handleCount = (e, type) => {
        e.preventDefault();
        if (type === "decrease" && count > 1) {
            setCount(count - 1);
        } else if (type === "increase") {
            setCount(count + 1);
        }
    };
    const handleColorSelect = (color) => {
        setSelectColor(color);
    };
    const handleSizeSelect = (size) => {
        setSelectedSize(size);
    };

    //  회원 전용 장바구니 로직
    const addCart = () => {
        if (!isLoggedIn) return;
        if (!selectedSize || !selectColor) {
            alert("색상과 사이즈를 선택해주세요.");
            return;
        }
        const formData = {
            id: userId,
            pid: pid,
            count: count,
            color: selectColor,
            size: selectedSize
        };
        const findItem = cartList?.find((item) =>  // 장바구니에 같은 정보의 상품이 있는지 확인
            item.product_id === pidItem.pid &&
            item.size === selectedSize &&
            item.color === selectColor
        );
        if (findItem) {
            updateDetailQty(findItem.cid, findItem.size, findItem.color, findItem.quantity + count); //옵션 업데이트
        } else {
            saveToCart(formData);
        }
        //  바로구매 관련 sessionStorage 데이터 초기화
        sessionStorage.removeItem("pid");
        sessionStorage.removeItem("selectedColor");
        sessionStorage.removeItem("selectedSize");
        sessionStorage.removeItem("selectedCount");
        sessionStorage.removeItem("DirectOrder");

        const confirmMove = window.confirm("장바구니에 상품이 담겼습니다.\n장바구니로 이동하시겠습니까?");
        if (confirmMove) navigate("/carts");
    };



    //  바로구매 로직
    const handleDirectPurchase = () => {
        if (!selectedSize || !selectColor) {
            alert("색상과 사이즈를 선택해주세요.");
            return;
        }
        if (!isLoggedIn) {
            const confirmLogin = window.confirm("로그인 하시겠습니까? (취소 시 비회원 구매 페이지로 이동)");
            if (confirmLogin) {
                sessionStorage.setItem('DirectOrder', true); // 바로구매에서 login으로 이동 확인
                navigate('/login');
            } else {
                navigate(`/order/${pidItem?.pid}`);
            }
        } else {
            navigate(`/order/${pidItem?.pid}`);
        }
    };

    return (
        <div className="godsInfo-area">
            <div className="tags">
                <span>{pidItem?.deliveryFee === "free" ? '무료배송' : "유료배송 3000원"}</span>
            </div>
            <h2 className="brand-name">
                <a href="#">{pidItem?.brand}</a>
            </h2>
            <div className="gods-name">{pidItem?.title}</div>

            <div className="price-info">
                <span className="gods-price">
                    <span className="cost">
                        <del>{pidItem?.costprice}</del>
                    </span>
                    <span className="sale">
                        <span className="discount">{pidItem?.discount}%</span>
                        <span className="price">{pidItem?.saleprice}원</span>
                        <CiCircleQuestion />
                    </span>
                </span>
                <button className="btn bk sm">
                    <span>쿠폰다운</span>
                </button>
            </div>

            <div className="review-info">
                <span className="point"><i aria-label="rate"></i><span>{averageRating}</span></span>
                <a href="#">리뷰 <span>{reviewsLength}</span>건</a>
            </div>

            <div className="goods-info-middle">
                <ul>
                    <li>
                        <span>카드혜택</span>
                        <span>카드사별 혜택 안내</span>
                        <a href="#">자세히보기</a>
                    </li>
                    <li>
                        <span>기프트포인트</span>
                        <span>멤버십 고객 한정 최대 47,900원 할인(10%)</span>
                        <a href="#">자세히보기</a>
                    </li>
                    <li>
                        <span>배송방법</span>
                        <span>{pidItem?.deliveryFee === "free" ? '무료배송' : "유료배송 3000원"}</span>
                        <a href="#">배송방법 더보기</a>
                    </li>
                </ul>
            </div>

            <div className="goods-info-bottom">
                <div className="goods-info-bottom-color">
                    <span>색상</span>
                    <ul>
                        {colorPidItemList.length > 0 ? colorPidItemList.map((color, index) => (
                            <li key={index}
                                style={{
                                    backgroundColor: color,
                                    border: selectColor === color ? "2px solid var(--gray600)" : "2px solid var(--gray350)",
                                }}
                                onClick={() => handleColorSelect(color)}>
                            </li>
                        )) : <li>색상 옵션 없음</li>}
                    </ul>
                </div>

                <div className="goods-info-bottom-size">
                    <span>사이즈</span>
                    <ul>
                        {sizePidItemList.length > 0 ? sizePidItemList.map((size, index) => (
                            <li key={index}
                                style={{
                                    border: selectedSize === size.name ? "2px solid var(--gray600)" : "2px solid var(--gray350)",
                                    cursor: "pointer",
                                }}
                                onClick={() => handleSizeSelect(size.name)}>  {/*  객체에서 name 값을 추출하여 저장 */}
                                {size.name}
                            </li>
                        )) : <li>사이즈 옵션 없음</li>}
                    </ul>
                </div>
            </div>

            <div className="goods-info-count-price">
                <div className="goods-info-count">
                    <button onClick={(e) => handleCount(e, "decrease")}>-</button>
                    <button>{count}</button>
                    <button onClick={(e) => handleCount(e, "increase")}>+</button>
                </div>
                <div className="goods-info-price">
                    <span>{pidItem?.saleprice}</span>
                    <span>원</span>
                </div>
            </div>

            <div className="goods-info-btns">
                <button
                    onClick={addCart}
                    disabled={!isLoggedIn || (localStorage.getItem('token')?.startsWith('guest_'))}
                    style={{
                        backgroundColor: isLoggedIn && !(localStorage.getItem('token')?.startsWith('guest_')) ? "black" : "gray",
                        color: "white",
                        cursor: isLoggedIn && !(localStorage.getItem('token')?.startsWith('guest_')) ? "pointer" : "not-allowed"
                    }}
                >
                    장바구니
                </button>

                <button onClick={handleDirectPurchase}>
                    바로구매
                </button>
            </div>
        </div>
    );
}
