export default function ProductMypage({ tabs = [], activeTab, setActiveTab }) {
    return (
        <div className="gods-detail">
            <div className="tab-rects" role="tablist" 
            style={{ width: "auto", transform: "translateY(0px)"}}>
                <ul id="goodsDetailTabs">
                    {tabs.map((tab) => (
                        <li
                            key={tab.id}
                            id={tab.id}
                            role="tab"
                            aria-selected={activeTab === tab.id}
                            onClick={() => setActiveTab(tab.id)} // 클릭 시 부모컴포넌트의 상태 변경
                        >
                            <a href={tab.href} role="button" tabIndex="0">
                                {tab.label}
                            </a>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}
