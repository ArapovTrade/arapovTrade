import {
  Component,
  OnInit,
  ChangeDetectorRef,
  Inject,
  Renderer2,
  signal,
} from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { ThemeservService } from '../../../../../servises/themeserv.service';
import { artickle } from '../../../../../servises/articles.service';
import { Subscription } from 'rxjs';
import { NavigationEnd, Router } from '@angular/router';
import { Meta, Title } from '@angular/platform-browser';
import { ArticlesService } from '../../../../../servises/articles.service';

@Component({
  selector: 'app-home-ru-blog-fifty-seven',
  templateUrl: './home-ru-blog-fifty-seven.component.html',
  styleUrl: './home-ru-blog-fifty-seven.component.scss',
})
export class HomeRuBlogFiftySevenComponent implements OnInit {
  constructor(
    private meta: Meta,
    private titleService: Title,
    private cdr: ChangeDetectorRef,
    private router: Router,
    private themeService: ThemeservService,
    private artickleServ: ArticlesService,
    private renderer: Renderer2,
    @Inject(DOCUMENT) private document: Document
  ) {}
  private routerSubscription!: Subscription;
  private themeSubscription!: Subscription;
  isDark!: boolean;
  ukrGroups: any = [];
  grr!: any;
  checkedGroup!: any;

  readonly panelOpenState = signal(false);

  ngOnInit(): void {
    this.removeSelectedSchemas();
    this.setArticleSchema();
    this.setPersonSchema();
    this.setFaqSchema();
    this.setHowToSchema();
    this.setGlossarySchema();

    this.themeSubscription = this.themeService.getTheme().subscribe((data) => {
      this.isDark = data;
      this.cdr.detectChanges();
    });

    this.ukrGroups = this.artickleServ.getRussianGroups();
    this.grr = this.artickleServ.selectedGroups;
    this.updateArticleCounts();
    this.checkedGroup = this.artickleServ.selectedGroups;

    this.titleService.setTitle(
      'Индикаторы в трейдинге: полное руководство по RSI и MACD'
    );
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.updateTag({
      name: 'description',
      content:
        'Подробное руководство по индикаторам технического анализа RSI и MACD. Узнайте, как использовать осцилляторы для определения точек входа и выхода из рынка.',
    });
    this.meta.updateTag({ name: 'datePublished', content: '2025-04-17' });
    this.meta.updateTag({
      property: 'og:image',
      content: '/assets/img/content/tradingindicators.webp',
    });
    this.gerRandom();
  }
  randomArticleRus: any = [];
  gerRandom() {
    this.randomArticleRus = this.artickleServ.getRandomUkArticles();
  }

  hoveredIndex: number | null = null;

  projects = [
    { title: 'Быстрый старт', link: 'https://arapov.education/course/' },
    {
      title: 'Введение в трейдинг',
      link: 'https://arapov.education/reg-workshop/',
    },
    {
      title: 'Профессиональные курсы',
      link: 'https://arapov.trade/ru/studying',
    },
    {
      title: 'Базовый курс',
      link: 'https://arapov.trade/ru/freestudying/freeeducation',
    },
    { title: 'Копитрейдинг', link: 'https://arapovcopytrade.com' },
  ];

  onGroupChange(event: Event) {
    const checkbox = event.target as HTMLInputElement;
    const value = checkbox.value;

    this.router.navigate(['/ru/freestudying'], {
      queryParams: { group: value },
    });

    this.checkedGroup = this.artickleServ.selectedGroups;
  }
  paginatedArticles = []; // Статьи для отображения на текущей странице
  currentPage = 0;
  pageSize = 10;

  ngOnDestroy() {
    // Отписка от подписок
    if (this.routerSubscription) {
      this.routerSubscription.unsubscribe();
    }
    if (this.themeSubscription) {
      this.themeSubscription.unsubscribe();
    }
  }
  hovered: string | null = null;
  toggleTheme() {
    this.isDark = !this.isDark;
    this.themeService.setTheme(this.isDark);
  }

  navigateTo(path: string) {
    this.router.navigate([path]);
  }

  articleCounts: { [key: string]: number } = {};
  updateArticleCounts() {
    this.articleCounts = {}; // очищаем

    this.artickleServ.ukrArtickles.forEach((article) => {
      // article.groupsUkr — это массив, например ['Програмування', 'Маркетинг']
      article.groupsRus.forEach((group) => {
        if (!this.articleCounts[group]) {
          this.articleCounts[group] = 1;
        } else {
          this.articleCounts[group]++;
        }
      });
    });
  }
  //popup
  flag1: boolean = false;
  flagTrue1: boolean = true;
  searchtoggle(event: Event) {
    this.flag1 = !this.flag1;
    this.flagTrue1 = !this.flagTrue1;
  }

  isFocused = false;
  displayedArticles: artickle[] = [];
  maxResults = 5;
  searchQuery: string = '';

  onFocus() {
    this.isFocused = true;

    // Показываем 5 случайных статей при фокусе, если инпут пуст
    if (!this.searchQuery) {
      const shuffled = [...this.artickleServ.ukrArtickles].sort(
        () => Math.random() - 0.5
      );
      this.displayedArticles = shuffled.slice(0, this.maxResults);
    }
  }

  onBlur() {
    setTimeout(() => {
      this.isFocused = false;
    }, 150); // таймаут чтобы клик по статье сработал
  }

  onSearchChange() {
    // Логика асинхронного поиска
    const filtered = this.artickleServ.ukrArtickles.filter((a) =>
      a.titleUkr.toLowerCase().includes(this.searchQuery.toLowerCase())
    );
    this.displayedArticles = filtered.slice(0, this.maxResults);
  }

  moveToTheTop() {
    const element = document.getElementById('scrollToTop');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  groupsMenuOpen = false;
  toggleGroupsMenu(event: Event) {
    this.groupsMenuOpen = !this.groupsMenuOpen;
  }

  goToNextPage() {
    let nextpage: any;
    const path: string =
      this.router.url.split('/')[this.router.url.split('/').length - 1];
    let index = this.artickleServ.ukrArtickles.findIndex(
      (a) => a.linkUkr == path
    );

    if (this.artickleServ.ukrArtickles.length - 1 == index) {
      nextpage = this.artickleServ.ukrArtickles[0].linkUkr;
    } else {
      nextpage = this.artickleServ.ukrArtickles[index + 1].linkUkr;
    }

    this.router.navigate(['/ru/freestudying', nextpage]);
  }

  goToPreviousPage() {
    let nextpage: any;
    const path: string =
      this.router.url.split('/')[this.router.url.split('/').length - 1];
    let index = this.artickleServ.ukrArtickles.findIndex(
      (a) => a.linkUkr == path
    );

    if (index == 1) {
      nextpage =
        this.artickleServ.ukrArtickles[
          this.artickleServ.ukrArtickles.length - 1
        ].linkUkr;
    } else {
      nextpage = this.artickleServ.ukrArtickles[index - 1].linkUkr;
    }

    this.router.navigate(['/ru/freestudying', nextpage]);
  }

  private removeSelectedSchemas(): void {
    const typesToRemove = [
      'Article',
      'FAQPage',
      'HowTo',
      'DefinedTermSet',
      'Person',
    ];

    const scripts = this.document.querySelectorAll(
      'script[type="application/ld+json"]'
    );

    scripts.forEach((script) => {
      try {
        const json = JSON.parse(script.textContent || '{}');

        // Массив, объект-граф или одиночный объект
        const candidates =
          json['@graph'] ?? (Array.isArray(json) ? json : [json]);

        const shouldRemove = candidates.some(
          (entry: any) =>
            entry['@type'] && typesToRemove.includes(entry['@type'])
        );

        if (shouldRemove) {
          script.remove();
        }
      } catch {
        /* ignore invalid */
      }
    });
  }

  private addJsonLdSchema(data: any): void {
    const script = this.renderer.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify(data);
    this.renderer.appendChild(this.document.head, script);
  }

  // ============================================================
  //  ARTICLE
  // ============================================================
  private setArticleSchema(): void {
    const data = {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'Article',
          mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': 'https://arapov.trade/ru/freestudying/tradingindicators',
          },
          headline: 'Торговые индикаторы: полный гайд для трейдеров',
          description:
            'Честный разбор индикаторов в трейдинге. Почему Stochastic, Moving Average, MACD не дают стабильных результатов и что использовать вместо них.',
          image:
            'https://arapov.trade/assets/img/content/tradingindicators.webp',
          datePublished: '2025-01-15T00:00:00+02:00',
          dateModified: '2025-01-15T00:00:00+02:00',
          inLanguage: 'ru',
          author: {
            '@type': 'Person',
            '@id': 'https://arapov.trade/ru#person',
            name: 'Игорь Арапов',
            url: 'https://arapov.trade/ru',
            sameAs: [
              'https://www.youtube.com/@ArapovTrade',
              'https://www.mql5.com/ru/signals/2246716',
            ],
          },
          publisher: {
            '@type': 'Organization',
            '@id': 'https://arapov.trade/#organization',
            name: 'Arapov.Trade',
            logo: {
              '@type': 'ImageObject',
              url: 'https://arapov.trade/assets/img/favicon.ico',
            },
          },
          video: {
            '@type': 'VideoObject',
            name: 'Честный разговор об индикаторах в трейдинге',
            description:
              'Честный разговор об индикаторах в трейдинге от практика с 11-летним стажем. Игорь Арапов рассказывает, почему после 3 лет экспериментов с индикаторами полностью от них отказался и что использует вместо них.',
            thumbnailUrl: [
              'https://img.youtube.com/vi/t4eLSS2vh-w/maxresdefault.jpg',
              'https://img.youtube.com/vi/t4eLSS2vh-w/hqdefault.jpg',
            ],
            uploadDate: '2025-11-17T00:00:00+02:00',
            duration: 'PT12M35S',
            contentUrl: 'https://www.youtube.com/watch?v=t4eLSS2vh-w',
            embedUrl: 'https://www.youtube.com/embed/t4eLSS2vh-w',
            inLanguage: 'ru',
            keywords:
              'индикаторы трейдинг, Stochastic, Moving Average, MACD, объемный анализ, технический анализ',
            hasPart: [
              {
                '@type': 'Clip',
                name: 'Индикаторы в трейдинге - все плюсы и минусы использования',
                startOffset: 0,
                endOffset: 22,
                url: 'https://www.youtube.com/watch?v=t4eLSS2vh-w&t=0',
              },
              {
                '@type': 'Clip',
                name: 'Как трейдеры знакомятся с индикаторами',
                startOffset: 22,
                endOffset: 96,
                url: 'https://www.youtube.com/watch?v=t4eLSS2vh-w&t=22',
              },
              {
                '@type': 'Clip',
                name: 'Какие бывают индикаторы',
                startOffset: 96,
                endOffset: 129,
                url: 'https://www.youtube.com/watch?v=t4eLSS2vh-w&t=96',
              },
              {
                '@type': 'Clip',
                name: 'В чем проблема индикаторов',
                startOffset: 129,
                endOffset: 175,
                url: 'https://www.youtube.com/watch?v=t4eLSS2vh-w&t=129',
              },
              {
                '@type': 'Clip',
                name: 'Пример работы индикаторов',
                startOffset: 175,
                endOffset: 285,
                url: 'https://www.youtube.com/watch?v=t4eLSS2vh-w&t=175',
              },
              {
                '@type': 'Clip',
                name: 'Про индикатор ATR',
                startOffset: 285,
                endOffset: 321,
                url: 'https://www.youtube.com/watch?v=t4eLSS2vh-w&t=285',
              },
              {
                '@type': 'Clip',
                name: 'Почему индикаторы запаздывают?',
                startOffset: 321,
                endOffset: 755,
                url: 'https://www.youtube.com/watch?v=t4eLSS2vh-w&t=321',
              },
            ],
          },
        },
      ],
    };

    this.addJsonLdSchema(data);
  }

  // ============================================================
  //  PERSON
  // ============================================================
  private setPersonSchema(): void {
    const data = {
      '@context': 'https://schema.org',
      '@type': 'Person',
      '@id': 'https://arapov.trade/#person',
      name: 'Игорь Арапов',
      url: 'https://arapov.trade/ru',
      image:
        'https://arapov.trade/assets/redesignArapovTrade/img/imageAuthor-light.png',
      sameAs: [
        'https://www.youtube.com/@ArapovTrade',
        'https://t.me/ArapovTrade',
      ],
      jobTitle: 'Профессиональный трейдер',
      description:
        'Активно торгую на финансовых рынках с 2013 года. Автор бесплатного курса по трейдингу.',
    };

    this.addJsonLdSchema(data);
  }

  // ============================================================
  //  FAQ
  // ============================================================
  private setFaqSchema(): void {
    const data = {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'Что такое индикатор RSI и как его использовать?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'RSI (Relative Strength Index) — осциллятор, измеряющий скорость и амплитуду изменения цены. Значения выше 70 указывают на перекупленность актива, ниже 30 — на перепроданность. Трейдеры используют RSI для поиска точек разворота и подтверждения сигналов дивергенции.',
          },
        },
        {
          '@type': 'Question',
          name: 'Как работает индикатор MACD?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'MACD состоит из линии MACD (разница между EMA 12 и EMA 26), сигнальной линии (EMA 9 от линии MACD) и гистограммы. Пересечение линии MACD с сигнальной линией снизу вверх генерирует сигнал на покупку, сверху вниз — на продажу.',
          },
        },
        {
          '@type': 'Question',
          name: 'Какие индикаторы лучше для определения тренда?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Для определения тренда эффективны скользящие средние (SMA, EMA), индекс ADX, Параболик SAR и Ichimoku. Эти индикаторы помогают выявить направление движения цены и оценить силу текущего тренда.',
          },
        },
        {
          '@type': 'Question',
          name: 'Можно ли использовать RSI и MACD одновременно?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Да, комбинация RSI и MACD повышает точность торговых сигналов. RSI выявляет зоны перекупленности и перепроданности, а MACD подтверждает направление тренда. Совпадение сигналов обоих индикаторов увеличивает вероятность успешной сделки.',
          },
        },
        {
          '@type': 'Question',
          name: 'На каких рынках применимы индикаторы RSI и MACD?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'RSI и MACD универсальны и применяются на форекс, фондовом рынке, криптовалютах и сырьевых товарах. Настройки периодов адаптируются под волатильность конкретного рынка и выбранный таймфрейм.',
          },
        },
      ],
    };

    this.addJsonLdSchema(data);
  }

  // ============================================================
  //  HOWTO
  // ============================================================
  private setHowToSchema(): void {
    const data = {
      '@context': 'https://schema.org',
      '@type': 'HowTo',
      name: 'Как торговать с использованием индикаторов RSI и MACD',
      description:
        'Пошаговая инструкция по применению индикаторов RSI и MACD для поиска торговых сигналов',
      step: [
        {
          '@type': 'HowToStep',
          position: 1,
          name: 'Определите состояние рынка',
          text: 'Используйте ADX или скользящие средние для определения наличия тренда. Значение ADX выше 25 указывает на трендовый рынок, ниже 20 — на боковое движение.',
        },
        {
          '@type': 'HowToStep',
          position: 2,
          name: 'Настройте индикаторы',
          text: 'Добавьте RSI с периодом 14 и MACD со стандартными настройками (12, 26, 9) на график. Адаптируйте периоды под выбранный таймфрейм.',
        },
        {
          '@type': 'HowToStep',
          position: 3,
          name: 'Найдите сигнал RSI',
          text: 'Дождитесь выхода RSI из зоны перекупленности (ниже 70) или перепроданности (выше 30). Проверьте наличие дивергенции между ценой и индикатором.',
        },
        {
          '@type': 'HowToStep',
          position: 4,
          name: 'Подтвердите сигнал MACD',
          text: 'Убедитесь, что MACD подтверждает направление: пересечение линий должно совпадать с сигналом RSI. Растущая гистограмма усиливает надёжность сигнала.',
        },
        {
          '@type': 'HowToStep',
          position: 5,
          name: 'Установите уровни риска',
          text: 'Разместите стоп-лосс за ближайшим уровнем поддержки или сопротивления. Рассчитайте тейк-профит с соотношением риска к прибыли не менее 1:2.',
        },
      ],
    };

    this.addJsonLdSchema(data);
  }

  // ============================================================
  //  GLOSSARY
  // ============================================================
  private setGlossarySchema(): void {
    const data = {
      '@context': 'https://schema.org',
      '@type': 'DefinedTermSet',
      name: 'Термины индикаторов технического анализа',
      description:
        'Глоссарий ключевых терминов, связанных с торговыми индикаторами',
      hasDefinedTerm: [
        {
          '@type': 'DefinedTerm',
          name: 'RSI',
          description:
            'Индекс относительной силы — осциллятор, измеряющий скорость изменения цены в диапазоне от 0 до 100',
        },
        {
          '@type': 'DefinedTerm',
          name: 'MACD',
          description:
            'Схождение/расхождение скользящих средних — индикатор, отображающий взаимосвязь между двумя EMA',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Осциллятор',
          description:
            'Тип индикатора, колеблющийся между фиксированными значениями для определения перекупленности и перепроданности',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Дивергенция',
          description:
            'Расхождение между направлением движения цены и показаниями индикатора, сигнализирующее о возможном развороте',
        },
        {
          '@type': 'DefinedTerm',
          name: 'EMA',
          description:
            'Экспоненциальная скользящая средняя, придающая больший вес последним ценовым данным',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Перекупленность',
          description:
            'Состояние рынка, при котором актив торгуется выше справедливой стоимости и вероятна коррекция вниз',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Перепроданность',
          description:
            'Состояние рынка, при котором актив торгуется ниже справедливой стоимости и вероятен отскок вверх',
        },
        {
          '@type': 'DefinedTerm',
          name: 'ATR',
          description:
            'Средний истинный диапазон — индикатор волатильности, измеряющий среднюю амплитуду ценовых колебаний',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Bollinger Bands',
          description:
            'Полосы Боллинджера — индикатор волатильности из трёх линий, формирующих динамический канал вокруг цены',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Сигнальная линия',
          description:
            'В контексте MACD — скользящая средняя от линии MACD, используемая для генерации торговых сигналов',
        },
      ],
    };

    this.addJsonLdSchema(data);
  }
}
