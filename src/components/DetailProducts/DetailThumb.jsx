export default function DetailThumb({ pidItem, setClickActive, clickActive }) {
    const thumbImgList = pidItem.image || []; // 배열이 없을 경우 빈 배열 처리

    // 썸네일 클릭 시 active 상태 변경
    const handleThumbImage = (index) => {
        setClickActive(index);
        // console.log("현재 활성화된 썸네일 index:", index);
    };

    return (
        <div
            className={`preview-thumb ${thumbImgList.length > 3 ? "grid-layout" : "flex-layout"}`}
            id="godImgThumb"
        >
            {thumbImgList.map((item, index) => (
                <div
                    key={index}
                    className={`thumb-item ${clickActive === index ? "active" : ""}`} // 활성화된 썸네일 스타일 적용
                    onClick={() => handleThumbImage(index)}
                >
                    <button type="button">
                        <img src={item} alt={`Thumbnail ${index}`} />
                    </button>
                </div>
            ))}
        </div>
    );
}
