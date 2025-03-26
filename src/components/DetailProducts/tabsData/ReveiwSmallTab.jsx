export default function ReviewSmallTab({ onSortChange, selectedSort }) {
    return (
        <ul className="lineUp" aria-label="리스트 정렬방식" id="goodsReviewSortTab">
            <li className={selectedSort === "lately" ? "selected" : ""} >
                <label>
                    <input type="radio" name="lineup" value="lately" 
                    
                    onChange={(e) => onSortChange(e.target.value)} />
                    최근 등록순
                </label>
            </li>
            <li className={selectedSort === "top" ? "selected" : ""} >
                <label>
                    <input type="radio" name="lineup" value="top"
                    className={selectedSort === "top" ? "selected" : ""} 
                    onChange={(e) => onSortChange(e.target.value)} />
                    평점 높은순
                </label>
            </li>
            <li className={selectedSort === "low" ? "selected" : ""} >
                <label>
                    <input type="radio" name="lineup" value="low"
                    className={selectedSort === "low" ? "selected" : ""} 
                    onChange={(e) => onSortChange(e.target.value)} />
                    평점 낮은순
                </label>
            </li>
        </ul>
    );
};
