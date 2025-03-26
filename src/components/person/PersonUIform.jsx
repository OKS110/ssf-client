import React from 'react';
import { Link } from "react-router-dom";

export default function PersonUIform() {

    return (
                <nav className="mypage-bottom-left">
                    <h3>주문관리</h3>
                    <ul>
                        <li><Link to='/person'>주문/교환/반품/취소 내역</Link></li>
                        <li><a href="">매장 구매내역</a></li>
                    </ul>
                    <h3>나의 혜택</h3>
                    <ul>
                        <li><a href="">쿠폰</a></li>
                        <li><a href="">멤버십 포인트</a></li>
                        <li><a href="">퍼플코인</a></li>
                        <li><a href="">기프트 포인트</a></li>
                    </ul>
                    <h3>나의 활동</h3>
                    <ul>
                        <li><a href="">상품리뷰</a></li>
                        <li><a href="">상품Q&A</a></li>
                        <li><a href="">최근 본 상품</a></li>
                        <li ><a href="">위시리스트</a></li>
                        <li><a href="">재입고 알림</a></li>
                        <li><a href="">이벤트 참여내역</a></li>
                    </ul>
                    <h3>나의 정보</h3>
                    <ul>
                        <li><a href="">회원정보 관리</a></li>
                        <li><a href="">마케팅정보 수신 동의</a></li>
                        <li><a href="">배송지 관리</a></li>
                    </ul>
                    <h3>고객센터</h3>
                    <ul>
                        <li><a href="">1:1문의</a></li>
                        <li><a href="">무료 사이즈 수선</a></li>
                        <li><a href="">A/S 수선</a></li>
                    </ul>
                </nav>
    );
}