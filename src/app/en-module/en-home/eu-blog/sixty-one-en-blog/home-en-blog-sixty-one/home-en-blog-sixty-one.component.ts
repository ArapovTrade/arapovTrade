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
  selector: 'app-home-en-blog-sixty-one',
  templateUrl: './home-en-blog-sixty-one.component.html',
  styleUrl: './home-en-blog-sixty-one.component.scss',
})
export class HomeEnBlogSixtyOneComponent {
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
      'Smart Money Concepts: Complete SMC Trading Guide | Arapov.trade'
    );
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.updateTag({
      name: 'description',
      content:
        'Smart Money Concepts (SMC) — Complete guide to trading alongside institutional participants. Order Blocks, Fair Value Gaps, liquidity zones, and entry strategies.',
    });
    this.meta.updateTag({ name: 'author', content: 'Igor Arapov' });
    this.meta.updateTag({ name: 'datePublished', content: '2025-02-07' });
    this.meta.updateTag({
      property: 'og:image',
      content: '/assets/img/content/smartmoneyconceptsguide.webp',
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
          '@id':
            'https://arapov.trade/en/freestudying/smartmoneyconceptsguide#article',
          headline:
            'Smart Money Concepts: Complete Guide to Trading Alongside Institutions',
          description:
            'Comprehensive Smart Money Concepts (SMC) guide: Order Blocks, Fair Value Gaps, liquidity zones, entry strategies, and risk management.',
          image: [
            'https://arapov.trade/assets/img/content/smartmoneyconceptsguide.webp',
          ],
          author: { '@id': 'https://arapov.trade/#person' },
          publisher: { '@id': 'https://arapov.trade/#organization' },
          datePublished: '2024-01-15T00:00:00Z',
          dateModified: '2025-06-04T00:00:00Z',
          mainEntityOfPage: {
            '@type': 'WebPage',
            '@id':
              'https://arapov.trade/en/freestudying/smartmoneyconceptsguide',
          },
          articleSection: 'Trading',
          keywords: [
            'Smart Money Concepts',
            'SMC',
            'Order Blocks',
            'Fair Value Gaps',
            'liquidity',
            'institutional analysis',
          ],
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
      '@id': 'https://arapov.trade/#person',
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
      '@id': 'https://arapov.trade/en/freestudying/smartmoneyconceptsguide#faq',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'What is Smart Money Concepts?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Smart Money Concepts (SMC) is a financial market analysis methodology based on understanding institutional participant actions: banks, hedge funds, and market makers. The concept reveals price formation mechanics through liquidity analysis, market structure, and large capital behavior.',
          },
        },
        {
          '@type': 'Question',
          name: 'What is an Order Block in trading?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'An Order Block is a price zone on a chart where institutional participants opened or closed significant positions before a strong market movement. Bullish Order Blocks form from the last bearish candle before price rises, bearish ones form from the last bullish candle before price falls.',
          },
        },
        {
          '@type': 'Question',
          name: 'How to identify a Fair Value Gap?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: "A Fair Value Gap (FVG) is a price imbalance zone occurring during sharp impulsive movement. A bullish FVG forms when the first candle's low is above the third candle's high in upward movement. Price tends to fill this gap.",
          },
        },
        {
          '@type': 'Question',
          name: 'How does SMC differ from traditional technical analysis?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Traditional technical analysis uses indicators (RSI, MACD) that lag behind price. SMC analyzes current price and volume dynamics in real-time, focusing on liquidity mechanics and institutional actions.',
          },
        },
        {
          '@type': 'Question',
          name: 'How to manage risk when trading SMC?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Stop-losses are placed behind liquidity levels, not in obvious locations. Optimal risk is 1-2% of deposit per trade. Use partial position closes, breakeven stop transfers, and trailing stops.',
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
      '@id':
        'https://arapov.trade/en/freestudying/smartmoneyconceptsguide#howto',
      name: 'How to Trade Using Smart Money Concepts',
      description:
        'Step-by-step guide to applying SMC in financial market trading',
      step: [
        {
          '@type': 'HowToStep',
          position: 1,
          name: 'Analyze Market Structure',
          text: 'Determine the current market phase: trend or consolidation. Identify Break of Structure (BOS) and Change of Character (CHoCH) to understand movement direction.',
        },
        {
          '@type': 'HowToStep',
          position: 2,
          name: 'Identify Liquidity Zones',
          text: 'Find stop-loss accumulation areas: local highs/lows, consolidation boundaries, obvious support and resistance levels.',
        },
        {
          '@type': 'HowToStep',
          position: 3,
          name: 'Identify Order Blocks and FVG',
          text: 'Mark Order Blocks — the last opposite candles before impulse. Find Fair Value Gaps — unfilled price gaps between candles.',
        },
        {
          '@type': 'HowToStep',
          position: 4,
          name: 'Wait for Retest and Confirmation',
          text: 'Wait for price to return to Order Block or FVG zones. Confirm entry with candlestick patterns (pin bar, engulfing) or volume increases.',
        },
        {
          '@type': 'HowToStep',
          position: 5,
          name: 'Manage Position and Risk',
          text: 'Place stop-loss behind liquidity levels. Lock partial profits at key levels. Move stop to breakeven when price moves in your favor.',
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
      '@id':
        'https://arapov.trade/en/freestudying/smartmoneyconceptsguide#glossary',
      name: 'Smart Money Concepts Glossary',
      hasDefinedTerm: [
        {
          '@type': 'DefinedTerm',
          name: 'Smart Money Concepts',
          description:
            'Market analysis methodology based on understanding institutional participant actions and liquidity mechanics',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Order Block',
          description:
            'Price zone where institutions opened or closed significant positions before strong movement',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Fair Value Gap',
          description:
            'Price imbalance zone occurring during sharp impulsive movement without sufficient opposing orders',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Break of Structure',
          description:
            'Significant extreme breakout confirming trend change or impulse continuation',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Change of Character',
          description: 'Initial signs of potential price direction reversal',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Liquidity Grab',
          description:
            'Deliberate price movement into stop-loss zones with subsequent reversal',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Liquidity Sweep',
          description:
            'Tactic of hunting retail trader stops before movement in opposite direction',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Institutional Participants',
          description:
            'Large market participants: banks, hedge funds, market makers, and professional asset managers',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Liquidity Zone',
          description:
            'Order accumulation area where institutions collect liquidity to open positions',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Retest',
          description:
            'Price return to broken level or zone to confirm role change',
        },
      ],
    };

    this.addJsonLdSchema(data);
  }
}
