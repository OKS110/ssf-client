import React, { useState, useEffect } from 'react';
import { IoIosClose } from "react-icons/io";
import { FaMinus, FaPlus } from "react-icons/fa6";
import { useCart } from "../../hooks/useCart";

export default function CartOptionModal({ item, event }) {
    const { updateCartItemOptions } = useCart();

    //  선택된 옵션 상태 관리
    const [count, setCount] = useState(item.quantity);
    const [selectedSize, setSelectedSize] = useState(item.size);
    const [selectedColor, setSelectedColor] = useState(item.color);

    useEffect(() => {
        setCount(item.quantity);
        setSelectedSize(item.size);
        setSelectedColor(item.color);
    }, [item]);

    //  수량 변경 핸들러
    const handleQty = (type) => {
        setCount((prev) => (type === "increase" ? prev + 1 : Math.max(1, prev - 1)));
    };

    //  변경 버튼 클릭 시 서버 & UI 반영
    const onChange = () => {
        if (count <= 0) return;
        updateCartItemOptions(item.cid, selectedSize, selectedColor, count);
        event(false);
    };

    return (
        <div className='cartModal-change-wrap'>
            <div className='cartModal-change-header'>
                <span>옵션/수량 변경</span>
                <span onClick={() => event(false)}><IoIosClose /></span>
            </div>
            <ul className='cartModal-change-options'>
                <li className='cartModal-change-size'>
                    <label>사이즈</label>
                    <select value={selectedSize} onChange={(e) => setSelectedSize(e.target.value)}>
                        {item.availableSizes.length > 0 ? (
                            item.availableSizes.map((size, index) => (
                                <option key={index} value={size.name}>{size.name}</option>  
                                // {/*  size 객체가 아니라 size.name 사용 */}
                            ))
                        ) : (
                            <option>사이즈 없음</option>
                        )}
                    </select>
                </li>

                <li className='cartModal-change-size'>
                    <label>색상</label>
                    <select value={selectedColor} onChange={(e) => setSelectedColor(e.target.value)}>
                        {item.availableColors.length > 0 ? (
                            item.availableColors.map((color, index) => (
                                <option key={index} value={color}>{color}</option>
                            ))
                        ) : (
                            <option>색상 없음</option>
                        )}
                    </select>
                </li>

                <li className='cartModal-change-qty'>
                    <label>수량</label>
                    <div>
                        <button onClick={() => handleQty("decrease")}><FaMinus /></button>
                        <span>{count}</span>
                        <button onClick={() => handleQty("increase")}><FaPlus /></button>
                    </div>
                </li>
            </ul>

            <button className="cartModal-change-btn" onClick={onChange}>
                변경하기
            </button>
        </div>
    );
}
