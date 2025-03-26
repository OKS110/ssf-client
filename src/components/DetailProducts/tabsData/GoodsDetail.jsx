import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useProduct } from '../../../hooks/useProduct';
import { ProductContext } from '../../../context/ProductContext';

export default function GoodsDetail() {
    const { getPidItem } = useProduct();
    const { pid } = useParams();
    const { pidItem } = useContext(ProductContext);

    // 토글 상태 관리
    const [isDeliveryOpen, setIsDeliveryOpen] = useState(false);
    const [isNoticeOpen, setIsNoticeOpen] = useState(false);

    // 상품 데이터 가져오기 (pid 변경 시마다 실행)
    useEffect(() => {
        getPidItem(pid);
    }, []);
    // console.log(pidItem);
    
    return (
        <>
            <div style={{ height: "auto", display: "flex"}}>
                {/* 상품 이미지 리스트 */}
                <div style={{ width: "50%" }}>
                    {pidItem?.image?.length > 0 ? (
                        pidItem.image.map((item, index) => (
                            <img key={index} src={item} alt={`상품 이미지 ${index + 1}`} style={{ width: "100%", marginBottom: "10px" }} />
                        ))
                    ) : (
                        <p>이미지를 불러오는 중...</p>
                    )}
                </div>

                {/* 상품 설명 */}
                <div style={{ width: "50%", position: "sticky", top: "0", alignSelf: "flex-start", padding: "100px" }}>
                    <h2 style={{padding:"20px"}}>상품번호 : {pidItem?.pid}</h2>
                    <p style={{padding:"20px", fontSize:"1.3rem", lineHeight:"40px"}}>
                        {pidItem.description}
                    </p>
                </div>
            </div>

            {/*  배송 토글  */}
            <div style={{ marginTop: "20px",  padding: "10px"}}>
                <button onClick={() => setIsDeliveryOpen(!isDeliveryOpen)} style={{ width: "100%", padding: "10px", fontSize: "16px", textAlign:"left", 
                    display:"flex", justifyContent:"space-between"}}>
                    <p style={{margin:0}}>배송</p> <p style={{margin:0}}>{isDeliveryOpen ? "▲" : "▼"}</p>
                </button>
                {isDeliveryOpen && (
                    <div style={{ marginTop: "10px", padding: "10px", backgroundColor: "#f8f8f8" }}>
                         배송 기간은 2~3일 정도 소요됩니다. (주말 및 공휴일 제외)
                    </div>
                )}
            </div>

            {/*  기타 유의사항 토글  */}
            <div style={{ marginTop: "10px", padding: "10px" }}>
                <button onClick={() => setIsNoticeOpen(!isNoticeOpen)} style={{ width: "100%", padding: "10px", fontSize: "16px",  textAlign:"left",
                     display:"flex", justifyContent:"space-between" }}>
                    <p style={{margin:0}}>기타 유의사항</p> <p style={{margin:0}}>{isNoticeOpen ? "▲" : "▼"}</p>
                </button>
                {isNoticeOpen && (
                    <div style={{ marginTop: "10px", padding: "10px", backgroundColor: "#f8f8f8" }}>
                         세탁 시 반드시 찬물로 손세탁하세요. 건조기 사용 시 제품 변형이 있을 수 있습니다.
                    </div>
                )}
            </div>

        </>
    );
}
