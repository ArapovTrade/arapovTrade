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
  selector: 'app-home-eu-blog-fifty-five',
  templateUrl: './home-eu-blog-fifty-five.component.html',
  styleUrl: './home-eu-blog-fifty-five.component.scss',
})
export class HomeEuBlogFiftyFiveComponent implements OnInit {
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
    this.ukrGroups = this.artickleServ.getEnglishGroups();
    this.grr = this.artickleServ.selectedGroups;
    this.updateArticleCounts();
    this.checkedGroup = this.artickleServ.selectedGroups;

    this.titleService.setTitle(
      'Scalping in Trading: Complete Guide | ArapovTrade',
    );
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.updateTag({
      name: 'description',
      content:
        'Scalping in trading: strategies, tools, and risk management. A complete guide for beginner traders on short-term trading in Forex, cryptocurrencies, and stock markets.',
    });
    this.meta.updateTag({ name: 'datePublished', content: '2025-04-04' });
    this.meta.updateTag({
      property: 'og:image',
      content: '/assets/img/content/scalpingintrading.webp',
    });
    this.gerRandom();
  }
  randomArticleRus: any = [];
  gerRandom() {
    this.randomArticleRus = this.artickleServ.getRandomUkArticles();
  }
  hoveredIndex: number | null = null;
  projects = [
    { title: 'Trading Books', link: 'https://arapov.trade/en/books' },
    { title: 'Professional courses', link: 'https://arapov.trade/en/studying' },
    {
      title: 'Basic course',
      link: 'https://arapov.trade/en/freestudying/freeeducation',
    },
  ];
  onGroupChange(event: Event) {
    const checkbox = event.target as HTMLInputElement;
    const value = checkbox.value;
    this.router.navigate(['/en/freestudying'], {
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
      article.groupsEng.forEach((group) => {
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
    this.router.navigate(['/en/freestudying', nextpage]);
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
    this.router.navigate(['/en/freestudying', nextpage]);
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
          '@id':
            'https://arapov.trade/en/freestudying/scalpingintrading#article',
          headline: 'Scalping in Trading: Complete Guide for Beginners',
          description:
            'Scalping in trading: strategies, tools, and risk management. A complete guide for beginner traders on short-term trading.',
          image:
            'https://arapov.trade/assets/img/content/scalpingintrading.webp',
          datePublished: '2026-03-15T00:00:00Z',
          dateModified: '2026-03-22T00:00:00Z',
          author: {
            '@id': 'https://arapov.trade/en#person',
          },
          publisher: {
            '@type': 'Organization',
            '@id': 'https://arapov.trade/#organization',
            name: 'ArapovTrade',
            url: 'https://arapov.trade',
            logo: {
              '@type': 'ImageObject',
              url: 'https://arapov.trade/assets/img/favicon.ico',
            },
          },
          mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': 'https://arapov.trade/en/freestudying/scalpingintrading',
          },
          articleSection: 'Trading',
          keywords: [
            'scalping',
            'scalping strategies',
            'day trading',
            'short-term trading',
            'risk management',
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
      '@id': 'https://arapov.trade/en#person',
      name: 'Igor Arapov',
      alternateName: [
        'Ігор Арапов',
        'Арапов Игорь',
        'I. Arapov',
        'Игорь Арапов',
        'І. В. Арапов',
        'Арапов Ігор',
        'Arapov Igor',
      ],

      url: 'https://arapov.trade/en',
      image:
        'https://arapov.trade/assets/redesignArapovTrade/img/imageAuthor-light.png',
      sameAs: [
        'https://www.youtube.com/@ArapovTrade',
        'https://t.me/ArapovTrade',
      ],
      jobTitle: 'Professional trader',
      description:
        'I have been actively trading on financial markets since 2013. Author of a free trading course.',
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
      '@id': 'https://arapov.trade/en/freestudying/scalpingintrading#faq',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'What is scalping in trading?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Scalping is a short-term trading strategy where traders execute numerous trades throughout the day, profiting from minimal price movements. Positions are held from a few seconds to several minutes.',
          },
        },
        {
          '@type': 'Question',
          name: 'What timeframes do scalpers use?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Scalpers work on short timeframes: M1 (1 minute) for quick analysis, M5 (5 minutes) for trend confirmation, and M15 (15 minutes) for filtering false signals and broader market overview.',
          },
        },
        {
          '@type': 'Question',
          name: 'How much capital is needed for scalping?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Minimum capital depends on the market and broker. In Forex, you can start with $500-1000 thanks to leverage. More important than the amount is proper risk management — risk per trade should not exceed 1-2% of the deposit.',
          },
        },
        {
          '@type': 'Question',
          name: 'What indicators are best for scalping?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Popular scalping indicators include: Moving Averages (MA) for trend identification, Bollinger Bands for volatility detection, RSI for overbought/oversold conditions, and MACD for entry and exit signal confirmation.',
          },
        },
        {
          '@type': 'Question',
          name: 'Is scalping suitable for beginners?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Scalping requires high concentration, quick reactions, and emotional stability. Beginners should first master basic trading principles, practice on a demo account, and develop a clear trading system before transitioning to real trading.',
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
      '@id': 'https://arapov.trade/en/freestudying/scalpingintrading#howto',
      name: 'How to Start Scalping: Step-by-Step Guide',
      description:
        'A step-by-step guide for beginner scalpers on mastering short-term trading in financial markets.',
      totalTime: 'P30D',
      estimatedCost: {
        '@type': 'MonetaryAmount',
        currency: 'USD',
        value: '500',
      },
      step: [
        {
          '@type': 'HowToStep',
          position: 1,
          name: 'Choose a market and broker',
          text: 'Decide on your market (Forex, cryptocurrencies, stocks) and select a reliable broker with low spreads, fast order execution, and ECN account support.',
        },
        {
          '@type': 'HowToStep',
          position: 2,
          name: 'Master the trading platform',
          text: 'Learn the trading platform functionality (MetaTrader 4/5, cTrader). Set up charts, indicators, and hotkeys for quick position opening and closing.',
        },
        {
          '@type': 'HowToStep',
          position: 3,
          name: 'Develop a trading strategy',
          text: 'Choose and test a scalping strategy: trend-following, support/resistance levels, or news-based trading. Define clear entry and exit rules.',
        },
        {
          '@type': 'HowToStep',
          position: 4,
          name: 'Practice on a demo account',
          text: 'Practice your strategy on a demo account for at least 2-4 weeks. Analyze results, keep a trading journal, and adjust your approach.',
        },
        {
          '@type': 'HowToStep',
          position: 5,
          name: 'Transition to live trading',
          text: 'Start trading real money with minimum lot sizes. Follow risk management: stop-loss on every trade, no more than 1-2% risk per trade, daily loss limits.',
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
      '@id': 'https://arapov.trade/en/freestudying/scalpingintrading#glossary',
      name: 'Scalping Terminology Glossary',
      description: 'Key terms and concepts used in scalping trading',
      hasDefinedTerm: [
        {
          '@type': 'DefinedTerm',
          name: 'Scalping',
          description:
            'A short-term trading strategy with numerous daily trades aimed at profiting from minimal price movements.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Spread',
          description:
            'The difference between the buy (Ask) and sell (Bid) price of a financial instrument. Low spreads are critical for profitable scalping.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Timeframe',
          description:
            'The time interval for price chart display. Scalpers use short timeframes: M1, M5, M15.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Stop-loss',
          description:
            'A protective order for automatically closing a losing position when a specific price level is reached.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Leverage',
          description:
            "A mechanism allowing trading with amounts exceeding one's own capital. Increases both potential profit and risks.",
        },
        {
          '@type': 'DefinedTerm',
          name: 'Liquidity',
          description:
            "An asset's ability to be quickly bought or sold without significantly affecting its price. High liquidity is essential for scalping.",
        },
        {
          '@type': 'DefinedTerm',
          name: 'Slippage',
          description:
            'The difference between expected order execution price and actual price. Negatively impacts scalping results.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'ECN Account',
          description:
            'A type of trading account with direct access to interbank market, providing low spreads and fast execution.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Volatility',
          description:
            'The degree of price variability of an asset. Moderate volatility creates opportunities for scalping.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Risk Management',
          description:
            'A trading risk control system including position sizing, stop-loss placement, and loss limits.',
        },
      ],
    };

    this.addJsonLdSchema(data);
  }
}
