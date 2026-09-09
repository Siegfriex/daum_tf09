import { ReactNode } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { DEMO_NOTICE } from "../data/issues";

export function Icon({ name }: { name: string }) {
  const c = { fill: "none", stroke: "currentColor", strokeWidth: 1.7, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
  const p: Record<string, ReactNode> = {
    back: <path d="M15 4.5 7.5 12l7.5 7.5" {...c} />,
    search: <><circle cx="10.8" cy="10.8" r="6.3" {...c} /><path d="m15.6 15.6 4 4" {...c} /></>,
    share: <><path d="M8.5 13.5 15.5 17M15.5 7 8.5 10.5" {...c} /><circle cx="18" cy="5.5" r="2.6" {...c} /><circle cx="6" cy="12" r="2.6" {...c} /><circle cx="18" cy="18.5" r="2.6" {...c} /></>,
    swap: <path d="M4 8h13m0 0-3.5-3.5M17 8l-3.5 3.5M20 16H7m0 0 3.5-3.5M7 16l3.5 3.5" {...c} />,
    home: <path d="M4 10.5 12 4l8 6.5V19a1 1 0 0 1-1 1h-4v-5h-6v5H5a1 1 0 0 1-1-1v-8.5Z" {...c} />,
    content: <><rect x="4" y="4" width="7" height="7" rx="2" {...c} /><rect x="13" y="4" width="7" height="7" rx="2" {...c} /><rect x="4" y="13" width="7" height="7" rx="2" {...c} /><rect x="13" y="13" width="7" height="7" rx="2" {...c} /></>,
    community: <path d="M4.5 6.5h15v9h-8l-4 3.5V15.5h-3v-9Z" {...c} />,
    news: <><rect x="4" y="5" width="16" height="14" rx="2" {...c} /><path d="M7.5 9h6M7.5 12.5h9M7.5 16h9" {...c} /></>,
    chevron: <path d="M9 5l7 7-7 7" {...c} />,
  };
  return <svg viewBox="0 0 24 24" aria-hidden="true">{p[name]}</svg>;
}

export function AppBar({ title, back, action }: { title: string; back?: boolean; action?: ReactNode }) {
  const nav = useNavigate();
  return (
    <header className="appbar">
      {back && (
        <button className="back icon" aria-label="뒤로" onClick={() => nav(-1)}>
          <Icon name="back" />
        </button>
      )}
      <h1>{title}</h1>
      <div className="spacer" />
      {action}
    </header>
  );
}

export function TabBar({ active }: { active: string }) {
  const tabs = ["쇼핑", "스포츠", "라이브", "머니", "FUN", "홈&쿠킹"];
  return (
    <nav className="tabbar" aria-label="콘텐츠 카테고리">
      {tabs.map((t) => (
        <span key={t} className={"tab" + (t === active ? " on" : "")}>
          <span>{t}</span>
          <i />
        </span>
      ))}
    </nav>
  );
}

export function BottomNav() {
  const { pathname } = useLocation();
  const items = [
    { to: "/money", label: "머니", icon: "home" },
    { to: "/search/samsung", label: "검색", icon: "search" },
    { to: "/news/samsung", label: "뉴스", icon: "news" },
    { to: "/community/samsung-mistral", label: "커뮤니티", icon: "community" },
  ];
  return (
    <nav className="bottomnav" aria-label="global">
      {items.map((i) => (
        <Link key={i.to} to={i.to} className={pathname.startsWith(i.to.split("/").slice(0, 2).join("/")) ? "on" : ""}>
          <Icon name={i.icon} />
          <span>{i.label}</span>
        </Link>
      ))}
    </nav>
  );
}

export function SectionHead({ title, meta }: { title: string; meta?: string }) {
  return (
    <div className="sec-head">
      <h2>{title}</h2>
      {meta && <span className="meta">{meta}</span>}
    </div>
  );
}

export function Chips({ items, active }: { items: string[]; active: string }) {
  return (
    <div className="chips">
      {items.map((i) => (
        <span key={i} className={"chip" + (i === active ? " on" : "")}>{i}</span>
      ))}
    </div>
  );
}

export function dirClass(d: string) {
  return d === "up" ? "up" : d === "down" ? "down" : "flat";
}

export function NumHead({ no, title }: { no: number; title: string }) {
  return (
    <div className="num-head">
      <b>{no}</b>
      <h2>{title}</h2>
    </div>
  );
}

export function DemoFlag({ extra }: { extra?: string }) {
  return (
    <p className="demo-flag">
      {DEMO_NOTICE} · 수치는 실제 서비스 데이터가 아닙니다.
      {extra ? " " + extra : ""}
    </p>
  );
}

export function Sheet({ title, meta, children, onClose }: { title: string; meta?: string; children: ReactNode; onClose: () => void }) {
  return (
    <>
      <div className="sheet-bg" onClick={onClose} />
      <div className="sheet" role="dialog" aria-modal="true" aria-label={title}>
        <div className="grab" />
        <h4>{title}</h4>
        {meta && <div className="sm">{meta}</div>}
        {children}
      </div>
    </>
  );
}
