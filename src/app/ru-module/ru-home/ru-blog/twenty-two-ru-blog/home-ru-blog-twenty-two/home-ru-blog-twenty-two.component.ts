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
  selector: 'app-home-ru-blog-twenty-two',
  templateUrl: './home-ru-blog-twenty-two.component.html',
  styleUrl: './home-ru-blog-twenty-two.component.scss',
})
export class HomeRuBlogTwentyTwoComponent implements OnInit {
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
      'Арбитраж криптовалют: что это и как заработать | Arapov.trade'
    );
    this.meta.updateTag({ name: 'robots', content: 'index' });
    this.meta.updateTag({
      name: 'description',
      content:
        'Арбитраж криптовалют: полное руководство по заработку на разнице цен между биржами. Виды арбитража, стратегии, риски и практические примеры.',
    });

    this.meta.updateTag({ name: 'datePublished', content: '2025-01-21' });
    this.meta.updateTag({
      property: 'og:image',
      content: '/assets/img/content/cryptoarbitrage.webp',
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
          headline: 'Арбитраж криптовалют: что это и как заработать',
          description:
            'Полное руководство по криптовалютному арбитражу: виды, стратегии, риски и практические примеры',
          author: {
            '@id': 'https://arapov.trade/ru#person',
          },
          publisher: {
            '@type': 'Organization',
            name: 'Arapov.trade',
            logo: {
              '@type': 'ImageObject',
              url: 'https://arapov.trade/assets/img/favicon.ico',
            },
          },
          datePublished: '2025-04-15T00:00:00Z',
          dateModified: '2025-12-19T00:00:00Z',
          mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': 'https://arapov.trade/ru/freestudying/cryptoarbitrage',
          },
          image:
            'https://arapov.trade/assets/img/content/cryptoarbitrage1.webp',
          articleSection: 'Обучение трейдингу',
          keywords:
            'арбитраж криптовалют, криптоарбитраж, межбиржевой арбитраж, треугольный арбитраж, заработок на криптовалюте',
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
          name: 'Что такое арбитраж криптовалют?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Арбитраж криптовалют — это стратегия заработка на разнице цен одного и того же актива на разных биржах. Трейдер покупает криптовалюту на площадке с низкой ценой и продаёт на бирже с более высокой, получая прибыль за вычетом комиссий.',
          },
        },
        {
          '@type': 'Question',
          name: 'Какие виды криптоарбитража существуют?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Основные виды: межбиржевой арбитраж (покупка и продажа на разных биржах), треугольный арбитраж (обмен через три валюты на одной бирже), межрыночный арбитраж (спот и фьючерсы), региональный арбитраж (использование разницы цен в разных странах).',
          },
        },
        {
          '@type': 'Question',
          name: 'Сколько можно заработать на арбитраже?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Доходность зависит от объёма капитала, частоты сделок и размера ценовых расхождений. Типичная прибыль составляет 0.5-3% на сделку. При активной торговле и большом капитале месячная доходность может достигать 5-15%.',
          },
        },
        {
          '@type': 'Question',
          name: 'Какие риски связаны с криптоарбитражем?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Основные риски: задержки транзакций, высокие комиссии, волатильность цен, блокировка аккаунтов биржами, технические сбои платформ и регуляторные ограничения в некоторых странах.',
          },
        },
        {
          '@type': 'Question',
          name: 'Нужны ли боты для арбитража?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Боты значительно повышают эффективность, автоматизируя поиск возможностей и исполнение сделок. Однако начинающим рекомендуется сначала освоить ручной арбитраж для понимания механики процесса.',
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
      name: 'Как начать зарабатывать на арбитраже криптовалют',
      description: 'Пошаговое руководство по криптовалютному арбитражу',
      step: [
        {
          '@type': 'HowToStep',
          position: 1,
          name: 'Зарегистрируйтесь на биржах',
          text: 'Создайте аккаунты на нескольких надёжных биржах и пройдите верификацию. Рекомендуется использовать минимум 3-5 платформ для поиска возможностей.',
        },
        {
          '@type': 'HowToStep',
          position: 2,
          name: 'Пополните счета',
          text: 'Распределите капитал между биржами. Держите средства в стейблкоинах (USDT, USDC) для быстрого реагирования на возможности.',
        },
        {
          '@type': 'HowToStep',
          position: 3,
          name: 'Настройте мониторинг цен',
          text: 'Используйте инструменты отслеживания цен (CoinGecko, CoinMarketCap) или специализированные арбитражные сканеры для поиска расхождений.',
        },
        {
          '@type': 'HowToStep',
          position: 4,
          name: 'Рассчитайте комиссии',
          text: 'Учтите все затраты: комиссии за торговлю, ввод и вывод средств, сетевые сборы. Убедитесь, что прибыль превышает расходы.',
        },
        {
          '@type': 'HowToStep',
          position: 5,
          name: 'Выполните сделку',
          text: 'При обнаружении выгодной возможности быстро купите актив на одной бирже и продайте на другой. Скорость критически важна.',
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
      name: 'Глоссарий криптовалютного арбитража',
      hasDefinedTerm: [
        {
          '@type': 'DefinedTerm',
          name: 'Арбитраж',
          description:
            'Стратегия заработка на разнице цен одного актива на разных рынках',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Межбиржевой арбитраж',
          description:
            'Покупка криптовалюты на одной бирже и продажа на другой с более высокой ценой',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Треугольный арбитраж',
          description:
            'Последовательный обмен трёх валют на одной бирже для извлечения прибыли из курсовых несоответствий',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Спред',
          description: 'Разница между ценой покупки и продажи актива',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Ликвидность',
          description:
            'Способность быстро купить или продать актив без существенного влияния на цену',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Стейблкоин',
          description:
            'Криптовалюта с привязкой курса к стабильному активу (доллару, евро)',
        },
        {
          '@type': 'DefinedTerm',
          name: 'DEX',
          description:
            'Децентрализованная биржа без посредников и центрального управления',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Арбитражный бот',
          description:
            'Программа для автоматического поиска и исполнения арбитражных сделок',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Слиппедж',
          description:
            'Разница между ожидаемой и фактической ценой исполнения ордера',
        },
        {
          '@type': 'DefinedTerm',
          name: 'P2P-арбитраж',
          description:
            'Арбитраж с использованием peer-to-peer платформ для покупки и продажи криптовалюты',
        },
      ],
    };

    this.addJsonLdSchema(data);
  }
}
