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
  selector: 'app-home-ru-blog-fifty',
  templateUrl: './home-ru-blog-fifty.component.html',
  styleUrl: './home-ru-blog-fifty.component.scss',
})
export class HomeRuBlogFiftyComponent implements OnInit {
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

    this.titleService.setTitle('Алгоритмические ордера на бирже | ArapovTrade');
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.updateTag({
      name: 'description',
      content:
        'Полное руководство по алгоритмическим ордерам. VWAP, TWAP, Iceberg, Trailing Stop и другие типы автоматизированных заявок для эффективной торговли.',
    });

    this.meta.updateTag({ name: 'datePublished', content: '2025-03-26' });
    this.meta.updateTag({
      property: 'og:image',
      content: '/assets/img/content/algorithmicorders.webp',
    });
    this.gerRandom();
  }
  randomArticleRus: any = [];
  gerRandom() {
    this.randomArticleRus = this.artickleServ.getRandomUkArticles();
  }

  hoveredIndex: number | null = null;

  projects = [
    { title: 'Книги по трейдингу', link: 'https://arapov.trade/ru/books' },
    {
      title: 'Профессиональные курсы',
      link: 'https://arapov.trade/ru/studying',
    },
    {
      title: 'Базовый курс',
      link: 'https://arapov.trade/ru/freestudying/freeeducation',
    },
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
          headline: 'Алгоритмические ордера на бирже: полное руководство',
          description:
            'Подробное руководство по алгоритмическим ордерам на бирже. Типы алгоритмических ордеров, стратегии исполнения, управление рисками и автоматизация торговли.',
          author: {
            '@id': 'https://arapov.trade/ru#person',
          },
          publisher: {
            '@type': 'Organization',
            name: 'ArapovTrade',
            url: 'https://arapov.trade',
            logo: {
              '@type': 'ImageObject',
              url: 'https://arapov.trade/assets/img/favicon.ico',
            },
          },
          datePublished: '2026-03-25T00:00:00Z',
          dateModified: '2026-03-31T00:00:00Z',
          mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': 'https://arapov.trade/ru/freestudying/algorithmicorders', // ← уточни URL
          },
          image: {
            '@type': 'ImageObject',
            url: 'https://arapov.trade/assets/img/content/algorithmicorders.webp', // ← уточни путь
            width: 1200,
            height: 630,
          },
          articleSection: 'Технический анализ',
          keywords:
            'алгоритмические ордера, алго-трейдинг, биржевые ордера, автоматическая торговля, TWAP, VWAP, исполнение ордеров',
          inLanguage: 'ru',
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
      alternateName: [
        'Igor Arapov',
        'Арапов Игорь',
        'I. Arapov',
        'Ігор Арапов',
        'І. В. Арапов',
        'Арапов Ігор',
        'Arapov Igor',
      ],
      url: 'https://arapov.trade/ru',
      image:
        'https://arapov.trade/assets/redesignArapovTrade/img/imageAuthor-light.png',
      sameAs: [
        'https://www.wikidata.org/wiki/Q137454477',
        'https://scholar.google.com/citations?user=N440tWQAAAAJ',
        'https://orcid.org/0009-0003-0430-778X',
        'https://isni.org/isni/0000000529518564',
        'https://www.amazon.com/stores/author/B0GBRFY457',
        'https://github.com/ArapovTrade',
        'https://ua.linkedin.com/in/arapovtrade',
        'https://www.youtube.com/@ArapovTrade',
        'https://t.me/ArapovTrade',
      ],
      jobTitle: [
        'Независимый исследователь',
        'трейдер',
        'автор и основатель arapov.trade',
      ],
      description:
        'Независимый исследователь, практикующий трейдер, автор книг по трейдингу и научных публикаций. Специализируется на психологии трейдинга и когнитивных искажениях на финансовых рынках.',
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
          name: 'Что такое алгоритмические ордера?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Алгоритмические ордера — это автоматизированные заявки на покупку или продажу активов, выполняемые с помощью программных алгоритмов для оптимизации торговли.',
          },
        },
        {
          '@type': 'Question',
          name: 'Какие типы алгоритмических ордеров существуют?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Основные типы: VWAP, TWAP, Iceberg Order, Trailing Stop, Pegged Orders, Sniper Orders и условные рыночные ордера.',
          },
        },
        {
          '@type': 'Question',
          name: 'Что такое VWAP?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'VWAP (Volume-Weighted Average Price) — алгоритм, исполняющий ордер по взвешенной средней цене с учетом объема торгов.',
          },
        },
        {
          '@type': 'Question',
          name: 'Что такое спуфинг?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Спуфинг — запрещенная манипуляция, при которой размещаются фиктивные ордера для создания ложного впечатления о спросе или предложении.',
          },
        },
        {
          '@type': 'Question',
          name: 'Кто может использовать алгоритмические ордера?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Алгоритмические ордера доступны институциональным инвесторам, HFT-компаниям, проприетарным трейдерам и розничным трейдерам через современные платформы.',
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
      name: 'Как начать использовать алгоритмические ордера',
      step: [
        {
          '@type': 'HowToStep',
          position: 1,
          name: 'Изучите типы ордеров',
          text: 'Ознакомьтесь с VWAP, TWAP, Iceberg и другими типами алгоритмических заявок.',
        },
        {
          '@type': 'HowToStep',
          position: 2,
          name: 'Выберите платформу',
          text: 'Выберите подходящую платформу: MetaTrader, TradingView, API криптобирж.',
        },
        {
          '@type': 'HowToStep',
          position: 3,
          name: 'Протестируйте на демо',
          text: 'Тестируйте стратегии на демо-счете перед реальной торговлей.',
        },
        {
          '@type': 'HowToStep',
          position: 4,
          name: 'Настройте риск-менеджмент',
          text: 'Установите Stop-Loss и Trailing Stop для защиты капитала.',
        },
        {
          '@type': 'HowToStep',
          position: 5,
          name: 'Запустите в реальном времени',
          text: 'Начните с небольших объемов и постепенно масштабируйте стратегию.',
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
      hasDefinedTerm: [
        {
          '@type': 'DefinedTerm',
          name: 'Алгоритмический ордер',
          description:
            'Автоматизированная заявка, исполняемая по заданным правилам',
        },
        {
          '@type': 'DefinedTerm',
          name: 'VWAP',
          description:
            'Volume-Weighted Average Price — взвешенная по объему средняя цена',
        },
        {
          '@type': 'DefinedTerm',
          name: 'TWAP',
          description:
            'Time-Weighted Average Price — взвешенная по времени средняя цена',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Iceberg Order',
          description: 'Ордер со скрытым объемом для крупных сделок',
        },
        {
          '@type': 'DefinedTerm',
          name: 'HFT',
          description: 'High-Frequency Trading — высокочастотная торговля',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Trailing Stop',
          description: 'Динамический стоп-лосс, следующий за ценой',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Спуфинг',
          description: 'Запрещенная манипуляция с фиктивными ордерами',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Pegged Order',
          description: 'Ордер, привязанный к лучшей цене bid/ask',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Проскальзывание',
          description: 'Разница между ожидаемой и фактической ценой исполнения',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Co-Location',
          description: 'Размещение серверов вблизи биржевых дата-центров',
        },
      ],
    };

    this.addJsonLdSchema(data);
  }
}
