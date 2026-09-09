import { Link } from "react-router-dom";
import { AppBar, SectionHead, DemoFlag } from "../components/ui";
import { MarketIssueCard } from "../components/IssueCard";
import { QUOTE, ISSUE } from "../data/issues";

export default function SearchResult() {
  return (
    <>
      <AppBar title="검색" back />
      <div className="searchbar">
        <div className="f">삼성전자</div>
      </div>
      <main className="scroll">
        {/* 기존 실시간 증권정보 */}
        <section className="quote">
          <div className="h">
            <b>{QUOTE.name}</b>
            <span>{QUOTE.code}</span>
          </div>
          <div className="price">{QUOTE.price}</div>
          <div className="chg">{QUOTE.change}</div>
          <div className="chart">
            <svg viewBox="0 0 300 150" preserveAspectRatio="none" aria-hidden="true">
              <polyline
                points="0,110 25,96 50,104 75,78 100,86 125,60 150,68 175,50 200,58 225,40 250,52 275,36 300,44"
                fill="none" stroke="var(--finance-up)" strokeWidth="2"
              />
            </svg>
          </div>
          <div className="kv">
            {QUOTE.rows.map((r) => (
              <div key={r[0]} style={{ display: "contents" }}>
                <span className="k">{r[0]}</span>
                <span className="v">{r[1]}</span>
                <span className="k">{r[2]}</span>
                <span className="v">{r[3]}</span>
              </div>
            ))}
          </div>
        </section>

        <div className="divider" />

        {/* 관련 시장 이슈 — 증권정보 직후 / AI 요약 직전 */}
        <section className="slot">
          <SectionHead title="관련 시장 이슈" />
          <MarketIssueCard issue={ISSUE} />
        </section>

        <div className="divider" />

        {/* 기존 AI 요약 */}
        <section className="slot" style={{ padding: "16px" }}>
          <div style={{ display: "flex", alignItems: "center" }}>
            <h2 style={{ margin: 0, fontSize: 18, fontWeight: 700 }}>AI 요약</h2>
            <span style={{ marginLeft: "auto", fontSize: 14, color: "var(--text-48)" }}>Powered by Solar</span>
          </div>
          <p style={{ margin: "10px 0 0", fontSize: 17, lineHeight: 1.55, color: "var(--text-88)" }}>
            {QUOTE.aiSummary}
          </p>
        </section>

        <div className="divider" />

        <section className="slot" style={{ padding: 16 }}>
          <Link to="/news/samsung" style={{ color: "var(--accent)", fontSize: 16 }}>
            뉴스에서 설명축 변화 보기 →
          </Link>
        </section>

        <DemoFlag />
      </main>
    </>
  );
}
