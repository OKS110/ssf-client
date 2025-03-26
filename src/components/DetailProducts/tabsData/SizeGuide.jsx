import { useState } from "react";
export default function SizeGuide() {
    // 선택된 사이즈 타입 상태값 (기본값: "남성")
    const [sizeType, setSizeType] = useState("남성");

    // 사이즈 가이드 유형 목록
    const sizeGuideType = [
        { "id": 1, "label": "남성" },
        { "id": 2, "label": "여성" },
        { "id": 3, "label": "남녀공용" },
        { "id": 4, "label": "신발" }
    ];

    // 버튼 클릭 시 사이즈 유형 변경
    const handleSizeGuide = (e, type) => {
        e.preventDefault();
        setSizeType(type);
    };

    return (
        <div style={{ textAlign: "center", padding: "20px" }}>
            <h2>사이즈 가이드</h2>
            {/* 사이즈 버튼 리스트 */}
            <ul style={{ display: "flex", justifyContent: "center", gap: "30px", listStyle: "none", padding: "0" }}>
                {sizeGuideType.map((item) => (
                    <li key={item.id} style={{ margin: "0", borderBottom: sizeType === item.label ? "3px solid blue" : "none" }}>
                        <button 
                            style={{
                                fontSize: "1.6rem",
                                padding: "10px 15px",
                                background: "none",
                                border: "none",
                                cursor: "pointer",
                                fontWeight: sizeType === item.label ? "bold" : "normal"
                            }} 
                            onClick={(e) => handleSizeGuide(e, item.label)}
                        >
                            {item.label}
                        </button>
                    </li>
                ))}
            </ul>

            {/* 선택된 사이즈 타입에 대한 정보 표시 */}
            {sizeType && (
                <div style={{ marginTop: "20px", padding: "20px", border: "1px solid #ddd" }}>
                    <h3 style={{padding:"20px"}}>{sizeType} 사이즈 가이드</h3>
                    {sizeType === "남성" ? <img src="/images/sizeGuideMan.png" alt="남성 가이드" /> : ""}
                    {sizeType === "여성" ? <img src="/images/sizeGuideWoman.png" alt="여성 가이드" /> : ""}
                    {sizeType === "남녀공용" ? <img src="/images/sizeGuideManWoman.png" alt="남녀공용 가이드" /> : ""}
                    {sizeType === "신발" ? <img src="/images/sizeGuideShoes.png" alt="신발 가이드" /> : ""}
                </div>
            )}
        </div>
    );
}
