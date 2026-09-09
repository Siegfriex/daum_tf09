import { Link } from "react-router-dom";
import { Issue, DISCLAIMER_MARKET, COMPACT_ISSUES } from "../data/issues";
import { dirClass, Icon } from "./ui";

export function MarketIssueCard({ issue }: { issue: Issue }) {
  const top2 = issue.narratives.filter((n) => n.delta > 0).slice(0, 2);
  return (
    <Link className="issue-card" to={"/issue/" + issue.id} aria-label={issue.title}>
      <div className="top">
        <span className="badge">{issue.status}</span>
        <span className="upd">최근 업데이트 {issue.lastUpdatedAt}</span>
      </div>
      <h3>{issue.title}</h3>

      <div className="lbl">새로 확인</div>
      <p>{issue.after[issue.after.length - 1]}</p>

      <div className="lbl">시장 반응</div>
      <div className="assets">
        {issue.market.slice(0, 2).map((m, i) => (
          <span key={m.name}>
            {i > 0 && <span className="flat"> · </span>}
            <span style={{ color: "var(--text-88)" }}>{m.name} </span>
            <b className={dirClass(m.dir)} style={{ fontWeight: 500 }}>{m.value}</b>
          </span>
        ))}
      </div>
      <div className="note">※ {DISCLAIMER_MARKET}</div>

      <div className="lbl">커지는 설명</div>
      {top2.map((n) => (
        <div className="nrow-mini" key={n.id}>
          <span>{n.claim}</span>
          <b>+{n.delta}%p</b>
        </div>
      ))}

      <span className="cta">
        시장 맥락 보기 <Icon name="chevron" />
      </span>
    </Link>
  );
}

export function CompactIssueRows() {
  return (
    <>
      {COMPACT_ISSUES.map((c) => (
        <Link className="compact" to={"/issue/" + c.id} key={c.id}>
          <span className="c">
            <span className="t">
              <span className="badge">{c.status}</span>
              <b>{c.title}</b>
            </span>
            <span className="m">{c.meta}</span>
          </span>
          <span style={{ width: 16, height: 16, color: "var(--text-48)", display: "block" }}>
            <Icon name="chevron" />
          </span>
        </Link>
      ))}
    </>
  );
}
