export type Locale = "ja" | "en" | "ko";

export type PhoneScreenId =
  | "home"
  | "checklist"
  | "expense"
  | "wardOfficeJapanese"
  | "garbage"
  | "lifeShortcuts";

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
  progressCountDone: string;
  progressPercentDone: string;
  groupFirstDay: string;
  groupWithin14: string;
  taskBank: string;
  taskBankJa: string;
  taskBankDate: string;
  taskBankStatus: string;
  taskBankStatusDone: string;
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
  expenseValueAfter: string;
  balanceValue: string;
  balanceValueAfter: string;
  analysis: string;
  analysisEmpty: string;
  viewMonthly: string;
  fixedExpenses: string;
  addTitle: string;
  amountLabel: string;
  categoryLabel: string;
  categoryFood: string;
  savedTitle: string;
  savedAmount: string;
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

export type GarbageCopy = {
  title: string;
  tagline: string;
  ward: string;
  nextLabel: string;
  todayLabel: string;
  guide: string;
  plastic: {
    name: string;
    date: string;
    tip: string;
  };
  burnable: {
    name: string;
    date: string;
    tip: string;
  };
};

export type ShortcutItem = {
  id: string;
  title: string;
  subtitle: string;
};

export type ShortcutsCopy = {
  title: string;
  subtitle: string;
  items: ShortcutItem[];
};

export type SectionCopy = {
  heading: string;
  body: string;
};

export type FinalCtaCopy = {
  heading: string;
  brand: string;
  cta: string;
};

export type ProgressCopy = {
  intro: string;
  checklist: string;
  garbage: string;
  japanese: string;
  expense: string;
  shortcuts: string;
};

export type Translations = {
  hero: HeroCopy;
  nav: NavCopy;
  sections: {
    intro: SectionCopy;
    checklist: SectionCopy;
    garbage: SectionCopy;
    japanese: SectionCopy;
    expense: SectionCopy;
    shortcuts: SectionCopy;
  };
  finalCta: FinalCtaCopy;
  progress: ProgressCopy;
  phone: {
    home: HomeCopy;
    checklist: ChecklistCopy;
    expense: ExpenseCopy;
    wardOffice: WardCopy;
    garbage: GarbageCopy;
    shortcuts: ShortcutsCopy;
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
      headlineLine1: "일본 생활의 모든 것을",
      headlineLine2: "하나의 앱으로",
      subtitleLine1: "일본에서의 새로운 시작을 더 쉽고 편리하게",
      subtitleLine2: "행정 절차부터 생활 정보, 지출 관리까지",
      support: "필요한 모든 기능을 LifePass Japan 하나에 담았습니다",
      ctaBeta: "베타 신청",
      ctaExplore: "기능 살펴보기",
      langAria: "언어 선택",
    },
    nav: navKo,
    sections: {
      intro: {
        heading: "일본 생활의 첫걸음,\n더 이상 혼자 고민하지 마세요",
        body: "전입신고부터 은행 계좌 개설,\n휴대폰 개통,\n쓰레기 분리배출까지\n\n일본 생활에 필요한 정보를\n한곳에서 쉽고 빠르게 확인할 수 있습니다",
      },
      checklist: {
        heading: "해야 할 일을 놓치지 않도록",
        body: "입국 후 필요한 행정 절차를\n순서대로 안내합니다\n\n언제 무엇을 해야 하는지\n한눈에 확인하세요",
      },
      garbage: {
        heading: "지역마다 다른 쓰레기 규칙도 쉽게",
        body: "거주 지역에 맞는\n분리배출 방법과 수거일을\n빠르게 확인할 수 있습니다",
      },
      japanese: {
        heading: "필요한 순간 바로 사용할 수 있는 일본어",
        body: "구청, 은행, 병원 등\n실생활에서 자주 사용하는 표현을\n\n한국어, 일본어, 영어로\n간편하게 확인할 수 있습니다",
      },
      expense: {
        heading: "생활비도 한눈에 관리하세요",
        body: "월별 지출을 기록하고\n소비 패턴을 확인하며\n예산을 효율적으로 관리할 수 있습니다",
      },
      shortcuts: {
        heading: "필요한 생활 기능을 더 빠르게",
        body: "병원, 긴급 연락, 배달,\n번역과 생활 서비스를\n\n필요한 순간\n바로 찾아 사용할 수 있습니다",
      },
    },
    finalCta: {
      heading: "일본 생활을 더 쉽고 편리하게",
      brand: "LifePass Japan",
      cta: "베타 신청",
    },
    progress: {
      intro: "소개로 이동",
      checklist: "체크리스트로 이동",
      garbage: "쓰레기로 이동",
      japanese: "구청 일본어로 이동",
      expense: "지출로 이동",
      shortcuts: "생활 바로가기로 이동",
    },
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
        progressCountDone: "1/10 완료",
        progressPercentDone: "10%",
        groupFirstDay: "첫날",
        groupWithin14: "14일 이내",
        taskBank: "은행 계좌",
        taskBankJa: "銀行口座",
        taskBankDate: "2026년 7월 21일",
        taskBankStatus: "진행 중",
        taskBankStatusDone: "완료",
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
        expenseValueAfter: "123,480엔",
        balanceValue: "-120,000엔",
        balanceValueAfter: "-123,480엔",
        analysis: "지출 분석",
        analysisEmpty: "이번 달 지출을 기록하면 분석을 볼 수 있어요.",
        viewMonthly: "월간 요약 자세히 보기",
        fixedExpenses: "고정지출",
        addTitle: "기록 추가",
        amountLabel: "금액",
        categoryLabel: "카테고리",
        categoryFood: "식비",
        savedTitle: "편의점",
        savedAmount: "3,480엔",
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
      garbage: {
        title: "쓰레기",
        tagline: "쓰레기·재활용",
        ward: "이타바시구 · 미소노 1초메",
        nextLabel: "다음 수거",
        todayLabel: "오늘",
        guide: "분리배출 가이드",
        plastic: {
          name: "플라스틱",
          date: "오늘 · 7월 16일",
          tip: "깨끗이 헹군 뒤 투명·반투명 봉투에 담아 주세요.",
        },
        burnable: {
          name: "가연성 쓰레기",
          date: "내일 · 7월 17일",
          tip: "지정 봉투에 담아 아침 8시 전까지 배출해 주세요.",
        },
      },
      shortcuts: {
        title: "생활 바로가기",
        subtitle: "필요한 기능을 바로 찾아보세요",
        items: [
          {
            id: "hospital",
            title: "병원",
            subtitle: "증상에 맞는 진료과 찾기",
          },
          {
            id: "emergency",
            title: "긴급",
            subtitle: "급할 때 바로 연락",
          },
          {
            id: "delivery",
            title: "배달",
            subtitle: "택배 조회와 배달",
          },
          {
            id: "translate",
            title: "번역",
            subtitle: "생활에 필요한 표현",
          },
          {
            id: "services",
            title: "생활 서비스",
            subtitle: "공과금·생활 정보",
          },
        ],
      },
    },
  },
  en: {
    hero: {
      brand: "LifePass Japan",
      headlineLine1: "Everything for life in Japan,",
      headlineLine2: "in one app",
      subtitleLine1: "Make your new start in Japan easier and more convenient",
      subtitleLine2: "From paperwork to daily info and expenses —",
      support: "everything you need is in LifePass Japan",
      ctaBeta: "Join the beta",
      ctaExplore: "Explore features",
      langAria: "Select language",
    },
    nav: navEn,
    sections: {
      intro: {
        heading: "Your first steps in Japan\nshouldn't feel lonely",
        body: "From moving-in registration and bank accounts\nto mobile setup and garbage sorting\n\nFind what you need for daily life in Japan\nin one place — quickly and clearly",
      },
      checklist: {
        heading: "So you never miss what matters",
        body: "We guide the paperwork after arrival\nstep by step\n\nSee what to do and when,\nat a glance",
      },
      garbage: {
        heading: "Local garbage rules, made simple",
        body: "Check sorting guidance and collection days\nfor your neighborhood\n— without the guesswork",
      },
      japanese: {
        heading: "Japanese you can use right away",
        body: "Phrases for ward offices, banks, hospitals,\nand other real-life moments\n\nAvailable in Korean, Japanese, and English",
      },
      expense: {
        heading: "Keep living costs in view",
        body: "Log monthly spending,\nspot patterns,\nand manage your budget with clarity",
      },
      shortcuts: {
        heading: "Everyday tools, faster",
        body: "Hospitals, emergency contacts, delivery,\ntranslation, and life services —\n\nready when you need them",
      },
    },
    finalCta: {
      heading: "Make life in Japan easier",
      brand: "LifePass Japan",
      cta: "Join the beta",
    },
    progress: {
      intro: "Go to introduction",
      checklist: "Go to checklist",
      garbage: "Go to garbage",
      japanese: "Go to ward office Japanese",
      expense: "Go to expenses",
      shortcuts: "Go to life shortcuts",
    },
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
        progressCountDone: "1 of 10 done",
        progressPercentDone: "10%",
        groupFirstDay: "First day",
        groupWithin14: "Within 14 days",
        taskBank: "Bank account",
        taskBankJa: "銀行口座",
        taskBankDate: "July 21, 2026",
        taskBankStatus: "In progress",
        taskBankStatusDone: "Done",
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
        expenseValueAfter: "¥123,480",
        balanceValue: "−¥120,000",
        balanceValueAfter: "−¥123,480",
        analysis: "Expense Analysis",
        analysisEmpty: "Add expenses this month to see your analysis.",
        viewMonthly: "View Detailed Monthly Summary",
        fixedExpenses: "Fixed expenses",
        addTitle: "Add record",
        amountLabel: "Amount",
        categoryLabel: "Category",
        categoryFood: "Food",
        savedTitle: "Convenience store",
        savedAmount: "¥3,480",
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
      garbage: {
        title: "Garbage",
        tagline: "Garbage & recyclables",
        ward: "Itabashi · Misono 1-chome",
        nextLabel: "Next collection",
        todayLabel: "Today",
        guide: "Sorting guide",
        plastic: {
          name: "Plastics",
          date: "Today · July 16",
          tip: "Rinse clean, then place in a clear or translucent bag.",
        },
        burnable: {
          name: "Burnable garbage",
          date: "Tomorrow · July 17",
          tip: "Use the designated bag and put it out by 8:00 a.m.",
        },
      },
      shortcuts: {
        title: "Life Shortcuts",
        subtitle: "Find what you need right away",
        items: [
          {
            id: "hospital",
            title: "Hospital",
            subtitle: "Find the right department",
          },
          {
            id: "emergency",
            title: "Emergency",
            subtitle: "Numbers when you need help",
          },
          {
            id: "delivery",
            title: "Delivery",
            subtitle: "Track packages and orders",
          },
          {
            id: "translate",
            title: "Translate",
            subtitle: "Phrases for daily life",
          },
          {
            id: "services",
            title: "Life services",
            subtitle: "Utilities and local info",
          },
        ],
      },
    },
  },
  ja: {
    hero: {
      brand: "LifePass Japan",
      headlineLine1: "日本での暮らしのすべてを、",
      headlineLine2: "ひとつのアプリに",
      subtitleLine1: "日本での新しいスタートを、もっと簡単に",
      subtitleLine2: "行政手続きから生活情報、家計管理まで",
      support: "必要な機能を LifePass Japan ひとつにまとめました",
      ctaBeta: "ベータに参加",
      ctaExplore: "機能を見る",
      langAria: "言語を選択",
    },
    nav: navJa,
    sections: {
      intro: {
        heading: "日本での第一歩を、\nひとりで悩まないで",
        body: "転入届から銀行口座の開設、\n携帯電話の契約、ごみの分別まで\n\n日本生活に必要な情報を\nひとつで、すばやく確認できます",
      },
      checklist: {
        heading: "やるべきことを、忘れないように",
        body: "到着後に必要な手続きを\n順番に案内します\n\nいつ・何をするかを\nひと目で確認できます",
      },
      garbage: {
        heading: "地域ごとに違うごみルールも、簡単に",
        body: "お住まいの地域に合わせた\n分別方法と収集日を\nすぐに確認できます",
      },
      japanese: {
        heading: "必要なときにすぐ使える日本語",
        body: "区役所、銀行、病院など\n実生活でよく使う表現を\n\n韓国語・日本語・英語で\nかんたんに確認できます",
      },
      expense: {
        heading: "生活費も、ひと目で管理",
        body: "月ごとの支出を記録し、\n使い方を把握しながら\n予算を効率よく管理できます",
      },
      shortcuts: {
        heading: "必要な生活機能へ、もっと早く",
        body: "病院、緊急連絡、デリバリー、\n翻訳と生活サービスを\n\n必要な瞬間に\nすぐ見つけられます",
      },
    },
    finalCta: {
      heading: "日本での暮らしを、もっと簡単に",
      brand: "LifePass Japan",
      cta: "ベータに参加",
    },
    progress: {
      intro: "紹介へ移動",
      checklist: "チェックリストへ移動",
      garbage: "ごみへ移動",
      japanese: "区役所の日本語へ移動",
      expense: "家計へ移動",
      shortcuts: "生活ショートカットへ移動",
    },
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
        progressCountDone: "1/10 完了",
        progressPercentDone: "10%",
        groupFirstDay: "初日",
        groupWithin14: "14日以内",
        taskBank: "銀行口座",
        taskBankJa: "銀行口座",
        taskBankDate: "2026年7月21日",
        taskBankStatus: "進行中",
        taskBankStatusDone: "完了",
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
        expenseValueAfter: "¥123,480",
        balanceValue: "−¥120,000",
        balanceValueAfter: "−¥123,480",
        analysis: "支出分析",
        analysisEmpty: "今月の支出を記録すると分析を確認できます。",
        viewMonthly: "月間サマリーを詳しく見る",
        fixedExpenses: "固定費",
        addTitle: "記録を追加",
        amountLabel: "金額",
        categoryLabel: "カテゴリ",
        categoryFood: "食費",
        savedTitle: "コンビニ",
        savedAmount: "¥3,480",
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
      garbage: {
        title: "ごみ",
        tagline: "ごみ・資源",
        ward: "板橋区 · みその1丁目",
        nextLabel: "次の収集",
        todayLabel: "今日",
        guide: "分別ガイド",
        plastic: {
          name: "プラスチック",
          date: "今日 · 7月16日",
          tip: "きれいにすすいだあと、透明・半透明の袋へ入れてください。",
        },
        burnable: {
          name: "燃やすごみ",
          date: "明日 · 7月17日",
          tip: "指定袋に入れ、朝8時までに出してください。",
        },
      },
      shortcuts: {
        title: "生活ショートカット",
        subtitle: "必要な機能をすぐ見つけられます",
        items: [
          {
            id: "hospital",
            title: "病院",
            subtitle: "症状に合う診療科を探す",
          },
          {
            id: "emergency",
            title: "緊急",
            subtitle: "困ったときの連絡先",
          },
          {
            id: "delivery",
            title: "デリバリー",
            subtitle: "荷物の追跡と配達",
          },
          {
            id: "translate",
            title: "翻訳",
            subtitle: "生活に使える表現",
          },
          {
            id: "services",
            title: "生活サービス",
            subtitle: "ライフライン・生活情報",
          },
        ],
      },
    },
  },
};
