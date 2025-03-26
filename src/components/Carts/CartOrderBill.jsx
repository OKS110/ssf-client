import { useNavigate } from "react-router-dom";
import Button from "../../commons/Button";

export default function CartOrderBill({ totalPrice, totalDiscount, totalDeliveryFee, selectedItems = [] }) {
    const navigate = useNavigate();
    //  선택한 상품 주문 페이지로 이동
    const handleOrder = () => {
        if (!selectedItems || selectedItems.length === 0) {
            alert("주문할 상품을 선택해주세요.");
            return;
        }
        //  선택한 상품들의 cid 리스트를 sessionStorage에 저장
        sessionStorage.setItem("selectedCids", JSON.stringify(selectedItems));
        //  선택한 상품들의 cid 리스트만 전달
        navigate("/cart/order"); // 주문 페이지로 이동
    };

    const totalOrderAmount = totalPrice + totalDeliveryFee - totalDiscount;

    return (
        <div className="bill" id="cartGroupBill0">
            <h4>
                결제 예정 금액 <small>총 <em className="cssf" id="orderCntTxt">{selectedItems?.length ?? 0}</em>건</small>
            </h4>
            <div className="calc">
                <span className="retail">
                    <em id="totalGodAmt">{totalPrice.toLocaleString()}</em>원<i>상품금액</i>
                </span>
                <span className="plus">
                    <em id="totalDlvAmt">{totalDeliveryFee.toLocaleString()}</em>원<i>배송비</i>
                </span>
                <span className="minus">
                    <em id="totalDcAmt">{totalDiscount.toLocaleString()}</em>원<i>할인금액</i>
                </span>
                <span className="total">
                    <em id="totalOrdAmt">{totalOrderAmount.toLocaleString()}</em>원<i>총 주문금액</i>
                </span>
            </div>
            
            {/*  주문하기 버튼 */}
            <div className="submit_order">
                <Button className="bk" title="주문하기" onClick={handleOrder} />
            </div>
        </div>
    );
}
