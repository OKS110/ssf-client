export default function OrderGrayBox({ orderItems = [] }) {
    //  상품 총 가격(정가 기준), 할인 금액, 배송비 변수 선언
    let totalPrice = 0;
    let totalDiscount = 0;
    let totalDeliveryFee = 0;
    let finalPrice = 0;

    //  주문 상품 목록을 돌면서 총합 계산
    orderItems.forEach((item) => {
        const originalPrice = Number(item.original_price || 0) * Number(item.quantity || 1);
        const discountedPrice = Number(item.discounted_price || 0) * Number(item.quantity || 1);
        const discountAmount = originalPrice - discountedPrice;
        const deliveryFee = item.delivery_fee === "free" ? 0 : 3000; //  배송비 계산

        totalPrice += originalPrice;
        totalDiscount += discountAmount;
        totalDeliveryFee += deliveryFee;
    });

    //  최종 결제 금액 계산
    finalPrice = totalPrice + totalDeliveryFee - totalDiscount;
    if (finalPrice >= 39900) {
        totalDeliveryFee = 0;
        finalPrice = totalPrice - totalDiscount; // 배송비 제외 후 재계산
    }
    return (
        <div className="gray_box">
            <h5>스토어 주문금액 합계</h5>
            <p>
                <span className="accounts">
                    상품금액 <em>{totalPrice.toLocaleString()}</em>원
                    &nbsp;&nbsp;+&nbsp;&nbsp;
                    배송비 <em>{totalDeliveryFee.toLocaleString()}원</em>
                    &nbsp;&nbsp;-&nbsp;&nbsp;
                    할인금액 <em>{totalDiscount.toLocaleString()}</em>원
                </span>
                <span className="price">
                    <em>{finalPrice.toLocaleString()}</em>원
                    <span className="shipping_cost">
                        {finalPrice >= 39900 ? "39,900원 이상 무료배송" : "배송비 적용됨"}
                    </span>
                </span>
            </p>

            {/*  주문 상품 목록 표시 */}
            <h5>주문 상품 목록</h5>
            <ul>
                {orderItems.length > 0 ? (
                    orderItems.map((item, index) => (
                        <li key={index}>
                            {item.brand} - {item.name} ({item.size}, {item.color}) x {item.quantity}개
                        </li>
                    ))
                ) : (
                    <li>주문할 상품이 없습니다.</li>
                )}
            </ul>
        </div>
    );
}
