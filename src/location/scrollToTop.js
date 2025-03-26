import { useEffect } from "react";
import { useLocation } from "react-router-dom";

function ScrollToTop() {
    const { pathname } = useLocation();

    useEffect(() => {
        window.history.scrollRestoration = "manual"; // 기본 스크롤 위치 유지 기능 끄기
        window.scrollTo(0, 0);
    }, [pathname]);

    return null;
}

export default ScrollToTop;
