export default function ReviewFilterTab() {
return (
    <div class="filtering" data-type="REVW_PANTS">
        <ul role="tablist" class="tablist" aria-label="필터항목">
            <li role="tab" aria-controls="filter-option" aria-selected="false"><span>상품옵션</span></li>
            <li role="tab" aria-controls="filter-weight" aria-selected="false"><span>신체사이즈</span></li>
            <li role="tab" aria-controls="filter-size" aria-selected="false"><span>평소사이즈</span></li>
        </ul>
    </div>
    );
};