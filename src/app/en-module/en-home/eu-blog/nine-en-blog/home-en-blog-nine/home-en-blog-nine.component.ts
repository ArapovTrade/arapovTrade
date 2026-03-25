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
  selector: 'app-home-en-blog-nine',
  templateUrl: './home-en-blog-nine.component.html',
  styleUrl: './home-en-blog-nine.component.scss',
})
export class HomeEnBlogNineComponent implements OnInit {
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
    this.titleService.setTitle('How to Predict Price in Trading | ArapovTrade');
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.updateTag({
      name: 'description',
      content:
        'Complete guide to price forecasting in financial markets. Technical and fundamental analysis, indicators, volume analysis, and proven strategies for predicting price movements.',
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
          headline: 'How to Predict Price in Trading: Complete Guide',
          description:
            'Complete guide to price forecasting in financial markets. Technical and fundamental analysis, indicators, volume analysis, and proven strategies for predicting price movements.',
          author: {
            '@id': 'https://arapov.trade/en#person',
          },
          publisher: {
            '@type': 'Organization',
            name: 'ArapovTrade',
            logo: {
              '@type': 'ImageObject',
              url: 'https://arapov.trade/assets/img/favicon.ico',
            },
          },
          datePublished: '2026-03-15T00:00:00Z',
          dateModified: '2026-03-22T00:00:00Z',
          mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': 'https://arapov.trade/en/freestudying/predictmarketprice',
          },
          image:
            'https://arapov.trade/assets/img/content/predictmarketprice1.webp',
          articleSection: 'Trading',
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
      mainEntity: [
        {
          '@type': 'Question',
          name: 'What is the most effective price prediction method?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'The most effective approach combines technical and fundamental analysis with volume analysis. Technical analysis identifies entry points, fundamental analysis determines overall direction, and volume analysis confirms signal validity.',
          },
        },
        {
          '@type': 'Question',
          name: 'Which indicators are best for price forecasting?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'The most popular indicators include moving averages (MA, EMA) for trend identification, RSI for overbought/oversold conditions, MACD for momentum and reversals, Bollinger Bands for volatility, and Ichimoku for comprehensive analysis.',
          },
        },
        {
          '@type': 'Question',
          name: 'How does volume analysis help in forecasting?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Volume confirms the strength of price movements. Rising prices on high volume confirm the trend. Volume divergence with price warns of potential reversals. Abnormal volume spikes signal institutional activity.',
          },
        },
        {
          '@type': 'Question',
          name: 'Why is multiple timeframe analysis important?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Multiple timeframe analysis allows seeing the bigger picture on higher timeframes while finding precise entries on lower ones. This improves win rates and risk-reward ratios by aligning trades with dominant trends.',
          },
        },
        {
          '@type': 'Question',
          name: 'What is the biggest mistake in price forecasting?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'The biggest mistake is trading against the trend without valid reasons and ignoring risk management. Even accurate forecasts cannot guarantee profits if a trader risks too much capital on single trades.',
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
      name: 'How to Forecast Price in Financial Markets',
      description:
        'Step-by-step process for predicting price movements to make informed trading decisions',
      step: [
        {
          '@type': 'HowToStep',
          position: 1,
          name: 'Identify the Overall Trend',
          text: 'Use moving averages and high/low analysis on higher timeframes to determine the dominant trend direction before looking for trade setups.',
        },
        {
          '@type': 'HowToStep',
          position: 2,
          name: 'Find Key Levels',
          text: 'Identify support and resistance levels, Fibonacci retracements, and volume concentration zones where price may reverse or accelerate.',
        },
        {
          '@type': 'HowToStep',
          position: 3,
          name: 'Analyze Technical Indicators',
          text: 'Apply technical indicators (RSI, MACD, Bollinger Bands) to confirm signals and assess market momentum and potential reversals.',
        },
        {
          '@type': 'HowToStep',
          position: 4,
          name: 'Check Volume',
          text: 'Verify that volume supports the price movement. High volume on breakouts confirms their validity and increases probability of follow-through.',
        },
        {
          '@type': 'HowToStep',
          position: 5,
          name: 'Consider Fundamental Factors',
          text: 'Check the economic calendar and news background. Avoid entries before major news releases or factor their potential impact into your analysis.',
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
      name: 'Price Forecasting Terms in Trading',
      description:
        'Glossary of key terms for price prediction in financial markets',
      hasDefinedTerm: [
        {
          '@type': 'DefinedTerm',
          name: 'Technical Analysis',
          description:
            'A method of forecasting prices based on studying historical price data, chart patterns, and technical indicators',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Fundamental Analysis',
          description:
            'An analytical method based on economic, political, and financial factors that influence asset value',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Moving Average',
          description:
            'An indicator that calculates average price over a defined period to smooth fluctuations and identify trends',
        },
        {
          '@type': 'DefinedTerm',
          name: 'RSI',
          description:
            'Relative Strength Index - an indicator measuring price change speed and magnitude to identify overbought or oversold conditions',
        },
        {
          '@type': 'DefinedTerm',
          name: 'MACD',
          description:
            'Moving Average Convergence Divergence - an indicator showing the relationship between two moving averages to identify momentum and reversals',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Support Level',
          description:
            'A price level where demand is strong enough to stop price decline and cause a bounce upward',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Resistance Level',
          description:
            'A price level where supply is strong enough to stop price advance and cause a pullback downward',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Volume Analysis',
          description:
            'A method analyzing trading volume to confirm price movements and detect institutional activity',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Divergence',
          description:
            'A discrepancy between price movement and indicator readings that often signals potential trend reversal',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Bollinger Bands',
          description:
            'A volatility indicator consisting of a moving average and two standard deviation lines to identify extreme price levels',
        },
      ],
    };

    this.addJsonLdSchema(data);
  }
}
