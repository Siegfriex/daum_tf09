// 프로토타입 시연용 예시 데이터 (실제 서비스 데이터 아님)
export type Dir = "up" | "down" | "flat";

export interface MarketReaction { name: string; value: string; dir: Dir }
export interface SourceRef { role: "사실" | "시장" | "언론" | "의견"; name: string; time: string; title?: string }
export interface Narrative {
  id: string; claim: string; prev: number; cur: number; delta: number;
  docCount: number; sourceCount: number;
  evidence: string[]; counterView: string[];
  articles: { title: string; press: string; time: string }[];
}
export interface Interpretation { cluster: string; quote: string; share: number; count: number; opinions: string[] }

export interface Issue {
  id: string; status: string; title: string; categories: string[];
  firstObservedAt: string; lastUpdatedAt: string;
  evidenceCount: number; independentSourceCount: number; updateCount: number;
  before: string; after: string[];
  factSources: SourceRef[];
  market: MarketReaction[];
  narrativeWindow: string;
  narratives: Narrative[];
  aiSummary: string;
  attention: { channel: string; value: string }[];
  interpretationMeta: string;
  interpretations: Interpretation[];
  evidence: { role: SourceRef["role"]; items: SourceRef[] }[];
}

export const DISCLAIMER_MARKET =
  "같은 시간대의 관측값이며 해당 이슈가 직접적인 원인이라는 의미는 아닙니다.";
export const DISCLAIMER_OPINION =
  "의견 비중은 사실성이나 시장 합의를 의미하지 않습니다.";
export const DEMO_NOTICE = "프로토타입 시연용 예시 데이터";

export const ISSUE: Issue = {
  id: "samsung-mistral",
  status: "논점 변화 중",
  title: "삼성전자·미스트랄 AI, 반도체 특화 AI 공동개발",
  categories: ["AI", "반도체"],
  firstObservedAt: "9.9 10:20",
  lastUpdatedAt: "17:00",
  evidenceCount: 28,
  independentSourceCount: 12,
  updateCount: 4,
  before: "삼성전자 자체 AI 적용 확대",
  after: ["미스트랄 AI와 전략적 협력", "반도체 설계·제조 특화 AI 공동개발"],
  factSources: [
    { role: "사실", name: "기업 발표", time: "10:20" },
    { role: "사실", name: "공시", time: "10:35" },
  ],
  market: [
    { name: "삼성전자", value: "0.00%", dir: "flat" },
    { name: "SK하이닉스", value: "+3.51%", dir: "up" },
    { name: "반도체 업종", value: "+1.24%", dir: "up" },
  ],
  narrativeWindow: "최근 6시간 · 적격 기사 42건 · 독립출처 18곳",
  narratives: [
    {
      id: "hbm",
      claim: "HBM 수요가 실적 기대를 지지",
      prev: 21, cur: 36, delta: 15, docCount: 184, sourceCount: 17,
      evidence: ["HBM4 양산 확대", "AI 메모리 수요 증가", "주요 고객 투자 확대"],
      counterView: ["기대가 이미 가격에 반영됐다는 분석"],
      articles: [
        { title: "HBM4 양산 확대에 실적 기대…“하반기 반영”", press: "한국경제", time: "2시간 전" },
        { title: "AI 메모리 수요 증가에 공급 부족 전망", press: "연합뉴스", time: "3시간 전" },
        { title: "“HBM 가격 협상력 유지”…목표 상향 잇따라", press: "매일경제", time: "3시간 전" },
      ],
    },
    {
      id: "cost",
      claim: "AI 투자 확대가 비용 부담",
      prev: 8, cur: 19, delta: 11, docCount: 96, sourceCount: 11,
      evidence: ["설비투자 증가", "감가상각 부담 확대"],
      counterView: ["투자 회수 기간이 짧아졌다는 반론"],
      articles: [
        { title: "AI 투자 확대에 따른 비용 부담 지적", press: "이데일리", time: "2시간 전" },
        { title: "설비투자 증가, 단기 수익성에는 부담", press: "서울경제", time: "4시간 전" },
      ],
    },
    {
      id: "announce",
      claim: "협력 발표 자체가 핵심",
      prev: 25, cur: 11, delta: -14, docCount: 61, sourceCount: 9,
      evidence: ["발표 직후 속보성 보도 집중"],
      counterView: [],
      articles: [
        { title: "삼성전자·미스트랄 AI 전략적 협력 체결", press: "머니투데이", time: "6시간 전" },
        { title: "양사 “파운드리 공정 최적화 1차 과제”", press: "전자신문", time: "6시간 전" },
      ],
    },
  ],
  aiSummary:
    "초기에는 협력 발표 자체가 중심이었으나, 현재는 HBM 수요와 투자비용에 대한 설명이 확대되고 있습니다.",
  attention: [
    { channel: "검색", value: "HBM4 ↑ · 미스트랄 AI ↑" },
    { channel: "뉴스", value: "관련 기사량 +32%" },
    { channel: "커뮤니티", value: "관련 언급 증가" },
  ],
  interpretationMeta: "댓글2.0 품질 필터 적용 · 적격 의견 268건",
  interpretations: [
    {
      cluster: "성장 기대", quote: "HBM·AI 메모리 수요 확대", share: 34, count: 21,
      opinions: [
        "HBM 수요가 계속 늘면 메모리 단가가 버틸 것 같다.",
        "파운드리 수율이 개선되면 실적 기여가 커진다.",
        "AI 서버 투자 사이클이 아직 초입이다.",
      ],
    },
    {
      cluster: "영향 제한", quote: "협력은 긍정적이나 직접 실적 영향은 제한적", share: 29, count: 18,
      opinions: [
        "공동개발 단계라 매출 인식까지는 시간이 걸린다.",
        "실제 물량 계약이 나와야 판단할 수 있다.",
      ],
    },
    {
      cluster: "비용 우려", quote: "AI 투자비 증가가 단기 수익성 부담", share: 19, count: 13,
      opinions: [
        "설비투자 규모가 커서 감가상각이 걱정된다.",
        "투자 회수 시점이 불투명하다.",
      ],
    },
    {
      cluster: "다른 해석", quote: "기대가 이미 가격에 반영됐다", share: 8, count: 5,
      opinions: ["최근 상승분에 선반영된 것으로 보인다."],
    },
  ],
  evidence: [
    { role: "사실", items: [
      { role: "사실", name: "삼성전자 뉴스룸", time: "10:20", title: "삼성전자·미스트랄 AI 전략적 협력 체결" },
      { role: "사실", name: "전자공시 DART", time: "10:35", title: "타법인 주식 취득 결정 정정" },
    ]},
    { role: "시장", items: [
      { role: "시장", name: "Daum Finance", time: "17:00", title: "삼성전자·SK하이닉스 당일 체결 데이터" },
    ]},
    { role: "언론", items: [
      { role: "언론", name: "한국경제", time: "12:10", title: "HBM4 양산 확대가 실적 기대를 지지" },
      { role: "언론", name: "이데일리", time: "14:22", title: "AI 투자 확대에 따른 비용 부담 지적" },
    ]},
    { role: "의견", items: [
      { role: "의견", name: "Daum 커뮤니티", time: "16:40", title: "적격 의견 268건 · 해석 4개 군집" },
    ]},
  ],
};

export const COMPACT_ISSUES = [
  { id: "ust-yield", status: "새 사실 추가", title: "미국 국채금리 급등", meta: "국채금리·환율 반응 · 최근 업데이트 16:40" },
  { id: "ev-subsidy", status: "신규", title: "전기차 보조금 정책 변경", meta: "정책 범위 변경 · 최근 업데이트 15:10" },
];

export const INDICES = [
  { name: "코스피", value: "7,051.64", delta: "97.12 (+1.40%)", dir: "up" as Dir },
  { name: "코스닥", value: "830.37", delta: "18.49 (+2.28%)", dir: "up" as Dir },
  { name: "다우산업", value: "52,786.07", delta: "628.18 (-1.18%)", dir: "down" as Dir },
  { name: "나스닥 종합", value: "26,421.41", delta: "85.58 (-0.32%)", dir: "down" as Dir },
];

export const RANKING = [
  { name: "삼성전자", price: "269,500", delta: "-", dir: "flat" as Dir },
  { name: "SK하이닉스", price: "1,856,000", delta: "+3.51%", dir: "up" as Dir },
  { name: "SK이노베이션", price: "153,500", delta: "+11.23%", dir: "up" as Dir },
  { name: "대한광통신", price: "14,960", delta: "+9.20%", dir: "up" as Dir },
  { name: "우리기술", price: "14,320", delta: "+21.25%", dir: "up" as Dir },
];

export const QUOTE = {
  name: "삼성전자", code: "005930 코스피", price: "269,500", change: "0 (0.00%)",
  rows: [
    ["시가", "269,500", "고가", "275,000"],
    ["전일", "269,500", "저가", "267,500"],
    ["시총순위", "코스피 1위", "시가총액", "1,575조"],
  ] as [string, string, string, string][],
  high52: "374,500", low52: "71,600", volume: "16,080,420",
  aiSummary:
    "삼성전자는 코스피 시가총액 1위 종목으로 반도체·모바일·가전 사업을 영위합니다. 최근 공시와 기사에서는 AI 메모리 수요와 설비 투자 계획이 주로 언급됩니다.",
};

export const NEWS_TREND = { total: "1,823건", window: "최근 6시간", eligible: "적격 기사 510건 · 독립출처 42곳",
  bars: [38, 44, 41, 52, 61, 58, 72, 88, 96, 84, 91, 100] };
