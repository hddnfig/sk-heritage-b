import { useEffect, useRef, useState } from "react";
import "@fontsource/prociono/400.css";
import "@fontsource/noto-serif-kr/400.css";
import { ArrowRight, CaretDown, CaretLeft, CaretRight, GlobeSimple, UserCircle } from "@phosphor-icons/react";

function RevealLines({ as: Tag = "div", className = "", lines, delay = 0, eager = false }) {
  return (
    <Tag className={`reveal-block ${className} ${eager ? "is-visible" : ""}`.trim()} data-reveal style={{ "--reveal-delay": `${delay}ms` }}>
      {lines.map((line, index) => (
        <span className="reveal-mask" key={`${index}-${line}`}><span className="reveal-line" style={{ "--line-index": index }}>{line}</span></span>
      ))}
    </Tag>
  );
}

function RevealInline({ children, delay = 0 }) {
  return <span className="reveal-inline-mask" data-reveal style={{ "--reveal-delay": `${delay}ms` }}><span className="reveal-line">{children}</span></span>;
}

const heroRays = [
  { angle: 0, endAngle: 0, length: 420, direction: "primary" },
  ...Array.from({ length: 24 }, (_, index) => ({ angle: (index + 1) * 7.5, endAngle: 180, length: 285 + (((index + 1) * 37) % 135), direction: "clockwise" })),
];

const places = [
  { code: "S1", label: "SK 기념관", image: "/assets/place-memorial.png", title: "두 거목의 정신을 기리는 곳, SK기념관", category: "경기도 용인시 처인구 원삼면", copy: "실제 선경직물 수원공장 관리동을 이전·복원한 추모관을 중심으로, 최종건 창업회장과 최종현 선대회장의 일대기와 유품, 경영철학을 통해 오늘의 SK를 만든 도전의 역사를 전합니다.", cta: "SK기념관 자세히보기" },
  { code: "S2", label: "SK 선혜원", image: "/assets/place-sunhye.png", title: "시간이 머무는 집, 선혜원", category: "서울 종로구 선혜원", copy: "1968년, SK 창업주의 사저로 시작된 선혜원은 전통 한옥과 현대 건축, 예술이 어우러지는 새로운 문화 공간으로 이어지고 있습니다.", cta: "선혜원 자세히보기" },
  { code: "S3", label: "SK 고택", image: "/assets/place-gotaek.png", title: "창업의 뿌리가\n살아있는 집\nSK고택", category: "경기도 수원시 권선구 평동", copy: "최종건 창업회장과 최종현 선대회장이 태어나 성장한 생가를 복원한 공간입니다. 1950~1960년대의 생활상과 두 경영인의 기업가정신을 담아 2024년 기념관으로 문을 열었습니다.", cta: "SK고택 자세히보기" },
];

const objects = [
  { mono: "/assets/object-loom-mono.png", color: "/assets/object-loom-color.png", title: "선경직물 직기", copy: "1960년대 선경직물 수원공장에서 원단을 생산하던 직기. 다시 시작한 역사의 상징입니다." },
  { mono: "/assets/object-rooster-mono.png", color: "/assets/object-rooster-color.png", title: "닭표 안감 ‘수탉 모형’", copy: "당시 선경직물의 대표 제품이었던 닭표 안감을 상징한 홍보 조형물입니다." },
  { mono: "/assets/object-jeep-mono.png", color: "/assets/object-jeep-color.png", title: "최종현 선대회장의 차량", copy: "산업 현장과 세계 곳곳을 누비며 도전의 길을 달렸던 최종현 선대회장의 차량입니다." },
];

const stories = [
  { image: "/assets/story-quiz.png", title: "배움의 기회는\n더 넓어져야 한다", copy: "교육과 장학을 향한 꾸준한 관심은 방송과 다양한 사회공헌 활동으로 이어졌습니다." },
  { image: "/assets/story-loom-room.png", title: "멈춰있던 기계가\n돌아가기 시작했다", copy: "1953년 전쟁으로 폐허가 된 수원공장. 잿더미 속에서 부품을 찾아 직조기계를 다시 움직였습니다." },
  { image: "/assets/story-ship.png", title: "끝없이 이어지는 실처럼\n뻗어나가는 우리 직물", copy: "인도네시아 수출을 위해 원단을 선적하던 순간. 선경은 세계를 향한 발걸음을 넓혔습니다." },
  { image: "/assets/story-scholarship.png", title: "수학보다 중요한 것은\n‘심기’", copy: "세계적인 인재 양성을 위한 장학 사업은 학문과 사람을 함께 키우는 SK의 믿음을 보여줍니다." },
];

export function App() {
  const placeStage = useRef(null);
  const [languageOpen, setLanguageOpen] = useState(false);
  const [historyStep, setHistoryStep] = useState(0);
  const [objectStep, setObjectStep] = useState(0);
  const [storyStep, setStoryStep] = useState(0);
  const [placeIndex, setPlaceIndex] = useState(1);
  const [placesEntered, setPlacesEntered] = useState(false);

  useEffect(() => {
    const elements = document.querySelectorAll("[data-reveal]");
    const observer = new IntersectionObserver((entries) => entries.forEach((entry) => {
      if (entry.isIntersecting) { entry.target.classList.add("is-visible"); observer.unobserve(entry.target); }
    }), { threshold: 0.08, rootMargin: "0px 0px -5% 0px" });
    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const stage = placeStage.current;
    if (!stage) return undefined;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setPlacesEntered(true);
        observer.disconnect();
      }
    }, { threshold: 0.12, rootMargin: "0px 0px -6% 0px" });
    observer.observe(stage);
    return () => observer.disconnect();
  }, []);

  return (
    <main className="site-shell">
      <header className="topbar">
        <a className="brand" href="#top"><RevealInline delay={350}><strong>SK</strong> Heritage</RevealInline></a>
        <nav className="main-nav" aria-label="주요 메뉴">
          <a href="#history"><RevealInline delay={450}>그룹 역사</RevealInline></a>
          <a href="#places"><RevealInline delay={500}>SK 헤리티지관</RevealInline></a>
          <a href="#objects"><RevealInline delay={550}>전시·소장품</RevealInline></a>
          <a href="#stories"><RevealInline delay={600}>뉴스 보도</RevealInline></a>
        </nav>
        <div className="utility-nav">
          <button className="language-button" onClick={() => setLanguageOpen((value) => !value)}><GlobeSimple size={17} weight="bold" /> 한국어 <CaretDown size={12} /></button>
          {languageOpen && <div className="language-menu"><button>한국어</button><button>English</button></div>}
          <a href="#footer"><UserCircle size={17} weight="fill" /> MY</a>
        </div>
      </header>

      <section id="top" className="hero">
        <img src="/assets/hero.png" alt="뉴욕 도심에 선 젊은 최종현 선대회장" />
        <div className="hero-shade" />
        <div className="hero-word hero-word-left">
          <span className="hero-word-mask"><b className="hero-word-line hero-glyph-swap" aria-label="S"><span className="hero-glyph hero-glyph-original">鮮</span><span className="hero-glyph hero-glyph-letter">S</span></b></span>
          <span className="hero-word-mask"><span className="hero-word-line hero-word-korean">선</span></span><span className="hero-word-mask"><small className="hero-word-line">BEAUTIFUL</small></span>
        </div>
        <div className="hero-word hero-word-right">
          <span className="hero-word-mask"><b className="hero-word-line hero-glyph-swap" aria-label="K"><span className="hero-glyph hero-glyph-original">京</span><span className="hero-glyph hero-glyph-letter">K</span></b></span>
          <span className="hero-word-mask"><span className="hero-word-line hero-word-korean">경</span></span><span className="hero-word-mask"><small className="hero-word-line">PLACES</small></span>
        </div>
        <div className="hero-center">
          <div className="hero-line-sequence" aria-hidden="true"><div className="hero-rays">{heroRays.map((ray, index) => <span className={`hero-ray hero-ray-${ray.direction}`} key={index} style={{ "--ray-angle": `${ray.angle}deg`, "--ray-end-angle": `${ray.endAngle}deg`, "--ray-scale": ray.length / 1100, "--ray-index": index }} />)}</div></div>
          <RevealLines as="h1" lines={["한 세대의 신념이,", "다음 시대의 가치로"]} delay={6250} />
          <RevealLines as="p" lines={["Built through time. Carried into tomorrow."]} delay={6750} />
          <a className="outline-button motion-control" href="#places" data-reveal style={{ "--reveal-delay": "6950ms" }}><span className="reveal-line">역사 속으로 <ArrowRight size={16} /></span></a>
        </div>
      </section>

      <section id="places" className="places-section">
        <div className="places-heading"><RevealLines as="h2" lines={["Beautiful", "Places"]} /><RevealLines as="p" lines={["SK 그룹의 역사가 고스란히 살아있는", "아름다운 장소와 공간"]} /></div>
        <div className="places-seal"><strong>鮮京</strong><span>선 [BEAUTIFUL]&nbsp;&nbsp;&nbsp; 경 [PLACES]</span></div>
        <div className="places-stage" ref={placeStage}>
          {places.map((item, index) => (
            <article
              className={`place-card ${placeIndex === index ? "is-active" : "is-folded"} ${placesEntered ? "is-entered" : ""}`}
              key={item.code}
              style={{ "--place-card-index": index }}
              role="button"
              tabIndex={0}
              aria-pressed={placeIndex === index}
              onClick={() => setPlaceIndex(index)}
              onKeyDown={(event) => { if (event.key === "Enter" || event.key === " ") setPlaceIndex(index); }}
            >
              <div className="place-card-media"><span>{item.label}</span><img src={item.image} alt={item.label} /></div>
              <div className="place-copy">
                <h3>{item.title.split(/\n|,\s*/).map((line, lineIndex) => <span className="place-text-mask" key={`${line}-${lineIndex}`}><span className="place-text-line" style={{ "--place-line": lineIndex }}>{line}</span></span>)}</h3>
                <div className="place-text-mask place-meta-mask"><b className="place-text-line" style={{ "--place-line": 2 }}>{item.category}</b></div>
                <div className="place-text-mask place-description-mask"><p className="place-text-line" style={{ "--place-line": 3 }}>{item.copy}</p></div>
                <div className="place-text-mask place-cta-mask"><button className="place-text-line" style={{ "--place-line": 4 }} tabIndex={placeIndex === index ? 0 : -1}>{item.cta} <ArrowRight /></button></div>
              </div>
            </article>
          ))}
        </div>
        <div className="place-index">{places.map((item, index) => <button className={placeIndex === index ? "is-active" : ""} key={item.code} onClick={() => setPlaceIndex(index)}><i /><span>{item.code}</span></button>)}</div>
      </section>

      <section id="history" className="history-section history-new">
        <div className="history-heading"><RevealLines as="h2" lines={["History"]} /><RevealLines className="history-since" lines={["Since", "1950"]} /></div>
        <div className="history-controls"><button disabled={historyStep === 0} onClick={() => setHistoryStep((step) => Math.max(0, step - 1))}><CaretLeft /></button><button disabled={historyStep === 2} onClick={() => setHistoryStep((step) => Math.min(2, step + 1))}><CaretRight /></button></div>
        <div className={`history-new-track step-${historyStep}`}>
          <div className="history-ornament history-ornament-lower" aria-hidden="true"><i /><i /></div>
          <article className="history-new-card history-new-1950"><RevealInline>1950</RevealInline><img src="/assets/history-new-1950.png" alt="1950년 선경직물 공장 정문" /></article>
          <RevealLines as="p" className="history-new-copy" lines={["모직물이 씨줄과 날줄로 되어 있는 것처럼,", "인생이라는 직물은 성공과 실패가 반복되면서 직조된다.", "그러므로 한 번 실패했다고 해서 두려워하거나", "실망할 필요는 전혀 없다."]} />
          <article className="history-new-card history-new-1953"><RevealInline>1953</RevealInline><img src="/assets/history-new-1953.png" alt="1953년 공장 건물" /></article>
          <article className="history-new-card history-new-1966"><RevealInline>1966</RevealInline><img src="/assets/history-new-1966.png" alt="1966년 생산 현장" /></article>
          <RevealLines as="p" className="history-era-copy history-copy-1969" lines={["폴리에스터를 생산하는 선경합섬을 설립하고 공장을 가동하며,", "원사 생산이라는 오랜 꿈을 마침내 이루었습니다."]} />
          <article className="history-new-card history-new-1969"><RevealInline>1969</RevealInline><img src="/assets/history-1969.png" alt="1969년 선경합섬 공장" /></article>
          <article className="history-new-card history-new-1973"><RevealInline>1973</RevealInline><img src="/assets/history-1973.png" alt="1973년 MBC 장학퀴즈 첫 방송" /></article>
          <RevealLines as="p" className="history-era-copy history-copy-1973" lines={["나라에 필요한 인재를 키우기 위해 선경이 후원한 MBC 장학퀴즈는", "1973년 첫 방송을 시작으로 오랜 시간 인재 양성의 뜻을 이어갔습니다."]} />
        </div>
        <a className="history-link" href="#stories">SK 히스토리 전체보기 <ArrowRight /></a>
      </section>

      <section id="objects" className="object-section">
        <div className="object-head"><RevealLines as="h2" lines={["Object"]} /><div className="object-controls"><button aria-label="이전 오브젝트" disabled={objectStep === 0} onClick={() => setObjectStep(0)}><CaretLeft /></button><button aria-label="다음 오브젝트" disabled={objectStep === 1} onClick={() => setObjectStep(1)}><CaretRight /></button></div></div>
        <div className="object-layout">
          <div className="object-intro"><RevealLines as="p" lines={["도전과 혁신으로 가득했던", "SK그룹의 주요 성장 이야기와 담긴", "유물과 주요 물품들을 살펴보세요."]} /><a className="dark-button" href="#stories">전시 모두 보기 <ArrowRight /></a></div>
          <div className="object-viewport"><div className={`object-grid step-${objectStep}`}>{objects.map((item) => <article className="object-card" key={item.title}><div className="object-image"><img className="object-mono" src={item.mono} alt={item.title} /><img className="object-color" src={item.color} alt="" /></div><RevealLines as="h3" lines={[item.title]} /><RevealLines as="p" lines={[item.copy]} /></article>)}</div></div>
        </div>
      </section>

      <section className="legacy-banner"><img src="/assets/legacy-new.png" alt="SK 생산 현장을 둘러보는 선대회장" /><div className="legacy-overlay" /><div className="legacy-content"><RevealLines as="h2" lines={["SK의 역사와 창업회장, 선대회장의 정신을 되새겨 봅니다."]} /><RevealLines as="p" lines={["한국 경제의 두 거목 최종건 창업회장, 최종현 선대회장.", "불굴의 도전정신과 열정의 발자취를 따라가고,", "SK그룹의 역사와 경영철학의 계승, 발전을 다짐봅니다."]} /><a className="frost-button" href="#stories">추모 갤러리 <ArrowRight /></a></div></section>

      <section id="stories" className="story-section">
        <div className="story-head">
          <RevealLines as="h2" lines={["끝없는 역사를 써내려가는 SK 그룹의", "이야기 조각들을 살펴보세요."]} />
          <div>
            <button aria-label="이전 이야기" disabled={storyStep === -1} onClick={() => setStoryStep((step) => Math.max(-1, step - 1))}><CaretLeft /></button>
            <button aria-label="다음 이야기" disabled={storyStep === 1} onClick={() => setStoryStep((step) => Math.min(1, step + 1))}><CaretRight /></button>
          </div>
        </div>
        <div className="story-viewport">
          <div className={`story-rail story-step-${storyStep === -1 ? "left" : storyStep === 1 ? "right" : "center"}`}>
            {stories.map((story, index) => <article className="story-card" key={index}><div className="story-image"><img src={story.image} alt="" /></div><RevealLines as="p" lines={[story.copy]} /><RevealLines as="h3" lines={story.title.split("\n")} /></article>)}
          </div>
        </div>
      </section>

      <footer id="footer" className="footer-new"><RevealLines as="h2" lines={["한 세대의 신념이,", "다음 시대의 가치로."]} /><p>Built through time. Carried into tomorrow.</p><img src="/assets/sk-heritage-logo.png" alt="SK Heritage" /><small>© SK HERITAGE MUSEUM, All Rights Reserved.</small></footer>
    </main>
  );
}
