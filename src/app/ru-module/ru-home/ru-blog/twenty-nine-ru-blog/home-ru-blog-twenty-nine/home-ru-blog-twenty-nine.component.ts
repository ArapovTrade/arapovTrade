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
  selector: 'app-home-ru-blog-twenty-nine',
  templateUrl: './home-ru-blog-twenty-nine.component.html',
  styleUrl: './home-ru-blog-twenty-nine.component.scss',
})
export class HomeRuBlogTwentyNineComponent implements OnInit {
  constructor(
    private meta: Meta,
    private titleService: Title,
    private cdr: ChangeDetectorRef,
    private router: Router,
    private themeService: ThemeservService,
    private artickleServ: ArticlesService,
    private renderer: Renderer2,
    @Inject(DOCUMENT) private document: Document,
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
      'Трейдинг для начинающих: полное руководство 2025 | Arapov.trade',
    );

    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.updateTag({
      name: 'description',
      content:
        'Полное руководство по трейдингу для начинающих в 2025 году. Узнайте как выбрать рынок, освоить технический анализ, разработать стратегию и начать торговать с нуля.',
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
        () => Math.random() - 0.5,
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
      a.titleUkr.toLowerCase().includes(this.searchQuery.toLowerCase()),
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
      (a) => a.linkUkr == path,
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
      (a) => a.linkUkr == path,
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
      'script[type="application/ld+json"]',
    );

    scripts.forEach((script) => {
      try {
        const json = JSON.parse(script.textContent || '{}');

        // Массив, объект-граф или одиночный объект
        const candidates =
          json['@graph'] ?? (Array.isArray(json) ? json : [json]);

        const shouldRemove = candidates.some(
          (entry: any) =>
            entry['@type'] && typesToRemove.includes(entry['@type']),
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
          headline:
            'Трейдинг для начинающих: полное руководство как начать торговать в 2025',
          description:
            'Полное руководство по трейдингу для начинающих. Узнайте как выбрать рынок, освоить технический анализ, разработать стратегию и начать торговать с нуля.',
          image:
            'https://arapov.trade/assets/img/content/tradingquickstart1.webp',
          datePublished: '2025-04-15T00:00:00Z',
          dateModified: '2025-12-29T00:00:00Z',
          author: {
            '@id': 'https://arapov.trade/ru#person',
          },
          publisher: {
            '@type': 'Organization',
            name: 'Arapov.trade',
            url: 'https://arapov.trade',
            logo: {
              '@type': 'ImageObject',
              url: 'https://arapov.trade/assets/img/favicon.ico',
            },
          },
          mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': 'https://arapov.trade/ru/freestudying/tradingquickstart',
          },
          articleSection: 'Обучение трейдингу',
          keywords: [
            'трейдинг для начинающих',
            'как начать торговать',
            'технический анализ',
            'торговые стратегии',
            'управление капиталом',
            'демо-счёт',
          ],
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
      '@id': 'https://arapov.trade/ru#person',
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
          name: 'Сколько денег нужно для начала трейдинга?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Начать трейдинг можно с минимальной суммы от 10-50 долларов на криптовалютных биржах или от 100-200 долларов на Форекс. Однако для комфортной торговли с соблюдением правил управления рисками рекомендуется стартовый капитал от 500-1000 долларов. Важнее не размер депозита, а умение им управлять.',
          },
        },
        {
          '@type': 'Question',
          name: 'Можно ли заработать на трейдинге без опыта?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Трейдинг без подготовки почти гарантированно приведёт к потерям. Необходимо сначала изучить основы технического анализа, протестировать стратегии на демо-счёте и освоить управление рисками. Статистика показывает, что 70-90% новичков теряют деньги именно из-за отсутствия системного подхода к обучению.',
          },
        },
        {
          '@type': 'Question',
          name: 'Какой рынок лучше выбрать новичку?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Для новичков оптимален фондовый рынок благодаря его стабильности и предсказуемости. Криптовалютный рынок подходит тем, кто готов к высокой волатильности и круглосуточной торговле. Форекс привлекает низким порогом входа и высокой ликвидностью. Выбор зависит от ваших целей, графика и отношения к риску.',
          },
        },
        {
          '@type': 'Question',
          name: 'Сколько времени занимает обучение трейдингу?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Базовое понимание рынка можно получить за 2-3 месяца активного обучения. Для формирования устойчивых навыков и прибыльной торговли требуется от 6 месяцев до 2 лет практики. Профессиональный уровень достигается через 3-5 лет постоянного совершенствования и анализа своих результатов.',
          },
        },
        {
          '@type': 'Question',
          name: 'Что такое демо-счёт и зачем он нужен?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Демо-счёт — это тренировочный счёт с виртуальными деньгами, который полностью имитирует реальную торговлю. Он позволяет изучить платформу, протестировать стратегии и набраться опыта без риска потери реальных средств. Рекомендуется провести на демо-счёте минимум 2-3 месяца до перехода к реальной торговле.',
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
      name: 'Как начать торговать на финансовых рынках',
      description:
        'Пошаговое руководство для начинающих трейдеров: от выбора рынка до первых реальных сделок',
      totalTime: 'P3M',
      estimatedCost: {
        '@type': 'MonetaryAmount',
        currency: 'USD',
        value: '100-500',
      },
      step: [
        {
          '@type': 'HowToStep',
          position: 1,
          name: 'Выберите подходящий рынок',
          text: 'Определите, какой рынок соответствует вашим целям: фондовый рынок для стабильности, криптовалюты для высокой волатильности или Форекс для круглосуточной торговли валютными парами.',
          url: 'https://arapov.trade/ru/freestudying/tradingquickstart#market-selection',
        },
        {
          '@type': 'HowToStep',
          position: 2,
          name: 'Изучите базовую терминологию и анализ',
          text: 'Освойте ключевые понятия: ликвидность, волатильность, спред, леверидж. Изучите основы технического анализа — уровни поддержки и сопротивления, тренды, базовые индикаторы RSI, MACD, скользящие средние.',
          url: 'https://arapov.trade/ru/freestudying/tradingquickstart#fundamental-knowledge',
        },
        {
          '@type': 'HowToStep',
          position: 3,
          name: 'Откройте демо-счёт и практикуйтесь',
          text: 'Зарегистрируйтесь у надёжного брокера и откройте демо-счёт. Тестируйте простые стратегии без риска потери реальных денег минимум 2-3 месяца. Ведите дневник сделок для анализа результатов.',
          url: 'https://arapov.trade/ru/freestudying/tradingquickstart#demo-account',
        },
        {
          '@type': 'HowToStep',
          position: 4,
          name: 'Разработайте торговую стратегию',
          text: 'Создайте собственный торговый план с чёткими правилами входа и выхода. Определите размер риска на сделку (не более 1-2% от депозита), установите стоп-лоссы и тейк-профиты для каждой позиции.',
          url: 'https://arapov.trade/ru/freestudying/tradingquickstart#strategy-development',
        },
        {
          '@type': 'HowToStep',
          position: 5,
          name: 'Переходите к реальной торговле',
          text: 'После стабильных результатов на демо-счёте откройте реальный счёт с минимальным депозитом. Торгуйте теми же стратегиями, строго соблюдая правила управления капиталом. Регулярно анализируйте сделки и совершенствуйте подход.',
          url: 'https://arapov.trade/ru/freestudying/tradingquickstart#real-trading',
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
      name: 'Глоссарий трейдинга для начинающих',
      description:
        'Основные термины и понятия, которые должен знать каждый начинающий трейдер',
      hasDefinedTerm: [
        {
          '@type': 'DefinedTerm',
          name: 'Трейдинг',
          description:
            'Процесс активной торговли на финансовых рынках с целью получения прибыли от краткосрочных и среднесрочных изменений цен на активы.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Ликвидность',
          description:
            'Способность актива быстро продаваться или покупаться по рыночной цене без существенного влияния на его стоимость.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Волатильность',
          description:
            'Степень изменчивости цены актива за определённый период времени. Высокая волатильность означает большие ценовые колебания.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Спред',
          description:
            'Разница между ценой покупки (Ask) и ценой продажи (Bid) актива. Фактически это комиссия, которую трейдер платит при открытии позиции.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Леверидж',
          description:
            'Кредитное плечо, позволяющее торговать суммами, превышающими собственный капитал трейдера. Увеличивает как потенциальную прибыль, так и риски.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Стоп-лосс',
          description:
            'Защитный ордер, автоматически закрывающий позицию при достижении ценой заданного уровня убытка. Инструмент управления рисками.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Технический анализ',
          description:
            'Метод прогнозирования движения цен на основе изучения графиков, ценовых паттернов и технических индикаторов.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Свинг-трейдинг',
          description:
            'Стиль торговли, при котором позиции удерживаются от нескольких дней до нескольких недель для извлечения прибыли из среднесрочных ценовых движений.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Скальпинг',
          description:
            'Стратегия краткосрочной торговли с множеством быстрых сделок, направленная на получение небольшой прибыли от минимальных ценовых движений.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Демо-счёт',
          description:
            'Учебный торговый счёт с виртуальными средствами, позволяющий практиковаться в торговле без риска потери реальных денег.',
        },
      ],
    };

    this.addJsonLdSchema(data);
  }
}
