import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function PaymentCancel() {
    const navigate = useNavigate();

    useEffect(() => {
        console.warn("결제 취소됨: 사용자가 결제를 중단했습니다.");
        // 3초 후 메인 페이지로 이동
        setTimeout(() => {
            navigate("/", { replace: true });
        }, 3000);
    }, [navigate]);

    return (
        <div>
            <h1>결제 취소</h1>
            <p>결제가 취소되었습니다.</p>
            <p>잠시 후 메인 페이지로 이동합니다...</p>
        </div>
    );
}
