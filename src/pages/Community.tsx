import { useState } from "react";
import { Link } from "react-router-dom";
import { AppBar, SectionHead, DemoFlag, Sheet } from "../components/ui";
import { ISSUE, DISCLAIMER_OPINION, Interpretation } from "../data/issues";

export default function Community() {
  const [cluster, setCluster] = useState<Interpretation | null>(null);
  return (
    <>
      <AppBar title="커뮤니티" back />
      <main className="scroll">
        <section className="slot">
          <SectionHead title="사람들은 이렇게 보고 있습니다" />
          <div style={{ padding: "0 16px 4px", fontSize: 14, color: "var(--text-48)", lineHeight: 1.6 }}>
            {ISSUE.title}
            <br />
            {ISSUE.interpretationMeta}
          </div>
          <div className="pad" style={{ paddingTop: 12 }}>
            {ISSUE.interpretations.map((c) => (
              <button className="interp" key={c.cluster} onClick={() => setCluster(c)}>
                <div className="cl">{c.cluster}</div>
                <div className="q">“{c.quote}”</div>
                <div className="m">적격 의견 내 {c.share}% · 대표 의견 {c.count}건</div>
                <div className="bar" style={{ marginTop: 10 }}>
                  <i style={{ width: c.share + "%" }} />
                </div>
              </button>
            ))}
            <div className="note">※ {DISCLAIMER_OPINION}</div>
            <div className="note">
              ※ 인기순·추천수·작성자 신뢰도를 사실성이나 시장 합의로 사용하지 않습니다.
            </div>
          </div>
        </section>

        <div className="divider" />
        <section className="slot" style={{ padding: 16 }}>
          <Link to={"/issue/" + ISSUE.id} style={{ color: "var(--accent)", fontSize: 16 }}>
            시장 이슈 상세로 돌아가기 →
          </Link>
        </section>

        <DemoFlag />
      </main>

      {cluster && (
        <Sheet
          title={cluster.cluster}
          meta={"적격 의견 내 " + cluster.share + "% · 대표 의견 " + cluster.count + "건"}
          onClose={() => setCluster(null)}
        >
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
