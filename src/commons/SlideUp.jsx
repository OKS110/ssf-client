import { useState, useEffect } from "react";

// 버튼을 눌렀을 때 화면 위로 올라가는 버튼
export default function SlideUp() {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsVisible(window.scrollY > 300); // 300px 이상이면 true, 미만이면 false
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    return (
        <div
            className={`scroll-to-top-btn ${isVisible ? "visible" : "hidden"}`}
            onClick={scrollToTop}
        >
            <img src="https://www.ssfshop.com/v3/images/svgs/arrow-top.svg" alt="" />
        </div>
    );
}
