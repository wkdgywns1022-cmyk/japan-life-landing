export type Locale = "ja" | "en" | "ko";

export type PhoneScreenId =
  | "home"
  | "checklist"
  | "expense"
  | "wardOfficeJapanese";

export const LOCALES: { id: Locale; flag: string; label: string }[] = [
  { id: "ja", flag: "🇯🇵", label: "日本語" },
  { id: "en", flag: "🇺🇸", label: "English" },
  { id: "ko", flag: "🇰🇷", label: "한국어" },
];

export type HeroCopy = {
  brand: string;
  headlineLine1: string;
  headlineLine2: string;
  subtitleLine1: string;
  subtitleLine2: string;
  support: string;
  ctaBeta: string;
  ctaExplore: string;
  langAria: string;
};

export type NavCopy = {
  expense: string;
  garbage: string;
  home: string;
  checklist: string;
  profile: string;
};

export type HomeCopy = {
  greeting: string;
  district: string;
  weather: string;
  todaySummary: string;
  todaySummaryValue: string;
  upcomingGarbage: string;
  garbageValue: string;
  garbageCardTitle: string;
  checklistCardTitle: string;
  checklistCardSub: string;
  monthlyExpense: string;
  monthLabel: string;
  income: string;
  expense: string;
  balance: string;
  incomeValue: string;
  expenseValue: string;
  balanceValue: string;
  lifeShortcuts: string;
};

export type ChecklistCopy = {
  title: string;
  subtitle: string;
  progressTitle: string;
  progressCount: string;
  progressPercent: string;
  groupFirstDay: string;
  groupWithin14: string;
  taskBank: string;
  taskBankJa: string;
  taskBankDate: string;
  taskBankStatus: string;
  taskPhone: string;
  taskPhoneJa: string;
  taskPhoneDate: string;
  taskPhoneStatus: string;
  taskResident: string;
  taskResidentJa: string;
  taskResidentDate: string;
  taskResidentStatus: string;
  scheduleNeeded: string;
};

export type ExpenseCopy = {
  title: string;
  monthLabel: string;
  income: string;
  expense: string;
  balance: string;
  incomeValue: string;
  expenseValue: string;
  balanceValue: string;
  analysis: string;
  analysisEmpty: string;
  viewMonthly: string;
  fixedExpenses: string;
};

export type WardPhrase = {
  ja: string;
  ruby: { text: string; reading?: string }[];
  meaning: string;
  pronunciation: string;
  explanation: string;
  category: string;
};

export type WardCopy = {
  title: string;
  subtitle: string;
  search: string;
  all: string;
  phrases: WardPhrase[];
};

export type Translations = {
  hero: HeroCopy;
  nav: NavCopy;
  phone: {
    home: HomeCopy;
    checklist: ChecklistCopy;
    expense: ExpenseCopy;
    wardOffice: WardCopy;
  };
};

const navKo: NavCopy = {
  expense: "지출",
  garbage: "쓰레기",
  home: "홈",
  checklist: "체크리스트",
  profile: "프로필",
};

const navEn: NavCopy = {
  expense: "Finance",
  garbage: "Garbage",
  home: "Home",
  checklist: "Checklist",
  profile: "Profile",
};

const navJa: NavCopy = {
  expense: "家計",
  garbage: "ごみ",
  home: "ホーム",
  checklist: "チェックリスト",
  profile: "プロフィール",
};

const phrase1Ruby = [
  { text: "転入届", reading: "てんにゅうとどけ" },
  { text: "を出しに来ました。" },
];

const phrase2Ruby = [
  { text: "在留", reading: "ざいりゅう" },
  { text: "カードの" },
  { text: "住所", reading: "じゅうしょ" },
  { text: "を" },
  { text: "変更", reading: "へんこう" },
  { text: "したいです。" },
];

const phrase3Ruby = [
  { text: "国民健康保険", reading: "こくみんけんこうほけん" },
  { text: "に" },
  { text: "加入", reading: "かにゅう" },
  { text: "したいです。" },
];

export const translations: Record<Locale, Translations> = {
  ko: {
    hero: {
      brand: "LifePass Japan",
      headlineLine1: "일본 생활을,",
      headlineLine2: "더 간단하게.",
      subtitleLine1: "입국부터 정착까지 필요한 생활 정보를",
      subtitleLine2: "한곳에서 관리하세요.",
      support: "쓰레기 · 체크리스트 · 생활비 · 병원 · 구청 일본어",
      ctaBeta: "베타 신청",
      ctaExplore: "기능 살펴보기",
      langAria: "언어 선택",
    },
    nav: navKo,
    phone: {
      home: {
        greeting: "좋은 저녁이에요",
        district: "이타바시구 · 미소노 1초메",
        weather: "내일 날씨: 맑음 24°C",
        todaySummary: "오늘 요약",
        todaySummaryValue: "오늘 예정된 할 일이 없어요",
        upcomingGarbage: "다가오는 쓰레기",
        garbageValue: "플라스틱 · 오늘",
        garbageCardTitle: "쓰레기",
        checklistCardTitle: "체크리스트",
        checklistCardSub: "0/10 완료 · 0%\n오늘 예정된 할 일이 없어요",
        monthlyExpense: "월간 지출 요약",
        monthLabel: "2026년 7월",
        income: "수입",
        expense: "지출",
        balance: "예상 잔액",
        incomeValue: "0엔",
        expenseValue: "120,000엔",
        balanceValue: "-120,000엔",
        lifeShortcuts: "생활 바로가기",
      },
      checklist: {
        title: "체크리스트",
        subtitle: "입국 후 필요한 행정 업무를 차근차근 진행하세요",
        progressTitle: "진행 상황",
        progressCount: "0/10 완료",
        progressPercent: "0%",
        groupFirstDay: "첫날",
        groupWithin14: "14일 이내",
        taskBank: "은행 계좌",
        taskBankJa: "銀行口座",
        taskBankDate: "2026년 7월 21일",
        taskBankStatus: "진행 중",
        taskPhone: "휴대폰",
        taskPhoneJa: "携帯電話",
        taskPhoneDate: "2026년 7월 15일",
        taskPhoneStatus: "시작 전",
        taskResident: "전입신고",
        taskResidentJa: "転入届",
        taskResidentDate: "2026년 7월 18일",
        taskResidentStatus: "시작 전",
        scheduleNeeded: "일정 등록 필요",
      },
      expense: {
        title: "지출",
        monthLabel: "2026년 7월",
        income: "수입",
        expense: "지출",
        balance: "예상 잔액",
        incomeValue: "0엔",
        expenseValue: "120,000엔",
        balanceValue: "-120,000엔",
        analysis: "지출 분석",
        analysisEmpty: "이번 달 지출을 기록하면 분석을 볼 수 있어요.",
        viewMonthly: "월간 요약 자세히 보기",
        fixedExpenses: "고정지출",
      },
      wardOffice: {
        title: "구청·시청 일본어",
        subtitle: "구청·시청 창구에서 바로 쓸 수 있는 일본어 표현",
        search: "표현 검색",
        all: "전체",
        phrases: [
          {
            ja: "転入届を出しに来ました。",
            ruby: phrase1Ruby,
            meaning: "전입신고를 하러 왔습니다.",
            pronunciation: "텐뉴우토도케오 다시니 키마시타",
            explanation: "전입신고 창구에서 사용",
            category: "전입신고",
          },
          {
            ja: "在留カードの住所を変更したいです。",
            ruby: phrase2Ruby,
            meaning: "재류카드의 주소를 변경하고 싶습니다.",
            pronunciation: "자이류카드노 주쇼오 헨코오 시타이데스",
            explanation: "재류카드 주소 변경",
            category: "재류카드 주소 변경",
          },
          {
            ja: "国民健康保険に加入したいです。",
            ruby: phrase3Ruby,
            meaning: "국민건강보험에 가입하고 싶습니다.",
            pronunciation: "콕민켄코호켄니 카뉴우 시타이데스",
            explanation: "국민건강보험 가입",
            category: "국민건강보험",
          },
        ],
      },
    },
  },
  en: {
    hero: {
      brand: "LifePass Japan",
      headlineLine1: "Make life in Japan",
      headlineLine2: "simpler.",
      subtitleLine1: "Everything you need from arrival to settling in,",
      subtitleLine2: "managed in one place.",
      support: "Garbage · Checklist · Expenses · Hospital · Ward Office Japanese",
      ctaBeta: "Join the beta",
      ctaExplore: "Explore features",
      langAria: "Select language",
    },
    nav: navEn,
    phone: {
      home: {
        greeting: "Good evening",
        district: "Itabashi · Misono 1-chome",
        weather: "Tomorrow: Sunny, 24°C",
        todaySummary: "Today's summary",
        todaySummaryValue: "No tasks due today",
        upcomingGarbage: "Upcoming garbage",
        garbageValue: "Plastic · Today",
        garbageCardTitle: "Garbage",
        checklistCardTitle: "Checklist",
        checklistCardSub: "0 of 10 done · 0%\nNo tasks due today",
        monthlyExpense: "Monthly expense summary",
        monthLabel: "July 2026",
        income: "Income",
        expense: "Expenses",
        balance: "Estimated balance",
        incomeValue: "¥0",
        expenseValue: "¥120,000",
        balanceValue: "−¥120,000",
        lifeShortcuts: "Life Shortcuts",
      },
      checklist: {
        title: "Checklist",
        subtitle: "Step-by-step tasks for settling in after arrival",
        progressTitle: "Your progress",
        progressCount: "0 of 10 done",
        progressPercent: "0%",
        groupFirstDay: "First day",
        groupWithin14: "Within 14 days",
        taskBank: "Bank account",
        taskBankJa: "銀行口座",
        taskBankDate: "July 21, 2026",
        taskBankStatus: "In progress",
        taskPhone: "Mobile phone",
        taskPhoneJa: "携帯電話",
        taskPhoneDate: "July 15, 2026",
        taskPhoneStatus: "Not started",
        taskResident: "Resident registration",
        taskResidentJa: "転入届",
        taskResidentDate: "July 18, 2026",
        taskResidentStatus: "Not started",
        scheduleNeeded: "Schedule required",
      },
      expense: {
        title: "Finance",
        monthLabel: "July 2026",
        income: "Income",
        expense: "Expenses",
        balance: "Estimated balance",
        incomeValue: "¥0",
        expenseValue: "¥120,000",
        balanceValue: "−¥120,000",
        analysis: "Expense Analysis",
        analysisEmpty: "Add expenses this month to see your analysis.",
        viewMonthly: "View Detailed Monthly Summary",
        fixedExpenses: "Fixed expenses",
      },
      wardOffice: {
        title: "Ward Office Japanese",
        subtitle: "Useful Japanese phrases for ward and city office counters",
        search: "Search phrases",
        all: "All",
        phrases: [
          {
            ja: "転入届を出しに来ました。",
            ruby: phrase1Ruby,
            meaning: "I came to submit my moving-in notification.",
            pronunciation: "Tennyū Todoke o Dashi ni Kimashita",
            explanation: "Use at the moving-in registration counter",
            category: "Moving-in notification",
          },
          {
            ja: "在留カードの住所を変更したいです。",
            ruby: phrase2Ruby,
            meaning: "I would like to change the address on my residence card.",
            pronunciation: "Zairyū Kādo no Jūsho o Henkō Shitai Desu",
            explanation: "Residence card address change",
            category: "Residence card address",
          },
          {
            ja: "国民健康保険に加入したいです。",
            ruby: phrase3Ruby,
            meaning: "I would like to enroll in National Health Insurance.",
            pronunciation: "Kokumin Kenkō Hoken ni Kanyū Shitai Desu",
            explanation: "National Health Insurance enrollment",
            category: "National Health Insurance",
          },
        ],
      },
    },
  },
  ja: {
    hero: {
      brand: "LifePass Japan",
      headlineLine1: "日本での暮らしを、",
      headlineLine2: "もっとシンプルに。",
      subtitleLine1: "入国から定着まで必要な生活情報を",
      subtitleLine2: "ひとつにまとめて管理できます。",
      support: "ごみ · チェックリスト · 家計 · 病院 · 区役所の日本語",
      ctaBeta: "ベータに参加",
      ctaExplore: "機能を見る",
      langAria: "言語を選択",
    },
    nav: navJa,
    phone: {
      home: {
        greeting: "こんばんは",
        district: "板橋区 · みその1丁目",
        weather: "明日の天気：晴れ 24°C",
        todaySummary: "今日のサマリー",
        todaySummaryValue: "今日の予定はありません",
        upcomingGarbage: "次のごみ",
        garbageValue: "プラスチック · 今日",
        garbageCardTitle: "ごみ",
        checklistCardTitle: "チェックリスト",
        checklistCardSub: "0/10 完了 · 0%\n今日の予定はありません",
        monthlyExpense: "月間支出サマリー",
        monthLabel: "2026年7月",
        income: "収入",
        expense: "支出",
        balance: "予想残高",
        incomeValue: "¥0",
        expenseValue: "¥120,000",
        balanceValue: "−¥120,000",
        lifeShortcuts: "生活ショートカット",
      },
      checklist: {
        title: "チェックリスト",
        subtitle: "到着後の手続きを、順番に進められます",
        progressTitle: "進み具合",
        progressCount: "0/10 完了",
        progressPercent: "0%",
        groupFirstDay: "初日",
        groupWithin14: "14日以内",
        taskBank: "銀行口座",
        taskBankJa: "銀行口座",
        taskBankDate: "2026年7月21日",
        taskBankStatus: "進行中",
        taskPhone: "携帯電話",
        taskPhoneJa: "携帯電話",
        taskPhoneDate: "2026年7月15日",
        taskPhoneStatus: "未着手",
        taskResident: "転入届",
        taskResidentJa: "転入届",
        taskResidentDate: "2026年7月18日",
        taskResidentStatus: "未着手",
        scheduleNeeded: "予定の登録が必要",
      },
      expense: {
        title: "家計",
        monthLabel: "2026年7月",
        income: "収入",
        expense: "支出",
        balance: "予想残高",
        incomeValue: "¥0",
        expenseValue: "¥120,000",
        balanceValue: "−¥120,000",
        analysis: "支出分析",
        analysisEmpty: "今月の支出を記録すると分析を確認できます。",
        viewMonthly: "月間サマリーを詳しく見る",
        fixedExpenses: "固定費",
      },
      wardOffice: {
        title: "区役所・市役所の日本語",
        subtitle: "区役所・市役所の窓口ですぐ使える日本語表現",
        search: "フレーズを検索",
        all: "すべて",
        phrases: [
          {
            ja: "転入届を出しに来ました。",
            ruby: phrase1Ruby,
            meaning: "",
            pronunciation: "",
            explanation: "転入届の窓口で使う表現",
            category: "転入届",
          },
          {
            ja: "在留カードの住所を変更したいです。",
            ruby: phrase2Ruby,
            meaning: "",
            pronunciation: "",
            explanation: "在留カードの住所変更で使う表現",
            category: "在留カード住所変更",
          },
          {
            ja: "国民健康保険に加入したいです。",
            ruby: phrase3Ruby,
            meaning: "",
            pronunciation: "",
            explanation: "国民健康保険の加入手続きで使う表現",
            category: "国民健康保険",
          },
        ],
      },
    },
  },
};
