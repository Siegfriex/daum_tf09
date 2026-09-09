import { HashRouter, Routes, Route, Navigate } from "react-router-dom";
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
          <Route path="/money" element={<MoneyHome />} />
          <Route path="/search/:q" element={<SearchResult />} />
          <Route path="/issue/:id" element={<IssueDetail />} />
          <Route path="/news/:q" element={<NewsNarrative />} />
          <Route path="/community/:id" element={<Community />} />
          <Route path="*" element={<Navigate to="/money" replace />} />
        </Routes>
        <BottomNav />
      </div>
    </HashRouter>
  );
}
