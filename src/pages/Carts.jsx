import React, {useState} from "react";
import LoginCartsNav from "../commons/LoginCartsNav";

import CartOrderDesc from "../components/Carts/CartOrderDesc";
import CartOrderMain from "../components/Carts/CartOrderMain";
import SlideUp from "../commons/SlideUp";

export default function Carts(){
    const [activeTab, setActiveTab] = useState("tab1");
    const menuListName = [
        { "tab": "tab1", "label": "일반배송" },
        { "tab": "tab2", "label": "빠른배송" },
        { "tab": "tab3", "label": "매장픽업" },
        { "tab": "tab4", "label": "예약주문" },
    ];
    return (
        <section id="main" className="content-wrap content-wrap-padding">
            <h1>장바구니</h1>   
            <section className="carts-wrap">
                <div className="tabs carts">
                    {/* 공통 컴포넌트 사용 */}
                    <LoginCartsNav activeTab={activeTab} setActiveTab={setActiveTab}
                                    menuListName={menuListName} />
                    
                    <div className="order_wrap on all-group">
                        <div className="order_set" id="cartSubGroup1">
                            <CartOrderMain></CartOrderMain>
                        </div>
                        <CartOrderDesc></CartOrderDesc>
                        
                    </div>    
                </div>

            </section>
            <SlideUp/>
        </section>
    );
}