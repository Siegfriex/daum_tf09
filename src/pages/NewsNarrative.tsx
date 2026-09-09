import { useState } from "react";
import { Link } from "react-router-dom";
import { AppBar, SectionHead, Chips, DemoFlag } from "../components/ui";
import { ISSUE, NEWS_TREND } from "../data/issues";

export default function NewsNarrative() {
  const [sel, setSel] = useState<string | null>(null);
  const active = ISSUE.narratives.find((n) => n.id === sel) || null;
  const articles = active ? active.articles : ISSUE.narratives.flatMap((n) => n.articles).slice(0, 5);

  return (
    <>
      <AppBar title="뉴스" back />
      <div className="searchbar">
        <div className="f">삼성전자</div>
      </div>
      <main className="scroll">
        <Chips items={["정확도순", "최신순", "1일", "1주"]} active="정확도순" />

        {/* 기사 수 추이 */}
        <section className="trend">
          <div className="t">{NEWS_TREND.window} 기사 수 추이</div>
          <div className="n">{NEWS_TREND.total}</div>
          <div className="bars" aria-hidden="true">
            {NEWS_TREND.bars.map((b, idx) => (
              <i key={idx} style={{ height: b + "%" }} />
            ))}
          </div>
        </section>

        <div className="divider" />

        {/* 이 이슈를 설명하는 방식 */}
        <section className="slot">
          <SectionHead title="이 이슈를 설명하는 방식" />
          <div style={{ padding: "0 16px 8px", fontSize: 14, color: "var(--text-48)" }}>
            {NEWS_TREND.eligible}
          </div>
          {ISSUE.narratives.map((n) => {
            const pos = n.delta > 0;
            const on = sel === n.id;
            return (
              <button
                key={n.id}
                className="nrow"
                aria-pressed={on}
                onClick={() => setSel(on ? null : n.id)}
                style={on ? { background: "var(--bg-on-slot)" } : undefined}
              >
                <div className="claim">{n.claim}</div>
                <div className="met">
                  <span className="share">{n.prev}% → {n.cur}%</span>
                  <span className={"delta " + (pos ? "pos" : "neg")}>
                    {pos ? "▲" : "▼"} {pos ? "+" : ""}{n.delta}%p
                  </span>
                </div>
                <div className="bar"><i style={{ width: n.cur + "%" }} /></div>
              </button>
            );
          })}
          <div className="ai" style={{ marginTop: 16 }}>
            <div className="k">AI 정리</div>
            <p>{ISSUE.aiSummary}</p>
          </div>
        </section>

        <div className="divider" />

        <section className="slot">
          <SectionHead
            title={active ? "관련 대표 기사" : "기사"}
            meta={active ? "관련 기사 " + active.docCount + "건" : undefined}
          />
          {active && (
            <div style={{ padding: "0 16px 10px" }}>
              <button className="chip on" onClick={() => setSel(null)}>
                {active.claim} ✕
              </button>
            </div>
          )}
          {articles.map((a) => (
            <div className="article" key={a.title}>
              <div className="c">
                <div className="ti">{a.title}</div>
                <div className="mm">{a.press} · {a.time}</div>
              </div>
              <div className="th" />
            </div>
          ))}
        </section>

        <div className="divider" />
        <section className="slot" style={{ padding: 16 }}>
          <Link to={"/issue/" + ISSUE.id} style={{ color: "var(--accent)", fontSize: 16 }}>
            시장 이슈 상세 보기 →
          </Link>
        </section>

        <DemoFlag />
      </main>
    </>
  );
}
