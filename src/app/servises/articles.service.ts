import { Injectable } from '@angular/core';
interface artickle {
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
  ];
  groupsRus = [
    'Объемный анализ рынка',
    'Концепция Смарт Мани',
    'Трейдинг для начинающих',
    'Психология трейдинга',
    'Словарь трейдера',
    'Технический анализ',
    'Фундаментальный анализ',
  ];
  groupsEn = [
    'Market Volume Analysis',
    'Smart Money Concept',
    'Trading for Beginners',
    'Trading Psychology',
    'Trader`s Dictionary',
    'Technical Analysis',
    'Fundamental Analysis',
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
      titleUkr: 'Фази ринку у трейдингу',
      titleEn: 'Market phases in trading',
      titleRus: 'Фазы рынка в трейдинге',
      linkUkr: 'blogmarketphases',
      imgUkr: '/assets/img/content/blogmarketphases44.jpg',
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
      imgUkr: '/assets/img/content/volatility.jpg',
      groupsRus: ['Трейдинг для начинающих'],
      groupsEn: ['Trading for Beginners'],
      groupsUkr: ['Трейдинг для початківців'],
      id: 3,
    },
    {
      titleUkr: 'Основні причини втрати депозиту',
      titleEn: 'Main reasons for loss of deposit',
      titleRus: 'Основные причины потери депозита',

      linkUkr: 'reasonfordepositeloose',
      imgUkr: '/assets/img/content/reasonfordepositeloose44.png',
      groupsRus: ['Психология трейдинга'],
      groupsEn: ['Trading Psychology'],
      groupsUkr: ['Психологія трейдингу'],
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
      titleUkr: 'Смарт Мані',
      titleEn: 'Smart Money',
      titleRus: 'Смарт Мани',

      linkUkr: 'smartestmoney',
      imgUkr: '/assets/img/content/smartestmoney44.png',
      groupsRus: ['Концепция Смарт Мани'],
      groupsEn: ['Smart Money Concept'],
      groupsUkr: ['Концепція Смарт Мані'],
      id: 6,
    },
    {
      titleUkr: 'Як заробляють у трейдінгу?',
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
      titleUkr: 'Імбаланс у трейдингу',
      titleRus: 'Имбаланс в трейдинге',
      titleEn: 'Imbalance in trading',

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
      titleUkr: 'Основна причина втрат у Трейдінгу',
      titleRus: 'Основная причина потерь в Трейдинге',
      titleEn: 'The main reason for losses in Trading',

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
      titleUkr: 'Хвилі Елліотта та Рівні Фібоначчі',
      titleRus: 'Волны Эллиотта и Уровни Фибоначчи',

      titleEn: 'Elliott Waves and Fibonacci Levels',
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
      titleUkr: "Вся правда про торгівлю ф'ючерсами",
      linkUkr: 'futurestrading',
      titleRus: 'Вся правда о торговле фьючерсами',

      titleEn: 'The whole truth about futures trading',
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
      imgUkr: '/assets/img/content/tradingmyths.png',
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
      titleUkr: 'Смарт Мані',
      titleEn: 'Smart Money',
      titleRus: 'Смарт Мани',

      linkUkr: 'smartmoneyeducation',
      imgUkr: '/assets/img/content/smartmoneyeducation44.png',
      groupsRus: ['Концепция Смарт Мани'],
      groupsEn: ['Smart Money Concept'],
      groupsUkr: ['Концепція Смарт Мані'],
      id: 19,
    },
    {
      titleUkr: '​Найкращий час для тредингу',
      titleEn: 'Best time for trading',
      titleRus: 'Лучшее время для трейдинга',

      linkUkr: 'besttimefortrading',
      imgUkr: '/assets/img/content/besttimefortrading44.png',
      groupsRus: ['Трейдинг для начинающих'],
      groupsEn: ['Trading for Beginners'],
      groupsUkr: ['Трейдинг для початківців'],
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
      titleUkr: 'Цінові фігури у трейдингу',
      titleEn: 'Price patterns in trading',
      titleRus: 'Ценовые фигуры в трейдинге',

      linkUkr: 'pricepatterns',
      imgUkr: '/assets/img/content/pricepatterns44.png',
      groupsRus: ['Технический анализ'],
      groupsEn: ['Technical Analysis'],
      groupsUkr: ['Технічний аналіз'],
      id: 22,
    },
    {
      titleUkr: 'Ліквідність у Трейдингу',
      titleEn: 'Liquidity in Trading',
      titleRus: 'Ликвидность в Трейдинге',

      linkUkr: 'liqudityintrading',
      imgUkr: '/assets/img/content/liqudityintrading44.png',
      groupsRus: ['Объемный анализ рынка'],
      groupsEn: ['Market Volume Analysis'],
      groupsUkr: ['Об`ємний аналіз ринку'],
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
      titleUkr: 'Проста система трейдера',
      titleEn: 'Simple trader system',
      titleRus: 'Простая система трейдера',

      linkUkr: 'simpletradingsystem',
      imgUkr: '/assets/img/content/simpletradingsystem44.png',
      groupsRus: ['Трейдинг для начинающих'],
      groupsEn: ['Trading for Beginners'],
      groupsUkr: ['Трейдинг для початківців'],
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
      titleUkr: 'Як читати японські свічки?',
      titleEn: 'How to read Japanese candlesticks?',
      titleRus: 'Как читать японские свечи?',

      linkUkr: 'japanesecandle',
      imgUkr: '/assets/img/content/japanesecandle44.jpg',
      groupsRus: ['Технический анализ'],
      groupsEn: ['Technical Analysis'],
      groupsUkr: ['Технічний аналіз'],
      id: 27,
    },
    {
      titleUkr: 'Smart Money - стратегія трейдингу ',
      linkUkr: 'smartmoneystrategy',
      titleEn: 'Smart Money - trading strategy',
      titleRus: 'Smart Money - стратегия трейдинга',

      imgUkr: '/assets/img/content/smartmoneystrategy44.png',
      groupsRus: ['Концепция Смарт Мани'],
      groupsEn: ['Smart Money Concept'],
      groupsUkr: ['Концепція Смарт Мані'],
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

      imgUkr: '/assets/img/content/cryptocurrencybasics44.png',
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

      imgUkr: '/assets/img/content/purchasingcourses44.png',
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
      imgUkr: '/assets/img/content/stoploss44.png',
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
      titleUkr: 'Навчання Трейдінгу Криптовалют',
      titleEn: 'Cryptocurrency Trading Training',
      titleRus: 'Обучение Трейдингу Криптовалют',

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
      titleUkr: 'Повний Курс Концепції Смарт Мані',
      titleEn: 'Complete Course on Smart Money Concept',
      titleRus: 'Полный Курс по Концепции Смарт Мани',

      linkUkr: 'smartmoneyconcept',
      imgUkr: ' /assets/img/content/smartmoneyconcept44.png',
      groupsRus: ['Концепция Смарт Мани'],
      groupsEn: ['Smart Money Concept'],
      groupsUkr: ['Концепція Смарт Мані'],
      id: 38,
    },
    {
      titleUkr: 'Об`ємний аналіз ринку',
      titleEn: 'Volumetric Market Analysis',
      titleRus: 'Объемный Анализ Рынка',

      linkUkr: 'volumetricmarketanalysis',
      imgUkr: '/assets/img/content/volumetricmarketanalysis44.png',
      groupsRus: ['Объемный анализ рынка'],
      groupsEn: ['Market Volume Analysis'],
      groupsUkr: ['Об`ємний аналіз ринку'],
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
      titleUkr: 'Смарт Мані - стратегія за якою торгують Банки',
      titleEn: 'Smart Money - the strategy used by banks to trade',
      linkUkr: 'smartmoneystrategyforbanks',
      titleRus: 'Смарт Мани - стратегия по которой торгуют Банки ',

      imgUkr: '/assets/img/content/smartmoneystrategyforbanks44.png',
      groupsRus: ['Концепция Смарт Мани'],
      groupsEn: ['Smart Money Concept'],
      groupsUkr: ['Концепція Смарт Мані'],
      id: 43,
    },
    {
      titleUkr: 'Основи трейдингу для початківців',
      titleEn: 'Trading Basics for Beginners',
      titleRus: 'Основы трейдинга для начинающих ',

      linkUkr: 'basicsoftrading',
      imgUkr: '/assets/img/content/basicsoftrading44.png',
      groupsRus: ['Трейдинг для начинающих'],
      groupsEn: ['Trading for Beginners'],
      groupsUkr: ['Трейдинг для початківців'],
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
      titleUkr: 'Навчання Трейдингу Безкоштовно',
      titleEn: 'Free trading education',
      titleRus: 'Обучение Трейдингу Бесплатно ',

      linkUkr: 'freeeducation',
      imgUkr: '/assets/img/content/freeeducation44.png',
      groupsRus: ['Трейдинг для начинающих'],
      groupsEn: ['Trading for Beginners'],
      groupsUkr: ['Трейдинг для початківців'],
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

      imgUkr: '/assets/img/content/selfstudying44.png',
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
      titleUkr: 'Cвічні патерни в Price Action',
      titleEn: 'Candlestick patterns in Price Action',
      titleRus: 'Cвечные паттерны в Price Action',

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
      imgUkr: '/assets/img/content/orderblockintrading44.jpg',
      groupsRus: ['Концепция Смарт Мани'],
      groupsEn: ['Smart Money Concept'],
      groupsUkr: ['Концепція Смарт Мані'],
      id: 53,
    },
    {
      titleUkr: 'Особливості ринку Криптовалют',
      titleEn: 'Features of the Cryptocurrency market',
      titleRus: 'Особенности рынка Криптовалют',

      linkUkr: 'featuresofcrypto',
      imgUkr: '/assets/img/content/featuresofcrypto44.png',
      groupsRus: ['Трейдинг для начинающих'],
      groupsEn: ['Trading for Beginners'],
      groupsUkr: ['Трейдинг для початківців'],
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

      imgUkr: '/assets/img/content/benefitsoftradingbooks44.jpg',
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
      titleUkr: 'Поради трейдерам-початківцям ',
      linkUkr: 'adviceforbeginners',
      titleEn: 'Tips for beginner traders',
      titleRus: 'Советы начинающим трейдерам',

      imgUkr: ' /assets/img/content/TipsForStarters.webp',
      groupsRus: ['Трейдинг для начинающих'],
      groupsEn: ['Trading for Beginners'],
      groupsUkr: ['Трейдинг для початківців'],
      id: 61,
    },
    {
      titleUkr: 'Основні причини втрати грошей на біржі',
      linkUkr: 'reasonforloosingmoney',
      titleEn: 'Main Reasons for Losing Money on the Stock Exchange',
      titleRus: 'Основные причины потери денег на бирже',

      imgUkr: '/assets/img/content/reasonforloosingmoney44.png',
      groupsRus: ['Трейдинг для начинающих'],
      groupsEn: ['Trading for Beginners'],
      groupsUkr: ['Трейдинг для початківців'],
      id: 62,
    },
    {
      titleUkr: 'Основи ринку. Терміни',
      linkUkr: 'marketbasics',
      titleEn: 'Market Basics. Definitions',
      titleRus: 'Основы рынка. Термины',

      imgUkr: '/assets/img/content/osnovirinka44.jpg',
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

      imgUkr: '/assets/img/content/znakomstvosbirgey44.jpg',
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

      imgUkr: '/assets/img/content/exchangemarkets44.jpg',
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
      titleUkr: 'Основні учасники біржі',
      linkUkr: 'exchangeparticipants',
      titleEn: 'Main participants of the exchange',
      titleRus: 'Основные участники биржи',

      imgUkr: '/assets/img/content/uchastnikiBirgi44.png',
      groupsRus: ['Словарь трейдера'],
      groupsEn: ['Trader`s Dictionary'],
      groupsUkr: ['Словник трейдера'],
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

      imgUkr: '/assets/img/content/currencies44.jpg',
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
      titleUkr: 'Дата валютування',
      linkUkr: 'forexvaluedate',
      titleEn: 'Value Date',
      titleRus: 'Дата валютирования',

      imgUkr: '/assets/img/content/forexValueDate44.png',
      groupsRus: ['Словарь трейдера'],
      groupsEn: ['Trader`s Dictionary'],
      groupsUkr: ['Словник трейдера'],
      id: 72,
    },
    {
      titleUkr: 'Як заробити на FOREX',
      linkUkr: 'howtomakemoney',
      titleEn: 'How to make money trading FOREX',
      titleRus: 'Как заработать на FOREX',

      imgUkr: '/assets/img/content/howToMakeMoney44.png',
      groupsRus: ['Трейдинг для начинающих'],
      groupsEn: ['Trading for Beginners'],
      groupsUkr: ['Трейдинг для початківців'],
      id: 73,
    },
    {
      titleUkr: 'Ризик зміни курсу',
      linkUkr: 'riskcurrencyexchange',
      titleEn: 'Currency Exchange Risk',
      titleRus: 'Риск изменения курса',

      imgUkr: '/assets/img/content/riskCurrencyExchange44.png',
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

      imgUkr: '/assets/img/content/majorBankFrs44.png',
      groupsRus: ['Словарь трейдера'],
      groupsEn: ['Trader`s Dictionary'],
      groupsUkr: ['Словник трейдера'],
      id: 76,
    },
    {
      titleUkr: 'Поведенкові ризики',
      linkUkr: 'behavioralrisks',
      titleEn: 'Behavioral Risks',
      titleRus: 'Поведенческие риски',

      imgUkr: '/assets/img/content/behavioralsRisks44.png',
      groupsRus: ['Психология трейдинга'],
      groupsEn: ['Trading Psychology'],
      groupsUkr: ['Психологія трейдингу'],
      id: 77,
    },
    {
      titleUkr: 'Неринкові ризики FOREX',
      linkUkr: 'nonmarketrisks',
      titleEn: 'Non-market Risks of FOREX',
      titleRus: 'Нерыночные риски FOREX',

      imgUkr: '/assets/img/content/nonmarketrisks44.png',
      groupsRus: ['Психология трейдинга'],
      groupsEn: ['Trading Psychology'],
      groupsUkr: ['Психологія трейдингу'],
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
    // {
    //   titleUkr: 'Фундаментальний аналіз ринку',
    //   linkUkr: 'marketanalysis',
    //   titleEn: 'Fundamental Market Analysis',
    //   titleRus: 'Фундаментальный анализ рынка',

    //   imgUkr: '/assets/img/content/fundamentalmarketanalysis44.png',
    //   groupsRus: ['Фундаментальный анализ'],
    //   groupsEn: ['Fundamental Analysis'],
    //   groupsUkr: ['Фундаментальний аналіз'],
    //   id: 81,
    // },
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
      titleUkr: 'Економічний стан держави',
      linkUkr: 'economicstate',
      titleEn: 'Economic State of the Country',
      titleRus: 'Экономическое состояние государства',

      imgUkr: '/assets/img/content/economicstate44.png',
      groupsRus: ['Фундаментальный анализ'],
      groupsEn: ['Fundamental Analysis'],
      groupsUkr: ['Фундаментальний аналіз'],
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
      titleUkr: 'Об`ємний аналіз ринку',
      linkUkr: 'volumemarketanalysis',
      titleEn: 'Volume Market Analysis',
      titleRus: 'Объемный анализ рынка',

      imgUkr: '/assets/img/content/volumemarketanalysis44.png',
      groupsRus: ['Объемный анализ рынка'],
      groupsEn: ['Market Volume Analysis'],
      groupsUkr: ['Об`ємний аналіз ринку'],
      id: 90,
    },
    {
      titleUkr: 'Види та типи ордерів',
      linkUkr: 'typesoforders',
      titleEn: 'Types and Kinds of Orders',
      titleRus: 'Виды и типы ордеров',

      imgUkr: '/assets/img/content/typesoforders44.png',
      groupsRus: ['Объемный анализ рынка'],
      groupsEn: ['Market Volume Analysis'],
      groupsUkr: ['Об`ємний аналіз ринку'],
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
      titleUkr: 'Реквоти',
      linkUkr: 'requotes',
      titleEn: 'Requotes',
      titleRus: 'Реквоты',

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
      titleUkr: 'Торгова система',
      linkUkr: 'tradingsystem',
      titleEn: 'Trading Systems',
      titleRus: 'Торговая система',

      imgUkr: '/assets/img/content/tradingsystem44.png',
      groupsRus: ['Трейдинг для начинающих'],
      groupsEn: ['Trading for Beginners'],
      groupsUkr: ['Трейдинг для початківців'],
      id: 96,
    },
    {
      titleUkr: 'Розподіл торгових систем. Тривалість угоди',
      linkUkr: 'tradingsystemsseparation',
      titleEn: 'Separation of trading systems. Duration of the transaction',
      titleRus: 'Разделение торговых систем. Длительность сделки',

      imgUkr: '/assets/img/content/tradingsystemsseparation44.png',
      groupsRus: ['Трейдинг для начинающих'],
      groupsEn: ['Trading for Beginners'],
      groupsUkr: ['Трейдинг для початківців'],
      id: 97,
    },
    {
      titleUkr: 'Розподіл торгових систем. Автоматизація',
      linkUkr: 'tradingsystemautomation',
      titleEn: 'Separation of trading systems. Automation',
      titleRus: 'Разделение торговых систем. Автоматизация',

      imgUkr: '/assets/img/content/tradingsystemautomation44.png',
      groupsRus: ['Трейдинг для начинающих'],
      groupsEn: ['Trading for Beginners'],
      groupsUkr: ['Трейдинг для початківців'],
      id: 98,
    },
    {
      titleUkr: 'Специфіка управління капіталом у трейдингу',
      linkUkr: 'capitalmanagement',
      titleEn: 'Specifics of Capital Management in Trading',
      titleRus: 'Специфика управления капиталом в трейдинге',

      imgUkr: '/assets/img/content/capitalmanagement44.jpg',
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

      imgUkr: '/assets/img/content/profitandlossratio44.png',
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

      imgUkr: '/assets/img/content/beginnermistakes44.png',
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

      imgUkr: '/assets/img/content/timeframes44.png',
      groupsRus: ['Трейдинг для начинающих'],
      groupsEn: ['Trading for Beginners'],
      groupsUkr: ['Трейдинг для початківців'],
      id: 103,
    },
    {
      titleUkr: 'Як обрати таймфрейм для торгівлі на біржі',
      linkUkr: 'selectingtimeframe',
      titleEn: 'How to Choose a Timeframe for Trading on the Stock Exchange',
      titleRus: 'Как выбрать таймфрейм для торговли на бирже',

      imgUkr: '/assets/img/content/selectingtimeframe44.png',
      groupsRus: ['Трейдинг для начинающих'],
      groupsEn: ['Trading for Beginners'],
      groupsUkr: ['Трейдинг для початківців'],
      id: 104,
    },
    {
      titleUkr: 'На якому таймфреймі краще торгувати новачкові',
      linkUkr: 'timeframeforbeginner',
      titleEn: 'What Timeframe is Best for a Beginner to Trade On',
      titleRus: 'На каком таймфрейме лучше торговать новичку',

      imgUkr: '/assets/img/content/timeframeforbeginner44.png',
      groupsRus: ['Трейдинг для начинающих'],
      groupsEn: ['Trading for Beginners'],
      groupsUkr: ['Трейдинг для початківців'],
      id: 105,
    },
    {
      titleUkr: 'Види таймфреймів',
      linkUkr: 'typeoftimeframes',
      titleEn: 'Types of Timeframes',
      titleRus: 'Виды таймфреймов',

      imgUkr: '/assets/img/content/typeoftimeframes44.png',
      groupsRus: ['Трейдинг для начинающих'],
      groupsEn: ['Trading for Beginners'],
      groupsUkr: ['Трейдинг для початківців'],
      id: 106,
    },
  ];
}
