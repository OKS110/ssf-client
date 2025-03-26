import React, { useState } from "react";

export default function PayOption({ onPaymentMethodChange }) {
    // 선택된 결제 수단을 저장하는 상태
    const [selectedPayMethod, setSelectedPayMethod] = useState("CREDT_CARD_PAY"); // 기본값: 신용카드

    // 결제 수단 변경 핸들러
    const handlePaymentChange = (event) => {
        const newPaymentMethod = event.target.value;
        // console.log("선택된 결제 수단:", newPaymentMethod); // 선택된 결제수단 출력
        setSelectedPayMethod(newPaymentMethod);
        onPaymentMethodChange(newPaymentMethod); // 부모에 전달
    };

    return (
        <div>
            <h4 className="payment_tit">결제수단</h4>
            <ul className="pay_with" id="paymentList">
                {[
                    { class: "toss", label: "토스페이", benefit: "3천원 할인" },
                    { class: "naver", label: "네이버페이", benefit: "최대 2.2% 적립" },
                    { class: "kakao", label: "카카오페이" },
                    { class: "payco", label: "페이코" },
                    { class: "CREDT_CARD_PAY", label: "신용카드", checked: true },
                    { class: "VIRTL_BNK_ACCT_PAY", label: "무통장입금" },
                    { class: "RLTM_BNK_ACCT_PAY", label: "계좌이체" },
                    { class: "MOBIL_PON_PAY", label: "휴대폰결제" }
                ].map((payment) => (
                    <li key={payment.class}>
                        <label 
                            className={payment.class} 
                            style={{ 
                                display: "flex", 
                                alignItems: "center", 
                                cursor: "pointer" 
                            }}
                        >
                            <input
                                type="radio"
                                name="payMnCd"
                                id={payment.class}
                                value={payment.class}
                                checked={selectedPayMethod === payment.class}
                                onChange={handlePaymentChange}
                                style={{ display: "none" }} // 기본 라디오 버튼 숨김
                            />
                            <span
                                style={{
                                    display: "inline-block",
                                    padding: "10px",
                                    border: selectedPayMethod === payment.class ? "3px solid gray" : "1px solid var(--gray250)",
                                    borderRadius: "5px"
                                }}
                            >
                                {payment.label}
                            </span>
                            {payment.benefit && (
                                <em 
                                    style={{ 
                                        marginLeft: "10px", 
                                        fontSize: "12px", 
                                        color: "gray" 
                                    }}
                                >
                                    <span>{payment.benefit}</span>
                                </em>
                            )}
                        </label>
                    </li>
                ))}
            </ul>
        </div>
    );
}
