import { FaFacebook } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaPinterest } from "react-icons/fa";
import { CiShare2 } from "react-icons/ci";

import { useState } from "react";
import { SiGitconnected } from "react-icons/si";


export default function DetailTop({ pidItem, pid }) {

    const [isHover, setIsHover] = useState(true);
    const handleEnter = () => {setIsHover(false)}       
    const handleLeave = () => {setIsHover(true)}  
    

    return (
        <section className="detail-top-wrap">
            <div aria-label="Breadcrumb" class="breadcrumb">
                <ol>
                    <li><a href="/">Home</a></li>
                    <li>
                        <a href="#none;">{pidItem.category}</a>
                    </li>
                    <li>
                        {pidItem.sub_category}
                    </li>
                </ol>
            </div>
            <div class="detail-top-right">
                {isHover ?
                    (
                        <div className="notover">
                            <span onMouseEnter={handleEnter}><CiShare2 /></span>
                        </div>
                    ) :
                    (
                        <div onMouseLeave={handleLeave}>
                            <span >
                                <a class="over-facebook" href="#none;" ><FaFacebook /></a>
                                <a class="over-twitter" href="#none;"><FaTwitter /></a>
                                <a class="over-pinterest" href="#none;" ><FaPinterest /></a>
                                <a class="over-url" href="#none;"><SiGitconnected /></a>
                            </span>
                        </div>
                    )
                }

            </div>
        </section>
    );
}