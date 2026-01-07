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
  selector: 'app-home-ru-blog-twenty-three',
  templateUrl: './home-ru-blog-twenty-three.component.html',
  styleUrl: './home-ru-blog-twenty-three.component.scss',
})
export class HomeRuBlogTwentyThreeComponent implements OnInit {
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
    this.titleService.setTitle('Bitcoin-ETF: что это такое и как работает');
    this.meta.updateTag({ name: 'robots', content: 'index' });
    this.meta.updateTag({
      name: 'description',
      content:
        'Полное руководство по Bitcoin-ETF. Узнайте, как работают биржевые фонды на биткоин, их преимущества, риски и влияние на криптовалютный рынок.',
    });

    this.meta.updateTag({ name: 'datePublished', content: '2025-01-21' });
    this.meta.updateTag({
      property: 'og:image',
      content: '/assets/img/content/bitcoinetf.webp',
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
          headline: 'Bitcoin-ETF: что это такое и как работает',
          description:
            'Полное руководство по Bitcoin-ETF. Узнайте, как работают биржевые фонды на биткоин, их преимущества, риски и влияние на криптовалютный рынок.',
          author: {
            '@id': 'https://arapov.trade/ru#person',
          },
          publisher: {
            '@type': 'Organization',
            name: 'ArapovTrade',
            url: 'https://arapov.trade',
          },
          datePublished: '2025-04-15T00:00:00Z',
          dateModified: '2025-11-29T00:00:00Z',
          mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': 'https://arapov.trade/ru/freestudying/bitcoinetf',
          },
          image: {
            '@type': 'ImageObject',
            url: 'https://arapov.trade/assets/img/content/bitcoinetf1.webp',
          },
          articleSection: 'Криптовалюты',
          keywords: [
            'Bitcoin ETF',
            'биткоин ETF',
            'биржевой фонд',
            'инвестиции в биткоин',
            'SEC',
            'криптовалюты',
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
          name: 'Что такое Bitcoin-ETF?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Bitcoin-ETF — это биржевой инвестиционный фонд, торгующийся на традиционных биржах и позволяющий инвестировать в биткоин без прямой покупки криптовалюты. Фонд отслеживает цену биткоина через владение реальными монетами или фьючерсными контрактами.',
          },
        },
        {
          '@type': 'Question',
          name: 'Чем Bitcoin-ETF отличается от покупки биткоина?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'При покупке ETF вы владеете долей фонда, а не самими биткоинами. Это избавляет от необходимости управлять криптокошельком, но исключает возможность использовать монеты в DeFi или для переводов.',
          },
        },
        {
          '@type': 'Question',
          name: 'Какие типы Bitcoin-ETF существуют?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Существуют спотовые ETF (фонд владеет реальными биткоинами) и фьючерсные ETF (фонд использует фьючерсные контракты). Спотовые точнее отражают цену биткоина, фьючерсные могут иметь отклонения.',
          },
        },
        {
          '@type': 'Question',
          name: 'Почему Bitcoin-ETF важен для рынка?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Bitcoin-ETF открывает доступ к криптовалютам для институциональных инвесторов, повышает ликвидность рынка, создаёт регуляторную прозрачность и способствует интеграции биткоина в традиционную финансовую систему.',
          },
        },
        {
          '@type': 'Question',
          name: 'Какие риски у инвестиций в Bitcoin-ETF?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Основные риски: комиссии фонда снижают доходность, отсутствие владения реальными биткоинами, зависимость от решений регуляторов, волатильность базового актива, возможные отклонения цены у фьючерсных ETF.',
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
      name: 'Как инвестировать в Bitcoin-ETF',
      step: [
        {
          '@type': 'HowToStep',
          position: 1,
          name: 'Изучите доступные фонды',
          text: 'Сравните комиссии, ликвидность, репутацию управляющей компании и тип привязки к биткоину (спотовый или фьючерсный).',
        },
        {
          '@type': 'HowToStep',
          position: 2,
          name: 'Выберите брокера',
          text: 'Используйте надёжного брокера с доступом к биржам NYSE или Nasdaq, где торгуются Bitcoin-ETF.',
        },
        {
          '@type': 'HowToStep',
          position: 3,
          name: 'Откройте брокерский счёт',
          text: 'Пройдите верификацию и пополните счёт. Для покупки ETF не требуется аккаунт на криптобирже.',
        },
        {
          '@type': 'HowToStep',
          position: 4,
          name: 'Определите размер инвестиции',
          text: 'Решите, какую долю портфеля выделить под Bitcoin-ETF. Учитывайте волатильность криптовалют.',
        },
        {
          '@type': 'HowToStep',
          position: 5,
          name: 'Совершите покупку',
          text: 'Купите ETF как обычную акцию через торговый терминал брокера. Следите за динамикой и ребалансируйте портфель.',
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
      name: 'Термины Bitcoin-ETF',
      hasDefinedTerm: [
        {
          '@type': 'DefinedTerm',
          name: 'Bitcoin-ETF',
          description:
            'Биржевой инвестиционный фонд, отслеживающий цену биткоина',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Спотовый ETF',
          description: 'Фонд, владеющий реальными биткоинами в резерве',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Фьючерсный ETF',
          description:
            'Фонд, использующий фьючерсные контракты для отслеживания цены',
        },
        {
          '@type': 'DefinedTerm',
          name: 'SEC',
          description:
            'Комиссия по ценным бумагам и биржам США, регулятор рынка',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Tracking error',
          description: 'Отклонение цены ETF от цены базового актива',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Комиссия за управление',
          description: 'Годовая плата фонду за управление активами',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Институциональные инвесторы',
          description: 'Крупные инвесторы: пенсионные фонды, хедж-фонды, банки',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Ликвидность',
          description:
            'Способность быстро купить или продать актив без значительного влияния на цену',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Криптовалютный кошелёк',
          description: 'Программа или устройство для хранения криптовалют',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Приватный ключ',
          description: 'Секретный код для доступа к криптовалютным активам',
        },
      ],
    };

    this.addJsonLdSchema(data);
  }
}
