import { Injectable } from '@angular/core';
export interface artickle {
  titleUkr: string;
  titleRus: string;
  titleEn: string;
  descrUkr: string;
  descrRus: string;
  descrEn: string;
  realTitleRus: string;
  realTitleUkr: string;
  realTitleEn: string;
  linkUkr: string;
  imgUkr: string;
  groupsUkr: string[];
  groupsRus: string[];
  groupsEng: string[];
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
  groupsEng = [
    'Market Volume Analysis',
    'Smart Money Concept',
    'Trading for Beginners',
    'Trading Psychology',
    'Trader`s Dictionary',
    'Technical Analysis',
    'Fundamental Analysis',
    'Cryptocurrency',
    'Trade Examples',
  ];

  selectedGroups: string[] = [];
  getArticleByLink(link: string) {
    return (
      this.ukrArtickles.find((article) => article.linkUkr === link) || null
    );
  }
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
      article.groupsEng.some((group) => this.selectedGroups.includes(group))
    );
  }
  getUkrainianGroups() {
    return this.groups;
  }
  getRussianGroups() {
    return this.groupsRus;
  }
  getEnglishGroups() {
    return this.groupsEng;
  }
  getRandomUkArticles() {
    const shuffled = [...this.ukrArtickles].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, 4);
  }
  getRandomUkArticlesFive() {
    const shuffled = [...this.ukrArtickles].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, 5);
  }

  ukrArtickles: artickle[] = [
    {
      titleUkr: 'Чому на обвалі біткоїна вибиває стопи',
      linkUkr: 'bitcoin-crash-stops',
      titleRus: 'Почему на обвале биткоина выбивает стопы',
      titleEn: 'Why a Bitcoin Crash Hunts Your Stops',
      descrUkr:
        'Каскадні ліквідації, маржин-кол і зняття ліквідності на обвалі біткоїна: чому вибиває стопи і зливаються депозити, кого вилітає першим і як захистити рахунок.',
      descrEn:
        'Cascading liquidations, margin calls and liquidity grabs in a bitcoin crash: why your stops get hit and deposits blow up, who gets wiped first, and how to protect your account.',
      descrRus:
        'Каскадные ликвидации, маржин-колл и снятие ликвидности на обвале биткоина: почему выбивает стопы и сливаются депозиты, кого вылетает первым и как защитить счёт.',
      realTitleRus: 'Почему на обвале биткоина выбивает стопы | Arapov.trade',
      realTitleUkr: 'Чому на обвалі біткоїна вибиває стопи | Arapov.trade',
      realTitleEn: 'Why a Bitcoin Crash Hunts Your Stops | Arapov.trade',
      imgUkr: '/assets/img/content/bitcoin-crash-stops.png',
      groupsRus: ['Криптовалюта'],
      groupsUkr: ['Криптовалюта'],
      groupsEng: ['Cryptocurrency'],
      id: 448,
    },
    {
      titleUkr: 'Як стати трейдером самостійно?',
      linkUkr: 'selfstudying',
      titleRus: 'Самостоятельное обучение трейдингу',
      titleEn: 'Self-Study Guide for Trading',
      descrUkr:
        'Самостійне навчання трейдингу від Ігоря Арапова: покроковий курс з нуля, реальні стратегії та поради для впевненого старту у трейдингу.',
      descrEn:
        'Self-study guide for trading by Igor Arapov: step-by-step course from scratch, real strategies and tips for a confident start in trading.',
      descrRus:
        'Самостоятельное обучение трейдингу от Игоря Арапова: пошаговый курс с нуля, реальные стратегии и советы для уверенного старта в трейдинге.',
      realTitleRus: 'Самостоятельное обучение трейдингу | Игорь Арапов',
      realTitleUkr: 'Як стати трейдером самостійно? | Ігор Арапов',
      realTitleEn: 'Self-Study Guide for Trading | Igor Arapov',
      imgUkr: '/assets/img/content/selfstudying44.webp',
      groupsRus: ['Трейдинг для начинающих'],
      groupsUkr: ['Трейдинг для початківців'],
      groupsEng: ['Trading for Beginners'],
      id: 48,
    },
    {
      linkUkr: 'copytrading',
      titleRus: 'Copy trading: что такое копитрейдинг и как работает?',
      titleUkr: 'Copy trading: що таке копітрейдинг і як він працює?',
      titleEn: 'Copy Trading: What is Copy-Trading and How Does It Work?',
      descrRus:
        'Что такое копитрейдинг криптовалют и как зарабатывать, копируя сделки успешных трейдеров на бирже | Игорь Арапов',
      descrUkr:
        'Що таке копітрейдинг криптовалют і як заробляти, копіюючи угоди успішних трейдерів на біржі | Ігор Арапов',
      descrEn:
        'What is cryptocurrency copy trading and how to earn by copying the trades of successful traders on the exchange | Igor Arapov',
      realTitleRus:
        'Copy trading: что такое копитрейдинг и как работает? | Игорь Арапов',
      realTitleUkr:
        'Copy trading: що таке копітрейдинг і як він працює? | Ігор Арапов',
      realTitleEn:
        'Copy Trading: What is Copy-Trading and How Does It Work? | Igor Arapov',
      imgUkr: '/assets/img/content/copytrading_two.png',
      groupsRus: ['Трейдинг для начинающих'],
      groupsUkr: ['Трейдинг для початківців'],
      groupsEng: ['Trading for Beginners'],
      id: 133,
    },

    {
      titleRus: 'Что такое объем торгов на бирже?',
      titleUkr: 'Обсяг торгів на біржі: що це і як його аналізувати?',
      titleEn: 'What is Trading Volume on the Exchange?',
      linkUkr: 'peakvolumelevels',
      descrRus:
        'Узнайте, как анализировать объем торгов в трейдинге! Советы по поиску зон интереса, уровней поддержки и сопротивления для трейдинга с Arapov.trade',
      descrUkr:
        'Дізнайтеся, як аналізувати обсяг торгів у трейдингу! Поради щодо пошуку зон інтересу, рівнів підтримки та опору для трейдингу з Arapov.trade',
      descrEn:
        'Learn how to analyze trading volume in trading! Tips for finding areas of interest, support and resistance levels for trading with Arapov.trade',
      realTitleRus: 'Что такое объем торгов на бирже | Игорь Арапов',
      realTitleEn: 'What is Trading Volume on the Exchange | Arapov.trade',
      realTitleUkr: 'Обсяг торгів на біржі: що це і як його аналізувати?',
      imgUkr: '/assets/img/content/peakvolumelevels.webp',
      groupsRus: ['Объемный анализ рынка'],
      groupsUkr: ['Об`ємний аналіз ринку'],
      groupsEng: ['Market Volume Analysis'],
      id: 111,
    },
    {
      linkUkr: 'goldtrading',
      titleRus: 'Торговля золотом XAUUSD',
      titleUkr: 'Торгівля золотом XAUUSD',
      titleEn: 'Gold Trading XAUUSD',
      descrRus:
        'Торговля золотом XAUUSD: полное руководство. Фундаментальные факторы, технический анализ, стратегии и особенности трейдинга драгоценным металлом.',
      descrUkr:
        'Торгівля золотом XAUUSD: фундаментальні фактори, технічний аналіз, стратегії та управління ризиками для трейдерів дорогоцінних металів.',
      descrEn:
        'Gold XAUUSD trading guide: fundamental drivers, technical analysis strategies, risk management and market psychology for precious metals traders.',
      realTitleRus: 'Торговля золотом XAUUSD | Полное руководство трейдера',
      realTitleUkr: 'Торгівля золотом XAUUSD | Повний посібник трейдера',
      realTitleEn: 'Gold Trading XAUUSD | Complete Trader`s Guide',
      imgUkr: '/assets/img/content/goldtrading1.jpg',
      groupsRus: ['Фундаментальный анализ'],
      groupsUkr: ['Фундаментальний аналіз'],
      groupsEng: ['Fundamental Analysis'],
      id: 163,
    },
    {
      linkUkr: 'oiltrading',
      titleRus: 'Торговля нефтью',
      titleUkr: 'Торгівля нафтою',
      titleEn: 'Oil Trading Guide',
      descrRus:
        'Торговля нефтью: полное руководство. WTI, Brent, фьючерсы, фундаментальный и технический анализ, стратегии трейдинга нефтяными инструментами.',
      descrUkr:
        'Торгівля нафтою: аналіз WTI та Brent, фундаментальні драйвери, технічні стратегії та управління ризиками для енергетичних трейдерів.',
      descrEn:
        'Crude oil trading guide: WTI and Brent analysis, fundamental drivers, technical strategies, and risk management for energy traders.',
      realTitleRus: 'Торговля нефтью | Полное руководство трейдера',
      realTitleUkr: 'Торгівля нафтою | Аналіз WTI та Brent',
      realTitleEn: 'Oil Trading Guide | WTI and Brent Analysis',
      imgUkr: '/assets/img/content/oiltrading1.jpg',
      groupsRus: ['Фундаментальный анализ'],
      groupsUkr: ['Фундаментальний аналіз'],
      groupsEng: ['Fundamental Analysis'],
      id: 164,
    },
    {
      linkUkr: 'rsiindicator',
      titleRus: 'Индикатор RSI',
      titleUkr: 'Індикатор RSI',
      titleEn: 'RSI Indicator',
      descrRus:
        'Индикатор RSI (Relative Strength Index): полное руководство по использованию в трейдинге. Настройки, стратегии, сигналы перекупленности и перепроданности.',
      descrUkr:
        'Індикатор RSI (Relative Strength Index): повний посібник з використання у трейдингу. Налаштування, стратегії, сигнали перекупленості та перепроданості.',
      descrEn:
        'RSI Indicator (Relative Strength Index): complete trading guide. Settings, strategies, overbought and oversold signals, divergence patterns explained.',
      realTitleRus:
        'Индикатор RSI | Полное руководство по индексу относительной силы',
      realTitleUkr: 'Індикатор RSI | Повний посібник з індексу відносної сили',
      realTitleEn: 'RSI Indicator | Complete Guide to Relative Strength Index',
      imgUkr: '/assets/img/content/rsiindex1.png',
      groupsRus: ['Технический анализ'],
      groupsUkr: ['Технічний аналіз'],
      groupsEng: ['Technical Analysis'],
      id: 165,
    },
    {
      linkUkr: 'stochastic',
      titleRus: 'Стохастический осциллятор',
      titleUkr: 'Стохастичний осцилятор',
      titleEn: 'Stochastic Oscillator Guide',
      descrRus:
        'Стохастический осциллятор: полное руководство. Настройки, сигналы, стратегии торговли, дивергенции и комбинации с другими индикаторами.',
      descrUkr:
        'Стохастичний осцилятор: налаштування індикатора, сигнали перекупленості/перепроданості, дивергенція та практичні стратегії.',
      descrEn:
        'Stochastic Oscillator trading guide: indicator settings, overbought/oversold signals, divergence trading and practical strategies.',
      realTitleRus: 'Стохастический осциллятор | Полное руководство',
      realTitleUkr: 'Стохастичний осцилятор | Посібник з торгівлі',
      realTitleEn: 'Stochastic Oscillator Guide | Trading Strategies',
      imgUkr: '/assets/img/content/stochastic1.jpg',
      groupsRus: ['Технический анализ'],
      groupsUkr: ['Технічний аналіз'],
      groupsEng: ['Technical Analysis'],
      id: 166,
    },
    {
      linkUkr: 'macdindicator',
      titleRus: 'Индикатор MACD',
      titleUkr: 'Індикатор MACD',
      titleEn: 'MACD Indicator',
      descrRus:
        'Индикатор MACD: полное руководство по торговле. Настройки, сигналы, дивергенции, стратегии использования гистограммы и сигнальной линии.',
      descrUkr:
        'Індикатор MACD: повний посібник з торгівлі. Налаштування, сигнали, дивергенції, стратегії використання гістограми та сигнальної лінії.',
      descrEn:
        'MACD Indicator: complete trading guide. Settings, signals, divergences, histogram analysis and trading strategies explained.',
      realTitleRus: 'Индикатор MACD | Полное руководство по торговле',
      realTitleUkr: 'Індикатор MACD Повний посібник з торгівлі',
      realTitleEn: 'MACD Indicator | Complete Trading Guide',
      imgUkr: '/assets/img/content/macdindicator.png',
      groupsRus: ['Технический анализ'],
      groupsUkr: ['Технічний аналіз'],
      groupsEng: ['Technical Analysis'],
      id: 167,
    },
    {
      linkUkr: 'sp500trading',
      titleRus: 'Торговля S&P 500',
      titleUkr: 'Торгівля S&P 500',
      titleEn: 'S&P 500 Trading Guide',
      descrRus:
        'Торговля индексом S&P 500: полное руководство. Фундаментальный анализ, технические стратегии, ETF и фьючерсы.',
      descrUkr:
        'Торгівля S&P 500: фундаментальний аналіз індексу, технічні стратегії та управління ризиками для трейдерів фондових індексів.',
      descrEn:
        'S&P 500 trading guide: index fundamentals, technical analysis, trading strategies and risk management for equity index traders.',
      realTitleRus: 'Торговля S&P 500 | Полное руководство',
      realTitleUkr: 'Торгівля S&P 500 | Аналіз індексу та стратегії',
      realTitleEn: 'S&P 500 Trading Guide | Index Analysis & Strategies',
      imgUkr: '/assets/img/content/sp500trading1.jpg',
      groupsRus: ['Фундаментальный анализ'],
      groupsUkr: ['Фундаментальний аналіз'],
      groupsEng: ['Fundamental Analysis'],
      id: 168,
    },
    {
      linkUkr: 'bollingerbands',
      titleRus: 'Полосы Боллинджера',
      titleUkr: 'Смуги Боллінджера',
      titleEn: 'Bollinger Bands',
      descrRus:
        'Полосы Боллинджера: полное руководство по индикатору. Настройки, стратегии торговли, сжатие и расширение полос, пробои и отскоки.',
      descrUkr:
        'Смуги Боллінджера: повний посібник з індикатора. Налаштування, стратегії торгівлі, стиснення та розширення смуг, пробої та відскоки.',
      descrEn:
        'Bollinger Bands: complete trading guide. Settings, strategies, squeeze and expansion, breakouts and bounces explained.',
      realTitleRus: 'Полосы Боллинджера | Полное руководство по индикатору',
      realTitleUkr: 'Смуги Боллінджера | Повний посібник з індикатора',
      realTitleEn: 'Bollinger Bands | Complete Trading Guide',
      imgUkr: '/assets/img/content/bollingerbands1.jpg',
      groupsRus: ['Технический анализ'],
      groupsUkr: ['Технічний аналіз'],
      groupsEng: ['Technical Analysis'],
      id: 170,
    },
    {
      linkUkr: 'ichimoku',
      titleRus: 'Индикатор Ишимоку',
      titleUkr: 'Індикатор Ішимоку',
      titleEn: 'Ichimoku Cloud Indicator',
      descrRus:
        'Индикатор Ишимоку (Ichimoku Kinko Hyo): полное руководство. Облако Кумо, линии Tenkan, Kijun, Chikou. Стратегии и сигналы.',
      descrUkr:
        'Індикатор Ішимоку: аналіз хмари Кумо, визначення тренду, торгові сигнали та практичні стратегії технічного аналізу.',
      descrEn:
        'Ichimoku Kinko Hyo indicator guide: Kumo cloud analysis, trend identification, trading signals, and practical strategies for technical traders.',
      realTitleRus: 'Индикатор Ишимоку | Полное руководство по облаку',
      realTitleUkr: 'Індикатор Ішимоку | Повний посібник з хмари',
      realTitleEn: 'Ichimoku Cloud Indicator | Complete Trading Guide',
      imgUkr: '/assets/img/content/ichimoku1.png',
      groupsRus: ['Технический анализ'],
      groupsUkr: ['Технічний аналіз'],
      groupsEng: ['Technical Analysis'],
      id: 171,
    },
    {
      linkUkr: 'solana',
      titleRus: 'Торговля Solana (SOL)',
      titleUkr: 'Торгівля Solana (SOL)',
      titleEn: 'Solana Trading Guide',
      descrRus:
        'Торговля Solana (SOL): полное руководство. Технология, фундаментальный анализ, технические стратегии, DeFi экосистема.',
      descrUkr:
        'Торгівля Solana SOL: технологія блокчейну, екосистема DeFi, торгові стратегії та управління ризиками для криптотрейдерів.',
      descrEn:
        'Solana SOL trading guide: blockchain technology, DeFi ecosystem, trading strategies and risk management for cryptocurrency traders.',
      realTitleRus: 'Торговля Solana (SOL) | Полное руководство',
      realTitleUkr: 'Торгівля Solana | Аналіз SOL та стратегії',
      realTitleEn: 'Solana Trading Guide | SOL Analysis & Strategies',
      imgUkr: '/assets/img/content/sol1.jpg',
      groupsRus: ['Криптовалюта'],
      groupsUkr: ['Криптовалюта'],
      groupsEng: ['Cryptocurrency'],
      id: 172,
    },
    {
      linkUkr: 'xrp',
      titleRus: 'Торговля XRP (Ripple)',
      titleUkr: 'Торгівля XRP (Ripple)',
      titleEn: 'XRP Trading Guide',
      descrRus:
        'Торговля XRP (Ripple): полное руководство. Технология, судебное дело SEC, фундаментальный анализ, стратегии трейдинга.',
      descrUkr:
        'Торгівля XRP: аналіз ринку Ripple, технічні стратегії, фундаментальні фактори та управління ризиками для трейдерів криптовалют.',
      descrEn:
        'Complete XRP trading guide: RippleNet technology, SEC lawsuit impact, trading strategies and risk management for cryptocurrency traders.',
      realTitleRus: 'Торговля XRP (Ripple) | Полное руководство',
      realTitleUkr: 'Торгівля XRP | Аналіз ринку Ripple та стратегії',
      realTitleEn: 'XRP Trading Guide | RippleNet Technology & Market Analysis',
      imgUkr: '/assets/img/content/XRP2.jpg',
      groupsRus: ['Криптовалюта'],
      groupsUkr: ['Криптовалюта'],
      groupsEng: ['Cryptocurrency'],
      id: 173,
    },
    {
      linkUkr: 'vwap',
      titleRus: 'VWAP индикатор',
      titleUkr: 'Індикатор VWAP',
      titleEn: 'VWAP Indicator',
      descrRus:
        'VWAP индикатор: полное руководство. Средневзвешенная цена по объёму, стратегии внутридневной торговли.',
      descrUkr:
        'Індикатор VWAP: середньозважена ціна за обсягом, торгові стратегії, інституційне застосування.',
      descrEn:
        'VWAP indicator trading guide: volume weighted average price calculation, trading strategies, institutional applications.',
      realTitleRus: 'VWAP индикатор | Полное руководство',
      realTitleUkr: 'Індикатор VWAP | Посібник з торгівлі',
      realTitleEn: 'VWAP Indicator | Complete Trading Guide',
      imgUkr: '/assets/img/content/vwap1.jpg',
      groupsRus: ['Объемный анализ рынка'],
      groupsUkr: ['Об`ємний аналіз ринку'],
      groupsEng: ['Market Volume Analysis'],
      id: 169,
    },
    {
      linkUkr: 'tradingview-platform',
      titleRus:
        'Платформа TradingView: что это такое, как пользоваться и зарабатывать',
      titleUkr:
        'Платформа TradingView: що це таке, як користуватися та заробляти',
      titleEn: 'TradingView Platform: What It Is and How to Use It and Earn',
      descrRus:
        'TradingView: Полная инструкция, как пользоваться платформой и ЗАРАБАТЫВАТЬ. Пошаговая настройка графиков, анализ данных и эффективные стратегии для трейдеров. Узнайте секреты успешного трейдинга!',
      descrUkr:
        'TradingView: Повна інструкція, як користуватися платформою та ЗАРОБЛЯТИ. Покрокова настройка графіків, аналіз даних та ефективні стратегії для трейдерів. Дізнайтеся секрети успішного трейдингу!',
      descrEn:
        'TradingView: A complete guide on how to use the platform and EARN. Step-by-step chart setup, data analysis, and effective strategies for traders. Discover the secrets of successful trading!',
      realTitleRus:
        'Платформа TradingView: что это такое, как пользоваться и зарабатывать | Игорь Арапов',
      realTitleUkr:
        'Платформа TradingView: що це таке, як користуватися та заробляти | Ігор Арапов',
      realTitleEn:
        'TradingView Platform: What It Is and How to Use It and Earn | Igor Arapov',
      imgUkr: '/assets/img/content/tradingview_1.png',
      groupsRus: ['Трейдинг для начинающих'],
      groupsUkr: ['Трейдинг для початківців'],
      groupsEng: ['Trading for Beginners'],
      id: 135,
    },
    {
      titleUkr: 'Стратегії трейдингу з нуля',
      linkUkr: 'practic',
      descrEn:
        'Self-study guide for trading by Igor Arapov: step-by-step course from scratch, real strategies and tips for a confident start in trading.',
      titleRus: 'Стратегия трейдинга для новичков',
      titleEn: 'Trading Strategy for Beginners',
      descrUkr:
        'Дізнайтесь практичні рекомендації з трейдингу: торгова система, точки входу, мані-менеджмент і ризики від ArapovTrade.',
      descrRus:
        'Узнайте, как построить торговую стратегию в трейдинге: правила входа и выхода, управление рисками, примеры систем для новичков и профи | Игорь Арапов',
      realTitleRus: 'Стратегия трейдинга для новичков | Arapov.trade',
      realTitleUkr: 'Стратегії трейдингу з нуля | Arapov.trade',
      realTitleEn: 'Trading Strategy for Beginners | Arapov.trade',
      imgUkr: '/assets/img/content/prakticuk.jpg',
      groupsRus: ['Примеры сделок'],
      groupsUkr: ['Приклади угод'],
      groupsEng: ['Trade Examples'],
      id: 109,
    },
    {
      titleUkr: 'Метод Мартінгейла',
      linkUkr: 'metodmartingejla',
      titleRus: 'Метод Мартингейла',
      titleEn: 'Martingale method',
      descrRus:
        'Узнайте, как работает метод Мартингейла в трейдинге. Способы увеличения прибыли и управления рисками  | Игорь Арапов',
      descrUkr:
        'Дізнайтеся, як працює метод Мартінгейла у трейдингу. Способи збільшення прибутку та управління ризиками | Ігор Арапов',
      descrEn:
        'Learn how the Martingale method works in trading. Ways to increase profits and manage risks | Igor Arapov',
      realTitleRus: 'Стратегия Мартингейла в трейдинге: Как повысить доход',
      realTitleUkr: 'Стратегія Мартінгейла у трейдингу: Як підвищити дохід',
      realTitleEn: 'Martingale Strategy in Trading: How to Increase Income',
      imgUkr: '/assets/img/content/martingale.png',
      groupsRus: ['Трейдинг для начинающих'],
      groupsUkr: ['Трейдинг для початківців'],
      groupsEng: ['Trading for Beginners'],
      id: 158,
    },
    {
      linkUkr: 'tiltintrading',
      titleRus: 'Что такое тильт в трейдинге : причины, признаки',
      titleUkr: 'Що таке тільт у трейдингу: причини, ознаки',
      titleEn: 'What is Tilt in Trading: Causes, Signs',
      descrRus:
        'Узнайте, что такое тильт, его причины, признаки, виды (явный и скрытый), а также эффективные способы борьбы и профилактики | Игорь Арапов',
      descrUkr:
        'Дізнайтеся, що таке тільт, його причини, ознаки, види (явний і прихований), а також ефективні способи боротьби та профілактики | Ігор Арапов',
      descrEn:
        'Learn what tilt is, its causes, signs, types (overt and covert), and effective ways to combat and prevent it | Igor Arapov',
      realTitleRus: 'Что такое тильт в трейдинге : причины, признаки',
      realTitleUkr: 'Що таке тільт у трейдингу: причини, ознаки',
      realTitleEn: 'What is Tilt in Trading: Causes, Signs',
      imgUkr: '/assets/img/content/tilt2.jpg',
      groupsRus: ['Трейдинг для начинающих'],
      groupsUkr: ['Трейдинг для початківців'],
      groupsEng: ['Trading for Beginners'],
      id: 159,
    },
    {
      linkUkr: 'binarnyeopciony',
      titleRus: 'Бинарные опционы : стратегия для новичков',
      titleUkr: 'Бінарні опціони: стратегія для початківців',
      titleEn: 'Binary Options: Strategy for Beginners',
      descrRus:
        'Узнайте, что такое бинарные опционы, как они работают, их виды, особенности, плюсы и минусы. Подробное руководство для новичков | Игорь Арапов',
      descrUkr:
        'Дізнайтеся, що таке бінарні опціони, як вони працюють, їх види, особливості, плюси та мінуси. Детальний посібник для початківців | Ігор Арапов',
      descrEn:
        'Learn what binary options are, how they work, their types, features, pros and cons. A detailed guide for beginners | Igor Arapov',
      realTitleRus: 'Бинарные опционы : стратегия для новичков | Игорь Арапов',
      realTitleUkr: 'Бінарні опціони: стратегія для початківців | Ігорь Арапов',
      realTitleEn: 'Binary Options: Strategy for Beginners | Igor Arapov',
      imgUkr: '/assets/img/content/binareoptions2.jpg',
      groupsRus: ['Трейдинг для начинающих'],
      groupsUkr: ['Трейдинг для початківців'],
      groupsEng: ['Trading for Beginners'],
      id: 160,
    },
    {
      linkUkr: 'atrindikator',
      titleRus: 'ATR индикатор',
      titleUkr: 'Індикатор ATR',
      titleEn: 'ATR Indicator',
      descrRus:
        'Узнайте, что такое ATR индикатор в трейдинге, как он рассчитывается и как использовать Average True Range для определения волатильности рынка| Игорь Арапов',
      descrUkr:
        'Дізнайтеся, що таке індикатор ATR у трейдингу, як він розраховується та як використовувати Average True Range для визначення волатильності ринку | Ігор Арапов',
      descrEn:
        'Learn what the ATR indicator is in trading, how it is calculated, and how to use the Average True Range to determine market volatility | Igor Arapov',
      realTitleRus: 'Что такое ATR индикатор | Игорь Арапов',
      realTitleUkr: 'Що таке індикатор ATR | Ігор Арапов',
      realTitleEn: 'What is the ATR Indicator | Igor Arapov',
      imgUkr: '/assets/img/content/atrindicator.jpg',
      groupsRus: ['Трейдинг для начинающих'],
      groupsUkr: ['Трейдинг для початківців'],
      groupsEng: ['Trading for Beginners'],
      id: 161,
    },
    {
      linkUkr: 'spread',
      titleRus: 'Что такое спред?',
      titleUkr: 'Що таке спред?',
      titleEn: 'What is Spread?',
      descrRus:
        'Узнайте, что такое спред в трейдинге, почему он важен и как эта разница между Bid и Ask ценами влияет на вашу первую сделку | Игорь Арапов',
      descrUkr:
        'Дізнайтеся, що таке спред у трейдингу, чому він важливий і як ця різниця між цінами Bid та Ask впливає на вашу першу угоду | Ігор Арапов',
      descrEn:
        'Learn what spread is in trading, why it is important, and how the difference between Bid and Ask prices affects your first trade | Igor Arapov',
      realTitleRus:
        'Что такое спред в трейдинге простыми словами | Игорь Арапов',
      realTitleUkr: 'Що таке спред у трейдингу простими словами | Ігор Арапов',
      realTitleEn: 'What is Spread in Trading Simple Words | Igor Arapov',
      imgUkr: '/assets/img/content/spread3.png',
      groupsRus: ['Трейдинг для начинающих'],
      groupsUkr: ['Трейдинг для початківців'],
      groupsEng: ['Trading for Beginners'],
      id: 162,
    },
    {
      linkUkr: 'bitcoin-domination',
      titleRus:
        'Что такое доминация биткоина (BTC.D) и ее влияние на рынок криптовалют',
      titleUkr:
        'Що таке домінація біткоїна (BTC.D) і як вона впливає на ринок криптовалют',
      titleEn:
        'What is Bitcoin Dominance (BTC.D) and How It Affects the Cryptocurrency Market',
      descrRus:
        'Что такое доминация биткоина (BTC.D), зачем следить за этим показателем и как доминирование BTC влияет на рынок криптовалют и альткоины. Простое объяснение для начинающих трейдеров.',
      descrEn:
        'What is Bitcoin Dominance (BTC.D), why track this metric, and how BTC dominance affects the cryptocurrency market and altcoins. A simple explanation for beginner traders.',
      descrUkr:
        'Що таке домінація біткоїна (BTC.D), навіщо стежити за цим показником і як домінування BTC впливає на ринок криптовалют і альткоїни. Просте пояснення для початківців трейдерів.',
      realTitleRus:
        'Что такое доминация биткоина (BTC.D) и как она влияет на рынок криптовалют | Игорь Арапов',
      realTitleUkr:
        'Що таке домінація біткоїна (BTC.D) і як вона впливає на ринок криптовалют | Ігор Арапов',
      realTitleEn:
        'What is Bitcoin Dominance (BTC.D) and How It Affects the Cryptocurrency Market | Igor Arapov',
      imgUkr: '/assets/img/content/bitcoin_dominance_1.png',
      groupsRus: ['Трейдинг для начинающих'],
      groupsUkr: ['Трейдинг для початківців'],
      groupsEng: ['Trading for Beginners'],
      id: 136,
    },
    {
      titleUkr:
        'Хто такий трейдер і хто такий інвестор — пояснення для початківців',
      titleRus: 'Чем отличается трейдер от инвестора?',
      titleEn: 'What is the Difference Between a Trader and an Investor?',
      descrEn:
        'What is the difference between a trader and an investor? Which is better: trading or investing? Learn the key distinctions, advantages, and strategies | ArapovTrade',
      descrUkr:
        'Чим відрізняється трейдер від інвестора? Що краще: трейдинг чи інвестиції? Дізнайтеся ключові відмінності, переваги та стратегії | ArapovTrade',
      descrRus:
        'В чем разница между трейдером и инвестором? Что лучше: трейдинг или инвестиции? Узнайте ключевые отличия, преимущества и стратегии | ArapovTrade',
      realTitleRus: 'Чем отличается трейдер от инвестора? | ArapovTrade',
      realTitleEn:
        'What is the Difference Between a Trader and an Investor? | ArapovTrade',
      realTitleUkr:
        'Хто такий трейдер і хто такий інвестор — пояснення для початківців',
      linkUkr: 'tradingandinvestments',
      imgUkr: '/assets/img/content/tradingandinvestments.webp',
      groupsRus: ['Трейдинг для начинающих'],
      groupsUkr: ['Трейдинг для початківців'],
      groupsEng: ['Trading for Beginners'],
      id: 14,
    },
    {
      linkUkr: 'trianglefigure',
      titleRus: 'Паттерн треугольник в трейдинге',
      titleUkr: 'Фігура перевернутий трикутник',
      titleEn: 'Triangle Pattern in Technical Analysis',
      descrUkr:
        'Дізнайтесь про фігуру Трикутник: як визначити патерн, сигнали пробою та використання в трейдингу. Посібник від ArapovTrade.',
      descrRus:
        'Фигура Треугольник в трейдинге: как торговать паттерн? Руководство от ArapovTrade по анализу, пробою и стратегиям',
      realTitleRus: 'Паттерн треугольник в трейдинге | ArapovTrade',
      realTitleEn: 'Triangle: Trading Pattern | ArapovTrade',
      realTitleUkr: 'Фігура перевернутий трикутник | ArapovTrade',
      imgUkr: '/assets/img/content/trianglefigure.webp',
      descrEn:
        'Learn about the Triangle pattern: how to identify it, breakout signals, and trading applications with a guide from ArapovTrade.',
      groupsRus: ['Технический анализ'],
      groupsUkr: ['Технічний аналіз'],
      groupsEng: ['Technical Analysis'],
      id: 152,
    },
    {
      linkUkr: 'liquiditypools',
      titleRus: 'Что такое пулы ликвидности и как они работают?',
      titleUkr: 'Пули ліквідності: що це таке і як працюють?',
      titleEn: 'What are Liquidity Pools and How Do They Work?',
      descrEn:
        'Learn how Smart Money finds liquidity pools, manipulates the market, and uses hidden zones. A guide from ArapovTrade.',

      descrUkr:
        'Дізнайтесь, як Smart Money знаходять пули ліквідності, маніпулюють ринком та використовують приховані зони. Посібник від ArapovTrade.',
      descrRus:
        'Узнайте, как работают пулы ликвидности! Как Smart Money ищет ликвидность и использует скрытые зоны в трейдинге на Arapov.trade.',
      realTitleRus:
        'Что такое пулы ликвидности и как они работают? | Arapov.trade',
      realTitleUkr:
        'Пули ліквідності: що це таке і як працюють? | Arapov.trade',
      realTitleEn:
        'What are Liquidity Pools and How Do They Work? | Arapov.trade',
      imgUkr: '/assets/img/content/liquiditypools.png',
      groupsRus: ['Концепция Смарт Мани'],
      groupsUkr: ['Концепція Смарт Мані'],
      groupsEng: ['Smart Money Concept'],
      id: 104,
    },

    {
      linkUkr: 'icebergorders',
      descrEn:
        'Learn about Iceberg Orders: how banks hide their positions and how to use them in trading. A guide from ArapovTrade.',
      titleRus: 'Что такое айсберг ордер (Iceberg Order)?',
      titleUkr: 'Iceberg-ордери: що це таке і як працюють на біржі',
      titleEn: 'What are Iceberg Orders?',
      descrUkr:
        'Дізнайтесь, що таке приховані ордери (Iceberg Order), як банки маскують позиції та як використовувати їх у торгівлі. Посібник від ArapovTrade.',
      descrRus:
        'Узнайте, что такое айсберг ордер (скрытые ордера)! Как банки маскируют позиции и как использовать их в трейдинге на Arapov.trade.',
      realTitleRus: 'Что такое айсберг ордер (Iceberg Order)? | Arapov.trade',
      realTitleEn: 'What are Iceberg Orders ? | Arapov.trade',
      realTitleUkr: 'Iceberg-ордери: що це таке і як працюють на біржі',
      imgUkr: '/assets/img/content/icebergorders.webp',
      groupsRus: ['Концепция Смарт Мани'],
      groupsUkr: ['Концепція Смарт Мані'],
      groupsEng: ['Smart Money Concept'],
      id: 105,
    },
    {
      linkUkr: 'smartmoneyconceptsguide',
      descrEn:
        'Self-study guide for trading by Igor Arapov: step-by-step course from scratch, real strategies and tips for a confident start in trading.',
      titleRus: 'Концепция смарт мани',
      titleUkr: 'Концепція смарт мані',
      titleEn: 'Smart Money Concept',
      descrUkr:
        'Дізнайтеся, як торгувати за Smart Money Concepts: структура ринку, ліквідність, Order Blocks, FVG і стратегії входу та виходу з угод.',
      descrRus:
        'Узнайте, как применять Smart Money Concept (SMC) в трейдинге! Стратегии по структуре рынка, ликвидности, FVG и Order Blocks с примерами',
      realTitleRus: 'Стратегия смарт мани | Arapov.trade',
      realTitleUkr: 'Стратегія смарт мані | Arapov.trade',
      realTitleEn: 'Smart Money Strategy | Arapov.trade',
      imgUkr: '/assets/img/content/smartmoneyconceptsguide.webp',
      groupsRus: ['Концепция Смарт Мани'],
      groupsUkr: ['Концепція Смарт Мані'],
      groupsEng: ['Smart Money Concept'],
      id: 106,
    },

    {
      titleUkr: 'Точки входу за концепцією Smart Money',
      linkUkr: 'smartmoneystrategies',
      descrEn:
        'Strategies for Smart Money entry points: Order Blocks, liquidity, FVG, and other key concepts for effective trading.',
      titleRus: 'Как находить точки входа по Smart Money? Лучшие стратегии',
      titleEn: 'How to Find Smart Money Entry Points? Best Strategies',
      descrUkr:
        'Стратегії Smart Money для точного входу: Order Blocks, ліквідність, FVG та інші ключові концепції для ефективної торгівлі.',
      descrRus:
        'Разбираем как находить точки входа по Smart Money! Стратегии с Order Blocks, ликвидностью и FVG для точного трейдинга с Arapov.trade',
      realTitleRus:
        'Стратегия смарт мани: как находить точки входа | Arapov.trade',
      realTitleUkr: 'Точки входу за концепцією Smart Money | Arapov.trade',
      realTitleEn: 'Smart Money: Entry Points and Strategies | Arapov.trade',
      imgUkr: '/assets/img/content/smartmoneystrategies44.webp',
      groupsRus: ['Концепция Смарт Мани'],
      groupsUkr: ['Концепція Смарт Мані'],
      groupsEng: ['Smart Money Concept'],
      id: 107,
    },

    {
      titleUkr:
        'Як Smart Money керують натовпом? Маніпуляції новинами та настроєм',
      linkUkr: 'smartmoneycontrol',
      descrEn:
        'Learn how Smart Money manipulates news and sentiment to influence the market and trap retail traders.',
      titleRus:
        'Как Smart Money управляют толпой? Манипуляции новостями и настроением',
      titleEn:
        'How Does Smart Money Control the Crowd? News and Sentiment Manipulation',
      descrUkr:
        'Як Smart Money керують настроєм і новинами, щоб впливати на ринок і заманювати роздрібних трейдерів у пастки.',
      descrRus:
        'Узнайте, как Smart Money манипулирует рынком через новости и толпу! Советы по распознанию трендов, ловушек и ликвидности для трейдинга с Arapov.trade',
      realTitleRus: 'Smart Money: манипуляции рынком | Arapov.trade',
      realTitleUkr: 'Як Smart Money маніпулюють ринком | Arapov.trade',
      realTitleEn: 'Smart Money: Market Manipulation | Arapov.trade',
      imgUkr: '/assets/img/content/smartmoneycontrol44.webp',
      groupsRus: ['Концепция Смарт Мани'],
      groupsUkr: ['Концепція Смарт Мані'],
      groupsEng: ['Smart Money Concept'],
      id: 108,
    },

    {
      titleUkr:
        'Біржовий стакан і стрічка принтів: як читати та використовувати',
      linkUkr: 'stockorderbook',
      descrEn:
        'Learn how to read the order book and tape prints, analyze liquidity, and identify Smart Money trades with ArapovTrade.',
      titleRus: 'Как читать Биржевой стакан и ленту принтов',
      titleEn: 'How to Read the Order Book and Tape Prints',
      descrUkr:
        'Дізнайтесь, як читати біржовий стакан і стрічку принтів, аналізувати ліквідність і угоди Smart Money від ArapovTrade.',
      descrRus:
        'Узнайте, как читать биржевой стакан и ленту принтов! Анализ заявок, ликвидности и сделок для выявления Smart Money и точек входа с Arapov.trade',
      realTitleRus:
        'Биржевой стакан и лента принтов: как читать | Arapov.trade',
      realTitleUkr:
        'Біржовий стакан і стрічка принтів: як читати та використовувати',
      realTitleEn: 'Order Book and Tape Prints: How to Read | Arapov.trade',
      imgUkr: '/assets/img/content/stockorderbook.png',
      groupsRus: ['Объемный анализ рынка'],
      groupsUkr: ['Об`ємний аналіз ринку'],
      groupsEng: ['Market Volume Analysis'],
      id: 110,
    },

    {
      titleUkr: 'Фази ринку у трейдингу',
      titleRus: 'Фазы рынка в трейдинге',
      titleEn: 'Market Phases in Trading',
      descrEn:
        'Learn about market phases in trading: accumulation, growth, distribution, and decline. How to identify the phase and apply strategies for successful trading.',
      linkUkr: 'blogmarketphases',
      imgUkr: '/assets/img/content/blogmarketphases.webp',
      groupsRus: ['Объемный анализ рынка'],
      groupsUkr: ['Об`ємний аналіз ринку'],
      groupsEng: ['Market Volume Analysis'],
      descrUkr:
        'Дізнайтеся про фази ринку в трейдингу: накопичення, зростання, розподіл і зниження. Як визначити фазу та застосувати стратегії для успішної торгівлі.',
      descrRus:
        'Фазы рынка в трейдинге: как распознавать накопление, рост, распределение и снижение. Стратегии и примеры от ArapovTrade',
      realTitleRus: 'Фазы рынка в трейдинге | ArapovTrade',
      realTitleUkr: 'Структура ринку: як змінюються фази і що з цим робити',
      realTitleEn: 'Market Phases in Trading | Arapov.trade',
      id: 1,
    },
    {
      titleRus: 'Что такое дивергенция в трейдинге?',
      titleUkr: 'Що таке дивергенція у трейдингу?',
      titleEn: 'What is Divergence in Trading?',
      linkUkr: 'divergenceonindecators',
      imgUkr: '/assets/img/content/divergenceonindecators.webp',
      groupsRus: ['Технический анализ'],
      groupsUkr: ['Технічний аналіз'],
      groupsEng: ['Technical Analysis'],
      id: 2,

      descrRus:
        'Узнайте, что такое дивергенция и как она помогает предсказывать движение рынка на Arapov.trade.',
      descrUkr:
        'Дізнайтеся, що таке дивергенція та як вона допомагає передбачати рух ринку на Arapov.trade.',
      descrEn:
        'Learn about divergence and how it helps predict market movement on Arapov.trade.',
      realTitleRus: 'Что такое дивергенция в трейдинге? | Arapov.trade',
      realTitleEn: 'What is Divergence in Trading? | Arapov.trade',
      realTitleUkr: 'Що таке дивергенція у трейдингу? | Arapov.trade',
    },
    {
      titleRus: 'Что такое волатильность',
      titleUkr: 'Що таке волатильність',
      titleEn: 'What is Volatility',
      descrEn:
        'Learn about volatility in trading: what it is, how it affects trading, and effective strategies for high-volatility markets.',

      linkUkr: 'volatility',
      imgUkr: '/assets/img/content/volatility44.webp',
      groupsRus: ['Трейдинг для начинающих'],
      groupsUkr: ['Трейдинг для початківців'],
      groupsEng: ['Trading for Beginners'],
      id: 3,
      descrUkr:
        'Дізнайтеся, що таке волатильність, як вона впливає на трейдинг і які стратегії ефективні на високо-волатильних ринках.',
      descrRus:
        'Узнайте, что такое волатильность в трейдинге! Как она влияет на торговлю и стратегии для высоковолатильных рынков на Arapov.trade.',
      realTitleRus: 'Что такое волатильность | Arapov.trade',
      realTitleEn: 'What is Volatility in Trading | Arapov.trade',
      realTitleUkr: 'Що таке волатильність у трейдінгу | Arapov.trade',
    },
    {
      titleUkr: 'Як не втратити всі гроші на маржинальній торгівлі?',
      titleRus: 'Как не потерять все деньги на маржинальной торговле?',
      descrEn:
        'Tips on minimizing risks and avoiding losses in margin trading. Key capital management strategies for traders.',
      titleEn: 'How Not to Lose All Your Money in Margin Trading?',
      descrUkr:
        'Поради, як мінімізувати ризики та уникнути втрат у маржинальній торгівлі. Ключові стратегії управління капіталом для трейдерів.',
      descrRus:
        'Как избежать потерь в маржинальной торговле? Советы по управлению капиталом  от ArapovTrade — для новичков и опытных трейдеров',
      realTitleRus: 'Маржинальная торговля без потерь | ArapovTrade',
      realTitleEn: 'Margin Trading Without Losses — Tips from ArapovTrade',
      realTitleUkr: 'Як не втратити гроші на маржинальній торгівлі',
      linkUkr: 'avoidlosingmoney',
      imgUkr: '/assets/img/content/reasonfordepositeloose.webp',
      groupsRus: ['Криптовалюта'],
      groupsUkr: ['Криптовалюта'],
      groupsEng: ['Cryptocurrency'],
      id: 4,
    },
    {
      titleUkr: 'Ціноутворення та ліквідність',
      titleRus: 'Ценообразование и ликвидность',
      descrEn:
        'Learn about pricing and liquidity in financial markets, the role of market makers, and risk management from ArapovTrade.',
      titleEn: 'Pricing and Liquidity',
      descrUkr:
        'Дізнайтесь про ціноутворення та ліквідність на фінансових ринках, роль маркет-мейкерів і управління ризиками від ArapovTrade.',
      descrRus:
        'Ценообразование и ликвидность: как они работают? Руководство от ArapovTrade по анализу рынка и стратегиям.',
      realTitleRus: 'Ценообразование и ликвидность | ArapovTrade',
      realTitleUkr: 'Ціноутворення та ліквідність ринку',
      realTitleEn: 'Pricing and Market Liquidity | ArapovTrade',
      linkUkr: 'pricingandliquidity',
      imgUkr: '/assets/img/content/pricingandliquidity.webp',
      groupsRus: ['Объемный анализ рынка'],
      groupsUkr: ['Об`ємний аналіз ринку'],
      groupsEng: ['Market Volume Analysis'],
      id: 5,
    },
    {
      titleUkr: 'Концепція Смарт Мані',
      titleRus: 'Концепция Смарт Мани',
      titleEn: 'Smart Money Concept',
      descrEn:
        'Learn about Smart Money: how institutional players trade, liquidity analysis, and market manipulation from ArapovTrade.',
      descrUkr:
        'Дізнайтесь про Smart Money: як інституційні гравці торгують, аналіз ліквідності та маніпуляції ринку від ArapovTrade.',
      descrRus:
        'Узнайте, как Smart Money влияет на трейдинг! Методы крупных игроков, манипуляции ценой и ликвидность для прибыльной торговли с Arapov.trade.',
      realTitleRus:
        'Smart Money в трейдинге: стратегия крупных игроков | Arapov.trade',
      realTitleUkr: 'Smart Money: концепція трейдингу',
      realTitleEn: 'Smart Money: Trading Concept | Arapov.trade',
      linkUkr: 'smartestmoney',
      imgUkr: '/assets/img/content/smartestmoney.webp',
      groupsRus: ['Концепция Смарт Мани'],
      groupsUkr: ['Концепція Смарт Мані'],
      groupsEng: ['Smart Money Concept'],
      id: 6,
    },
    {
      titleRus: 'Как заработать на трейдинге?',
      titleUkr: 'Як заробляти в трейдингу?',
      titleEn: 'How to Make Money in Trading?',

      descrRus:
        'Как заработать на трейдинге? Узнайте стратегии как заработать в интернете на трейдинге с нуля на ArapovTrade.',
      descrUkr:
        'Як заробляти в трейдингу? Дізнайтеся стратегії заробітку в інтернеті на трейдингу з нуля на Arapov.trade.',
      descrEn:
        'How to make money in trading? Learn strategies to earn online from scratch on Arapov.trade.',
      realTitleRus: 'Как заработать на трейдинге? | ArapovTrade',
      realTitleUkr: 'Як заробляти в трейдингу? | Arapov.trade',
      realTitleEn: 'How to Make Money in Trading? | Arapov.trade',
      linkUkr: 'makingmoneyintrading',
      imgUkr: '/assets/img/content/makingmoneyintrading.webp',
      groupsRus: ['Трейдинг для начинающих'],
      groupsUkr: ['Трейдинг для початківців'],
      groupsEng: ['Trading for Beginners'],
      id: 7,
    },

    {
      titleUkr: 'Імбаланс у трейдингу ',
      titleRus: 'Имбаланс в трейдинге ',
      titleEn: 'Imbalance in Trading',
      descrUkr:
        'Що таке імбаланс у трейдингу, як він впливає на ринок. Приклади, методи виявлення і стратегії з урахуванням ринкового дисбалансу.',
      descrRus:
        'Имбаланс в трейдинге: как анализировать и использовать в торговле. Руководство от ArapovTrade по стратегиям и движению цены',
      realTitleRus: 'Имбаланс в трейдинге | ArapovTrade',
      realTitleUkr: 'Що таке імбаланс у трейдингу | Arapov.trade',
      realTitleEn: 'What is Imbalance in Trading | Arapov.trade',
      linkUkr: 'imbalanceintrading',
      imgUkr: '/assets/img/content/imbalanceintrading.webp',
      groupsRus: ['Концепция Смарт Мани'],
      descrEn:
        'Learn how Smart Money manipulates news and sentiment to influence the market and trap retail traders.',
      groupsUkr: ['Концепція Смарт Мані'],
      groupsEng: ['Smart Money Concept'],
      id: 8,
    },
    {
      titleUkr: 'Як прогнозувати ціну на ринку?',
      titleRus: 'Как прогнозировать цену на рынке?',
      descrEn:
        'Learn how to predict market price: technical and fundamental analysis, indicators, and market psychology for traders.',
      titleEn: 'How to Predict Market Price?',
      descrUkr:
        'Дізнайтеся, як прогнозувати ціну на ринку: технічний і фундаментальний аналіз, індикатори та ринкова психологія для трейдерів.',
      descrRus:
        'Как прогнозировать цену в трейдинге: анализ, индикаторы, психология и стратегии. Узнайте, как предсказывать движение рынка с ArapovTrade',
      realTitleRus: 'Как прогнозировать цену в трейдинге | ArapovTrade',
      realTitleEn: 'How to Predict Price in Trading | ArapovTrade',
      realTitleUkr: 'Як прогнозувати ціну на ринку | Arapov.trade',
      linkUkr: 'predictmarketprice',
      imgUkr: '/assets/img/content/predictmarketprice.webp',
      groupsRus: ['Объемный анализ рынка'],
      groupsUkr: ['Об`ємний аналіз ринку'],
      groupsEng: ['Market Volume Analysis'],
      id: 9,
    },
    {
      titleUkr: 'Основні причини втрат у Трейдінгу',
      titleRus: 'Основные причины потерь в Трейдинге',
      descrEn:
        'Learn about the main reasons for losses in trading: strategy errors, lack of discipline, and overestimating capabilities. Tips from Arapov.trade.',
      titleEn: 'Main Reasons for Losses in Trading',
      descrUkr:
        'Основні причини втрати депозиту: помилки в стратегії, відсутність дисципліни, переоцінка можливостей. Поради від Arapov.trade.',
      descrRus:
        'Узнайте, почему трейдеры теряют депозит! Ошибки стратегии, отсутствие дисциплины и переоценка рисков. Советы по предотвращению потерь на Arapov.trade',
      realTitleRus: 'В трейдинге как не слить депозит | Arapov.trade',
      realTitleEn: 'Losing Deposit in Trading: How to Avoid It? | Arapov.trade',
      realTitleUkr: 'Причини втрати депозиту | Arapov.trade',
      linkUkr: 'mainreasonforlosses',
      imgUkr: '/assets/img/content/mainreasonforlosses.webp',
      groupsRus: ['Психология трейдинга'],
      groupsUkr: ['Психологія трейдингу'],
      groupsEng: ['Trading Psychology'],
      id: 10,
    },
    {
      titleUkr: 'Стартовий депозит трейдера',
      titleRus: 'Стартовый депозит Трейдера',
      descrEn:
        'Learn about the starting deposit needed for trading, how to calculate it, and capital management tips from ArapovTrade.',
      titleEn: 'Trader’s Starting Deposit',
      descrUkr:
        'Дізнайтесь, який стартовий депозит потрібен для трейдингу, як його розрахувати та управляти капіталом. Поради від ArapovTrade.',
      descrRus:
        'Какой стартовый депозит нужен трейдеру? Советы по расчёту капитала и управлению рисками от ArapovTrade.',
      realTitleRus: 'Первый депозит трейдера: сколько нужно для старта?',
      realTitleEn: 'Trader’s Starting Deposit: How Much is Needed to Start?',
      realTitleUkr: 'Стартовий депозит: скільки потрібно?',
      linkUkr: 'starterdeposit',
      imgUkr: '/assets/img/content/starterdeposit.webp',
      groupsRus: ['Трейдинг для начинающих'],
      groupsUkr: ['Трейдинг для початківців'],
      groupsEng: ['Trading for Beginners'],
      id: 11,
    },
    {
      titleUkr: 'Торгівля рівнів',
      titleRus: 'Торговля от уровней',
      titleEn: 'Trading of Levels',
      descrEn:
        'Learn how to trade key levels in the market: identification, usage, and effective strategies from Arapov.trade.',
      descrUkr:
        'Детальний посібник для початківців з торгівлі рівнями: як визначати, використовувати та ефективно торгувати ключові рівні від Arapov.trade.',
      descrRus:
        'Узнайте, как торговать уровнями в трейдинге! Полное руководство по определению и использованию ключевых уровней на Arapov.trade.',
      realTitleRus: 'Торговля от уровней в трейдинге | Arapov.trade',
      realTitleUkr: 'Торгівля рівнями: повний посібник | Arapov.trade',
      realTitleEn: 'Trading Levels: A Complete Guide | Arapov.trade',
      linkUkr: 'tradingoflevels',
      imgUkr: '/assets/img/content/tradingoflevels.webp',
      groupsRus: ['Технический анализ'],
      groupsUkr: ['Технічний аналіз'],
      groupsEng: ['Technical Analysis'],
      id: 12,
    },
    {
      titleUkr: 'Хвилі Елліотта: Основи, структура та застосування',
      titleRus: 'Волны Эллиотта: Основы, структура и применение',
      titleEn: 'Elliott Waves: Basics, Structure, and Application',
      descrEn:
        'Detailed description of Elliott Wave theory: principles, structure, basics, and application in technical analysis for effective trading.',
      descrUkr:
        'Детальний опис теорії хвиль Елліотта: принципи, структура, основи та застосування в технічному аналізі для ефективної торгівлі.',
      descrRus:
        'Узнайте основы теории волн Эллиотта! Принципы, структура и применение в трейдинге для точного анализа на Arapov.trade',
      realTitleRus: 'Волны Эллиотта: основы и применение | Arapov.trade',
      realTitleEn: 'Elliott Waves: Basics and Application | Arapov.trade',
      realTitleUkr: 'Хвилі Елліотта: основи та застосування | Arapov.trade',
      linkUkr: 'wavesofelliott',
      imgUkr: '/assets/img/content/wavesofelliott.webp',
      groupsRus: ['Технический анализ'],
      groupsUkr: ['Технічний аналіз'],
      groupsEng: ['Technical Analysis'],
      id: 13,
    },

    {
      linkUkr: 'futurestrading',
      titleRus: 'Что такое фьючерсы?',
      titleUkr: 'Що таке ф’ючерси?',
      titleEn: 'What are Futures?',
      descrRus:
        'Торговля фьючерсами. Узнайте, как выбрать брокера для торговли фьючерсами. Изучите что такое фьючерсная торговля с Игорем Араповым.',
      descrUkr:
        'Торгівля ф’ючерсами. Дізнайтеся, як обрати брокера для торгівлі ф’ючерсами. Вивчіть що таке ф’ючерсна торгівля з Ігорем Араповим.',
      descrEn:
        'Futures Trading. Learn how to choose a broker for futures trading. Explore what futures trading is with Igor Arapov.',
      realTitleRus: 'Что такое фьючерсы?| ArapovTrade',
      realTitleUkr: 'Що таке ф’ючерси? | ArapovTrade',
      imgUkr: '/assets/img/content/futurestrading.webp',
      realTitleEn: 'What are Futures? | ArapovTrade',
      groupsRus: ['Словарь трейдера'],
      groupsUkr: ['Словник трейдера'],
      groupsEng: ['Trader`s Dictionary'],
      id: 15,
    },
    {
      titleUkr: 'Трендові канали',
      titleRus: 'Трендовые каналы',
      titleEn: 'Trading Channels',
      descrEn:
        'Learn about trading channels: how to build, identify, and use strategies for trading from ArapovTrade.',
      descrUkr:
        'Дізнайтесь про трендові канали в трейдингу: як будувати, визначати та використовувати стратегії для торгівлі від ArapovTrade.',
      descrRus:
        'Узнайте, как использовать трендовые каналы в трейдинге! Полное руководство по их построению, стратегиям торговли и советам для успеха с Arapov.trade',
      realTitleRus:
        'Трендовые каналы в трейдинге: как использовать | Arapov.trade',
      realTitleEn:
        'Trading Channels in Trading: How to Use Them | Arapov.trade',
      realTitleUkr: 'Трендові канали: стратегії трейдингу',
      linkUkr: 'trandingchannels',
      imgUkr: '/assets/img/content/trandingchannels.webp',
      groupsRus: ['Технический анализ'],
      groupsUkr: ['Технічний аналіз'],
      groupsEng: ['Technical Analysis'],
      id: 16,
    },
    {
      titleUkr: 'Топ міфів про трейдинг',
      titleRus: 'Топ мифов о Трейдинге',
      titleEn: 'Top Myths About Trading',
      descrEn:
        'Debunking myths about trading that deceive beginners and traders: truths, mistakes, and tips from ArapovTrade.',
      descrUkr:
        'Розвінчуємо міфи про трейдинг, які обманюють початківців і трейдерів: правда, помилки та поради від ArapovTrade.',
      descrRus:
        'Топ мифов о трейдинге: разоблачение заблуждений. Советы от ArapovTrade для новичков и опытных трейдеров.',
      realTitleRus: 'Мифы о трейдинге: топ заблуждений | ArapovTrade',
      realTitleUkr: 'Міфи про трейдинг: правда і вигадки',
      realTitleEn: 'Myths About Trading: Truth and Fiction',
      linkUkr: 'tradingmyths',
      imgUkr: '/assets/img/content/tradingmyths.webp',
      groupsRus: ['Трейдинг для начинающих'],
      groupsUkr: ['Трейдинг для початківців'],
      groupsEng: ['Trading for Beginners'],
      id: 17,
    },
    {
      titleUkr: 'Об`ємний аналіз ринку',
      titleRus: 'Обьемный анализ рынка',
      descrEn:
        'Learn how market volume analysis works: principles, tools, and strategies for effective volume-based trading.',
      titleEn: 'Market Volume Analysis',
      descrUkr:
        'Дізнайтеся, як працює об’ємний аналіз ринку: принципи, інструменти та стратегії для ефективної торгівлі за обсягами.',
      descrRus:
        'Объемный анализ рынка: принципы, инструменты, стратегии трейдинга. Руководство от ArapovTrade для анализа и торговли',
      realTitleRus: 'Объемный анализ рынка | ArapovTrade',
      realTitleUkr: 'Об’ємний аналіз ринку у трейдингу | Arapov.trade',
      realTitleEn: 'Market Volume Analysis in Trading | Arapov.trade',
      linkUkr: 'volmarketanalisys',
      imgUkr: '/assets/img/content/volmarketanalisys.webp',
      groupsRus: ['Объемный анализ рынка'],
      groupsUkr: ['Об`ємний аналіз ринку'],
      groupsEng: ['Market Volume Analysis'],
      id: 18,
    },
    {
      titleUkr: 'Метод Вайкоффа у трейдингу',
      titleRus: 'Метод Вайкоффа в трейдинге',
      descrEn:
        'Learn how to analyze supply and demand using the Wyckoff method, identify trends, and find optimal entry and exit points in trading.',
      titleEn: 'Wyckoff Method in Trading',
      descrUkr:
        'Дізнайтеся, як методом Вайкоффа аналізувати попит і пропозицію, визначати тренди та оптимальні точки входу і виходу в трейдингу.',
      descrRus:
        'Метод Вайкоффа: как анализировать рынок? Гид от ArapovTrade по Wyckoff Method, трендам и точкам входа.',
      realTitleRus: 'Метод Вайкоффа в трейдинге | ArapovTrade',
      realTitleUkr: 'Метод Вайкоффа в трейдингу | Arapov.trade',
      realTitleEn: 'Wyckoff Method in Trading | Arapov.trade',
      linkUkr: 'wyckoffmethod',
      imgUkr: '/assets/img/content/wyckoffmethod.webp',
      groupsRus: ['Концепция Смарт Мани'],
      groupsUkr: ['Концепція Смарт Мані'],
      groupsEng: ['Smart Money Concept'],
      id: 19,
    },
    {
      titleUkr: 'Що таке скам в криптовалюті - схеми та захист',
      descrEn:
        'What is a scam in cryptocurrency? Popular fraudulent schemes and tips on how to protect your funds. A guide for traders and investors from Arapov.trade.',
      titleRus:
        'Что такое скам в криптовалюте: мошеннические схемы и способы защиты',
      titleEn: 'What is Crypto Scam - Fraud Schemes and Protection Methods',
      descrUkr:
        'Що таке скам у криптовалюті? Популярні шахрайські схеми та поради, як захистити кошти. Посібник для трейдерів та інвесторів від Arapov.trade.',
      descrRus:
        'Что такое скам в криптовалюте: популярные мошеннические схемы — фейковые ICO, пирамиды, фишинг. Как защитить средства и снизить риски трейдерам и инвесторам.',
      realTitleRus: 'Что такое скам в криптовалюте | Arapov.trade',
      realTitleUkr: 'Що таке скам у криптовалюті | Arapov.trade',
      realTitleEn: 'What is Crypto Scam | Arapov.trade',
      linkUkr: 'cryptoscam',
      imgUkr: '/assets/img/content/cryptoscam.webp',
      groupsRus: ['Криптовалюта'],
      groupsUkr: ['Криптовалюта'],
      groupsEng: ['Cryptocurrency'],
      id: 20,
    },
    {
      titleUkr: 'Як визначити маркетмейкера',
      titleRus: 'Как определить маркет мейкера',
      descrEn:
        'Learn how to identify market makers: their role in the market, strategies, and impact on prices from ArapovTrade.',
      titleEn: 'How to Identify a Market Maker',
      descrUkr:
        'Дізнайтесь, хто такі маркет-мейкери, як їх розпізнати на ринку, які стратегії вони застосовують і як це впливає на ціни від ArapovTrade.',
      descrRus:
        'Маркет-мейкеры: как определить их на рынке трейдинга, используемые стратегии и влияние на цену. Советы по анализу крупных игроков от Arapov.trade.',
      realTitleRus: 'Кто такой маркет мейкер? | Arapov.trade',
      realTitleUkr: 'Як розпізнати маркет-мейкера в трейдингу',
      linkUkr: 'marketmaker',
      realTitleEn: 'How to Identify a Market Maker in Trading',
      imgUkr: '/assets/img/content/marketmaker.webp',
      groupsRus: ['Концепция Смарт Мани'],
      groupsUkr: ['Концепція Смарт Мані'],
      groupsEng: ['Smart Money Concept'],
      id: 21,
    },
    {
      titleUkr: 'Що таке арбітраж криптовалют: основи та секрети успіху',
      titleRus: 'Что такое арбитраж криптовалют: основы и секреты успеха',
      titleEn: 'What is Crypto Arbitrage: Basics and Success Secrets',
      descrEn:
        'Learn the basics of cryptocurrency arbitrage: strategies, tools, and tips for successful trading from Arapov.trade.',
      descrUkr:
        'Що таке арбітраж криптовалют? Основи та секрети стратегії заробітку на різниці цін. Посібник для початківців і професіоналів від Arapov.trade.',
      descrRus:
        'Узнайте, что такое арбитраж криптовалют! Основы, стратегии и секреты заработка на разнице цен для трейдеров на Arapov.trade.',
      realTitleRus:
        'Арбитраж криптовалют: что это и как заработать | Arapov.trade',
      realTitleUkr: 'Що таке арбітраж криптовалют? | Arapov.trade',
      realTitleEn: 'What is Crypto Arbitrage? | Arapov.trade',
      linkUkr: 'cryptoarbitrage',
      imgUkr: '/assets/img/content/cryptoarbitrage.webp',
      groupsRus: ['Криптовалюта'],
      groupsUkr: ['Криптовалюта'],
      groupsEng: ['Cryptocurrency'],
      id: 22,
    },
    {
      titleUkr: 'Що таке Bitcoin-ETF і як він впливає на ринок? ',
      titleRus: 'Что такое Bitcoin-ETF и как он оказывает влияние на рынок?',
      titleEn: 'What is Bitcoin-ETF and How Does It Affect the Market?',
      descrEn:
        'Learn what a Bitcoin-ETF is, how it impacts the cryptocurrency market, its advantages and disadvantages for investors from Arapov.trade.',
      descrUkr:
        'Дізнайтесь, що таке Bitcoin-ETF, як він впливає на ринок криптовалют, його переваги та недоліки для інвесторів від Arapov.trade.',
      descrRus:
        'Узнайте, что такое Bitcoin-ETF! Как он работает, плюсы и минусы, влияние на рынок криптовалют для трейдеров на Arapov.trade.',
      realTitleRus: 'Bitcoin-ETF: что это и как работает | Arapov.trade',
      realTitleUkr: 'Bitcoin-ETF: що це та як працює | Arapov.trade',
      realTitleEn: 'Bitcoin-ETF: What It Is and How It Works | Arapov.trade',
      linkUkr: 'bitcoinetf',
      imgUkr: '/assets/img/content/bitcoinetf.webp',
      groupsRus: ['Криптовалюта'],
      groupsUkr: ['Криптовалюта'],
      groupsEng: ['Cryptocurrency'],
      id: 23,
    },
    {
      titleUkr: 'Фігура "Прапор" у трейдингу',
      titleRus: 'Фигура Флаг в трейдинге',
      descrEn:
        'Learn how to recognize the Flag pattern in trading, trade breakouts, and avoid mistakes in strategies from ArapovTrade.',
      titleEn: 'Flag Pattern in Trading',
      descrUkr:
        'Дізнайтесь, як розпізнати фігуру Прапор у трейдингу, торгувати пробої та уникати помилок у стратегіях від ArapovTrade.',
      descrRus:
        'Руководство по паттерну «Флаг» в трейдинге: распознавайте сигнал, входите в сделки и управляйте рисками. Примеры и советы от Arapov.trade.',
      realTitleRus: 'Паттерн флаг в трейдинге: как торговать | Arapov.trade',
      realTitleEn: 'Flag Pattern in Trading: How to Trade | Arapov.trade',
      realTitleUkr: 'Фігура Прапор: як торгувати в трейдингу',
      linkUkr: 'flagfigure',
      imgUkr: '/assets/img/content/flagfigure.webp',
      groupsRus: ['Технический анализ'],
      groupsUkr: ['Технічний аналіз'],
      groupsEng: ['Technical Analysis'],
      id: 24,
    },
    {
      titleUkr: 'Функції маркет-мейкерів на ринку криптовалют',
      titleRus: 'Функции маркет-мейкеров на рынке криптовалют',
      descrEn:
        'Learn about the functions of market makers in the cryptocurrency market: liquidity provision, price stabilization, and trading support from ArapovTrade.',
      titleEn: 'Functions of Market Makers in the Cryptocurrency Market',
      descrUkr:
        'Дізнайтесь, як маркет-мейкери забезпечують ліквідність і стабільність цін на ринку криптовалют у трейдингу від ArapovTrade.',
      descrRus:
        'Функции маркет-мейкеров в крипторынке: обеспечение ликвидности, стабилизация цен и поддержка торговли. Роль маркет-мейкеров в развитии криптоиндустрии.',
      realTitleRus:
        'Маркет мейкер в крипторынке: функции и роль | Arapov.trade',
      realTitleEn:
        'Market Makers in Crypto Market: Functions and Role | Arapov.trade',
      realTitleUkr: 'Як працюють маркет-мейкери у крипто | Arapov.trade',
      linkUkr: 'cryptommakers',
      imgUkr: '/assets/img/content/cryptommakers.webp',
      groupsRus: ['Криптовалюта'],
      groupsUkr: ['Криптовалюта'],
      groupsEng: ['Cryptocurrency'],
      id: 25,
    },
    {
      titleUkr: 'Види ордерів на біржі',
      titleRus: 'Виды ордеров на бирже',
      titleEn: 'Types of Orders on the Exchange',
      descrEn:
        'Learn about the different types of orders on the exchange: market, limit, stop orders, and complex orders, their features and applications in trading from ArapovTrade.',
      descrUkr:
        'Дізнайтесь про види ордерів на біржі: ринкові, лімітні, стоп-ордери та складні, їх особливості та застосування в трейдингу від ArapovTrade.',
      descrRus:
        'Виды ордеров на бирже: рыночные, лимитные, стоп-ордера и сложные ордера. Узнайте, как выбирать и применять каждый тип для эффективного трейдинга.',
      realTitleRus: 'Виды ордеров на бирже: полный обзор | Arapov.trade',
      realTitleUkr: 'Види ордерів на біржі: як вибрати | Arapov.trade',
      realTitleEn:
        'Types of Orders on the Exchange: How to Choose | Arapov.trade',
      linkUkr: 'ordertypes',
      imgUkr: '/assets/img/content/ordertypes.webp',
      groupsRus: ['Объемный анализ рынка'],
      groupsUkr: ['Об`ємний аналіз ринку'],
      groupsEng: ['Market Volume Analysis'],
      id: 26,
    },
    {
      titleUkr: 'Як читати японські свічки',
      titleRus: 'Как читать японские свечи',
      descrEn:
        'Learn how to read Japanese candles: key formations, patterns like Hammer and Hanging Man, and their application in trading from ArapovTrade.',
      titleEn: 'How to Read Japanese Candles',
      descrUkr:
        'Дізнайтесь, як читати японські свічки: ключові формації, патерни типу молот і повішений та їх застосування в трейдингу від ArapovTrade.',
      descrRus:
        'Как читать японские свечи в трейдинге: разбор паттернов «молот», «повешенный» и других формаций для точного анализа рынка.',
      realTitleRus: 'Японские свечи в трейдинге: как читать | Arapov.trade',
      realTitleEn: 'Japanese Candles in Trading: How to Read | Arapov.trade',
      realTitleUkr: 'Японські свічки: як читати патерни',
      linkUkr: 'japanesecandle',
      imgUkr: '/assets/img/content/japanesecandle44.jpg',
      groupsRus: ['Технический анализ'],
      groupsUkr: ['Технічний аналіз'],
      groupsEng: ['Technical Analysis'],
      id: 27,
    },
    {
      titleUkr: 'Що таке альтернативні блокчейни',
      linkUkr: 'altblockchains',
      titleRus: 'Что такое альтернативные блокчейны',
      descrEn:
        'Learn what alternative blockchains are, their advantages, and differences from Bitcoin and Ethereum. A complete guide from Arapov.trade.',
      titleEn: 'What are Alternative Blockchains',
      descrUkr:
        'Що таке альтернативні блокчейни, їхні переваги та відмінності від Bitcoin і Ethereum. Повний гід від Arapov.trade.',
      descrRus:
        'Что такое альтернативные блокчейны: как они работают, их преимущества и отличия от Bitcoin и Ethereum. Обзор перспективных сетей нового поколения.',
      realTitleRus: 'Альтернативные блокчейны: обзор и отличия | Arapov.trade',
      realTitleEn:
        'Alternative Blockchains: Overview and Differences | Arapov.trade',
      realTitleUkr: 'Що таке альтернативні блокчейни? | Arapov.trade',
      imgUkr: '/assets/img/content/altblockchains.webp',
      groupsRus: ['Криптовалюта'],
      groupsUkr: ['Криптовалюта'],
      groupsEng: ['Cryptocurrency'],
      id: 28,
    },
    {
      titleUkr: 'Швидкий Старт у Трейдінгу',
      descrEn:
        'Learn how to quickly start trading, master key skills, and avoid common mistakes. A complete guide for beginners from ArapovTrade.',
      titleRus: 'Быстрый Старт в Трейдинге',
      titleEn: 'Trading Quick Start',
      descrUkr:
        'Узнайте, как быстро начать в трейдинге, освоить ключевые навыки и избежать распространённых ошибок. Полное руководство для новичков от ArapovTrade.',
      descrRus:
        'Узнайте, как быстро начать в трейдинге, освоить ключевые навыки и избежать распространённых ошибок. Полное руководство для новичков от ArapovTrade.',
      realTitleRus: 'Трейдинг для начинающих : как начать | Arapov.trade',
      realTitleEn: 'Trading for Beginners: How to Start | Arapov.trade',
      realTitleUkr: 'Трейдинг для початківців: як почати | Arapov.trade',
      linkUkr: 'tradingquickstart',
      imgUkr: '/assets/img/content/tradingquickstart.webp',
      groupsRus: ['Трейдинг для начинающих'],
      groupsUkr: ['Трейдинг для початківців'],
      groupsEng: ['Trading for Beginners'],
      id: 29,
    },
    {
      titleUkr: 'Основи Криптовалют для Трейдерів Початківців',
      linkUkr: 'cryptocurrencybasics',
      descrEn:
        'Learn the basics of cryptocurrencies, their features, and key trading principles for beginners. A practical guide from Arapov.trade.',
      titleRus: 'Основы Криптовалют для Начинающих Трейдеров',
      titleEn: 'Cryptocurrency Basics for Beginner Traders',
      descrUkr:
        'Дізнайтеся про основи криптовалют, їхні особливості та ключові принципи торгівлі для новачків. Практичний гід від Arapov.trade.',
      descrRus:
        'Узнайте основы криптовалют для начинающих трейдеров! Принципы торговли, особенности рынка и советы для старта на Arapov.trade.',
      realTitleRus: 'Трейдинг криптовалют: обучение для новичков| Arapov.trade',
      realTitleEn: 'Cryptocurrency Trading: Beginner’s Guide | Arapov.trade',
      realTitleUkr: 'Трейдинг криптовалют: гід для початківців | Arapov.trade',
      imgUkr: '/assets/img/content/cryptocurrencybasics44.webp',
      groupsRus: ['Трейдинг для начинающих'],
      groupsUkr: ['Трейдинг для початківців'],
      groupsEng: ['Trading for Beginners'],
      id: 30,
    },
    {
      titleUkr: 'Як будувати рівні в трейдингу',
      descrEn:
        'Learn how to build and use support and resistance levels in trading. A practical guide for traders | Igor Arapov.',
      titleRus: 'Как строить уровни в трейдинге',
      titleEn: 'How to Build Levels in Trading',
      descrUkr:
        'Дізнайтесь, як будувати та використовувати рівні підтримки й опору у трейдингу. Практичний гід для трейдерів | Ігор Арапов.',
      descrRus:
        'Узнайте, как строить и использовать уровни поддержки и сопротивления в трейдинге! Полное руководство для эффективных сделок | Игорь Арапов.',
      realTitleRus: 'Как строить уровни в трейдинге | Игорь Арапов',
      realTitleUkr: 'Як будувати рівні в трейдингу | Ігор Арапов',
      realTitleEn: 'How to Build Levels in Trading | Igor Arapov',
      linkUkr: 'levelofsupport',
      imgUkr: '/assets/img/content/levelofsupport.webp',
      groupsRus: ['Технический анализ'],
      groupsUkr: ['Технічний аналіз'],
      groupsEng: ['Technical Analysis'],
      id: 31,
    },
    {
      titleUkr: 'Чи варто купувати навчання трейдингу?',
      linkUkr: 'purchasingcourses',
      titleRus: 'Стоит ли покупать обучение трейдингу?',
      titleEn: 'Is It Worth Buying Trading Courses?',
      descrEn:
        'Is it worth investing in paid trading education? An overview of benefits, pitfalls, and tips for beginners from Arapov.trade.',
      descrUkr:
        'Чи варто інвестувати в платне навчання трейдингу? Огляд переваг, підводних каменів та поради для початківців від Arapov.trade.',
      descrRus:
        'Узнайте, стоит ли покупать обучение трейдингу! Преимущества курсов и как они помогут начать успешную карьеру трейдера на Arapov.trade.',
      realTitleRus: 'Стоит ли покупать обучение трейдингу? | Arapov.trade',
      realTitleEn: 'Is It Worth Buying Trading Courses? | Arapov.trade',
      realTitleUkr: 'Чи варто купувати навчання трейдингу? | Arapov.trade',
      imgUkr: '/assets/img/content/purchasingcourses44.jpg',
      groupsRus: ['Трейдинг для начинающих'],
      groupsUkr: ['Трейдинг для початківців'],
      groupsEng: ['Trading for Beginners'],
      id: 32,
    },
    {
      titleUkr: 'Пін бар - Грааль трейдингу',
      titleRus: 'Пин бар - Грааль трейдинга',
      titleEn: 'Pin Bar - The Holy Grail of Trading',
      descrEn:
        'What is a Pin Bar in trading? How to use this pattern for market analysis and effective trading decisions - a guide from Arapov.trade.',
      descrUkr:
        'Що таке Пін-бар у трейдингу? Як використовувати цей патерн для аналізу ринку та прийняття ефективних торгових рішень — гід від Arapov.trade.',
      descrRus:
        'Узнайте, как использовать пин-бар в трейдинге! Руководство по анализу рынка и торговым решениям с паттерном пин-бар на Arapov.trade.',
      realTitleRus: 'Пин-бар в трейдинге: как использовать | Arapov.trade',
      realTitleEn: 'Pin Bar in Trading: How to Use It | Arapov.trade',
      realTitleUkr: 'Пін-бар у трейдингу: як використовувати | Arapov.trade',
      linkUkr: 'pinbar',
      imgUkr: '/assets/img/content/pinbar44.jpg',
      groupsRus: ['Технический анализ'],
      groupsUkr: ['Технічний аналіз'],
      groupsEng: ['Technical Analysis'],
      id: 33,
    },
    {
      titleUkr: 'Як виставляти стоп-лос?',
      titleRus: 'Как выставлять стоп-лосс?',
      descrEn:
        'Learn how to set stop-loss in trading: strategies, mistakes, and calculation methods to reduce risks and protect capital from Arapov.trade.',
      titleEn: 'How to Set Stop-Loss?',
      descrUkr:
        'Дізнайтесь, як виставляти стоп-лосс у трейдингу: стратегії, помилки та методи розрахунку для зниження ризиків і захисту капіталу.',
      descrRus:
        'Узнайте, как правильно выставлять стоп-лосс! Стратегии, расчет и ошибки при установке Stop-Loss для минимизации рисков на Arapov.trade.',
      realTitleRus: 'Что такое стоп-лосс и как его выставлять | Arapov.trade',
      realTitleUkr: 'Що таке стоп-лосс і як його виставляти | Arapov.trade',
      realTitleEn: 'What is Stop-Loss and How to Set It | Arapov.trade',
      linkUkr: 'stoploss',
      imgUkr: '/assets/img/content/stoplossmain.png',
      groupsRus: ['Объемный анализ рынка'],
      groupsUkr: ['Об`ємний аналіз ринку'],
      groupsEng: ['Market Volume Analysis'],
      id: 34,
    },
    {
      titleUkr: 'Основи Трейдингу для Початківців',
      titleRus: 'Основы Трейдинга для Начинающих',
      descrEn:
        'Learn the basics of trading for beginners! A guide to trading types, basic strategies, risks, and tips for a successful market start from Arapov.trade.',
      titleEn: 'Trading Basics for Beginners',
      descrUkr:
        'Гід для новачків: види трейдингу, базові стратегії, ризики та поради для вдалого старту на ринку від Arapov.trade.',
      descrRus:
        'Узнайте основы трейдинга для начинающих! Руководство по стратегиям, рискам и советам для успешного старта на Arapov.trade.',
      realTitleRus: 'Основы трейдинга для начинающих | Arapov.trade',
      realTitleUkr: 'Основи трейдингу для початківців | Arapov.trade',
      realTitleEn: 'Trading Basics for Beginners | Arapov.trade',
      linkUkr: 'tradingbasics',
      imgUkr: '/assets/img/content/tradingbasics.webp',
      groupsRus: ['Трейдинг для начинающих'],
      groupsUkr: ['Трейдинг для початківців'],
      groupsEng: ['Trading for Beginners'],
      id: 35,
    },
    {
      titleUkr: 'Особливості ринку криптовалют',
      titleRus: 'Особенности рынка криптовалют',
      descrEn:
        'Learn the features of the cryptocurrency market! Key differences, trading strategies, and tips for successful earning on Arapov.trade.',
      titleEn: 'Features of the Cryptocurrency Market',
      descrUkr:
        'У чому особливості крипторинку? Дізнайтесь ключові відмінності, фактори впливу та ефективні стратегії торгівлі від Arapov.trade.',
      descrRus:
        'Узнайте особенности рынка криптовалют! Ключевые отличия, стратегии торговли и советы для успешного заработка на Arapov.trade.',
      realTitleRus: 'Рынок криптовалют: как анализировать | Arapov.trade',
      realTitleUkr: 'Ринок криптовалют: як аналізувати | Arapov.trade',
      realTitleEn: 'Cryptocurrency Market: How to Analyze | Arapov.trade',
      linkUkr: 'cryptocurrencytrading',
      imgUkr: '/assets/img/content/cryptocurrencytrading.webp',
      groupsRus: ['Трейдинг для начинающих'],
      groupsUkr: ['Трейдинг для початківців'],
      groupsEng: ['Trading for Beginners'],
      id: 36,
    },
    {
      titleUkr: 'Просадки у трейдингу',
      titleRus: 'Просадки в трейдинге',
      descrEn:
        'What are drawdowns in trading and how to manage them? Learn how to reduce risks and preserve profits through proper analysis from Arapov.trade.',
      titleEn: 'Drawdowns in Trading',
      descrUkr:
        'Що таке просадки в трейдингу та як ними керувати? Дізнайтесь, як знизити ризики та зберегти прибуток за допомогою грамотного аналізу.',
      descrRus:
        'Узнайте, как анализировать и управлять просадками в трейдинге! Советы по минимизации рисков и сохранению прибыли на Arapov.trade.',
      realTitleRus: 'Просадка в трейдинге: управление рисками | Arapov.trade',
      realTitleUkr: 'Просадка в трейдингу: як керувати ризиками  Arapov.trade',
      realTitleEn: 'Drawdown in Trading: Risk Management | Arapov.trade',
      linkUkr: 'drawdowns',
      imgUkr: ' /assets/img/content/drawdowns.webp',
      groupsRus: ['Трейдинг для начинающих'],
      groupsUkr: ['Трейдинг для початківців'],
      groupsEng: ['Trading for Beginners'],
      id: 37,
    },
    {
      titleUkr: 'Принципи зберігання криптовалют',
      titleRus: 'Принципы хранения криптовалют',
      descrEn:
        'What are the principles of cryptocurrency storage? Choosing wallets, security, and asset protection strategies. A complete guide for investors from Arapov.trade.',
      titleEn: 'Principles of Cryptocurrency Storage',
      descrUkr:
        'Принципи зберігання криптовалют: вибір гаманців, безпека та стратегії захисту активів. Повний посібник для інвесторів Arapov.trade.',
      descrRus:
        'Как безопасно хранить криптовалюту? Выбор кошельков, защита активов и советы инвесторам по безопасности на Arapov.trade.',
      realTitleRus: 'Безопасное хранение криптовалюты | Arapov.trade',
      realTitleUkr: 'Безпечне зберігання криптовалюти | Arapov.trade',
      realTitleEn: 'Safe Cryptocurrency Storage | Arapov.trade',
      linkUkr: 'cryptostoring',
      imgUkr: ' /assets/img/content/cryptostoring44.webp',
      groupsRus: ['Криптовалюта'],
      groupsEng: ['Cryptocurrency'],
      groupsUkr: ['Криптовалюта'],

      id: 38,
    },
    {
      titleUkr: 'Де безпечно зберігати криптовалюту',
      titleRus: 'Где безопасно хранить криптовалюту',
      titleEn: 'Where to Safely Store Cryptocurrency',
      descrEn:
        'Learn how to safely store cryptocurrency! Wallet selection tips, security principles, and best practices for protecting digital assets on Arapov.trade.',
      descrUkr:
        'Де безпечно зберігати криптовалюту? Поради щодо вибору гаманців, принципи безпеки та найкращі практики захисту цифрових активів.',
      descrRus:
        'Узнайте, как безопасно хранить криптовалюту! Советы по выбору кошельков, безопасности и защите активов на Arapov.trade.',
      realTitleRus: 'Где безопасно хранить криптовалюту | Arapov.trade',
      realTitleUkr: 'Де безпечно зберігати криптовалюту? | Arapov.trade',
      linkUkr: 'safetostorecrypto',
      imgUkr: '/assets/img/content/safetostorecrypto.webp',
      realTitleEn: 'Where to Safely Store Cryptocurrency? | Arapov.trade',
      groupsRus: ['Криптовалюта'],
      groupsUkr: ['Криптовалюта'],
      groupsEng: ['Cryptocurrency'],
      id: 39,
    },
    {
      titleUkr: 'Чому трейдинг такий складний?',
      titleRus: 'Почему трейдинг такой сложный ?',
      titleEn: 'Why is Trading So Difficult?',
      descrEn:
        'Learn why trading is considered a difficult profession and the factors that influence it. Tips for overcoming challenges and achieving success in trading.',
      descrUkr:
        'Дізнайтеся, чому трейдинг складний і які фактори впливають на успіх. Поради для подолання труднощів і досягнення результатів у трейдингу.',
      descrRus:
        'Узнайте, почему трейдинг считается сложной профессией и какие факторы влияют на это. Советы по преодолению трудностей и достижению успеха.',
      realTitleRus: 'Почему трейдинг такой сложный? | Arapov.trade',
      realTitleUkr: 'Чому трейдинг такий складний? | Arapov.trade',
      realTitleEn: 'Why is Trading So Difficult? | Arapov.trade',
      linkUkr: 'difficulttrading',
      imgUkr: '/assets/img/content/difficulttrading.webp',
      groupsRus: ['Трейдинг для начинающих'],
      groupsUkr: ['Трейдинг для початківців'],
      groupsEng: ['Trading for Beginners'],
      id: 40,
    },
    {
      titleUkr: 'Правила для Успішного Трейдингу',
      titleRus: 'Правила для Успешного Трейдинга',
      titleEn: 'Rules for Successful Trading',
      descrEn:
        'Learn the key rules for successful trading: strategies, risk management, broker selection, and market analysis for beginners and pros.',
      descrUkr:
        'Дізнайтеся ключові правила успішного трейдингу: стратегії, управління ризиками, вибір брокера та аналіз ринку для початківців і профі.',
      descrRus:
        'Полное руководство по успешному трейдингу: стратегии, управление рисками, выбор брокера, технический и фундаментальный анализ. Станьте успешным трейдером!',
      realTitleRus: 'Правила для успешного трейдинга | Arapov.trade',
      realTitleUkr: 'Правила успішного трейдингу | Arapov.trade',
      realTitleEn: 'Rules for Successful Trading | Arapov.trade',
      linkUkr: 'successfultrading',
      imgUkr: '/assets/img/content/successfultrading.webp',
      groupsRus: ['Трейдинг для начинающих'],
      groupsUkr: ['Трейдинг для початківців'],
      groupsEng: ['Trading for Beginners'],
      id: 41,
    },
    {
      titleUkr: 'Ризики криптовалют для початківців',
      linkUkr: 'cryptocurrencyrisks',

      titleRus: 'Риски криптовалют для начинающих ',
      descrEn:
        'Learn about the main cryptocurrency risks for beginners and how to manage them to minimize losses and protect investments.',
      titleEn: 'Cryptocurrency Risks for Beginners',
      descrUkr:
        'Дізнайтеся основні ризики криптовалют для початківців та як управляти ними, щоб мінімізувати втрати і захистити інвестиції.',
      descrRus:
        'Риски криптовалют для новичков: как управлять капиталом и избежать ошибок. Руководство от ArapovTrade по безопасному трейдингу.',
      realTitleRus: 'Риски криптовалют для новичков | ArapovTrade',
      realTitleUkr: 'Ризики криптовалют для початківців | Arapov.trade',
      imgUkr: '/assets/img/content/cryptocurrencyrisks.webp',
      realTitleEn: 'Cryptocurrency Risks for Beginners | Arapov.trade',
      groupsRus: ['Трейдинг для начинающих'],
      groupsUkr: ['Трейдинг для початківців'],
      groupsEng: ['Trading for Beginners'],
      id: 42,
    },
    {
      titleUkr: 'Аналіз попиту та пропозиції на ринку криптовалют',
      linkUkr: 'cryptomarketanalysis',
      titleRus: 'Анализ спроса и предложения на рынке криптовалют',
      descrEn:
        'Learn how to analyze supply and demand in the cryptocurrency market. Tips, tools, and strategies for successful trading from ArapovTrade.',
      titleEn: 'Supply and Demand Analysis in the Cryptocurrency Market',
      descrUkr:
        'Дізнайтеся, як аналізувати попит і пропозицію на крипторинку. Поради, інструменти та стратегії для успішної торгівлі.',
      descrRus:
        'Анализ спроса и предложения в криптовалютах: как торговать? Гид от ArapovTrade по стратегиям и инвестициям.',
      realTitleRus: 'Спрос и предложение в криптовалютах | ArapovTrade',
      realTitleUkr: 'Аналіз попиту і пропозиції на крипторинку | Arapov.trade',
      realTitleEn: 'Supply and Demand Analysis in Crypto Market | Arapov.trade',
      imgUkr: '/assets/img/content/cryptomarketanalysis.png',
      groupsRus: ['Криптовалюта'],
      groupsUkr: ['Криптовалюта'],
      groupsEng: ['Cryptocurrency'],
      id: 43,
    },
    {
      titleUkr: 'Переваги та ризики криптостейкінгу',
      titleRus: 'Преимущества и риски криптостейкинга',
      titleEn: 'Advantages and Risks of Crypto Staking',
      descrEn:
        'Learn about the advantages and risks of crypto staking. How to earn on cryptocurrencies with minimal risks and avoid common mistakes.',
      descrUkr:
        'Дізнайтеся про переваги та ризики криптостейкінгу. Як заробляти на криптовалютах з мінімальними ризиками і уникати типових помилок.',
      descrRus:
        'Преимущества и риски криптостейкинга: как зарабатывать на криптовалютах с минимальными рисками и избегать ошибок. Практические советы от ArapovTrade.',
      realTitleRus: 'Что такое стейкинг криптовалюты? | ArapovTrade',
      realTitleUkr: 'Що таке стейкінг криптовалюти? | Arapov.trade',
      realTitleEn: 'What is Cryptocurrency Staking? | Arapov.trade',
      linkUkr: 'cryptostaking',
      imgUkr: '/assets/img/content/cryptostaking44.jpg',
      groupsRus: ['Криптовалюта'],
      groupsUkr: ['Криптовалюта'],
      groupsEng: ['Cryptocurrency'],
      id: 44,
    },
    {
      titleUkr: 'Як застосовувати ковзні середні у Трейдингу?',
      linkUkr: 'movingaverages',
      titleRus: 'Как применять скользящие средние в Трейдинге?',
      descrEn:
        'Learn about types of moving averages and strategies for using them to analyze trends and make trading decisions.',
      titleEn: 'How to Use Moving Averages in Trading?',
      descrUkr:
        'Дізнайтеся про типи ковзних середніх і стратегії їх застосування для аналізу трендів і прийняття рішень у трейдингу.',
      descrRus:
        'Скользящие средние: как применять в трейдинге? Руководство от ArapovTrade по стратегиям и анализу трендов.',
      realTitleRus: 'Скользящие средние в трейдинге | ArapovTrade',
      realTitleUkr:
        'Ковзні середні в трейдингу: типи і стратегії | Arapov.trade',
      realTitleEn:
        'Moving Averages in Trading: Types and Strategies | Arapov.trade',
      imgUkr: '/assets/img/content/movingaverages.webp',
      groupsRus: ['Технический анализ'],
      groupsUkr: ['Технічний аналіз'],
      groupsEng: ['Technical Analysis'],
      id: 45,
    },
    {
      titleUkr: 'Bitcoin Pizza Day: історія, значення та традиції',
      titleRus: 'Bitcoin Pizza Day: история, значение и традиции',
      descrEn:
        'Learn about Bitcoin Pizza Day — the first purchase with bitcoins, the history of this day, and traditions of celebration in the cryptocurrency world.',
      titleEn: 'Bitcoin Pizza Day: History, Significance, and Traditions',
      descrUkr:
        'Дізнайтеся про Bitcoin Pizza Day — першу покупку за біткоїни, історію цього дня та традиції святкування у світі криптовалют.',
      descrRus:
        'Bitcoin Pizza Day: история и значение первой сделки за биткоины. Бесплатное руководство от ArapovTrade о криптовалютах.',
      realTitleRus: 'Bitcoin Pizza Day: что это? | ArapovTrade',
      realTitleUkr: 'Bitcoin Pizza Day: історія та значення | Arapov.trade',
      realTitleEn: 'Bitcoin Pizza Day: History and Significance | Arapov.trade',
      linkUkr: 'pizzaday',
      imgUkr: '/assets/img/content/pizzaday44.webp',
      groupsRus: ['Криптовалюта'],
      groupsUkr: ['Криптовалюта'],
      groupsEng: ['Cryptocurrency'],
      id: 46,
    },
    {
      titleUkr: 'Фундаментальний Аналіз ринку',
      titleRus: 'Фундаментальный Анализ рынка ',
      titleEn: 'Fundamental Market Analysis',
      descrEn:
        'Learn the basics of fundamental market analysis: how to evaluate economic indicators, news, and their impact on trading and investing.',
      descrUkr:
        'Дізнайтеся основи фундаментального аналізу ринку: як оцінювати економічні показники, новини та їх вплив на трейдинг і інвестиції.',
      descrRus:
        'Фундаментальный анализ рынка: как применять в трейдинге. Узнайте об основных принципах, стратегиях и макроэкономических факторах с ArapovTrade.',
      realTitleRus: 'Фундаментальный анализ рынка | ArapovTrade',
      realTitleUkr: 'Фундаментальний аналіз ринку | Arapov.trade',
      realTitleEn: 'Fundamental Market Analysis | Arapov.trade',
      linkUkr: 'fundamentalanalysis',
      imgUkr: '/assets/img/content/fundamentalanalysis.webp',
      groupsRus: ['Фундаментальный анализ'],
      groupsUkr: ['Фундаментальний аналіз'],
      groupsEng: ['Fundamental Analysis'],
      id: 47,
    },

    {
      titleUkr: 'Як обрати торгову платформу для трейдингу',
      linkUkr: 'choosingtradingplatform',
      titleRus: 'Как выбрать торговую платформу для трейдинга',
      titleEn: 'How to Choose a Trading Platform',
      descrEn:
        'Learn how to choose a trading platform: useful tips, selection criteria, and an overview of the best platforms for traders from ArapovTrade.',
      descrUkr:
        'Дізнайтеся, як обрати торгову платформу для трейдингу: корисні поради, критерії вибору та огляд найкращих платформ для трейдерів.',
      descrRus:
        'Как выбрать торговую платформу для трейдинга? Советы, критерии выбора и лучшие платформы для начинающих и опытных трейдеров от ArapovTrade.',
      realTitleRus: 'Как выбрать торговую платформу для трейдинга?',
      realTitleUkr: 'Як обрати торгову платформу для трейдингу | Arapov.trade',
      realTitleEn: 'How to Choose a Trading Platform | Arapov.trade',
      imgUkr: '/assets/img/content/choosingtradingplatform.webp',
      groupsRus: ['Трейдинг для начинающих'],
      groupsUkr: ['Трейдинг для початківців'],
      groupsEng: ['Trading for Beginners'],
      id: 49,
    },
    {
      titleUkr: 'Алгоритмічні Ордери на Біржі',
      titleRus: 'Алгоримические Ордера на Бирже',
      titleEn: 'Algorithmic Orders on the Exchange',
      descrEn:
        'Learn about algorithmic orders on the exchange: types, advantages, risks, and their use in trading from ArapovTrade.',
      descrUkr:
        'Дізнайтесь про алгоритмічні ордери на біржі: типи, переваги, ризики та їх використання в трейдингу від ArapovTrade.',
      descrRus:
        'Что такое алгоритмические ордера? Типы, плюсы и риски. Узнайте, как автоматизировать трейдинг и повысить эффективность сделок с ArapovTrade',
      realTitleRus: 'Алгоритмические ордера на бирже | Arapov.trade',
      realTitleEn: 'Algorithmic Orders on the Exchange | Arapov.trade',
      realTitleUkr: 'Алгоритмічні ордери: як працюють',
      linkUkr: 'algorithmicorders',
      imgUkr: '/assets/img/content/algorithmicorders.webp',
      groupsRus: ['Объемный анализ рынка'],
      groupsUkr: ['Об`ємний аналіз ринку'],
      groupsEng: ['Market Volume Analysis'],
      id: 50,
    },
    {
      titleUkr: 'Свічні патерни в Price Action',
      titleRus: 'Свечные паттерны в Price Action',
      titleEn: 'Candlestick Patterns in Price Action',
      descrEn:
        'Learn about Price Action: principles, patterns, and trading strategies for beginners and pros from ArapovTrade.',
      descrUkr:
        'Дізнайтесь про Price Action: принципи, патерни та стратегії трейдингу для початківців і професіоналів від ArapovTrade.',
      descrRus:
        'Price Action: как торговать без индикаторов? Руководство от ArapovTrade по свечным паттернам, стратегиям и анализу для трейдеров.',
      realTitleRus: 'Price Action в трейдинге: руководство | ArapovTrade',
      realTitleEn: 'Price Action in Trading: A Guide | ArapovTrade',
      realTitleUkr: 'Price Action: стратегії трейдингу',
      linkUkr: 'candlestickpatterns',
      imgUkr: '/assets/img/content/candlestickpatterns.webp',
      groupsRus: ['Технический анализ'],
      groupsUkr: ['Технічний аналіз'],
      groupsEng: ['Technical Analysis'],
      id: 51,
    },
    {
      titleUkr: 'Анатомія трендів на ринку',
      titleRus: 'Анатомия трендов на рынке',
      titleEn: 'Anatomy of Market Trends',
      descrEn:
        'Learn about market trends: phases, types, analysis methods, and trading strategies from ArapovTrade.',
      realTitleUkr: 'Тренди на ринку: аналіз і стратегії',
      descrRus:
        'Анатомия трендов: как анализировать рынок? Руководство от ArapovTrade по фазам, индикаторам и стратегиям.',
      realTitleRus: 'Тренды рынка в трейдинге | ArapovTrade',
      realTitleEn: 'Anatomy of Market Trends in Trading | ArapovTrade',
      descrUkr:
        'Дізнайтесь, що таке тренди на ринку, їх фази, типи, методи аналізу та стратегії трейдингу від ArapovTrade.',
      linkUkr: 'anatomyofmarkettrends',
      imgUkr: '/assets/img/content/anatomyofmarkettrends.webp',
      groupsRus: ['Объемный анализ рынка'],
      groupsUkr: ['Об`ємний аналіз ринку'],
      groupsEng: ['Market Volume Analysis'],
      id: 52,
    },
    {
      titleRus: 'Что такое ордер блок?',
      titleUkr: 'Що таке ордер блок?',
      titleEn: 'What is an Order Block?',
      descrEn:
        'Learn about order blocks in trading: how to identify and use them in trading strategies from ArapovTrade.',
      descrUkr:
        'Дізнайтесь, що таке ордер блок у трейдингу, як його визначити та використовувати в торгових стратегіях від ArapovTrade.',
      descrRus:
        'Узнайте, что такое ордерный блок (Order Block), изучите его типы и научитесь эффективно торговать. Полное руководство для трейдеров',
      realTitleRus:
        'Что такое ордер блок (Order Block) в трейдинге | ArapovTrade',
      realTitleEn: 'What is an Order Block in Trading | ArapovTrade',
      realTitleUkr:
        'Що таке ордер блок у трейдингу (Order Block) | ArapovTrade',
      linkUkr: 'orderblockintrading',
      imgUkr: '/assets/img/content/orderblockintrading.webp',
      groupsRus: ['Концепция Смарт Мани'],
      groupsUkr: ['Концепція Смарт Мані'],
      groupsEng: ['Smart Money Concept'],
      id: 53,
    },
    {
      titleUkr: 'Як забезпечити безпеку криптовалюти',
      titleRus: 'Как обеспечить безопасность криптовалюты',
      titleEn: 'How to Ensure Cryptocurrency Security',
      descrEn:
        'Learn how to secure your cryptocurrency: asset protection, theft risk minimization, and privacy tips from ArapovTrade.',
      descrUkr:
        'Дізнайтесь, як забезпечити безпеку криптовалюти: захист активів, мінімізація ризиків крадіжки та конфіденційність від ArapovTrade.',
      descrRus:
        'Как защитить криптовалюту от кражи? Советы по безопасности, управлению активами и конфиденциальности от Arapov.trade',
      realTitleRus: 'Как обеспечить безопасность криптовалюты - Arapov.trade',
      realTitleEn: 'How to Ensure Cryptocurrency Security - Arapov.trade',
      realTitleUkr: 'Як захистити криптовалюту від ризиків',
      linkUkr: 'cryptosafe',
      imgUkr: '/assets/img/content/cryptosafe44.webp',
      groupsRus: ['Криптовалюта'],
      groupsUkr: ['Криптовалюта'],
      groupsEng: ['Cryptocurrency'],
      id: 54,
    },
    {
      titleUkr: 'Скальпінг у трейдингу',
      titleRus: 'Скальпинг в трейдинге',
      titleEn: 'Scalping in Trading',
      descrEn:
        'Learn about scalping in trading: strategies, indicators, risks, and automation for short-term trades from ArapovTrade.',
      descrUkr:
        'Дізнайтесь про скальпінг у трейдингу: стратегії, індикатори, ризики та автоматизація для короткострокових угод від ArapovTrade.',
      descrRus:
        'Скальпинг в трейдинге: стратегии, индикаторы, риски. Научитесь зарабатывать на краткосрочных сделках с помощью полного гида от ArapovTrade',
      realTitleRus: 'Скальпинг в трейдинге: Полное руководство | ArapovTrade',
      realTitleEn: 'Scalping in Trading: A Complete Guide | ArapovTrade',
      realTitleUkr: 'Скальпінг у трейдингу: стратегії | ArapovTrade',
      linkUkr: 'scalpingintrading',
      imgUkr: '/assets/img/content/scalpingintrading.webp',
      groupsRus: ['Трейдинг для начинающих'],
      groupsUkr: ['Трейдинг для початківців'],
      groupsEng: ['Trading for Beginners'],
      id: 55,
    },
    {
      titleUkr: 'Книги з трейдингу - в чому користь для початківців?',
      linkUkr: 'benefitsoftradingbooks',
      titleRus: 'Книги по трейдингу в чем польза для начинающих ?',
      titleEn: 'Trading Books - What Are the Benefits for Beginners?',
      descrEn:
        'Learn how trading books help beginners: recommendations and best editions for starting in financial markets from ArapovTrade.',
      descrUkr:
        'Дізнайтесь, як книги з трейдингу допомагають початківцям: рекомендації та кращі видання для старту на фінансових ринках від ArapovTrade.',
      descrRus:
        'Книги по трейдингу для новичков: лучшие рекомендации и польза. Руководство от ArapovTrade для старта на финансовых рынках.',
      realTitleRus: 'Книги по трейдингу для новичков | ArapovTrade',
      realTitleEn: 'Trading Books for Beginners | ArapovTrade',
      realTitleUkr: 'Книги з трейдингу для початківців',
      imgUkr: '/assets/img/content/benefitsoftradingbooks.webp',
      groupsRus: ['Трейдинг для начинающих'],
      groupsUkr: ['Трейдинг для початківців'],
      groupsEng: ['Trading for Beginners'],
      id: 56,
    },
    {
      titleUkr: 'Індикатори в трейдингу',
      titleRus: 'Индикаторы в трейдинге',
      titleEn: 'Indicators in Trading',
      descrEn:
        'Learn about trading indicators: types, applications, RSI and MACD strategies for market analysis from ArapovTrade.',
      descrUkr:
        'Дізнайтесь про індикатори трейдингу: види, застосування, стратегії з RSI та MACD для аналізу ринку від ArapovTrade.',
      descrRus:
        'Индикаторы в трейдинге: RSI, MACD и стратегии. Руководство от ArapovTrade по анализу рынка для новичков и профи.',
      realTitleRus: 'Индикаторы в трейдинге: руководство | ArapovTrade',
      realTitleEn: 'Indicators in Trading: A Guide | ArapovTrade',
      realTitleUkr: 'Індикатори трейдингу: як застосовувати',
      linkUkr: 'tradingindicators',
      imgUkr: '/assets/img/content/tradingindicators.webp',
      groupsRus: ['Технический анализ'],
      groupsUkr: ['Технічний аналіз'],
      groupsEng: ['Technical Analysis'],
      id: 57,
    },
    {
      titleUkr: 'Усереднення у трейдингу ',
      titleRus: 'Усреднение в трейдинге',
      titleEn: 'Averaging in Trading',
      descrEn:
        'Learn how to use averaging in trading: methods, advantages, risks, and strategies for effective trading from ArapovTrade.',
      descrUkr:
        'Дізнайтесь, як використовувати усереднення в трейдингу: методи, переваги, ризики та стратегії для ефективної торгівлі від ArapovTrade.',
      descrRus:
        'Усреднение в трейдинге: как применять и когда избегать? Советы от ArapovTrade по стратегиям, рискам и управлению позицией',
      realTitleRus: 'Усреднение в трейдинге | ArapovTrade',
      realTitleEn: 'Averaging in Trading | ArapovTrade',
      realTitleUkr: 'Усереднення в трейдингу: як застосовувати',
      linkUkr: 'averagingintrading',
      imgUkr: '/assets/img/content/averagingintrading.webp',
      groupsRus: ['Трейдинг для начинающих'],
      groupsUkr: ['Трейдинг для початківців'],
      groupsEng: ['Trading for Beginners'],
      id: 58,
    },
    {
      titleUkr: 'Як торгувати Пробій рівня у трейдингу ',
      linkUkr: 'levelbreakoutstrategy',
      titleRus: 'Как торговать Пробой уровня в трейдинге',
      titleEn: 'How to Trade Level Breakout in Trading',
      descrEn:
        'Learn how to trade level breakouts in trading: identifying key levels, working with pin bars and volume from ArapovTrade.',
      descrUkr:
        'Дізнайтесь, як торгувати пробій рівня в трейдингу: визначення рівнів, робота з пін-баром та обсягами від ArapovTrade.',
      descrRus:
        'Узнайте, как торговать пробой уровня: определение ключевых зон, пин-бары, объёмы. Практические советы от ArapovTrade',
      realTitleRus: 'Как торговать пробой уровня в трейдинге | ArapovTrade',
      realTitleEn: 'How to Trade Level Breakout in Trading | ArapovTrade',
      realTitleUkr: 'Пробій рівня: як торгувати в трейдингу',
      imgUkr: '/assets/img/content/levelbreakoutstrategy.webp',
      groupsRus: ['Технический анализ'],
      groupsUkr: ['Технічний аналіз'],
      groupsEng: ['Technical Analysis'],
      id: 59,
    },
    {
      titleUkr: 'Трейдинг Vs Опціони порівняння інструментів',
      linkUkr: 'tradingvsoptions',
      titleRus: 'Трейдинг Vs Опционы сравнение инструментов',
      titleEn: 'Trading Vs Options Comparison of Instruments',
      descrEn:
        'Trading or options: what to choose as a trader? Comparison of strategies, risks, and advantages for successful trading with Arapov.trade',
      descrUkr:
        'Порівняння трейдингу та опціонів. Переваги, недоліки, стратегії та ризики для різних типів трейдерів на Arapov.trade.',
      descrRus:
        'Трейдинг или опционы: что выбрать трейдеру? Сравнение стратегий, рисков и преимуществ для успешной торговли с Arapov.trade',
      realTitleRus: 'Трейдинг vs опционы: что выбрать трейдеру | Arapov.trade',
      realTitleUkr: 'Трейдинг Vs Опціони: порівняння інструментів',
      realTitleEn: 'Trading Vs Options: Comparison of Instruments',
      imgUkr: '/assets/img/content/tradingvsoptions.webp',
      groupsRus: ['Трейдинг для начинающих'],
      groupsUkr: ['Трейдинг для початківців'],
      groupsEng: ['Trading for Beginners'],
      id: 60,
    },
    {
      titleUkr: '10 порад трейдерам-початківцям',
      linkUkr: 'adviceforbeginners',
      titleRus: '10 советов начинающим трейдерам',
      titleEn: '10 Tips for Beginner Traders',
      descrEn:
        'Discover 10 practical tips for beginner traders: how to avoid common mistakes, manage risks, and build your own strategy with Arapov.trade.',
      descrUkr:
        'Дізнайтеся 10 практичних порад для новачків у трейдингу: як уникати типових помилок, керувати ризиками та будувати власну стратегію.',
      descrRus:
        'Узнайте 10 ключевых советов для начинающих трейдеров: управление рисками, разработка стратегии и избегание ошибок. Советы от Arapov.trade.',
      realTitleRus: '10 советов начинающим трейдерам | Arapov.trade',
      realTitleUkr: '10 порад для початківців у трейдингу – Arapov.trade',
      realTitleEn: '10 Tips for Beginner Traders – Arapov.trade',
      imgUkr: ' /assets/img/content/TipsForStarters.webp',
      groupsRus: ['Трейдинг для начинающих'],
      groupsUkr: ['Трейдинг для початківців'],
      groupsEng: ['Trading for Beginners'],
      id: 61,
    },
    {
      titleUkr: 'Криптовалюта Tether (usdt)',
      linkUkr: 'cryptotether',
      titleRus: 'Криптовалюта Tether (usdt)',
      titleEn: 'Cryptocurrency Tether (USDT)',
      descrEn:
        'Learn about Tether (USDT): what it is, how it works, advantages, risks, and its role in the crypto market. A guide for traders from ArapovTrade.',
      descrUkr:
        'Дізнайтесь про Tether (USDT): що це, як працює, переваги, ризики та роль на крипторинку. Посібник для трейдерів від ArapovTrade.',
      descrRus:
        'Узнайте, что такое Tether (USDT)! Как работает, преимущества, риски и роль на крипторынке для трейдеров на Arapov.trade.',
      realTitleRus: 'Что такое Tether (USDT) | Arapov.trade',
      realTitleEn: 'What is Tether (USDT) | Arapov.trade',
      realTitleUkr: 'Що таке Tether (USDT) | Arapov.trade',
      imgUkr: '/assets/img/content/cryptotether.webp',
      groupsRus: ['Криптовалюта'],
      groupsUkr: ['Криптовалюта'],
      groupsEng: ['Cryptocurrency'],
      id: 62,
    },
    {
      titleUkr: 'Основи ринку. Терміни',
      linkUkr: 'marketbasics',
      titleRus: 'Основы рынка. Термины',
      titleEn: 'Market Basics. Terms',
      descrEn:
        'Learn key financial market terms! Basics of stock, forex, and crypto trading in the dictionary on Arapov.trade.',
      descrUkr:
        'Основні терміни ринку для трейдерів-початківців: фондовий, валютний і крипторинок, стратегії торгівлі та фінансовий аналіз.',
      descrRus:
        'Узнайте ключевые термины финансового рынка! Основы фондового, валютного и криптовалютного трейдинга в словаре на Arapov.trade.',
      realTitleRus: 'Словарь терминов рынка: основы | Arapov.trade',
      realTitleUkr: 'Словник термінів фінансового ринку | Arapov.trade',
      realTitleEn: 'Market Terms Dictionary | Arapov.trade',
      imgUkr: '/assets/img/content/osnovirinka.webp',
      groupsRus: ['Трейдинг для начинающих'],
      groupsUkr: ['Трейдинг для початківців'],
      groupsEng: ['Trading for Beginners'],
      id: 63,
    },
    {
      titleUkr: 'Знайомство з біржею',
      linkUkr: 'exchange',
      titleRus: 'Знакомство с биржей',
      titleEn: 'Introduction to the Exchange',
      descrEn:
        'Learn what an exchange is! Types, functions, trading features, and tips for beginners and pros in trading on Arapov.trade.',
      descrUkr:
        'Дізнайтесь, що таке біржа, її види, функції та особливості торгівлі. Посібник для початківців і трейдерів від ArapovTrade.',
      descrRus:
        'Узнайте, что такое биржа! Виды, функции, особенности торговли и советы для новичков и профессионалов в трейдинге на Arapov.trade.',
      realTitleRus: 'Что такое биржа: полное руководство | Arapov.trade',
      realTitleEn: 'What is an Exchange: A Complete Guide | Arapov.trade',
      realTitleUkr: 'Що таке біржа: повний посібник | Arapov.trade',
      imgUkr: '/assets/img/content/znakomstvosbirgey.webp',
      groupsRus: ['Словарь трейдера'],
      groupsUkr: ['Словник трейдера'],
      groupsEng: ['Trader`s Dictionary'],
      id: 64,
    },
    {
      titleUkr: 'Біржовий та позабіржовий ринки',
      linkUkr: 'exchangemarket',
      titleRus: 'Биржевой и внебиржевой рынки',
      titleEn: 'Exchange and Over-the-Counter Markets',
      descrEn:
        'Learn about exchange and over-the-counter markets: differences, features, pros and cons. A guide for traders from ArapovTrade.',
      descrUkr:
        'Дізнайтесь про біржові та позабіржові ринки: відмінності, особливості, переваги й недоліки. Посібник для трейдерів від ArapovTrade.',
      descrRus:
        'Узнайте о биржевых и внебиржевых рынках! Различия, особенности и советы для трейдеров и инвесторов на Arapov.trade.',
      realTitleRus: 'Биржевые и внебиржевые рынки | Arapov.trade',
      realTitleEn: 'Exchange and OTC Markets | Arapov.trade',
      realTitleUkr: 'Біржові та позабіржові ринки: огляд',
      imgUkr: '/assets/img/content/exchangemarkets.webp',
      groupsRus: ['Словарь трейдера'],
      groupsUkr: ['Словник трейдера'],
      groupsEng: ['Trader`s Dictionary'],
      id: 65,
    },
    {
      titleUkr: 'Деривативи та їх види',
      linkUkr: 'derivatives',
      titleRus: 'Деривативы и их виды',
      titleEn: 'Derivatives and Their Types',
      descrEn:
        'Learn about derivatives: types, applications, and their impact on financial markets. A guide for traders and investors from ArapovTrade.',
      descrUkr:
        'Дізнайтесь про деривативи, їх види, застосування та вплив на фінансові ринки. Посібник для трейдерів та інвесторів від ArapovTrade.',
      descrRus:
        'Узнайте, что такое деривативы! Виды, применение и их влияние на финансовые рынки для трейдеров на Arapov.trade.',
      realTitleRus: 'Деривативы: виды и применение | Arapov.trade',
      realTitleEn: 'Derivatives: Types and Applications | Arapov.trade',
      realTitleUkr: 'Деривативи: види та застосування',
      imgUkr: '/assets/img/content/dericativessBebPack.webp',
      groupsRus: ['Словарь трейдера'],
      groupsUkr: ['Словник трейдера'],
      groupsEng: ['Trader`s Dictionary'],
      id: 66,
    },
    {
      titleUkr: 'Алгоритмічні стейблкоіни',
      linkUkr: 'stablecoins',
      titleRus: 'Алгоритмические стейблкоины',
      titleEn: 'Algorithmic Stablecoins',
      descrUkr:
        'Дізнайтесь про алгоритмічні стейблкоїни: принцип роботи, плюси, мінуси та їх роль у криптотрейдингу. Посібник від ArapovTrade.',
      descrRus:
        'Узнайте, как работают алгоритмические стейблкоины, в чём их преимущества и риски. Полное руководство для трейдеров и инвесторов на Arapov.trade.',
      realTitleRus: 'Алгоритмические стейблкоины: как работают | Arapov.trade',
      realTitleUkr: 'Алгоритмічні стейблкоїни: як працюють',
      realTitleEn: 'Algorithmic Stablecoins: How They Work',
      imgUkr: '/assets/img/content/stablecoins.webp',
      groupsRus: ['Криптовалюта'],
      descrEn:
        'Learn about algorithmic stablecoins: how they work, pros and cons, and their role in crypto trading. A guide from ArapovTrade.',
      groupsUkr: ['Криптовалюта'],
      groupsEng: ['Cryptocurrency'],
      id: 67,
    },
    {
      titleUkr: 'Ринок FOREX',
      linkUkr: 'forexmarket',
      titleRus: 'Рынок FOREX',
      descrEn:
        'Learn about the FOREX market: how it works, participants, trading sessions, and strategies used by traders of all levels. A complete guide from Arapov.trade.',
      titleEn: 'FOREX Market',
      descrUkr:
        'Дізнайтеся, як працює ринок FOREX, хто на ньому торгує, які існують торгові сесії та які стратегії використовують трейдери різного рівня.',
      descrRus:
        'Узнайте, как работает рынок FOREX: особенности, участники, торговые сессии и стратегии. Полное руководство для трейдера от Arapov.trade.',
      realTitleRus: 'Что такое рынок FOREX: основы и стратегии | Arapov.trade',
      realTitleEn:
        'What is the FOREX Market: Basics and Strategies | Arapov.trade',
      realTitleUkr: 'Ринок FOREX: особливості, учасники та торгові сесії',
      imgUkr: '/assets/img/content/ForexMarket.webp',
      groupsRus: ['Словарь трейдера'],
      groupsUkr: ['Словник трейдера'],
      groupsEng: ['Trader`s Dictionary'],
      id: 68,
    },
    {
      titleUkr: 'Валюти та їх котирування',
      linkUkr: 'currenciesandquotes',
      titleRus: 'Валюты и их котировки',
      titleEn: 'Currencies and Their Quotes',
      descrEn:
        'Learn about currencies and their quotes! Types, features, and use in trading and finance on Arapov.trade.',
      descrUkr:
        'Дізнайтесь про валюти, їх види, котирування та використання в торгівлі й на фінансових ринках. Посібник для трейдерів від ArapovTrade.',
      descrRus:
        'Узнайте о валютах и их котировках! Виды, особенности и использование в трейдинге и финансах на Arapov.trade.',
      realTitleRus: 'Валюты и котировки в трейдинге | Arapov.trade',
      realTitleEn: 'Currencies and Quotes in Trading | Arapov.trade',
      realTitleUkr: 'Валюти та котирування: основи трейдингу',
      imgUkr: '/assets/img/content/currencies.webp',
      groupsRus: ['Словарь трейдера'],
      groupsUkr: ['Словник трейдера'],
      groupsEng: ['Trader`s Dictionary'],
      id: 69,
    },
    {
      titleUkr: 'Формування курсу валют',
      linkUkr: 'formationexchange',
      titleRus: 'Формирование курса валют',
      descrEn:
        'Learn how exchange rates are formed: key economic and market factors, their impact on prices, and practical tips for traders from Arapov.trade.',
      titleEn: 'Formation of Exchange Rates',
      realTitleUkr: 'Формування курсу валют: фактори впливу',
      descrRus:
        'Узнайте, как формируется курс валют: основные экономические и рыночные факторы, их влияние на цены и практические советы трейдерам от Arapov.trade.',
      realTitleRus: 'Курс валют: ключевые факторы и влияние | Arapov.trade',
      realTitleEn: 'Exchange Rates: Key Factors and Impact | Arapov.trade',
      descrUkr:
        'Дізнайтесь, як формується курс валют, які фактори впливають та їх роль в економіці. Посібник для трейдерів від ArapovTrade.',
      imgUkr: '/assets/img/content/formationExchange.webp',
      groupsRus: ['Словарь трейдера'],
      groupsUkr: ['Словник трейдера'],
      groupsEng: ['Trader`s Dictionary'],
      id: 70,
    },
    {
      titleUkr: 'Позиція: поняття, види і типи',
      linkUkr: 'currencyposition',
      titleRus: 'Позиция: понятия, виды и типы',
      descrEn:
        'Learn about positions in trading: types, rollovers, settlement dates, and examples. A guide for traders from ArapovTrade.',
      titleEn: 'Position: Concepts, Types, and Kinds',
      descrUkr:
        'Дізнайтесь про позиції в трейдингу: види, перенесення, дата валютування та приклади. Посібник для трейдерів від ArapovTrade.',
      descrRus:
        'Что такое позиции в трейдинге? Узнайте виды позиций, как происходит перенос и что значит дата валютирования. Полезно трейдерам и инвесторам.',
      realTitleRus: 'Позиции в трейдинге: виды и перенос | Arapov.trade',
      realTitleEn: 'Positions in Trading: Types and Rollovers | Arapov.trade',
      realTitleUkr: 'Позиції в трейдингу: види та валютування',
      imgUkr: '/assets/img/content/currencyPosition.webp',
      groupsRus: ['Словарь трейдера'],
      groupsUkr: ['Словник трейдера'],
      groupsEng: ['Trader`s Dictionary'],
      id: 71,
    },
    {
      titleUkr: 'Як почати торгувати на біржі',
      linkUkr: 'cryptostart',
      titleRus: 'Как начать торговать на бирже',
      titleEn: 'How to Start Trading on a  Exchange',
      realTitleUkr: 'Як торгувати на криптобіржі | ArapovTrade',
      descrEn:
        'Learn how to start trading on a crypto exchange! Platform selection, registration, strategies, and risk management tips from Arapov.trade.',
      descrRus:
        'Узнайте, как начать торговать на бирже! Выбор платформы, регистрация, стратегии и советы по управлению рисками на Arapov.trade.',
      realTitleRus: 'Как начать торговать на бирже | Arapov.trade',
      realTitleEn: 'How to Start Trading on a  Exchange | Arapov.trade',
      descrUkr:
        'Дізнайтесь, як почати торгувати на криптобіржі: вибір платформи, реєстрація, стратегії та управління ризиками. Посібник від ArapovTrade.',
      imgUkr: '/assets/img/content/cryptostart.webp',
      groupsRus: ['Криптовалюта'],
      groupsUkr: ['Криптовалюта'],
      groupsEng: ['Cryptocurrency'],
      id: 72,
    },
    {
      linkUkr: 'halving',
      titleRus: 'Что такое халвинг биткоина?',
      titleUkr: 'Що таке халвінг біткоїна?',
      titleEn: 'What is Bitcoin Halving?',
      descrRus:
        'Узнайте, что такое халвинг биткоина,	когда был халвинг биткоина и почему это событие важно для майнеров и инвесторов на Arapov.trade.',
      descrUkr:
        'Дізнайтесь, що таке халвінг біткоїна, коли відбувався халвінг та чому це важливо для майнерів і інвесторів від ArapovTrade.',
      descrEn:
        'Learn about Bitcoin halving: what it is, when it occurs, and its significance for miners and investors. A guide from ArapovTrade.',
      realTitleRus: 'Что такое халвинг биткоина? | Arapov.trade',
      realTitleUkr: 'Що таке халвінг біткоїна? | Arapov.trade',
      realTitleEn: 'What is Bitcoin Halving? | Arapov.trade',

      imgUkr: '/assets/img/content/halving.webp',
      groupsRus: ['Криптовалюта'],
      groupsUkr: ['Криптовалюта'],
      groupsEng: ['Cryptocurrency'],
      id: 73,
    },
    {
      titleUkr: 'Ризик зміни курсу',
      linkUkr: 'riskcurrencyexchange',
      titleRus: 'Риск изменения курса',
      descrEn:
        'Learn about currency exchange risk, its impact on finances, and strategies to minimize it. A guide for traders from ArapovTrade.',
      titleEn: 'Currency Exchange Risk',
      descrUkr:
        'Дізнайтесь, що таке ризик зміни курсу, його вплив на фінанси та стратегії мінімізації. Посібник для трейдерів від ArapovTrade.',
      descrRus:
        'Узнайте, как защитить инвестиции от риска изменения курса валют! Стратегии минимизации рисков для трейдеров на Arapov.trade.',
      realTitleRus:
        'Риск изменения курса валют: защита инвестиций | Arapov.trade',
      realTitleEn:
        'Currency Exchange Risk: Investment Protection | Arapov.trade',
      realTitleUkr: 'Ризик зміни курсу: як захиститись | Arapov.trade',
      imgUkr: '/assets/img/content/riskCurrencyExchange44.webp',
      groupsRus: ['Трейдинг для начинающих'],
      groupsUkr: ['Трейдинг для початківців'],
      groupsEng: ['Trading for Beginners'],
      id: 74,
    },
    {
      titleUkr: 'Ризик кредитного плеча на FOREX',
      linkUkr: 'forexleveragerisk',
      titleRus: 'Риск кредитного плеча на FOREX',
      titleEn: 'Forex Leverage Risk',
      descrEn:
        'Learn about forex leverage risks and how to manage them to minimize losses. A guide for traders from ArapovTrade.',
      descrUkr:
        'Дізнайтесь про ризики кредитного плеча на Форекс та як ними керувати, щоб мінімізувати втрати. Посібник для трейдерів від ArapovTrade.',
      descrRus:
        'Узнайте о рисках кредитного плеча на Форекс! Как управлять ими и минимизировать потери в торговле на Arapov.trade.',
      realTitleRus: 'Риск кредитного плеча на Форекс | Arapov.trade',
      realTitleEn: 'Forex Leverage Risk | Arapov.trade',
      realTitleUkr: 'Ризики кредитного плеча на Форекс',
      imgUkr: '/assets/img/content/forexLeverageRisk.webp',
      groupsRus: ['Трейдинг для начинающих'],
      groupsUkr: ['Трейдинг для початківців'],
      groupsEng: ['Trading for Beginners'],
      id: 75,
    },
    {
      titleUkr: 'Основні центральні банки',
      linkUkr: 'majorbankfrs',
      titleRus: 'Основные центральные банки',
      titleEn: 'Major Central Banks',
      descrEn:
        'Learn about major central banks, their functions, meetings, and economic impact. A guide for traders from ArapovTrade.',
      descrUkr:
        'Дізнайтесь про ключові центральні банки світу, їх функції, засідання та вплив на економіку. Посібник для трейдерів від ArapovTrade.',
      descrRus:
        'Узнайте о главных центральных банках мира! Их функции, заседания и влияние на экономику для трейдеров на Arapov.trade.',
      realTitleRus: 'Центральные банки: функции и влияние | Arapov.trade',
      realTitleEn: 'Central Banks: Functions and Impact | Arapov.trade',
      realTitleUkr: 'Центральні банки: функції та вплив',
      imgUkr: '/assets/img/content/majorBankFrs_JQ.webp',
      groupsRus: ['Словарь трейдера'],
      groupsUkr: ['Словник трейдера'],
      groupsEng: ['Trader`s Dictionary'],
      id: 76,
    },
    {
      titleUkr: 'Криптовалюта Ethereum – що це таке та як вона працює?',
      linkUkr: 'ethereum',
      titleRus: 'Криптовалюта Ethereum – что это такое и как она работает?',
      descrEn:
        'Learn about Ethereum: smart contracts, decentralized apps, how it works, and its prospects. A guide for traders from ArapovTrade.',
      titleEn: 'Cryptocurrency Ethereum – What is it and How Does it Work?',
      realTitleEn: 'Ethereum: What It Is and How It Works | Arapov.trade',
      descrUkr:
        'Дізнайтесь про Ethereum: смарт-контракти, децентралізовані додатки, принцип роботи та перспективи. Посібник для трейдерів від ArapovTrade.',
      descrRus:
        'Ethereum — криптовалюта с умными контрактами и dApp. Узнайте, как она работает, зачем нужна и какие перспективы у Ethereum на Arapov.trade.',
      realTitleRus: 'Ethereum: как работает и зачем он нужен | Arapov.trade',
      realTitleUkr: 'Ethereum: що це та як працює | Arapov.trade',
      imgUkr: '/assets/img/content/ethereum.webp',
      groupsRus: ['Криптовалюта'],
      groupsUkr: ['Криптовалюта'],
      groupsEng: ['Cryptocurrency'],
      id: 77,
    },
    {
      titleUkr: 'Що таке Біткоїн (Bitcoin) і як це працює?',
      linkUkr: 'bitcoin',
      titleRus: 'Что такое Биткоин (Bitcoin) и как это работает?',
      titleEn: 'What is Bitcoin and How Does It Work?',
      descrEn:
        'Learn what Bitcoin is, how it works, its key advantages, risks, and practical applications in investing and trading with Arapov.trade.',
      descrUkr:
        'Дізнайтеся, що таке Біткоїн, як він працює, його ключові переваги, ризики і практичне застосування в інвестиціях та торгівліна.',
      descrRus:
        'Что такое Биткоин и как он работает? Узнайте его преимущества, риски и как использовать криптовалюту в инвестициях и трейдинге с Arapov.trade.',
      realTitleRus: 'Что такое Биткоин и как он работает | Arapov.trade',
      realTitleEn: 'What is Bitcoin and How Does It Work | Arapov.trade',
      realTitleUkr: 'Що таке Біткоїн і як він працює | Arapov.trade',
      imgUkr: '/assets/img/content/bitcoin.webp',
      groupsRus: ['Криптовалюта'],
      groupsUkr: ['Криптовалюта'],
      groupsEng: ['Cryptocurrency'],
      id: 78,
    },
    {
      titleUkr:
        'Чому важливо аналізувати обсяги у рамках поточних трендів на ринку',
      linkUkr: 'trendvolumeanalysis',
      titleRus:
        'Почему важно анализировать объемы в рамках текущих трендов на рынке',
      titleEn:
        'Why It’s Important to Analyze Volumes Within Current Market Trends',
      descrEn:
        'Learn how volume analysis helps identify trend strength, reversal points, and avoid false signals in the market.',
      descrUkr:
        'Дізнайтеся, як аналіз обсягів допомагає визначити силу тренду, точки розвороту та уникнути хибних сигналів на ринку.',
      descrRus:
        'Узнайте, как анализ объемов улучшает трейдинг! Практические советы по оценке трендов, точек разворота и избежанию ложных сигналов с Arapov.trade',
      realTitleRus: 'Объемы в трейдинге: как анализировать | Arapov.trade',
      realTitleEn: 'Volume Analysis in Trading: How to Analyze | Arapov.trade',
      realTitleUkr: 'Обсяги і тренди: як аналізувати | Arapov.trade',
      imgUkr: '/assets/img/content/trendvolumeanalysis.webp',
      groupsRus: ['Объемный анализ рынка'],
      groupsUkr: ['Об`ємний аналіз ринку'],
      groupsEng: ['Market Volume Analysis'],
      id: 112,
    },
    {
      titleUkr: 'Психологічні ризики FOREX',
      linkUkr: 'psychorisks',
      titleRus: 'Психологические риски FOREX',
      descrEn:
        'Learn about psychological risks in FOREX trading and how to minimize them. A guide for traders with tips and examples from ArapovTrade.',
      titleEn: 'Psychological Risks of FOREX',
      descrUkr:
        'Дізнайтесь про психологічні ризики на FOREX та як їх мінімізувати. Посібник для трейдерів з порадами та прикладами від ArapovTrade.',
      descrRus:
        'Узнайте о психологических рисках на FOREX! Как их минимизировать и советы для успешной торговли на Arapov.trade.',
      realTitleRus: 'Психологические риски FOREX | Arapov.trade',
      realTitleEn: 'Psychological Risks of FOREX | Arapov.trade',
      realTitleUkr: 'Психологічні ризики FOREX: як їх уникнути',
      imgUkr: '/assets/img/content/psychorisks.webp',
      groupsRus: ['Психология трейдинга'],
      groupsUkr: ['Психологія трейдингу'],
      groupsEng: ['Trading Psychology'],
      id: 79,
    },
    {
      titleUkr: 'Як торгувати на валютному ринку FOREX',
      linkUkr: 'howtotradeonforex',
      titleRus: 'Как торговать на валютном рынке FOREX',
      titleEn: 'How to Trade on the FOREX Market',
      descrEn:
        "Learn how to trade on the FOREX market: a beginner's guide with strategies, tips, and examples from ArapovTrade.",
      descrUkr:
        'Дізнайтесь, як торгувати на валютному ринку FOREX: посібник для новачків із стратегіями, порадами та прикладами від ArapovTrade.',
      descrRus:
        'Узнайте, как торговать на FOREX! Руководство для новичков с советами, стратегиями и примерами на Arapov.trade.',
      realTitleRus: 'Торговля на FOREX: как начать | Arapov.trade',
      realTitleEn: 'Trading on FOREX: How to Start | Arapov.trade',
      realTitleUkr: 'Як торгувати на FOREX: посібник',
      imgUkr: '/assets/img/content/howtotradeonforex.webp',
      groupsRus: ['Психология трейдинга'],
      groupsUkr: ['Психологія трейдингу'],
      groupsEng: ['Trading Psychology'],
      id: 80,
    },
    {
      titleUkr: 'Аналіз попиту та пропозиції. Концепція Пітера Стеделмайєра',
      linkUkr: 'steidlmayeranalysis',
      titleRus: 'Анализ спроса и предложения. Концепция Питера Стеделмайера',
      titleEn: "Supply and Demand Analysis. Peter Steidlmayer's Concept",
      descrEn:
        "Learn how to use Peter Steidlmayer's Market Profile concept for supply and demand analysis. Basics of Market Profile for effective market trading.",
      descrUkr:
        'Як використовувати концепцію Пітера Стеделмайєра для аналізу попиту і пропозиції. Основи Market Profile для ефективної торгівлі на ринку.',
      descrRus:
        'Что такое Market Profile и как его использовать для анализа спроса и предложения. Метод Питера Стеделмайера для трейдинга на основе поведения рынка.',
      realTitleRus:
        'Market Profile и анализ спроса и предложения | Arapov.trade',
      realTitleEn:
        'Market Profile and Supply and Demand Analysis | Arapov.trade',
      realTitleUkr: 'Аналіз попиту і пропозиції у трейдингу | Arapov.trade',
      imgUkr: '/assets/img/content/steidlmayeranalysis.jpg',
      groupsRus: ['Объемный анализ рынка'],
      groupsUkr: ['Об`ємний аналіз ринку'],
      groupsEng: ['Volume Market Analysis'],
      id: 81,
    },
    {
      titleUkr: 'Аналіз ринку FOREX',
      linkUkr: 'marketanalysisforex',
      titleRus: 'Анализ рынка FOREX',
      descrEn:
        'Learn about FOREX market analysis: key aspects, influencing factors, and strategies for traders. A guide from ArapovTrade.',
      titleEn: 'FOREX Market Analysis',
      descrUkr:
        'Дізнайтесь про аналіз ринку FOREX: ключові аспекти, фактори впливу та стратегії для трейдерів. Посібник від ArapovTrade.',
      descrRus:
        'Как анализировать рынок FOREX: типы анализа, влияющие факторы и советы для трейдеров. Узнайте больше на Arapov.trade.',
      realTitleRus: 'Как проводить анализ рынка FOREX | Arapov.trade',
      realTitleEn: 'How to Conduct FOREX Market Analysis | Arapov.trade',
      realTitleUkr: 'Аналіз ринку FOREX: основи трейдингу',
      imgUkr: '/assets/img/content/marketanalysis.webp',
      groupsRus: ['Фундаментальный анализ'],
      groupsUkr: ['Фундаментальний аналіз'],
      groupsEng: ['Fundamental Analysis'],
      id: 82,
    },
    {
      titleUkr: 'Економічні фактори',
      linkUkr: 'econimicfactors',
      titleRus: 'Экономические факторы',
      titleEn: 'Economic Factors',
      descrEn:
        'Learn how economic factors affect currency exchange rates. Key indicators for market analysis, trading, and financial decision-making with Arapov.trade.',
      descrUkr:
        'Дізнайтеся, як економічні фактори впливають на валютні курси. Основні показники для аналізу ринку, трейдингу та ухвалення фінансових рішень.',
      descrRus:
        'Узнайте, как экономические факторы влияют на валютные курсы! Ключевые аспекты и их роль в анализе трейдинга на Arapov.trade.',
      realTitleRus: 'Экономические факторы в трейдинге | Arapov.trade',
      realTitleEn: 'Economic Factors in Trading | Arapov.trade',
      realTitleUkr: 'Економічні фактори у трейдингу | Arapov.trade',
      imgUkr: '/assets/img/content/economicfactors.webp',
      groupsRus: ['Фундаментальный анализ'],
      groupsUkr: ['Фундаментальний аналіз'],
      groupsEng: ['Fundamental Analysis'],
      id: 83,
    },
    {
      titleUkr: 'Світові фондові індекси',
      linkUkr: 'worldstockindicates',
      titleRus: 'Мировые фондовые индексы',
      titleEn: 'World Stock Indices',
      descrEn:
        'Learn about major world stock indices, their role in the global economy, and how they impact financial markets and investors with Arapov.trade.',
      descrUkr:
        'Дізнайтеся про головні світові фондові індекси, їхню роль у глобальній економіці та як вони впливають на фінансові ринки та інвесторів.',
      descrRus:
        'Подробный обзор мировых фондовых индексов, их роль в экономике и советы для инвесторов от Arapov.trade.',
      realTitleRus: 'Мировые фондовые индексы: обзор и влияние | Arapov.trade',
      realTitleEn: 'World Stock Indices: Overview and Impact | Arapov.trade',
      realTitleUkr: 'Основні світові фондові індекси | Arapov.trade',
      imgUkr: '/assets/img/content/worldstockindicates.webp',
      groupsRus: ['Фундаментальный анализ'],
      groupsUkr: ['Фундаментальний аналіз'],
      groupsEng: ['Fundamental Analysis'],
      id: 84,
    },
    {
      titleUkr: 'Рівні Фібоначчі у технічному аналізі',
      linkUkr: 'fibonaccilevels',
      titleRus: 'Уровни Фибоначчи в техническом анализе',
      titleEn: 'Fibonacci Levels in Technical Analysis',
      descrEn:
        'Learn about Fibonacci levels: principles, applications in technical analysis, and trading strategies. A guide from ArapovTrade.',
      descrUkr:
        'Дізнайтесь про рівні Фібоначчі: принципи, застосування в технічному аналізі та стратегії трейдингу. Посібник від ArapovTrade.',
      descrRus:
        'Что такое уровни Фибоначчи и как они применяются в трейдинге и теханализе. Узнайте принципы построения и примеры использования.',
      realTitleRus: 'Уровни Фибоначчи в техническом анализе | Arapov.trade',
      realTitleEn: 'Fibonacci Levels in Technical Analysis | Arapov.trade',
      realTitleUkr: 'Рівні Фібоначчі в трейдингу | Arapov.trade',
      imgUkr: '/assets/img/content/economicstate.webp',
      groupsRus: ['Технический анализ'],
      groupsUkr: ['Технічний аналіз'],
      groupsEng: ['Technical Analysis'],
      id: 85,
    },
    {
      titleUkr: 'Основні показники економічного зростання',
      linkUkr: 'keyeconomicgrowth',
      titleRus: 'Основные показатели экономического роста',
      titleEn: 'Key Economic Growth Indicators',
      descrEn:
        'Learn about key economic growth indicators and their impact on financial markets. A guide for traders from ArapovTrade.',
      descrUkr:
        'Дізнайтесь про ключові економічні показники зростання та їх вплив на фінансові ринки. Посібник для трейдерів від ArapovTrade.',
      descrRus:
        'Узнайте, какие экономические показатели важны для роста: ВВП, инфляция, безработица и их влияние на финансовые рынки.',
      realTitleRus:
        'Экономические показатели роста: что влияет на рынки | Arapov.trade',
      realTitleEn: 'Economic Growth Indicators: Market Impact | Arapov.trade',
      realTitleUkr: 'Економічні показники зростання | Arapov.trade',
      imgUkr: '/assets/img/content/keyeconomicgrowth.webp',
      groupsRus: ['Фундаментальный анализ'],
      groupsUkr: ['Фундаментальний аналіз'],
      groupsEng: ['Fundamental Analysis'],
      id: 86,
    },
    {
      titleUkr: 'Технічний аналіз ринку',
      linkUkr: 'technicalanalysis',
      titleRus: 'Технический анализ рынка',
      titleEn: 'Technical Market Analysis',
      descrEn:
        'Learn about technical market analysis: basics, principles, and methods for trading. A guide for traders from ArapovTrade.',
      descrUkr:
        'Дізнайтесь про технічний аналіз ринку: основи, принципи та методи для трейдингу. Посібник для трейдерів від ArapovTrade.',
      descrRus:
        'Разбор основ технического анализа рынка: ключевые методы, виды графиков, тренды, уровни поддержки и сопротивления для успешной торговли.',
      realTitleRus:
        'Технический анализ рынка – методы и принципы | Arapov.trade',
      realTitleUkr: 'Технічний аналіз ринку: основи | Arapov.trade',
      realTitleEn: 'Technical Market Analysis: Basics | Arapov.trade',
      imgUkr: '/assets/img/content/technicalanalysis.webp',
      groupsRus: ['Технический анализ'],
      groupsUkr: ['Технічний аналіз'],
      groupsEng: ['Technical Analysis'],
      id: 87,
    },
    {
      titleUkr: 'Технічний аналіз ринку. Графіки',
      linkUkr: 'technicalmarketcharts',
      titleRus: 'Технический анализ рынка. Графики',
      titleEn: 'Technical Market Analysis. Charts',
      descrEn:
        'Learn about technical market analysis: chart types, trends, support and resistance levels for trading. A guide from ArapovTrade.',
      descrUkr:
        'Дізнайтесь про технічний аналіз ринку: види графіків, тренди, рівні підтримки та опору для трейдингу. Посібник від ArapovTrade.',
      descrRus:
        'Основы технического анализа: виды графиков, тренды и уровни поддержки и сопротивления для эффективной торговли.',
      realTitleRus: 'Технический анализ: виды графиков и тренды | Arapov.trade',
      realTitleEn: 'Technical Analysis: Chart Types and Trends | Arapov.trade',
      realTitleUkr: 'Технічний аналіз: види графіків | Arapov.trade',
      imgUkr: '/assets/img/content/technicalmarketcharts.webp',
      groupsRus: ['Технический анализ'],
      groupsUkr: ['Технічний аналіз'],
      groupsEng: ['Technical Analysis'],
      id: 88,
    },
    {
      titleUkr: 'Цінові фігури в технічному аналізі',
      linkUkr: 'keypricepattern',
      titleRus: 'Ценовые фигуры в техническом анализе',
      titleEn: 'Key Price Patterns in Technical Analysis',
      descrEn:
        'Learn about key price patterns in technical analysis: reversal and continuation patterns, their application in trading from ArapovTrade.',
      descrUkr:
        'Дізнайтесь про цінові фігури в технічному аналізі: розворотні та продовжувальні патерни, їх застосування в трейдингу від ArapovTrade.',
      descrRus:
        'Обзор ключевых ценовых фигур в трейдинге: разворотные и продолжительные модели, как их применять на практике.',
      realTitleRus:
        'Ценовые фигуры в трейдинге: как использовать | Arapov.trade',
      realTitleEn: 'Price Patterns in Trading: How to Use | Arapov.trade',
      realTitleUkr: 'Цінові фігури в технічному аналізі | Arapov.trade',
      imgUkr: '/assets/img/content/keypraicepattern.webp',
      groupsRus: ['Технический анализ'],
      groupsUkr: ['Технічний аналіз'],
      groupsEng: ['Technical Analysis'],
      id: 89,
    },
    {
      titleUkr:
        'Чому 90% трейдерів втрачають гроші? Пастки, створені Смарт Мані',
      linkUkr: 'smartmonettraps',
      descrEn:
        'Learn why 90% of traders lose money, the traps created by Smart Money, and how to avoid losses. A guide from ArapovTrade.',
      titleRus:
        'Почему 90% трейдеров теряют деньги? Ловушки, созданные Смарт Мани',
      titleEn: 'Why Do 90% of Traders Lose Money? Traps Created by Smart Money',
      descrUkr:
        'Дізнайтесь, чому 90% трейдерів втрачають гроші, які пастки створюють Smart Money та як уникнути втрат. Посібник від ArapovTrade.',
      descrRus:
        'Главные ошибки трейдеров, ловушки Смарт Мани и как избежать потерь. Полезное руководство для начинающих на Arapov.trade.',
      realTitleRus: 'Почему трейдеры теряют деньги | Ловушки Смарт Мани',
      realTitleEn: 'Why Traders Lose Money | Smart Money Traps',
      realTitleUkr: 'Чому трейдери втрачають: пастки Smart Money',
      imgUkr: '/assets/img/content/smartmoneytraps44.webp',
      groupsRus: ['Концепция Смарт Мани'],
      groupsUkr: ['Концепція Смарт Мані'],
      groupsEng: ['Smart Money Concept'],
      id: 90,
    },
    {
      titleUkr: 'Imbalance та FVG (Fair Value Gaps): Сильні зони ліквідності',
      linkUkr: 'imbalanceandfvg',
      titleRus: 'Imbalance и FVG (Fair Value Gaps): Сильные зоны ликвидности',
      descrEn:
        'Learn about Imbalance and FVG, how to find liquidity zones on charts, and use them in trading. A guide from ArapovTrade.',
      titleEn: 'Imbalance and FVG (Fair Value Gaps): Strong Liquidity Zones',
      descrUkr:
        'Дізнайтесь, що таке Imbalance і FVG, як знаходити зони ліквідності на графіку та використовувати їх у трейдингу. Посібник від ArapovTrade.',
      descrRus:
        'Узнайте, что такое Imbalance и FVG! Как находить зоны ликвидности и использовать их в торговых стратегиях на Arapov.trade.',
      realTitleRus: 'Imbalance и FVG: зоны ликвидности | Arapov.trade',
      realTitleEn: 'Imbalance and FVG: Liquidity Zones | Arapov.trade',
      realTitleUkr: 'Imbalance і FVG: зони ліквідності в трейдингу',
      imgUkr: '/assets/img/content/imbalanceandfvg.png',
      groupsRus: ['Концепция Смарт Мани'],
      groupsUkr: ['Концепція Смарт Мані'],
      groupsEng: ['Smart Money Concept'],
      id: 91,
    },
    {
      titleUkr: 'Ринковий ордер',
      linkUkr: 'marketorder',
      descrEn:
        'Learn what a market order is, how it works, its advantages, disadvantages, and examples of use in trading. A guide from ArapovTrade.',
      titleRus: 'Рыночный ордер',
      titleEn: 'Market Order',
      descrUkr:
        'Дізнайтесь, що таке ринковий ордер, як він працює, його переваги, недоліки та приклади використання в трейдингу. Посібник від ArapovTrade.',
      descrRus:
        'Узнайте, что такое рыночный ордер (Market Order)! Как он работает, когда применять, плюсы и минусы для трейдеров на Arapov.trade.',
      realTitleRus: 'Рыночный ордер: что это и как работает | Arapov.trade',
      realTitleEn: 'Market Order: What It Is and How It Works | Arapov.trade',
      realTitleUkr: 'Ринковий ордер: як працює та застосовується',
      imgUkr: '/assets/img/content/marketorder.webp',
      groupsRus: ['Объемный анализ рынка'],
      groupsUkr: ['Об`ємний аналіз ринку'],
      groupsEng: ['Volume Market Analysis'],
      id: 92,
    },
    {
      titleUkr: 'Стоп-ордер',
      linkUkr: 'stoporder',
      descrEn:
        'Learn what a stop order is, its types, advantages, disadvantages, and strategies for using it in crypto and stock markets from ArapovTrade.',
      titleRus: 'Стоп-ордер',
      titleEn: 'Stop Order',
      descrUkr:
        'Дізнайтесь, що таке стоп-ордер, його види, переваги, недоліки та стратегії використання на крипто- і фондових ринках від ArapovTrade.',
      descrRus:
        'Узнайте, что такое стоп-ордер в трейдинге: виды, плюсы, минусы и стратегии для торговли на крипто- и фондовых рынках на Arapov.trade.',
      realTitleRus: 'Стоп-ордер в трейдинге: как использовать | Arapov.trade',
      realTitleEn: 'Stop Order in Trading: How to Use | Arapov.trade',
      realTitleUkr: 'Стоп-ордер: як використовувати в трейдингу',
      imgUkr: '/assets/img/content/stoporder.webp',
      groupsRus: ['Объемный анализ рынка'],
      groupsUkr: ['Об`ємний аналіз ринку'],
      groupsEng: ['Volume Market Analysis'],
      id: 93,
    },
    {
      titleUkr: 'Реквоти у трейдингу',
      linkUkr: 'requotes',
      titleRus: 'Реквоты в трейдинге',
      descrEn:
        'Learn what requotes are in trading, why they occur, and how to avoid them. Tips for traders from ArapovTrade.',
      titleEn: 'Requotes in Trading',
      descrUkr:
        'Дізнайтесь, що таке реквоти в трейдингу, причини їх виникнення та як їх уникнути. Поради для трейдерів від ArapovTrade.',
      descrRus:
        'Узнайте, что такое реквоты в трейдинге! Почему возникают и как их избежать для эффективной торговли на Arapov.trade.',
      realTitleRus:
        'Реквоты в трейдинге: что это и как избежать | Arapov.trade',
      realTitleEn:
        'Requotes in Trading: What They Are and How to Avoid Them | Arapov.trade',
      realTitleUkr: 'Реквоти в трейдингу: що це та як уникнути',
      imgUkr: '/assets/img/content/requotes.webp',
      groupsRus: ['Трейдинг для начинающих'],
      groupsUkr: ['Трейдинг для початківців'],
      groupsEng: ['Trading for Beginners'],
      id: 94,
    },
    {
      titleUkr: 'Стоп-лімітний ордер',
      linkUkr: 'stoplimitorder',
      descrEn:
        'Learn what a stop-limit order is, how to set it up and use it in crypto and stock markets. A guide from ArapovTrade.',
      titleRus: 'Стоп-лимитный ордер',
      titleEn: 'Stop-Limit Order',
      descrUkr:
        'Дізнайтесь, що таке стоп-лімітний ордер, як його налаштувати та використовувати на крипто- і фондових ринках. Посібник від ArapovTrade.',
      descrRus:
        'Узнайте, что такое стоп-лимитный ордер! Руководство по настройке и применению Stop-Limit в трейдинге на Arapov.trade.',
      realTitleRus: 'Стоп-лимитный ордер: как использовать | Arapov.trade',
      realTitleEn: 'Stop-Limit Order: How to Use | Arapov.trade',
      realTitleUkr: 'Стоп-лімітний ордер: як використовувати',
      imgUkr: '/assets/img/content/stoplimitorder.webp',
      groupsRus: ['Объемный анализ рынка'],
      groupsUkr: ['Об`ємний аналіз ринку'],
      groupsEng: ['Volume Market Analysis'],
      id: 95,
    },
    {
      titleUkr: 'Торгова система: види та оптимізація',
      linkUkr: 'tradingsystem',
      titleRus: 'Торговая система: виды и оптимизация',
      descrEn:
        'Learn about trading systems: types, automation, optimization, and strategy selection for trading. A guide from ArapovTrade.',
      titleEn: 'Trading System: Types and Optimization',
      descrUkr:
        'Дізнайтесь про торгові системи: види, автоматизація, оптимізація та вибір стратегії для трейдингу. Посібник від ArapovTrade.',
      descrRus:
        'Узнайте о торговых системах в трейдинге! Виды, оптимизация и выбор стратегии для успешной торговли на Arapov.trade.',
      realTitleRus: 'Торговая система: виды и оптимизация | Arapov.trade',
      realTitleEn: 'Trading System: Types and Optimization | Arapov.trade',
      realTitleUkr: 'Торгова система: види та оптимізація',
      imgUkr: '/assets/img/content/tradingsystem.webp',
      groupsRus: ['Трейдинг для начинающих'],
      groupsUkr: ['Трейдинг для початківців'],
      groupsEng: ['Trading for Beginners'],
      id: 96,
    },
    {
      titleUkr: 'Як розпізнати хибний пробій?',
      linkUkr: 'falsebreakouts',
      titleRus: 'Как распознать ложный пробой?',
      descrEn:
        'Learn how Smart Money use false breakouts to gather liquidity and how to avoid their traps in trading. A guide from ArapovTrade.',
      titleEn: 'How Do Smart Money Use False Breakouts?',
      descrUkr:
        'Дізнайтесь, як Smart Money використовують хибні пробої для збору ліквідності та як уникнути їх пасток у трейдингу. Посібник від ArapovTrade.',
      descrRus:
        'Узнайте, как Smart Money создают ложные пробои для сбора ликвидности! Способы распознавания ловушек в трейдинге на Arapov.trade.',
      realTitleRus: 'Как распознать ложный пробой? | Arapov.trade',
      realTitleEn:
        'Smart Money and False Breakouts: How They Work | Arapov.trade',
      realTitleUkr: 'Хибні пробої: як їх розпізнати | Arapov.trade',
      imgUkr: '/assets/img/content/falsebreakouts44.webp',
      groupsRus: ['Концепция Смарт Мани'],
      groupsUkr: ['Концепція Смарт Мані'],
      groupsEng: ['Smart Money Concept'],
      id: 97,
    },
    {
      titleUkr:
        'Що таке "Stop Hunting" та як Smart Money вибивають стопи трейдерів?',
      linkUkr: 'stophunting',
      titleRus:
        'Что такое "Stop Hunting" и как Smart Money выбивают стопы трейдеров?',
      descrEn:
        "Learn what Stop Hunting is, how Smart Money trigger traders' stops, and how to protect your capital from manipulation. A guide from ArapovTrade.",
      titleEn:
        'What is "Stop Hunting" and How Do Smart Money Trigger Traders\' Stops?',
      descrUkr:
        'Дізнайтесь, що таке Stop Hunting, як Smart Money вибивають стопи трейдерів та як захистити капітал від маніпуляцій. Посібник від ArapovTrade.',
      descrRus:
        'Узнайте, что такое Stop Hunting! Как Smart Money выбивают стопы и как защитить капитал в трейдинге на Arapov.trade.',
      realTitleRus:
        'Stop Hunting: как Smart Money выбивают стопы | Arapov.trade',
      realTitleEn: 'Stop Hunting: How Smart Money Trigger Stops | Arapov.trade',
      realTitleUkr: 'Stop Hunting: як Smart Money вибивають стопи',
      imgUkr: '/assets/img/content/stophunting44.webp',
      groupsRus: ['Концепция Смарт Мани'],
      groupsUkr: ['Концепція Смарт Мані'],
      groupsEng: ['Smart Money Concept'],
      id: 98,
    },
    {
      titleUkr: 'Управління капіталом у трейдингу',
      linkUkr: 'capitalmanagement',
      titleRus: 'Управление капиталом в трейдинге',
      descrEn:
        'Learn about capital management in trading: risk management, money management, and strategies to protect your deposit from ArapovTrade.',
      titleEn: 'Capital Management in Trading',
      descrUkr:
        'Дізнайтесь про управління капіталом у трейдингу: ризик-менеджмент, мані-менеджмент та стратегії контролю депозиту від ArapovTrade.',
      descrRus:
        'Узнайте, как управлять капиталом в трейдинге! Риск-менеджмент, мани-менеджмент и стратегии для защиты депозита на Arapov.trade.',
      realTitleRus: 'Управление капиталом в трейдинге | Arapov.trade',
      realTitleEn: 'Capital Management in Trading | Arapov.trade',
      realTitleUkr: 'Управління капіталом у трейдингу',
      imgUkr: '/assets/img/content/capitalmanagement.webp',
      groupsRus: ['Трейдинг для начинающих'],
      groupsUkr: ['Трейдинг для початківців'],
      groupsEng: ['Trading for Beginners'],
      id: 99,
    },
    {
      titleUkr: 'Співвідношення прибутку та збитку',
      linkUkr: 'profitandlossratio',
      descrEn:
        'Learn how to calculate the Profit and Loss Ratio (R/R) in trading, manage risks, and improve efficiency. A guide from ArapovTrade.',
      titleRus: 'Соотношение прибыли и убытка',
      titleEn: 'Profit and Loss Ratio',
      descrUkr:
        'Дізнайтесь, як розрахувати співвідношення прибутку та збитків (R/R) у трейдингу, управляти ризиками та підвищувати ефективність. Посібник від ArapovTrade.',
      descrRus:
        'Узнайте, как рассчитать соотношение прибыли и убытка! R/R Ratio, управление рисками и стратегии трейдинга на Arapov.trade.',
      realTitleRus: 'Соотношение прибыли и убытка в трейдинге | Arapov.trade',
      realTitleEn: 'Profit and Loss Ratio in Trading | Arapov.trade',
      realTitleUkr: 'Прибуток та збитки: R/R у трейдингу',
      imgUkr: '/assets/img/content/profitandlossratio44.webp',
      groupsRus: ['Трейдинг для начинающих'],
      groupsUkr: ['Трейдинг для початківців'],
      groupsEng: ['Trading for Beginners'],
      id: 100,
    },
    {
      titleUkr: 'Помилки трейдерів початківців',
      linkUkr: 'beginnermistakes',
      titleRus: 'Ошибки начинающих трейдеров',
      descrEn:
        'Learn about common beginner trader mistakes and how to avoid them. Tips for a successful market start from ArapovTrade.',
      titleEn: 'Beginner Trader Mistakes',
      descrUkr:
        'Дізнайтесь про поширені помилки трейдерів-початківців та як їх уникнути. Поради для успішного старту на ринках від ArapovTrade.',
      descrRus:
        'Узнайте, какие ошибки совершают начинающие трейдеры! Советы, как их избежать и успешно стартовать на рынках с Arapov.trade.',
      realTitleRus: 'Ошибки начинающих трейдеров | Arapov.trade',
      realTitleUkr: 'Помилки трейдерів-початківців: як уникнути',
      realTitleEn: 'Beginner Trader Mistakes: How to Avoid Them | Arapov.trade',
      imgUkr: '/assets/img/content/beginnermistakes44.webp',
      groupsRus: ['Трейдинг для начинающих'],
      groupsUkr: ['Трейдинг для початківців'],
      groupsEng: ['Trading for Beginners'],
      id: 101,
    },
    {
      titleUkr: 'Торговий план трейдера',
      linkUkr: 'tradingplan',
      titleRus: 'Торговый план трейдера',
      descrEn:
        "Learn how to create an effective trader's trading plan: key components, examples, and tips for success from ArapovTrade.",
      titleEn: "Trader's Trading Plan",
      descrUkr:
        'Дізнайтесь, як скласти ефективний торговий план трейдера: ключові компоненти, приклади та поради для успіху від ArapovTrade.',
      descrRus:
        'Узнайте, как составить торговый план трейдера! Ключевые компоненты и советы для успешного трейдинга на Arapov.trade.',
      realTitleRus: 'Торговый план трейдера: как составить | Arapov.trade',
      realTitleEn: "Trader's Trading Plan: How to Create | Arapov.trade",
      realTitleUkr: 'Торговий план трейдера: як скласти | Arapov.trade',
      imgUkr: '/assets/img/content/tradingplan.webp',
      groupsRus: ['Трейдинг для начинающих'],
      groupsUkr: ['Трейдинг для початківців'],
      groupsEng: ['Trading for Beginners'],
      id: 102,
    },
    {
      titleUkr: 'Таймфрейми у трейдингу',
      linkUkr: 'timeframes',
      titleRus: 'Таймфреймы в трейдинге',
      titleEn: 'Timeframes in Trading',

      descrRus:
        'Что такое таймфрейм и на каком таймрефме лучше торговать? Узнайте, какой таймфрейм выбрать для скальпинга, интрадей и долгосрочных стратегий | Arapov.trade.',
      descrEn:
        'What is a timeframe and which timeframe is best for trading? Learn how to choose the right timeframe for scalping, intraday, and long-term strategies | Arapov.trade.',
      descrUkr:
        'Що таке таймфрейм і який таймфрейм найкращий для торгівлі? Дізнайтесь, як обрати таймфрейм для скальпінгу, інтрадей та довгострокових стратегій | Arapov.trade.',
      realTitleRus:
        'Таймфреймы в трейдинге: на каком таймфрейме лучше торговать | Arapov.trade',
      realTitleUkr:
        'Таймфрейми у трейдингу: який таймфрейм найкращий для торгівлі | Arapov.trade',
      realTitleEn:
        'Timeframes in Trading: Which Timeframe is Best for Trading | Arapov.trade',

      imgUkr: '/assets/img/content/timeframes44.webp',
      groupsRus: ['Трейдинг для начинающих'],
      groupsUkr: ['Трейдинг для початківців'],
      groupsEng: ['Trading for Beginners'],
      id: 103,
    },

    {
      titleUkr:
        'Чим відрізняється аналіз обсягів на ринку акцій та на ринку ф`ючерсів',
      linkUkr: 'volumeandfuturesmarket',
      titleRus:
        'Чем отличается анализ объемов на рынке акций и на рынке фьючерсов',
      descrEn:
        'Learn the differences between volume analysis in the stock market and the futures market. Key features, approaches, and indicators for trading with Arapov.trade.',
      titleEn:
        'What is the Difference Between Volume Analysis in the Stock Market and the Futures Market?',
      descrUkr:
        'У чому різниця між аналізом обсягів на ринку акцій і фʼючерсів? Ключові особливості, підходи та індикатори для трейдингу.',
      descrRus:
        'Узнайте отличия анализа объемов на рынках акций и фьючерсов! Практические методы и индикаторы для успешного трейдинга с Arapov.trade',
      realTitleRus: 'Анализ объемов: акции vs фьючерсы | Arapov.trade',
      realTitleUkr: 'Аналіз обсягів: акції vs фʼючерси | Arapov.trade',
      realTitleEn: 'Volume Analysis: Stocks vs Futures | Arapov.trade',
      imgUkr: '/assets/img/content/volumeandfuturesmarket44.jpg',
      groupsRus: ['Объемный анализ рынка'],
      groupsUkr: ['Об`ємний аналіз ринку'],
      groupsEng: ['Volume Market Analysis'],
      id: 140,
    },
    {
      titleUkr: 'Метод Річарда Вайкоффа',
      linkUkr: 'wyckoffsvolumeconcept',
      titleRus: 'Метод Ричарда Вайкоффа',
      descrEn:
        "Learn about Wyckoff's Volume Concept: how volume analysis reveals Smart Money actions and key market levels from ArapovTrade.",
      titleEn: "Wyckoff's Volume Concept",
      descrUkr:
        'Дізнайтесь про концепцію Вайкоффа: як об’ємний аналіз виявляє дії великих гравців і ключові рівні ринку від ArapovTrade.',
      descrRus:
        'Метод Вайкоффа: как объёмный анализ выявляет намерения крупных игроков и ключевые уровни рынка. Советы от ArapovTrade',
      realTitleRus: 'Метод Ричарда Вайкоффа | ArapovTrade',
      realTitleEn: "Wyckoff's Volume Concept | ArapovTrade",
      realTitleUkr: 'Метод Річарда Вайкоффа | ArapovTrade',
      imgUkr: '/assets/img/content/wyckoffsvolumeconcept.webp',
      groupsRus: ['Объемный анализ рынка'],
      groupsUkr: ['Об`ємний аналіз ринку'],
      groupsEng: ['Volume Market Analysis'],
      id: 141,
    },

    {
      titleUkr: 'Як трейдеру торгувати на новинах',
      linkUkr: 'newstrading',
      titleRus: 'Как трейдеру торговать на новостях',
      descrEn:
        'Learn how traders can trade the news: economic event impacts, trading strategies, and risk minimization from ArapovTrade.',
      titleEn: 'How Traders Can Trade the News',
      descrUkr:
        'Дізнайтесь, як торгувати на новинах: вплив економічних подій, стратегії трейдингу та мінімізація ризиків від ArapovTrade.',
      descrRus:
        'Торговля на новостях: как минимизировать риски? Советы от ArapovTrade по стратегиям и волатильности.',
      realTitleRus: 'Торговля на новостях в трейдинге | ArapovTrade',
      realTitleEn: 'News Trading in Trading | ArapovTrade',
      realTitleUkr: 'Торгівля на новинах: стратегії трейдера',
      imgUkr: '/assets/img/content/newstrading.webp',
      groupsRus: ['Фундаментальный анализ'],
      groupsUkr: ['Фундаментальний аналіз'],
      groupsEng: ['Fundamental Analysis'],
      id: 142,
    },
    {
      titleUkr: 'Що таке економічний календар',
      linkUkr: 'economiccalendar',
      titleRus: 'Что такое экономический календарь?',
      descrEn:
        'Learn what an economic calendar is, how it helps predict market movements, and trade news on stocks and indices from ArapovTrade.',
      titleEn: 'What is an Economic Calendar',
      descrUkr:
        'Дізнайтесь, як економічний календар допомагає прогнозувати ринкові рухи та торгувати на новинах акцій і індексів від ArapovTrade.',
      descrRus:
        'Узнайте, как экономический календарь помогает в трейдинге! Гид по событиям, влияющим на акции, индексы и стратегии торговли на новостях',
      realTitleRus: 'Что такое экономический календарь? | Arapov.trade',
      realTitleEn: 'Economic Calendar in Trading: How to Use | Arapov.trade',
      realTitleUkr: 'Економічний календар: як використовувати',
      imgUkr: '/assets/img/content/economiccalendar.png',
      groupsRus: ['Фундаментальный анализ'],
      groupsUkr: ['Фундаментальний аналіз'],
      groupsEng: ['Fundamental Analysis'],
      id: 143,
    },
    {
      titleUkr: 'Макроекономічні показники фундаментального аналізу',
      linkUkr: 'macroeconomicindicators',
      titleRus: 'Макроэкономические показатели фундаментального анализа',
      descrEn:
        'Learn how GDP, inflation, and Fed rates impact the market through macroeconomic indicators from ArapovTrade.',
      titleEn: 'Macroeconomic Indicators in Fundamental Analysis',
      descrUkr:
        'Дізнайтесь, як ВВП, інфляція та ставки ФРС впливають на ринок через макроекономічні показники від ArapovTrade.',
      descrRus:
        'Узнайте, как макроэкономические показатели влияют на рынок! Руководство по ВВП, инфляции, ставкам ФРС и индикаторам для успешного трейдинга.',
      realTitleRus: 'Макроэкономика в трейдинге: ключ к рынку | Arapov.trade',
      realTitleEn:
        'Macroeconomics in Trading: Key to the Market | Arapov.trade',
      realTitleUkr: 'Як аналізувати макроекономіку ринку? | Arapov.trade',
      imgUkr: '/assets/img/content/macroeconomicindicators44.webp',
      groupsRus: ['Фундаментальный анализ'],
      groupsUkr: ['Фундаментальний аналіз'],
      groupsEng: ['Fundamental Analysis'],
      id: 144,
    },
    {
      titleUkr: 'Фундаментальний аналіз світових валютних ринків',
      linkUkr: 'globalfundamentalanalysis',
      titleRus: 'Фундаментальный анализ мировых валютных рынков',
      descrEn:
        'Learn about fundamental analysis of currency markets: key indicators and trading strategies from ArapovTrade.',
      titleEn: 'Fundamental Analysis of Global Currency Markets',
      descrUkr:
        'Дізнайтесь про фундаментальний аналіз валютних ринків: ключові показники та стратегії трейдингу від ArapovTrade.',
      descrRus:
        'Фундаментальный анализ валютных рынков: ключевые макроэкономические факторы, их влияние на курсы и торговые стратегии. Руководство от ArapovTrade',
      realTitleRus: 'Фундаментальный анализ валютных рынков | Arapov.trade',
      realTitleEn: 'Fundamental Analysis of Currency Markets | Arapov.trade',
      realTitleUkr: 'Фундаментальний аналіз валютних ринків',
      imgUkr: '/assets/img/content/globalfundamentalanalysis44.webp',
      groupsRus: ['Фундаментальный анализ'],
      groupsUkr: ['Фундаментальний аналіз'],
      groupsEng: ['Fundamental Analysis'],
      id: 145,
    },
    {
      titleUkr: 'Трейдинг – азартна гра чи бізнес? Два психологічних підходи',
      linkUkr: 'gamblingorbusiness',
      titleRus:
        'Трейдинг – азартная игра или бизнес? Два психологических подхода',
      descrEn:
        'Discover whether trading is gambling or business: psychological approaches and success strategies in the markets from ArapovTrade.',
      titleEn: 'Trading: Gambling or Business? Two Psychological Approaches',
      descrUkr:
        'Дізнайтесь, чи є трейдинг азартом чи бізнесом: психологічні підходи та стратегії успіху на ринках від ArapovTrade.',
      descrRus:
        'Трейдинг: азарт или бизнес? Советы от ArapovTrade по психологии, стратегиям и управлению рисками для успеха на крипто- и фондовых рынках.',
      realTitleRus: 'Трейдинг: игра или бизнес? | ArapovTrade',
      realTitleUkr: 'Трейдинг: азарт чи бізнес? Психологія',
      realTitleEn: 'Trading: Gambling or Business? Psychology | ArapovTrade',
      imgUkr: '/assets/img/content/gamblingorbusiness44.webp',
      groupsRus: ['Психология трейдинга'],
      groupsUkr: ['Психологія трейдингу'],
      groupsEng: ['Trading Psychology'],
      id: 146,
    },
    {
      titleUkr: 'Психологія торгівлі Вільяма Ганна',
      linkUkr: 'williamgannpsychology',
      titleRus: 'Метод Ганна',
      descrEn:
        "Discover William Gann's trading psychology: self-control, risk management, and methods for modern trading from ArapovTrade.",
      titleEn: "William Gann's Trading Psychology",
      descrUkr:
        'Дізнайтесь про психологію трейдингу Вільяма Ганна: самоконтроль, управління ризиками та методи для сучасного трейдингу від ArapovTrade.',
      descrRus:
        'Теория Ганна: самоконтроль, управление рисками, устойчивость. Применяйте принципы Ганна в торговле для успеха!',
      realTitleRus: 'Метод Ганна | ArapovTrade',
      realTitleUkr: 'Психологія трейдингу Вільяма Ганна | ArapovTrade',
      realTitleEn: "William Gann's Trading Psychology | ArapovTrade",
      imgUkr: '/assets/img/content/williamgannpsychology44.webp',
      groupsRus: ['Психология трейдинга'],
      groupsUkr: ['Психологія трейдингу'],
      groupsEng: ['Trading Psychology'],
      id: 147,
    },
    {
      linkUkr: 'emotionsaffect',
      titleRus: 'Психология трейдинга: Как эмоции влияют на сделки?',
      titleUkr: 'Психологія трейдингу: Як емоції впливають на угоди?',
      titleEn: 'Trading Psychology: How Emotions Affect Trades',
      descrEn:
        'Learn how emotions impact trading, why fear and greed hinder success, and techniques to control emotions from ArapovTrade.',
      descrUkr:
        'Дізнайтесь, як емоції впливають на трейдинг, чому страх і жадібність шкодять та як контролювати емоції від ArapovTrade.',
      descrRus:
        'Как эмоции влияют на трейдинг? Узнайте, как страх и жадность мешают торговать и какие техники помогут контролировать эмоции для успешных сделок',
      realTitleRus: 'Психология трейдинга: контроль эмоций | Arapov.trade',
      realTitleUkr: 'Психологія трейдингу: контроль емоцій | Arapov.trade',
      realTitleEn: 'Trading Psychology: Emotion Control | Arapov.trade',
      imgUkr: '/assets/img/content/emotionsaffect44.webp',
      groupsRus: ['Психология трейдинга'],
      groupsUkr: ['Психологія трейдингу'],
      groupsEng: ['Trading Psychology'],
      id: 148,
    },
    {
      linkUkr: 'fomo',
      titleRus: 'Что такое фомо в трейдинге?',
      titleUkr: 'Що таке фомо в трейдингу?',
      titleEn: 'What is FOMO in Trading?',
      descrEn:
        'Learn what FOMO is in trading, how to avoid fear of missing out, and trade mindfully with tips from ArapovTrade.',

      descrRus:
        'Что такое FOMO в трейдинге и как избежать потерь? Советы от ArapovTrade по осознанной торговле и управлению эмоциями.',
      descrUkr:
        'Що таке FOMO в трейдингу і як уникнути втрат? Поради від ArapovTrade щодо усвідомленої торгівлі та управління емоціями.',
      realTitleRus: 'Что такое фомо в трейдинге? | ArapovTrade',
      realTitleUkr: 'Що таке фомо в трейдингу? | ArapovTrade',
      realTitleEn: 'What is FOMO in Trading? | ArapovTrade',

      imgUkr: '/assets/img/content/fomo.webp',
      groupsRus: ['Психология трейдинга'],
      groupsUkr: ['Психологія трейдингу'],
      groupsEng: ['Trading Psychology'],
      id: 149,
    },
    {
      descrEn:
        'Learn about the psychology of averaging, why beginners lose deposits, and how to avoid losses in trading from ArapovTrade.',
      linkUkr: 'psychologyofaveraging',
      titleRus: 'Усреднение в трейдинге',
      titleEn: 'Averaging in Trading',
      titleUkr: 'Усереднення в трейдингу',

      descrRus:
        'Узнайте что такое усреднение в трейдинге и что такое усреднение в инвестициях! Почему новички теряют депозиты от ArapovTrade.',
      descrUkr:
        'Дізнайтесь, що таке усереднення в трейдингу та інвестиціях! Чому новачки втрачають депозити від ArapovTrade.',
      realTitleRus: 'Усреднение в трейдинге | ArapovTrade',
      realTitleEn: 'Averaging in Trading | ArapovTrade',
      realTitleUkr: 'Усереднення в трейдингу | ArapovTrade',
      imgUkr: '/assets/img/content/psychologyofaveraging44.webp',
      groupsRus: ['Психология трейдинга'],
      groupsUkr: ['Психологія трейдингу'],
      groupsEng: ['Trading Psychology'],
      id: 150,
    },
    {
      linkUkr: 'headandshoulders',
      titleRus: 'Голова и плечи паттерн',
      titleEn: 'Head and Shoulders Pattern',
      titleUkr: 'Голова і плечі патерн',

      descrRus:
        'Фигура голова и плечи: как торговать разворотный паттерн? Руководство от ArapovTrade по анализу и стратегиям',
      descrUkr:
        'Фігура голова і плечі: як торгувати розворотний патерн? Посібник від ArapovTrade з аналізу та стратегій.',
      descrEn:
        'Head and Shoulders pattern: how to trade the reversal pattern? A guide from ArapovTrade on analysis and strategies.',
      realTitleRus: 'Голова и плечи паттерн : как торговать | ArapovTrade',
      realTitleEn: 'Head and Shoulders Pattern: How to Trade | ArapovTrade',
      realTitleUkr: 'Голова і плечі патерн: як торгувати | Arapov.trade',
      imgUkr: '/assets/img/content/headandshoulders.webp',
      groupsRus: ['Технический анализ'],
      groupsUkr: ['Технічний аналіз'],
      groupsEng: ['Technical Analysis'],
      id: 151,
    },
    {
      titleUkr:
        'Як розвивається ринковий аукціон, оцінка сантименту учасників ринку',
      linkUkr: 'marketauctiondevelops',
      titleRus:
        'Как развивается рыночный аукцион , оценка сантимента участников рынка',
      titleEn:
        'How Market Auction Develops, Assessing Market Participant Sentiment',
      descrEn:
        'Explore the dynamics of market auctions and participant sentiment: auction theory, demand and supply indicators in trading from ArapovTrade.',
      descrUkr:
        'Дізнайтесь про ринковий аукціон і сентимент ринку: аукціонна теорія, індикатори попиту та пропозиції в трейдингу від ArapovTrade.',
      descrRus:
        'Узнайте, как рыночный аукцион и сентимент участников влияют на трейдинг! Анализ аукционной теории и индикаторов для успешной торговли с Arapov.trade',
      realTitleRus: 'Рыночный аукцион и сентимент в трейдинге | Arapov.trade',
      realTitleEn: 'Market Auction and Sentiment in Trading | Arapov.trade',
      realTitleUkr: 'Ринковий аукціон і сентимент трейдерів',
      imgUkr: '/assets/img/content/marketauctiondevelops.webp',
      groupsRus: ['Объемный анализ рынка'],
      groupsUkr: ['Об`ємний аналіз ринку'],
      groupsEng: ['Market Volume Analysis'],
      id: 113,
    },

    {
      linkUkr: 'flagandpennant',
      titleRus: 'Паттерн вымпел и  флаг в трейдинге',
      titleEn: 'Flag and Pennant Pattern in Trading',
      titleUkr: 'Прапор і Вимпел у трейдингу',
      descrUkr:
        'Дізнайтесь про патерни Прапор і Вимпел: як визначити пробій тренду та використовувати в трейдингу. Посібник від ArapovTrade.',
      descrRus:
        'Паттерн вымпел и  флаг в трейдинге. Изучите фигуры технического анализа, паттерны и стратегии  для успешной торговли.',
      realTitleRus: 'Паттерн вымпел и  флаг в трейдинге | ArapovTrade',
      realTitleEn: 'Flag and Pennant: Trend Breakout | ArapovTrade',
      realTitleUkr: 'Прапор і Вимпел у трейдингу | Arapov.trade',
      imgUkr: '/assets/img/content/flagandpennant.webp',
      groupsRus: ['Технический анализ'],
      descrEn:
        'Learn about the Flag and Pennant patterns: how to identify trend breakouts and trade effectively with a guide from ArapovTrade.',
      groupsUkr: ['Технічний аналіз'],
      groupsEng: ['Technical Analysis'],
      id: 153,
    },
    {
      linkUkr: 'cupandhandle',
      titleRus: 'Паттерн чашка с ручкой в трейдинге',
      titleEn: 'Cup and Handle Pattern in Trading',
      titleUkr: 'Патерн Чашка з ручкою у трейдингу',
      descrUkr:
        'Дізнайтесь про патерн Чашка з ручкою: як визначити пробій тренду та використовувати в трейдингу. Посібник від ArapovTrade.',
      descrRus:
        'Чашка с ручкой: как торговать пробой тренда? Руководство от ArapovTrade по паттерну, стратегиям и успеху на крипто- и фондовых рынках.',
      realTitleRus: 'Паттерн чашка с ручкой в трейдинге | ArapovTrade',
      realTitleEn: 'Cup and Handle Pattern in Trading | ArapovTrade',
      realTitleUkr: 'Патерн Чашка з ручкою у трейдингу | Arapov.trade',
      imgUkr: '/assets/img/content/cupandhandle.png',
      groupsRus: ['Технический анализ'],
      descrEn:
        'Learn about the Cup and Handle pattern: how to identify trend breakouts and trade effectively with a guide from ArapovTrade.',
      groupsUkr: ['Технічний аналіз'],
      groupsEng: ['Technical Analysis'],
      id: 154,
    },

    {
      linkUkr: 'engulfing',
      titleRus: 'Паттерн поглощение. Как определить разворот тренда?',
      titleUkr: 'Фігура Поглинання: Як спіймати розворот тренду',
      titleEn: 'Engulfing Pattern: How to Catch Trend Reversals',
      descrRus:
        'Как определить разворот тренда с помощью паттерна поглощение. Bullish и Bearish Engulfing — как ловить тренд на графике.',
      descrUkr:
        'Як визначити розворот тренду за допомогою фігури Поглинання. Bullish та Bearish Engulfing — як ловити тренд на графіку.',
      descrEn:
        'Learn how to identify trend reversals using the Engulfing pattern. Bullish and Bearish Engulfing – how to catch trends on the chart.',
      realTitleRus:
        'Паттерн поглощение. Как определить разворот тренда? | ArapovTrade',
      realTitleEn: 'Engulfing: Bullish and Bearish | ArapovTrade',
      realTitleUkr: 'Фігура Поглинання: Як спіймати розворот тренду',
      imgUkr: '/assets/img/content/engulfing.webp',
      groupsRus: ['Технический анализ'],
      groupsUkr: ['Технічний аналіз'],
      groupsEng: ['Technical Analysis'],
      id: 155,
    },

    {
      titleUkr: 'Подвійна вершина та Подвійне дно',
      linkUkr: 'doubletopandbottom',
      titleRus: 'Двойная вершина и Двойное дно',
      descrEn:
        'Learn about Double Top and Double Bottom patterns: how to trade reversals, entry and exit strategies with a guide from ArapovTrade.',
      titleEn: 'Double Top and Double Bottom Patterns',
      descrUkr:
        'Дізнайтеся, як працюють фігури “Подвійна вершина” і “Подвійне дно” у теханалізі. Сигнали розвороту, входи та виходи з позицій.',
      descrRus:
        'Двойная вершина и двойное дно: как торговать разворотные паттерны? Руководство от ArapovTrade по анализу и стратегиям',
      realTitleRus: 'Двойная вершина и двойное дно | ArapovTrade',
      realTitleEn: 'Double Top and Double Bottom | ArapovTrade',
      realTitleUkr: 'Подвійна вершина і дно: розворотні патерни',
      imgUkr: '/assets/img/content/doubletopandbottom.png',
      groupsRus: ['Технический анализ'],
      groupsUkr: ['Технічний аналіз'],
      groupsEng: ['Technical Analysis'],
      id: 156,
    },
    {
      linkUkr: 'pattern-1-2-3',
      titleRus: 'Паттерн 123 в трейдинге',
      titleEn: '123 Pattern in Trading',
      titleUkr: 'Патерн 123 у трейдингу',

      descrUkr:
        'Дізнайтесь про патерн 123: як визначити розворот тренду та використовувати в трейдингу на ринках. Посібник від ArapovTrade.',
      descrRus:
        'Паттерн 123 стратегия как использовать разворот тренда? Руководство от ArapovTrade по анализу, стратегиям и успеху на крипто- и фондовых рынках.',
      realTitleRus: 'Паттерн 123 в трейдинге | ArapovTrade',
      realTitleEn: '123 Pattern: Trend Reversal | ArapovTrade',
      realTitleUkr: 'Патерн 123: розворот тренду | Arapov.trade',
      descrEn:
        'Learn about the 123 pattern: how to identify trend reversals and trade effectively in the markets with a guide from ArapovTrade.',
      imgUkr: '/assets/img/content/pattern-1-2-3.png',
      groupsRus: ['Технический анализ'],
      groupsUkr: ['Технічний аналіз'],
      groupsEng: ['Technical Analysis'],
      id: 157,
    },








    {
    titleUkr: 'Індикатор ADX: що це і як вимірювати силу тренду',
    linkUkr: 'adx',
    imgUkr: '/assets/img/content/adx.jpeg',
    titleRus: 'Индикатор ADX: что это и как измерять силу тренда',
    titleEn: 'ADX Indicator: What It Is and How to Measure Trend Strength',
    descrUkr:
      'Що показує індикатор ADX, як за ним відрізнити сильний тренд від млявого боковика і чому він вимірює силу руху, але не його напрям.',
    descrEn:
      'What the ADX indicator shows, how to tell a strong trend from a sluggish range by it and why it measures the strength of a move, not its direction.',
    descrRus:
      'Что показывает индикатор ADX, как по нему отличить сильный тренд от вялого боковика и почему он измеряет силу движения, но не его направление.',
    realTitleRus: 'Индикатор ADX: что это и как измерять силу тренда | Arapov.trade',
    realTitleUkr: 'Індикатор ADX: що це і як вимірювати силу тренду | Arapov.trade',
    realTitleEn: 'ADX Indicator: What It Is and How to Measure Trend Strength | Arapov.trade',
    groupsRus: ['Технический анализ'],
    groupsUkr: ['Технічний аналіз'],
    groupsEng: ['Technical Analysis'],
    id: 501,
  },
  {
    titleUkr: 'Нейромережі в трейдингу: що вміє ШІ й де його межа',
    linkUkr: 'ai-trading',
    imgUkr: '/assets/img/content/ai-trading.jpeg',
    titleRus: 'Нейросети в трейдинге: что умеет ИИ и где его предел',
    titleEn: 'Neural Networks in Trading: What AI Can and Cannot Do',
    descrUkr:
      'Що нейромережі реально вміють на ринку, а що їм не до снаги, чому ШІ не передбачає майбутнє і як використати його як інструмент, а не оракула.',
    descrEn:
      'What neural networks really can do on the market, what is beyond them, why AI does not predict the future and how to use it as a tool, not an oracle.',
    descrRus:
      'Что нейросети реально умеют на рынке, а что им не под силу, почему ИИ не предсказывает будущее и как использовать его как инструмент, а не оракула.',
    realTitleRus: 'Нейросети в трейдинге: что умеет ИИ и где его предел | Arapov.trade',
    realTitleUkr: 'Нейромережі в трейдингу: що вміє ШІ й де його межа | Arapov.trade',
    realTitleEn: 'Neural Networks in Trading: What AI Can and Cannot Do | Arapov.trade',
    groupsRus: ['Трейдинг для начинающих'],
    groupsUkr: ['Трейдинг для початківців'],
    groupsEng: ['Trading for Beginners'],
    id: 502,
  },
  {
    titleUkr: 'Ейрдроп у крипті: що це і як не натрапити на скам',
    linkUkr: 'airdrop',
    imgUkr: '/assets/img/content/airdrop.jpeg',
    titleRus: 'Эирдроп в крипте: что это и как не попасть на скам',
    titleEn: 'Airdrop in Crypto: What It Is and How to Avoid Scams',
    descrUkr:
      'Що таке ейрдроп, за що проєкти роздають токени, як взяти участь і як відрізнити справжню роздачу від схеми, що краде доступ до гаманця.',
    descrEn:
      'What an airdrop is, why projects give out tokens, how to take part and how to tell a real drop from a scheme that steals wallet access.',
    descrRus:
      'Что такое эирдроп, за что проекты раздают токены, как поучаствовать и как отличить настоящую раздачу от схемы, ворующей доступ к кошельку.',
    realTitleRus: 'Эирдроп в крипте: что это и как не попасть на скам | Arapov.trade',
    realTitleUkr: 'Ейрдроп у крипті: що це і як не натрапити на скам | Arapov.trade',
    realTitleEn: 'Airdrop in Crypto: What It Is and How to Avoid Scams | Arapov.trade',
    groupsRus: ['Криптовалюта'],
    groupsUkr: ['Криптовалюта'],
    groupsEng: ['Cryptocurrency'],
    id: 503,
  },
  // {
  //   titleUkr: 'Альтсезон: що це і як пов\'язаний із домінацією біткоїна',
  //   linkUkr: 'altseason',
  //   imgUkr: '/assets/img/content/altseason.jpeg',
  //   titleRus: 'Альтсезон: что это и как связан с доминацией биткоина',
  //   titleEn: 'Altseason: What It Is and How It Ties to Bitcoin Dominance',
  //   descrUkr:
  //     'Що таке альтсезон, чому капітал перетікає з біткоїна в альткоїни, як це пов\'язано з домінацією BTC і чому кінець альтсезону часто болісний.',
  //   descrEn:
  //     'What altseason is, why capital flows from bitcoin into altcoins, how it relates to BTC dominance and why the end of altseason is often painful.',
  //   descrRus:
  //     'Что такое альтсезон, почему капитал перетекает из биткоина в альткоины, как это связано с доминацией BTC и почему конец альтсезона часто болезненный.',
  //   realTitleRus: 'Альтсезон: что это и как связан с доминацией биткоина | Arapov.trade',
  //   realTitleUkr: 'Альтсезон: що це і як пов\'язаний із домінацією біткоїна | Arapov.trade',
  //   realTitleEn: 'Altseason: What It Is and How It Ties to Bitcoin Dominance | Arapov.trade',
  //   groupsRus: ['Криптовалюта'],
  //   groupsUkr: ['Криптовалюта'],
  //   groupsEng: ['Cryptocurrency'],
  //   id: 504,
  // },
  // {
  //   titleUkr: 'Бектест стратегії: що це і як не обдурити себе',
  //   linkUkr: 'backtest',
  //   imgUkr: '/assets/img/content/backtest.jpeg',
  //   titleRus: 'Бэктест стратегии: что это и как не обмануть себя',
  //   titleEn: 'Strategy Backtest: What It Is and How Not to Fool Yourself',
  //   descrUkr:
  //     'Що таке бектест торгової стратегії, як чесно тестувати її на історії і чому красиві цифри на минулому оманливі й не дають гарантій.',
  //   descrEn:
  //     'What a strategy backtest is, how to test it honestly on history and why pretty numbers on the past are deceptive and give no guarantees.',
  //   descrRus:
  //     'Что такое бэктест торговой стратегии, как честно тестировать её на истории и почему красивые цифры на прошлом обманчивы и не дают гарантий.',
  //   realTitleRus: 'Бэктест стратегии: что это и как не обмануть себя | Arapov.trade',
  //   realTitleUkr: 'Бектест стратегії: що це і як не обдурити себе | Arapov.trade',
  //   realTitleEn: 'Strategy Backtest: What It Is and How Not to Fool Yourself | Arapov.trade',
  //   groupsRus: ['Психология трейдинга'],
  //   groupsUkr: ['Психологія трейдингу'],
  //   groupsEng: ['Trading Psychology'],
  //   id: 505,
  // },
  // {
  //   titleUkr: 'Що таке облігації простими словами: купон, номінал, дохідність',
  //   linkUkr: 'bonds-coupon-yield',
  //   imgUkr: '/assets/img/content/bonds-coupon-yield.jpeg',
  //   titleRus: 'Что такое облигации простыми словами: купон, номинал, доходность',
  //   titleEn: 'What Are Bonds in Simple Terms: Coupon, Face Value, Yield',
  //   descrUkr:
  //     'Що таке облігації, як вони працюють, що таке номінал, купон і дохідність, які бувають види облігацій і наскільки вони надійні для інвестора.',
  //   descrEn:
  //     'What bonds are, how they work, what face value, coupon and yield are, what types of bonds exist and how reliable they are for an investor.',
  //   descrRus:
  //     'Что такое облигации, как они работают, что такое номинал, купон и доходность, какие бывают виды облигаций и насколько они надёжны для инвестора.',
  //   realTitleRus: 'Что такое облигации простыми словами: купон, номинал, доходность | Arapov.trade',
  //   realTitleUkr: 'Що таке облігації простими словами: купон, номінал, дохідність | Arapov.trade',
  //   realTitleEn: 'What Are Bonds in Simple Terms: Coupon, Face Value, Yield | Arapov.trade',
  //   groupsRus: ['Фундаментальный анализ'],
  //   groupsUkr: ['Фундаментальний аналіз'],
  //   groupsEng: ['Fundamental Analysis'],
  //   id: 506,
  // },
  // {
  //   titleUkr: 'Брейкер-блок і мітигейшн-блок: що це в Smart Money',
  //   linkUkr: 'breaker-mitigation-blocks',
  //   imgUkr: '/assets/img/content/breaker-mitigation-blocks.jpeg',
  //   titleRus: 'Брейкер-блок и митигейшн-блок: что это в Smart Money',
  //   titleEn: 'Breaker block and mitigation block: what they are in Smart Money',
  //   descrUkr:
  //     'Що таке брейкер-блок і мітигейшн-блок, чим вони відрізняються від ордер-блока і як смарт-мані використовують повернення ціни до цих зон.',
  //   descrEn:
  //     'What a breaker block and a mitigation block are, how they differ from an order block and how smart money uses the price return to these zones.',
  //   descrRus:
  //     'Что такое брейкер-блок и митигейшн-блок, чем они отличаются от ордер-блока и как смарт-мани используют возврат цены к этим зонам.',
  //   realTitleRus: 'Брейкер-блок и митигейшн-блок: что это в Smart Money | Arapov.trade',
  //   realTitleUkr: 'Брейкер-блок і мітигейшн-блок: що це в Smart Money | Arapov.trade',
  //   realTitleEn: 'Breaker block and mitigation block: what they are in Smart Money | Arapov.trade',
  //   groupsRus: ['Концепция Смарт Мани'],
  //   groupsUkr: ['Концепція Смарт Мані'],
  //   groupsEng: ['Smart Money Concept'],
  //   id: 507,
  // },
  // {
  //   titleUkr: 'Беззбиток: що це і коли переносити стоп',
  //   linkUkr: 'breakeven',
  //   imgUkr: '/assets/img/content/breakeven.jpeg',
  //   titleRus: 'Безубыток: что это и когда переносить стоп',
  //   titleEn: 'Breakeven: What It Is and When to Move the Stop',
  //   descrUkr:
  //     'Що означає перевести угоду в беззбиток, коли перенесення стопа в точку входу захищає прибуток, а коли вибиває з хорошої позиції зарано.',
  //   descrEn:
  //     'What moving a trade to breakeven means, when shifting the stop to entry protects profit and when it knocks you out of a good position too early.',
  //   descrRus:
  //     'Что значит перевести сделку в безубыток, когда перенос стопа в точку входа защищает прибыль, а когда выбивает из хорошей позиции слишком рано.',
  //   realTitleRus: 'Безубыток: что это и когда переносить стоп | Arapov.trade',
  //   realTitleUkr: 'Беззбиток: що це і коли переносити стоп | Arapov.trade',
  //   realTitleEn: 'Breakeven: What It Is and When to Move the Stop | Arapov.trade',
  //   groupsRus: ['Трейдинг для начинающих'],
  //   groupsUkr: ['Трейдинг для початківців'],
  //   groupsEng: ['Trading for Beginners'],
  //   id: 508,
  // },
  // {
  //   titleUkr: 'Бичачий і ведмежий ринок: що це і чим відрізняються',
  //   linkUkr: 'bull-bear-market',
  //   imgUkr: '/assets/img/content/bull-bear-market.jpeg',
  //   titleRus: 'Бычий и медвежий рынок: что это и чем отличаются',
  //   titleEn: 'Bull and Bear Market: What They Are and How They Differ',
  //   descrUkr:
  //     'Що таке бичачий і ведмежий ринок, чим вони відрізняються за настроєм натовпу і чому фазу важливіше визначати за структурою й обсягом, а не за новинами.',
  //   descrEn:
  //     'What a bull and a bear market are, how they differ in crowd mood and why the phase is better read by structure and volume than by news.',
  //   descrRus:
  //     'Что такое бычий и медвежий рынок, чем они отличаются по настроению толпы и почему фазу важнее определять по структуре и объёму, а не по новостям.',
  //   realTitleRus: 'Бычий и медвежий рынок: что это и чем отличаются | Arapov.trade',
  //   realTitleUkr: 'Бичачий і ведмежий ринок: що це і чим відрізняються | Arapov.trade',
  //   realTitleEn: 'Bull and Bear Market: What They Are and How They Differ | Arapov.trade',
  //   groupsRus: ['Трейдинг для начинающих'],
  //   groupsUkr: ['Трейдинг для початківців'],
  //   groupsEng: ['Trading for Beginners'],
  //   id: 509,
  // },
  // {
  //   titleUkr: 'Чи може нейромережа передбачити ціну акції або біткоїна',
  //   linkUkr: 'can-ai-predict-price',
  //   imgUkr: '/assets/img/content/can-ai-predict-price.jpeg',
  //   titleRus: 'Может ли нейросеть предсказать цену акции или биткоина',
  //   titleEn: 'Can a Neural Network Predict a Stock or Bitcoin Price?',
  //   descrUkr:
  //     'Чому ринок погано передбачуваний у принципі, що ШІ насправді робить із ціною — рахує ймовірності, а не пророчить, — і як дивитися на прогнози.',
  //   descrEn:
  //     'Why the market is poorly predictable in principle, what AI actually does with price (counts odds, not prophesies) and how to read forecasts.',
  //   descrRus:
  //     'Почему рынок плохо предсказуем в принципе, что ИИ на самом деле делает с ценой — считает вероятности, а не пророчит, — и как смотреть на прогнозы.',
  //   realTitleRus: 'Может ли нейросеть предсказать цену акции или биткоина | Arapov.trade',
  //   realTitleUkr: 'Чи може нейромережа передбачити ціну акції або біткоїна | Arapov.trade',
  //   realTitleEn: 'Can a Neural Network Predict a Stock or Bitcoin Price? | Arapov.trade',
  //   groupsRus: ['Трейдинг для начинающих'],
  //   groupsUkr: ['Трейдинг для початківців'],
  //   groupsEng: ['Trading for Beginners'],
  //   id: 510,
  // },
  // {
  //   titleUkr: 'Молот, доджі й вечірня зірка: свічки розвороту',
  //   linkUkr: 'candle-hammer-doji-star',
  //   imgUkr: '/assets/img/content/candle-hammer-doji-star.jpeg',
  //   titleRus: 'Молот, доджи и вечерняя звезда: свечи разворота',
  //   titleEn: 'Hammer, Doji and Evening Star: Reversal Candles',
  //   descrUkr:
  //     'Що означають свічкові патерни молот, доджі й вечірня зірка, як їх читати й чому вони працюють лише на значущих рівнях, а не самі по собі.',
  //   descrEn:
  //     'What the hammer, doji and evening star candlestick patterns mean, how to read them and why they work only at significant levels, not on their own.',
  //   descrRus:
  //     'Что означают свечные паттерны молот, доджи и вечерняя звезда, как их читать и почему они работают только на значимых уровнях, а не сами по себе.',
  //   realTitleRus: 'Молот, доджи и вечерняя звезда: свечи разворота | Arapov.trade',
  //   realTitleUkr: 'Молот, доджі й вечірня зірка: свічки розвороту | Arapov.trade',
  //   realTitleEn: 'Hammer, Doji and Evening Star: Reversal Candles | Arapov.trade',
  //   groupsRus: ['Технический анализ'],
  //   groupsUkr: ['Технічний аналіз'],
  //   groupsEng: ['Technical Analysis'],
  //   id: 511,
  // },
  // {
  //   titleUkr: 'Кері-трейд: що це і як заробляють на ставках',
  //   linkUkr: 'carrytrade',
  //   imgUkr: '/assets/img/content/carrytrade.jpeg',
  //   titleRus: 'Кэрри-трейд: что это и как зарабатывают на ставках',
  //   titleEn: 'Carry Trade: What It Is and How Rate Differences Pay',
  //   descrUkr:
  //     'Що таке стратегія кері-трейд, як заробляють на різниці процентних ставок між валютами і який ризик розвертає таку угоду проти вас.',
  //   descrEn:
  //     'What the carry trade strategy is, how traders earn on the interest-rate gap between currencies and what risk turns such a trade against you.',
  //   descrRus:
  //     'Что такое стратегия кэрри-трейд, как зарабатывают на разнице процентных ставок между валютами и какой риск разворачивает такую сделку против вас.',
  //   realTitleRus: 'Кэрри-трейд: что это и как зарабатывают на ставках | Arapov.trade',
  //   realTitleUkr: 'Кері-трейд: що це і як заробляють на ставках | Arapov.trade',
  //   realTitleEn: 'Carry Trade: What It Is and How Rate Differences Pay | Arapov.trade',
  //   groupsRus: ['Фундаментальный анализ'],
  //   groupsUkr: ['Фундаментальний аналіз'],
  //   groupsEng: ['Fundamental Analysis'],
  //   id: 512,
  // },
  // {
  //   titleUkr: 'CCI (Commodity Channel Index): що це і як використовувати',
  //   linkUkr: 'cci',
  //   imgUkr: '/assets/img/content/cci.jpeg',
  //   titleRus: 'CCI (Commodity Channel Index): что это и как использовать',
  //   titleEn: 'CCI (Commodity Channel Index): what it is and how to use it',
  //   descrUkr:
  //     'Що таке індикатор CCI, як він вимірює відхилення ціни від середнього, що значать рівні +100 і -100 і чому це не сигнал на вхід сам по собі.',
  //   descrEn:
  //     'What the CCI indicator is, how it measures price deviation from the average, what the +100 and -100 levels mean and why it is not an entry signal by itself.',
  //   descrRus:
  //     'Что такое индикатор CCI, как он измеряет отклонение цены от среднего, что значат уровни +100 и -100 и почему это не сигнал на вход сам по себе.',
  //   realTitleRus: 'CCI (Commodity Channel Index): что это и как использовать | Arapov.trade',
  //   realTitleUkr: 'CCI (Commodity Channel Index): що це і як використовувати | Arapov.trade',
  //   realTitleEn: 'CCI (Commodity Channel Index): what it is and how to use it | Arapov.trade',
  //   groupsRus: ['Технический анализ'],
  //   groupsUkr: ['Технічний аналіз'],
  //   groupsEng: ['Technical Analysis'],
  //   id: 513,
  // },
  // {
  //   titleUkr: 'Когнітивні викривлення в трейдингу: як вони заважають і що робити',
  //   linkUkr: 'cognitive-biases-trading',
  //   imgUkr: '/assets/img/content/cognitive-biases-trading.jpeg',
  //   titleRus: 'Когнитивные искажения в трейдинге: как они мешают и что делать',
  //   titleEn: 'Cognitive Biases in Trading: How They Hurt and What to Do',
  //   descrUkr:
  //     'Що таке когнітивні викривлення в трейдингу, які з них шкодять трейдеру найбільше (підтвердження, якір, неприйняття втрат) і як знижувати їх вплив на рішення.',
  //   descrEn:
  //     'What cognitive biases in trading are, which of them hurt a trader most (confirmation, anchoring, loss aversion) and how to reduce their influence on decisions.',
  //   descrRus:
  //     'Что такое когнитивные искажения в трейдинге, какие вредят больше всего (подтверждение, якорь, неприятие потерь) и как снижать их влияние на решения.',
  //   realTitleRus: 'Когнитивные искажения в трейдинге: как они мешают и что делать | Arapov.trade',
  //   realTitleUkr: 'Когнітивні викривлення в трейдингу: як вони заважають і що робити | Arapov.trade',
  //   realTitleEn: 'Cognitive Biases in Trading: How They Hurt and What to Do | Arapov.trade',
  //   groupsRus: ['Психология трейдинга'],
  //   groupsUkr: ['Психологія трейдингу'],
  //   groupsEng: ['Trading Psychology'],
  //   id: 514,
  // },
  // {
  //   titleUkr: 'Складний відсоток у трейдингу: як росте депозит',
  //   linkUkr: 'compounding',
  //   imgUkr: '/assets/img/content/compounding.jpeg',
  //   titleRus: 'Сложный процент в трейдинге: как растёт депозит',
  //   titleEn: 'Compound Interest in Trading: How a Deposit Grows',
  //   descrUkr:
  //     'Як працює складний відсоток і реінвестування прибутку, чому невелика перевага на дистанції дає відчутне зростання і де в цієї математики межа.',
  //   descrEn:
  //     'How compound interest and reinvesting profit work, why a small edge over a distance gives noticeable growth and where this math has its limit.',
  //   descrRus:
  //     'Как работает сложный процент и реинвестирование прибыли, почему небольшое преимущество на дистанции даёт ощутимый рост и где у этой математики предел.',
  //   realTitleRus: 'Сложный процент в трейдинге: как растёт депозит | Arapov.trade',
  //   realTitleUkr: 'Складний відсоток у трейдингу: як росте депозит | Arapov.trade',
  //   realTitleEn: 'Compound Interest in Trading: How a Deposit Grows | Arapov.trade',
  //   groupsRus: ['Трейдинг для начинающих'],
  //   groupsUkr: ['Трейдинг для початківців'],
  //   groupsEng: ['Trading for Beginners'],
  //   id: 515,
  // },
  // {
  //   titleUkr: 'Контанго і беквордація: що це у ф\'ючерсах простими словами',
  //   linkUkr: 'contango-backwardation',
  //   imgUkr: '/assets/img/content/contango-backwardation.jpeg',
  //   titleRus: 'Контанго и бэквордация: что это в фьючерсах простыми словами',
  //   titleEn: 'Contango and backwardation: what they mean in futures',
  //   descrUkr:
  //     'Що таке контанго і беквордація, чому дальній ф\'ючерс дорожчий або дешевший за ближній: витрати на зберігання, ставка і що це каже трейдеру.',
  //   descrEn:
  //     'What contango and backwardation are, why the far futures is more expensive or cheaper than the near one: storage costs, interest and what it tells a trader.',
  //   descrRus:
  //     'Что такое контанго и бэквордация, почему дальний фьючерс дороже или дешевле ближнего: издержки хранения, ставка и что это говорит трейдеру.',
  //   realTitleRus: 'Контанго и бэквордация: что это в фьючерсах простыми словами | Arapov.trade',
  //   realTitleUkr: 'Контанго і беквордація: що це у ф\'ючерсах простими словами | Arapov.trade',
  //   realTitleEn: 'Contango and backwardation: what they mean in futures | Arapov.trade',
  //   groupsRus: ['Фундаментальный анализ'],
  //   groupsUkr: ['Фундаментальний аналіз'],
  //   groupsEng: ['Fundamental Analysis'],
  //   id: 516,
  // },
  // {
  //   titleUkr: 'Звіт COT (Commitment of Traders): як читати позиції великих',
  //   linkUkr: 'cotreport',
  //   imgUkr: '/assets/img/content/cotreport.jpeg',
  //   titleRus: 'Отчёт COT (Commitment of Traders): как читать позиции',
  //   titleEn: 'COT report (Commitment of Traders): what it is and how to read it',
  //   descrUkr:
  //     'Що таке звіт COT, хто такі комерційні та некомерційні трейдери і чому позиції великих учасників це фон, а не сигнал на вхід.',
  //   descrEn:
  //     'What the COT report is, who commercial and non-commercial traders are and why the positions of large participants are context, not an entry signal.',
  //   descrRus:
  //     'Что такое отчёт COT, кто такие коммерческие и некоммерческие трейдеры и почему позиции крупных участников это фон, а не сигнал на вход.',
  //   realTitleRus: 'Отчёт COT (Commitment of Traders): как читать позиции | Arapov.trade',
  //   realTitleUkr: 'Звіт COT (Commitment of Traders): як читати позиції великих | Arapov.trade',
  //   realTitleEn: 'COT report (Commitment of Traders): what it is and how to read it | Arapov.trade',
  //   groupsRus: ['Фундаментальный анализ'],
  //   groupsUkr: ['Фундаментальний аналіз'],
  //   groupsEng: ['Fundamental Analysis'],
  //   id: 517,
  // },
  // {
  //   titleUkr: 'Ринкова капіталізація криптовалюти: що це і як рахувати',
  //   linkUkr: 'crypto-market-cap',
  //   imgUkr: '/assets/img/content/crypto-market-cap.jpeg',
  //   titleRus: 'Рыночная капитализация криптовалюты: что это и как считать',
  //   titleEn: 'Crypto Market Cap: What It Is and How to Calculate It',
  //   descrUkr:
  //     'Що таке капіталізація криптовалюти, як вона рахується (ціна × монети в обороті), чим відрізняється від FDV і чому це не гроші, вкладені в монету.',
  //   descrEn:
  //     'What crypto market cap is, how it is counted (price by coins in circulation), how it differs from FDV and why it is not money put into a coin.',
  //   descrRus:
  //     'Что такое капитализация криптовалюты, как она считается (цена × монеты в обороте), чем отличается от FDV и почему это не деньги, вложенные в монету.',
  //   realTitleRus: 'Рыночная капитализация криптовалюты: что это и как считать | Arapov.trade',
  //   realTitleUkr: 'Ринкова капіталізація криптовалюти: що це і як рахувати | Arapov.trade',
  //   realTitleEn: 'Crypto Market Cap: What It Is and How to Calculate It | Arapov.trade',
  //   groupsRus: ['Криптовалюта'],
  //   groupsUkr: ['Криптовалюта'],
  //   groupsEng: ['Cryptocurrency'],
  //   id: 518,
  // },
  // {
  //   titleUkr: 'Майнінг криптовалют: що це і як працює',
  //   linkUkr: 'crypto-mining',
  //   imgUkr: '/assets/img/content/crypto-mining.jpeg',
  //   titleRus: 'Майнинг криптовалют: что это и как работает',
  //   titleEn: 'Cryptocurrency Mining: What It Is and How It Works',
  //   descrUkr:
  //     'Що таке майнінг, як комп\'ютери підтверджують блоки й отримують винагороду і чому це не «легкі гроші», а бізнес із витратами на електрику.',
  //   descrEn:
  //     'What mining is, how computers confirm blocks and get a reward and why it is not easy money but a business with electricity costs.',
  //   descrRus:
  //     'Что такое майнинг, как компьютеры подтверждают блоки и получают награду и почему это не «лёгкие деньги», а бизнес с расходами на электричество.',
  //   realTitleRus: 'Майнинг криптовалют: что это и как работает | Arapov.trade',
  //   realTitleUkr: 'Майнінг криптовалют: що це і як працює | Arapov.trade',
  //   realTitleEn: 'Cryptocurrency Mining: What It Is and How It Works | Arapov.trade',
  //   groupsRus: ['Криптовалюта'],
  //   groupsUkr: ['Криптовалюта'],
  //   groupsEng: ['Cryptocurrency'],
  //   id: 519,
  // },
  // {
  //   titleUkr: 'Криптосленг: що таке HODL, FUD, FOMO і терміни',
  //   linkUkr: 'crypto-slang',
  //   imgUkr: '/assets/img/content/crypto-slang.jpeg',
  //   titleRus: 'Криптосленг: что такое HODL, FUD, FOMO и термины',
  //   titleEn: 'Crypto Slang: What HODL, FUD, FOMO and Terms Mean',
  //   descrUkr:
  //     'Що означають HODL, FUD, FOMO та інший криптосленг простими словами і чому за модними словами часто стоять звичайні страх і жадібність натовпу.',
  //   descrEn:
  //     'What HODL, FUD, FOMO and other crypto slang mean in simple terms and why behind the trendy words often stand ordinary fear and greed of the crowd.',
  //   descrRus:
  //     'Что значат HODL, FUD, FOMO и другой криптосленг простыми словами и почему за модными словами часто стоят обычные страх и жадность толпы.',
  //   realTitleRus: 'Криптосленг: что такое HODL, FUD, FOMO и термины | Arapov.trade',
  //   realTitleUkr: 'Криптосленг: що таке HODL, FUD, FOMO і терміни | Arapov.trade',
  //   realTitleEn: 'Crypto Slang: What HODL, FUD, FOMO and Terms Mean | Arapov.trade',
  //   groupsRus: ['Криптовалюта'],
  //   groupsUkr: ['Криптовалюта'],
  //   groupsEng: ['Cryptocurrency'],
  //   id: 520,
  // },
  // {
  //   titleUkr: 'Кити в криптовалюті: хто це і як рухають ринок',
  //   linkUkr: 'crypto-whales',
  //   imgUkr: '/assets/img/content/crypto-whales.jpeg',
  //   titleRus: 'Киты в криптовалюте: кто это и как двигают рынок',
  //   titleEn: 'Crypto Whales: Who They Are and How They Move the Market',
  //   descrUkr:
  //     'Хто такі криптокити, як великий капітал рухає ціну через обсяг і стіни продажів і чому за ними варто стежити за графіком, а не копіювати наосліп.',
  //   descrEn:
  //     'Who crypto whales are, how large capital moves price through volume and sell walls and why to watch them on the chart, not copy blindly.',
  //   descrRus:
  //     'Кто такие криптокиты, как крупный капитал двигает цену через объём и стены продаж и почему за ними стоит следить по графику, а не копировать вслепую.',
  //   realTitleRus: 'Киты в криптовалюте: кто это и как двигают рынок | Arapov.trade',
  //   realTitleUkr: 'Кити в криптовалюті: хто це і як рухають ринок | Arapov.trade',
  //   realTitleEn: 'Crypto Whales: Who They Are and How They Move the Market | Arapov.trade',
  //   groupsRus: ['Криптовалюта'],
  //   groupsUkr: ['Криптовалюта'],
  //   groupsEng: ['Cryptocurrency'],
  //   id: 521,
  // },
  // {
  //   titleUkr: 'Податок на криптовалюту: що важливо знати трейдеру',
  //   linkUkr: 'cryptotax',
  //   imgUkr: '/assets/img/content/cryptotax.jpeg',
  //   titleRus: 'Налог на криптовалюту: что важно знать трейдеру',
  //   titleEn: 'Crypto Tax: What a Trader Needs to Know',
  //   descrUkr:
  //     'Коли виникає податок під час операцій із криптою, чому важливо вести облік угод і навіщо уточнювати правила у своїй країні. Загальний орієнтир, не консультація.',
  //   descrEn:
  //     'When tax arises on crypto operations, why tracking your trades matters and why to check the rules in your country. A general guide, not advice.',
  //   descrRus:
  //     'Когда возникает налог при операциях с криптой, почему важно вести учёт сделок и зачем уточнять правила в своей стране. Общий ориентир, не консультация.',
  //   realTitleRus: 'Налог на криптовалюту: что важно знать трейдеру | Arapov.trade',
  //   realTitleUkr: 'Податок на криптовалюту: що важливо знати трейдеру | Arapov.trade',
  //   realTitleEn: 'Crypto Tax: What a Trader Needs to Know | Arapov.trade',
  //   groupsRus: ['Криптовалюта'],
  //   groupsUkr: ['Криптовалюта'],
  //   groupsEng: ['Cryptocurrency'],
  //   id: 522,
  // },
  // {
  //   titleUkr: 'Типи валютних пар: мажори, кроси та екзотика',
  //   linkUkr: 'currencypairtypes',
  //   imgUkr: '/assets/img/content/currencypairtypes.jpeg',
  //   titleRus: 'Типы валютных пар: мажоры, кроссы и экзотика',
  //   titleEn: 'Types of currency pairs: majors, crosses and exotics',
  //   descrUkr:
  //     'Які бувають типи валютних пар, чим мажори відрізняються від крос-пар та екзотики, як пов\'язана ліквідність і спред і чим торгувати новачку.',
  //   descrEn:
  //     'What types of currency pairs there are, how majors differ from cross pairs and exotics, how liquidity and spread are related and what a beginner should trade.',
  //   descrRus:
  //     'Какие бывают типы валютных пар, чем мажоры отличаются от кросс-пар и экзотики, как связана ликвидность и спред и чем торговать новичку.',
  //   realTitleRus: 'Типы валютных пар: мажоры, кроссы и экзотика | Arapov.trade',
  //   realTitleUkr: 'Типи валютних пар: мажори, кроси та екзотика | Arapov.trade',
  //   realTitleEn: 'Types of currency pairs: majors, crosses and exotics | Arapov.trade',
  //   groupsRus: ['Трейдинг для начинающих'],
  //   groupsUkr: ['Трейдинг для початківців'],
  //   groupsEng: ['Trading for Beginners'],
  //   id: 523,
  // },
  // {
  //   titleUkr: 'Дейтрейдинг: що це і як працює внутрішньоденна торгівля',
  //   linkUkr: 'day-trading',
  //   imgUkr: '/assets/img/content/day-trading.jpeg',
  //   titleRus: 'Дейтрейдинг: что это и как работает внутридневная торговля',
  //   titleEn: 'Day Trading: What It Is and How Intraday Trading Works',
  //   descrUkr:
  //     'Що таке внутрішньоденна торгівля, чим вона відрізняється від інших стилів, скільки часу вимагає і чому новачку з нею найважче. Без романтики.',
  //   descrEn:
  //     'What intraday trading is, how it differs from other styles, how much time it takes and why it is hardest of all for a beginner. No romance.',
  //   descrRus:
  //     'Что такое внутридневная торговля, чем она отличается от других стилей, сколько времени требует и почему новичку с ней тяжелее всего. Без романтики.',
  //   realTitleRus: 'Дейтрейдинг: что это и как работает внутридневная торговля | Arapov.trade',
  //   realTitleUkr: 'Дейтрейдинг: що це і як працює внутрішньоденна торгівля | Arapov.trade',
  //   realTitleEn: 'Day Trading: What It Is and How Intraday Trading Works | Arapov.trade',
  //   groupsRus: ['Трейдинг для начинающих'],
  //   groupsUkr: ['Трейдинг для початківців'],
  //   groupsEng: ['Trading for Beginners'],
  //   id: 524,
  // },
  // {
  //   titleUkr: 'Ділинговий центр (Dealing Desk): відмінність від ECN/STP',
  //   linkUkr: 'dealingdesk',
  //   imgUkr: '/assets/img/content/dealingdesk.jpeg',
  //   titleRus: 'Дилинговый центр (Dealing Desk): чем отличается от ECN/STP',
  //   titleEn: 'Dealing Desk: what it is and how it differs from ECN/STP',
  //   descrUkr:
  //     'Що таке модель Dealing Desk, чим кухня відрізняється від ECN і STP, у чому конфлікт інтересів із трейдером і на що дивитися при виборі брокера.',
  //   descrEn:
  //     'What the Dealing Desk model is, how a market maker differs from ECN and STP, where the conflict of interest sits and what to check when choosing a broker.',
  //   descrRus:
  //     'Что такое модель Dealing Desk, чем кухня отличается от ECN и STP, в чём конфликт интересов с трейдером и на что смотреть при выборе брокера.',
  //   realTitleRus: 'Дилинговый центр (Dealing Desk): чем отличается от ECN/STP | Arapov.trade',
  //   realTitleUkr: 'Ділинговий центр (Dealing Desk): відмінність від ECN/STP | Arapov.trade',
  //   realTitleEn: 'Dealing Desk: what it is and how it differs from ECN/STP | Arapov.trade',
  //   groupsRus: ['Трейдинг для начинающих'],
  //   groupsUkr: ['Трейдинг для початківців'],
  //   groupsEng: ['Trading for Beginners'],
  //   id: 525,
  // },
  // {
  //   titleUkr: 'DeFi (децентралізовані фінанси): що це і ризики',
  //   linkUkr: 'defi',
  //   imgUkr: '/assets/img/content/defi.jpeg',
  //   titleRus: 'DeFi (децентрализованные финансы): что это и риски',
  //   titleEn: 'DeFi (Decentralized Finance): What It Is and the Risks',
  //   descrUkr:
  //     'Що таке DeFi, як працюють обмін, кредити й стейкінг без банків на смартконтрактах і які ризики — від дір у коді до втрати коштів — тут реальні.',
  //   descrEn:
  //     'What DeFi is, how swaps, loans and staking work without banks on smart contracts and what risks, from code holes to lost funds, are real here.',
  //   descrRus:
  //     'Что такое DeFi, как работают обмен, кредиты и стейкинг без банков на смарт-контрактах и какие риски — от дыр в коде до потери средств — тут реальны.',
  //   realTitleRus: 'DeFi (децентрализованные финансы): что это и риски | Arapov.trade',
  //   realTitleUkr: 'DeFi (децентралізовані фінанси): що це і ризики | Arapov.trade',
  //   realTitleEn: 'DeFi (Decentralized Finance): What It Is and the Risks | Arapov.trade',
  //   groupsRus: ['Криптовалюта'],
  //   groupsUkr: ['Криптовалюта'],
  //   groupsEng: ['Cryptocurrency'],
  //   id: 526,
  // },
  // {
  //   titleUkr: 'Демо-рахунок у трейдингу: що це і чи варто вчитися',
  //   linkUkr: 'demoaccount',
  //   imgUkr: '/assets/img/content/demoaccount.jpeg',
  //   titleRus: 'Демо-счёт в трейдинге: что это и стоит ли учиться',
  //   titleEn: 'Demo Account in Trading: What It Is and Worth Learning On',
  //   descrUkr:
  //     'Навіщо потрібен демо-рахунок, чого на ньому можна навчитися, а чого ні, і чому психологію реальних грошей демо не замінить. Як практикуватися з толком.',
  //   descrEn:
  //     'Why a demo account is useful, what you can and cannot learn on it and why a demo will not replace the psychology of real money.',
  //   descrRus:
  //     'Зачем нужен демо-счёт, чему на нём можно научиться, а чему нет, и почему психологию реальных денег демо не заменит. Как практиковаться с толком.',
  //   realTitleRus: 'Демо-счёт в трейдинге: что это и стоит ли учиться | Arapov.trade',
  //   realTitleUkr: 'Демо-рахунок у трейдингу: що це і чи варто вчитися | Arapov.trade',
  //   realTitleEn: 'Demo Account in Trading: What It Is and Worth Learning On | Arapov.trade',
  //   groupsRus: ['Трейдинг для начинающих'],
  //   groupsUkr: ['Трейдинг для початківців'],
  //   groupsEng: ['Trading for Beginners'],
  //   id: 527,
  // },
  // {
  //   titleUkr: 'DEX і CEX: чим децентралізована біржа відрізняється від CEX',
  //   linkUkr: 'dex-vs-cex',
  //   imgUkr: '/assets/img/content/dex-vs-cex.jpeg',
  //   titleRus: 'DEX и CEX: чем децентрализованная биржа отличается от CEX',
  //   titleEn: 'DEX and CEX: How a Decentralized Exchange Differs from a CEX',
  //   descrUkr:
  //     'Що таке DEX і CEX, чим децентралізована біржа відрізняється від централізованої за зберіганням коштів, регуляцією та ліквідністю і що обрати новачку.',
  //   descrEn:
  //     'What DEX and CEX are, how a decentralized exchange differs from a centralized one in custody, regulation and liquidity, and what a beginner should choose.',
  //   descrRus:
  //     'Что такое DEX и CEX, чем децентрализованная биржа отличается от централизованной по хранению средств, регуляции и ликвидности и что выбрать новичку.',
  //   realTitleRus: 'DEX и CEX: чем децентрализованная биржа отличается от CEX | Arapov.trade',
  //   realTitleUkr: 'DEX і CEX: чим децентралізована біржа відрізняється від CEX | Arapov.trade',
  //   realTitleEn: 'DEX and CEX: How a Decentralized Exchange Differs from a CEX | Arapov.trade',
  //   groupsRus: ['Криптовалюта'],
  //   groupsUkr: ['Криптовалюта'],
  //   groupsEng: ['Cryptocurrency'],
  //   id: 528,
  // },
  // {
  //   titleUkr: 'Індекс долара (DXY): що це і як його використовує трейдер',
  //   linkUkr: 'dollar-index-dxy',
  //   imgUkr: '/assets/img/content/dollar-index-dxy.jpeg',
  //   titleRus: 'Индекс доллара (DXY): что это и как его использует трейдер',
  //   titleEn: 'The Dollar Index (DXY): What It Is and How a Trader Uses It',
  //   descrUkr:
  //     'Що таке індекс долара DXY, з чого він складається, що ним рухає (ставки ФРС, попит на долар) і як індекс долара допомагає читати форекс і ризик на ринку.',
  //   descrEn:
  //     'What the dollar index DXY is, what it consists of, what moves it (Fed rates, demand for the dollar) and how the dollar index helps read forex and market risk.',
  //   descrRus:
  //     'Что такое индекс доллара DXY, из чего он состоит, что им двигает (ставки ФРС, спрос на доллар) и как индекс доллара помогает читать форекс и риск на рынке.',
  //   realTitleRus: 'Индекс доллара (DXY): что это и как его использует трейдер | Arapov.trade',
  //   realTitleUkr: 'Індекс долара (DXY): що це і як його використовує трейдер | Arapov.trade',
  //   realTitleEn: 'The Dollar Index (DXY): What It Is and How a Trader Uses It | Arapov.trade',
  //   groupsRus: ['Фундаментальный анализ'],
  //   groupsUkr: ['Фундаментальний аналіз'],
  //   groupsEng: ['Fundamental Analysis'],
  //   id: 529,
  // },
  // {
  //   titleUkr: 'Equal Highs, Equal Lows і індьюсмент: пастки ліквідності',
  //   linkUkr: 'equal-highs-lows',
  //   imgUkr: '/assets/img/content/equal-highs-lows.jpeg',
  //   titleRus: 'Equal Highs, Equal Lows и индьюсмент: ловушки ликвидности',
  //   titleEn: 'Equal Highs, Equal Lows and inducement: liquidity traps',
  //   descrUkr:
  //     'Що таке Equal Highs і Equal Lows, як над ними накопичується ліквідність і що таке індьюсмент: пастка, що виманює трейдерів перед рухом.',
  //   descrEn:
  //     'What Equal Highs and Equal Lows are, how liquidity builds above them and what inducement is: a trap that lures traders in before the move.',
  //   descrRus:
  //     'Что такое Equal Highs и Equal Lows, как над ними копится ликвидность и что такое индьюсмент: ловушка, которая выманивает трейдеров перед движением.',
  //   realTitleRus: 'Equal Highs, Equal Lows и индьюсмент: ловушки ликвидности | Arapov.trade',
  //   realTitleUkr: 'Equal Highs, Equal Lows і індьюсмент: пастки ліквідності | Arapov.trade',
  //   realTitleEn: 'Equal Highs, Equal Lows and inducement: liquidity traps | Arapov.trade',
  //   groupsRus: ['Концепция Смарт Мани'],
  //   groupsUkr: ['Концепція Смарт Мані'],
  //   groupsEng: ['Smart Money Concept'],
  //   id: 530,
  // },
  // {
  //   titleUkr: 'Математичне сподівання угоди: що це і як його рахувати',
  //   linkUkr: 'expectedvalue',
  //   imgUkr: '/assets/img/content/expectedvalue.jpeg',
  //   titleRus: 'Математическое ожидание сделки: что это и как его считать',
  //   titleEn: 'Expected value of a trade: what it is and how to calculate it',
  //   descrUkr:
  //     'Що таке математичне сподівання в трейдингу, як воно пов\'язує вінрейт і співвідношення прибутку до збитку і чому саме воно визначає результат на дистанції.',
  //   descrEn:
  //     'What expected value is in trading, how it ties together win rate and the profit-to-loss ratio and why it is what determines the result over the long run.',
  //   descrRus:
  //     'Что такое математическое ожидание в трейдинге, как оно связывает винрейт и соотношение прибыли к убытку и почему именно оно определяет результат на дистанции.',
  //   realTitleRus: 'Математическое ожидание сделки: что это и как его считать | Arapov.trade',
  //   realTitleUkr: 'Математичне сподівання угоди: що це і як його рахувати | Arapov.trade',
  //   realTitleEn: 'Expected value of a trade: what it is and how to calculate it | Arapov.trade',
  //   groupsRus: ['Трейдинг для начинающих'],
  //   groupsUkr: ['Трейдинг для початківців'],
  //   groupsEng: ['Trading for Beginners'],
  //   id: 531,
  // },
  // {
  //   titleUkr: 'Кластерний графік і футпринт: як читати обсяг',
  //   linkUkr: 'footprint-cluster',
  //   imgUkr: '/assets/img/content/footprint-cluster.jpeg',
  //   titleRus: 'Кластерный график и футпринт: как читать объём',
  //   titleEn: 'Cluster Chart and Footprint: How to Read Volume',
  //   descrUkr:
  //     'Що показує кластерний (футпринт) графік, як за ним видно обсяг усередині свічки й де набирає позицію великий гравець. Обсяг як причина руху.',
  //   descrEn:
  //     'What a cluster (footprint) chart shows, how volume inside a candle is visible and where large players build positions. Volume as the cause of the move.',
  //   descrRus:
  //     'Что показывает кластерный (футпринт) график, как по нему виден объём внутри свечи и где набирает позицию крупный игрок. Объём как причина движения.',
  //   realTitleRus: 'Кластерный график и футпринт: как читать объём | Arapov.trade',
  //   realTitleUkr: 'Кластерний графік і футпринт: як читати обсяг | Arapov.trade',
  //   realTitleEn: 'Cluster Chart and Footprint: How to Read Volume | Arapov.trade',
  //   groupsRus: ['Объемный анализ рынка'],
  //   groupsUkr: ['Об`ємний аналіз ринку'],
  //   groupsEng: ['Market Volume Analysis'],
  //   id: 532,
  // },
  // {
  //   titleUkr: 'Форвардний тест: що це і чим він відрізняється від бектесту',
  //   linkUkr: 'forwardtest',
  //   imgUkr: '/assets/img/content/forwardtest.jpeg',
  //   titleRus: 'Форвардный тест: что это и чем он отличается от бэктеста',
  //   titleEn: 'Forward test: what it is and how it differs from a backtest',
  //   descrUkr:
  //     'Що таке форвардний тест торгової стратегії, чим він відрізняється від бектесту, чому захищає від підгонки і як провести його на демосчоті.',
  //   descrEn:
  //     'What a forward test of a trading strategy is, how it differs from a backtest, why it protects against curve-fitting and how to run it on a demo account.',
  //   descrRus:
  //     'Что такое форвардный тест торговой стратегии, чем он отличается от бэктеста, почему защищает от подгонки и как провести его на демосчёте.',
  //   realTitleRus: 'Форвардный тест: что это и чем он отличается от бэктеста | Arapov.trade',
  //   realTitleUkr: 'Форвардний тест: що це і чим він відрізняється від бектесту | Arapov.trade',
  //   realTitleEn: 'Forward test: what it is and how it differs from a backtest | Arapov.trade',
  //   groupsRus: ['Психология трейдинга'],
  //   groupsUkr: ['Психологія трейдингу'],
  //   groupsEng: ['Trading Psychology'],
  //   id: 533,
  // },
  // {
  //   titleUkr: 'Фрактали Білла Вільямса: що це і як їх використовувати',
  //   linkUkr: 'fractals',
  //   imgUkr: '/assets/img/content/fractals.jpeg',
  //   titleRus: 'Фракталы Билла Вильямса: что это и как их использовать',
  //   titleEn: 'Bill Williams fractals: what they are and how to use them',
  //   descrUkr:
  //     'Що таке фрактали Білла Вільямса, як читається фрактал із п\'яти барів, чому він відмічає локальні екстремуми і в чому його запізнення.',
  //   descrEn:
  //     'What Bill Williams fractals are, how a five-bar fractal is read, why it marks local extremes and what its lag is.',
  //   descrRus:
  //     'Что такое фракталы Билла Вильямса, как читается фрактал из пяти баров, почему он отмечает локальные экстремумы и в чём его запаздывание.',
  //   realTitleRus: 'Фракталы Билла Вильямса: что это и как их использовать | Arapov.trade',
  //   realTitleUkr: 'Фрактали Білла Вільямса: що це і як їх використовувати | Arapov.trade',
  //   realTitleEn: 'Bill Williams fractals: what they are and how to use them | Arapov.trade',
  //   groupsRus: ['Технический анализ'],
  //   groupsUkr: ['Технічний аналіз'],
  //   groupsEng: ['Technical Analysis'],
  //   id: 534,
  // },
  // {
  //   titleUkr: 'Funded-акаунт у проп-трейдингу: виплати й вивід прибутку',
  //   linkUkr: 'funded-account',
  //   imgUkr: '/assets/img/content/funded-account.jpeg',
  //   titleRus: 'Funded-аккаунт в проп-трейдинге: выплаты и вывод прибыли',
  //   titleEn: 'Funded Account in Prop Trading: Payouts and Withdrawals',
  //   descrUkr:
  //     'Що таке funded-акаунт, як влаштовані виплати й спліт прибутку, як виводити гроші та які правила легко порушити й втратити фінансування.',
  //   descrEn:
  //     'What a funded account is, how payouts and the profit split work, how to withdraw money and which rules are easy to break and lose funding.',
  //   descrRus:
  //     'Что такое funded-аккаунт, как устроены выплаты и сплит прибыли, как выводить деньги и какие правила легко нарушить и потерять финансирование.',
  //   realTitleRus: 'Funded-аккаунт в проп-трейдинге: выплаты и вывод прибыли | Arapov.trade',
  //   realTitleUkr: 'Funded-акаунт у проп-трейдингу: виплати й вивід прибутку | Arapov.trade',
  //   realTitleEn: 'Funded Account in Prop Trading: Payouts and Withdrawals | Arapov.trade',
  //   groupsRus: ['Трейдинг для начинающих'],
  //   groupsUkr: ['Трейдинг для початківців'],
  //   groupsEng: ['Trading for Beginners'],
  //   id: 535,
  // },
  // {
  //   titleUkr: 'Фандинг (funding rate) у крипті: що це і як працює',
  //   linkUkr: 'fundingrate',
  //   imgUkr: '/assets/img/content/fundingrate.jpeg',
  //   titleRus: 'Фандинг (funding rate) в крипте: что это и как работает',
  //   titleEn: 'Funding Rate in Crypto: What It Is and How It Works',
  //   descrUkr:
  //     'Що таке ставка фінансування на безстрокових ф\'ючерсах, хто кому платить, як фандинг впливає на утримання позиції й про що сигналить трейдеру.',
  //   descrEn:
  //     'What the funding rate on perpetual futures is, who pays whom, how funding affects holding a position and what it signals to a trader.',
  //   descrRus:
  //     'Что такое ставка финансирования на бессрочных фьючерсах, кто кому платит, как фандинг влияет на удержание позиции и о чём он сигналит трейдеру.',
  //   realTitleRus: 'Фандинг (funding rate) в крипте: что это и как работает | Arapov.trade',
  //   realTitleUkr: 'Фандинг (funding rate) у крипті: що це і як працює | Arapov.trade',
  //   realTitleEn: 'Funding Rate in Crypto: What It Is and How It Works | Arapov.trade',
  //   groupsRus: ['Криптовалюта'],
  //   groupsUkr: ['Криптовалюта'],
  //   groupsEng: ['Cryptocurrency'],
  //   id: 536,
  // },
  // {
  //   titleUkr: 'Експірація ф\'ючерса і опціона: що це і що робити трейдеру',
  //   linkUkr: 'futures-options-expiration',
  //   imgUkr: '/assets/img/content/futures-options-expiration.jpeg',
  //   titleRus: 'Экспирация фьючерса и опциона: что это и что делать трейдеру',
  //   titleEn: 'Futures and options expiration: what it is and what to do',
  //   descrUkr:
  //     'Що таке експірація ф\'ючерса й опціона, як проходить виконання і розрахунок, що таке ролловер і що робити трейдеру перед датою експірації.',
  //   descrEn:
  //     'What futures and options expiration is, how settlement works, what a rollover is and what a trader should do before the expiration date.',
  //   descrRus:
  //     'Что такое экспирация фьючерса и опциона, как проходит исполнение и расчёт, что такое ролловер и что делать трейдеру перед датой экспирации.',
  //   realTitleRus: 'Экспирация фьючерса и опциона: что это и что делать трейдеру | Arapov.trade',
  //   realTitleUkr: 'Експірація ф\'ючерса і опціона: що це і що робити трейдеру | Arapov.trade',
  //   realTitleEn: 'Futures and options expiration: what it is and what to do | Arapov.trade',
  //   groupsRus: ['Фундаментальный анализ'],
  //   groupsUkr: ['Фундаментальний аналіз'],
  //   groupsEng: ['Fundamental Analysis'],
  //   id: 537,
  // },
  // {
  //   titleUkr: 'Комісії мережі (газ): що це і чому змінюються',
  //   linkUkr: 'gas-fees',
  //   imgUkr: '/assets/img/content/gas-fees.jpeg',
  //   titleRus: 'Комиссии сети (газ): что это и почему меняются',
  //   titleEn: 'Network Fees (Gas): What They Are and Why They Change',
  //   descrUkr:
  //     'Що таке газ у крипті, з чого складається комісія за транзакцію, чому вона стрибає в години навантаження і як не переплачувати за перекази.',
  //   descrEn:
  //     'What gas in crypto is, what a transaction fee consists of, why it spikes in busy hours and how not to overpay for transfers.',
  //   descrRus:
  //     'Что такое газ в крипте, из чего складывается комиссия за транзакцию, почему она скачет в часы нагрузки и как не переплачивать за переводы.',
  //   realTitleRus: 'Комиссии сети (газ): что это и почему меняются | Arapov.trade',
  //   realTitleUkr: 'Комісії мережі (газ): що це і чому змінюються | Arapov.trade',
  //   realTitleEn: 'Network Fees (Gas): What They Are and Why They Change | Arapov.trade',
  //   groupsRus: ['Криптовалюта'],
  //   groupsUkr: ['Криптовалюта'],
  //   groupsEng: ['Cryptocurrency'],
  //   id: 538,
  // },
  // {
  //   titleUkr: 'Хеджування в трейдингу: що це і чи потрібне новачку',
  //   linkUkr: 'hedging',
  //   imgUkr: '/assets/img/content/hedging.jpeg',
  //   titleRus: 'Хеджирование в трейдинге: что это и нужно ли новичку',
  //   titleEn: 'Hedging in Trading: What It Is and Does a Beginner Need It',
  //   descrUkr:
  //     'Що таке хеджування, як страхують позицію від несприятливого руху й чому новачку частіше досить простого стоп-лосса, а не складних схем.',
  //   descrEn:
  //     'What hedging is, how a position is insured against an adverse move and why a beginner often just needs a simple stop-loss, not complex schemes.',
  //   descrRus:
  //     'Что такое хеджирование, как страхуют позицию от неблагоприятного движения и почему новичку чаще достаточно простого стоп-лосса, а не сложных схем.',
  //   realTitleRus: 'Хеджирование в трейдинге: что это и нужно ли новичку | Arapov.trade',
  //   realTitleUkr: 'Хеджування в трейдингу: що це і чи потрібне новачку | Arapov.trade',
  //   realTitleEn: 'Hedging in Trading: What It Is and Does a Beginner Need It | Arapov.trade',
  //   groupsRus: ['Трейдинг для начинающих'],
  //   groupsUkr: ['Трейдинг для початківців'],
  //   groupsEng: ['Trading for Beginners'],
  //   id: 539,
  // },
  // {
  //   titleUkr: 'Свічки Heikin Ashi: що це, як читати і в чому їхня небезпека',
  //   linkUkr: 'heikin-ashi',
  //   imgUkr: '/assets/img/content/heikin-ashi.jpeg',
  //   titleRus: 'Свечи Heikin Ashi: что это, как читать и в чём их опасность',
  //   titleEn: 'Heikin Ashi candles: how to read them and the danger',
  //   descrUkr:
  //     'Що таке свічки Heikin Ashi, як вони згладжують ціну, чим відрізняються від японських свічок і чому приховують реальні ціни та розвороти.',
  //   descrEn:
  //     'What Heikin Ashi candles are, how they smooth the price, how they differ from Japanese candles and why they hide real prices and reversals.',
  //   descrRus:
  //     'Что такое свечи Heikin Ashi, как они сглаживают цену, чем отличаются от японских свечей и почему скрывают реальные цены и развороты.',
  //   realTitleRus: 'Свечи Heikin Ashi: что это, как читать и в чём их опасность | Arapov.trade',
  //   realTitleUkr: 'Свічки Heikin Ashi: що це, як читати і в чому їхня небезпека | Arapov.trade',
  //   realTitleEn: 'Heikin Ashi candles: how to read them and the danger | Arapov.trade',
  //   groupsRus: ['Технический анализ'],
  //   groupsUkr: ['Технічний аналіз'],
  //   groupsEng: ['Technical Analysis'],
  //   id: 540,
  // },
  // {
  //   titleUkr: 'Хто такий брокер і як обрати брокера для торгівлі на біржі',
  //   linkUkr: 'how-to-choose-broker',
  //   imgUkr: '/assets/img/content/how-to-choose-broker.jpeg',
  //   titleRus: 'Кто такой брокер и как выбрать брокера для торговли на бирже',
  //   titleEn: 'Who Is a Broker and How to Choose a Broker for Trading',
  //   descrUkr:
  //     'Хто такий брокер, чим він відрізняється від біржі, як обрати надійного брокера за регуляцією, ліцензією та комісіями і як не натрапити на кухню.',
  //   descrEn:
  //     'Who a broker is, how it differs from an exchange, how to choose a reliable broker by regulation, licence and fees, and how to avoid a dealing-desk scam.',
  //   descrRus:
  //     'Кто такой брокер, чем он отличается от биржи, как выбрать надёжного брокера по регуляции, лицензии и комиссиям и как не попасть на кухню.',
  //   realTitleRus: 'Кто такой брокер и как выбрать брокера для торговли на бирже | Arapov.trade',
  //   realTitleUkr: 'Хто такий брокер і як обрати брокера для торгівлі на біржі | Arapov.trade',
  //   realTitleEn: 'Who Is a Broker and How to Choose a Broker for Trading | Arapov.trade',
  //   groupsRus: ['Трейдинг для начинающих'],
  //   groupsUkr: ['Трейдинг для початківців'],
  //   groupsEng: ['Trading for Beginners'],
  //   id: 541,
  // },
  // {
  //   titleUkr: 'ICO та IDO: що це і як не натрапити на шахраїв',
  //   linkUkr: 'ico-vs-ido',
  //   imgUkr: '/assets/img/content/ico-vs-ido.jpeg',
  //   titleRus: 'ICO и IDO: что это и как не попасть на мошенников',
  //   titleEn: 'ICO and IDO: What They Are and How to Avoid Scammers',
  //   descrUkr:
  //     'Що таке первинні розміщення токенів ICO та IDO, чим вони відрізняються, чому майже не регулюються і за якими червоними прапорцями розпізнати скам.',
  //   descrEn:
  //     'What the ICO and IDO token offerings are, how they differ, why they are barely regulated and by which red flags to recognize a scam.',
  //   descrRus:
  //     'Что такое первичные размещения токенов ICO и IDO, чем они отличаются, почему почти не регулируются и по каким красным флагам распознать скам.',
  //   realTitleRus: 'ICO и IDO: что это и как не попасть на мошенников | Arapov.trade',
  //   realTitleUkr: 'ICO та IDO: що це і як не натрапити на шахраїв | Arapov.trade',
  //   realTitleEn: 'ICO and IDO: What They Are and How to Avoid Scammers | Arapov.trade',
  //   groupsRus: ['Криптовалюта'],
  //   groupsUkr: ['Криптовалюта'],
  //   groupsEng: ['Cryptocurrency'],
  //   id: 542,
  // },
  // {
  //   titleUkr: 'Кіллзони ICT: що це і як час сесій впливає на торгівлю',
  //   linkUkr: 'ict-kill-zones',
  //   imgUkr: '/assets/img/content/ict-kill-zones.jpeg',
  //   titleRus: 'Киллзоны ICT: что это и как время сессий влияет на торговлю',
  //   titleEn: 'ICT Kill Zones: How Session Time Affects Trading',
  //   descrUkr:
  //     'Що таке кіллзони ICT, у які години ринок найактивніший і чому час — лише фільтр, а точку входу вирішують рівень і обсяг, а не години на годиннику.',
  //   descrEn:
  //     'What ICT kill zones are, in which hours the market is most active and why time is only a filter, while level and volume decide the entry.',
  //   descrRus:
  //     'Что такое киллзоны ICT, в какие часы рынок активнее всего и почему время — лишь фильтр, а точку входа решают уровень и объём, а не часы на часах.',
  //   realTitleRus: 'Киллзоны ICT: что это и как время сессий влияет на торговлю | Arapov.trade',
  //   realTitleUkr: 'Кіллзони ICT: що це і як час сесій впливає на торгівлю | Arapov.trade',
  //   realTitleEn: 'ICT Kill Zones: How Session Time Affects Trading | Arapov.trade',
  //   groupsRus: ['Концепция Смарт Мани'],
  //   groupsUkr: ['Концепція Смарт Мані'],
  //   groupsEng: ['Smart Money Concept'],
  //   id: 543,
  // },
  // {
  //   titleUkr: 'ICT-трейдинг (Inner Circle Trader): що це простими словами',
  //   linkUkr: 'ict-trading',
  //   imgUkr: '/assets/img/content/ict-trading.jpeg',
  //   titleRus: 'ICT-трейдинг (Inner Circle Trader): что это простыми словами',
  //   titleEn: 'ICT Trading (Inner Circle Trader): What It Is, Simply',
  //   descrUkr:
  //     'Хто такий Inner Circle Trader, які ключові концепції в методики ICT і як вони пов\'язані зі Smart Money й методом Вайкоффа. Де користь, а де перебір.',
  //   descrEn:
  //     'Who the Inner Circle Trader is, the key concepts of the ICT method and how they tie to Smart Money and Wyckoff. Where it helps and where it overreaches.',
  //   descrRus:
  //     'Кто такой Inner Circle Trader, какие ключевые концепции у методики ICT и как они связаны со Smart Money и методом Вайкоффа. Где польза, а где перебор.',
  //   realTitleRus: 'ICT-трейдинг (Inner Circle Trader): что это простыми словами | Arapov.trade',
  //   realTitleUkr: 'ICT-трейдинг (Inner Circle Trader): що це простими словами | Arapov.trade',
  //   realTitleEn: 'ICT Trading (Inner Circle Trader): What It Is, Simply | Arapov.trade',
  //   groupsRus: ['Концепция Смарт Мани'],
  //   groupsUkr: ['Концепція Смарт Мані'],
  //   groupsEng: ['Smart Money Concept'],
  //   id: 544,
  // },
  // {
  //   titleUkr: 'Layer 2 (L2): що це й навіщо рішення другого рівня',
  //   linkUkr: 'layer2',
  //   imgUkr: '/assets/img/content/layer2.jpeg',
  //   titleRus: 'Layer 2 (L2): что это и зачем решения второго уровня',
  //   titleEn: 'Layer 2 (L2): What It Is and Why It\'s Needed',
  //   descrUkr:
  //     'Що таке мережі другого рівня поверх блокчейна, як вони пришвидшують транзакції й знижують комісії й навіщо це при дорогому газі основної мережі.',
  //   descrEn:
  //     'What second-layer networks over a blockchain are, how they speed up transactions and cut fees and why this matters when base-network gas is dear.',
  //   descrRus:
  //     'Что такое сети второго уровня поверх блокчейна, как они ускоряют транзакции и снижают комиссии и зачем это нужно при дорогом газе основной сети.',
  //   realTitleRus: 'Layer 2 (L2): что это и зачем решения второго уровня | Arapov.trade',
  //   realTitleUkr: 'Layer 2 (L2): що це й навіщо рішення другого рівня | Arapov.trade',
  //   realTitleEn: 'Layer 2 (L2): What It Is and Why It\'s Needed | Arapov.trade',
  //   groupsRus: ['Криптовалюта'],
  //   groupsUkr: ['Криптовалюта'],
  //   groupsEng: ['Cryptocurrency'],
  //   id: 545,
  // },
  // {
  //   titleUkr: 'Ліквідація позиції: що це і як її не зловити',
  //   linkUkr: 'liquidation',
  //   imgUkr: '/assets/img/content/liquidation.jpeg',
  //   titleRus: 'Ликвидация позиции: что это и как её не словить',
  //   titleEn: 'Position Liquidation: What It Is and How to Avoid It',
  //   descrUkr:
  //     'Що таке ліквідація на маржинальній торгівлі, за якої ціни вона настає і які правила ризик-менеджменту бережуть рахунок від обнулення одним рухом.',
  //   descrEn:
  //     'What liquidation in margin trading is, at what price it hits and which risk-management rules save the account from a one-move blow-up.',
  //   descrRus:
  //     'Что такое ликвидация на маржинальной торговле, при какой цене она наступает и какие правила риск-менеджмента берегут счёт от обнуления одним движением.',
  //   realTitleRus: 'Ликвидация позиции: что это и как её не словить | Arapov.trade',
  //   realTitleUkr: 'Ліквідація позиції: що це і як її не зловити | Arapov.trade',
  //   realTitleEn: 'Position Liquidation: What It Is and How to Avoid It | Arapov.trade',
  //   groupsRus: ['Трейдинг для начинающих'],
  //   groupsUkr: ['Трейдинг для початківців'],
  //   groupsEng: ['Trading for Beginners'],
  //   id: 546,
  // },
  // {
  //   titleUkr: 'Лонг і шорт у трейдингу: що це і як шортити',
  //   linkUkr: 'longandshort',
  //   imgUkr: '/assets/img/content/longandshort.jpeg',
  //   titleRus: 'Лонг и шорт в трейдинге: что это и как шортить',
  //   titleEn: 'Long and Short in Trading: What They Are and How to Short',
  //   descrUkr:
  //     'Простими словами про довгу й коротку позицію: як заробити на зростанні й на падінні, що означає шортити і які ризики в короткої позиції.',
  //   descrEn:
  //     'In simple terms about long and short positions: how to earn on a rise and a fall, what shorting means and what risks a short position carries.',
  //   descrRus:
  //     'Простыми словами о длинной и короткой позиции: как заработать на росте и на падении, что значит шортить и какие риски у короткой позиции.',
  //   realTitleRus: 'Лонг и шорт в трейдинге: что это и как шортить | Arapov.trade',
  //   realTitleUkr: 'Лонг і шорт у трейдингу: що це і як шортити | Arapov.trade',
  //   realTitleEn: 'Long and Short in Trading: What They Are and How to Short | Arapov.trade',
  //   groupsRus: ['Трейдинг для начинающих'],
  //   groupsUkr: ['Трейдинг для початківців'],
  //   groupsEng: ['Trading for Beginners'],
  //   id: 547,
  // },
  // {
  //   titleUkr: 'Що таке лот у трейдингу і як розрахувати розмір лота',
  //   linkUkr: 'lot-size',
  //   imgUkr: '/assets/img/content/lot-size.jpeg',
  //   titleRus: 'Что такое лот в трейдинге и как рассчитать размер лота',
  //   titleEn: 'What Is a Lot in Trading and How to Calculate Lot Size',
  //   descrUkr:
  //     'Що таке лот, які бувають види лотів, як розмір лота впливає на вартість пункту і як розрахувати розмір позиції під допустимий ризик.',
  //   descrEn:
  //     'What a lot is, what types of lots exist, how lot size affects the pip value, and how to calculate position size to an allowable risk.',
  //   descrRus:
  //     'Что такое лот, какие бывают виды лотов, как размер лота влияет на стоимость пункта и как рассчитать размер позиции под допустимый риск.',
  //   realTitleRus: 'Что такое лот в трейдинге и как рассчитать размер лота | Arapov.trade',
  //   realTitleUkr: 'Що таке лот у трейдингу і як розрахувати розмір лота | Arapov.trade',
  //   realTitleEn: 'What Is a Lot in Trading and How to Calculate Lot Size | Arapov.trade',
  //   groupsRus: ['Трейдинг для начинающих'],
  //   groupsUkr: ['Трейдинг для початківців'],
  //   groupsEng: ['Trading for Beginners'],
  //   id: 548,
  // },
  // {
  //   titleUkr: 'Маржинальна торгівля й плече: що це і ризики',
  //   linkUkr: 'marginleveragecrypto',
  //   imgUkr: '/assets/img/content/marginleveragecrypto.jpeg',
  //   titleRus: 'Маржинальная торговля и плечо: что это и риски',
  //   titleEn: 'Margin Trading and Leverage: What They Are and the Risks',
  //   descrUkr:
  //     'Що таке кредитне плече й маржинальна торгівля, як воно множить і прибуток, і збиток, і чому велике плече — коротка дорога до ліквідації.',
  //   descrEn:
  //     'What leverage and margin trading are, how it multiplies both profit and loss, and why large leverage is a short road to liquidation.',
  //   descrRus:
  //     'Что такое кредитное плечо и маржинальная торговля, как оно умножает и прибыль, и убыток, и почему большое плечо — короткая дорога к ликвидации.',
  //   realTitleRus: 'Маржинальная торговля и плечо: что это и риски | Arapov.trade',
  //   realTitleUkr: 'Маржинальна торгівля й плече: що це і ризики | Arapov.trade',
  //   realTitleEn: 'Margin Trading and Leverage: What They Are and the Risks | Arapov.trade',
  //   groupsRus: ['Криптовалюта'],
  //   groupsUkr: ['Криптовалюта'],
  //   groupsEng: ['Cryptocurrency'],
  //   id: 549,
  // },
  // {
  //   titleUkr: 'Що таке консолідація на ринку простими словами',
  //   linkUkr: 'market-consolidation',
  //   imgUkr: '/assets/img/content/market-consolidation.jpeg',
  //   titleRus: 'Что такое консолидация на рынке простыми словами',
  //   titleEn: 'What Is Consolidation in the Market in Simple Terms',
  //   descrUkr:
  //     'Що таке консолідація на ринку, чим вона відрізняється від тренду і флету, як поводиться обсяг у діапазоні і як трейдери торгують пробій та відбій від меж.',
  //   descrEn:
  //     'What consolidation is, how it differs from a trend and a flat, how volume behaves in a range, and how traders trade the breakout and the bounce off the edges.',
  //   descrRus:
  //     'Что такое консолидация на рынке, чем она отличается от тренда и флэта, как ведёт себя объём в диапазоне и как трейдеры торгуют пробой и отбой от границ.',
  //   realTitleRus: 'Что такое консолидация на рынке простыми словами | Arapov.trade',
  //   realTitleUkr: 'Що таке консолідація на ринку простими словами | Arapov.trade',
  //   realTitleEn: 'What Is Consolidation in the Market in Simple Terms | Arapov.trade',
  //   groupsRus: ['Технический анализ'],
  //   groupsUkr: ['Технічний аналіз'],
  //   groupsEng: ['Technical Analysis'],
  //   id: 550,
  // },
  // {
  //   titleUkr: 'Структура ринку в трейдингу: BOS і CHoCH простими словами',
  //   linkUkr: 'market-structure-bos-choch',
  //   imgUkr: '/assets/img/content/market-structure-bos-choch.jpeg',
  //   titleRus: 'Структура рынка в трейдинге: BOS и CHoCH простыми словами',
  //   titleEn: 'Market Structure in Trading: BOS and CHoCH in Simple Terms',
  //   descrUkr:
  //     'Що таке структура ринку, як читати максимуми й мінімуми, що таке злам структури BOS і зміна характеру CHoCH і як це допомагає визначити напрям.',
  //   descrEn:
  //     'What market structure is, how to read highs and lows, what a break of structure (BOS) and change of character (CHoCH) are, and how it defines direction.',
  //   descrRus:
  //     'Что такое структура рынка, как читать максимумы и минимумы, что такое слом структуры BOS и смена характера CHoCH и как это помогает определить направление.',
  //   realTitleRus: 'Структура рынка в трейдинге: BOS и CHoCH простыми словами | Arapov.trade',
  //   realTitleUkr: 'Структура ринку в трейдингу: BOS і CHoCH простими словами | Arapov.trade',
  //   realTitleEn: 'Market Structure in Trading: BOS and CHoCH in Simple Terms | Arapov.trade',
  //   groupsRus: ['Концепция Смарт Мани'],
  //   groupsUkr: ['Концепція Смарт Мані'],
  //   groupsEng: ['Smart Money Concept'],
  //   id: 551,
  // },
  // {
  //   titleUkr: 'Мемкоїни: що це і чому це казино, а не інвестиція',
  //   linkUkr: 'memecoins',
  //   imgUkr: '/assets/img/content/memecoins.jpeg',
  //   titleRus: 'Мемкоины: что это и почему это казино, а не инвестиция',
  //   titleEn: 'Memecoins: What They Are and Why It\'s a Casino',
  //   descrUkr:
  //     'Що таке мемкоїни, на чому тримається їхня ціна, чому це чиста спекуляція на хайпі і як не лишитися зі знеціненим токеном на руках.',
  //   descrEn:
  //     'What memecoins are, what holds their price up, why it is pure speculation on hype and how not to be left holding a worthless token.',
  //   descrRus:
  //     'Что такое мемкоины, на чём держится их цена, почему это чистая спекуляция на хайпе и как не остаться с обесценившимся токеном на руках.',
  //   realTitleRus: 'Мемкоины: что это и почему это казино, а не инвестиция | Arapov.trade',
  //   realTitleUkr: 'Мемкоїни: що це і чому це казино, а не інвестиція | Arapov.trade',
  //   realTitleEn: 'Memecoins: What They Are and Why It\'s a Casino | Arapov.trade',
  //   groupsRus: ['Криптовалюта'],
  //   groupsUkr: ['Криптовалюта'],
  //   groupsEng: ['Cryptocurrency'],
  //   id: 552,
  // },
  // {
  //   titleUkr: 'Індикатор MFI (Money Flow Index): що це і як його читати',
  //   linkUkr: 'mfi',
  //   imgUkr: '/assets/img/content/mfi.jpeg',
  //   titleRus: 'Индикатор MFI (Money Flow Index): что это и как его читать',
  //   titleEn: 'MFI indicator (Money Flow Index): what it is and how to read it',
  //   descrUkr:
  //     'Що таке індикатор MFI, чим він відрізняється від RSI, як читати перекупленість і дивергенцію і чому він чесний лише там, де чесний обсяг.',
  //   descrEn:
  //     'What the MFI indicator is, how it differs from RSI, how to read overbought and divergence and why it is honest only where volume is honest.',
  //   descrRus:
  //     'Что такое индикатор MFI, чем он отличается от RSI, как читать перекупленность и дивергенцию и почему он честен только там, где честен объём.',
  //   realTitleRus: 'Индикатор MFI (Money Flow Index): что это и как его читать | Arapov.trade',
  //   realTitleUkr: 'Індикатор MFI (Money Flow Index): що це і як його читати | Arapov.trade',
  //   realTitleEn: 'MFI indicator (Money Flow Index): what it is and how to read it | Arapov.trade',
  //   groupsRus: ['Объемный анализ рынка'],
  //   groupsUkr: ['Об`ємний аналіз ринку'],
  //   groupsEng: ['Market Volume Analysis'],
  //   id: 553,
  // },
  // {
  //   titleUkr: 'Індикатор OBV: що це і як читати обсяг',
  //   linkUkr: 'obv',
  //   imgUkr: '/assets/img/content/obv.jpeg',
  //   titleRus: 'Индикатор OBV: что это и как читать объём',
  //   titleEn: 'OBV Indicator: What It Is and How to Read Volume',
  //   descrUkr:
  //     'Що таке індикатор балансового обсягу OBV, як він підтверджує рух ціни обсягом і про що говорить дивергенція. Обсяг як первинна причина.',
  //   descrEn:
  //     'What the On-Balance Volume (OBV) indicator is, how it confirms a price move with volume and what divergence tells. Volume as the primary cause.',
  //   descrRus:
  //     'Что такое индикатор балансового объёма OBV, как он подтверждает движение цены объёмом и о чём говорит дивергенция. Объём как первичная причина.',
  //   realTitleRus: 'Индикатор OBV: что это и как читать объём | Arapov.trade',
  //   realTitleUkr: 'Індикатор OBV: що це і як читати обсяг | Arapov.trade',
  //   realTitleEn: 'OBV Indicator: What It Is and How to Read Volume | Arapov.trade',
  //   groupsRus: ['Объемный анализ рынка'],
  //   groupsUkr: ['Об`ємний аналіз ринку'],
  //   groupsEng: ['Market Volume Analysis'],
  //   id: 554,
  // },
  // {
  //   titleUkr: 'Відкритий інтерес (Open Interest): що це і як його читати',
  //   linkUkr: 'openinterest',
  //   imgUkr: '/assets/img/content/openinterest.jpeg',
  //   titleRus: 'Открытый интерес (Open Interest): что это и как его читать',
  //   titleEn: 'Open Interest: what it is and how to read it',
  //   descrUkr:
  //     'Що таке відкритий інтерес на ф\'ючерсах, чим він відрізняється від обсягу і як зростання або падіння OI разом із ціною підтверджує або послаблює тренд.',
  //   descrEn:
  //     'What open interest is on futures, how it differs from volume and how a rise or fall in OI together with price confirms or weakens a trend.',
  //   descrRus:
  //     'Что такое открытый интерес на фьючерсах, чем он отличается от объёма и как рост или падение OI вместе с ценой подтверждает или ослабляет тренд.',
  //   realTitleRus: 'Открытый интерес (Open Interest): что это и как его читать | Arapov.trade',
  //   realTitleUkr: 'Відкритий інтерес (Open Interest): що це і як його читати | Arapov.trade',
  //   realTitleEn: 'Open Interest: what it is and how to read it | Arapov.trade',
  //   groupsRus: ['Объемный анализ рынка'],
  //   groupsUkr: ['Об`ємний аналіз ринку'],
  //   groupsEng: ['Market Volume Analysis'],
  //   id: 555,
  // },
  // {
  //   titleUkr: 'Кореляція валютних пар: що це і як використовувати',
  //   linkUkr: 'paircorrelation',
  //   imgUkr: '/assets/img/content/paircorrelation.jpeg',
  //   titleRus: 'Корреляция валютных пар: что это и как использовать',
  //   titleEn: 'Currency Pair Correlation: What It Is and How to Use It',
  //   descrUkr:
  //     'Що таке кореляція валютних пар, чому схожі пари рухаються разом чи дзеркально і як не відкрити випадково подвійний ризик в один бік.',
  //   descrEn:
  //     'What currency pair correlation is, why similar pairs move together or mirror each other and how not to accidentally open a double risk one way.',
  //   descrRus:
  //     'Что такое корреляция валютных пар, почему похожие пары двигаются вместе или зеркально и как не открыть случайно двойной риск в одну сторону.',
  //   realTitleRus: 'Корреляция валютных пар: что это и как использовать | Arapov.trade',
  //   realTitleUkr: 'Кореляція валютних пар: що це і як використовувати | Arapov.trade',
  //   realTitleEn: 'Currency Pair Correlation: What It Is and How to Use It | Arapov.trade',
  //   groupsRus: ['Фундаментальный анализ'],
  //   groupsUkr: ['Фундаментальний аналіз'],
  //   groupsEng: ['Fundamental Analysis'],
  //   id: 556,
  // },
  // {
  //   titleUkr: 'Parabolic SAR: що це за індикатор і як його використовувати',
  //   linkUkr: 'parabolic-sar',
  //   imgUkr: '/assets/img/content/parabolic-sar.jpeg',
  //   titleRus: 'Parabolic SAR: что это за индикатор и как его использовать',
  //   titleEn: 'Parabolic SAR: what this indicator is and how to use it',
  //   descrUkr:
  //     'Що таке індикатор Parabolic SAR, як він показує розворот і трейлінг-стоп, чому він запізнюється у флеті і де його розумно застосовувати.',
  //   descrEn:
  //     'What the Parabolic SAR indicator is, how it shows a reversal and a trailing stop, why it lags in a range and where it is sensible to apply it.',
  //   descrRus:
  //     'Что такое индикатор Parabolic SAR, как он показывает разворот и трейлинг-стоп, почему он запаздывает во флэте и где его разумно применять.',
  //   realTitleRus: 'Parabolic SAR: что это за индикатор и как его использовать | Arapov.trade',
  //   realTitleUkr: 'Parabolic SAR: що це за індикатор і як його використовувати | Arapov.trade',
  //   realTitleEn: 'Parabolic SAR: what this indicator is and how to use it | Arapov.trade',
  //   groupsRus: ['Технический анализ'],
  //   groupsUkr: ['Технічний аналіз'],
  //   groupsEng: ['Technical Analysis'],
  //   id: 557,
  // },
  // {
  //   titleUkr: 'Безстрокові ф\'ючерси (perpetual): що це й відмінності',
  //   linkUkr: 'perpetualfutures',
  //   imgUkr: '/assets/img/content/perpetualfutures.jpeg',
  //   titleRus: 'Бессрочные фьючерсы (perpetual): что это и отличия',
  //   titleEn: 'Perpetual Futures: What They Are and Key Differences',
  //   descrUkr:
  //     'Що таке безстрокові ф\'ючерси в крипті, чим відрізняються від звичайних, до чого тут фандинг і чому це інструмент із підвищеним ризиком для новачка.',
  //   descrEn:
  //     'What perpetual futures in crypto are, how they differ from classic ones, why funding matters and why they are a higher-risk tool for a beginner.',
  //   descrRus:
  //     'Что такое бессрочные фьючерсы в крипте, чем отличаются от обычных, при чём тут фандинг и почему это инструмент с повышенным риском для новичка.',
  //   realTitleRus: 'Бессрочные фьючерсы (perpetual): что это и отличия | Arapov.trade',
  //   realTitleUkr: 'Безстрокові ф\'ючерси (perpetual): що це й відмінності | Arapov.trade',
  //   realTitleEn: 'Perpetual Futures: What They Are and Key Differences | Arapov.trade',
  //   groupsRus: ['Криптовалюта'],
  //   groupsUkr: ['Криптовалюта'],
  //   groupsEng: ['Cryptocurrency'],
  //   id: 558,
  // },
  // {
  //   titleUkr: 'Піпс, пункт і тик: що це і в чому різниця простими словами',
  //   linkUkr: 'pip-point-tick',
  //   imgUkr: '/assets/img/content/pip-point-tick.jpeg',
  //   titleRus: 'Пипс, пункт и тик: что это и в чём разница простыми словами',
  //   titleEn: 'Pip, point and tick: what they are and how they differ',
  //   descrUkr:
  //     'Що таке піпс, пункт і тик, чим вони відрізняються і навіщо потрібні: піпс на форексі, пункт на акціях, тик на біржі, і як рахувати ризик у тиках.',
  //   descrEn:
  //     'What a pip, a point and a tick are and how they differ: a pip on forex, a point on stocks, a tick on the exchange, and how to count risk in ticks.',
  //   descrRus:
  //     'Что такое пипс, пункт и тик, чем они отличаются и зачем нужны: пипс на форексе, пункт на акциях, тик на бирже, и как считать риск в тиках.',
  //   realTitleRus: 'Пипс, пункт и тик: что это и в чём разница простыми словами | Arapov.trade',
  //   realTitleUkr: 'Піпс, пункт і тик: що це і в чому різниця простими словами | Arapov.trade',
  //   realTitleEn: 'Pip, point and tick: what they are and how they differ | Arapov.trade',
  //   groupsRus: ['Трейдинг для начинающих'],
  //   groupsUkr: ['Трейдинг для початківців'],
  //   groupsEng: ['Trading for Beginners'],
  //   id: 559,
  // },
  // {
  //   titleUkr: 'Pivot Points (точки розвороту): що це і як рахувати опорні рівні',
  //   linkUkr: 'pivot-points',
  //   imgUkr: '/assets/img/content/pivot-points.jpeg',
  //   titleRus: 'Pivot Points (точки разворота): что это и как считать',
  //   titleEn: 'Pivot Points: what they are and how to calculate support levels',
  //   descrUkr:
  //     'Що таке Pivot Points, як рахуються опорна точка та рівні підтримки й опору і чому це лише орієнтир, а не сигнал для входу.',
  //   descrEn:
  //     'What Pivot Points are, how the pivot point and the support and resistance levels are calculated and why it is only a reference, not an entry signal.',
  //   descrRus:
  //     'Что такое Pivot Points, как считаются опорная точка и уровни поддержки и сопротивления и почему это лишь ориентир, а не сигнал для входа.',
  //   realTitleRus: 'Pivot Points (точки разворота): что это и как считать | Arapov.trade',
  //   realTitleUkr: 'Pivot Points (точки розвороту): що це і як рахувати опорні рівні | Arapov.trade',
  //   realTitleEn: 'Pivot Points: what they are and how to calculate support levels | Arapov.trade',
  //   groupsRus: ['Технический анализ'],
  //   groupsUkr: ['Технічний аналіз'],
  //   groupsEng: ['Technical Analysis'],
  //   id: 560,
  // },
  // {
  //   titleUkr: 'Позиційна торгівля: що це і кому підходить',
  //   linkUkr: 'position-trading',
  //   imgUkr: '/assets/img/content/position-trading.jpeg',
  //   titleRus: 'Позиционная торговля: что это и кому подходит',
  //   titleEn: 'Position Trading: What It Is and Who It Suits',
  //   descrUkr:
  //     'Що таке позиційна торгівля, чим вона відрізняється від свінгу й інвестицій, кому підходить довгий горизонт і чому навіть тут не можна прибирати стоп-лосс.',
  //   descrEn:
  //     'What position trading is, how it differs from swing and investing, who the long horizon suits and why even here you cannot remove the stop-loss.',
  //   descrRus:
  //     'Что такое позиционная торговля, чем она отличается от свинга и инвестиций, кому подходит долгий горизонт и почему даже тут нельзя убирать стоп-лосс.',
  //   realTitleRus: 'Позиционная торговля: что это и кому подходит | Arapov.trade',
  //   realTitleUkr: 'Позиційна торгівля: що це і кому підходить | Arapov.trade',
  //   realTitleEn: 'Position Trading: What It Is and Who It Suits | Arapov.trade',
  //   groupsRus: ['Трейдинг для начинающих'],
  //   groupsUkr: ['Трейдинг для початківців'],
  //   groupsEng: ['Trading for Beginners'],
  //   id: 561,
  // },
  // {
  //   titleUkr: 'Що таке постмаркет: торгівля після закриття біржі',
  //   linkUkr: 'post-market-trading',
  //   imgUkr: '/assets/img/content/post-market-trading.jpeg',
  //   titleRus: 'Что такое постмаркет: торговля после закрытия биржи',
  //   titleEn: 'What Is the Post-Market: Trading After the Exchange Closes',
  //   descrUkr:
  //     'Що таке постмаркет, о котрій він іде, чому ціна сильно рухається після закриття біржі на звітах і чим відрізняється від премаркету та основної сесії.',
  //   descrEn:
  //     'What the post-market is, when it runs, why the price moves so much after the close on earnings, and how it differs from the pre-market and regular session.',
  //   descrRus:
  //     'Что такое постмаркет, во сколько идёт, почему цена сильно двигается после закрытия биржи на отчётах и чем отличается от премаркета и основной сессии.',
  //   realTitleRus: 'Что такое постмаркет: торговля после закрытия биржи | Arapov.trade',
  //   realTitleUkr: 'Що таке постмаркет: торгівля після закриття біржі | Arapov.trade',
  //   realTitleEn: 'What Is the Post-Market: Trading After the Exchange Closes | Arapov.trade',
  //   groupsRus: ['Трейдинг для начинающих'],
  //   groupsUkr: ['Трейдинг для початківців'],
  //   groupsEng: ['Trading for Beginners'],
  //   id: 562,
  // },
  // {
  //   titleUkr: 'Механізми консенсусу PoW і PoS: що це простими словами',
  //   linkUkr: 'pow-vs-pos',
  //   imgUkr: '/assets/img/content/pow-vs-pos.jpeg',
  //   titleRus: 'Механизмы консенсуса PoW и PoS: что это простыми словами',
  //   titleEn: 'PoW and PoS Consensus Mechanisms: What They Are, Simply',
  //   descrUkr:
  //     'Що таке механізм консенсусу, чим Proof of Work відрізняється від Proof of Stake, до чого тут майнінг і стейкінг і чому жоден з них не «кращий».',
  //   descrEn:
  //     'What a consensus mechanism is, how Proof of Work differs from Proof of Stake, why mining and staking matter and why neither one is better.',
  //   descrRus:
  //     'Что такое механизм консенсуса, чем Proof of Work отличается от Proof of Stake, при чём тут майнинг и стейкинг и почему ни один из них не «лучше».',
  //   realTitleRus: 'Механизмы консенсуса PoW и PoS: что это простыми словами | Arapov.trade',
  //   realTitleUkr: 'Механізми консенсусу PoW і PoS: що це простими словами | Arapov.trade',
  //   realTitleEn: 'PoW and PoS Consensus Mechanisms: What They Are, Simply | Arapov.trade',
  //   groupsRus: ['Криптовалюта'],
  //   groupsUkr: ['Криптовалюта'],
  //   groupsEng: ['Cryptocurrency'],
  //   id: 563,
  // },
  // {
  //   titleUkr: 'Power of Three (AMD): накопичення, маніпуляція, скид',
  //   linkUkr: 'power-of-three',
  //   imgUkr: '/assets/img/content/power-of-three.jpeg',
  //   titleRus: 'Power of Three (AMD): накопление, манипуляция, сброс',
  //   titleEn: 'Power of Three (AMD): The Three Phases of Price',
  //   descrUkr:
  //     'Що таке модель Power of Three в концепції Smart Money, як розгортаються фази накопичення, маніпуляції й розподілу і де тут здоровий глузд.',
  //   descrEn:
  //     'What the Power of Three model is, how the accumulation, manipulation and distribution phases unfold and why it echoes the Wyckoff method.',
  //   descrRus:
  //     'Что такое модель Power of Three в концепции Smart Money, как разворачиваются фазы накопления, манипуляции и распределения и где тут здравый смысл.',
  //   realTitleRus: 'Power of Three (AMD): накопление, манипуляция, сброс | Arapov.trade',
  //   realTitleUkr: 'Power of Three (AMD): накопичення, маніпуляція, скид | Arapov.trade',
  //   realTitleEn: 'Power of Three (AMD): The Three Phases of Price | Arapov.trade',
  //   groupsRus: ['Концепция Смарт Мани'],
  //   groupsUkr: ['Концепція Смарт Мані'],
  //   groupsEng: ['Smart Money Concept'],
  //   id: 564,
  // },
  // {
  //   titleUkr: 'Що таке премаркет: торги до відкриття біржі',
  //   linkUkr: 'pre-market-trading',
  //   imgUkr: '/assets/img/content/pre-market-trading.jpeg',
  //   titleRus: 'Что такое премаркет: торги до открытия биржи',
  //   titleEn: 'What Is the Pre-Market: Trading Before the Exchange Opens',
  //   descrUkr:
  //     'Що таке премаркет, о котрій він починається, навіщо його дивляться, як він формує геп на відкритті і чим премаркет відрізняється від постмаркету та основної сесії.',
  //   descrEn:
  //     'What the pre-market is, when it starts, why people watch it, how it forms the gap at the open, and how the pre-market differs from the post-market and the regular session.',
  //   descrRus:
  //     'Что такое премаркет, во сколько он начинается, зачем его смотрят, как он формирует гэп на открытии и чем премаркет отличается от постмаркета и основной сессии.',
  //   realTitleRus: 'Что такое премаркет: торги до открытия биржи | Arapov.trade',
  //   realTitleUkr: 'Що таке премаркет: торги до відкриття біржі | Arapov.trade',
  //   realTitleEn: 'What Is the Pre-Market: Trading Before the Exchange Opens | Arapov.trade',
  //   groupsRus: ['Трейдинг для начинающих'],
  //   groupsUkr: ['Трейдинг для початківців'],
  //   groupsEng: ['Trading for Beginners'],
  //   id: 565,
  // },
  // {
  //   titleUkr: 'Преміум і дискаунт, equilibrium і OTE: що це в Smart Money',
  //   linkUkr: 'premium-discount-ote',
  //   imgUkr: '/assets/img/content/premium-discount-ote.jpeg',
  //   titleRus: 'Премиум и дискаунт, equilibrium и OTE: что это в Smart Money',
  //   titleEn: 'Premium and discount, equilibrium and OTE in Smart Money',
  //   descrUkr:
  //     'Що таке преміум і дискаунт, де проходить equilibrium і зона OTE, і чому смарт-мані купують у дискаунті, а продають у преміумі.',
  //   descrEn:
  //     'What premium and discount are, where equilibrium and the OTE zone sit, and why smart money buys in discount and sells in premium.',
  //   descrRus:
  //     'Что такое премиум и дискаунт, где проходит equilibrium и зона OTE, и почему смарт-мани покупают в дискаунте, а продают в премиуме.',
  //   realTitleRus: 'Премиум и дискаунт, equilibrium и OTE: что это в Smart Money | Arapov.trade',
  //   realTitleUkr: 'Преміум і дискаунт, equilibrium і OTE: що це в Smart Money | Arapov.trade',
  //   realTitleEn: 'Premium and discount, equilibrium and OTE in Smart Money | Arapov.trade',
  //   groupsRus: ['Концепция Смарт Мани'],
  //   groupsUkr: ['Концепція Смарт Мані'],
  //   groupsEng: ['Smart Money Concept'],
  //   id: 566,
  // },
  // {
  //   titleUkr: 'Що таке геп на біржі простими словами і види гепів',
  //   linkUkr: 'price-gap',
  //   imgUkr: '/assets/img/content/price-gap.jpeg',
  //   titleRus: 'Что такое гэп на бирже простыми словами и виды гэпов',
  //   titleEn: 'What Is a Gap on the Exchange in Simple Terms and Types of Gaps',
  //   descrUkr:
  //     'Що таке геп на графіку, чому він утворюється, які бувають види гепів і що означає закриття гепа, а також чи завжди геп закривається.',
  //   descrEn:
  //     'What a gap on the chart is, why it forms, what types of gaps exist, what closing a gap means, and whether a gap always closes.',
  //   descrRus:
  //     'Что такое гэп на графике, почему он образуется, какие бывают виды гэпов и что значит закрытие гэпа, а также всегда ли гэп закрывается.',
  //   realTitleRus: 'Что такое гэп на бирже простыми словами и виды гэпов | Arapov.trade',
  //   realTitleUkr: 'Що таке геп на біржі простими словами і види гепів | Arapov.trade',
  //   realTitleEn: 'What Is a Gap on the Exchange in Simple Terms and Types of Gaps | Arapov.trade',
  //   groupsRus: ['Технический анализ'],
  //   groupsUkr: ['Технічний аналіз'],
  //   groupsEng: ['Technical Analysis'],
  //   id: 567,
  // },
  // {
  //   titleUkr: 'Профіт-фактор: що це і як його рахувати',
  //   linkUkr: 'profitfactor',
  //   imgUkr: '/assets/img/content/profitfactor.jpeg',
  //   titleRus: 'Профит-фактор: что это и как его считать',
  //   titleEn: 'Profit factor: what it is and how to calculate it',
  //   descrUkr:
  //     'Що таке профіт-фактор у трейдингу, як він рахується як відношення валового прибутку до валового збитку і чому сам по собі він може обманути.',
  //   descrEn:
  //     'What profit factor is in trading, how it is calculated as the ratio of gross profit to gross loss and why on its own it can deceive.',
  //   descrRus:
  //     'Что такое профит-фактор в трейдинге, как он считается как отношение валовой прибыли к валовому убытку и почему сам по себе он может обмануть.',
  //   realTitleRus: 'Профит-фактор: что это и как его считать | Arapov.trade',
  //   realTitleUkr: 'Профіт-фактор: що це і як його рахувати | Arapov.trade',
  //   realTitleEn: 'Profit factor: what it is and how to calculate it | Arapov.trade',
  //   groupsRus: ['Трейдинг для начинающих'],
  //   groupsUkr: ['Трейдинг для початківців'],
  //   groupsEng: ['Trading for Beginners'],
  //   id: 568,
  // },
  // {
  //   titleUkr: 'Проп-трейдинг чи свій депозит: що обрати трейдеру',
  //   linkUkr: 'prop-vs-deposit',
  //   imgUkr: '/assets/img/content/prop-vs-deposit.jpeg',
  //   titleRus: 'Проп-трейдинг или свой депозит: что выбрать трейдеру',
  //   titleEn: 'Prop Trading or Your Own Deposit: What to Choose',
  //   descrUkr:
  //     'Порівнюємо проп-рахунок і торгівлю на своєму депозиті: де менший ризик для гаманця, де жорсткіші правила й кому з новачків проп має сенс.',
  //   descrEn:
  //     'We compare a prop account with trading your own deposit: where the wallet risk is lower, where rules are harder and when prop really makes sense.',
  //   descrRus:
  //     'Сравниваем проп-счёт и торговлю на своём депозите: где меньше риск для кошелька, где жёстче правила и кому из новичков проп реально имеет смысл.',
  //   realTitleRus: 'Проп-трейдинг или свой депозит: что выбрать трейдеру | Arapov.trade',
  //   realTitleUkr: 'Проп-трейдинг чи свій депозит: що обрати трейдеру | Arapov.trade',
  //   realTitleEn: 'Prop Trading or Your Own Deposit: What to Choose | Arapov.trade',
  //   groupsRus: ['Трейдинг для начинающих'],
  //   groupsUkr: ['Трейдинг для початківців'],
  //   groupsEng: ['Trading for Beginners'],
  //   id: 569,
  // },
  // {
  //   titleUkr: 'Як пройти челендж проп-фірми: правила і стратегія',
  //   linkUkr: 'propchallenge',
  //   imgUkr: '/assets/img/content/propchallenge.jpeg',
  //   titleRus: 'Как пройти челлендж проп-фирмы: правила и стратегия',
  //   titleEn: 'How to Pass a Prop Firm Challenge: Rules and Strategy',
  //   descrUkr:
  //     'Етапи челенджу проп-фірми, ліміти просадки й денних втрат і спокійна стратегія проходження без гонки за швидким прибутком.',
  //   descrEn:
  //     'The stages of a prop firm challenge, drawdown and daily-loss limits, and a calm way to pass it without chasing fast profit.',
  //   descrRus:
  //     'Этапы челленджа проп-фирмы, лимиты просадки и дневных потерь и спокойная стратегия прохождения без гонки за быстрой прибылью.',
  //   realTitleRus: 'Как пройти челлендж проп-фирмы: правила и стратегия | Arapov.trade',
  //   realTitleUkr: 'Як пройти челендж проп-фірми: правила і стратегія | Arapov.trade',
  //   realTitleEn: 'How to Pass a Prop Firm Challenge: Rules and Strategy | Arapov.trade',
  //   groupsRus: ['Трейдинг для начинающих'],
  //   groupsUkr: ['Трейдинг для початківців'],
  //   groupsEng: ['Trading for Beginners'],
  //   id: 570,
  // },
  // {
  //   titleUkr: 'Проп-трейдинг: що це і як пройти челендж проп-фірми',
  //   linkUkr: 'proptrading',
  //   imgUkr: '/assets/img/content/proptrading.jpeg',
  //   titleRus: 'Проп-трейдинг: что это и как пройти челлендж проп-фирмы',
  //   titleEn: 'Prop Trading: What It Is and How to Pass a Prop Firm Challenge',
  //   descrUkr:
  //     'Що таке проп-трейдинг, як влаштований челендж проп-фірми та її правила, скільки реально лишає собі трейдер і які тут підводні камені.',
  //   descrEn:
  //     'What prop trading is, how a prop firm challenge and its rules work, how much a trader really keeps and what the hidden catches are.',
  //   descrRus:
  //     'Что такое проп-трейдинг, как устроен челлендж проп-фирмы и её правила, сколько реально оставляет себе трейдер и какие тут подводные камни.',
  //   realTitleRus: 'Проп-трейдинг: что это и как пройти челлендж проп-фирмы | Arapov.trade',
  //   realTitleUkr: 'Проп-трейдинг: що це і як пройти челендж проп-фірми | Arapov.trade',
  //   realTitleEn: 'Prop Trading: What It Is and How to Pass a Prop Firm Challenge | Arapov.trade',
  //   groupsRus: ['Трейдинг для начинающих'],
  //   groupsUkr: ['Трейдинг для початківців'],
  //   groupsEng: ['Trading for Beginners'],
  //   id: 571,
  // },
  // {
  //   titleUkr: 'Графіки Renko і нестандартні типи графіків: що це і навіщо',
  //   linkUkr: 'renko-charts',
  //   imgUkr: '/assets/img/content/renko-charts.jpeg',
  //   titleRus: 'Графики Renko и нестандартные типы графиков: что это и зачем',
  //   titleEn: 'Renko charts and non-standard chart types: what they are and why',
  //   descrUkr:
  //     'Що таке графіки Renko, чим цегляні та інші нестандартні графіки відрізняються від свічок і чому вони прибирають час та обсяг з екрана.',
  //   descrEn:
  //     'What Renko charts are, how brick and other non-standard charts differ from candles and why they remove time and volume from the screen.',
  //   descrRus:
  //     'Что такое графики Renko, чем кирпичные и другие нестандартные графики отличаются от свечей и почему они убирают время и объём с экрана.',
  //   realTitleRus: 'Графики Renko и нестандартные типы графиков: что это и зачем | Arapov.trade',
  //   realTitleUkr: 'Графіки Renko і нестандартні типи графіків: що це і навіщо | Arapov.trade',
  //   realTitleEn: 'Renko charts and non-standard chart types: what they are and why | Arapov.trade',
  //   groupsRus: ['Технический анализ'],
  //   groupsUkr: ['Технічний аналіз'],
  //   groupsEng: ['Technical Analysis'],
  //   id: 572,
  // },
  // {
  //   titleUkr: 'Ризик розорення (Risk of Ruin): що це і як його знизити',
  //   linkUkr: 'riskofruin',
  //   imgUkr: '/assets/img/content/riskofruin.jpeg',
  //   titleRus: 'Риск разорения (Risk of Ruin): что это и как его снизить',
  //   titleEn: 'Risk of ruin: what it is and how to reduce it',
  //   descrUkr:
  //     'Що таке ризик розорення в трейдингу, як він залежить від розміру ризику на угоду, вінрейту і серії збитків і чому він зростає швидше, ніж здається.',
  //   descrEn:
  //     'What risk of ruin is in trading, how it depends on the risk per trade, win rate and a string of losses and why it grows faster than it seems.',
  //   descrRus:
  //     'Что такое риск разорения в трейдинге, как он зависит от размера риска на сделку, винрейта и серии убытков и почему он растёт быстрее, чем кажется.',
  //   realTitleRus: 'Риск разорения (Risk of Ruin): что это и как его снизить | Arapov.trade',
  //   realTitleUkr: 'Ризик розорення (Risk of Ruin): що це і як його знизити | Arapov.trade',
  //   realTitleEn: 'Risk of ruin: what it is and how to reduce it | Arapov.trade',
  //   groupsRus: ['Трейдинг для начинающих'],
  //   groupsUkr: ['Трейдинг для початківців'],
  //   groupsEng: ['Trading for Beginners'],
  //   id: 573,
  // },
  // {
  //   titleUkr: 'RWA (токенізація активів): що це і навіщо потрібно',
  //   linkUkr: 'rwa-tokenization',
  //   imgUkr: '/assets/img/content/rwa-tokenization.jpeg',
  //   titleRus: 'RWA (токенизация активов): что это и зачем нужно',
  //   titleEn: 'RWA (Asset Tokenization): What It Is and Why It\'s Needed',
  //   descrUkr:
  //     'Що таке токенізація реальних активів (RWA), як нерухомість чи облігації потрапляють у блокчейн і які тут можливості й підводні камені.',
  //   descrEn:
  //     'What real-world asset tokenization (RWA) is, how real estate or bonds get onto a blockchain and what opportunities and pitfalls are here.',
  //   descrRus:
  //     'Что такое токенизация реальных активов (RWA), как недвижимость или облигации попадают в блокчейн и какие тут возможности и подводные камни.',
  //   realTitleRus: 'RWA (токенизация активов): что это и зачем нужно | Arapov.trade',
  //   realTitleUkr: 'RWA (токенізація активів): що це і навіщо потрібно | Arapov.trade',
  //   realTitleEn: 'RWA (Asset Tokenization): What It Is and Why It\'s Needed | Arapov.trade',
  //   groupsRus: ['Криптовалюта'],
  //   groupsUkr: ['Криптовалюта'],
  //   groupsEng: ['Cryptocurrency'],
  //   id: 574,
  // },
  // {
  //   titleUkr: 'Що таке шорт-сквіз простими словами на прикладі',
  //   linkUkr: 'short-squeeze',
  //   imgUkr: '/assets/img/content/short-squeeze.jpeg',
  //   titleRus: 'Что такое шорт-сквиз простыми словами на примере',
  //   titleEn: 'What Is a Short Squeeze in Simple Terms with an Example',
  //   descrUkr:
  //     'Що таке шорт-сквіз, як і чому він відбувається, приклад із GameStop і як розпізнати ризик шорт-сквізу за коротким інтересом і тонким обсягом паперів в обігу.',
  //   descrEn:
  //     'What a short squeeze is, how and why it happens, the GameStop example, and how to spot the risk of a short squeeze by short interest and a thin float.',
  //   descrRus:
  //     'Что такое шорт-сквиз, как и почему он происходит, пример с GameStop и как распознать риск шорт-сквиза по короткому интересу и тонкому объёму бумаг в обращении.',
  //   realTitleRus: 'Что такое шорт-сквиз простыми словами на примере | Arapov.trade',
  //   realTitleUkr: 'Що таке шорт-сквіз простими словами на прикладі | Arapov.trade',
  //   realTitleEn: 'What Is a Short Squeeze in Simple Terms with an Example | Arapov.trade',
  //   groupsRus: ['Трейдинг для начинающих'],
  //   groupsUkr: ['Трейдинг для початківців'],
  //   groupsEng: ['Trading for Beginners'],
  //   id: 575,
  // },
  // {
  //   titleUkr: 'Прослизання в трейдингу: що це і як зменшити',
  //   linkUkr: 'slippage',
  //   imgUkr: '/assets/img/content/slippage.jpeg',
  //   titleRus: 'Проскальзывание в трейдинге: что это и как уменьшить',
  //   titleEn: 'Slippage in Trading: What It Is and How to Reduce It',
  //   descrUkr:
  //     'Чому угода виконується не за тією ціною, що ви бачили, коли прослизання особливо велике і як зменшити його вплив на результат торгівлі.',
  //   descrEn:
  //     'Why a trade fills at a different price than you saw, when slippage is especially large and how to reduce its effect on your trading result.',
  //   descrRus:
  //     'Почему сделка исполняется не по той цене, что вы видели, когда проскальзывание особенно велико и как уменьшить его влияние на результат торговли.',
  //   realTitleRus: 'Проскальзывание в трейдинге: что это и как уменьшить | Arapov.trade',
  //   realTitleUkr: 'Прослизання в трейдингу: що це і як зменшити | Arapov.trade',
  //   realTitleEn: 'Slippage in Trading: What It Is and How to Reduce It | Arapov.trade',
  //   groupsRus: ['Трейдинг для начинающих'],
  //   groupsUkr: ['Трейдинг для початківців'],
  //   groupsEng: ['Trading for Beginners'],
  //   id: 576,
  // },
  // {
  //   titleUkr: 'Смартконтракт: що це і як працює простими словами',
  //   linkUkr: 'smart-contract',
  //   imgUkr: '/assets/img/content/smart-contract.jpeg',
  //   titleRus: 'Смарт-контракт: что это и как работает простыми словами',
  //   titleEn: 'Smart Contract: What It Is and How It Works, Simply',
  //   descrUkr:
  //     'Що таке смартконтракт, як він сам виконує умови угоди за принципом «якщо — то» на блокчейні і де в ньому головний ризик — помилки в коді.',
  //   descrEn:
  //     'What a smart contract is, how it self-executes a deal by an if-then rule on a blockchain and where its main risk lies: errors in the code.',
  //   descrRus:
  //     'Что такое смарт-контракт, как он сам исполняет условия сделки по принципу «если — то» на блокчейне и где в нём главный риск — ошибки в коде.',
  //   realTitleRus: 'Смарт-контракт: что это и как работает простыми словами | Arapov.trade',
  //   realTitleUkr: 'Смартконтракт: що це і як працює простими словами | Arapov.trade',
  //   realTitleEn: 'Smart Contract: What It Is and How It Works, Simply | Arapov.trade',
  //   groupsRus: ['Криптовалюта'],
  //   groupsUkr: ['Криптовалюта'],
  //   groupsEng: ['Cryptocurrency'],
  //   id: 577,
  // },
  // {
  //   titleUkr: 'Спот і ф\'ючерси: у чому різниця і що обрати новачку',
  //   linkUkr: 'spotvsfutures',
  //   imgUkr: '/assets/img/content/spotvsfutures.jpeg',
  //   titleRus: 'Спот и фьючерсы: в чём разница и что выбрать новичку',
  //   titleEn: 'Spot and Futures: The Difference and What a Beginner Picks',
  //   descrUkr:
  //     'Чим спот-торгівля відрізняється від ф\'ючерсів, до чого тут плече й строк, де ризик вищий і чому новачку розумніше починати зі споту.',
  //   descrEn:
  //     'How spot trading differs from futures, why leverage and term matter, where the risk is higher and why a beginner is wiser to start with spot.',
  //   descrRus:
  //     'Чем спот-торговля отличается от фьючерсов, при чём тут плечо и срок, где риск выше и почему новичку разумнее начинать со спота.',
  //   realTitleRus: 'Спот и фьючерсы: в чём разница и что выбрать новичку | Arapov.trade',
  //   realTitleUkr: 'Спот і ф\'ючерси: у чому різниця і що обрати новачку | Arapov.trade',
  //   realTitleEn: 'Spot and Futures: The Difference and What a Beginner Picks | Arapov.trade',
  //   groupsRus: ['Трейдинг для начинающих'],
  //   groupsUkr: ['Трейдинг для початківців'],
  //   groupsEng: ['Trading for Beginners'],
  //   id: 578,
  // },
  // {
  //   titleUkr: 'Індикатор Supertrend: що це і як його використовувати',
  //   linkUkr: 'supertrend',
  //   imgUkr: '/assets/img/content/supertrend.jpeg',
  //   titleRus: 'Индикатор Supertrend: что это и как его использовать',
  //   titleEn: 'Supertrend indicator: what it is and how to use it',
  //   descrUkr:
  //     'Що таке індикатор Supertrend, як він будується на ATR, чому дає чіткі сигнали розвороту тренду і в чому його слабкість у боковику.',
  //   descrEn:
  //     'What the Supertrend indicator is, how it is built on ATR, why it gives clear trend-reversal signals and what its weakness is in a range.',
  //   descrRus:
  //     'Что такое индикатор Supertrend, как он строится на ATR, почему даёт чёткие сигналы разворота тренда и в чём его слабость в боковике.',
  //   realTitleRus: 'Индикатор Supertrend: что это и как его использовать | Arapov.trade',
  //   realTitleUkr: 'Індикатор Supertrend: що це і як його використовувати | Arapov.trade',
  //   realTitleEn: 'Supertrend indicator: what it is and how to use it | Arapov.trade',
  //   groupsRus: ['Технический анализ'],
  //   groupsUkr: ['Технічний аналіз'],
  //   groupsEng: ['Technical Analysis'],
  //   id: 579,
  // },
  // {
  //   titleUkr: 'Своп у трейдингу: що це і як впливає на позицію',
  //   linkUkr: 'swap',
  //   imgUkr: '/assets/img/content/swap.jpeg',
  //   titleRus: 'Своп в трейдинге: что это и как влияет на позицию',
  //   titleEn: 'Swap in Trading: What It Is and How It Affects a Position',
  //   descrUkr:
  //     'Що таке своп — плата за перенесення позиції через ніч, коли він списується чи нараховується і чому важливий при утриманні угоди довше за день.',
  //   descrEn:
  //     'What a swap is (the fee for carrying a position overnight), when it is charged or credited and why it matters when holding a trade over a day.',
  //   descrRus:
  //     'Что такое своп — плата за перенос позиции через ночь, когда он списывается или начисляется и почему важен при удержании сделки дольше дня.',
  //   realTitleRus: 'Своп в трейдинге: что это и как влияет на позицию | Arapov.trade',
  //   realTitleUkr: 'Своп у трейдингу: що це і як впливає на позицію | Arapov.trade',
  //   realTitleEn: 'Swap in Trading: What It Is and How It Affects a Position | Arapov.trade',
  //   groupsRus: ['Трейдинг для начинающих'],
  //   groupsUkr: ['Трейдинг для початківців'],
  //   groupsEng: ['Trading for Beginners'],
  //   id: 580,
  // },
  // {
  //   titleUkr: 'Свінг-трейдинг: що це і кому підходить',
  //   linkUkr: 'swing-trading',
  //   imgUkr: '/assets/img/content/swing-trading.jpeg',
  //   titleRus: 'Свинг-трейдинг: что это и кому подходит',
  //   titleEn: 'Swing Trading: What It Is and Who It Suits',
  //   descrUkr:
  //     'Що таке свінг-трейдинг, на якому горизонті тримають угоду й чим він зручний тим, у кого немає часу на постійний моніторинг. Темп між інтрадеєм і позицією.',
  //   descrEn:
  //     'What swing trading is, on what horizon a trade is held and why it suits those with no time for constant monitoring, between intraday and position.',
  //   descrRus:
  //     'Что такое свинг-трейдинг, на каком горизонте держат сделку и чем он удобен тем, у кого нет времени на постоянный мониторинг. Темп между интрадеем и позицией.',
  //   realTitleRus: 'Свинг-трейдинг: что это и кому подходит | Arapov.trade',
  //   realTitleUkr: 'Свінг-трейдинг: що це і кому підходить | Arapov.trade',
  //   realTitleEn: 'Swing Trading: What It Is and Who It Suits | Arapov.trade',
  //   groupsRus: ['Трейдинг для начинающих'],
  //   groupsUkr: ['Трейдинг для початківців'],
  //   groupsEng: ['Trading for Beginners'],
  //   id: 581,
  // },
  // {
  //   titleUkr: 'Тейк-профіт: що це і як фіксувати прибуток',
  //   linkUkr: 'takeprofit',
  //   imgUkr: '/assets/img/content/takeprofit.jpeg',
  //   titleRus: 'Тейк-профит: что это и как фиксировать прибыль',
  //   titleEn: 'Take Profit: What It Is and How to Lock In Profit',
  //   descrUkr:
  //     'Що таке тейк-профіт, як ставити ціль за угодою заздалегідь і чому фіксація прибутку за планом важливіша за спроби спіймати самий верх. Жадібність проти системи.',
  //   descrEn:
  //     'What take profit is, how to set a trade target in advance and why locking profit by plan beats trying to catch the very top. Greed versus system.',
  //   descrRus:
  //     'Что такое тейк-профит, как ставить цель по сделке заранее и почему фиксация прибыли по плану важнее попыток поймать самый верх. Жадность против системы.',
  //   realTitleRus: 'Тейк-профит: что это и как фиксировать прибыль | Arapov.trade',
  //   realTitleUkr: 'Тейк-профіт: що це і як фіксувати прибуток | Arapov.trade',
  //   realTitleEn: 'Take Profit: What It Is and How to Lock In Profit | Arapov.trade',
  //   groupsRus: ['Трейдинг для начинающих'],
  //   groupsUkr: ['Трейдинг для початківців'],
  //   groupsEng: ['Trading for Beginners'],
  //   id: 582,
  // },
  // {
  //   titleUkr: 'Тейпридинг (читання стрічки): як читати потік ордерів',
  //   linkUkr: 'tape-reading',
  //   imgUkr: '/assets/img/content/tape-reading.jpeg',
  //   titleRus: 'Тейпридинг (чтение ленты): как читать поток ордеров',
  //   titleEn: 'Tape Reading: How to Read the Order Flow',
  //   descrUkr:
  //     'Що таке стрічка Time and Sales, як за потоком угод побачити великого гравця й прихованого продавця і чому новачку простіше читати ту саму логіку за обсягом.',
  //   descrEn:
  //     'What the Time and Sales tape is, how to spot a large player and a hidden seller in the trade flow and why a beginner reads the same logic via volume.',
  //   descrRus:
  //     'Что такое лента Time and Sales, как по потоку сделок увидеть крупного игрока и скрытого продавца и почему новичку проще читать ту же логику по объёму.',
  //   realTitleRus: 'Тейпридинг (чтение ленты): как читать поток ордеров | Arapov.trade',
  //   realTitleUkr: 'Тейпридинг (читання стрічки): як читати потік ордерів | Arapov.trade',
  //   realTitleEn: 'Tape Reading: How to Read the Order Flow | Arapov.trade',
  //   groupsRus: ['Объемный анализ рынка'],
  //   groupsUkr: ['Об`ємний аналіз ринку'],
  //   groupsEng: ['Market Volume Analysis'],
  //   id: 583,
  // },
  // {
  //   titleUkr: 'Тиковий обсяг проти реального: чому біржовий обсяг чесніший',
  //   linkUkr: 'tick-vs-real-volume',
  //   imgUkr: '/assets/img/content/tick-vs-real-volume.jpeg',
  //   titleRus: 'Тиковый объём против реального: почему биржевой объём честнее',
  //   titleEn: 'Tick volume vs real volume: why exchange volume is honest',
  //   descrUkr:
  //     'Чим тиковий обсяг відрізняється від реального біржового, чому тиковий спотворює картину і де взяти чесний обсяг: біржові ф\'ючерси CME.',
  //   descrEn:
  //     'How tick volume differs from real exchange volume, why tick volume distorts the picture and where to get honest volume: CME exchange futures.',
  //   descrRus:
  //     'Чем тиковый объём отличается от реального биржевого, почему тиковый искажает картину и где взять честный объём: биржевые фьючерсы CME.',
  //   realTitleRus: 'Тиковый объём против реального: почему биржевой объём честнее | Arapov.trade',
  //   realTitleUkr: 'Тиковий обсяг проти реального: чому біржовий обсяг чесніший | Arapov.trade',
  //   realTitleEn: 'Tick volume vs real volume: why exchange volume is honest | Arapov.trade',
  //   groupsRus: ['Объемный анализ рынка'],
  //   groupsUkr: ['Об`ємний аналіз ринку'],
  //   groupsEng: ['Market Volume Analysis'],
  //   id: 584,
  // },
  // {
  //   titleUkr: 'Токеноміка: що це і як оцінити криптопроєкт',
  //   linkUkr: 'tokenomics',
  //   imgUkr: '/assets/img/content/tokenomics.jpeg',
  //   titleRus: 'Токеномика: что это и как оценить криптопроект',
  //   titleEn: 'Tokenomics: What It Is and How to Assess a Crypto Project',
  //   descrUkr:
  //     'Що таке токеноміка, як розподіл монет, емісія й розблокування впливають на ціну і чому за нею видно ризик обвалу ще до купівлі токена.',
  //   descrEn:
  //     'What tokenomics is, how coin distribution, issuance and unlocks affect price and why it reveals crash risk before you even buy a token.',
  //   descrRus:
  //     'Что такое токеномика, как распределение монет, эмиссия и разблокировки влияют на цену и почему по ней виден риск обвала ещё до покупки токена.',
  //   realTitleRus: 'Токеномика: что это и как оценить криптопроект | Arapov.trade',
  //   realTitleUkr: 'Токеноміка: що це і як оцінити криптопроєкт | Arapov.trade',
  //   realTitleEn: 'Tokenomics: What It Is and How to Assess a Crypto Project | Arapov.trade',
  //   groupsRus: ['Криптовалюта'],
  //   groupsUkr: ['Криптовалюта'],
  //   groupsEng: ['Cryptocurrency'],
  //   id: 585,
  // },
  // {
  //   titleUkr: 'TON (Toncoin): що це за криптовалюта і які ризики',
  //   linkUkr: 'toncoin',
  //   imgUkr: '/assets/img/content/toncoin.jpeg',
  //   titleRus: 'TON (Toncoin): что это за криптовалюта и какие риски',
  //   titleEn: 'TON (Toncoin): What This Cryptocurrency Is and Its Risks',
  //   descrUkr:
  //     'Що таке блокчейн TON і монета Toncoin, чим він пов\'язаний із Telegram, як влаштований і на які ризики дивитися трейдеру, перш ніж заходити.',
  //   descrEn:
  //     'What the TON blockchain and the Toncoin coin are, how it ties to Telegram, how it is built and what risks a trader should watch before entering.',
  //   descrRus:
  //     'Что такое блокчейн TON и монета Toncoin, чем он связан с Telegram, как устроен и на какие риски смотреть трейдеру, прежде чем заходить.',
  //   realTitleRus: 'TON (Toncoin): что это за криптовалюта и какие риски | Arapov.trade',
  //   realTitleUkr: 'TON (Toncoin): що це за криптовалюта і які ризики | Arapov.trade',
  //   realTitleEn: 'TON (Toncoin): What This Cryptocurrency Is and Its Risks | Arapov.trade',
  //   groupsRus: ['Криптовалюта'],
  //   groupsUkr: ['Криптовалюта'],
  //   groupsEng: ['Cryptocurrency'],
  //   id: 586,
  // },
  // {
  //   titleUkr: 'Торгові боти й алготрейдинг: чи довіряти їм гроші',
  //   linkUkr: 'trading-bots',
  //   imgUkr: '/assets/img/content/trading-bots.jpeg',
  //   titleRus: 'Торговые боты и алготрейдинг: доверять ли им деньги',
  //   titleEn: 'Trading Bots and Algo Trading: Should You Trust Them?',
  //   descrUkr:
  //     'Як працюють торгові боти й алгоритми, у чому їхні сильні сторони й реальні ризики та чому «бот, що сам заробляє» найчастіше обман.',
  //   descrEn:
  //     'How trading bots and algorithms work, their real strengths and risks, and why a bot that earns on its own is most often a scam.',
  //   descrRus:
  //     'Как работают торговые боты и алгоритмы, в чём их сильные стороны и реальные риски и почему «бот, который сам зарабатывает» чаще всего обман.',
  //   realTitleRus: 'Торговые боты и алготрейдинг: доверять ли им деньги | Arapov.trade',
  //   realTitleUkr: 'Торгові боти й алготрейдинг: чи довіряти їм гроші | Arapov.trade',
  //   realTitleEn: 'Trading Bots and Algo Trading: Should You Trust Them? | Arapov.trade',
  //   groupsRus: ['Трейдинг для начинающих'],
  //   groupsUkr: ['Трейдинг для початківців'],
  //   groupsEng: ['Trading for Beginners'],
  //   id: 587,
  // },
  // {
  //   titleUkr: 'Щоденник трейдера: навіщо він потрібен і як його вести',
  //   linkUkr: 'tradingjournal',
  //   imgUkr: '/assets/img/content/tradingjournal.jpeg',
  //   titleRus: 'Дневник трейдера: зачем он нужен и как его вести',
  //   titleEn: 'Trading Journal: Why You Need One and How to Keep It',
  //   descrUkr:
  //     'Навіщо вести торговий щоденник, що в нього записувати і як він показує реальний вінрейт, помилки та емоції, яких у пам\'яті не видно.',
  //   descrEn:
  //     'Why keep a trading journal, what to record in it and how it shows the real win rate, mistakes and emotions that memory hides from you.',
  //   descrRus:
  //     'Зачем вести торговый дневник, что в него записывать и как он показывает реальные винрейт, ошибки и эмоции, которых в памяти не видно.',
  //   realTitleRus: 'Дневник трейдера: зачем он нужен и как его вести | Arapov.trade',
  //   realTitleUkr: 'Щоденник трейдера: навіщо він потрібен і як його вести | Arapov.trade',
  //   realTitleEn: 'Trading Journal: Why You Need One and How to Keep It | Arapov.trade',
  //   groupsRus: ['Психология трейдинга'],
  //   groupsUkr: ['Психологія трейдингу'],
  //   groupsEng: ['Trading Psychology'],
  //   id: 588,
  // },
  // {
  //   titleUkr: 'Торгові сесії форекс: час роботи й коли торгувати',
  //   linkUkr: 'tradingsessions',
  //   imgUkr: '/assets/img/content/tradingsessions.jpeg',
  //   titleRus: 'Торговые сессии форекс: время работы и когда торговать',
  //   titleEn: 'Forex Trading Sessions: Hours and When to Trade',
  //   descrUkr:
  //     'Час азійської, лондонської та нью-йоркської сесій, чому на їх перетині рухи сильніші і в які години новачку торгувати спокійніше.',
  //   descrEn:
  //     'The Asian, London and New York session hours, why moves are stronger at their overlap and which hours are calmer for a beginner to trade.',
  //   descrRus:
  //     'Время азиатской, лондонской и нью-йоркской сессий, почему на их пересечении движения сильнее и в какие часы новичку торговать спокойнее.',
  //   realTitleRus: 'Торговые сессии форекс: время работы и когда торговать | Arapov.trade',
  //   realTitleUkr: 'Торгові сесії форекс: час роботи й коли торгувати | Arapov.trade',
  //   realTitleEn: 'Forex Trading Sessions: Hours and When to Trade | Arapov.trade',
  //   groupsRus: ['Трейдинг для начинающих'],
  //   groupsUkr: ['Трейдинг для початківців'],
  //   groupsEng: ['Trading for Beginners'],
  //   id: 589,
  // },
  // {
  //   titleUkr: 'Трейлінг-стоп: що це і як правильно налаштувати',
  //   linkUkr: 'trailingstop',
  //   imgUkr: '/assets/img/content/trailingstop.jpeg',
  //   titleRus: 'Трейлинг-стоп: что это и как правильно настроить',
  //   titleEn: 'Trailing Stop: What It Is and How to Set It Right',
  //   descrUkr:
  //     'Що таке ковзний стоп, як він підтягується за ціною й захищає прибуток у тренді й чому занадто тісний трейлінг вибиває з угоди зарано.',
  //   descrEn:
  //     'What a trailing stop is, how it follows price and protects profit in a trend and why too tight a trailing knocks you out of a trade early.',
  //   descrRus:
  //     'Что такое скользящий стоп, как он подтягивается за ценой и защищает прибыль в тренде и почему слишком тесный трейлинг выбивает из сделки раньше времени.',
  //   realTitleRus: 'Трейлинг-стоп: что это и как правильно настроить | Arapov.trade',
  //   realTitleUkr: 'Трейлінг-стоп: що це і як правильно налаштувати | Arapov.trade',
  //   realTitleEn: 'Trailing Stop: What It Is and How to Set It Right | Arapov.trade',
  //   groupsRus: ['Трейдинг для начинающих'],
  //   groupsUkr: ['Трейдинг для початківців'],
  //   groupsEng: ['Trading for Beginners'],
  //   id: 590,
  // },
  // {
  //   titleUkr: 'Дельта обсягу і CVD: що це і як читати кумулятивну дельту',
  //   linkUkr: 'volume-delta-cvd',
  //   imgUkr: '/assets/img/content/volume-delta-cvd.jpeg',
  //   titleRus: 'Дельта объёма и CVD: что это и как читать кумулятивную дельту',
  //   titleEn: 'Volume delta and CVD: what they are and how to read cumulative delta',
  //   descrUkr:
  //     'Що таке дельта обсягу і кумулятивна дельта CVD, як вони показують перевагу покупців або продавців і чому чесна дельта є лише на біржі.',
  //   descrEn:
  //     'What volume delta and cumulative delta CVD are, how they show the edge of buyers or sellers and why honest delta exists only on the exchange.',
  //   descrRus:
  //     'Что такое дельта объёма и кумулятивная дельта CVD, как они показывают перевес покупателей или продавцов и почему честная дельта есть только на бирже.',
  //   realTitleRus: 'Дельта объёма и CVD: что это и как читать кумулятивную дельту | Arapov.trade',
  //   realTitleUkr: 'Дельта обсягу і CVD: що це і як читати кумулятивну дельту | Arapov.trade',
  //   realTitleEn: 'Volume delta and CVD: what they are and how to read cumulative delta | Arapov.trade',
  //   groupsRus: ['Объемный анализ рынка'],
  //   groupsUkr: ['Об`ємний аналіз ринку'],
  //   groupsEng: ['Market Volume Analysis'],
  //   id: 591,
  // },
  // {
  //   titleUkr: 'Профіль обсягу в трейдингу: POC, Value Area, VAH і VAL',
  //   linkUkr: 'volume-profile',
  //   imgUkr: '/assets/img/content/volume-profile.jpeg',
  //   titleRus: 'Профиль объёма в трейдинге: POC, Value Area, VAH и VAL',
  //   titleEn: 'Volume Profile in Trading: POC, Value Area, VAH and VAL',
  //   descrUkr:
  //     'Що таке профіль обсягу, що показують POC, Value Area, VAH і VAL, чим профіль обсягу відрізняється від звичайного обсягу і як трейдер використовує його рівні.',
  //   descrEn:
  //     'What volume profile is, what POC, Value Area, VAH and VAL show, how volume profile differs from ordinary volume, and how a trader uses its levels.',
  //   descrRus:
  //     'Что такое профиль объёма, что показывают POC, Value Area, VAH и VAL, чем профиль объёма отличается от обычного объёма и как трейдер использует его уровни.',
  //   realTitleRus: 'Профиль объёма в трейдинге: POC, Value Area, VAH и VAL | Arapov.trade',
  //   realTitleUkr: 'Профіль обсягу в трейдингу: POC, Value Area, VAH і VAL | Arapov.trade',
  //   realTitleEn: 'Volume Profile in Trading: POC, Value Area, VAH and VAL | Arapov.trade',
  //   groupsRus: ['Объемный анализ рынка'],
  //   groupsUkr: ['Об`ємний аналіз ринку'],
  //   groupsEng: ['Market Volume Analysis'],
  //   id: 592,
  // },
  // {
  //   titleUkr: 'Що таке дивіденди простими словами: як і коли їх платять',
  //   linkUkr: 'what-are-dividends',
  //   imgUkr: '/assets/img/content/what-are-dividends.jpeg',
  //   titleRus: 'Что такое дивиденды простыми словами: как и когда их платят',
  //   titleEn: 'What Are Dividends in Simple Terms: How and When They Are Paid',
  //   descrUkr:
  //     'Що таке дивіденди, як і коли компанії їх виплачують, що таке дата відсічки й дивідендний геп і чому висока дохідність не завжди привід купувати акцію.',
  //   descrEn:
  //     'What dividends are, how and when companies pay them, what the record date and the dividend gap are, and why a high yield is not always a reason to buy a stock.',
  //   descrRus:
  //     'Что такое дивиденды, как и когда компании их выплачивают, что такое дата отсечки и дивидендный гэп и почему высокая доходность не всегда повод покупать акцию.',
  //   realTitleRus: 'Что такое дивиденды простыми словами: как и когда их платят | Arapov.trade',
  //   realTitleUkr: 'Що таке дивіденди простими словами: як і коли їх платять | Arapov.trade',
  //   realTitleEn: 'What Are Dividends in Simple Terms: How and When They Are Paid | Arapov.trade',
  //   groupsRus: ['Фундаментальный анализ'],
  //   groupsUkr: ['Фундаментальний аналіз'],
  //   groupsEng: ['Fundamental Analysis'],
  //   id: 593,
  // },
  // {
  //   titleUkr: 'Що таке CFD простими словами: контракт на різницю цін',
  //   linkUkr: 'what-is-cfd',
  //   imgUkr: '/assets/img/content/what-is-cfd.jpeg',
  //   titleRus: 'Что такое CFD простыми словами: контракт на разницу цен',
  //   titleEn: 'What Is a CFD in Simple Terms: A Contract for Difference',
  //   descrUkr:
  //     'Що таке CFD, як працює торгівля контрактом на різницю, хто виступає контрагентом, які в CFD ризики і чим він відрізняється від володіння активом.',
  //   descrEn:
  //     'What a CFD is, how trading a contract for difference works, who the counterparty is, what the risks of a CFD are and how it differs from owning the asset.',
  //   descrRus:
  //     'Что такое CFD, как работает торговля контрактом на разницу, кто выступает контрагентом, какие у CFD риски и чем он отличается от владения активом.',
  //   realTitleRus: 'Что такое CFD простыми словами: контракт на разницу цен | Arapov.trade',
  //   realTitleUkr: 'Що таке CFD простими словами: контракт на різницю цін | Arapov.trade',
  //   realTitleEn: 'What Is a CFD in Simple Terms: A Contract for Difference | Arapov.trade',
  //   groupsRus: ['Трейдинг для начинающих'],
  //   groupsUkr: ['Трейдинг для початківців'],
  //   groupsEng: ['Trading for Beginners'],
  //   id: 594,
  // },
  // {
  //   titleUkr: 'Що таке ETF простими словами і чим він відрізняється від акції',
  //   linkUkr: 'what-is-etf',
  //   imgUkr: '/assets/img/content/what-is-etf.jpeg',
  //   titleRus: 'Что такое ETF простыми словами и чем он отличается от акции',
  //   titleEn: 'What Is an ETF in Simple Terms and How It Differs from a Stock',
  //   descrUkr:
  //     'Що таке ETF, як влаштований біржовий фонд, чим він відрізняється від акції та ПІФа і які в ETF плюси та ризики для інвестора простими словами.',
  //   descrEn:
  //     'What an ETF is, how an exchange-traded fund works, how it differs from a stock and a mutual fund, and what the pros and risks of an ETF are for an investor.',
  //   descrRus:
  //     'Что такое ETF, как устроен биржевой фонд, чем он отличается от акции и ПИФа и какие у ETF плюсы и риски для инвестора простыми словами.',
  //   realTitleRus: 'Что такое ETF простыми словами и чем он отличается от акции | Arapov.trade',
  //   realTitleUkr: 'Що таке ETF простими словами і чим він відрізняється від акції | Arapov.trade',
  //   realTitleEn: 'What Is an ETF in Simple Terms and How It Differs from a Stock | Arapov.trade',
  //   groupsRus: ['Трейдинг для начинающих'],
  //   groupsUkr: ['Трейдинг для початківців'],
  //   groupsEng: ['Trading for Beginners'],
  //   id: 595,
  // },
  // {
  //   titleUkr: 'Що таке IPO простими словами і чи варто брати участь',
  //   linkUkr: 'what-is-ipo',
  //   imgUkr: '/assets/img/content/what-is-ipo.jpeg',
  //   titleRus: 'Что такое IPO простыми словами и стоит ли участвовать',
  //   titleEn: 'What Is an IPO in Simple Terms and Is It Worth Taking Part',
  //   descrUkr:
  //     'Що таке IPO, як проходить первинне розміщення акцій, що таке андеррайтер, алокація та lock-up і чому акції часто падають після виходу на біржу.',
  //   descrEn:
  //     'What an IPO is, how an initial public offering works, what an underwriter, allocation and lock-up are, and why shares often fall after going public.',
  //   descrRus:
  //     'Что такое IPO, как проходит первичное размещение акций, что такое андеррайтер, аллокация и lock-up и почему акции часто падают после выхода на биржу.',
  //   realTitleRus: 'Что такое IPO простыми словами и стоит ли участвовать | Arapov.trade',
  //   realTitleUkr: 'Що таке IPO простими словами і чи варто брати участь | Arapov.trade',
  //   realTitleEn: 'What Is an IPO in Simple Terms and Is It Worth Taking Part | Arapov.trade',
  //   groupsRus: ['Трейдинг для начинающих'],
  //   groupsUkr: ['Трейдинг для початківців'],
  //   groupsEng: ['Trading for Beginners'],
  //   id: 596,
  // },
  // {
  //   titleUkr: 'Що таке кредитне плече в трейдингу простими словами',
  //   linkUkr: 'what-is-leverage',
  //   imgUkr: '/assets/img/content/what-is-leverage.jpeg',
  //   titleRus: 'Что такое кредитное плечо в трейдинге простыми словами',
  //   titleEn: 'What Is Leverage in Trading in Simple Terms',
  //   descrUkr:
  //     'Що таке кредитне плече, як воно працює, що таке маржа і чим небезпечне велике плече: маржин-кол, ліквідація і чому плече посилює і прибуток, і збиток.',
  //   descrEn:
  //     'What leverage is, how it works, what margin is, and why high leverage is dangerous: margin calls, liquidation and why leverage amplifies both profit and loss.',
  //   descrRus:
  //     'Что такое кредитное плечо, как оно работает, что такое маржа и чем опасно большое плечо: маржин-колл, ликвидация и почему плечо усиливает и прибыль, и убыток.',
  //   realTitleRus: 'Что такое кредитное плечо в трейдинге простыми словами | Arapov.trade',
  //   realTitleUkr: 'Що таке кредитне плече в трейдингу простими словами | Arapov.trade',
  //   realTitleEn: 'What Is Leverage in Trading in Simple Terms | Arapov.trade',
  //   groupsRus: ['Трейдинг для начинающих'],
  //   groupsUkr: ['Трейдинг для початківців'],
  //   groupsEng: ['Trading for Beginners'],
  //   id: 597,
  // },
  // {
  //   titleUkr: 'Що таке маржин-кол простими словами і як його уникнути',
  //   linkUkr: 'what-is-margin-call',
  //   imgUkr: '/assets/img/content/what-is-margin-call.jpeg',
  //   titleRus: 'Что такое маржин-колл простыми словами и как его избежать',
  //   titleEn: 'What Is a Margin Call in Simple Terms and How to Avoid It',
  //   descrUkr:
  //     'Що таке маржин-кол, коли він настає, чим відрізняється від стоп-ауту й ліквідації і як не отримати маржин-кол при торгівлі з кредитним плечем.',
  //   descrEn:
  //     'What a margin call is, when it happens, how it differs from a stop-out and liquidation, and how to avoid a margin call when trading with leverage.',
  //   descrRus:
  //     'Что такое маржин-колл, когда он наступает, чем отличается от стоп-аута и ликвидации и как не получить маржин-колл при торговле с кредитным плечом.',
  //   realTitleRus: 'Что такое маржин-колл простыми словами и как его избежать | Arapov.trade',
  //   realTitleUkr: 'Що таке маржин-кол простими словами і як його уникнути | Arapov.trade',
  //   realTitleEn: 'What Is a Margin Call in Simple Terms and How to Avoid It | Arapov.trade',
  //   groupsRus: ['Трейдинг для начинающих'],
  //   groupsUkr: ['Трейдинг для початківців'],
  //   groupsEng: ['Trading for Beginners'],
  //   id: 598,
  // },
  // {
  //   titleUkr: 'Що таке NFT простими словами',
  //   linkUkr: 'what-is-nft',
  //   imgUkr: '/assets/img/content/what-is-nft.jpeg',
  //   titleRus: 'Что такое NFT простыми словами',
  //   titleEn: 'What an NFT Is in Simple Terms',
  //   descrUkr:
  //     'Що таке незамінний токен, що насправді купує власник NFT — запис про володіння, а не саму картинку — і чому це високий ризик.',
  //   descrEn:
  //     'What a non-fungible token is, what an NFT owner actually buys (a record of ownership, not the picture itself) and why it is high risk.',
  //   descrRus:
  //     'Что такое невзаимозаменяемый токен, что на самом деле покупает владелец NFT — запись о владении, а не саму картинку — и почему это высокий риск.',
  //   realTitleRus: 'Что такое NFT простыми словами | Arapov.trade',
  //   realTitleUkr: 'Що таке NFT простими словами | Arapov.trade',
  //   realTitleEn: 'What an NFT Is in Simple Terms | Arapov.trade',
  //   groupsRus: ['Криптовалюта'],
  //   groupsUkr: ['Криптовалюта'],
  //   groupsEng: ['Cryptocurrency'],
  //   id: 599,
  // },
  // {
  //   titleUkr: 'Переторгівля: що це і як перестати торгувати зайве',
  //   linkUkr: 'what-is-overtrading',
  //   imgUkr: '/assets/img/content/what-is-overtrading.jpeg',
  //   titleRus: 'Переторговля: что это и как перестать торговать лишнее',
  //   titleEn: 'Overtrading: What It Is and How to Stop Trading Excess',
  //   descrUkr:
  //     'Що таке переторгівля, чому зайві угоди тихо зливають депозит через комісії й дисперсію і які ліміти допомагають перестати торгувати на емоціях.',
  //   descrEn:
  //     'What overtrading is, why extra trades quietly drain a deposit through fees and variance and which limits help you stop trading on emotions.',
  //   descrRus:
  //     'Что такое переторговля, почему лишние сделки тихо сливают депозит через комиссии и дисперсию и какие лимиты помогают перестать торговать на эмоциях.',
  //   realTitleRus: 'Переторговля: что это и как перестать торговать лишнее | Arapov.trade',
  //   realTitleUkr: 'Переторгівля: що це і як перестати торгувати зайве | Arapov.trade',
  //   realTitleEn: 'Overtrading: What It Is and How to Stop Trading Excess | Arapov.trade',
  //   groupsRus: ['Психология трейдинга'],
  //   groupsUkr: ['Психологія трейдингу'],
  //   groupsEng: ['Trading Psychology'],
  //   id: 600,
  // },
  // {
  //   titleUkr: 'Що таке акція простими словами і як на ній заробляють',
  //   linkUkr: 'what-is-stock',
  //   imgUkr: '/assets/img/content/what-is-stock.jpeg',
  //   titleRus: 'Что такое акция простыми словами и как на ней зарабатывают',
  //   titleEn: 'What Is a Stock in Simple Terms and How People Earn on It',
  //   descrUkr:
  //     'Що таке акція, як на акціях заробляють на зростанні ціни та дивідендах, чим відрізняються звичайні та привілейовані акції і які в них ризики.',
  //   descrEn:
  //     'What a stock is, how people earn on stocks through price growth and dividends, how common and preferred shares differ, and what their risks are.',
  //   descrRus:
  //     'Что такое акция, как на акциях зарабатывают на росте цены и дивидендах, чем отличаются обыкновенные и привилегированные акции и какие у них риски.',
  //   realTitleRus: 'Что такое акция простыми словами и как на ней зарабатывают | Arapov.trade',
  //   realTitleUkr: 'Що таке акція простими словами і як на ній заробляють | Arapov.trade',
  //   realTitleEn: 'What Is a Stock in Simple Terms and How People Earn on It | Arapov.trade',
  //   groupsRus: ['Трейдинг для начинающих'],
  //   groupsUkr: ['Трейдинг для початківців'],
  //   groupsEng: ['Trading for Beginners'],
  //   id: 601,
  // },
  // {
  //   titleUkr: 'Whitepaper: що це і як читати вайтпейпер проєкту',
  //   linkUkr: 'what-is-whitepaper',
  //   imgUkr: '/assets/img/content/what-is-whitepaper.jpeg',
  //   titleRus: 'Whitepaper: что это и как читать вайтпейпер проекта',
  //   titleEn: 'Whitepaper: What It Is and How to Read a Project\'s Paper',
  //   descrUkr:
  //     'Що таке вайтпейпер криптопроєкту, що має бути в сильному документі і за якими червоними прапорцями відсіяти скам ще до купівлі токена.',
  //   descrEn:
  //     'What a crypto project whitepaper is, what a strong document should contain and by which red flags to filter out a scam before buying a token.',
  //   descrRus:
  //     'Что такое вайтпейпер криптопроекта, что должно быть в сильном документе и по каким красным флагам отсеять скам ещё до покупки токена.',
  //   realTitleRus: 'Whitepaper: что это и как читать вайтпейпер проекта | Arapov.trade',
  //   realTitleUkr: 'Whitepaper: що це і як читати вайтпейпер проєкту | Arapov.trade',
  //   realTitleEn: 'Whitepaper: What It Is and How to Read a Project\'s Paper | Arapov.trade',
  //   groupsRus: ['Криптовалюта'],
  //   groupsUkr: ['Криптовалюта'],
  //   groupsEng: ['Cryptocurrency'],
  //   id: 602,
  // },
  // {
  //   titleUkr: 'Індикатор Williams %R: що це і як його читати',
  //   linkUkr: 'williamsr',
  //   imgUkr: '/assets/img/content/williamsr.jpeg',
  //   titleRus: 'Индикатор Williams %R: что это и как его читать',
  //   titleEn: 'Williams %R indicator: what it is and how to read it',
  //   descrUkr:
  //     'Що таке індикатор Williams %R, як він вимірює положення закриття в діапазоні, що значать зони перекупленості і чому це не сигнал на вхід.',
  //   descrEn:
  //     'What the Williams %R indicator is, how it measures the position of the close in the range, what the overbought zones mean and why it is not an entry signal.',
  //   descrRus:
  //     'Что такое индикатор Williams %R, как он измеряет положение закрытия в диапазоне, что значат зоны перекупленности и почему это не сигнал на вход.',
  //   realTitleRus: 'Индикатор Williams %R: что это и как его читать | Arapov.trade',
  //   realTitleUkr: 'Індикатор Williams %R: що це і як його читати | Arapov.trade',
  //   realTitleEn: 'Williams %R indicator: what it is and how to read it | Arapov.trade',
  //   groupsRus: ['Технический анализ'],
  //   groupsUkr: ['Технічний аналіз'],
  //   groupsEng: ['Technical Analysis'],
  //   id: 603,
  // },
  // {
  //   titleUkr: 'Вінрейт: чому високий відсоток перемог не дорівнює прибуток',
  //   linkUkr: 'win-rate',
  //   imgUkr: '/assets/img/content/win-rate.jpeg',
  //   titleRus: 'Винрейт: почему высокий процент побед не равно прибыль',
  //   titleEn: 'Win Rate: Why a High Win Percentage Isn\'t Profit',
  //   descrUkr:
  //     'Що таке вінрейт, як його порахувати й чому високий відсоток перемог без співвідношення ризику до прибутку — прикраса збиткового рахунку. На цифрах.',
  //   descrEn:
  //     'What win rate is, how to count it and why a high win percentage without the risk-to-reward ratio is decoration on a losing account. On the numbers.',
  //   descrRus:
  //     'Что такое винрейт, как его посчитать и почему высокий процент побед без учёта соотношения риска к прибыли — украшение убыточного счёта. На цифрах.',
  //   realTitleRus: 'Винрейт: почему высокий процент побед не равно прибыль | Arapov.trade',
  //   realTitleUkr: 'Вінрейт: чому високий відсоток перемог не дорівнює прибуток | Arapov.trade',
  //   realTitleEn: 'Win Rate: Why a High Win Percentage Isn\'t Profit | Arapov.trade',
  //   groupsRus: ['Трейдинг для начинающих'],
  //   groupsUkr: ['Трейдинг для початківців'],
  //   groupsEng: ['Trading for Beginners'],
  //   id: 604,
  // },

  ];
}
