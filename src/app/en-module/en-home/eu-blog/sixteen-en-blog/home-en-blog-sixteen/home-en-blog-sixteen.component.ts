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
  selector: 'app-home-en-blog-sixteen',
  templateUrl: './home-en-blog-sixteen.component.html',
  styleUrl: './home-en-blog-sixteen.component.scss',
})
export class HomeEnBlogSixteenComponent implements OnInit {
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
      'Trend Channels in Trading: How to Build and Trade | Arapov.trade',
    );
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.updateTag({
      name: 'description',
      content:
        'Trend Channels in Trading: comprehensive guide to construction, types, and trading strategies. Learn how to use price channels for profitable trading in Forex, stocks, and cryptocurrencies.',
    });
    this.meta.updateTag({ name: 'datePublished', content: '2025-04-15' });
    this.meta.updateTag({
      property: 'og:image',
      content: '/assets/img/content/trandingchannels.webp',
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
          mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': 'https://arapov.trade/en/freestudying/trandingchannels',
          },
          headline:
            'Trend Channels in Trading: Complete Guide to Construction and Trading Strategies',
          description:
            'Comprehensive guide to trend channels: channel types, construction methods, trading strategies, and practical recommendations for traders of all skill levels.',
          image:
            'https://arapov.trade/assets/img/content/trandingchannels.webp',

          datePublished: '2025-04-15T00:00:00Z',
          dateModified: '2025-12-29T00:00:00Z',
          author: {
            '@id': 'https://arapov.trade/en#person',
          },
          publisher: {
            '@type': 'Organization',
            name: 'Arapov.trade',
            logo: {
              '@type': 'ImageObject',
              url: 'https://arapov.trade/assets/img/favicon.ico',
            },
            url: 'https://arapov.trade',
          },
          articleSection: 'Technical Analysis',
          keywords: [
            'trend channels',
            'price channel',
            'technical analysis',
            'support line',
            'resistance line',
          ],
          wordCount: 1650,
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
          name: 'What is a trend channel in trading?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'A trend channel is a technical analysis tool consisting of two parallel lines that contain price movement. The lower line (support) connects local lows, while the upper line (resistance) connects highs. Channels help determine trend direction and identify optimal entry points.',
          },
        },
        {
          '@type': 'Question',
          name: 'What types of trend channels exist?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'There are three main types: ascending channel (bullish trend with rising highs and lows), descending channel (bearish trend with declining extremes), and horizontal channel (range-bound sideways movement within a defined price band).',
          },
        },
        {
          '@type': 'Question',
          name: 'How do you properly construct a trend channel?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'For an ascending channel: identify two consecutive lows (second higher than first), connect them with a support line, then draw a parallel resistance line through the high between them. For descending channels, use the same approach but start with highs.',
          },
        },
        {
          '@type': 'Question',
          name: 'What trading strategies work with trend channels?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Two primary strategies: range trading within the channel (buying at support, selling at resistance) and breakout trading (entering after a candle closes beyond the channel boundary with volume confirmation). Experienced traders often combine both approaches.',
          },
        },
        {
          '@type': 'Question',
          name: 'Which timeframes work best for trend channels?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Higher timeframes provide more reliable signals: daily (D1), weekly (W1), and monthly (MN). They filter market noise and reveal significant price movements. Lower timeframes (M5, H1) suit scalping but require additional confirmation.',
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
      name: 'How to Build and Use a Trend Channel',
      description:
        'Step-by-step instructions for constructing a trend channel and applying it in trading',
      step: [
        {
          '@type': 'HowToStep',
          position: 1,
          name: 'Identify the Trend Direction',
          text: 'Analyze the chart to determine whether price is forming higher highs and lows (uptrend), lower highs and lows (downtrend), or moving horizontally (sideways).',
        },
        {
          '@type': 'HowToStep',
          position: 2,
          name: 'Locate Key Reference Points',
          text: 'For an uptrend, find at least two consecutive swing lows where the second is higher than the first. For a downtrend, find two swing highs where the second is lower than the first.',
        },
        {
          '@type': 'HowToStep',
          position: 3,
          name: 'Draw the Primary Line',
          text: 'Connect the identified points with a straight line. In an ascending channel, this becomes the support line; in a descending channel, it becomes the resistance line.',
        },
        {
          '@type': 'HowToStep',
          position: 4,
          name: 'Add the Parallel Line',
          text: 'Find the extreme point between your reference points and draw a line through it parallel to the primary line. Verify that both lines form a clear channel structure.',
        },
        {
          '@type': 'HowToStep',
          position: 5,
          name: 'Apply the Channel in Trading',
          text: 'Use channel boundaries for entries: buy near support in uptrends, sell near resistance in downtrends. When price breaks through a boundary with volume, enter in the breakout direction.',
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
      name: 'Trend Channel Terminology Glossary',
      hasDefinedTerm: [
        {
          '@type': 'DefinedTerm',
          name: 'Trend Channel',
          description:
            'A technical analysis tool consisting of two parallel lines that contain price movement within a trend',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Support Line',
          description:
            'The lower boundary of a channel connecting local price lows where buyers typically become active',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Resistance Line',
          description:
            'The upper boundary of a channel connecting local price highs where sellers begin to dominate',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Ascending Channel',
          description:
            'A price channel sloping upward characterizing a bullish trend with rising highs and lows',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Descending Channel',
          description:
            'A price channel sloping downward characterizing a bearish trend with declining extremes',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Horizontal Channel',
          description:
            'A sideways price range without a pronounced trend, also known as consolidation or ranging market',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Channel Breakout',
          description:
            'Price movement beyond a channel boundary with a candle close outside the line, signaling potential trend change',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Level Retest',
          description:
            'Price returning to a broken channel line to test it before continuing the movement',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Touch Point',
          description:
            'An instance when price reaches a channel boundary and reverses, confirming the boundary significance',
        },
        {
          '@type': 'DefinedTerm',
          name: 'False Breakout',
          description:
            'A brief price excursion beyond a channel boundary followed by a return inside the range',
        },
      ],
    };

    this.addJsonLdSchema(data);
  }
}
