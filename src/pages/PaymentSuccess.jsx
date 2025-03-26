import { useEffect } from "react";
import { useNavigate, useLocation, useSearchParams } from "react-router-dom";

export default function PaymentSuccess() {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const pgToken = searchParams.get("pg_token");
    const location = useLocation();

    useEffect(() => {
        if (pgToken) {
            // 즉시 `pg_token` 제거 후 /person으로 이동
            navigate("/person", { replace: true });
        }
    }, [location, navigate]);

    return null; // UI를 보여줄 필요 없음 (즉시 이동)
}
