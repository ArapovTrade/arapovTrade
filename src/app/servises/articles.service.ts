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
      titleUkr: 'Самостійне навчання трейдингу',
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
      realTitleUkr: 'Самостійне навчання трейдингу | Ігор Арапов',
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
        descrUkr: 'Що таке копітрейдинг криптовалют і як заробляти, копіюючи угоди успішних трейдерів на біржі | Ігор Арапов',
        descrEn: 'What is cryptocurrency copy trading and how to earn by copying the trades of successful traders on the exchange | Igor Arapov',
      realTitleRus: 'Copy trading: что такое копитрейдинг и как работает? | Игорь Арапов',
      realTitleUkr: 'Copy trading: що таке копітрейдинг і як він працює? | Ігор Арапов',
      realTitleEn: 'Copy Trading: What is Copy-Trading and How Does It Work? | Igor Arapov',
      imgUkr: '/assets/img/content/copytrading_two.png',
      groupsRus: ['Трейдинг для начинающих'],
      groupsUkr: ['Трейдинг для початківців'],
      groupsEng: ['Trading for Beginners'],
      id: 133,
    },
   

    {
    
      titleRus: 'Что такое объем торгов на бирже? ',
      titleUkr: 'Що таке обсяг торгів на біржі?',
      titleEn: 'What is Trading Volume on the Exchange?',
       linkUkr: 'peakvolumelevels',
       descrRus:
        'Узнайте, как анализировать объем торгов в трейдинге! Советы по поиску зон интереса, уровней поддержки и сопротивления для трейдинга с Arapov.trade',
      descrUkr:
        'Дізнайтеся, як аналізувати обсяг торгів у трейдингу! Поради щодо пошуку зон інтересу, рівнів підтримки та опору для трейдингу з Arapov.trade',
      descrEn:
        'Learn how to analyze trading volume in trading! Tips for finding areas of interest, support and resistance levels for trading with Arapov.trade',
        realTitleRus:
        'Что такое объем торгов на бирже | Игорь Арапов',
      realTitleEn: 'What is Trading Volume on the Exchange | Arapov.trade',
      realTitleUkr: 'Що таке обсяг торгів на біржі | Arapov.trade',
      imgUkr: '/assets/img/content/peakvolumelevels.webp',
      groupsRus: ['Объемный анализ рынка'],
      groupsUkr: ['Об`ємний аналіз ринку'],
      groupsEng: ['Market Volume Analysis'],
      id: 111,
    },

    
      {
     
      linkUkr: 'tradingview-platform',
      titleRus: 'Платформа TradingView: что это такое, как пользоваться и зарабатывать',
      titleUkr: 'Платформа TradingView: що це таке, як користуватися та заробляти',
     titleEn: 'TradingView Platform: What It Is and How to Use It and Earn',
      descrRus:
        'TradingView: Полная инструкция, как пользоваться платформой и ЗАРАБАТЫВАТЬ. Пошаговая настройка графиков, анализ данных и эффективные стратегии для трейдеров. Узнайте секреты успешного трейдинга!',
      descrUkr:
        'TradingView: Повна інструкція, як користуватися платформою та ЗАРОБЛЯТИ. Покрокова настройка графіків, аналіз даних та ефективні стратегії для трейдерів. Дізнайтеся секрети успішного трейдингу!',
        descrEn: 'TradingView: A complete guide on how to use the platform and EARN. Step-by-step chart setup, data analysis, and effective strategies for traders. Discover the secrets of successful trading!',
      realTitleRus: 'Платформа TradingView: что это такое, как пользоваться и зарабатывать | Игорь Арапов',
      realTitleUkr: 'Платформа TradingView: що це таке, як користуватися та заробляти | Ігор Арапов',
      realTitleEn: 'TradingView Platform: What It Is and How to Use It and Earn | Igor Arapov',
      imgUkr: '/assets/img/content/tradingview_1.png',
      groupsRus: ['Трейдинг для начинающих'],
      groupsUkr: ['Трейдинг для початківців'],
      groupsEng: ['Trading for Beginners'],
      id: 135,
    },
      {
     
      linkUkr: 'bitcoin-domination',
      titleRus: 'Что такое доминация биткоина (BTC.D) и ее влияние на рынок криптовалют',
      titleUkr: 'Що таке домінація біткоїна (BTC.D) і як вона впливає на ринок криптовалют',
      titleEn: 'What is Bitcoin Dominance (BTC.D) and How It Affects the Cryptocurrency Market',
      descrRus:
        'Что такое доминация биткоина (BTC.D), зачем следить за этим показателем и как доминирование BTC влияет на рынок криптовалют и альткоины. Простое объяснение для начинающих трейдеров.',
       descrEn: 'What is Bitcoin Dominance (BTC.D), why track this metric, and how BTC dominance affects the cryptocurrency market and altcoins. A simple explanation for beginner traders.',
       descrUkr: 'Що таке домінація біткоїна (BTC.D), навіщо стежити за цим показником і як домінування BTC впливає на ринок криптовалют і альткоїни. Просте пояснення для початківців трейдерів.',
        realTitleRus: 'Что такое доминация биткоина (BTC.D) и как она влияет на рынок криптовалют | Игорь Арапов',
      realTitleUkr: 'Що таке домінація біткоїна (BTC.D) і як вона впливає на ринок криптовалют | Ігор Арапов',
      realTitleEn: 'What is Bitcoin Dominance (BTC.D) and How It Affects the Cryptocurrency Market | Igor Arapov',
      imgUkr: '/assets/img/content/bitcoin_dominance_1.png',
      groupsRus: ['Трейдинг для начинающих'],
      groupsUkr: ['Трейдинг для початківців'],
      groupsEng: ['Trading for Beginners'],
      id: 136,
    },
    {
      titleUkr: 'Чим відрізняється трейдер від інвестора?',
      titleRus: 'Чем отличается трейдер от инвестора?',
      titleEn: 'What is the Difference Between a Trader and an Investor?',
       descrEn:
        'What is the difference between a trader and an investor? Which is better: trading or investing? Learn the key distinctions, advantages, and strategies | ArapovTrade',
      descrUkr:
        'Чим відрізняється трейдер від інвестора? Що краще: трейдинг чи інвестиції? Дізнайтеся ключові відмінності, переваги та стратегії | ArapovTrade',
      descrRus:
        'В чем разница между трейдером и инвестором? Что лучше: трейдинг или инвестиции? Узнайте ключевые отличия, преимущества и стратегии | ArapovTrade',
      realTitleRus: 'Чем отличается трейдер от инвестора? | ArapovTrade',
      realTitleEn: 'What is the Difference Between a Trader and an Investor? | ArapovTrade',
      realTitleUkr: 'Чим відрізняється трейдер від інвестора? | ArapovTrade',
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
      titleUkr: 'Фігура Трикутник у технічному аналізі', 
      titleEn: 'Triangle Pattern in Technical Analysis',
      descrUkr:
        'Дізнайтесь про фігуру Трикутник: як визначити патерн, сигнали пробою та використання в трейдингу. Посібник від ArapovTrade.',
      descrRus:
        'Фигура Треугольник в трейдинге: как торговать паттерн? Руководство от ArapovTrade по анализу, пробою и стратегиям',
      realTitleRus: 'Паттерн треугольник в трейдинге | ArapovTrade',
      realTitleEn: 'Triangle: Trading Pattern | ArapovTrade',
      realTitleUkr: 'Фігура Трикутник у технічному аналізі',
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
      titleRus:
        'Что такое пулы ликвидности и как они работают?',
      titleUkr: 'Що таке пули ліквідності і як вони працюють?',
      titleEn: 'What are Liquidity Pools and How Do They Work?',
      descrEn:
        'Learn how Smart Money finds liquidity pools, manipulates the market, and uses hidden zones. A guide from ArapovTrade.',
       
      descrUkr:
        'Дізнайтесь, як Smart Money знаходять пули ліквідності, маніпулюють ринком та використовують приховані зони. Посібник від ArapovTrade.',
      descrRus:
        'Узнайте, как работают пулы ликвидности! Как Smart Money ищет ликвидность и использует скрытые зоны в трейдинге на Arapov.trade.',
      realTitleRus: 'Что такое пулы ликвидности и как они работают? | Arapov.trade',
      realTitleUkr: 'Що таке пули ліквідності і як вони працюють? | Arapov.trade',
      realTitleEn: 'What are Liquidity Pools and How Do They Work? | Arapov.trade',
      imgUkr: '/assets/img/content/liquiditypools.png',
      groupsRus: ['Концепция Смарт Мани'],
      groupsUkr: ['Концепція Смарт Мані'],
      groupsEng: ['Smart Money Concept'],
      id: 104,
    },
     {
      titleUkr: 'Торгова стратегія для початківців',
      linkUkr: 'practic',
      descrEn:
        'Self-study guide for trading by Igor Arapov: step-by-step course from scratch, real strategies and tips for a confident start in trading.',
      titleRus: 'Стратегия трейдинга для новичков ',
      titleEn: 'Trading Strategy for Beginners',
      descrUkr:
        'Дізнайтесь практичні рекомендації з трейдингу: торгова система, точки входу, мані-менеджмент і ризики від ArapovTrade.',
      descrRus:
        'Узнайте, как построить торговую стратегию в трейдинге: правила входа и выхода, управление рисками, примеры систем для новичков и профи | Игорь Арапов',
      realTitleRus: 'Стратегия трейдинга для новичков | Arapov.trade',
      realTitleUkr: 'Торгова стратегія для початківців | Arapov.trade',
      realTitleEn: 'Trading Strategy for Beginners | Arapov.trade',
      imgUkr: '/assets/img/content/prakticuk.jpg',
      groupsRus: ['Примеры сделок'],
      groupsUkr: ['Приклади угод'],
      groupsEng: ['Trade Examples'],
      id: 109,
    },
    {
       
      linkUkr: 'icebergorders',
      descrEn:
        'Learn about Iceberg Orders: how banks hide their positions and how to use them in trading. A guide from ArapovTrade.',
      titleRus:
        'Что такое айсберг ордер (Iceberg Order)?',
      titleUkr: 'Що таке приховані ордери (Iceberg Orders)?',
      titleEn: 'What are Iceberg Orders?',
      descrUkr:
        'Дізнайтесь, що таке приховані ордери (Iceberg Order), як банки маскують позиції та як використовувати їх у торгівлі. Посібник від ArapovTrade.',
      descrRus:
        'Узнайте, что такое айсберг ордер (скрытые ордера)! Как банки маскируют позиции и как использовать их в трейдинге на Arapov.trade.',
      realTitleRus: 'Что такое айсберг ордер (Iceberg Order)? | Arapov.trade',
      realTitleEn: 'What are Iceberg Orders ? | Arapov.trade',
      realTitleUkr: 'Що таке айсберг ордер (Iceberg Order)? | Arapov.trade',
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
      titleRus:
        'Концепция смарт мани',
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
      titleUkr: 'Як знаходити точки входу Smart Money? Найкращі стратегії',
      linkUkr: 'smartmoneystrategies',
      descrEn:
        'Strategies for Smart Money entry points: Order Blocks, liquidity, FVG, and other key concepts for effective trading.',
      titleRus: 'Как находить точки входа по Smart Money? Лучшие стратегии',
      titleEn: 'How to Find Smart Money Entry Points? Best Strategies',
      descrUkr:
        'Стратегії Smart Money для точного входу: Order Blocks, ліквідність, FVG та інші ключові концепції для ефективної торгівлі.',
      descrRus:
        'Разбираем как находить точки входа по Smart Money! Стратегии с Order Blocks, ликвидностью и FVG для точного трейдинга с Arapov.trade',
      realTitleRus: 'Smart Money: точки входа и стратегии | Arapov.trade',
      realTitleUkr: 'Точки входу за Smart Money: стратегії | Arapov.trade',
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
      titleUkr: 'Як читати Біржовий стакан і стрічку принтів',
      linkUkr: 'stockorderbook',
      descrEn:
        'Learn how to read the order book and tape prints, analyze liquidity, and identify Smart Money trades with ArapovTrade.',
      titleRus: 'Как читать Биржевой стакан и ленту принтов',
      titleEn: 'How to Read the Order Book and Tape Prints',
      descrUkr:
        'Дізнайтесь, як читати біржовий стакан і стрічку принтів, аналізувати ліквідність і угоди Smart Money від ArapovTrade.',
      descrRus:
        'Узнайте, как читать биржевой стакан и ленту принтов! Анализ заявок, ликвидности и сделок для выявления Smart Money и точек входа с Arapov.trade',
      realTitleRus: 'Биржевой стакан и лента принтов: как читать | Arapov.trade',
      realTitleUkr: 'Біржовий стакан і стрічка принтів | Arapov.trade',
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
      realTitleUkr: 'Фази ринку у трейдингу | Arapov.trade',
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
      realTitleRus: 'Маржинальная торговля без потерь — советы ArapovTrade',
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
      realTitleRus: 'Потеря депозита в трейдинге: как избежать? | Arapov.trade',
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
      realTitleRus: 'Стартовый депозит трейдера: сколько нужно для начала?',
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
      titleRus: 'Торговля уровней',
      titleEn: 'Trading of Levels',
      descrEn:
        'Learn how to trade key levels in the market: identification, usage, and effective strategies from Arapov.trade.',
      descrUkr:
        'Детальний посібник для початківців з торгівлі рівнями: як визначати, використовувати та ефективно торгувати ключові рівні від Arapov.trade.',
      descrRus:
        'Узнайте, как торговать уровнями в трейдинге! Полное руководство по определению и использованию ключевых уровней на Arapov.trade.',
      realTitleRus: 'Торговля уровнями в трейдинге | Arapov.trade',
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
      realTitleRus: 'Как определить маркет-мейкера | Arapov.trade',
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
      titleRus: 'Фигура "Флаг" в трейдинге',
      descrEn:
        'Learn how to recognize the Flag pattern in trading, trade breakouts, and avoid mistakes in strategies from ArapovTrade.',
      titleEn: 'Flag Pattern in Trading',
      descrUkr:
        'Дізнайтесь, як розпізнати фігуру Прапор у трейдингу, торгувати пробої та уникати помилок у стратегіях від ArapovTrade.',
      descrRus:
        'Руководство по паттерну «Флаг» в трейдинге: распознавайте сигнал, входите в сделки и управляйте рисками. Примеры и советы от Arapov.trade.',
      realTitleRus: 'Фигура «Флаг» в трейдинге: как торговать | Arapov.trade',
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
        'Маркет-мейкеры в крипторынке: функции и роль | Arapov.trade',
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
      realTitleRus: 'Быстрый старт в трейдинге для новичков | Arapov.trade',
      realTitleEn: 'Quick Start in Trading for Beginners | Arapov.trade',
      realTitleUkr: 'Швидкий старт у трейдингу для новачків',
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
      realTitleRus: 'Основы криптовалют для начинающих | Arapov.trade',
      realTitleUkr: 'Основи криптовалют для початківців | Arapov.trade',
      realTitleEn: 'Cryptocurrency Basics for Beginners | Arapov.trade',
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
      realTitleRus:
        'Как строить уровни в трейдинге | Игорь Арапов',
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
      realTitleUkr: 'Пін-бар: Грааль трейдингу | Arapov.trade',
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
      realTitleRus: 'Как выставлять стоп-лосс в трейдинге | Arapov.trade',
      realTitleEn: 'How to Set Stop-Loss in Trading | Arapov.trade',
      realTitleUkr: 'Як виставляти стоп-лос? | Arapov.trade',
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
      realTitleRus: 'Особенности рынка криптовалют | Arapov.trade',
      realTitleUkr: 'Особливості ринку криптовалют | Arapov.trade',
      realTitleEn: 'Features of the Cryptocurrency Market | Arapov.trade',
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
      realTitleRus: 'Просадки в трейдинге: управление рисками | Arapov.trade',
      realTitleUkr: 'Просадки в трейдингу: як керувати ризиками  Arapov.trade',
      realTitleEn: 'Drawdowns in Trading: Risk Management | Arapov.trade',
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
      realTitleRus:
        'Хранение криптовалют: принципы и безопасность | Arapov.trade',
      realTitleEn:
        'Cryptocurrency Storage: Principles and Security | Arapov.trade',
      realTitleUkr: 'Принципи зберігання криптовалют | Arapov.trade',
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
      realTitleRus: 'Преимущества и риски криптостейкинга | ArapovTrade',
      realTitleUkr: 'Переваги й ризики криптостейкінгу | Arapov.trade',
      realTitleEn: 'Advantages and Risks of Crypto Staking | Arapov.trade',
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
      realTitleRus: 'Анатомия трендов в трейдинге | ArapovTrade',
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
      realTitleRus: 'Что такое ордер блок (Order Block) в трейдинге | ArapovTrade',
      realTitleEn: 'What is an Order Block in Trading | ArapovTrade',
      realTitleUkr: 'Що таке ордер блок у трейдингу (Order Block) | ArapovTrade',
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
      realTitleRus: 'Tether (USDT): что это и как использовать | Arapov.trade',
      realTitleEn: 'Tether (USDT): What It Is and How to Use It | Arapov.trade',
      realTitleUkr: 'Tether (USDT): що це та як використовувати',
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
      realTitleRus: 'Знакомство с биржей: полное руководство | Arapov.trade',
      realTitleEn:
        'Introduction to the Exchange: A Complete Guide | Arapov.trade',
      realTitleUkr: 'Біржа: повний гід для трейдерів | Arapov.trade',
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
      titleUkr: 'Як почати торгувати на криптобіржі',
      linkUkr: 'cryptostart',
      titleRus: 'Как начать торговать на криптобирже',
      titleEn: 'How to Start Trading on a Crypto Exchange',
      realTitleUkr: 'Як торгувати на криптобіржі | ArapovTrade',
      descrEn:
        'Learn how to start trading on a crypto exchange! Platform selection, registration, strategies, and risk management tips from Arapov.trade.',
      descrRus:
        'Узнайте, как начать торговать на криптобирже! Выбор платформы, регистрация, стратегии и советы по управлению рисками на Arapov.trade.',
      realTitleRus: 'Как начать торговать на криптобирже | Arapov.trade',
      realTitleEn: 'How to Start Trading on a Crypto Exchange | Arapov.trade',
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
        realTitleRus:
        'Что такое халвинг биткоина? | Arapov.trade',
        realTitleUkr:'Що таке халвінг біткоїна? | Arapov.trade',
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
      realTitleRus: 'Реквоты в трейдинге: что это и как избежать | Arapov.trade',
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
      titleUkr: 'Як Smart Money використовують хибні пробої?',
      linkUkr: 'falsebreakouts',
      titleRus: 'Как Smart Money используют ложные пробои?',
      descrEn:
        'Learn how Smart Money use false breakouts to gather liquidity and how to avoid their traps in trading. A guide from ArapovTrade.',
      titleEn: 'How Do Smart Money Use False Breakouts?',
      descrUkr:
        'Дізнайтесь, як Smart Money використовують хибні пробої для збору ліквідності та як уникнути їх пасток у трейдингу. Посібник від ArapovTrade.',
      descrRus:
        'Узнайте, как Smart Money создают ложные пробои для сбора ликвидности! Способы распознавания ловушек в трейдинге на Arapov.trade.',
      realTitleRus: 'Smart Money и ложные пробои: как работают | Arapov.trade',
      realTitleEn:
        'Smart Money and False Breakouts: How They Work | Arapov.trade',
      realTitleUkr: 'Хибні пробої: як Smart Money збирають ліквідність',
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
      titleUkr: 'Специфіка управління капіталом у трейдингу',
      linkUkr: 'capitalmanagement',
      titleRus: 'Специфика управления капиталом в трейдинге',
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
      realTitleRus: 'Таймфреймы в трейдинге: на каком таймфрейме лучше торговать | Arapov.trade',
      realTitleUkr: 'Таймфрейми у трейдингу: який таймфрейм найкращий для торгівлі | Arapov.trade',
       realTitleEn: 'Timeframes in Trading: Which Timeframe is Best for Trading | Arapov.trade',
       
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
      titleUkr: 'Концепція Річарда Вайкоффа у розумінні обсягів',
      linkUkr: 'wyckoffsvolumeconcept',
      titleRus: 'Концепция Ричарда Вайкоффа в понимании объемов',
      descrEn:
        "Learn about Wyckoff's Volume Concept: how volume analysis reveals Smart Money actions and key market levels from ArapovTrade.",
      titleEn: "Wyckoff's Volume Concept Explained",
      descrUkr:
        'Дізнайтесь про концепцію Вайкоффа: як об’ємний аналіз виявляє дії великих гравців і ключові рівні ринку від ArapovTrade.',
      descrRus:
        'Концепция Вайкоффа: как объёмный анализ выявляет намерения крупных игроков и ключевые уровни рынка. Советы от ArapovTrade',
      realTitleRus: 'Концепция Вайкоффа: объёмный анализ | ArapovTrade',
      realTitleUkr: 'Вайкофф: об’ємний аналіз ринку | ArapovTrade',
      realTitleEn: 'Wyckoff: Volume Market Analysis | ArapovTrade',
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
      titleRus: 'Что такое экономический календарь',
      descrEn:
        'Learn what an economic calendar is, how it helps predict market movements, and trade news on stocks and indices from ArapovTrade.',
      titleEn: 'What is an Economic Calendar',
      descrUkr:
        'Дізнайтесь, як економічний календар допомагає прогнозувати ринкові рухи та торгувати на новинах акцій і індексів від ArapovTrade.',
      descrRus:
        'Узнайте, как экономический календарь помогает в трейдинге! Гид по событиям, влияющим на акции, индексы и стратегии торговли на новостях',
      realTitleRus:
        'Экономический календарь в трейдинге: как использовать | Arapov.trade',
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
      titleRus: 'Психология торговли Уильяма Ганна',
      descrEn:
        "Discover William Gann's trading psychology: self-control, risk management, and methods for modern trading from ArapovTrade.",
      titleEn: "William Gann's Trading Psychology",
      descrUkr:
        'Дізнайтесь про психологію трейдингу Вільяма Ганна: самоконтроль, управління ризиками та методи для сучасного трейдингу від ArapovTrade.',
      descrRus:
        'Психология трейдинга по У. Ганну: самоконтроль, управление рисками, устойчивость. Применяйте принципы Ганна в торговле для успеха!',
      realTitleRus:
        'Психология трейдинга по Уильяму Ганну: секреты успеха | ArapovTrade',
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
      realTitleRus:
        'Психология трейдинга: контроль эмоций | Arapov.trade',
      realTitleUkr: 'Психологія трейдингу: контроль емоцій | Arapov.trade',
      realTitleEn: 'Trading Psychology: Emotion Control | Arapov.trade',
      imgUkr: '/assets/img/content/emotionsaffect44.webp',
      groupsRus: ['Психология трейдинга'],
      groupsUkr: ['Психологія трейдингу'],
      groupsEng: ['Trading Psychology'],
      id: 148,
    },
    {
      titleUkr: 'Як уникнути "FOMO" - страху втраченого прибутку?',
      linkUkr: 'fomo',
      titleRus: 'Как избежать "FOMO" – страха упущенной прибыли?',
      descrEn:
        'Learn what FOMO is in trading, how to avoid fear of missing out, and trade mindfully with tips from ArapovTrade.',
      titleEn: 'How to Avoid FOMO – Fear of Missing Out?',
      descrUkr:
        'Дізнайтесь, що таке FOMO в трейдингу, як уникнути страху втраченої вигоди та торгувати усвідомлено. Поради від ArapovTrade.',
      descrRus:
        'FOMO в трейдинге: как избежать потерь? Советы от ArapovTrade по осознанной торговле и управлению эмоциями.',
      realTitleRus: 'Как избежать FOMO в трейдинге? | ArapovTrade',
      realTitleEn: 'How to Avoid FOMO in Trading? | ArapovTrade',
      realTitleUkr: 'FOMO в трейдингу: як уникнути страху',
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
        realTitleRus: 'Паттерн поглощение. Как определить разворот тренда? | ArapovTrade',
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
  ];
}
