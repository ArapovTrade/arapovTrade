import { Injectable } from '@angular/core';
export interface artickle {
  titleUkr: string;
  titleEn: string;
  titleRus: string;
  linkUkr: string;
  imgUkr: string;
  groupsUkr: string[];
  groupsRus: string[];
  groupsEn: string[];

  id: number;
}

@Injectable({
  providedIn: 'root',
})
export class ArticlesService {
  groups = [
    'Об`ємний аналіз ринку',
    'Концепція Смарт Мані',
    'Трейдинг для початківців',
    'Психологія трейдингу',
    'Словник трейдера',
    'Технічний аналіз',
    'Фундаментальний аналіз',
    'Криптовалюта',
    'Приклади угод',
  ];
  groupsRus = [
    'Объемный анализ рынка',
    'Концепция Смарт Мани',
    'Трейдинг для начинающих',
    'Психология трейдинга',
    'Словарь трейдера',
    'Технический анализ',
    'Фундаментальный анализ',
    'Криптовалюта',
    'Примеры сделок',
  ];
  groupsEn = [
    'Market Volume Analysis',
    'Smart Money Concept',
    'Trading for Beginners',
    'Trading Psychology',
    'Trader`s Dictionary',
    'Technical Analysis',
    'Fundamental Analysis',
    'Cryptocurrency',
    'Examples of transactions',
  ];

  selectedGroups: string[] = [];

  ukrainiansArticles() {
    if (this.selectedGroups.length === 0) {
      return this.ukrArtickles;
    }
    return this.ukrArtickles.filter((article) =>
      article.groupsUkr.some((group) => this.selectedGroups.includes(group))
    );
  }
  russianssArticles() {
    if (this.selectedGroups.length === 0) {
      return this.ukrArtickles;
    }
    return this.ukrArtickles.filter((article) =>
      article.groupsRus.some((group) => this.selectedGroups.includes(group))
    );
  }
  englishArticles() {
    if (this.selectedGroups.length === 0) {
      return this.ukrArtickles;
    }
    return this.ukrArtickles.filter((article) =>
      article.groupsEn.some((group) => this.selectedGroups.includes(group))
    );
  }
  getUkrainianGroups() {
    return this.groups;
  }
  getRussianGroups() {
    return this.groupsRus;
  }
  getEnglishGroups() {
    return this.groupsEn;
  }
  getRandomUkArticles() {
    const shuffled = [...this.ukrArtickles].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, 4);
  }

  ukrArtickles: artickle[] = [
    {
      titleUkr: 'Як аналізувати рівні максимального накопичення обсягів',
      linkUkr: 'peakvolumelevels',
      titleEn: 'How to Analyze Peak Volume Levels',
      titleRus: 'Как анализировать уровни максимального скопления объемов',

      imgUkr: '/assets/img/content/peakvolumelevels44.png',
      groupsRus: ['Объемный анализ рынка'],
      groupsEn: ['Market Volume Analysis'],
      groupsUkr: ['Об`ємний аналіз ринку'],
      id: 111,
    },

    {
      titleUkr:
        'Чому важливо аналізувати обсяги у рамках поточних трендів на ринку',
      linkUkr: 'trendvolumeanalysis',
      titleEn:
        'Why is it important to analyze volumes within the  current market trends?',
      titleRus:
        'Почему важно анализировать объемы в рамках текущих трендов на рынке',

      imgUkr: '/assets/img/content/trendvolumeanalysis44.png',
      groupsRus: ['Объемный анализ рынка'],
      groupsEn: ['Market Volume Analysis'],
      groupsUkr: ['Об`ємний аналіз ринку'],
      id: 112,
    },
    {
      titleUkr:
        'Як розвивається ринковий аукціон, оцінка сантименту учасників ринку',
      linkUkr: 'marketauctiondevelops',
      titleEn:
        'How a market auction develops, assessing the sentiment of market participants',
      titleRus:
        'Как развивается рыночный аукцион , оценка сантимента участников рынка',

      imgUkr: '/assets/img/content/marketauctiondevelops44.png',
      groupsRus: ['Объемный анализ рынка'],
      groupsEn: ['Market Volume Analysis'],
      groupsUkr: ['Об`ємний аналіз ринку'],
      id: 113,
    },
    {
      titleUkr:
        'Пули ліквідності Як великі гравці шукають ліквідність на ринку?',
      linkUkr: 'liquiditypools',
      titleEn:
        'Liquidity pools: How do major players seek liquidity in the market?',
      titleRus:
        'Пулы ликвидности: Как крупные игроки ищут ликвидность на рынке?',

      imgUkr: '/assets/img/content/liquiditypools44.png',
      groupsRus: ['Концепция Смарт Мани'],
      groupsEn: ['Smart Money Concept'],
      groupsUkr: ['Концепція Смарт Мані'],
      id: 104,
    },
    {
      titleUkr:
        'Приховані ордери (Iceberg Orders): Як банки маскують свої позиції?',
      linkUkr: 'icebergorders',
      titleEn:
        'Hidden Orders (Iceberg Orders): How do banks disguise their positions?',
      titleRus:
        'Скрытые ордера (Iceberg Orders): Как банки маскируют свои позиции?',

      imgUkr: '/assets/img/content/icebergorders44.png',
      groupsRus: ['Концепция Смарт Мани'],
      groupsEn: ['Smart Money Concept'],
      groupsUkr: ['Концепція Смарт Мані'],
      id: 105,
    },
    {
      titleUkr:
        'Як торгувати за Smart Money Concepts (SMC)? Покрокове керівництво',
      linkUkr: 'smartmoneyconceptsguide',
      titleEn: 'How to trade Smart Money Concepts (SMC)? Step by step guide',
      titleRus:
        'Как торговать по Smart Money Concepts (SMC)? Пошаговое руководство',

      imgUkr: '/assets/img/content/smartmoneyconceptsguide44.png',
      groupsRus: ['Концепция Смарт Мани'],
      groupsEn: ['Smart Money Concept'],
      groupsUkr: ['Концепція Смарт Мані'],
      id: 106,
    },

    {
      titleUkr: 'Як знаходити точки входу Smart Money? Найкращі стратегії',
      linkUkr: 'smartmoneystrategies',
      titleEn: 'How to find entry points using Smart Money? Best Strategies',
      titleRus: 'Как находить точки входа по Smart Money? Лучшие стратегии',

      imgUkr: '/assets/img/content/smartmoneystrategies44.webp',
      groupsRus: ['Концепция Смарт Мани'],
      groupsEn: ['Smart Money Concept'],
      groupsUkr: ['Концепція Смарт Мані'],
      id: 107,
    },

    {
      titleUkr:
        'Як Smart Money керують натовпом? Маніпуляції новинами та настроєм',
      linkUkr: 'smartmoneycontrol',
      titleEn:
        'How does Smart Money control the crowd? News and mood manipulation',
      titleRus:
        'Как Smart Money управляют толпой? Манипуляции новостями и настроением',

      imgUkr: '/assets/img/content/smartmoneycontrol44.webp',
      groupsRus: ['Концепция Смарт Мани'],
      groupsEn: ['Smart Money Concept'],
      groupsUkr: ['Концепція Смарт Мані'],
      id: 108,
    },

    {
      titleUkr: 'Практичні рекомендації',
      linkUkr: 'practic',
      titleEn: 'Practical recommendations',
      titleRus: 'Практические рекомендации',

      imgUkr: '/assets/img/content/prakticuk44.png',
      groupsRus: ['Примеры сделок'],
      groupsEn: ['Examples of transactions'],
      groupsUkr: ['Приклади угод'],
      id: 109,
    },
    {
      titleUkr: 'Як читати Біржовий стакан і стрічку принтів',
      linkUkr: 'stockorderbook',
      titleEn: 'How to read the stock order book and print tape',
      titleRus: 'Как читать Биржевой стакан и ленту принтов',

      imgUkr: '/assets/img/content/stockorderbook44.png',
      groupsRus: ['Объемный анализ рынка'],
      groupsEn: ['Market Volume Analysis'],
      groupsUkr: ['Об`ємний аналіз ринку'],
      id: 110,
    },

    {
      titleUkr: 'Фази ринку у трейдингу',
      titleEn: 'Market phases in trading',
      titleRus: 'Фазы рынка в трейдинге',
      linkUkr: 'blogmarketphases',
      imgUkr: '/assets/img/content/blogmarketphases44.png',
      groupsRus: ['Объемный анализ рынка'],
      groupsEn: ['Market Volume Analysis'],
      groupsUkr: ['Об`ємний аналіз ринку'],

      id: 1,
    },
    {
      titleUkr: 'Дивергенція на індикаторах',
      titleEn: 'Divergence on indicators',
      titleRus: 'Дивергенция на индикаторах',
      linkUkr: 'divergenceonindecators',
      imgUkr: '/assets/img/content/divergenceonindecators44.png',
      groupsRus: ['Технический анализ'],
      groupsEn: ['Technical Analysis'],
      groupsUkr: ['Технічний аналіз'],
      id: 2,
    },
    {
      titleUkr: 'Волатильність у трейдингу',
      titleEn: 'Volatility in trading',
      titleRus: 'Волатильность в трейдинге',

      linkUkr: 'volatility',
      imgUkr: '/assets/img/content/volatility.png',
      groupsRus: ['Трейдинг для начинающих'],
      groupsEn: ['Trading for Beginners'],
      groupsUkr: ['Трейдинг для початківців'],
      id: 3,
    },
    {
      titleUkr: 'Як не втратити всі гроші на маржинальній торгівлі?',
      titleEn: 'How to avoid losing all your money on margin trading?',
      titleRus: 'Как не потерять все деньги на маржинальной торговле?',

      linkUkr: 'avoidlosingmoney',
      imgUkr: '/assets/img/content/reasonfordepositeloose44.png',
      groupsRus: ['Криптовалюта'],
      groupsEn: ['Cryptocurrency'],
      groupsUkr: ['Криптовалюта'],
      id: 4,
    },
    {
      titleUkr: 'Ціноутворення та ліквідність',
      titleRus: 'Ценообразование и ликвидность',

      titleEn: 'Pricing and Liquidity',
      linkUkr: 'pricingandliquidity',
      imgUkr: '/assets/img/content/pricingandliquidity44.png',
      groupsRus: ['Объемный анализ рынка'],
      groupsEn: ['Market Volume Analysis'],
      groupsUkr: ['Об`ємний аналіз ринку'],
      id: 5,
    },
    {
      titleUkr: 'Концепція Смарт Мані',
      titleEn: 'Concept of Smart Money',
      titleRus: 'Концепция Смарт Мани',

      linkUkr: 'smartestmoney',
      imgUkr: '/assets/img/content/smartestmoney44.png',
      groupsRus: ['Концепция Смарт Мани'],
      groupsEn: ['Smart Money Concept'],
      groupsUkr: ['Концепція Смарт Мані'],
      id: 6,
    },
    {
      titleUkr: 'Як заробляють у трейдингу?',
      titleRus: 'Как зарабатывают в трейдинге?',
      titleEn: 'How to make money from trading?',

      linkUkr: 'makingmoneyintrading',
      imgUkr: '/assets/img/content/makingmoneyintrading44.png',
      groupsRus: ['Трейдинг для начинающих'],
      groupsEn: ['Trading for Beginners'],
      groupsUkr: ['Трейдинг для початківців'],
      id: 7,
    },

    {
      titleUkr: 'Імбаланс у трейдингу ',
      titleRus: 'Имбаланс в трейдинге ',
      titleEn: 'Imbalance in Trading ',

      linkUkr: 'imbalanceintrading',
      imgUkr: '/assets/img/content/imbalanceintrading44.png',
      groupsRus: ['Концепция Смарт Мани'],
      groupsEn: ['Smart Money Concept'],
      groupsUkr: ['Концепція Смарт Мані'],
      id: 8,
    },
    {
      titleUkr: 'Як прогнозувати ціну на ринку?',
      titleRus: 'Как прогнозировать цену на рынке?',
      titleEn: 'How to predict the market price?',

      linkUkr: 'predictmarketprice',
      imgUkr: '/assets/img/content/predictmarketprice44.png',
      groupsRus: ['Объемный анализ рынка'],
      groupsEn: ['Market Volume Analysis'],
      groupsUkr: ['Об`ємний аналіз ринку'],
      id: 9,
    },
    {
      titleUkr: 'Основні причини втрат у Трейдінгу',
      titleRus: 'Основные причины потерь в Трейдинге',
      titleEn: 'The main causes of losses in Trading',

      linkUkr: 'mainreasonforlosses',
      imgUkr: '/assets/img/content/mainreasonforlosses44.png',
      groupsRus: ['Психология трейдинга'],
      groupsEn: ['Trading Psychology'],
      groupsUkr: ['Психологія трейдингу'],
      id: 10,
    },
    {
      titleUkr: 'Стартовий депозит трейдера',
      titleRus: 'Стартовый депозит Трейдера',
      titleEn: 'Trader`s starting deposit',

      linkUkr: 'starterdeposit',
      imgUkr: '/assets/img/content/starterdeposit44.png',
      groupsRus: ['Трейдинг для начинающих'],
      groupsEn: ['Trading for Beginners'],
      groupsUkr: ['Трейдинг для початківців'],
      id: 11,
    },
    {
      titleUkr: 'Торгівля рівнів',
      titleEn: 'Trading of levels',
      titleRus: 'Торговля уровней',

      linkUkr: 'tradingoflevels',
      imgUkr: '/assets/img/content/tradingoflevels44.png',
      groupsRus: ['Технический анализ'],
      groupsEn: ['Technical Analysis'],
      groupsUkr: ['Технічний аналіз'],
      id: 12,
    },
    {
      titleUkr: 'Хвилі Елліотта: Основи, структура та застосування',
      titleRus: 'Волны Эллиотта: Основы, структура и применение',

      titleEn: 'Elliott Waves: Basics, Structure, and Applications',
      linkUkr: 'wavesofelliott',
      imgUkr: '/assets/img/content/wavesofelliott44.png',
      groupsRus: ['Технический анализ'],
      groupsEn: ['Technical Analysis'],
      groupsUkr: ['Технічний аналіз'],
      id: 13,
    },
    {
      titleUkr: 'Трейдинг та Інвестиції що краще?',
      titleRus: 'Трейдинг и Инвестиции что лучше?',

      titleEn: 'Trading and Investments. What is better?',
      linkUkr: 'tradingandinvestments',
      imgUkr: '/assets/img/content/tradingandinvestments44.png',
      groupsRus: ['Трейдинг для начинающих'],
      groupsEn: ['Trading for Beginners'],
      groupsUkr: ['Трейдинг для початківців'],
      id: 14,
    },
    {
      titleUkr: "Правда про торгівлю ф'ючерсами",
      linkUkr: 'futurestrading',
      titleRus: 'Правда о торговле фьючерсами',

      titleEn: ' The Truth about futures trading',
      imgUkr: '/assets/img/content/futurestrading44.png',
      groupsRus: ['Словарь трейдера'],
      groupsEn: ['Trader`s Dictionary'],
      groupsUkr: ['Словник трейдера'],
      id: 15,
    },
    {
      titleUkr: 'Трендові канали',
      titleEn: 'Trending channels',
      titleRus: 'Трендовые каналы',

      linkUkr: 'trandingchannels',
      imgUkr: '/assets/img/content/trandingchannels44.png',
      groupsRus: ['Технический анализ'],
      groupsEn: ['Technical Analysis'],
      groupsUkr: ['Технічний аналіз'],
      id: 16,
    },
    {
      titleUkr: 'Топ міфів про трейдинг',
      titleEn: 'Top myths about Trading',
      titleRus: 'Топ мифов о Трейдинге',

      linkUkr: 'tradingmyths',
      imgUkr: '/assets/img/content/tradingmyths44.png',
      groupsRus: ['Трейдинг для начинающих'],
      groupsEn: ['Trading for Beginners'],
      groupsUkr: ['Трейдинг для початківців'],
      id: 17,
    },
    {
      titleUkr: 'Об`ємний аналіз ринку',
      titleEn: 'Volumetric market analysis',
      titleRus: 'Объемный анализ рынка',

      linkUkr: 'volmarketanalisys',
      imgUkr: '/assets/img/content/volmarketanalisys44.png',
      groupsRus: ['Объемный анализ рынка'],
      groupsEn: ['Market Volume Analysis'],
      groupsUkr: ['Об`ємний аналіз ринку'],
      id: 18,
    },
    {
      titleUkr: 'Метод Вайкоффа у трейдингу',
      titleEn: 'The Wyckoff Method of Trading',
      titleRus: 'Метод Вайкоффа в трейдинге',

      linkUkr: 'wyckoffmethod',
      imgUkr: '/assets/img/content/wyckoffmethod44.png',
      groupsRus: ['Концепция Смарт Мани'],
      groupsEn: ['Smart Money Concept'],
      groupsUkr: ['Концепція Смарт Мані'],
      id: 19,
    },
    {
      titleUkr:
        'Що таке скам в криптовалюті - шахрайські схеми та способи захисту',
      titleEn:
        'What is a scam in cryptocurrency - fraudulent schemes and methods of protection',
      titleRus:
        'Что такое скам в криптовалюте: мошеннические схемы и способы защиты',

      linkUkr: 'cryptoscam',
      imgUkr: '/assets/img/content/cryptoscam44.png',
      groupsRus: ['Криптовалюта'],
      groupsEn: ['Cryptocurrency'],
      groupsUkr: ['Криптовалюта'],
      id: 20,
    },
    {
      titleUkr: 'Як визначити маркетмейкера',
      titleEn: 'How to identify a market maker',
      titleRus: 'Как определить маркет мейкера',

      linkUkr: 'marketmaker',
      imgUkr: '/assets/img/content/marketmaker44.png',
      groupsRus: ['Концепция Смарт Мани'],
      groupsEn: ['Smart Money Concept'],
      groupsUkr: ['Концепція Смарт Мані'],
      id: 21,
    },
    {
      titleUkr: 'Що таке арбітраж криптовалют: основи та секрети успіху',
      titleEn:
        'What is cryptocurrency arbitrage: the basics and secrets of success',
      titleRus: 'Что такое арбитраж криптовалют: основы и секреты успеха',

      linkUkr: 'cryptoarbitrage',
      imgUkr: '/assets/img/content/cryptoarbitrage44.jpg',
      groupsRus: ['Криптовалюта'],
      groupsEn: ['Cryptocurrency'],
      groupsUkr: ['Криптовалюта'],
      id: 22,
    },
    {
      titleUkr: 'Що таке Bitcoin-ETF і як він впливає на ринок? ',
      titleEn: 'What is a Bitcoin ETF and how does it impact the market?',
      titleRus: 'Что такое Bitcoin-ETF и как он оказывает влияние на рынок?',

      linkUkr: 'bitcoinetf',
      imgUkr: '/assets/img/content/bitcoinetf44.png',
      groupsRus: ['Криптовалюта'],
      groupsEn: ['Cryptocurrency'],
      groupsUkr: ['Криптовалюта'],
      id: 23,
    },
    {
      titleUkr: 'Фігура "Прапор" у трейдингу',
      titleEn: 'Flag figure in trading',
      titleRus: 'Фигура "Флаг" в трейдинге',

      linkUkr: 'flagfigure',
      imgUkr: '/assets/img/content/flagfigure44.png',
      groupsRus: ['Технический анализ'],
      groupsEn: ['Technical Analysis'],
      groupsUkr: ['Технічний аналіз'],
      id: 24,
    },
    {
      titleUkr: 'Функції маркет-мейкерів на ринку криптовалют',
      titleEn: 'Functions of market makers in the cryptocurrency market',
      titleRus: 'Функции маркет-мейкеров на рынке криптовалют',

      linkUkr: 'cryptommakers',
      imgUkr: '/assets/img/content/cryptommakers44.png',
      groupsRus: ['Криптовалюта'],
      groupsEn: ['Cryptocurrency'],
      groupsUkr: ['Криптовалюта'],
      id: 25,
    },
    {
      titleUkr: 'Види ордерів на біржі',
      titleEn: 'Types of orders on the exchange',
      titleRus: 'Виды ордеров на бирже',

      linkUkr: 'ordertypes',
      imgUkr: '/assets/img/content/ordertypes44.png',
      groupsRus: ['Объемный анализ рынка'],
      groupsEn: ['Market Volume Analysis'],
      groupsUkr: ['Об`ємний аналіз ринку'],
      id: 26,
    },
    {
      titleUkr: 'Як читати японські свічки',
      titleEn: 'How to read Japanese candlesticks',
      titleRus: 'Как читать японские свечи',

      linkUkr: 'japanesecandle',
      imgUkr: '/assets/img/content/japanesecandle44.jpg',
      groupsRus: ['Технический анализ'],
      groupsEn: ['Technical Analysis'],
      groupsUkr: ['Технічний аналіз'],
      id: 27,
    },
    {
      titleUkr: 'Що таке альтернативні блокчейни',
      linkUkr: 'altblockchains',
      titleEn: 'What are alternative blockchains',
      titleRus: 'Что такое альтернативные блокчейны',

      imgUkr: '/assets/img/content/altblockchains44.png',
      groupsRus: ['Криптовалюта'],
      groupsEn: ['Cryptocurrency'],
      groupsUkr: ['Криптовалюта'],
      id: 28,
    },
    {
      titleUkr: 'Швидкий Старт у Трейдінгу',
      titleRus: 'Быстрый Старт в Трейдинге',
      titleEn: 'Quick Start in Trading',

      linkUkr: 'tradingquickstart',
      imgUkr: '/assets/img/content/tradingquickstart44.png',
      groupsRus: ['Трейдинг для начинающих'],
      groupsEn: ['Trading for Beginners'],
      groupsUkr: ['Трейдинг для початківців'],
      id: 29,
    },
    {
      titleUkr: 'Основи Криптовалют для Трейдерів Початківців',
      linkUkr: 'cryptocurrencybasics',
      titleEn: 'Cryptocurrency Basics for Beginner Traders',
      titleRus: 'Основы Криптовалют для Начинающих Трейдеров',

      imgUkr: '/assets/img/content/cryptocurrencybasics44.webp',
      groupsRus: ['Трейдинг для начинающих'],
      groupsEn: ['Trading for Beginners'],
      groupsUkr: ['Трейдинг для початківців'],
      id: 30,
    },
    {
      titleUkr: 'Рівні Підтримки та Опору',
      titleEn: 'Levels of Support and Resistance',
      titleRus: 'Уровни Поддержки и Сопротивления',

      linkUkr: 'levelofsupport',
      imgUkr: '/assets/img/content/levelofsupport44.png',
      groupsRus: ['Технический анализ'],
      groupsEn: ['Technical Analysis'],
      groupsUkr: ['Технічний аналіз'],
      id: 31,
    },
    {
      titleUkr: 'Чи варто купувати навчання трейдингу?',
      linkUkr: 'purchasingcourses',
      titleEn: 'Is it worth purchasing trading courses?',
      titleRus: 'Стоит ли покупать обучение трейдингу?',

      imgUkr: '/assets/img/content/purchasingcourses44.jpg',
      groupsRus: ['Трейдинг для начинающих'],
      groupsEn: ['Trading for Beginners'],
      groupsUkr: ['Трейдинг для початківців'],
      id: 32,
    },
    {
      titleUkr: 'Пін бар - Грааль трейдингу',
      titleEn: 'Pin Bar - The Grail of Trading',
      titleRus: 'Пин бар - Грааль трейдинга',

      linkUkr: 'pinbar',
      imgUkr: '/assets/img/content/pinbar44.jpg',
      groupsRus: ['Технический анализ'],
      groupsEn: ['Technical Analysis'],
      groupsUkr: ['Технічний аналіз'],
      id: 33,
    },
    {
      titleUkr: 'Як виставляти стоп-лос?',
      titleRus: 'Как выставлять стоп-лосс?',
      titleEn: 'How to set a stop loss?',

      linkUkr: 'stoploss',
      imgUkr: '/assets/img/content/stoplossmain44.png',
      groupsRus: ['Объемный анализ рынка'],
      groupsEn: ['Market Volume Analysis'],
      groupsUkr: ['Об`ємний аналіз ринку'],
      id: 34,
    },
    {
      titleUkr: 'Основи Трейдингу для Початківців',
      titleRus: 'Основы Трейдинга для Начинающих',

      titleEn: 'Trading Basics for Beginners',
      linkUkr: 'tradingbasics',
      imgUkr: '/assets/img/content/tradingbasics44.png',
      groupsRus: ['Трейдинг для начинающих'],
      groupsEn: ['Trading for Beginners'],
      groupsUkr: ['Трейдинг для початківців'],
      id: 35,
    },
    {
      titleUkr: 'Особливості ринку криптовалют',
      titleEn: 'Features of the cryptocurrency market',
      titleRus: 'Особенности рынка криптовалют',

      linkUkr: 'cryptocurrencytrading',
      imgUkr: '/assets/img/content/cryptocurrencytrading44.png',
      groupsRus: ['Трейдинг для начинающих'],
      groupsEn: ['Trading for Beginners'],
      groupsUkr: ['Трейдинг для початківців'],
      id: 36,
    },
    {
      titleUkr: 'Просадки у трейдингу',
      titleEn: 'Drawdowns in trading',
      titleRus: 'Просадки в трейдинге',

      linkUkr: 'drawdowns',
      imgUkr: ' /assets/img/content/drawdowns44.png',
      groupsRus: ['Трейдинг для начинающих'],
      groupsEn: ['Trading for Beginners'],
      groupsUkr: ['Трейдинг для початківців'],
      id: 37,
    },
    {
      titleUkr: 'Принципи зберігання криптовалют',
      titleEn: 'Principles of storing cryptocurrencies',
      titleRus: 'Принципы хранения криптовалют',

      linkUkr: 'cryptostoring',
      imgUkr: ' /assets/img/content/cryptostoring44.webp',
      groupsRus: ['Криптовалюта'],
      groupsEn: ['Cryptocurrency'],
      groupsUkr: ['Криптовалюта'],
      id: 38,
    },
    {
      titleUkr: 'Де безпечно зберігати криптовалюту',
      titleEn: 'Where is it safe to store cryptocurrency?',
      titleRus: 'Где безопасно хранить криптовалюту',

      linkUkr: 'safetostorecrypto',
      imgUkr: '/assets/img/content/safetostorecrypto44.png',
      groupsRus: ['Криптовалюта'],
      groupsEn: ['Cryptocurrency'],
      groupsUkr: ['Криптовалюта'],
      id: 39,
    },
    {
      titleUkr: 'Чому трейдинг такий складний?',
      titleEn: 'Why is trading so difficult?',
      titleRus: 'Почему трейдинг такой сложный ?',

      linkUkr: 'difficulttrading',
      imgUkr: '/assets/img/content/difficulttrading44.png',
      groupsRus: ['Трейдинг для начинающих'],
      groupsEn: ['Trading for Beginners'],
      groupsUkr: ['Трейдинг для початківців'],
      id: 40,
    },
    {
      titleUkr: 'Правила для Успішного Трейдингу',
      titleEn: 'Rules for Successful Trading',
      titleRus: 'Правила для Успешного Трейдинга',

      linkUkr: 'successfultrading',
      imgUkr: '/assets/img/content/successfultrading44.png',
      groupsRus: ['Трейдинг для начинающих'],
      groupsEn: ['Trading for Beginners'],
      groupsUkr: ['Трейдинг для початківців'],
      id: 41,
    },
    {
      titleUkr: 'Ризики криптовалют для початківців',
      linkUkr: 'cryptocurrencyrisks',
      titleEn: 'Risks of cryptocurrencies for beginners',
      titleRus: 'Риски криптовалют для начинающих ',

      imgUkr: '/assets/img/content/cryptocurrencyrisks44.png',
      groupsRus: ['Трейдинг для начинающих'],
      groupsEn: ['Trading for Beginners'],
      groupsUkr: ['Трейдинг для початківців'],
      id: 42,
    },
    {
      titleUkr: 'Аналіз попиту та пропозиції на ринку криптовалют',
      titleEn: 'Analysis of supply and demand in the cryptocurrency market',
      linkUkr: 'cryptomarketanalysis',
      titleRus: 'Анализ спроса и предложения на рынке криптовалют',

      imgUkr: '/assets/img/content/cryptomarketanalysis44.png',
      groupsRus: ['Криптовалюта'],
      groupsEn: ['Cryptocurrency'],
      groupsUkr: ['Криптовалюта'],
      id: 43,
    },
    {
      titleUkr: 'Переваги та ризики криптостейкінгу',
      titleEn: 'Benefits and risks of crypto staking',
      titleRus: 'Преимущества и риски криптостейкинга',

      linkUkr: 'cryptostaking',
      imgUkr: '/assets/img/content/cryptostaking44.jpg',
      groupsRus: ['Криптовалюта'],
      groupsEn: ['Cryptocurrency'],
      groupsUkr: ['Криптовалюта'],
      id: 44,
    },
    {
      titleEn: 'How to use moving averages in Trading?',
      titleUkr: 'Як застосовувати ковзні середні у Трейдингу?',
      linkUkr: 'movingaverages',
      titleRus: 'Как применять скользящие средние в Трейдинге?',

      imgUkr: '/assets/img/content/movingaverages44.png',
      groupsRus: ['Технический анализ'],
      groupsEn: ['Technical Analysis'],
      groupsUkr: ['Технічний аналіз'],
      id: 45,
    },
    {
      titleUkr: 'Bitcoin Pizza Day: історія, значення та традиції',
      titleEn: 'Bitcoin Pizza Day: history, meaning and traditions',
      titleRus: 'Bitcoin Pizza Day: история, значение и традиции',

      linkUkr: 'pizzaday',
      imgUkr: '/assets/img/content/pizzaday44.webp',
      groupsRus: ['Криптовалюта'],
      groupsEn: ['Cryptocurrency'],
      groupsUkr: ['Криптовалюта'],
      id: 46,
    },
    {
      titleUkr: 'Фундаментальний Аналіз ринку',
      titleEn: 'Fundamental Market Analysis',
      titleRus: 'Фундаментальный Анализ рынка ',

      linkUkr: 'fundamentalanalysis',
      imgUkr: '/assets/img/content/fundamentalanalysis44.png',
      groupsRus: ['Фундаментальный анализ'],
      groupsEn: ['Fundamental Analysis'],
      groupsUkr: ['Фундаментальний аналіз'],
      id: 47,
    },
    {
      titleUkr: 'Інструкція з самостійного навчання Трейдингу',
      titleEn: 'Instructions for self-study in Trading',
      linkUkr: 'selfstudying',
      titleRus: 'Инструкция по самостоятельному обучению Трейдингу',

      imgUkr: '/assets/img/content/selfstudying44.webp',
      groupsRus: ['Трейдинг для начинающих'],
      groupsEn: ['Trading for Beginners'],
      groupsUkr: ['Трейдинг для початківців'],
      id: 48,
    },
    {
      titleEn: 'How to choose a trading platform for trading',
      titleUkr: 'Як обрати торгову платформу для трейдингу',
      linkUkr: 'choosingtradingplatform',
      titleRus: 'Как выбрать торговую платформу для трейдинга',

      imgUkr: '/assets/img/content/choosingtradingplatform44.png',
      groupsRus: ['Трейдинг для начинающих'],
      groupsEn: ['Trading for Beginners'],
      groupsUkr: ['Трейдинг для початківців'],
      id: 49,
    },
    {
      titleUkr: 'Алгоритмічні Ордери на Біржі',
      titleEn: 'Algorithmic Orders on the Exchange',
      titleRus: 'Алгоримические Ордера на Бирже',

      linkUkr: 'algorithmicorders',
      imgUkr: '/assets/img/content/algorithmicorders44.png',
      groupsRus: ['Объемный анализ рынка'],
      groupsEn: ['Market Volume Analysis'],
      groupsUkr: ['Об`ємний аналіз ринку'],
      id: 50,
    },
    {
      titleUkr: 'Свічні патерни в Price Action',
      titleEn: 'Candlestick patterns in Price Action',
      titleRus: 'Свечные паттерны в Price Action',

      linkUkr: 'candlestickpatterns',
      imgUkr: '/assets/img/content/candlestickpatterns44.png',
      groupsRus: ['Технический анализ'],
      groupsEn: ['Technical Analysis'],
      groupsUkr: ['Технічний аналіз'],
      id: 51,
    },
    {
      titleEn: 'Anatomy of market trends',
      titleUkr: 'Анатомія трендів на ринку',
      titleRus: 'Анатомия трендов на рынке',

      linkUkr: 'anatomyofmarkettrends',
      imgUkr: '/assets/img/content/anatomyofmarkettrends44.png',
      groupsRus: ['Объемный анализ рынка'],
      groupsEn: ['Market Volume Analysis'],
      groupsUkr: ['Об`ємний аналіз ринку'],
      id: 52,
    },
    {
      titleUkr: 'Ордер Блок у Трейдінгу',
      titleEn: 'Block Order in Trading',
      titleRus: 'Ордер Блок в Трейдинге',

      linkUkr: 'orderblockintrading',
      imgUkr: '/assets/img/content/orderblockintrading44.png',
      groupsRus: ['Концепция Смарт Мани'],
      groupsEn: ['Smart Money Concept'],
      groupsUkr: ['Концепція Смарт Мані'],
      id: 53,
    },
    {
      titleUkr: 'Як забезпечити безпеку криптовалюти',
      titleEn: 'How to keep your cryptocurrency safe',
      titleRus: 'Как обеспечить безопасность криптовалюты',

      linkUkr: 'cryptosafe',
      imgUkr: '/assets/img/content/cryptosafe44.webp',
      groupsRus: ['Криптовалюта'],
      groupsEn: ['Cryptocurrency'],
      groupsUkr: ['Криптовалюта'],
      id: 54,
    },
    {
      titleEn: 'Scalping in trading',
      titleUkr: 'Скальпінг у трейдингу',
      titleRus: 'Скальпинг в трейдинге',

      linkUkr: 'scalpingintrading',
      imgUkr: '/assets/img/content/scalpingintrading44.png',
      groupsRus: ['Трейдинг для начинающих'],
      groupsEn: ['Trading for Beginners'],
      groupsUkr: ['Трейдинг для початківців'],
      id: 55,
    },
    {
      titleUkr: 'Книги з трейдингу - в чому користь для початківців?',
      titleEn: 'What are the benefits of books on trading for beginners?',
      linkUkr: 'benefitsoftradingbooks',
      titleRus: 'Книги по трейдингу в чем польза для начинающих ?',

      imgUkr: '/assets/img/content/benefitsoftradingbooks44.png',
      groupsRus: ['Трейдинг для начинающих'],
      groupsEn: ['Trading for Beginners'],
      groupsUkr: ['Трейдинг для початківців'],
      id: 56,
    },
    {
      titleUkr: 'Індикатори в трейдингу',
      titleRus: 'Индикаторы в трейдинге',
      titleEn: 'Indicators in trading',

      linkUkr: 'tradingindicators',
      imgUkr: '/assets/img/content/tradingindicators44.png',
      groupsRus: ['Технический анализ'],
      groupsEn: ['Technical Analysis'],
      groupsUkr: ['Технічний аналіз'],
      id: 57,
    },
    {
      titleUkr: 'Усереднення у трейдингу ',
      titleEn: 'Averaging in trading',
      titleRus: 'Усреднение в трейдинге',

      linkUkr: 'averagingintrading',
      imgUkr: '/assets/img/content/averagingintrading44.png',
      groupsRus: ['Трейдинг для начинающих'],
      groupsEn: ['Trading for Beginners'],
      groupsUkr: ['Трейдинг для початківців'],
      id: 58,
    },
    {
      titleUkr: 'Як торгувати Пробій рівня у трейдингу ',
      linkUkr: 'levelbreakoutstrategy',
      titleEn: 'How to trade Level Breakout in trading',
      titleRus: 'Как торговать Пробой уровня в трейдинге',

      imgUkr: '/assets/img/content/levelbreakoutstrategy44.png',
      groupsRus: ['Технический анализ'],
      groupsEn: ['Technical Analysis'],
      groupsUkr: ['Технічний аналіз'],
      id: 59,
    },
    {
      titleUkr: 'Трейдинг Vs Опціони порівняння інструментів',
      linkUkr: 'tradingvsoptions',
      titleEn: 'Trading Vs Options comparison of instruments',
      titleRus: 'Трейдинг Vs Опционы сравнение инструментов',

      imgUkr: '/assets/img/content/tradingvsoptions44.png',
      groupsRus: ['Трейдинг для начинающих'],
      groupsEn: ['Trading for Beginners'],
      groupsUkr: ['Трейдинг для початківців'],
      id: 60,
    },
    {
      titleUkr: '10 порад трейдерам-початківцям',
      linkUkr: 'adviceforbeginners',
      titleEn: '10 tips for beginning traders',
      titleRus: '10 советов начинающим трейдерам',

      imgUkr: ' /assets/img/content/TipsForStarters.png',
      groupsRus: ['Трейдинг для начинающих'],
      groupsEn: ['Trading for Beginners'],
      groupsUkr: ['Трейдинг для початківців'],
      id: 61,
    },
    {
      titleUkr: 'Криптовалюта Tether (usdt)',
      linkUkr: 'cryptotether',
      titleEn: 'Cryptocurrency Tether (usdt)',
      titleRus: 'Криптовалюта Tether (usdt)',

      imgUkr: '/assets/img/content/cryptotether44.png',
      groupsRus: ['Криптовалюта'],
      groupsEn: ['Cryptocurrency'],
      groupsUkr: ['Криптовалюта'],
      id: 62,
    },
    {
      titleUkr: 'Основи ринку. Терміни',
      linkUkr: 'marketbasics',
      titleEn: 'Market Basics. Definitions',
      titleRus: 'Основы рынка. Термины',

      imgUkr: '/assets/img/content/osnovirinka44.png',
      groupsRus: ['Трейдинг для начинающих'],
      groupsEn: ['Trading for Beginners'],
      groupsUkr: ['Трейдинг для початківців'],
      id: 63,
    },
    {
      titleUkr: 'Знайомство з біржею',
      linkUkr: 'exchange',
      titleEn: 'Introduction to the exchange',
      titleRus: 'Знакомство с биржей',

      imgUkr: '/assets/img/content/znakomstvosbirgey44.png',
      groupsRus: ['Словарь трейдера'],
      groupsEn: ['Trader`s Dictionary'],
      groupsUkr: ['Словник трейдера'],
      id: 64,
    },
    {
      titleUkr: 'Біржовий та позабіржовий ринки',
      linkUkr: 'exchangemarket',
      titleEn: 'Exchange and over-the-counter markets',
      titleRus: 'Биржевой и внебиржевой рынки',

      imgUkr: '/assets/img/content/exchangemarkets44.png',
      groupsRus: ['Словарь трейдера'],
      groupsEn: ['Trader`s Dictionary'],
      groupsUkr: ['Словник трейдера'],
      id: 65,
    },
    {
      titleUkr: 'Деривативи та їх види',
      linkUkr: 'derivatives',
      titleEn: 'Derivatives and their types',
      titleRus: 'Деривативы и их виды',

      imgUkr: '/assets/img/content/derivativesNew4.png',
      groupsRus: ['Словарь трейдера'],
      groupsEn: ['Trader`s Dictionary'],
      groupsUkr: ['Словник трейдера'],
      id: 66,
    },
    {
      titleUkr: 'Алгоритмічні стейблкоіни',
      linkUkr: 'stablecoins',
      titleEn: 'Algorithmic stablecoins',
      titleRus: 'Алгоритмические стейблкоины',

      imgUkr: '/assets/img/content/stablecoins44.png',
      groupsRus: ['Криптовалюта'],
      groupsEn: ['Cryptocurrency'],
      groupsUkr: ['Криптовалюта'],
      id: 67,
    },
    {
      titleUkr: 'Ринок FOREX',
      linkUkr: 'forexmarket',
      titleEn: 'FOREX Market',
      titleRus: 'Рынок FOREX',

      imgUkr: '/assets/img/content/forexMarket44.png',
      groupsRus: ['Словарь трейдера'],
      groupsEn: ['Trader`s Dictionary'],
      groupsUkr: ['Словник трейдера'],
      id: 68,
    },
    {
      titleUkr: 'Валюти та їх котирування',
      linkUkr: 'currenciesandquotes',
      titleEn: 'Currencies and their quotes',
      titleRus: 'Валюты и их котировки',

      imgUkr: '/assets/img/content/currencies44.png',
      groupsRus: ['Словарь трейдера'],
      groupsEn: ['Trader`s Dictionary'],
      groupsUkr: ['Словник трейдера'],
      id: 69,
    },
    {
      titleUkr: 'Формування курсу валют',
      linkUkr: 'formationexchange',
      titleEn: 'Currency Rate Formation',
      titleRus: 'Формирование курса валют',

      imgUkr: '/assets/img/content/formationExchange44.png',
      groupsRus: ['Словарь трейдера'],
      groupsEn: ['Trader`s Dictionary'],
      groupsUkr: ['Словник трейдера'],
      id: 70,
    },
    {
      titleUkr: 'Позиція: поняття, види і типи',
      linkUkr: 'currencyposition',
      titleEn: 'Position: Concepts, Types, and Categories',
      titleRus: 'Позиция: понятия, виды и типы',

      imgUkr: '/assets/img/content/currencyPosition44.png',
      groupsRus: ['Словарь трейдера'],
      groupsEn: ['Trader`s Dictionary'],
      groupsUkr: ['Словник трейдера'],
      id: 71,
    },
    {
      titleUkr: 'Як почати торгувати на криптобіржі',
      linkUkr: 'cryptostart',
      titleEn: 'How to start trading on a crypto exchange',
      titleRus: 'Как начать торговать на криптобирже',

      imgUkr: '/assets/img/content/cryptostart44.png',
      groupsRus: ['Криптовалюта'],
      groupsEn: ['Cryptocurrency'],
      groupsUkr: ['Криптовалюта'],
      id: 72,
    },
    {
      titleUkr: 'Що таке халвінг та як він впливає на ринок криптовалют?',
      linkUkr: 'halving',
      titleEn:
        'What is halving and how does it affect the cryptocurrency market?',
      titleRus: 'Что такое халвинг и как он влияет на рынок криптовалют?',

      imgUkr: '/assets/img/content/halving44.png',
      groupsRus: ['Криптовалюта'],
      groupsEn: ['Cryptocurrency'],
      groupsUkr: ['Криптовалюта'],
      id: 73,
    },
    {
      titleUkr: 'Ризик зміни курсу',
      linkUkr: 'riskcurrencyexchange',
      titleEn: 'Currency Exchange Risk',
      titleRus: 'Риск изменения курса',

      imgUkr: '/assets/img/content/riskCurrencyExchange44.webp',
      groupsRus: ['Трейдинг для начинающих'],
      groupsEn: ['Trading for Beginners'],
      groupsUkr: ['Трейдинг для початківців'],
      id: 74,
    },
    {
      titleUkr: 'Ризик кредитного плеча на FOREX',
      linkUkr: 'forexleveragerisk',
      titleEn: 'Leverage Risk in FOREX',
      titleRus: 'Риск кредитного плеча на FOREX',

      imgUkr: '/assets/img/content/forexLeverageRisk44.png',
      groupsRus: ['Трейдинг для начинающих'],
      groupsEn: ['Trading for Beginners'],
      groupsUkr: ['Трейдинг для початківців'],
      id: 75,
    },
    {
      titleUkr: 'Основні центральні банки',
      linkUkr: 'majorbankfrs',
      titleEn: 'Major central banks',
      titleRus: 'Основные центральные банки',

      imgUkr: '/assets/img/content/majorBankFrs_JQ44.png',
      groupsRus: ['Словарь трейдера'],
      groupsEn: ['Trader`s Dictionary'],
      groupsUkr: ['Словник трейдера'],
      id: 76,
    },
    {
      titleUkr: 'Криптовалюта Ethereum – що це таке та як вона працює?',
      linkUkr: 'ethereum',
      titleEn: 'Ethereum cryptocurrency – what is it and how does it work?',
      titleRus: 'Криптовалюта Ethereum – что это такое и как она работает?',

      imgUkr: '/assets/img/content/ethereum44.png',
      groupsRus: ['Криптовалюта'],
      groupsEn: ['Cryptocurrency'],
      groupsUkr: ['Криптовалюта'],
      id: 77,
    },
    {
      titleUkr: 'Що таке Біткоїн (Bitcoin) і як це працює?',
      linkUkr: 'bitcoin',
      titleEn: 'What is Bitcoin and how does it work?',
      titleRus: 'Что такое Биткоин (Bitcoin) и как это работает?',

      imgUkr: '/assets/img/content/bitcoin44.png',
      groupsRus: ['Криптовалюта'],
      groupsEn: ['Cryptocurrency'],
      groupsUkr: ['Криптовалюта'],
      id: 78,
    },
    {
      titleUkr: 'Психологічні ризики FOREX',
      linkUkr: 'psychorisks',
      titleEn: 'Psychological Risks of FOREX Trading',
      titleRus: 'Психологические риски FOREX',

      imgUkr: '/assets/img/content/psychorisks44.png',
      groupsRus: ['Психология трейдинга'],
      groupsEn: ['Trading Psychology'],
      groupsUkr: ['Психологія трейдингу'],
      id: 79,
    },
    {
      titleUkr: 'Як торгувати на валютному ринку FOREX',
      linkUkr: 'howtotradeonforex',
      titleEn: 'How to Trade on the FOREX',
      titleRus: 'Как торговать на валютном рынке FOREX',

      imgUkr: '/assets/img/content/howtotradeonforex44.png',
      groupsRus: ['Психология трейдинга'],
      groupsEn: ['Trading Psychology'],
      groupsUkr: ['Психологія трейдингу'],
      id: 80,
    },
    {
      titleUkr: 'Аналіз попиту та пропозиції. Концепція Пітера Стеделмайєра',
      linkUkr: 'steidlmayeranalysis',
      titleEn: 'Analysis of supply and demand. Concept by Peter   Steidlmayer',
      titleRus: 'Анализ спроса и предложения. Концепция Питера Стеделмайера',

      imgUkr: '/assets/img/content/steidlmayeranalysis.jpg',
      groupsRus: ['Объемный анализ рынка'],
      groupsEn: ['Market Volume Analysis'],
      groupsUkr: ['Об`ємний аналіз ринку'],
      id: 81,
    },
    {
      titleUkr: 'Аналіз ринку FOREX',
      linkUkr: 'marketanalysisforex',
      titleEn: 'Analysis of the FOREX Market',
      titleRus: 'Анализ рынка FOREX',

      imgUkr: '/assets/img/content/marketanalysis44.png',
      groupsRus: ['Фундаментальный анализ'],
      groupsEn: ['Fundamental Analysis'],
      groupsUkr: ['Фундаментальний аналіз'],
      id: 82,
    },
    {
      titleUkr: 'Економічні фактори',
      linkUkr: 'econimicfactors',
      titleEn: 'Economic Factors',
      titleRus: 'Экономические факторы',

      imgUkr: '/assets/img/content/ecomomicfactors44.png',
      groupsRus: ['Фундаментальный анализ'],
      groupsEn: ['Fundamental Analysis'],
      groupsUkr: ['Фундаментальний аналіз'],
      id: 83,
    },
    {
      titleUkr: 'Світові фондові індекси',
      linkUkr: 'worldstockindicates',
      titleEn: 'World Stock Indices',
      titleRus: 'Мировые фондовые индексы',

      imgUkr: '/assets/img/content/worldstockindicates44.png',
      groupsRus: ['Фундаментальный анализ'],
      groupsEn: ['Fundamental Analysis'],
      groupsUkr: ['Фундаментальний аналіз'],
      id: 84,
    },
    {
      titleUkr: 'Рівні Фібоначчі у технічному аналізі',
      linkUkr: 'fibonaccilevels',
      titleEn: 'Fibonacci levels in technical analysis',
      titleRus: 'Уровни Фибоначчи в техническом анализе',

      imgUkr: '/assets/img/content/economicstate44.png',
      groupsRus: ['Технический анализ'],
      groupsEn: ['Technical Analysis'],
      groupsUkr: ['Технічний аналіз'],
      id: 85,
    },
    {
      titleUkr: 'Основні показники економічного зростання',
      linkUkr: 'keyeconomicgrowth',
      titleEn: 'Key Economic Growth Indicators',
      titleRus: 'Основные показатели экономического роста',

      imgUkr: '/assets/img/content/keyeconomicgrowth44.png',
      groupsRus: ['Фундаментальный анализ'],
      groupsEn: ['Fundamental Analysis'],
      groupsUkr: ['Фундаментальний аналіз'],
      id: 86,
    },
    {
      titleUkr: 'Технічний аналіз ринку',
      linkUkr: 'technicalanalysis',
      titleEn: 'Technical Market Analysis',
      titleRus: 'Технический анализ рынка',

      imgUkr: '/assets/img/content/technicalanalysis44.png',
      groupsRus: ['Технический анализ'],
      groupsEn: ['Technical Analysis'],
      groupsUkr: ['Технічний аналіз'],
      id: 87,
    },
    {
      titleUkr: 'Технічний аналіз ринку. Графіки',
      linkUkr: 'technicalmarketcharts',
      titleEn: 'Technical Market Analysis. Charts',
      titleRus: 'Технический анализ рынка. Графики',

      imgUkr: '/assets/img/content/technicalmarketcharts44.png',
      groupsRus: ['Технический анализ'],
      groupsEn: ['Technical Analysis'],
      groupsUkr: ['Технічний аналіз'],
      id: 88,
    },
    {
      titleUkr: 'Цінові фігури в технічному аналізі',
      linkUkr: 'keypricepattern',
      titleEn: 'Price Patterns in Technical Analysis',
      titleRus: 'Ценовые фигуры в техническом анализе',

      imgUkr: '/assets/img/content/keypricepattern44.png',
      groupsRus: ['Технический анализ'],
      groupsEn: ['Technical Analysis'],
      groupsUkr: ['Технічний аналіз'],
      id: 89,
    },
    {
      titleUkr:
        'Чому 90% трейдерів втрачають гроші? Пастки, створені Смарт Мані',
      linkUkr: 'smartmonettraps',
      titleEn: 'Why do 90% of traders lose money? Traps created by Smart Money',
      titleRus:
        'Почему 90% трейдеров теряют деньги? Ловушки, созданные Смарт Мани',

      imgUkr: '/assets/img/content/smartmoneytraps44.webp',
      groupsRus: ['Концепция Смарт Мани'],
      groupsEn: ['Smart Money Concept'],
      groupsUkr: ['Концепція Смарт Мані'],
      id: 90,
    },
    {
      titleUkr:
        'Imbalance та FVG (Fair Value Gaps): Як знаходити сильні зони ліквідності?',
      linkUkr: 'imbalanceandfvg',
      titleEn:
        'Imbalance and FVG (Fair Value Gaps): How to find strong liquidity zones?',
      titleRus:
        'Imbalance и FVG (Fair Value Gaps): Как находить сильные зоны ликвидности?',

      imgUkr: '/assets/img/content/imbalanceandfvg44.png',
      groupsRus: ['Концепция Смарт Мани'],
      groupsEn: ['Smart Money Concept'],
      groupsUkr: ['Концепція Смарт Мані'],
      id: 91,
    },
    {
      titleUkr: 'Ринковий ордер',
      linkUkr: 'marketorder',
      titleEn: 'Market Order',
      titleRus: 'Рыночный ордер',

      imgUkr: '/assets/img/content/marketorder44.png',
      groupsRus: ['Объемный анализ рынка'],
      groupsEn: ['Market Volume Analysis'],
      groupsUkr: ['Об`ємний аналіз ринку'],
      id: 92,
    },
    {
      titleUkr: 'Стоп-ордер',
      linkUkr: 'stoporder',
      titleEn: 'Stop Order',
      titleRus: 'Стоп-ордер',

      imgUkr: '/assets/img/content/stoporder44.png',
      groupsRus: ['Объемный анализ рынка'],
      groupsEn: ['Market Volume Analysis'],
      groupsUkr: ['Об`ємний аналіз ринку'],
      id: 93,
    },
    {
      titleUkr: 'Реквоти у трейдингу',
      linkUkr: 'requotes',
      titleEn: 'Requotes in trading',
      titleRus: 'Реквоты в трейдинге',

      imgUkr: '/assets/img/content/requotes44.png',
      groupsRus: ['Трейдинг для начинающих'],
      groupsEn: ['Trading for Beginners'],
      groupsUkr: ['Трейдинг для початківців'],
      id: 94,
    },
    {
      titleUkr: 'Стоп-лімітний ордер',
      linkUkr: 'stoplimitorder',
      titleEn: 'Stop-Limit Order',
      titleRus: 'Стоп-лимитный ордер',

      imgUkr: '/assets/img/content/stoplimitorder44.png',
      groupsRus: ['Объемный анализ рынка'],
      groupsEn: ['Market Volume Analysis'],
      groupsUkr: ['Об`ємний аналіз ринку'],
      id: 95,
    },
    {
      titleUkr: 'Торгова система: види та оптимізація',
      linkUkr: 'tradingsystem',
      titleEn: 'Trading system: types and optimization',
      titleRus: 'Торговая система: виды и оптимизация',

      imgUkr: '/assets/img/content/tradingsystem44.png',
      groupsRus: ['Трейдинг для начинающих'],
      groupsEn: ['Trading for Beginners'],
      groupsUkr: ['Трейдинг для початківців'],
      id: 96,
    },
    {
      titleUkr:
        'Як Smart Money використовують помилкові пробої для збирання ліквідності?',
      linkUkr: 'falsebreakouts',
      titleEn: 'How does Smart Money use false breakouts to collect liquidity?',
      titleRus:
        'Как Smart Money используют ложные пробои для сбора ликвидности?',

      imgUkr: '/assets/img/content/falsebreakouts44.webp',
      groupsRus: ['Концепция Смарт Мани'],
      groupsEn: ['Smart Money Concept'],
      groupsUkr: ['Концепція Смарт Мані'],
      id: 97,
    },
    {
      titleUkr:
        'Що таке "Stop Hunting" та як Smart Money вибивають стопи трейдерів?',
      linkUkr: 'stophunting',
      titleEn:
        'What is "Stop Hunting" and how does Smart Money knock out traders` stops?',
      titleRus:
        'Что такое "Stop Hunting" и как Smart Money выбивают стопы трейдеров?',

      imgUkr: '/assets/img/content/stophunting44.webp',
      groupsRus: ['Концепция Смарт Мани'],
      groupsEn: ['Smart Money Concept'],
      groupsUkr: ['Концепція Смарт Мані'],
      id: 98,
    },
    {
      titleUkr: 'Специфіка управління капіталом у трейдингу',
      linkUkr: 'capitalmanagement',
      titleEn: 'Specifics of Capital Management in Trading',
      titleRus: 'Специфика управления капиталом в трейдинге',

      imgUkr: '/assets/img/content/capitalmanagement44.png',
      groupsRus: ['Трейдинг для начинающих'],
      groupsEn: ['Trading for Beginners'],
      groupsUkr: ['Трейдинг для початківців'],
      id: 99,
    },
    {
      titleUkr: 'Співвідношення прибутку та збитку',
      linkUkr: 'profitandlossratio',
      titleEn: 'Profit and Loss Ratio',
      titleRus: 'Соотношение прибыли и убытка',

      imgUkr: '/assets/img/content/profitandlossratio44.webp',
      groupsRus: ['Трейдинг для начинающих'],
      groupsEn: ['Trading for Beginners'],
      groupsUkr: ['Трейдинг для початківців'],
      id: 100,
    },
    {
      titleUkr: 'Помилки трейдерів початківців',
      linkUkr: 'beginnermistakes',
      titleEn: 'Beginner Trader Mistakes',
      titleRus: 'Ошибки начинающих трейдеров',

      imgUkr: '/assets/img/content/beginnermistakes44.webp',
      groupsRus: ['Трейдинг для начинающих'],
      groupsEn: ['Trading for Beginners'],
      groupsUkr: ['Трейдинг для початківців'],
      id: 101,
    },
    {
      titleUkr: 'Торговий план трейдера',
      linkUkr: 'tradingplan',
      titleEn: 'Trader`s Trading Plan',
      titleRus: 'Торговый план трейдера',

      imgUkr: '/assets/img/content/tradingplan44.png',
      groupsRus: ['Трейдинг для начинающих'],
      groupsEn: ['Trading for Beginners'],
      groupsUkr: ['Трейдинг для початківців'],
      id: 102,
    },
    {
      titleUkr: 'Таймфрейми у трейдингу',
      linkUkr: 'timeframes',
      titleEn: 'Timeframes in trading',
      titleRus: 'Таймфреймы в трейдинге',

      imgUkr: '/assets/img/content/timeframes44.webp',
      groupsRus: ['Трейдинг для начинающих'],
      groupsEn: ['Trading for Beginners'],
      groupsUkr: ['Трейдинг для початківців'],
      id: 103,
    },

    {
      titleUkr:
        'Чим відрізняється аналіз обсягів на ринку акцій та на ринку ф`ючерсів',
      linkUkr: 'volumeandfuturesmarket',
      titleEn:
        'What is the difference between volume analysis in the stock market and in the futures market?',
      titleRus:
        'Чем отличается анализ объемов на рынке акций и на рынке фьючерсов',

      imgUkr: '/assets/img/content/volumeandfuturesmarket44.jpg',
      groupsRus: ['Объемный анализ рынка'],
      groupsEn: ['Market Volume Analysis'],
      groupsUkr: ['Об`ємний аналіз ринку'],
      id: 140,
    },
    {
      titleUkr: 'Концепція Річарда Вайкоффа у розумінні обсягів',
      linkUkr: 'wyckoffsvolumeconcept',
      titleEn: 'Richard Wyckoff`s concept of understanding volumes',
      titleRus: 'Концепция Ричарда Вайкоффа в понимании объемов ',

      imgUkr: '/assets/img/content/wyckoffsvolumeconcept44.png',
      groupsRus: ['Объемный анализ рынка'],
      groupsEn: ['Market Volume Analysis'],
      groupsUkr: ['Об`ємний аналіз ринку'],
      id: 141,
    },

    {
      titleUkr: 'Як трейдеру торгувати на новинах',
      linkUkr: 'newstrading',
      titleEn: 'How a trader should trade on the news',
      titleRus: 'Как трейдеру торговать на новостях',

      imgUkr: '/assets/img/content/newstrading44.png',
      groupsRus: ['Фундаментальный анализ'],
      groupsEn: ['Fundamental Analysis'],
      groupsUkr: ['Фундаментальний аналіз'],
      id: 142,
    },
    {
      titleUkr: 'Що таке економічний календар',
      linkUkr: 'economiccalendar',
      titleEn: 'What is an economic calendar?',
      titleRus: 'Что такое экономический календарь',

      imgUkr: '/assets/img/content/economiccalendar44.png',
      groupsRus: ['Фундаментальный анализ'],
      groupsEn: ['Fundamental Analysis'],
      groupsUkr: ['Фундаментальний аналіз'],
      id: 143,
    },
    {
      titleUkr: 'Макроекономічні показники фундаментального аналізу',
      linkUkr: 'macroeconomicindicators',
      titleEn: 'Macroeconomic indicators of fundamental analysis',
      titleRus: 'Макроэкономические показатели фундаментального анализа',

      imgUkr: '/assets/img/content/macroeconomicindicators44.webp',
      groupsRus: ['Фундаментальный анализ'],
      groupsEn: ['Fundamental Analysis'],
      groupsUkr: ['Фундаментальний аналіз'],
      id: 144,
    },
    {
      titleUkr: 'Фундаментальний аналіз світових валютних ринків',
      linkUkr: 'globalfundamentalanalysis',
      titleEn: 'Fundamental analysis of global currency markets',
      titleRus: 'Фундаментальный анализ мировых валютных рынков',

      imgUkr: '/assets/img/content/globalfundamentalanalysis44.webp',
      groupsRus: ['Фундаментальный анализ'],
      groupsEn: ['Fundamental Analysis'],
      groupsUkr: ['Фундаментальний аналіз'],
      id: 145,
    },
    {
      titleUkr: 'Трейдинг – азартна гра чи бізнес? Два психологічних підходи',
      linkUkr: 'gamblingorbusiness',
      titleEn: 'Trading – Gambling or Business? Two Psychological Approaches',
      titleRus:
        'Трейдинг – азартная игра или бизнес? Два психологических подхода',

      imgUkr: '/assets/img/content/gamblingorbusiness44.webp',
      groupsRus: ['Психология трейдинга'],
      groupsEn: ['Trading Psychology'],
      groupsUkr: ['Психологія трейдингу'],
      id: 146,
    },
    {
      titleUkr: 'Психологія торгівлі Вільяма Ганна',
      linkUkr: 'williamgannpsychology',
      titleEn: 'Trading Psychology by William Gann',
      titleRus: 'Психология торговли Уильяма Ганна',

      imgUkr: '/assets/img/content/williamgannpsychology44.webp',
      groupsRus: ['Психология трейдинга'],
      groupsEn: ['Trading Psychology'],
      groupsUkr: ['Психологія трейдингу'],
      id: 147,
    },
    {
      titleUkr: 'Як емоції впливають на угоди?',
      linkUkr: 'emotionsaffect',
      titleEn: 'Trading Psychology: How Do Emotions Affect Trades?',
      titleRus: 'Психология трейдинга: Как эмоции влияют на сделки?',

      imgUkr: '/assets/img/content/emotionsaffect44.webp',
      groupsRus: ['Психология трейдинга'],
      groupsEn: ['Trading Psychology'],
      groupsUkr: ['Психологія трейдингу'],
      id: 148,
    },
    {
      titleUkr: 'Як уникнути "FOMO" - страху втраченого прибутку?',
      linkUkr: 'fomo',
      titleEn: 'How to avoid "FOMO" - fear of missing out?',
      titleRus: 'Как избежать "FOMO" – страха упущенной прибыли?',

      imgUkr: '/assets/img/content/fomo44.png',
      groupsRus: ['Психология трейдинга'],
      groupsEn: ['Trading Psychology'],
      groupsUkr: ['Психологія трейдингу'],
      id: 149,
    },
    {
      titleUkr: 'Чому новачки втрачають депозити?',
      linkUkr: 'psychologyofaveraging',
      titleEn: 'Psychology of "Averaging": Why Do Newbies Lose Deposits?',
      titleRus: 'Психология "усреднения": Почему новички теряют депозиты?',

      imgUkr: '/assets/img/content/psychologyofaveraging44.webp',
      groupsRus: ['Психология трейдинга'],
      groupsEn: ['Trading Psychology'],
      groupsUkr: ['Психологія трейдингу'],
      id: 150,
    },
    {
      titleUkr: 'Фігура "Голова і плечі"',
      linkUkr: 'headandshoulders',
      titleEn: 'Head and Shoulders Figure',
      titleRus: 'Фигура "Голова и плечи"',

      imgUkr: '/assets/img/content/headandshoulders44.png',
      groupsRus: ['Технический анализ'],
      groupsEn: ['Technical Analysis'],
      groupsUkr: ['Технічний аналіз'],
      id: 151,
    },
    {
      titleUkr: 'Фігура трикутник',
      linkUkr: 'trianglefigure',
      titleEn: 'The figure is a triangle',
      titleRus: 'Фигура треугольник',

      imgUkr: '/assets/img/content/trianglefigure44.png',
      groupsRus: ['Технический анализ'],
      groupsEn: ['Technical Analysis'],
      groupsUkr: ['Технічний аналіз'],
      id: 152,
    },
    {
      titleUkr: 'Прапор та вимпел: Як правильно торгувати після імпульсу?',
      linkUkr: 'flagandpennant',
      titleEn: 'Flag and Pennant: How to Trade Correctly After an Impulse?',
      titleRus: 'Флаг и вымпел: Как правильно торговать после импульса?',

      imgUkr: '/assets/img/content/flagandpennant44.png',
      groupsRus: ['Технический анализ'],
      groupsEn: ['Technical Analysis'],
      groupsUkr: ['Технічний аналіз'],
      id: 153,
    },
    {
      titleUkr: 'Фігура "Чашка з ручкою": Як торгувати сильні пробої?',
      linkUkr: 'cupandhandle',
      titleEn: 'Cup and Handle Pattern: How to Trade Strong Breakouts?',
      titleRus: 'Фигура "Чашка с ручкой": Как торговать сильные пробои?',

      imgUkr: '/assets/img/content/cupandhandle44.png',
      groupsRus: ['Технический анализ'],
      groupsEn: ['Technical Analysis'],
      groupsUkr: ['Технічний аналіз'],
      id: 154,
    },

    {
      titleUkr:
        'Фігура "Поглинання" (Bullish & Bearish Engulfing): Як ловити розворот?',
      linkUkr: 'engulfing',
      titleEn: 'Bullish & Bearish Engulfing Pattern: How to Catch a Reversal?',
      titleRus:
        'Фигура "Поглощение" (Bullish & Bearish Engulfing): Как ловить разворот?',

      imgUkr: '/assets/img/content/engulfing44.png',
      groupsRus: ['Технический анализ'],
      groupsEn: ['Technical Analysis'],
      groupsUkr: ['Технічний аналіз'],
      id: 155,
    },

    {
      titleUkr: 'Подвійна вершина та Подвійне дно',
      linkUkr: 'doubletopandbottom',
      titleEn: 'Double Top and Double Bottom',
      titleRus: 'Двойная вершина и Двойное дно',

      imgUkr: '/assets/img/content/doubletopandbottom44.png',
      groupsRus: ['Технический анализ'],
      groupsEn: ['Technical Analysis'],
      groupsUkr: ['Технічний аналіз'],
      id: 156,
    },
    {
      titleUkr: 'Паттерн 1-2-3',
      linkUkr: 'pattern-1-2-3',
      titleEn: 'Pattern 1-2-3',
      titleRus: 'Паттерн 1-2-3',

      imgUkr: '/assets/img/content/pattern-1-2-344.png',
      groupsRus: ['Технический анализ'],
      groupsEn: ['Technical Analysis'],
      groupsUkr: ['Технічний аналіз'],
      id: 157,
    },
  ];
}
