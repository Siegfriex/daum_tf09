import { Link } from "react-router-dom";
import { AppBar, TabBar, SectionHead, Chips, Icon, dirClass, DemoFlag } from "../components/ui";
import { MarketIssueCard, CompactIssueRows } from "../components/IssueCard";
import { INDICES, RANKING, ISSUE } from "../data/issues";

export default function MoneyHome() {
  return (
    <>
      <AppBar
        title="콘텐츠"
        action={
          <>
            <Link to="/intro" className="intro-open">소개 PDF</Link>
            <span className="icon"><Icon name="swap" /></span>
            <span className="icon" style={{ marginLeft: 16 }}><Icon name="search" /></span>
          </>
        }
      />
      <TabBar active="머니" />
      <main className="scroll">
        {/* O-02 금융지표 — 기존 UI 유지 */}
        <section className="slot">
          <SectionHead title="금융지표" meta="장중" />
          <Chips items={["주요지수", "환율", "금리", "원자재"]} active="주요지수" />
          <div className="grid2">
            {INDICES.map((i) => (
              <div className="idx" key={i.name}>
                <div className="n">{i.name}</div>
                <div className="v">{i.value}</div>
                <div className={"d " + dirClass(i.dir)}>
                  {i.dir === "up" ? "▲" : "▼"} {i.delta}
                </div>
              </div>
            ))}
          </div>
        </section>

        <div className="divider" />

        {/* NEW — 오늘 시장에서 달라진 것 (O-02 와 O-03 사이 삽입) */}
        <section className="slot">
          <SectionHead title="오늘 시장에서 달라진 것" meta={"업데이트 " + ISSUE.lastUpdatedAt} />
          <MarketIssueCard issue={ISSUE} />
          <CompactIssueRows />
        </section>

        <div className="divider" />

        {/* O-03 종목랭킹 — 기존 UI 유지 */}
        <section className="slot">
          <SectionHead title="종목랭킹" meta="9.9 18:20 기준" />
          <Chips items={["검색 인기순", "상승률", "하락률", "거래량"]} active="검색 인기순" />
          <div style={{ paddingTop: 8 }}>
            {RANKING.map((r) => (
              <div className="rank" key={r.name}>
                <span className="n">{r.name}</span>
                <span className="p">
                  <b>{r.price}</b>
                  <em className={dirClass(r.dir)}>{r.delta}</em>
                </span>
              </div>
            ))}
          </div>
        </section>

        <DemoFlag />
      </main>
    </>
  );
}
