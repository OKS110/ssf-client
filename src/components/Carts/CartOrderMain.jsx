import { useEffect, useContext, useState } from "react";
import { AuthContext } from "../../auth/AuthContext.js";
import { DetailProductContext } from "../../context/DetailProductContext";
import { useCart } from "../../hooks/useCart.js";
import { useProduct } from "../../hooks/useProduct.js";
import Modal from 'react-modal';
import CartOptionModal from "./CartOptionModal.jsx";
import CartOrderBill from './CartOrderBill.jsx';

export default function CartOrderMain() {
    const { isLoggedIn } = useContext(AuthContext);
    const { cartList } = useContext(DetailProductContext);
    const { getCartItems, cartDeleteItem } = useCart();
    const { getPidItem } = useProduct();
    const [isOpen, setIsOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null); // 모달 오픈 시 필요한 상품 데이터 정보
    const [selectedItems, setSelectedItems] = useState([]); // 장바구니에 담긴 상품들 중 선택된 상품들
    const [isAllSelected, setIsAllSelected] = useState(false);

    useEffect(() => {
        if (isLoggedIn) {
            getCartItems();
        }
    }, [isLoggedIn]);

    //  선택된 상품 삭제
    const handleDeleteSelectedItems = async () => {
        if (selectedItems.length === 0) {
            alert("삭제할 상품을 선택해주세요.");
            return;
        }
        if (!window.confirm("선택한 상품을 삭제하시겠습니까?")) return;
        try {
            for (const cid of selectedItems) { await cartDeleteItem(cid); }
            setSelectedItems([]);
            setIsAllSelected(false);
            getCartItems();
        } catch (error) {
            console.error("ERROR 선택 삭제 중 오류 발생:", error);
        }
    };
    //  개별 상품 선택 / 해제
    const handleSelectItem = (cid) => {
        setSelectedItems((prevSelected) =>
            prevSelected.includes(cid)
                ? prevSelected.filter((id) => id !== cid) // 이미 선택된 경우 제거
                : [...prevSelected, cid] // 선택되지 않은 경우 추가
        );
    };
    //  전체 선택 / 해제
    const handleSelectAll = () => {
        if (isAllSelected) {
            setSelectedItems([]); // 전체 해제
        } else {
            setSelectedItems(cartList.map((item) => item.cid)); // 전체 선택
        }
        setIsAllSelected(!isAllSelected);
    };

    //  모달 오픈 시 해당 상품의 product_id를 이용해 상품 정보 불러오기
    const openModal = async (item) => {
        const productData = await getPidItem(item.product_id);
        setSelectedItem({
            ...item,
            availableSizes: productData?.size || [],
            availableColors: productData?.color || [],
        });
        setIsOpen(true);
    };

    //  가격 변환 함수 (,로 인한 NaN 방지)
    const formatPrice = (price) => {
        if (!price) return 0;
        return parseFloat(price.toString().replace(/,/g, "")) || 0;
    };

    //  선택된 상품의 총 상품 금액 (정가 기준)
    const selectedTotalPrice = cartList.filter((item) => selectedItems.includes(item.cid)) //cid가 selectedItems에 포함된 상품만 남김.
        .reduce((acc, item) => {
            return acc + formatPrice(item.original_price) * (item.quantity ?? 1);
        }, 0);

    //  선택된 상품의 총 할인 금액
    const selectedTotalDiscount = cartList
        .filter((item) => selectedItems.includes(item.cid))
        .reduce((acc, item) => {
            const originalPrice = formatPrice(item.original_price);
            const discountedPrice = formatPrice(item.discounted_price);
            return acc + (originalPrice - discountedPrice) * (item.quantity ?? 1);
        }, 0);

    //  선택된 상품의 총 배송비
    const selectedTotalDeliveryFee = cartList
        .filter((item) => selectedItems.includes(item.cid))
        .reduce((acc, item) => acc + (item.deliveryFee !== "free" ? 3000 : 0), 0);

    return (
        <>
            {isLoggedIn ? (
                cartList.length > 0 ? (
                    <>
                        <div className="cart-actions">
                            <label style={{marginRight:"20px"}}>
                                <input
                                    type="checkbox"
                                    checked={isAllSelected}
                                    onChange={handleSelectAll}
                                /> 전체 선택
                            </label>
                            <button onClick={handleDeleteSelectedItems}>선택 삭제</button>
                        </div>
                        <table>
                            <colgroup>
                                <col width="40"></col>
                                <col width="124"></col>
                                <col width="*"></col>
                                <col width="180"></col>
                                <col width="220"></col>
                            </colgroup>
                            <thead>
                                <tr className="thead">
                                    <th colSpan="3">상품·혜택 정보</th>
                                    <th>배송정보</th>
                                    <th>주문금액</th>
                                </tr>
                            </thead>
                            <tbody>
                                {cartList.map((item) => (
                                    <tr key={item.cid}>
                                        <td>
                                            <label>
                                                <input
                                                    type="checkbox"
                                                    checked={selectedItems.includes(item.cid)}
                                                    onChange={() => handleSelectItem(item.cid)}
                                                />
                                            </label>
                                        </td>
                                        <td>
                                            <a className="list_goods" href="#">
                                                <img
                                                    src={item.image}
                                                    onError={(e) => e.target.src = '/v3/images/common/noImg_60.gif'}
                                                    alt=""
                                                />
                                            </a>
                                        </td>
                                        <td>
                                            <div className="info">
                                                <span className="brand">{item.brand}</span>
                                                <span className="name">{item.name}</span>
                                                <div className="selected_options">
                                                    <ul>
                                                        <li>
                                                            색상: {item.color} / 사이즈: {item.size} / {item.quantity}개
                                                        </li>
                                                    </ul>
                                                </div>
                                                <div className="alter">
                                                    <button onClick={() => openModal(item)}>옵션/수량변경</button>
                                                    <Modal
                                                        isOpen={isOpen}
                                                        onRequestClose={() => setIsOpen(false)}
                                                        ariaHideApp={false}
                                                        contentLabel="Pop up Message"
                                                        shouldCloseOnOverlayClick={true}
                                                    >
                                                        <CartOptionModal item={selectedItem} event={setIsOpen} />
                                                    </Modal>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="shipping">
                                            <span className="cost">
                                                {item.deliveryFee === "free" ? "무료배송" : "유료배송 3000원"}
                                            </span>
                                        </td>
                                        <td className="price">
                                            <del className="original_price">{formatPrice(item.original_price).toLocaleString()}원</del>
                                            <br />
                                            <span className="discounted_price">
                                                {(formatPrice(item.discounted_price) * item.quantity).toLocaleString()}원
                                            </span>
                                            <em className="discount_rate">{item.discount_rate ?? 0}% 할인</em>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <CartOrderBill 
                        totalPrice={selectedTotalPrice} 
                        totalDiscount={selectedTotalDiscount} 
                        totalDeliveryFee={selectedTotalDeliveryFee}
                        selectedItems={selectedItems} />
                    </>
                ) : <p>장바구니가 비어 있습니다.</p>
            ) : <p>로그인이 필요합니다.</p>}
        </>
    );
}
