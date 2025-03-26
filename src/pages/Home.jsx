import { useEffect, useState } from "react";
import SectionWrap from "../components/SectionWrap.jsx";
import Events from "../components/mainContents/Events.jsx";
import Brand from "../components/mainContents/Brand.jsx";
import Outer from "../components/mainContents/Outer.jsx";
import Rank from "../components//mainContents/Rank.jsx";
import Issue from "../components/mainContents/Issue.jsx";
import MainSlider from "../components/mainContents/MainSlide/MainSlider.jsx";
import SubSlideWrap from "../components/mainContents/SubSlide/SubSlideWrap.jsx";
import HotBrand from "../components/mainContents/HotBrands/HotBrand.jsx";
import PopUp from '../components/mainContents/PopUp.jsx';
import { useParams } from "react-router-dom";
import SlideUp from "../commons/SlideUp.jsx";
export default function Home() {

  const { pid } = useParams();
  
  useEffect(() => { // 메인으로 돌아갈 때마다 이전에 봤던 상품 아이디 삭제
    sessionStorage.removeItem("pid", pid);
  }, []);

  const sectionList = [
    { id: "event", title: "이벤트"},
    { id: "newSense", title: "새 계절을 깨우는 나만의 감각"},
    { id: "rank", title: "랭킹" },
    { id: "brands", title: "주목할 브랜드" },
    { id: "issue", title: "이 주의 브랜드 이슈" }
  ];

  const componentMap = { //컴포넌트 자동 생성
    event: Events,
    outer: Outer,
    rank: Rank,
    brands: Brand,
    issue: Issue,
  };

  const renderComponent = (childObj) => {
    const Component = componentMap[childObj.id];
    if (!Component) return null;

    return (
      <Component
        key={childObj.id}
        {...(childObj.props || {})} // Spread `props` if they exist
      >
        {/* Children rendering can be omitted since children key is unused */}
      </Component>
    );
  };

  // 서브 슬라이드 버튼 이벤트
  const [curSlide, setcurSlide] = useState(0); // 이미지 인덱스 번호

  const moveToSubSlide = (value) => {
    if (value === 'next' && curSlide < 3) {
      setcurSlide(curSlide + 1);
    }
    if (value === 'prev' && curSlide > 0) {
      setcurSlide(curSlide - 1);
    }
  }

  return (
    <main id='content'>
      {/* 슬라이드 시작 */}
      <div className="key-visual mainSlider-container">
        <MainSlider />
      </div>

      {/* 컨텐츠 시작 */}
      <div className='contents content-wrap'>
        <div className="corner-section">
          <section className="our-picks-gods"  id="ourPickOURPICK_AType23360">
            <div className="subSlide-container swiper swiper-initialized swiper-horizontal swiper-pointer-events swiper-backface-hidden">
                {/* 서브 슬라이드 */}
              <div className="swiper-wrapper" id="swiper-wrapper-17c64f0812c5c608"
                style={{
                  transform: `translateX(${-1415 * curSlide}px)`,
                  transition: 'all 0.4s ease-in-out'
                }}
              >
                <SubSlideWrap />
              </div>
              {/* 서브 슬라이드 버튼 */}
              <div className="swiper-button-control">
                <div onClick={() => moveToSubSlide("prev")} className="swiper-button-prev swiper-button-disabled" ></div>
                <div className="swiper-pagination swiper-pagination-fraction swiper-pagination-horizontal">
                  <span className="swiper-pagination-current">{curSlide + 1}</span> / <span className="swiper-pagination-total">4</span>
                  </div>
                <div onClick={() => moveToSubSlide("next")} className="swiper-button-next"></div>
              </div>
              <span className="swiper-notification"></span>
            </div>
          </section>
          {/* 브랜드 슬라이드 */}
          <HotBrand></HotBrand>

          {/* 이벤트부터 컴포넌트 자동으로 만들어가기 스타트 */}
          {sectionList && sectionList.map((section) => (
            <SectionWrap
              key={section.id}
              id={section.id}
              title={section.title}
            >
              {/* Render children if they exist */}
              {Array.isArray(section.children) &&
                section.children.map((child) => renderComponent(child))}
            </SectionWrap>
          ))}
          {/* 컨텐츠 끝   */}
          <PopUp />

          {/* 위로 올라가는 슬라이드 버튼 */}
          <SlideUp />
        </div>
      </div>
    </main>
  );
}