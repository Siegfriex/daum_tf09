import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { AppBar, NumHead, Icon, dirClass, DemoFlag, Sheet } from "../components/ui";
import { ISSUE, COMPACT_ISSUES, DISCLAIMER_MARKET, DISCLAIMER_OPINION, Narrative, Interpretation } from "../data/issues";

export default function IssueDetail() {
  const { id } = useParams();
  const [open, setOpen] = useState<string | null>(null);
  const [evidence, setEvidence] = useState<{ role: string; name: string; time: string } | null>(null);
  const [cluster, setCluster] = useState<Interpretation | null>(null);
  const [win, setWin] = useState("발표 이후");

  if (id !== ISSUE.id) {
    const stub = COMPACT_ISSUES.find((c) => c.id === id);
    return (
      <>
        <AppBar title="시장 이슈" back />
        <main className="scroll">
          <div className="pad" style={{ paddingTop: 24 }}>
            <span className="badge">{stub ? stub.status : "준비 중"}</span>
            <h3 style={{ fontSize: 18, lineHeight: 1.44, margin: "12px 0 8px" }}>
              {stub ? stub.title : "이 이슈"}
            </h3>
            <p style={{ fontSize: 16, color: "var(--text-48)", lineHeight: 1.6 }}>
              이 이슈는 프로토타입 시연 범위에 포함되지 않았습니다.
              <br />
              전체 흐름은 아래 대표 이슈에서 확인할 수 있습니다.
            </p>
            <Link className="cta" to={"/issue/" + ISSUE.id}>
              대표 이슈 보기 <Icon name="chevron" />
            </Link>
          </div>
          <DemoFlag />
        </main>
      </>
    );
  }

  const i = ISSUE;
  return (
    <>
      <AppBar title="시장 이슈" back action={<span className="icon"><Icon name="share" /></span>} />
      <main className="scroll">
        {/* Header */}
        <section className="slot" style={{ padding: "6px 16px 18px" }}>
          <span className="badge">{i.status}</span>
          <h3 style={{ fontSize: 18, fontWeight: 700, lineHeight: 1.44, margin: "12px 0 8px", letterSpacing: "-0.01em" }}>
            {i.title}
          </h3>
          <div style={{ fontSize: 14, color: "var(--text-48)", lineHeight: 1.7 }}>
            {i.categories.join(" · ")}
            <br />
            최초 {i.firstObservedAt} · 최근 업데이트 {i.lastUpdatedAt}
            <br />
            근거 {i.evidenceCount}건 · 독립출처 {i.independentSourceCount}곳 · 업데이트 {i.updateCount}회
          </div>
        </section>

        {/* 1 */}
        <section className="slot">
          <NumHead no={1} title="무엇이 바뀌었나" />
          <div className="pad">
            <div className="lbl" style={{ marginTop: 0 }}>기존</div>
            <div className="fact-before">{i.before}</div>
            <div className="arrow">↓</div>
            <div className="lbl" style={{ marginTop: 0 }}>새롭게 확인</div>
            {i.after.map((a) => (
              <div className="fact-after" key={a}>{a}</div>
            ))}
            <div className="src-chips">
              {i.factSources.map((s) => (
                <button className="src-chip" key={s.name} onClick={() => setEvidence(s)}>
                  <span className="r">{s.role}</span>
                  <span className="s">{s.name}</span>
                  <span className="t">{s.time}</span>
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* 2 */}
        <section className="slot">
          <NumHead no={2} title="시장 반응" />
          <div className="chips" style={{ padding: "0 16px 6px" }}>
            {["발표 이후", "당일", "1D"].map((w) => (
              <button key={w} className={"chip" + (w === win ? " on" : "")} onClick={() => setWin(w)}>{w}</button>
            ))}
          </div>
          {i.market.map((m) => (
            <div className="mrow" key={m.name}>
              <span className="n">{m.name}</span>
              <span className={"v " + dirClass(m.dir)}>{m.value}</span>
            </div>
          ))}
          <div className="note" style={{ padding: "8px 16px 16px" }}>※ {DISCLAIMER_MARKET}</div>
        </section>

        {/* 3 */}
        <section className="slot">
          <NumHead no={3} title="설명축 변화" />
          <div style={{ padding: "0 16px 6px", fontSize: 14, color: "var(--text-48)" }}>{i.narrativeWindow}</div>
          {i.narratives.map((n) => (
            <NarrativeRow key={n.id} n={n} open={open === n.id} onToggle={() => setOpen(open === n.id ? null : n.id)} />
          ))}
          <div className="ai" style={{ marginTop: 16 }}>
            <div className="k">AI 정리</div>
            <p>{i.aiSummary}</p>
          </div>
        </section>

        {/* 4 */}
        <section className="slot">
          <NumHead no={4} title="관심 변화" />
          {i.attention.map((a) => (
            <div className="att" key={a.channel}>
              <span className="c">{a.channel}</span>
              <span className="v">{a.value}</span>
            </div>
          ))}
          <div style={{ height: 12 }} />
        </section>

        {/* 5 */}
        <section className="slot">
          <NumHead no={5} title="주요 해석" />
          <div style={{ padding: "0 16px 8px", fontSize: 14, color: "var(--text-48)" }}>{i.interpretationMeta}</div>
          <div className="pad">
            {i.interpretations.map((c) => (
              <button className="interp" key={c.cluster} onClick={() => setCluster(c)}>
                <div className="cl">{c.cluster}</div>
                <div className="q">“{c.quote}”</div>
                <div className="m">적격 의견 내 {c.share}% · 대표 의견 {c.count}건</div>
              </button>
            ))}
            <div className="note">※ {DISCLAIMER_OPINION}</div>
          </div>
        </section>

        {/* 6 */}
        <section className="slot">
          <NumHead no={6} title="근거" />
          {i.evidence.map((g) => (
            <div key={g.role}>
              <div className="ev-role">{g.role}</div>
              {g.items.map((it) => (
                <div className="ev" key={it.title}>
                  <div className="m">{it.name} · {it.time}</div>
                  <div className="t">{it.title}</div>
                </div>
              ))}
            </div>
          ))}
        </section>

        <DemoFlag />
      </main>

      {evidence && (
        <Sheet title={evidence.name} meta={evidence.role + " · " + evidence.time} onClose={() => setEvidence(null)}>
          <p style={{ fontSize: 16, lineHeight: 1.6, color: "var(--text-88)", marginTop: 12 }}>
            삼성전자는 미스트랄 AI와 반도체 설계·제조에 특화된 AI 모델을 공동 개발한다고 밝혔다. 양사는 파운드리 공정 최적화와 수율 개선을 1차 과제로 제시했다.
          </p>
          <button className="cta" onClick={() => setEvidence(null)}>닫기</button>
        </Sheet>
      )}
      {cluster && (
        <Sheet title={cluster.cluster} meta={"적격 의견 내 " + cluster.share + "% · 대표 의견 " + cluster.count + "건"} onClose={() => setCluster(null)}>
          <ol>
            {cluster.opinions.map((o) => <li key={o}>{o}</li>)}
          </ol>
          <p className="sm" style={{ marginTop: 12, lineHeight: 1.6 }}>
            ※ 대표 의견은 해당 해석을 이해하기 위한 예시이며, 인기순이나 정답을 의미하지 않습니다.
          </p>
          <button className="cta" onClick={() => setCluster(null)}>닫기</button>
        </Sheet>
      )}
    </>
  );
}

function NarrativeRow({ n, open, onToggle }: { n: Narrative; open: boolean; onToggle: () => void }) {
  const pos = n.delta > 0;
  return (
    <button className="nrow" onClick={onToggle} aria-expanded={open}>
      <div className="claim">{n.claim}</div>
      <div className="met">
        <span className="share">{n.prev}% → {n.cur}%</span>
        <span className={"delta " + (pos ? "pos" : "neg")}>
          {pos ? "▲" : "▼"} {pos ? "+" : ""}{n.delta}%p
        </span>
      </div>
      <div className="bar"><i style={{ width: n.cur + "%" }} /></div>
      {open && (
        <div className="detail">
          <div className="dm">현재 {n.cur}% · 3시간 전 대비 {n.delta > 0 ? "+" : ""}{n.delta}%p<br />관련 기사 {n.docCount}건 · 독립 출처 {n.sourceCount}곳</div>
          <h4>대표 근거</h4>
          <ul>{n.evidence.map((e) => <li key={e}>{e}</li>)}</ul>
          {n.counterView.length > 0 && (
            <>
              <h4>다른 관점</h4>
              <ul>{n.counterView.map((e) => <li key={e}>{e}</li>)}</ul>
            </>
          )}
        </div>
      )}
    </button>
  );
}
