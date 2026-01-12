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
  selector: 'app-home-en-blog-fourty-five',
  templateUrl: './home-en-blog-fourty-five.component.html',
  styleUrl: './home-en-blog-fourty-five.component.scss',
})
export class HomeEnBlogFourtyFiveComponent implements OnInit {
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
    this.ukrGroups = this.artickleServ.getEnglishGroups();
    this.grr = this.artickleServ.selectedGroups;
    this.updateArticleCounts();
    this.checkedGroup = this.artickleServ.selectedGroups;
    this.titleService.setTitle(
      'Moving Averages in Trading: Complete Guide | ArapovTrade'
    );
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.updateTag({
      name: 'description',
      content:
        'Learn how to use Moving Averages (MA) in trading. SMA, EMA, WMA — types, strategies, real market examples and practical recommendations for traders.',
    });

    this.meta.updateTag({ name: 'datePublished', content: '2025-04-17' });
    this.meta.updateTag({
      property: 'og:image',
      content: '/assets/img/content/movingaverages.png',
    });
    this.gerRandom();
  }
  randomArticleRus: any = [];
  gerRandom() {
    this.randomArticleRus = this.artickleServ.getRandomUkArticles();
  }
  hoveredIndex: number | null = null;
  projects = [
    { title: 'Quick start', link: 'https://arapov.education/en/course-en/' },
    {
      title: 'Introduction to Trading',
      link: 'https://arapov.education/en/reg-workshop-en/',
    },
    { title: 'Professional courses', link: 'https://arapov.trade/en/studying' },
    {
      title: 'Basic course',
      link: 'https://arapov.trade/en/freestudying/freeeducation',
    },
    { title: 'Copy-trading', link: 'https://arapovcopytrade.com/en/home-en/' },
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
    this.router.navigate(['/en/freestudying', nextpage]);
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
          headline:
            'Moving Averages in Trading: Complete Guide to MA Application',
          description:
            'Comprehensive guide to moving averages in trading. MA types (SMA, EMA, WMA, SMMA), crossover strategies, practical examples from stock, cryptocurrency and forex markets.',
          author: {
            '@id': 'https://arapov.trade/en#person',
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
          datePublished: '2025-04-15T00:00:00Z',
          dateModified: '2025-11-11T00:00:00Z',
          mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': 'https://arapov.trade/en/freestudying/movingaverages',
          },
          image: {
            '@type': 'ImageObject',
            url: 'https://arapov.trade/assets/img/content/movingaverages.png',
            width: 1200,
            height: 630,
          },
          articleSection: 'Technical Analysis',
          keywords:
            'moving averages, SMA, EMA, WMA, technical analysis, trading, golden cross',
          inLanguage: 'en',
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
      mainEntity: [
        {
          '@type': 'Question',
          name: 'What is a moving average in trading?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'A Moving Average (MA) is a technical indicator that calculates the average price of an asset over a specific time period, smoothing out price fluctuations and making market trends more visible. MA helps traders identify trend direction, find entry and exit points, and filter out market noise.',
          },
        },
        {
          '@type': 'Question',
          name: 'What is the difference between SMA and EMA?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Simple Moving Average (SMA) is calculated as the arithmetic mean of prices over a selected period, giving equal weight to all values. Exponential Moving Average (EMA) uses an exponential formula, giving more weight to recent price data, making it more sensitive to recent market changes. EMA is better suited for short-term trading, while SMA is ideal for long-term trend analysis.',
          },
        },
        {
          '@type': 'Question',
          name: 'What is a golden cross and death cross?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'A golden cross is a bullish signal that occurs when a short-term moving average (such as 50-day) crosses above a long-term moving average (such as 200-day), indicating the start of an uptrend. A death cross is a bearish signal when a short-term MA crosses below a long-term one, signaling a potential downtrend.',
          },
        },
        {
          '@type': 'Question',
          name: 'Which moving average period should I use?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Period selection depends on your trading style. For scalping and day trading, short-term MAs with periods of 9-21 days work well. For swing trading, periods of 20-50 days are effective. For long-term investing and determining the global trend, 100-200 day moving averages are used. Combining multiple periods is recommended for more accurate analysis.',
          },
        },
        {
          '@type': 'Question',
          name: 'Why do moving averages perform poorly in sideways markets?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Moving averages are trend-following indicators and work effectively during clear directional market movements. During sideways markets (ranging), price frequently crosses MA in both directions, generating numerous false signals. To identify ranging conditions, use the ADX indicator: values below 20 indicate a weak trend, making MA signals unreliable.',
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
      name: 'How to Use Moving Averages for Trading',
      description:
        'Step-by-step guide to applying moving averages in trading for trend identification and finding entry points.',
      step: [
        {
          '@type': 'HowToStep',
          position: 1,
          name: 'Select MA type and period',
          text: 'Determine your trading style and choose the appropriate MA type. For short-term trading, use EMA with periods 9-21; for long-term analysis, use SMA 50-200. Set up indicators on your trading platform.',
        },
        {
          '@type': 'HowToStep',
          position: 2,
          name: 'Identify trend direction',
          text: "Analyze price position relative to the moving average. If price is above MA, the trend is bullish; if below, it's bearish. Use the 200-day SMA to determine the global trend on the daily chart.",
        },
        {
          '@type': 'HowToStep',
          position: 3,
          name: 'Look for crossover signals',
          text: 'Monitor crossovers of moving averages with different periods. Golden cross (short-term MA crosses above long-term) signals buying. Death cross (crosses below) signals selling.',
        },
        {
          '@type': 'HowToStep',
          position: 4,
          name: 'Confirm with additional indicators',
          text: 'Use RSI to check overbought/oversold conditions, MACD to confirm trend strength, and volume to validate signals. Never enter positions based on a single indicator alone.',
        },
        {
          '@type': 'HowToStep',
          position: 5,
          name: 'Set stop-loss and manage risk',
          text: 'Place stop-loss below the nearest support level or 1-2 ATR away from entry point. Risk no more than 1-2% of your deposit per trade. Use MA as a dynamic level for trailing stops.',
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
      name: 'Moving Averages Glossary',
      description:
        'Key terms and definitions related to moving averages in technical analysis',
      hasDefinedTerm: [
        {
          '@type': 'DefinedTerm',
          name: 'Moving Average (MA)',
          description:
            'A technical indicator that calculates the average price of an asset over a specific period to smooth price fluctuations and identify trends.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'SMA (Simple Moving Average)',
          description:
            'A simple moving average calculated as the arithmetic mean of closing prices over a selected time period.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'EMA (Exponential Moving Average)',
          description:
            'An exponential moving average that gives more weight to recent price data, providing faster response to market changes.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'WMA (Weighted Moving Average)',
          description:
            'A weighted moving average using a linear weight scale to assign greater significance to recent prices.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Golden Cross',
          description:
            'A bullish signal occurring when a short-term moving average crosses above a long-term moving average.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Death Cross',
          description:
            'A bearish signal forming when a short-term moving average crosses below a long-term moving average.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'MA Period',
          description:
            'The number of time intervals (candles) used to calculate the average price value. Determines indicator sensitivity.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Dynamic Support and Resistance',
          description:
            'The function of a moving average as a changing level from which price may bounce in the trend direction.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Indicator Lag',
          description:
            'The property of moving averages to react to price changes with a delay since they are based on historical data.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Ranging Market',
          description:
            'A market condition without a clear directional trend where moving averages generate numerous false signals.',
        },
      ],
    };

    this.addJsonLdSchema(data);
  }
}
