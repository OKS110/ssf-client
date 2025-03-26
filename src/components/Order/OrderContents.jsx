import React from "react";
import Button from "../../commons/Button.jsx";
import OrderGrayBox from "../Carts/OrderGrayBox.jsx";
import PayOption from "../PayOption.jsx";
import OrderForm from './OrderForm.jsx';
import { useLocation } from "react-router-dom";

export default function OrderContents({ 
    handleOrderSubmit, 
    setSelectedPayMethod, 
    refs,
    formData,
    setFormData,
    isAgreed, //  구매 동의 상태 추가
    setIsAgreed, //  부모에서 전달받아 업데이트
    totalPrice,
    totalDiscount,
    totalDeliveryFee,
    orderItemsToContent
}) {
    const location = useLocation();
    //  특정 경로에 따라 OrderGrayBox 숨기기
    const shouldHideOrderGrayBox = location.pathname.startsWith("/order/");

    //  입력 값 초기화 함수
    const resetForm = () => {
        setFormData({ name: "", phone: "", email: "", zipcode: "", address: "", detail_address: "", message: "" });
        console.log("입력값 초기화 완료");
    };

    //  구매 동의 체크박스 핸들러
    const handleCheckboxChange = (event) => {
        setIsAgreed(event.target.checked); // 부모 상태 업데이트
    };

    return (
        <>
            {/* 주문서 입력 폼 */}
            <OrderForm formData={formData} setFormData={setFormData} resetForm={resetForm} refs={refs} />

            {/* 결제 수단 선택 */}
            <PayOption onPaymentMethodChange={setSelectedPayMethod} />

            {!shouldHideOrderGrayBox && <OrderGrayBox totalPrice={totalPrice} 
                        totalDiscount={totalDiscount} 
                        totalDeliveryFee={totalDeliveryFee} 
                        orderItems={orderItemsToContent}/>
            }
            {/* 구매 동의 체크박스 */}
            <span className="checkbox">
                <input 
                    className="dis-check" 
                    id="btnAgreePurchase" 
                    type="checkbox" 
                    checked={isAgreed}
                    onChange={handleCheckboxChange}
                />
                <label htmlFor="btnAgreePurchase"><i></i>구매 동의 (필수)</label>
            </span>

            {/* 결제하기 버튼 */}
            <div className="submit_order etc">
                <p>위 주문 내용을 확인하였으며 결제에 동의합니다.</p>
                <Button 
                    className="bk" 
                    title="결제하기" 
                    onClick={(e) => handleOrderSubmit(e, formData, isAgreed)} //  구매 동의 상태 전달
                />
            </div>
        </>
    );
}
