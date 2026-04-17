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
  selector: 'app-home-eu-blog-fifty-two',
  templateUrl: './home-eu-blog-fifty-two.component.html',
  styleUrl: './home-eu-blog-fifty-two.component.scss',
})
export class HomeEuBlogFiftyTwoComponent implements OnInit {
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
      'Market Trend Anatomy: Complete Trader`s Guide | ArapovTrade',
    );
    this.meta.updateTag({ name: 'datePublished', content: '2025-01-30' });
    this.meta.updateTag({ name: 'dateModified', content: '2026-04-15' });
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.updateTag({
      name: 'description',
      content:
        'Learn how market trends form and evolve. Trend phases, analysis indicators, common trading mistakes, and practical strategies for trend-following trading.',
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
            'https://arapov.trade/en/freestudying/anatomyofmarkettrends#article',
          headline: "Market Trend Anatomy: Complete Trader's Guide",
          description:
            'Learn how market trends form and evolve. Trend phases, analysis indicators, common trading mistakes, and practical strategies for trend-following trading.',
          image: 'https://arapov.trade/assets/img/content/trends1.png',
          datePublished: '2026-03-25T00:00:00Z',
          dateModified: '2026-04-15T00:00:00Z',

          author: {
            '@id': 'https://arapov.trade/en#person',
          },
          publisher: {
            '@type': 'Organization',
            '@id': 'https://arapov.trade/#organization',
            name: 'ArapovTrade',
            logo: {
              '@type': 'ImageObject',
              url: 'https://arapov.trade/assets/img/favicon.ico',
            },
          },
          mainEntityOfPage:
            'https://arapov.trade/en/freestudying/anatomyofmarkettrends',
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
        'Independent researcher,',
        'trader',
        'author and founder of arapov.trade',
      ],
      description:
        'Independent researcher, practicing trader, author of books on trading and scientific publications. Specializes in trading psychology and cognitive biases in financial markets.',
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
          name: 'What is a trend in trading?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'A trend is a sustained directional price movement over a specific period. Uptrends feature higher highs and higher lows, while downtrends show lower highs and lower lows. Trends reflect the balance between supply and demand.',
          },
        },
        {
          '@type': 'Question',
          name: 'What phases does a trend go through?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Trends develop through four stages: accumulation (institutional position building), markup (active movement with retail participation), distribution (profit-taking by large players), and markdown (trend reversal).',
          },
        },
        {
          '@type': 'Question',
          name: 'Which indicators best identify trends?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Key trend indicators include moving averages (MA50, MA200), MACD for direction changes, RSI for momentum assessment, and ADX for trend strength measurement. Using 2-3 indicators in combination is recommended.',
          },
        },
        {
          '@type': 'Question',
          name: 'Why is counter-trend trading risky?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Trading against the trend without confirming signals increases loss risk since trends can persist far longer than expected. Wait for indicator divergence, key level breakouts, or ADX dropping below 25 before counter-trend entries.',
          },
        },
        {
          '@type': 'Question',
          name: 'How does volume help trend analysis?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Volume confirms trend strength: increasing volume during price movement in the trend direction validates its strength. Declining volume may signal weakening momentum. Price-volume divergence often precedes reversals.',
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
      name: 'How to Identify and Trade with the Trend',
      step: [
        {
          '@type': 'HowToStep',
          position: 1,
          name: 'Determine trend direction',
          text: 'Use MA50 and MA200 moving averages. Price above both lines indicates an uptrend, below both signals a downtrend.',
        },
        {
          '@type': 'HowToStep',
          position: 2,
          name: 'Identify the current phase',
          text: 'Analyze volume and volatility patterns to understand which stage of trend development the market is in.',
        },
        {
          '@type': 'HowToStep',
          position: 3,
          name: 'Find entry points',
          text: 'Enter on pullbacks to support levels or moving averages. Use Fibonacci retracement levels 38.2%-61.8% for correction zones.',
        },
        {
          '@type': 'HowToStep',
          position: 4,
          name: 'Set stop-loss orders',
          text: 'Place protective orders beyond key levels accounting for ATR. Risk no more than 1-2% of your account per trade.',
        },
        {
          '@type': 'HowToStep',
          position: 5,
          name: 'Manage the position',
          text: 'Move stop-loss to breakeven when price moves in your favor. Take partial profits at key levels and record every trade.',
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
      name: 'Trading Terms Glossary',
      hasDefinedTerm: [
        {
          '@type': 'DefinedTerm',
          name: 'Trend',
          description:
            'A sustained directional price movement of an asset over a specific time period.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Uptrend',
          description:
            'A bullish market characterized by consecutively higher highs and higher lows.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Downtrend',
          description:
            'A bearish market with consecutively lower highs and lower lows.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Sideways market',
          description:
            'Horizontal price movement within a range without a clear directional bias.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Moving average',
          description:
            'An indicator that smooths price fluctuations showing average price over a selected period.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'MACD',
          description:
            'Moving Average Convergence Divergence indicator for determining trend strength and direction.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'RSI',
          description:
            'Relative Strength Index showing overbought or oversold conditions of an asset.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Accumulation phase',
          description:
            'Initial trend stage when institutional players build positions during low volatility.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Stop-loss',
          description:
            'A protective order for automatic position closure when reaching a predetermined loss level.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Volume analysis',
          description:
            'Market analysis method based on trading volumes to confirm price movement strength.',
        },
      ],
    };

    this.addJsonLdSchema(data);
  }
}
