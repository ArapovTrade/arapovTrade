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
  selector: 'app-home-eu-blog-fifty-seven',
  templateUrl: './home-eu-blog-fifty-seven.component.html',
  styleUrl: './home-eu-blog-fifty-seven.component.scss',
})
export class HomeEuBlogFiftySevenComponent implements OnInit {
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
      'Trading Indicators: Complete Guide to RSI and MACD'
    );
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.updateTag({
      name: 'description',
      content:
        'Comprehensive guide to technical analysis indicators RSI and MACD. Learn how to use oscillators for identifying market entry and exit points.',
    });
    this.meta.updateTag({ name: 'datePublished', content: '2025-04-17' });
    this.meta.updateTag({
      property: 'og:image',
      content: '/assets/img/content/tradingindicators.webp',
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
            '@id': 'https://arapov.trade/en/freestudying/tradingindicators',
          },
          headline: 'Trading Indicators: Complete Guide to RSI and MACD',
          description:
            'Comprehensive guide to technical analysis indicators RSI and MACD. Learn how to use oscillators for identifying market entry and exit points.',
          image:
            'https://arapov.trade/assets/img/content/tradingindicators.webp',
          datePublished: '2025-01-15T00:00:00+02:00',
          dateModified: '2025-01-15T00:00:00+02:00',
          inLanguage: 'eu',
          author: {
            '@type': 'Person',
            '@id': 'https://arapov.trade/en#person',
            name: 'Ihor Arapov',
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
            name: 'Честный разговор об индикаторах в трейдинге',
            description:
              'Честный разговор об индикаторах в трейдинге от практика с 11-летним стажем. Игорь Арапов рассказывает, почему после 3 лет экспериментов с индикаторами полностью от них отказался и что использует вместо них.',
            thumbnailUrl: [
              'https://img.youtube.com/vi/t4eLSS2vh-w/maxresdefault.jpg',
              'https://img.youtube.com/vi/t4eLSS2vh-w/hqdefault.jpg',
            ],
            uploadDate: '2025-11-15T00:00:00+02:00',
            duration: 'PT12M35S',
            contentUrl: 'https://www.youtube.com/watch?v=t4eLSS2vh-w',
            embedUrl: 'https://www.youtube.com/embed/t4eLSS2vh-w',
            inLanguage: 'ru',
            keywords:
              'индикаторы трейдинг, Stochastic, Moving Average, MACD, объемный анализ, технический анализ',
            hasPart: [
              {
                '@type': 'Clip',
                name: 'Индикаторы в трейдинге - все плюсы и минусы использования',
                startOffset: 0,
                endOffset: 22,
                url: 'https://www.youtube.com/watch?v=t4eLSS2vh-w&t=0',
              },
              {
                '@type': 'Clip',
                name: 'Как трейдеры знакомятся с индикаторами',
                startOffset: 22,
                endOffset: 96,
                url: 'https://www.youtube.com/watch?v=t4eLSS2vh-w&t=22',
              },
              {
                '@type': 'Clip',
                name: 'Какие бывают индикаторы',
                startOffset: 96,
                endOffset: 129,
                url: 'https://www.youtube.com/watch?v=t4eLSS2vh-w&t=96',
              },
              {
                '@type': 'Clip',
                name: 'В чем проблема индикаторов',
                startOffset: 129,
                endOffset: 175,
                url: 'https://www.youtube.com/watch?v=t4eLSS2vh-w&t=129',
              },
              {
                '@type': 'Clip',
                name: 'Пример работы индикаторов',
                startOffset: 175,
                endOffset: 285,
                url: 'https://www.youtube.com/watch?v=t4eLSS2vh-w&t=175',
              },
              {
                '@type': 'Clip',
                name: 'Про индикатор ATR',
                startOffset: 285,
                endOffset: 321,
                url: 'https://www.youtube.com/watch?v=t4eLSS2vh-w&t=285',
              },
              {
                '@type': 'Clip',
                name: 'Почему индикаторы запаздывают?',
                startOffset: 321,
                endOffset: 755,
                url: 'https://www.youtube.com/watch?v=t4eLSS2vh-w&t=321',
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
          name: 'What is the RSI indicator and how to use it?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'RSI (Relative Strength Index) is an oscillator that measures the speed and magnitude of price changes. Values above 70 indicate overbought conditions, below 30 indicate oversold conditions. Traders use RSI to find reversal points and confirm divergence signals.',
          },
        },
        {
          '@type': 'Question',
          name: 'How does the MACD indicator work?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'MACD consists of the MACD line (difference between EMA 12 and EMA 26), signal line (EMA 9 of the MACD line), and histogram. When the MACD line crosses the signal line from below, it generates a buy signal; crossing from above indicates a sell signal.',
          },
        },
        {
          '@type': 'Question',
          name: 'Which indicators are best for trend identification?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Moving averages (SMA, EMA), ADX index, Parabolic SAR, and Ichimoku are effective for trend identification. These indicators help determine price direction and assess the strength of the current trend.',
          },
        },
        {
          '@type': 'Question',
          name: 'Can RSI and MACD be used together?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes, combining RSI and MACD increases trading signal accuracy. RSI identifies overbought and oversold zones, while MACD confirms trend direction. When signals from both indicators align, the probability of a successful trade increases significantly.',
          },
        },
        {
          '@type': 'Question',
          name: 'Which markets are RSI and MACD applicable to?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'RSI and MACD are universal and apply to forex, stock markets, cryptocurrencies, and commodities. Period settings are adapted to the volatility of the specific market and chosen timeframe.',
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
      name: 'How to Trade Using RSI and MACD Indicators',
      description:
        'Step-by-step instruction for applying RSI and MACD indicators to find trading signals',
      step: [
        {
          '@type': 'HowToStep',
          position: 1,
          name: 'Determine market condition',
          text: 'Use ADX or moving averages to determine trend presence. ADX values above 25 indicate a trending market, below 20 suggests sideways movement.',
        },
        {
          '@type': 'HowToStep',
          position: 2,
          name: 'Configure indicators',
          text: 'Add RSI with period 14 and MACD with standard settings (12, 26, 9) to your chart. Adapt periods to your chosen timeframe.',
        },
        {
          '@type': 'HowToStep',
          position: 3,
          name: 'Find RSI signal',
          text: 'Wait for RSI to exit overbought zone (below 70) or oversold zone (above 30). Check for divergence between price and indicator.',
        },
        {
          '@type': 'HowToStep',
          position: 4,
          name: 'Confirm with MACD',
          text: 'Ensure MACD confirms the direction: line crossover should align with RSI signal. Rising histogram strengthens signal reliability.',
        },
        {
          '@type': 'HowToStep',
          position: 5,
          name: 'Set risk levels',
          text: 'Place stop-loss beyond the nearest support or resistance level. Calculate take-profit with a risk-to-reward ratio of at least 1:2.',
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
      name: 'Technical Analysis Indicator Terms',
      description: 'Glossary of key terms related to trading indicators',
      hasDefinedTerm: [
        {
          '@type': 'DefinedTerm',
          name: 'RSI',
          description:
            'Relative Strength Index — an oscillator measuring the speed of price changes on a scale from 0 to 100',
        },
        {
          '@type': 'DefinedTerm',
          name: 'MACD',
          description:
            'Moving Average Convergence Divergence — an indicator showing the relationship between two EMAs',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Oscillator',
          description:
            'A type of indicator that fluctuates between fixed values to identify overbought and oversold conditions',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Divergence',
          description:
            'A discrepancy between price direction and indicator readings, signaling a potential reversal',
        },
        {
          '@type': 'DefinedTerm',
          name: 'EMA',
          description:
            'Exponential Moving Average, which gives greater weight to recent price data',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Overbought',
          description:
            'Market condition where an asset trades above fair value and a downward correction is likely',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Oversold',
          description:
            'Market condition where an asset trades below fair value and an upward bounce is likely',
        },
        {
          '@type': 'DefinedTerm',
          name: 'ATR',
          description:
            'Average True Range — a volatility indicator measuring the average amplitude of price movements',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Bollinger Bands',
          description:
            'A volatility indicator consisting of three lines forming a dynamic channel around price',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Signal Line',
          description:
            'In MACD context — a moving average of the MACD line used to generate trading signals',
        },
      ],
    };

    this.addJsonLdSchema(data);
  }
}
