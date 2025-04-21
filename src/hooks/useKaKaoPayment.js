import { useState, useRef } from "react";
import axios from "axios";

export const useKakaoPayment = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const isProcessing = useRef(false); //  중복 실행 방지

    const formatTitle = (title) => {
        if (!title || title.length === 0) return ""; // title이 없을 경우 빈 문자열 반환
        const firstTitleWords = title[0].split(" "); //  첫 번째 상품명을 단어 단위로 분리
        const formattedFirstTitle = firstTitleWords.length > 2 ? `${firstTitleWords[0]}...` : title[0]; //  두 단어 이상이면 '두 번째 단어 + ...' 처리
        if (title.length === 1) return title[0]; //  상품이 1개만 있으면 그대로 반환
        return `${formattedFirstTitle} 외 ${title.length - 1}건`; //  첫 번째 상품 + '외 N건'으로 표시
    };

    const handleKakaoPayment = async ( orderDataList, userData) => {
        if (!orderDataList.length || !userData) {
            console.error("ERROR 결제 요청을 위한 데이터가 부족합니다.");
            return;
        }
        if (isProcessing.current) {
            console.warn(" 이미 결제가 진행 중입니다.");
            return;
        }
        isProcessing.current = true;
        setLoading(true);

        try {
            //  주문 목록에서 상품명과 총 가격 계산
            const itemNames = orderDataList.map(order => order.title);
            const totalPrice = orderDataList.reduce((sum, order) => sum + order.total_price, 0);
            if (orderDataList[0].payment_method === "kakao") {
                const isGuest = !userData.customer_id; //  비회원 여부 확인
                const userId = isGuest ? userData.name : userData.customer_id; //  회원이면 customer_id, 비회원이면 name

                const res = await axios.post('http://3.36.70.100:9000/payment/qr', {
                    id: userId,
                    item_name: formatTitle(itemNames), //  상품명 축약
                    total_amount: totalPrice, //  모든 상품 가격 합산
                });

                if (res.data.next_redirect_pc_url) {
                    localStorage.setItem("tid", res.data.tid); //  결제 고유번호(TID) 저장
                    // localStorage.setItem("orderDataList", JSON.stringify(orderDataList)); //  주문 데이터 저장
                    localStorage.setItem("userData", JSON.stringify(userData)); //  사용자 정보 저장
                    window.location.href = res.data.next_redirect_pc_url; //  카카오페이 결제 창으로 이동
                }
            }
        } catch (error) {
            console.error("ERROR 카카오페이 결제 요청 실패:", error);
            setError(error);
        } finally {
            setLoading(false);
        }
    };



    return { handleKakaoPayment, loading, error };
};
