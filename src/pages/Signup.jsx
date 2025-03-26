import { useRef, useState } from "react";
import {signupValidate} from '../utils/validate.js';
import React from 'react';
import DaumPostcode from "react-daum-postcode";
import { useNavigate } from "react-router-dom";
import axios from 'axios';

export default function Signup(){
    const navigate = useNavigate();
    const [adata, setAdata] = useState({}); // 주소 정보 저장
    
    /** 주소검색 버튼Toggle */
    const [isOpen, setIsOpen] = useState(false);
    /** 주소 검색 버튼 */
    const handleToggle = () => {
        setIsOpen(!isOpen);
    };

    //---- DaumPostcode 관련 디자인 및 이벤트 시작 ----//
    const themeObj = {
        bgColor: "#FFFFFF",
        pageBgColor: "#FFFFFF",
        postcodeTextColor: "#C05850",
        emphTextColor: "#222222"
    };
    const postCodeStyle = {
        width: "480px",
        height: "480px"
    };

    const completeHandler = (data) => {
        setAdata({...adata, zoneCode: data.zonecode, address: data.address });
    };

    const closeHandler = (state) => {
        if (state === "FORCE_CLOSE") {
        setIsOpen(false);
        } else if (state === "COMPLETE_CLOSE") {
        setIsOpen(false);
        }
    };
    //---- DaumPostcode 관련 디자인 및 이벤트 종료 ----//

    const formData = {
                    'id':'',
                    'pwd':'',
                    'cpwd':'',
                    'username':'',
                    'phone':'',
                    'address':'',
                    'zoneCode':'',
                    'addressDetail':'',
                    'email':'',
                    'emailDomain':''
                }
    const [data, setData] = useState(formData);
    const [error, setError] = useState({});

    const refs = {
        'idRef':useRef(null),
        'idCheckRef':useRef(null),
        'pwdRef':useRef(null),
        'cpwdRef':useRef(null),
        'usernameRef':useRef(null),
        'phoneRef':useRef(null),
        'addressRef':useRef(null),
        'zoneCodeRef':useRef(null),
        'addressDetailRef':useRef(null),
        'emailRef':useRef(null),
        'emailDomainRef':useRef(null)
    };

    const msgRefs = {
        'idMsgRef':useRef(null),
        'pwdMsgRef':useRef(null)
    }

    //체크박스 상태 관리
    const [isChecked1, setIsChecked1] = useState(false); // 이용약관 동의 여부
    const [isChecked2, setIsChecked2] = useState(false); // 개인정보 수집 동의 여부
    const handleChecked1 = (e) => {setIsChecked1(e.target.checked);}
    const handleChecked2 = (e) => {setIsChecked2(e.target.checked);}
    
    const [idCheckClick, setIdCheckClick] = useState(false);  // 아이디 중복 확인 여부

    const handleSignupForm = (e) => {
        const {name, value} = e.target;
        // 아이디 변경 시 중복 체크 초기화
        if (name === 'id') {
            setIdCheckClick(false);
        }        
        setData({...data, [name]:value});
    }

    // 아이디 중복체크 클릭여부 함수
    const handleIdCheck = () => {
        //서버연동해서 아이디 중복체크 진행
            const did = refs.idRef.current; //did = duplicateId
            if(did.value===''){
                setError({...error, ['id']:'아이디를 입력해주세요'});
                did.focus();
            }else if(did.value.length < 6){
                setError({...error, ['id']:'6자 이상 아이디를 입력해주세요'});
                did.value = '';
                did.focus();     
            }else {
                axios
                    .post('http://52.78.224.175:9000/member/idCheck',{'id' : did.value})
                    .then(res =>{ 
                        if(res.data.count === 1){
                            setError({...error,['id']:'사용중인 아이디입니다'});
                            msgRefs.idMsgRef.current.style.setProperty('color','red');
                            did.value = '';
                            did.focus();
                        }else{
                            setError({...error,['id']:'사용가능한 아이디입니다'});
                            msgRefs.idMsgRef.current.style.setProperty('color','blue');
                            refs.pwdRef.current.focus();
                        }
                    })
                    .catch(error => console.log(error));
            }
            setIdCheckClick(true);
        }
    
    const handlePasswordCheck = () => {
        const pwdCheck = refs.pwdRef.current;
        const cpwdCheck = refs.cpwdRef.current;
        
        if(pwdCheck.value===''){
            setError({...error,['pwd']:'비밀번호를 입력해주세요'});
            pwdCheck.focus();
        } else if(cpwdCheck.value===''){
            setError({...error,['cpwd']:'비밀번호 확인을 입력해주세요'});
            cpwdCheck.focus();            
        }else if(pwdCheck.value.length < 10){
            setError({...error, ['pwd']:'10자 이상 비밀번호를 입력해주세요'});
            pwdCheck.value = '';
            cpwdCheck.value='';
            pwdCheck.focus();     
            return false;   
        }else{
            if(pwdCheck.value===cpwdCheck.value){
                setError({...error,['pwd']:'비밀번호가 일치합니다'});
                setError({...error,['cpwd']:''});
                msgRefs.pwdMsgRef.current.style.setProperty('color','blue');
            }else{
                setError({...error,['pwd']:'비밀번호가 동일하지않습니다 다시 입력해주세요'});
                pwdCheck.value='';
                cpwdCheck.value='';
                pwdCheck.focus();
            }
        }
    }

    
    const handleSubmit = (e) => {
        e.preventDefault();
        if(signupValidate(refs,error,setError,isChecked1,isChecked2)){
            // 서버 연동 
            if(idCheckClick !== true){
                alert('아이디 중복체크를 진행해주세요');
                return false;
            } else {
                axios
                    .post('http://52.78.224.175:9000/member/signup',{data, adata})
                    .then(res =>{
                        if(res.data.result === 1 ){
                            alert('회원가입성공'); 
                            navigate('/login');
                        }
                    })
                    .catch(error => console.log(error));

            }  
        }
    }
    
    return (
        <>
        <div className="signupBox">
            <section className="signup-wrap">
                <h1>회원가입</h1> 
                <form action="" onSubmit={handleSubmit}>
                <ul>
                    <li className="signup-top ">
                        <label htmlFor="">아이디</label>
                            <div className="dupliBox">
                                <input type="text"  
                                    onChange={handleSignupForm} 
                                    name= 'id'
                                    ref={refs.idRef} 
                                    className="dupliInput"
                                    placeholder="6~20자 사이로 입력해주세요"/>
                                <button type='button' onClick={handleIdCheck} className="dupliId"
                                    ref ={refs.idCheckRef}>
                                    중복확인
                                </button>
                            </div>
                        <span className="signup-err"  style={{color:'red'}}
                        ref={msgRefs.idMsgRef}                        
                           >{error.id}</span>
                    </li>
                    <li className="signup-top">
                        <label htmlFor="">비밀번호</label>
                        <input type="password" 
                            onChange={handleSignupForm} 
                            name= 'pwd'
                            ref={refs.pwdRef}
                            placeholder="10~16자 사이로 입력해주세요"/>
                        <span className="signup-err"  style={{color:'red'}}  
                        ref={msgRefs.pwdMsgRef}
                             >{error.pwd}</span>
                    </li>
                    <li className="signup-top">
                        <label htmlFor="">비밀번호 확인</label>
                        <input type="password"  
                            onChange={handleSignupForm} 
                            onBlur={handlePasswordCheck}
                            name = 'cpwd'
                            ref={refs.cpwdRef}
                            placeholder="비밀번호를 한 번 더 입력해주세요"/>
                        <span className="signup-err"  style={{color:'red'}}                                  
                            >{error.cpwd}</span>
                    </li>
                    <li className="signup-top">
                        <label htmlFor="">이름</label>
                        <input type="text"  
                            onChange={handleSignupForm} 
                            name= "username"
                            ref={refs.usernameRef}
                            placeholder="이름을 입력해주세요"/>
                        <span className="signup-err"   style={{color:'red'}}                              
                            >{error.username}</span>
                    </li>
                    <li className="signup-top">
                        <label htmlFor="">연락처</label>
                        <input type="number"  
                            onChange={handleSignupForm} 
                                name="phone"
                            ref={refs.phoneRef}
                            placeholder="-제외 11자리를 입력해주세요"/>
                        <span className="signup-err"   style={{color:'red'}}                           
                             >{error.phone}</span>
                    </li>
                    <li className="signup-top ">
                        <div className="signup-address">
                            <label htmlFor="">주소</label>
                            <button className="signup-address-btn" type = 'button'onClick={handleToggle}>배송지 선택</button>
                        </div>
                        {isOpen &&
                        <div>
                            <DaumPostcode
                                className="postmodal"
                                theme={themeObj}
                                style={postCodeStyle}
                                onComplete={completeHandler} 
                                onClose={closeHandler}
                            />
                        </div>
                        }
                        <div className="signup-address-line">
                            <input type="text" name="zoneCode" 
                                value={adata.zoneCode}
                                placeholder="우편번호" 
                                ref={refs.zoneCodeRef}
                                onChange={handleSignupForm}/>
                            <input type="text"  
                                onChange={handleSignupForm} 
                                name="address"
                                ref={refs.addressRef}
                                value={adata.address}
                                placeholder="배송주소를 선택해주세요"/>
                        </div>
                        <input className="signup-address-extra"
                            type="text" 
                            ref={refs.addressDetailRef}
                            placeholder="상세 주소를 입력해주세요" 
                            onChange={handleSignupForm}
                            name="addressDetail"/>
                        <span className="signup-err"  style={{color:'red'}}                               
                            >{error.address}</span>
                    </li>
                    <li className="signup-top ">
                        <label htmlFor="">이메일</label>
                        <input type="text"  
                            onChange={handleSignupForm} 
                            name="email"
                            className="signup-email-line"
                            ref={refs.emailRef}
                            placeholder="이메일 주소를 입력해주세요"/>
                        <span className="emailEmt">@</span>
                        <select name="emailDomain" id="" onChange={handleSignupForm}
                            ref={refs.emailDomainRef} className="select-err">
                            <option value="default">선택</option>
                            <option value="naver.com">naver.com</option>
                            <option value="gmail.com">gmail.com</option>
                            <option value="daum.net">daum.net</option>
                        </select>
                        <span className="signup-err"    style={{color:'red'}}                        
                            >{error.email}</span>
                    </li>
                    <li className="signup-top">
                        <label htmlFor="">이용약관</label>
                        <div className="textarea">
                        ssf 이용약관<br />
                        제1조(목적) <br />
                        이 약관은 주식회사 브이에프 코리아 (전자상거래 사업자, 이하 "회사"라고 합니다)가 운영하는 팀버랜드 브랜드 – 사이버스토어 (이하 "스토어"라고 합니다)에서 제공하는 인터넷 관련 서비스(이하 "서비스"라고 합니다)를 이용함에 있어 "스토어"와 이용자의 권리·의무 및 책임사항을 규정함을 목적으로 합니다.
                        ※ PC통신, 모바일, 무선, VoIP, IPTV, 데이터방송 등을 이용하는 전자거래에 대해서도 그 성질에 반하지 않는 한 이 약관을 준용합니다.
                        </div>
                    </li>
                    <li className="signup-bottom">
                        <input type="checkbox" className="checkInput" name="checkBox1" 
                            checked={isChecked1} onChange={handleChecked1}/>
                        <span>(필수) 이용약관에 동의 합니다.</span>
                    </li>
                    <li className="signup-bottom">
                        <label htmlFor="">개인정보수집 이용동의</label>     
                    <table>
                        <tr>
                            <th>일시</th>
                            <th>수집항목</th>
                            <th>수집목적</th>
                            <th>보유기간</th>
                        </tr>
                        <tr>
                            <td>가입시</td>
                            <td>아이디(이메일), 비밀번호, 이름, 전화번호</td>
                            <td>회원식별 및 연락</td>
                            <td>회원 탈퇴시 까지</td>
                        </tr>
                        <tr>
                            <td>거리발생시 (추가)</td>
                            <td>주소, 결제수단정보, 수령인, 연락처</td>
                            <td>결제 및 배송, 불만 처리시 본인확인</td>
                            <td>전상법 등 관련 법률에 의한 보관기간</td>
                        </tr>
                    </table>
                    </li>
                    <li className="signup-bottom">
                        <input type="checkbox" name="checkBox2" className="checkInput"
                            checked={isChecked2} onChange={handleChecked2}/>
                        <span> (필수) 개인정보수집 이용에 동의합니다.</span>
                        <p>※ 약관 및 개인정보 처리방침은 홈페이지 하단에 전문이 게재되어 있습니다.</p>
                        <p>※ 이용약관 및 개인정보 수집.이용 내용에 대해 동의 거부가 가능하며, 이 경우 회원가입 및 관련 서비스는 이용이 불가합니다.</p>
                    </li>
                    <li className="signup-bottom">
                        <input type="checkbox" className="checkInput"/>
                        <span> (선택) 이메일을 통한 상품 및 이벤트 정보 수신에 동의합니다.</span>
                    </li>
                    <li className="signup-bottom">
                        <input type="checkbox"  className="checkInput" />
                        <span> (선택) 휴대폰을 통한 상품 및 이벤트 정보 수신에 동의 합니다. 미동의 시에도 주문 결제와 관련된 정보는 발송됩니다.</span>
                    </li>
                    <li className="signup-bottom">
                        <p>※ 선택 항목으로 동의하지 않아도 불이익을 받지 않습니다.</p>
                        <p>※ 만 14세 미만은 회원가입 및 서비스 이용이 불가합니다.</p>
                    </li>
                </ul>
                <button type="submit">회원가입하기</button>
                </form>
            </section>
        </div>
        </>
    );
}