import React, { useEffect, useState } from 'react';

export default function PopUp() {
    const [isOpened, setIsOpened] = useState(true); // 팝업창 상태 관리
    
    useEffect(() => {
        const VISITED_DATE = parseInt(localStorage.getItem("POP_UP_CHECK"), 10); //  `parseInt`로 변환
        const NOW_DATE = new Date().getDate(); //  오늘 날짜

        if (VISITED_DATE) {
            if (VISITED_DATE === NOW_DATE) {
                // 오늘 이미 "오늘 하루 보지 않기" 클릭한 경우 팝업 안 보이게 설정
                setIsOpened(false);
            } else {
                setIsOpened(true);
                localStorage.removeItem("POP_UP_CHECK"); //  새로운 날이 되면 초기화
            }
        } else {
            setIsOpened(true);
        }
    }, []);

    const handleDayClosed = () => {
        const expireDate = new Date().getDate(); //  오늘 날짜 저장
        localStorage.setItem("POP_UP_CHECK", expireDate.toString()); //  `string`으로 변환하여 저장
        setIsOpened(false);
    };

    return (
        <>
            {isOpened && (
                <div className='mainAdPopup-wrap'>
                    <div className='mainAdPopup-content'>
                        <img src="https://img.ssfshop.com/display/html/PROMT/20250114/p_w3_261506_con01.png" alt="팝업 창" />
                    </div>
                    <div className='mainAdPopup-btns'>
                        <button onClick={handleDayClosed}>오늘 하루 보지 않기</button>
                        <button onClick={() => setIsOpened(false)}>닫기</button>
                    </div>
                </div>
            )}
        </>
    );
}
