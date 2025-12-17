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
  selector: 'app-home-en-blog-eighteen',
  templateUrl: './home-en-blog-eighteen.component.html',
  styleUrl: './home-en-blog-eighteen.component.scss',
})
export class HomeEnBlogEighteenComponent implements OnInit {
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
    this.titleService.setTitle('Volume Analysis in Trading | ArapovTrade');
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.updateTag({
      name: 'description',
      content:
        'Complete guide to market volume analysis. Volume Profile, Delta Volume, Footprint Charts and practical strategies for analyzing trading volumes.',
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
          mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': 'https://arapov.trade/en/freestudying/volmarketanalisys',
          },
          headline: 'Volume Analysis in Trading | ArapovTrade',
          description:
            'Complete guide to market volume analysis. Volume Profile, Delta Volume, Footprint Charts and practical strategies for analyzing trading volumes.',
          image:
            'https://arapov.trade/assets/img/content/volmarketanalisys.webp',
          datePublished: '2025-09-15T00:00:00+03:00',
          dateModified: '2025-09-19T00:00:00+02:00',
          inLanguage: 'ru',
          author: {
            '@type': 'Person',
            '@id': 'https://arapov.trade/en#person',
            name: 'Igor Arapov',
            url: 'https://arapov.trade/en',
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
            name: 'Индикатор объема - ключевой инструмент технического анализа',
            description:
              'Индикатор объема - ключевой инструмент технического анализа для трейдера. Разбираю основы объемного анализа: как читать объемы, определять дисбаланс спроса и предложения, находить Smart Money на рынке.',
            thumbnailUrl: [
              'https://img.youtube.com/vi/0pXHZRfVW9E/maxresdefault.jpg',
              'https://img.youtube.com/vi/0pXHZRfVW9E/hqdefault.jpg',
            ],
            uploadDate: '2025-09-19T00:00:00+02:00',
            duration: 'PT6M54S',
            contentUrl: 'https://www.youtube.com/watch?v=0pXHZRfVW9E',
            embedUrl: 'https://www.youtube.com/embed/0pXHZRfVW9E',
            inLanguage: 'ru',
            keywords:
              'объемы в трейдинге, индикатор объема, анализ объемов, Smart Money, биржевой стакан',
            hasPart: [
              {
                '@type': 'Clip',
                name: 'Откуда берется объем на бирже',
                startOffset: 39,
                endOffset: 56,
                url: 'https://www.youtube.com/watch?v=0pXHZRfVW9E&t=39',
              },
              {
                '@type': 'Clip',
                name: 'Биржевой стакан - что это и как работает',
                startOffset: 56,
                endOffset: 80,
                url: 'https://www.youtube.com/watch?v=0pXHZRfVW9E&t=56',
              },
              {
                '@type': 'Clip',
                name: 'Механика движения цены на рынке',
                startOffset: 80,
                endOffset: 90,
                url: 'https://www.youtube.com/watch?v=0pXHZRfVW9E&t=80',
              },
              {
                '@type': 'Clip',
                name: 'Как увидеть дисбаланс спроса и предложения',
                startOffset: 90,
                endOffset: 150,
                url: 'https://www.youtube.com/watch?v=0pXHZRfVW9E&t=90',
              },
              {
                '@type': 'Clip',
                name: 'Анализ больших объемов профессионалов',
                startOffset: 150,
                endOffset: 160,
                url: 'https://www.youtube.com/watch?v=0pXHZRfVW9E&t=150',
              },
              {
                '@type': 'Clip',
                name: 'Как правильно анализировать объемы',
                startOffset: 160,
                endOffset: 260,
                url: 'https://www.youtube.com/watch?v=0pXHZRfVW9E&t=160',
              },
              {
                '@type': 'Clip',
                name: 'Логика Smart Money в трейдинге',
                startOffset: 260,
                endOffset: 316,
                url: 'https://www.youtube.com/watch?v=0pXHZRfVW9E&t=260',
              },
              {
                '@type': 'Clip',
                name: 'Медвежий объем - объем продаж',
                startOffset: 316,
                endOffset: 327,
                url: 'https://www.youtube.com/watch?v=0pXHZRfVW9E&t=316',
              },
              {
                '@type': 'Clip',
                name: 'Бычий объем - объем покупок',
                startOffset: 327,
                endOffset: 356,
                url: 'https://www.youtube.com/watch?v=0pXHZRfVW9E&t=327',
              },
              {
                '@type': 'Clip',
                name: 'Захват ликвидности профессионалами',
                startOffset: 356,
                endOffset: 414,
                url: 'https://www.youtube.com/watch?v=0pXHZRfVW9E&t=356',
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
          name: 'What is market volume analysis?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Volume analysis is a technical analysis method based on studying trading volumes. It helps identify the true intentions of large players and determine where they direct liquidity by analyzing the number of trades at different price levels.',
          },
        },
        {
          '@type': 'Question',
          name: 'What are the main volume analysis tools?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Main tools include: Volume Profile (volume distribution by price), Delta Volume (difference between buys and sells), Footprint Charts (detailed order analysis), Open Interest (open positions on futures markets).',
          },
        },
        {
          '@type': 'Question',
          name: 'How does volume confirm a trend?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Rising trend with increasing volume confirms movement strength. Declining volume during price rise signals trend weakening. High volume on level breakout confirms its validity.',
          },
        },
        {
          '@type': 'Question',
          name: 'How to distinguish true breakout from false one?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'True breakout is accompanied by sharp volume increase and continued movement. False breakout is characterized by low volume or its decline after breakout, often leading to price returning to the range.',
          },
        },
        {
          '@type': 'Question',
          name: 'Which platforms are best for volume analysis?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Best platforms for volume analysis: TradingView (basic indicators), ATAS (professional order flow analysis), Bookmap (liquidity heatmaps). Choice depends on market and trading style.',
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
      name: 'How to Conduct Market Volume Analysis',
      description:
        'Step-by-step process of analyzing market volumes for making trading decisions',
      step: [
        {
          '@type': 'HowToStep',
          position: 1,
          name: 'Determine Market Context',
          text: 'Assess current market phase: trend, range, or consolidation. Volume levels work differently depending on market conditions.',
        },
        {
          '@type': 'HowToStep',
          position: 2,
          name: 'Use Multiple Timeframe Analysis',
          text: 'Analyze volumes on higher timeframes to identify global liquidity levels, on lower timeframes to find entry points.',
        },
        {
          '@type': 'HowToStep',
          position: 3,
          name: 'Find Key Volume Levels',
          text: 'Use Volume Profile to identify POC (Point of Control) and volume accumulation zones where liquidity concentrates.',
        },
        {
          '@type': 'HowToStep',
          position: 4,
          name: 'Analyze Delta Volume',
          text: 'Evaluate the ratio of buys to sells. Positive delta indicates buyer dominance, negative indicates seller dominance.',
        },
        {
          '@type': 'HowToStep',
          position: 5,
          name: 'Confirm Price Action Signals',
          text: 'Combine volume analysis with candlestick patterns and support/resistance levels to improve entry accuracy.',
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
      name: 'Volume Analysis Terms in Trading',
      description: 'Glossary of key volume analysis terms in trading',
      hasDefinedTerm: [
        {
          '@type': 'DefinedTerm',
          name: 'Volume Analysis',
          description:
            'Technical analysis method studying trading volumes to determine market participant activity and large player intentions',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Volume Profile',
          description:
            'Indicator showing distribution of trading volumes across different price levels over a specific period',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Delta Volume',
          description:
            'Difference between market buy and sell volume, showing real buyer or seller pressure',
        },
        {
          '@type': 'DefinedTerm',
          name: 'POC',
          description:
            'Point of Control — price level with maximum trading volume, often acting as a price attraction zone',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Footprint Charts',
          description:
            'Charts showing detailed volume distribution within each candle, broken down into buys and sells',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Open Interest',
          description:
            'Number of open positions in futures market, showing participant involvement in current trend',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Accumulation Zone',
          description:
            'Price range where large players gradually build positions before significant price movement',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Distribution Zone',
          description:
            'Price range where large players gradually close positions, preparing for trend reversal',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Tick Volume',
          description:
            'Number of price changes per time period, used in markets without centralized real volume tracking',
        },
        {
          '@type': 'DefinedTerm',
          name: 'VWAP',
          description:
            'Volume Weighted Average Price — volume-weighted average price showing fair asset value',
        },
      ],
    };

    this.addJsonLdSchema(data);
  }
}
