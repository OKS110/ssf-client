import React, { useEffect, useState } from 'react';
import Image from './Image.jsx';
// import axios from 'axios';

export default function ImageList({imgList, className}) {
    return (
        <div className={className}>
            { imgList && imgList.map((item) => 
                <Image img={item.img} alt={item.alt} className='' />
            ) }
        </div>
    );
}

/**
 * ImageList :: 호출한 곳에서 반드시 imgList라는 이름으로 이미지 배열 생성, 클래스명 지정하여 구조분해할당으로 넘겨줄 것
 * Image :: 넘어가는 데이터 값은 수정 예정. 클래스명은 별도 지정x 필요할 경우 지정하여 사용할 것
            빈 태그로 감싸두었음.
**/