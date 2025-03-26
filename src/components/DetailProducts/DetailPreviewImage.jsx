import React, { useState, useRef } from "react";

export default function DetailPreviewImage({pidItem, clickActive}) {
    
    const [zoomPosition, setZoomPosition] = useState({ x: 0, y: 0 }); // 확대 이미지의 위치를 저장하는 상태
    const [isZoomVisible, setIsZoomVisible] = useState(false); // 확대된 이미지를 표시할지 여부를 결정하는 상태
    const imgWrapRef = useRef(null); // 이미지 컨테이너 요소에 접근하기 위한 ref


        // `pidItem.image`가 undefined일 경우 안전 처리 // 이 코드가 없는 경우에 axios로 인한 pidItem이 비동기 처리되어서 랜더링보다 늦게 값을 받아옴. 따라서 오류 발생
        if (!pidItem || !pidItem.image || pidItem.image.length === 0) {
            return <p>이미지를 불러오는 중...</p>;
        }

    const handleMouseMove = (e) => { // 마우스가 이미지 위에서 움직일 때 실행되는 함수
        const imgWrap = imgWrapRef.current; // 이미지 컨테이너 요소 가져오기
        if (!imgWrap) return; // 컨테이너가 없으면 함수 종료

        const { left, top, width, height } = imgWrap.getBoundingClientRect(); // 컨테이너의 위치 및 크기 정보 가져오기
        
        // getBoundingClientRect()반환값 예제
        // {
        //     "x": 100,
        //     "y": 200,
        //     "width": 300,
        //     "height": 150,
        //     "top": 200,
        //     "right": 400,
        //     "bottom": 350,
        //     "left": 100
        //   }
          
        
        // 마우스 위치를 이미지 내의 비율(0~1)로 변환
        const xRatio = (e.clientX - left) / width; 
        const yRatio = (e.clientY - top) / height;
        // console.log('x', xRatio);
        // console.log('y', yRatio);
        
        // 확대된 배경 이미지의 위치 계산 (0% ~ 100%)
        const bgX = xRatio * 100;
        const bgY = yRatio * 100;
        // console.log('bgx', bgX);
        // console.log('bgy', bgY);
        
        setZoomPosition({ x: bgX, y: bgY }); // 확대된 이미지의 배경 위치 업데이트
    };

    return (
        <div className="preview-img"> {/* 전체 미리보기 컨테이너 */}
            <div 
                className="img-wrap" 
                id="godImgWrap" 
                ref={imgWrapRef} // DOM 요소를 참조할 수 있도록 ref 설정
                onMouseEnter={() => setIsZoomVisible(true)} // 마우스가 이미지 위에 올라가면 확대 이미지 표시
                onMouseLeave={() => setIsZoomVisible(false)} // 마우스가 이미지에서 벗어나면 확대 이미지 숨김
                onMouseMove={handleMouseMove} // 마우스가 움직일 때 위치 업데이트
            >
                {/* 선택된 `clickActive` 값에 맞는 이미지 표시 */}
                <div className="img-item active">
                    <img src={pidItem.image[clickActive]} alt="Selected Preview" />
                </div>
            </div>

            {/* 확대된 이미지가 보여질 div */}
            <div 
                className="preview-zoom" 
                style={{
                    backgroundImage: `url(${pidItem.image[clickActive]})`, // 확대될 배경 이미지 설정
                    backgroundSize: "150%", // 원본 대비 150% 확대
                    backgroundPosition: `${zoomPosition.x}% ${zoomPosition.y}%`, // 마우스 위치에 따라 확대된 배경 위치 조정
                    display: isZoomVisible ? "block" : "none" // 확대 이미지 표시 여부 (마우스가 있을 때만 보임)
                }}
            ></div>
        </div>
    );
}
