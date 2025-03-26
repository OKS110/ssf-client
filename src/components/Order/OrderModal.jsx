export default function OrderModal({isModalOpen, handleConfirmOrder, setIsModalOpen }){
    
    return (
        <>
        
        {isModalOpen && (
                <div style={{
                    position: "fixed",
                    top: "40%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    backgroundColor: "white",
                    padding: "100px",
                    boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.2)",
                    zIndex: 1000,
                    borderRadius: "8px",
                    textAlign: "center"
                }}>
                    <p style={{ marginBottom: "15px", fontSize:"2rem" }}>주문 내역을 확인하시겠습니까?</p>
                    
                    <button onClick={handleConfirmOrder} style={{
                        fontSize:"1.5rem",
                        marginRight: "10px",
                        padding: "10px 15px",
                        backgroundColor: "black",
                        color: "white",
                        border: "none",
                        borderRadius: "5px",
                        cursor: "pointer"
                    }}>
                        확인
                    </button>
                    <button onClick={() => setIsModalOpen(false)} style={{
                        fontSize:"1.5rem",
                        padding: "10px 15px",
                        backgroundColor: "white",
                        color: "black",
                        border: "none",
                        borderRadius: "5px",
                        cursor: "pointer"
                    }}>
                        취소
                    </button>
                    
                    <p style={{ marginTop: "15px", fontSize:"1rem" }}>(확인 시 마이페이지 이동)</p>
                </div>
            )}
        </>
    )
}