import { HashRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import Intro from "./pages/Intro";
import MoneyHome from "./pages/MoneyHome";
import SearchResult from "./pages/SearchResult";
import IssueDetail from "./pages/IssueDetail";
import NewsNarrative from "./pages/NewsNarrative";
import Community from "./pages/Community";
import { BottomNav } from "./components/ui";

export default function App() {
  return (
    <HashRouter>
      <div className="app">
        <Routes>
          <Route path="/" element={<Navigate to="/money" replace />} />
          <Route path="/intro" element={<Intro />} />
          <Route path="/money" element={<MoneyHome />} />
          <Route path="/search/:q" element={<SearchResult />} />
          <Route path="/issue/:id" element={<IssueDetail />} />
          <Route path="/news/:q" element={<NewsNarrative />} />
          <Route path="/community/:id" element={<Community />} />
          <Route path="*" element={<Navigate to="/money" replace />} />
        </Routes>
        <ChromeNav />
      </div>
    </HashRouter>
  );
}

// 소개 PDF(/intro) 에서는 하단 탭을 숨긴다
function ChromeNav() {
  const { pathname } = useLocation();
  return pathname === "/intro" ? null : <BottomNav />;
}
