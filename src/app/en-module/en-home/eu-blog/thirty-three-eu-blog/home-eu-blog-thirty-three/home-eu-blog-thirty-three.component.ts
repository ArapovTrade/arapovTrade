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
  selector: 'app-home-eu-blog-thirty-three',
  templateUrl: './home-eu-blog-thirty-three.component.html',
  styleUrl: './home-eu-blog-thirty-three.component.scss',
})
export class HomeEuBlogThirtyThreeComponent implements OnInit {
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
      'Pin Bar in Trading: Complete Trading Guide | Arapov.trade',
    );
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.updateTag({
      name: 'description',
      content:
        'Pin Bar in trading — complete guide to trading this reversal pattern. Bullish and bearish pin bar, entry strategies, risk management on forex and cryptocurrencies.',
    });
    this.meta.updateTag({ name: 'datePublished', content: '2025-04-16' });
    this.meta.updateTag({
      property: 'og:image',
      content: '/assets/img/content/pinbar.jpg',
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
          '@id': 'https://arapov.trade/en/freestudying/pinbar#article',
          headline: 'Pin Bar in Trading: Complete Trading Guide',
          description:
            'Pin Bar in trading — complete guide to trading this reversal pattern. Bullish and bearish pin bar, entry strategies, risk management.',
          image: {
            '@type': 'ImageObject',
            url: 'https://arapov.trade/assets/img/content/pinbar1.png',
            width: 1200,
            height: 630,
          },
          author: {
            '@id': 'https://arapov.trade/en#person',
          },
          publisher: {
            '@type': 'Organization',
            '@id': 'https://arapov.trade#organization',
            name: 'Arapov.trade',
          },
          datePublished: '2025-04-15T00:00:00Z',
          dateModified: '2025-12-29T00:00:00Z',
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
          name: 'What is a pin bar in trading?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'A pin bar is a candlestick pattern with a long shadow and small body signaling potential price reversal. The long shadow shows rejected price level while the compact body indicates market indecision. The name derives from Pinocchio Bar.',
          },
        },
        {
          '@type': 'Question',
          name: 'How to distinguish bullish from bearish pin bar?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'A bullish pin bar has a long lower shadow and forms after decline signaling upward reversal. A bearish pin bar has a long upper shadow and appears after rally indicating potential downward reversal.',
          },
        },
        {
          '@type': 'Question',
          name: 'At which levels is pin bar most effective?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Pin bar is most effective at key support and resistance levels, Fibonacci levels (38.2%, 50%, 61.8%), round numbers, and high volume zones. Patterns without level attachment have low reliability.',
          },
        },
        {
          '@type': 'Question',
          name: 'Where to place stop-loss when trading pin bar?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Stop-loss is placed beyond the long shadow. For bullish pin bar — below shadow minimum, for bearish — above shadow maximum. Recommended risk-to-reward ratio is minimum 1:2.',
          },
        },
        {
          '@type': 'Question',
          name: 'Which timeframes are best for trading pin bars?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Most reliable pin bars form on daily (D1) and four-hour (H4) charts. Lower timeframes (M5, M15) contain significant market noise and false signals.',
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
      name: 'How to Trade Pin Bar',
      step: [
        {
          '@type': 'HowToStep',
          position: 1,
          name: 'Identify trend and key levels',
          text: 'Use moving averages to determine trend direction. Find key support and resistance levels on the chart.',
        },
        {
          '@type': 'HowToStep',
          position: 2,
          name: 'Wait for pin bar formation',
          text: 'Look for a candle with long shadow (at least 2x body size) and small body at a key level.',
        },
        {
          '@type': 'HowToStep',
          position: 3,
          name: 'Confirm the signal',
          text: 'Check trading volume and use RSI to confirm overbought/oversold conditions.',
        },
        {
          '@type': 'HowToStep',
          position: 4,
          name: 'Enter the trade',
          text: 'Aggressive entry — immediately after pin bar close. Conservative — after breakout of high/low by next candle.',
        },
        {
          '@type': 'HowToStep',
          position: 5,
          name: 'Set stop-loss and take-profit',
          text: 'Stop-loss — beyond the long shadow. Take-profit — at nearest support/resistance level. Minimum 1:2 ratio.',
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
      name: 'Pin Bar Terminology Glossary',
      hasDefinedTerm: [
        {
          '@type': 'DefinedTerm',
          name: 'Pin Bar',
          description:
            'Candlestick pattern with long shadow and small body signaling potential price reversal.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Bullish Pin Bar',
          description:
            'Reversal pattern with long lower shadow forming after decline indicating potential upward movement.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Bearish Pin Bar',
          description:
            'Reversal pattern with long upper shadow forming after rally indicating potential downward movement.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Candle Shadow',
          description:
            'Vertical line above or below candle body showing maximum price range for the period.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Candle Body',
          description:
            'Rectangular part of candle between opening and closing prices.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'False Breakout',
          description:
            'Brief price movement beyond a level with subsequent return. Often forms pin bars.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Price Action',
          description:
            'Technical analysis methodology based on studying price movement without indicators.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Level Rejection',
          description:
            'Situation where price tests support or resistance level but fails to break through and reverses.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Pattern Confirmation',
          description:
            'Additional technical signals strengthening the reliability of a trading setup.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Risk/Reward Ratio',
          description:
            'Ratio of potential loss to potential profit in a trade. Minimum 1:2 recommended for pin bars.',
        },
      ],
    };

    this.addJsonLdSchema(data);
  }
}
