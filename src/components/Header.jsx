import { Link } from "react-router-dom";
import Nav from "../commons/Nav.jsx";
import { CiSearch } from "react-icons/ci";
import { CiHeart } from "react-icons/ci";
import { AiOutlineShopping } from "react-icons/ai";
import { AuthContext } from "../auth/AuthContext.js";
import { useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import Modal from 'react-modal';
import SearchModal from "./Search/SearchModal.jsx";
import { CustomersContext } from "../context/CustomersContext.js";

export default function Header() {
    const {setCustomer} = useContext(CustomersContext);
    // 검색 모달창 관리
    const [isOpen, setIsOpen] = useState(false);

    // 헤더 메뉴 시작
    const categories = [
        { label: "여성", link: "#" },
        { label: "남성", link: "#" },
        { label: "키즈", link: "#" },
        { label: "럭셔리", link: "#" },
        { label: "백&슈즈", link: "#" },
        { label: "스포츠", link: "#" },
        { label: "골프", link: "#" },
        { label: "뷰티", link: "#" },
        { label: "아울렛", link: "#" }
    ];

    const subCategories = [
        { label: "랭킹", link: "#" },
        { label: "브랜드", link: "#" },
        { label: "매거진", link: "#" },
        { label: "기획전", link: "#" },
        { label: "이벤트", link: "#" }
    ];

    const specialLinks = [
        { label: "삼성전자", link: "#" }
    ];

    // 로그인 상태 관리
    const { isLoggedIn, setIsLoggedIn } = useContext(AuthContext);
    const navigate = useNavigate();
    const [isGuest, setIsGuest] = useState(false);

    // 토큰 확인해서 비회원 여부 판단
    useEffect(() => {
        const token = localStorage.getItem("token");
        setIsGuest(token?.startsWith("guest_token_")); // guest_token_으로 시작하면 true
    }, [isLoggedIn]);

    // 로그인/로그아웃 처리
    const handleLoginToggle = () => {
        if (isLoggedIn) { // Logout 버튼 클릭!!
            const select = window.confirm("정말로 로그아웃 하시겠습니까?");
            if (select === true) {
                localStorage.removeItem("token");
                localStorage.removeItem('user_id'); 
                localStorage.removeItem('guest_id'); 
                setIsLoggedIn(false);
                setIsGuest(false); // 비회원 여부 초기화
                setCustomer({});
                localStorage.removeItem("user_id");
                localStorage.removeItem("userData");
                // 상태 업데이트 후 메인 페이지 이동
                setTimeout(() => {
                    navigate('/');
                }, 0);
            }else if(select === false){

                return; // 현재 상태 유지
            }
        } else { // 로그인 버튼 클릭
            navigate('/login');
        }
    };

    // 모달창 스타일 설청
    const customModalStyles = {
        overlay: {
            backGroundColor: "rgba(0, 0, 0, 0.5)",
            width: "100%",
            height: "100%",
            zIndex: "40",
            // position: "fixed",
            top: "0",
            left: "0"
        },
        content: {
            width: "100%",
            height: "700px",
            zIndex: "41",
            top: "0",
            left: "0",
            justifyContent: "center",
        }
    }
    // console.log("modal status --> ", isOpen);

    return (
        <header className='wrap-header'>
            <div className='header-top-wrap'>
                <div className='header-top content-wrap'>
                    {isLoggedIn ? <Link to='/person' className="person">마이페이지</Link> : ""}
                    {/* 비회원 여부에 따라 로그인 버튼 텍스트 변경 */}
                    <button  className="login" onClick={handleLoginToggle}>
                        {isLoggedIn ? (isGuest ? "(비회원) 로그아웃" : "로그아웃") : "로그인" }
                    </button>
                    {isLoggedIn ? "" : <Link to='/signup' className="person">회원가입</Link>}
                    {/* Link 태그에서 button으로 변경 -> window.confirm 취소 시 Link 의 주소 참조로 인한 오류 발생 */}
                </div>
            </div>

            <div className='header-middle-wrap'>
                <div className='header-middle content-wrap'>
                    <Link to='/' className='header-logo'><h1><span className="big-logo">SSF</span> <span> </span>
                    <span className="small-logo" style={{fontWeight:"100"}}>SHOP</span></h1></Link>

                    <div className='icon-shop-wrap'>
                        <div className='icon-wrap'>
                            {/* 검색버튼 */}
                                <button type='button' onClick={() => setIsOpen(true)} style={{backgroundColor:"white"}}><CiSearch /></button>
                                <Modal
                                    isOpen={isOpen}
                                    onRequestClose={() => setIsOpen(false)}
                                    ariaHideApp={false}
                                    contentLabel="Pop up Message"
                                    shouldCloseOnOverlayClick={true}
                                    style={customModalStyles}
                                >
                                    <SearchModal event={setIsOpen} />
                                </ Modal>
                            <button type='button' style={{backgroundColor:"white"}}><CiHeart /></button>
                            <button type='button' style={{backgroundColor:"white"}}><Link to='/carts'><AiOutlineShopping /></Link></button>
                        </div>
                        <span>|</span>
                        <div className='shop-wrap'>
                            <a href='#'>10 CORSO COMO</a>
                            <a href='#'>BEAKER</a>
                            <a href='#'>ANOTHER#</a>
                        </div>
                    </div>
                </div>
            </div>
            
            <div className='header-bottom-wrap content-wrap'>
                <Nav categories={categories} subCategories={subCategories} specialLinks={specialLinks}></Nav>
            </div>
        </header>
    );
}
