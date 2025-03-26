import React, { useState } from "react";
import DaumPostcode from "react-daum-postcode";
import Modal from "react-modal"; // react-modal 추가 npm install react-modal


// 모달 스타일 설정
const modalStyles = {
    overlay: {
        backgroundColor: "rgba(0, 0, 0, 0.5)", // 배경 투명도 조정
        zIndex: 1000,
    },
    content: {
        width: "400px",
        height: "500px",
        margin: "auto",
        padding: "20px",
        borderRadius: "10px",
        boxShadow: "0px 4px 10px rgba(0,0,0,0.2)",
        position: "relative",
        textAlign: "center"
    },
};

export default function OrderForm({ formData, setFormData, resetForm, refs }) {
    const [isOpen, setIsOpen] = useState(false); // 모달 열림/닫힘 상태

    // 모든 input 변경을 관리하는 핸들러 함수
    const handleChange = (event) => {
        const { name, value } = event.target;
        
        // 휴대폰 번호 입력 시 숫자만 허용
        if (name === "phone") {
            setFormData({ ...formData, [name]: value.replace(/[^0-9]/g, "") });
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    // 모달 열기/닫기 핸들러
    const handleToggle = () => {
        setIsOpen(!isOpen);
    };

    // DaumPostcode 검색 완료 시 실행되는 함수
    const completeHandler = (data) => {
        setFormData({
            ...formData,
            address: data.address,  // 주소 저장
            zipcode: data.zonecode  // 우편번호 저장
        });
        setIsOpen(false); // 주소 선택 후 모달 닫기
    };

    return (
        <>
            <h4>
                배송지 정보
                <div className="btns">
                    <button type="button" className="btn gray" onClick={resetForm}>
                        새로입력
                    </button>
                </div>
            </h4>
            <div className="input_wrap">
                <div className="row">
                    <label htmlFor="name" className="required">이름</label>
                    <span className="input_box">
                        <input id="name" name="name" type="text" ref={(el) => (refs.name = el)} value={formData.name} onChange={handleChange} placeholder="이름 입력" className="reset" />
                    </span>
                </div>
                <div className="row">
                    <label htmlFor="phone" className="required">휴대폰</label>
                    <span className="input_box">
                        <input id="phone" name="phone" type="text" ref={(el) => (refs.phone = el)} value={formData.phone} onChange={handleChange} placeholder="휴대폰 입력" className="reset" />
                    </span>
                </div>
                <div className="row">
                    <label htmlFor="email" className="required">이메일 주소</label>
                    <span className="input_box">
                        <input id="email" name="email" type="text" ref={(el) => (refs.email = el)} value={formData.email} onChange={handleChange} placeholder="이메일 입력" className="reset" />
                    </span>
                </div>
                <div className="row">
                    <label htmlFor="address" className="required">배송 주소</label>
                    
                        <span className="input_box" >
                            <input id="zipcode" name="zipcode" type="text" style={{display:"inline-block", margin:"0", width:"25%"}}
                                value={formData.zipcode} placeholder="우편번호" readOnly className="reset" />
                                
                            <button type="button" className="btn" onClick={handleToggle} style={{display:"inline-block", margin:"0 10px", fontSize:"1rem", padding:"0 5px",
                                border:"1px solid var(--gray200)"
                            }}
                             >주소 찾기</button>

                            <input id="address" name="address" type="text" style={{display:"block", margin:"0"}}
                                value={formData.address} ref={(el) => (refs.address = el)} onChange={handleChange} placeholder="배송 주소 입력" className="reset" readOnly />
                            <input id="detail_address" name="detail_address" type="text" style={{display:"block", margin:"0"}}
                                value={formData.detail_address} ref={(el) => (refs.detail_address = el)} onChange={handleChange} placeholder="상세정보 입력" className="reset" />
                        </span>
                </div>
                <div className="row">
                    <label htmlFor="message" className="required">배송 메시지</label>
                    <span className="input_box">
                        <input id="message" name="message" type="text" 
                        ref={(el) => (refs.message = el)} value={formData.message} onChange={handleChange} placeholder="배송 메시지 입력" className="reset" />
                    </span>
                </div>
            </div>
            {/* react-modal을 활용한 DaumPostcode 모달 */}
            <Modal isOpen={isOpen} onRequestClose={handleToggle} style={modalStyles} ariaHideApp={false}>
                <h2>주소 검색</h2>
                <DaumPostcode onComplete={completeHandler} />
                <button onClick={handleToggle} style={{
                    display: "block", 
                    margin: "20px auto 0", 
                    padding: "10px 20px", 
                    border: "none", 
                    backgroundColor: "#C05850", 
                    color: "#fff", 
                    borderRadius: "5px",
                    cursor: "pointer"
                }}>
                    닫기
                </button>
            </Modal>
        </>
    );
}
