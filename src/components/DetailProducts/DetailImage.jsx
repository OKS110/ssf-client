import { useState } from "react";
import DetailPreviewImage from "./DetailPreviewImage";
import DetailThumb from "./DetailThumb";

export default function DetailImage({pidItem}){

    const [clickActive, setClickActive] = useState(0);

    
    return (
        <div class="godsImg-area">
            <DetailThumb pidItem={pidItem} setClickActive={setClickActive} clickActive={clickActive} />

            <DetailPreviewImage pidItem={pidItem}  clickActive={clickActive}/>
        
        </div>
    );
}
