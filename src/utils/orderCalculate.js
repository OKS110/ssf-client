

// 장바구니 상품 금액 계산 함수
export const calculateOrderSummary = (items) => {
    let totalPrice = 0;
    let totalDiscount = 0;
    let totalDeliveryFee = 0;
    let finalPrice = 0;

    items.forEach((item) => {
        const originalPrice = Number((item.original_price || "0").toString().replace(/,/g, "")) * (item.quantity || 1);
        const discountedPrice = Number((item.discounted_price || "0").toString().replace(/,/g, "")) * (item.quantity || 1);
        const discountAmount = originalPrice - discountedPrice;

        totalPrice += originalPrice;
        totalDiscount += discountAmount;
        totalDeliveryFee += item.delivery_fee === "free" ? 0 : 3000; //    `deliveryFee` 반영
    });

    finalPrice = totalPrice + totalDeliveryFee - totalDiscount;

    return { totalPrice, totalDiscount, totalDeliveryFee, finalPrice };
};
