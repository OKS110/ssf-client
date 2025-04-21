import { useContext } from "react";
import { DetailProductContext } from "../context/DetailProductContext.js";
import axios from "axios";

export function useCart() {
    const { cartList, setCartList, setUserId } = useContext(DetailProductContext);

    //  장바구니 내 동일한 상품 찾는 함수 (중복 제거)
    const findExistingItem = (pid, size, color) => {
        return cartList.find(
            (item) => item.product_id === pid && item.size === size && item.color === color
        );
    };

    //  아이디 번호 호출
    const getCustomerId = async () => {
        const id = localStorage.getItem("user_id");
        const result = await axios.post("http://3.36.70.100:9000/cart/getId", { id });

        setUserId(result.data);
        return result.data;
    };

    //  카트 전체 상품 호출 (아이디별)
    const getCartItems = async() => {
        try {
            const id = await getCustomerId();
            const result = await axios.post("http://3.36.70.100:9000/cart/items", { id });

            //  배송비 데이터 추가하여 상태 업데이트
            setCartList(result.data.map(item => ({
                ...item,
                deliveryFee: item.delivery_fee
            })));
        } catch (error) {
            console.error("ERROR 장바구니 데이터를 불러오는 중 오류 발생:", error);
        }
    };

    //  장바구니 상품 추가 (UI 즉시 반영)
    const saveToCart = async (formData) => {
        try {
            const existingItem = findExistingItem(formData.pid, formData.size, formData.color);
            if (existingItem) {
                //  같은 상품, 같은 옵션이 있으면 수량 업데이트
                const updatedQuantity = existingItem.quantity + formData.count;
                await axios.post("http://3.36.70.100:9000/cart/changeQty", {
                    cid: existingItem.cid,
                    count: updatedQuantity
                });
                // 장바구니 업데이트
                setCartList((prevList) =>
                    prevList.map((item) =>
                        item.cid === existingItem.cid ? { ...item, quantity: updatedQuantity } : item
                    )
                );
            } else {
                //  새로운 상품 추가
                const requestData = {
                    ...formData,
                    size: formData.size.toString().trim(),
                    color: formData.color.toString().trim(),
                };
                const response = await axios.post("http://3.36.70.100:9000/cart/add", requestData);
                if (response.data.result_row > 0) {
                    // console.log(" 장바구니에 상품 추가 성공");
                    setCartList((prevList) => [
                        ...prevList,
                        {
                            cid: response.data.cid, 
                            customer_id: formData.id,
                            product_id: formData.pid,
                            quantity: formData.count,
                            size: formData.size,
                            color: formData.color,
                            brand: formData.brand || "브랜드 없음",
                            name: formData.name || "상품명 없음",
                            original_price: formData.original_price,
                            discount_rate: formData.discount_rate,
                            discounted_price: formData.discounted_price,
                            image: formData.image,
                        },
                    ]);
                }
            }
        } catch (error) {
            console.error("ERROR 장바구니 추가 중 오류 발생:", error);
        }
    };

    //  옵션 변경 함수 (사이즈, 색상, 수량 업데이트)
    const updateCartItemOptions = async (cid, newSize, newColor, newQuantity) => {
        try {
            const existingItem = findExistingItem(
                cartList.find((item) => item.cid === cid)?.product_id,
                newSize,
                newColor
            );
            if (existingItem && existingItem.cid !== cid) {
                //  같은 옵션이 존재하면 기존 항목과 병합 (수량 증가)
                const updatedQuantity = existingItem.quantity + newQuantity;
                await axios.post("http://3.36.70.100:9000/cart/changeQty", {
                    cid: existingItem.cid,
                    count: updatedQuantity
                });
                //  기존 `cid` 항목 삭제 (중복 제거)
                await axios.post("http://3.36.70.100:9000/cart/deleteItem", { cid });
                setCartList((prevList) =>
                    prevList
                        .filter((item) => item.cid !== cid) //  기존 아이템 삭제
                        .map((item) =>
                            item.cid === existingItem.cid ? { ...item, quantity: updatedQuantity } : item
                        )
                );
            } else {
                //  옵션만 변경
                await axios.post("http://3.36.70.100:9000/cart/updateOptions", {
                    cid,
                    size: newSize,
                    color: newColor,
                    quantity: newQuantity,
                });
                setCartList((prevList) =>
                    prevList.map((item) =>
                        item.cid === cid
                            ? { ...item, size: newSize, color: newColor, quantity: newQuantity }
                            : item
                    )
                );
            }
        } catch (error) {
            console.error("ERROR 옵션 변경 중 오류 발생:", error);
        }
    };
    

    //  장바구니 페이지 상품 수량 업데이트
    const updateDetailQty = async (cid, size, color, quantity) => {
        console.log(" updateDetailQty 요청:", { cid, size, color, quantity });
    
        if (!cid || !size || !color || quantity === undefined) {
            console.error("ERROR 잘못된 수량 업데이트 요청:", { cid, size, color, quantity });
            return;
        }
    
        try {
            const response = await axios.post("http://3.36.70.100:9000/cart/updateOptions", { 
                cid, size, color, quantity 
            });
    
            console.log(" 수량 업데이트 응답:", response.data);
            if (response.data.result_row > 0) {
                console.log(" 수량 업데이트 완료, 장바구니 데이터 새로고침");
                await getCartItems();
            } else {
                console.warn(" 수량 업데이트 실패: 서버에서 반영되지 않음 (cid가 존재하지 않을 가능성 있음)");
            }
        } catch (error) {
            console.error("ERROR 수량 업데이트 중 오류 발생:", error.response?.data || error.message);
        }
    };
    

    //  장바구니 페이지 - 아이템 개별 삭제
    const cartDeleteItem = async (cid) => {
        try {
            const result = await axios.post("http://3.36.70.100:9000/cart/deleteItem", { cid });

            if (result.data.result_row > 0) {
                console.log(` 상품 삭제 완료: CID ${cid}`);
                await getCartItems();
            }
        } catch (error) {
            console.error("ERROR 장바구니 삭제 중 오류 발생:", error);
        }
    };

    //  비회원일 때 장바구니 상품 데이터 호출
    const getGuestCartItems = async (pid) => {
        try {
            const result = await axios.post("http://3.36.70.100:9000/cart/guestItems", { pid });
            return result;
        } catch (error) {
            console.error("ERROR 비회원 장바구니 데이터 호출 중 오류 발생:", error);
        }
    };

    return { 
        updateCartItemOptions, 
        saveToCart, 
        getCustomerId, 
        getCartItems, 
        updateDetailQty, //  추가
        cartDeleteItem, 
        getGuestCartItems 
    };
}
