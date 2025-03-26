export const handleOrderSubmit = async ({
    formData, 
    isVerified, 
    isAuthorized, 
    isAgreed, 
    pidItem, 
    count, 
    selectedSize, 
    selectColor, 
    selectedPayMethod, 
    customer, 
    location, 
    cartOrderItems, 
    handleKakaoPayment, 
    saveToOrder, 
    saveGuestOrder, 
    deleteOrderedCartItems, 
    setIsModalOpen
}) => {
    if (!isVerified) {
        alert("휴대폰 인증을 먼저 완료해주세요.");
        return;
    }

    if (!isAgreed) {
        alert("구매 동의에 체크해주세요.");
        return;
    }

    let orderDataList = [];
    let totalOrderPrice = 0;  // 총 주문 금액 (배송비 포함 전)

    if (pidItem) { //개별 주문 시
        const productTotalPrice = (Number(pidItem.saleprice.replace(/,/g, "")) || 0) * count;
        totalOrderPrice += productTotalPrice;
        
        // 배송비 설정 (기본 3,000원, free이면 0원)
        let deliveryFee = pidItem.deliveryFee === "free" ? 0 : 3000;

        orderDataList.push({
            brand: pidItem?.brand || "브랜드 정보 없음",
            title: pidItem?.title || "상품명 없음",
            total_price: productTotalPrice + deliveryFee, // 배송비 포함
            size: selectedSize,
            color: selectColor,
            quantity: count || 1,
            zipcode: formData.zipcode || null,
            shipping_address: formData.address || null,
            delivery_message: formData.message || null,
            detail_address: formData.detail_address || null,
            status: "Pending",
            refund_amount: 0,
            payment_method: selectedPayMethod || null,
            delivery_fee: deliveryFee
        });
    }

    if (isAuthorized && location.pathname === "/cart/order" && cartOrderItems.length > 0) { //장바구니 구매 시
        const validCartOrders = cartOrderItems.map(item => {
            const itemTotalPrice = Number(item.discounted_price) * item.quantity;
            totalOrderPrice += itemTotalPrice;

            // 배송비 설정 (기본 3,000원, free이면 0원)
            let deliveryFee = item.delivery_fee === "free" ? 0 : 3000;

            return {
                product_id: item.product_id,
                brand: item.brand || "브랜드 정보 없음",
                title: item.name || "상품명 없음",
                total_price: itemTotalPrice + deliveryFee, // 배송비 포함
                size: item.size,
                color: item.color,
                quantity: item.quantity,
                zipcode: formData.zipcode || null,
                shipping_address: formData.address || null,
                delivery_message: formData.message || null,
                detail_address: formData.detail_address || null,
                status: "Pending",
                refund_amount: 0,
                payment_method: selectedPayMethod || null,
                delivery_fee: deliveryFee
            };
        });
        orderDataList = [...validCartOrders];
    }
    //  39,900원 이상이면 배송비를 0원으로 조정 (주문 목록 수정)
    if (totalOrderPrice >= 39900) {
        orderDataList = orderDataList.map(order => ({
            ...order,
            total_price: order.total_price - order.delivery_fee, // 배송비 차감
            delivery_fee: 0
        }));
    }

    try { 
        let guestData = null;
        if (!isAuthorized) { //비회원 주문 시
            guestData = {
                name: formData.name,
                phone: formData.phone,
                email: formData.email,
                address: formData.address,
                zipcode: formData.zipcode,
                detail_address: formData.detail_address
            };
        }

        if (orderDataList[0]?.payment_method === "kakao") { //카카오 페이 결제 시
            await handleKakaoPayment(orderDataList, isAuthorized ? customer : guestData);
        }
        if (isAuthorized) { //회원 주문 시
            await saveToOrder(orderDataList.map(order => ({
                ...order, 
                customer_id: customer.customer_id 
            })));
            await deleteOrderedCartItems(customer.customer_id, orderDataList); //장바구니 아이템 삭제
        } else {
            await saveGuestOrder(guestData, orderDataList); // 비회원 주문 시
        }
        setIsModalOpen(true); // 모달창 오픈
    } catch (error) {
        console.error("ERROR 주문 처리 중 오류 발생:", error);
    }
};
