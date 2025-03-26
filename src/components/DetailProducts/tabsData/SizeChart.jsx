import React from "react";

export default function SizeChart({ pidItem, sizeTab }) {
    // 사이즈 데이터가 존재하면 가져오고, 없으면 빈 배열을 반환
    const sizeData = pidItem?.size || [];

    // 첫 번째 사이즈 객체의 속성(key) 리스트를 가져오고, "name"은 제외
    const headers = sizeData.length > 0 
        ? Object.keys(sizeData[0]).filter(key => key !== "name") 
        : [];

    // JSON의 키 값을 한국어 명칭으로 변환하는 함수
    const getHeaderName = (key) => {
        const headerMap = {
            "shoulder_width": "어깨너비",
            "sleeve_length": "소매길이",
            "total_length": "총길이",
            "waist": "허리둘레",
            "hip": "엉덩이둘레",
            "foot_length": "발길이(mm)"
        };
        // 만약 매칭되는 값이 없으면 key 그대로 반환
        return headerMap[key] || key;
    };

    return (
        <div className="size-chart">
            <table className="tbl_info" summary="Size">
                <colgroup>
                    {/* 첫 번째 컬럼(사이즈명)의 너비를 100px로 설정 */}
                    <col style={{ width: "100px" }} />
                </colgroup>
                <tbody>
                    {/* 사이즈 행 (첫 번째 줄) */}
                    <tr className={sizeTab === "name" ? "highlighted-row" : ""}>
                        <th><span>사이즈</span></th>
                        {sizeData.map((size, index) => (
                            <td key={index} className={size.name === sizeTab ? "highlighted-row" : ""}>
                                <span>{size.name}</span>
                            </td>
                        ))}
                    </tr>

                    {/* 속성별 행 (어깨너비, 소매길이, 총길이 등) 동적 생성 */}
                    {headers.map((header, index) => (
                        <tr 
                            key={index} 
                            // 선택한 사이즈(`sizeTab`)의 데이터가 존재하면 해당 행 클래스 추가
                            className={sizeTab && sizeData.some(s => s.name === sizeTab && s[header]) ? "highlighted-row" : ""}
                        >
                            {/* 속성명(어깨너비, 소매길이 등)을 한글로 변환하여 표시 */}
                            <th><span>{getHeaderName(header)}</span></th>
                            
                            {/* 해당 속성의 값들을 동적으로 생성 */}
                            {sizeData.map((size, idx) => (
                                <td key={idx} className={size.name === sizeTab ? "highlighted-row" : ""}>
                                    <span>{size[header]}</span>
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
