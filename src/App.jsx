import { useEffect, useRef, useState } from "react";
import "@fontsource/prociono/400.css";
import "@fontsource/noto-serif-kr/400.css";
import {
  ArrowRight,
  CaretDown,
  CaretLeft,
  CaretRight,
  GlobeSimple,
  UserCircle,
} from "@phosphor-icons/react";

function RevealLines({ as: Tag = "div", className = "", lines, delay = 0, eager = false }) {
  return (
    <Tag className={`reveal-block ${className} ${eager ? "is-visible" : ""}`.trim()} data-reveal style={{ "--reveal-delay": `${delay}ms` }}>
      {lines.map((line, index) => (
        <span className="reveal-mask" key={`${index}-${String(line)}`}>
          <span className="reveal-line" style={{ "--line-index": index }}>{line}</span>
        </span>
      ))}
    </Tag>
  );
}

function RevealInline({ children, delay = 0, eager = false }) {
  return (
    <span className={`reveal-inline-mask ${eager ? "is-visible" : ""}`} data-reveal style={{ "--reveal-delay": `${delay}ms` }}>
      <span className="reveal-line">{children}</span>
    </span>
  );
}

const heroRays = [
  { angle: 0, endAngle: 0, length: 420, direction: "primary" },
  ...Array.from({ length: 24 }, (_, index) => ({
    angle: (index + 1) * 7.5,
    endAngle: 180,
    length: 285 + (((index + 1) * 37) % 135),
    direction: "clockwise",
  })),
];

const exhibits = [
  {
    image: "/assets/exhibit-loom.png",
    title: "전시물 이름",
    copy: "1953년 한국전쟁으로 폐허가 된 수원공장, 잿더미 속에서 부품을 찾아 재조립한 직조기계로 만든 제품은 SK의 재건 의지를 상징합니다.",
  },
  {
    image: "/assets/exhibit-rooster.png",
    title: "전시물 이름",
    copy: "1953년 한국전쟁으로 폐허가 된 수원공장, 잿더미 속에서 부품을 찾아 재조립한 직조기계와 기업사의 한 시대를 기억합니다.",
  },
  {
    image: "/assets/exhibit-jeep.png",
    title: "최종현 선대회장의 지프",
    copy: "한국 산업화의 길을 누비며 현장을 살핀 선대회장의 도전과 실천의 흔적을 담은 소장품입니다.",
  },
];

const stories = [
  {
    image: "/assets/story-quiz.png",
    title: "배움의 기회는\n더 넓어져야 한다",
    copy: "교육과 장학을 향한 꾸준한 관심은 방송과 다양한 사회공헌 활동으로 이어졌습니다.",
  },
  {
    image: "/assets/story-loom-room.png",
    title: "멈춰있던 기계가\n돌아가기 시작했다",
    copy: "1953년 한국전쟁으로 폐허가 된 수원공장. 잿더미 속에서 부품을 찾아 재조립한 직조기계는 SK의 다시 시작을 알렸습니다.",
  },
  {
    image: "/assets/story-ship.png",
    title: "끝없이 이어지는 실처럼\n뻗어나가는 우리 직물",
    copy: "인도네시아에 수출하기 위해 폴리에스터 원단을 선적하고 있다. 선경은 1976년 수출액 1억 1,335만 달러를 기록했다.",
  },
  {
    image: "/assets/story-scholarship.png",
    title: "수학보다 중요한 것은\n‘심기’",
    copy: "세계적인 인재 양성을 위한 고등교육재단의 장학 사업은 학문과 사람을 함께 키우는 SK의 오랜 믿음을 보여줍니다.",
  },
  {
    image: "/assets/story-quiz.png",
    title: "배움의 기회는\n더 넓어져야 한다",
    copy: "교육과 장학을 향한 꾸준한 관심은 방송과 다양한 사회공헌 활동으로 이어졌습니다.",
  },
];

export function App() {
  const exhibitTrack = useRef(null);
  const storyTrack = useRef(null);
  const [languageOpen, setLanguageOpen] = useState(false);
  const [historyStep, setHistoryStep] = useState(0);

  useEffect(() => {
    const elements = document.querySelectorAll("[data-reveal]");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -7% 0px" },
    );

    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);

  const scrollTrack = (ref, direction) => {
    const distance = Math.max(320, (ref.current?.clientWidth ?? 860) * 0.65);
    ref.current?.scrollBy({ left: direction * distance, behavior: "smooth" });
  };

  return (
    <main className="site-shell">
      <header className="topbar">
        <a className="brand" href="#top" aria-label="SK Heritage 홈">
          <RevealInline delay={350}><strong>SK</strong> Heritage</RevealInline>
        </a>
        <nav className="main-nav" aria-label="주요 메뉴">
          <a href="#history"><RevealInline delay={450}>그룹 역사</RevealInline></a>
          <a href="#exhibitions"><RevealInline delay={500}>SK 헤리티지관</RevealInline></a>
          <a href="#stories"><RevealInline delay={550}>전시·소장품</RevealInline></a>
          <a href="#stories"><RevealInline delay={600}>뉴스 보도</RevealInline></a>
        </nav>
        <div className="utility-nav">
          <button className="language-button" onClick={() => setLanguageOpen((value) => !value)} aria-expanded={languageOpen}>
            <GlobeSimple size={17} weight="bold" /> 한국어 <CaretDown size={12} weight="bold" />
          </button>
          {languageOpen && <div className="language-menu"><button>한국어</button><button>English</button></div>}
          <a href="#footer"><UserCircle size={17} weight="fill" /> MY</a>
        </div>
      </header>

      <section id="top" className="hero" aria-label="SK Heritage 메인 비주얼">
        <img src="/assets/hero.png" alt="뉴욕 도심에 선 젊은 최종현 선대회장" />
        <div className="hero-shade" />
        <div className="hero-word hero-word-left">
          <span className="hero-word-mask"><b className="hero-word-line">鮮</b></span>
          <span className="hero-word-mask"><span className="hero-word-line hero-word-korean">선</span></span>
          <span className="hero-word-mask"><small className="hero-word-line">BEAUTIFUL</small></span>
        </div>
        <div className="hero-word hero-word-right">
          <span className="hero-word-mask"><b className="hero-word-line">京</b></span>
          <span className="hero-word-mask"><span className="hero-word-line hero-word-korean">경</span></span>
          <span className="hero-word-mask"><small className="hero-word-line">PLACES</small></span>
        </div>
        <div className="hero-center">
          <div className="hero-line-sequence" aria-hidden="true">
            <div className="hero-rays">
              {heroRays.map((ray, index) => (
                <span
                  className={`hero-ray hero-ray-${ray.direction}`}
                  key={index}
                  style={{
                    "--ray-angle": `${ray.angle}deg`,
                    "--ray-end-angle": `${ray.endAngle}deg`,
                    "--ray-scale": ray.length / 1100,
                    "--ray-index": index,
                  }}
                />
              ))}
            </div>
          </div>
          <RevealLines as="h1" lines={["한 세대의 신념이,", "다음 시대의 가치로"]} delay={6250} />
          <RevealLines as="p" lines={["Built through time. Carried into tomorrow."]} delay={6750} />
          <a className="outline-button motion-control" href="#history" data-reveal style={{ "--reveal-delay": "6950ms" }}><span className="reveal-line">연혁 더보기 <ArrowRight size={16} /></span></a>
        </div>
      </section>

      <section id="history" className="history-section">
        <RevealLines as="h2" lines={["History"]} />
        <div className="history-controls" aria-label="연혁 이동">
          <button
            type="button"
            aria-label="이전 연혁 보기"
            disabled={historyStep === 0}
            onClick={() => setHistoryStep((step) => Math.max(0, step - 1))}
          >
            <CaretLeft size={24} weight="light" />
          </button>
          <button
            type="button"
            aria-label="다음 연혁 보기"
            disabled={historyStep === 3}
            onClick={() => setHistoryStep((step) => Math.min(3, step + 1))}
          >
            <CaretRight size={24} weight="light" />
          </button>
        </div>
        <div className="history-canvas">
          <div className="history-track" style={{ "--history-shift": historyStep }}>
            <span className="history-line history-line-1950" aria-hidden="true" />
            <span className="history-line history-line-continuous" aria-hidden="true">
              <i className="history-line-accent history-line-accent-first" />
              <i className="history-line-accent history-line-accent-second" />
            </span>
            <article className="history-card history-1950">
              <span className="year"><RevealInline>1950</RevealInline></span>
              <img src="/assets/history-1950.png" alt="1950년 선경직물 공장 정문" />
            </article>
            <RevealLines as="p" className="history-copy" lines={["모직물이 세관과 날줄로 되어 있는 것처럼,", "인생이라는 직물은 성공과 실패가 반복되면서 직조된다.", "그러므로 한 번 실패했다고 해서 두려워하거나", "실망할 필요는 전혀 없다."]} />
            <article className="history-card history-1953">
              <span className="year"><RevealInline>1953</RevealInline></span>
              <img src="/assets/history-1953.png" alt="1953년 공장 건물" />
            </article>
            <article className="history-card history-1966">
              <span className="year"><RevealInline>1966</RevealInline></span>
              <img src="/assets/history-1966.png" alt="1966년 섬유 생산 현장" />
            </article>
            <article className="history-card history-1969">
              <span className="year"><RevealInline>1969</RevealInline></span>
              <img src="/assets/history-1969.png" alt="1969년 선경합섬 폴리에스터 공장 전경" />
            </article>
            <RevealLines
              as="p"
              className="history-detail history-detail-1969"
              lines={["폴리에스터를 생산하는 선경합섬을 설립하고,", "공장을 가동하며 원사 생산이라는 오랜 꿈을", "마침내 이루었습니다."]}
            />
            <article className="history-card history-1973">
              <span className="year"><RevealInline eager={historyStep >= 2}>1973</RevealInline></span>
              <img src="/assets/history-1973.png" alt="1973년 MBC 장학퀴즈 방송 현장" />
            </article>
            <RevealLines
              as="p"
              className="history-detail history-detail-1973"
              eager={historyStep >= 2}
              lines={["나라에 필요한 인재를 키우기 위해 선경이 후원한", "MBC 장학퀴즈는 1973년 첫 방송을 시작으로", "오랜 시간 인재 양성의 뜻을 이어갔습니다."]}
            />
          </div>
        </div>
        <a className="history-link motion-control" href="#stories" data-reveal><span className="reveal-line">SK 히스토리 전체보기 <ArrowRight size={16} /></span></a>
      </section>

      <section id="exhibitions" className="exhibit-section">
        <div className="exhibit-intro">
          <RevealLines as="p" lines={["도전과 혁신으로 가득했던", "SK그룹의 주요 성장 이야기와 담긴", "유물과 주요 물품들을 살펴보세요."]} />
          <a className="dark-button motion-control" href="#stories" data-reveal><span className="reveal-line">전시 모두 보기 <ArrowRight size={16} /></span></a>
        </div>
        <div className="exhibit-rail-wrap">
          <div className="exhibit-rail" ref={exhibitTrack}>
            {exhibits.map((item) => (
              <article className="exhibit-card" key={item.image}>
                <div className="exhibit-image"><img src={item.image} alt={item.title} /></div>
                <RevealLines as="h3" lines={[item.title]} />
                <RevealLines as="p" lines={item.copy.split(/(?<=\.)\s+/)} />
              </article>
            ))}
          </div>
          <div className="rail-controls" aria-label="전시 슬라이드 이동">
            <button onClick={() => scrollTrack(exhibitTrack, -1)} aria-label="이전 전시"><CaretLeft /></button>
            <span /><button onClick={() => scrollTrack(exhibitTrack, 1)} aria-label="다음 전시"><CaretRight /></button>
          </div>
        </div>
      </section>

      <section className="legacy-banner">
        <div className="legacy-media">
          <img src="/assets/cta.png" alt="SK의 역사를 만든 인물들" />
          <div className="legacy-overlay" />
        </div>
        <div className="legacy-content">
          <RevealLines as="h2" lines={["SK의 역사와 창업회장, 선대회장의 정신을 되새겨 봅니다."]} />
          <RevealLines as="p" lines={["한강 경제의 첫 기록, 최종현 창업회장, 최종현 선대회장.", "오늘의 SK를 만들어낸 생각과 발자취를 따라가며,", "SK그룹의 역사와 경영철학의 사람, 정신을 되새깁니다."]} />
          <a className="frost-button motion-control" href="#stories" data-reveal><span className="reveal-line">추모 갤러리 <ArrowRight size={16} /></span></a>
        </div>
      </section>

      <section id="stories" className="story-section">
        <RevealLines as="h2" lines={["끝없는 역사를 써내려가는 SK 그룹의", "이야기 조각들을 살펴보세요."]} />
        <div className="story-rail" ref={storyTrack}>
          {stories.map((story, index) => (
            <article className="story-card" key={`${story.image}-${index}`}>
              <div className="story-image">
                <img src={story.image} alt={story.title.replace("\n", " ")} />
                <button className="card-next" onClick={() => scrollTrack(storyTrack, 1)} aria-label="다음 이야기"><CaretRight size={22} /></button>
                {index === 0 && <button className="card-prev" onClick={() => scrollTrack(storyTrack, -1)} aria-label="이전 이야기"><CaretLeft size={22} /></button>}
              </div>
              <RevealLines as="p" lines={story.copy.split(/(?<=\.)\s+/)} />
              <RevealLines as="h3" lines={story.title.split("\n")} />
            </article>
          ))}
        </div>
      </section>

      <footer id="footer" className="footer">
        <img className="footer-left-art" src="/assets/footer-left.png" alt="SK 윤리경영 상담·제보와 저작권 정보" />
        <img className="footer-wa-art" src="/assets/footer-wa.png" alt="웹 접근성 품질인증 마크" />
      </footer>
    </main>
  );
}
