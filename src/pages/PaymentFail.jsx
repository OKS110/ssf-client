import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function PaymentFail() {
    const navigate = useNavigate();

    useEffect(() => {
        console.warn("결제 실패: 사용자 결제 진행 중 오류 발생");

        // 3초 후 메인 페이지로 이동
        setTimeout(() => {
            navigate("/", { replace: true });
        }, 3000);
    }, [navigate]);

    return (
        <div>
            <h1>결제 실패!</h1>
            <p>결제 처리 중 오류가 발생했습니다.</p>
            <p>잠시 후 메인 페이지로 이동합니다...</p>
        </div>
    );
}
