import { useState } from "react";
import SizeChart from "./SizeChart";
import SizeGuide from "./SizeGuide";

export default function Size({ pidItem }) {
    const [isSizeOpen, setIsSizeOpen] = useState(false);
    const [sizeTab, setSizeTab] = useState(""); // 기본 선택 사이즈

    const handleSizeTab = (type) => {
        setSizeTab(type);
    };

    return (
        <div style={{ height: "auto", padding: "20px" }}>
            {/* 사이즈 선택 버튼 리스트 */}
            <ul style={{ display: "flex", justifyContent: "center", gap: "30px", listStyle: "none", padding: "0" }}>
                {pidItem && pidItem.size.map((item) => 
                    <li key={item.name} style={{ margin: "0", borderBottom: sizeTab === item.name ? "3px solid #000" : "none" }}>
                        <button 
                            style={{ fontSize: "2rem", background: "none", border: "none", cursor: "pointer", padding: "5px 10px" }} 
                            onClick={() => handleSizeTab(item.name)}
                        >
                            {item.name}
                        </button>
                    </li>
                )}
            </ul>

            <div className="chart-header" style={{ textAlign: "center", marginTop: "10px" }}>
                <span className="chart-unit">(단위: cm)</span>
            </div>

            <div className="size-chart">
                <SizeChart pidItem={pidItem} sizeTab={sizeTab} />
            </div>

            {/* 사이즈 가이드 토글 */}
            <div style={{ marginTop: "10px", padding: "10px" }}>
                <button 
                    onClick={(event) => {
                        event.stopPropagation();
                        setIsSizeOpen(!isSizeOpen);
                    }}
                    style={{
                        width: "100%", padding: "10px", fontSize: "16px", textAlign: "left",
                        display: "flex", justifyContent: "space-between"
                    }}
                >
                    <p style={{ margin: 0 }}>사이즈 가이드</p>
                    <p style={{ margin: 0 }}>{isSizeOpen ? "▲" : "▼"}</p>
                </button>
                {isSizeOpen && (
                    <div style={{ marginTop: "10px", padding: "10px", backgroundColor: "#f8f8f8" }}>
                        <SizeGuide/>
                    </div>
                )}
            </div>
        </div>
    );
}
