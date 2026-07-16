export type Locale = "ja" | "en" | "ko";

export const LOCALES: { id: Locale; flag: string; label: string }[] = [
  { id: "ja", flag: "🇯🇵", label: "日本語" },
  { id: "en", flag: "🇺🇸", label: "English" },
  { id: "ko", flag: "🇰🇷", label: "한국어" },
];

type Dict = {
  brand: string;
  headlineLine1: string;
  headlineLine2: string;
  subtitleLine1: string;
  subtitleLine2: string;
  support: string;
  ctaBeta: string;
  ctaExplore: string;
  langAria: string;

  greeting: string;
  district: string;
  weather: string;
  todaySummary: string;
  todaySummaryValue: string;
  upcomingGarbage: string;
  garbageValue: string;
  navGarbage: string;
  navChecklist: string;
  navExpense: string;
  navHome: string;
  navProfile: string;
  checklistCardSub: string;
  monthlyExpense: string;
  monthLabel: string;
  income: string;
  expense: string;
  balance: string;
  lifeShortcuts: string;
  shortcutEmergency: string;
  shortcutEmergencySub: string;
  shortcutWard: string;
  shortcutWardSub: string;
  shortcutHospital: string;
  shortcutHospitalSub: string;
  shortcutDelivery: string;
  shortcutDeliverySub: string;
  utilityInternet: string;
  utilityGas: string;
  utilityElectricity: string;
  utilityWater: string;

  garbageTitle: string;
  garbageTagline: string;
  changeLocation: string;
  nextCollection: string;
  burnable: string;
  tomorrow: string;
  thisWeek: string;
  disposalGuide: string;
  disposalGuideSub: string;

  expenseTitle: string;
  expenseAnalysis: string;
  expenseAnalysisEmpty: string;
  viewMonthly: string;
  fixedExpenses: string;

  checklistTitle: string;
  checklistSubtitle: string;
  progressTitle: string;
  progressCount: string;
  groupFirstDay: string;
  groupWithin14: string;
  taskResidentReg: string;
  taskNhi: string;
  taskBank: string;
  addTask: string;
};

export const dictionaries: Record<Locale, Dict> = {
  ko: {
    brand: "LifePass Japan",
    headlineLine1: "일본 생활을,",
    headlineLine2: "더 간단하게.",
    subtitleLine1: "입국부터 정착까지 필요한 생활 정보를",
    subtitleLine2: "한곳에서 관리하세요.",
    support: "쓰레기 · 체크리스트 · 생활비 · 병원 · 구청 일본어",
    ctaBeta: "베타 신청",
    ctaExplore: "기능 살펴보기",
    langAria: "언어 선택",

    greeting: "안녕하세요",
    district: "이타바시구 · 가미이타바시",
    weather: "내일 날씨: 맑음 24°C",
    todaySummary: "오늘 요약",
    todaySummaryValue: "오늘 할 일 2개 · 오늘 지출 ¥3,200",
    upcomingGarbage: "다가오는 쓰레기",
    garbageValue: "가연성 쓰레기 · 내일",
    navGarbage: "쓰레기",
    navChecklist: "체크리스트",
    navExpense: "지출",
    navHome: "홈",
    navProfile: "프로필",
    checklistCardSub: "3/12 완료 · 25%\n오늘: 전입신고",
    monthlyExpense: "월간 지출 요약",
    monthLabel: "2026년 7월",
    income: "수입",
    expense: "지출",
    balance: "예상 잔액",
    lifeShortcuts: "생활 바로가기",
    shortcutEmergency: "긴급 도움",
    shortcutEmergencySub: "급할 때 연락할 곳과 안전 정보",
    shortcutWard: "구청·시청 일본어",
    shortcutWardSub: "행정 창구에서 바로 사용하는 표현",
    shortcutHospital: "병원 찾기",
    shortcutHospitalSub: "증상에 맞는 진료과와 편한 병원을 찾아보세요",
    shortcutDelivery: "배달",
    shortcutDeliverySub: "택배 조회와 재배송 신청",
    utilityInternet: "인터넷",
    utilityGas: "가스",
    utilityElectricity: "전기",
    utilityWater: "수도",

    garbageTitle: "쓰레기",
    garbageTagline: "쓰레기·재활용",
    changeLocation: "변경",
    nextCollection: "다음 수거",
    burnable: "가연성 쓰레기",
    tomorrow: "내일",
    thisWeek: "이번 주",
    disposalGuide: "분리배출 가이드",
    disposalGuideSub: "대표 품목과 배출 방법을 확인해 보세요.",

    expenseTitle: "지출",
    expenseAnalysis: "지출 분석",
    expenseAnalysisEmpty: "이번 달 지출을 기록하면 분석을 볼 수 있어요.",
    viewMonthly: "월간 요약 자세히 보기",
    fixedExpenses: "고정지출",

    checklistTitle: "체크리스트",
    checklistSubtitle: "입국 후 필요한 행정 업무를 차근차근 진행하세요",
    progressTitle: "진행 상황",
    progressCount: "3/12 완료",
    groupFirstDay: "첫날",
    groupWithin14: "14일 이내",
    taskResidentReg: "전입신고",
    taskNhi: "국민건강보험",
    taskBank: "은행 계좌",
    addTask: "일정 또는 할 일 추가",
  },
  en: {
    brand: "LifePass Japan",
    headlineLine1: "Make life in Japan",
    headlineLine2: "simpler.",
    subtitleLine1: "Everything you need from arrival to settling in,",
    subtitleLine2: "managed in one place.",
    support: "Garbage · Checklist · Expenses · Hospital · Ward Office Japanese",
    ctaBeta: "Join the beta",
    ctaExplore: "Explore features",
    langAria: "Select language",

    greeting: "Good afternoon",
    district: "Itabashi · Kami-Itabashi",
    weather: "Tomorrow: Sunny, 24°C",
    todaySummary: "Today's summary",
    todaySummaryValue: "2 tasks due today · ¥3,200 spent today",
    upcomingGarbage: "Upcoming garbage",
    garbageValue: "Burnable garbage · Tomorrow",
    navGarbage: "Garbage",
    navChecklist: "Checklist",
    navExpense: "Finance",
    navHome: "Home",
    navProfile: "Profile",
    checklistCardSub: "3 of 12 done · 25%\nToday: Resident registration",
    monthlyExpense: "Monthly expense summary",
    monthLabel: "July 2026",
    income: "Income",
    expense: "Expenses",
    balance: "Estimated balance",
    lifeShortcuts: "Life Shortcuts",
    shortcutEmergency: "Emergency",
    shortcutEmergencySub: "Numbers to call and places to turn to",
    shortcutWard: "Ward Office Japanese",
    shortcutWardSub: "Useful phrases for administrative offices",
    shortcutHospital: "Find a Hospital",
    shortcutHospitalSub: "Find the right department and a clinic that fits you",
    shortcutDelivery: "Delivery",
    shortcutDeliverySub: "Track packages and request redelivery",
    utilityInternet: "Internet",
    utilityGas: "Gas",
    utilityElectricity: "Electricity",
    utilityWater: "Water",

    garbageTitle: "Garbage",
    garbageTagline: "Garbage & recyclables",
    changeLocation: "Change",
    nextCollection: "Next collections",
    burnable: "Burnable garbage",
    tomorrow: "Tomorrow",
    thisWeek: "This week",
    disposalGuide: "Disposal guide",
    disposalGuideSub: "See common items and how to put them out.",

    expenseTitle: "Finance",
    expenseAnalysis: "Expense Analysis",
    expenseAnalysisEmpty: "Add expenses this month to see your analysis.",
    viewMonthly: "View Detailed Monthly Summary",
    fixedExpenses: "Fixed expenses",

    checklistTitle: "Checklist",
    checklistSubtitle: "Step-by-step tasks for settling in after arrival",
    progressTitle: "Your progress",
    progressCount: "3 of 12 done",
    groupFirstDay: "First day",
    groupWithin14: "Within 14 days",
    taskResidentReg: "Resident registration",
    taskNhi: "National Health Insurance",
    taskBank: "Bank account",
    addTask: "Add schedule or task",
  },
  ja: {
    brand: "LifePass Japan",
    headlineLine1: "日本での暮らしを、",
    headlineLine2: "もっとシンプルに。",
    subtitleLine1: "入国から定着まで必要な生活情報を",
    subtitleLine2: "ひとつにまとめて管理できます。",
    support: "ごみ · チェックリスト · 家計 · 病院 · 区役所の日本語",
    ctaBeta: "ベータに参加",
    ctaExplore: "機能を見る",
    langAria: "言語を選択",

    greeting: "こんにちは",
    district: "板橋区 · 上板橋",
    weather: "明日の天気：晴れ 24°C",
    todaySummary: "今日のサマリー",
    todaySummaryValue: "今日のタスク 2件 · 今日の支出 ¥3,200",
    upcomingGarbage: "次のごみ",
    garbageValue: "燃やすごみ · 明日",
    navGarbage: "ごみ",
    navChecklist: "チェックリスト",
    navExpense: "家計",
    navHome: "ホーム",
    navProfile: "プロフィール",
    checklistCardSub: "3/12 完了 · 25%\n今日: 転入届",
    monthlyExpense: "月間支出サマリー",
    monthLabel: "2026年7月",
    income: "収入",
    expense: "支出",
    balance: "予想残高",
    lifeShortcuts: "生活ショートカット",
    shortcutEmergency: "緊急サポート",
    shortcutEmergencySub: "困ったときの連絡先と情報",
    shortcutWard: "区役所・市役所の日本語",
    shortcutWardSub: "行政窓口ですぐ使える表現",
    shortcutHospital: "病院を探す",
    shortcutHospitalSub: "症状に合う診療科と、相談しやすいクリニックを探せます",
    shortcutDelivery: "デリバリー",
    shortcutDeliverySub: "荷物の状況確認と再配達",
    utilityInternet: "インターネット",
    utilityGas: "ガス",
    utilityElectricity: "電気",
    utilityWater: "水道",

    garbageTitle: "ごみ",
    garbageTagline: "ごみ・資源",
    changeLocation: "変更",
    nextCollection: "次の収集",
    burnable: "燃やすごみ",
    tomorrow: "明日",
    thisWeek: "今週",
    disposalGuide: "分別ガイド",
    disposalGuideSub: "代表的な品目と出し方を確認できます。",

    expenseTitle: "家計",
    expenseAnalysis: "支出分析",
    expenseAnalysisEmpty: "今月の支出を記録すると分析を確認できます。",
    viewMonthly: "月間サマリーを詳しく見る",
    fixedExpenses: "固定費",

    checklistTitle: "チェックリスト",
    checklistSubtitle: "到着後の手続きを、順番に進められます",
    progressTitle: "進み具合",
    progressCount: "3/12 完了",
    groupFirstDay: "初日",
    groupWithin14: "14日以内",
    taskResidentReg: "転入届",
    taskNhi: "国民健康保険",
    taskBank: "銀行口座",
    addTask: "予定・タスクを追加",
  },
};
