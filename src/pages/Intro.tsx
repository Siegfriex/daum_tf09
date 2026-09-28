import { useState } from "react";
import { useNavigate } from "react-router-dom";

// 소개 슬라이드 한 장(1920×1080) — scripts/pdf_to_intro.sh 가 public/intro/ 에 만든다.
// base 가 /daum_tf09/ 이므로 절대경로("/intro/…") 대신 BASE_URL 을 붙인다.
const BASE = import.meta.env.BASE_URL;
const INTRO_IMG = BASE + "intro/intro.jpg";
const INTRO_PDF = BASE + "intro/intro.pdf";

export default function Intro() {
  const nav = useNavigate();
  const [missing, setMissing] = useState(false);

  return (
    <main className="intro">
      <div className="intro-page">
        {missing ? (
          <div className="intro-empty">소개 PDF 대기 중 — public/intro/intro.jpg</div>
        ) : (
          <a href={INTRO_PDF} target="_blank" rel="noreferrer" title="PDF 원본 열기">
            <img src={INTRO_IMG} width={3840} height={2160} alt="서비스 소개 — 텍스트·시장 상태 추정 파이프라인" onError={() => setMissing(true)} />
          </a>
        )}
      </div>
      <div className="intro-cta">
        <button className="intro-enter" onClick={() => nav("/money")}>머니 홈으로</button>
        {!missing && (
          <a className="intro-pdf" href={INTRO_PDF} target="_blank" rel="noreferrer">PDF 원본 보기</a>
        )}
      </div>
    </main>
  );
}
