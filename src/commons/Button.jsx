export default function Button({ className, title, width, onClick }) {
    return (
        <>
            <button
                className={`btn ${className}`}
                style={{ backgroundColor: "", width: width }}
                onClick={onClick} //  클릭 이벤트 추가
            >
                {title}
            </button>
        </>
    );
};
