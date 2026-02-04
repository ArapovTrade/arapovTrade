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
  selector: 'app-home-en-blog-six',
  templateUrl: './home-en-blog-six.component.html',
  styleUrl: './home-en-blog-six.component.scss',
})
export class HomeEnBlogSixComponent implements OnInit {
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
      'Smart Money Trading: How Institutional Players Move Markets | Arapov.trade',
    );
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.updateTag({
      name: 'description',
      content:
        'Smart Money Trading Guide: Learn how institutional traders control market movements. Discover liquidity zones, order blocks, Wyckoff methodology, and strategies to trade alongside big players.',
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
          '@id': 'https://arapov.trade/en/freestudying/smartestmoney#article',
          headline:
            'Smart Money Trading: How Institutional Players Move Markets',
          description:
            'Comprehensive guide to Smart Money concepts in trading. Learn how institutional traders control price movements, manage liquidity, and create market patterns.',
          image: {
            '@type': 'ImageObject',
            url: 'https://arapov.trade/assets/img/content/smartestmoney1.webp',
            width: 1200,
            height: 630,
          },
          author: { '@id': 'https://arapov.trade/en#person' },
          publisher: {
            '@type': 'Organization',
            name: 'Arapov.trade',
            logo: {
              '@type': 'ImageObject',
              url: 'https://arapov.trade/assets/img/favicon.ico',
            },
          },
          datePublished: '2025-04-15T00:00:00Z',
          dateModified: '2025-12-29T00:00:00Z',
          mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': 'https://arapov.trade/en/freestudying/smartestmoney',
          },
          articleSection: 'Trading Education',
          keywords: [
            'Smart Money',
            'institutional trading',
            'liquidity',
            'order blocks',
            'Wyckoff',
          ],
          wordCount: 1420,
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
      '@id': 'https://arapov.trade/en/freestudying/smartestmoney#faq',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'What does Smart Money mean in trading?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Smart Money refers to capital controlled by institutional market participants: investment banks, hedge funds, and market makers. They possess substantial resources and the ability to influence price movements through liquidity management.',
          },
        },
        {
          '@type': 'Question',
          name: 'How do institutional traders manipulate markets?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Institutions use fake breakouts, stop hunts, and liquidity grabs. These tactics allow them to accumulate positions at favorable prices before initiating trend movements.',
          },
        },
        {
          '@type': 'Question',
          name: 'What is an order block in trading?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'An order block is the last candle of opposite direction before an impulsive move. It marks where large capital entered the market, and price often returns to these zones for retesting.',
          },
        },
        {
          '@type': 'Question',
          name: 'What are the Wyckoff market phases?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Wyckoff methodology identifies four phases: accumulation (buying at low prices), markup (uptrend), distribution (selling at high prices), and markdown (downtrend).',
          },
        },
        {
          '@type': 'Question',
          name: 'How to avoid Smart Money traps?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Use volume analysis to identify fake breakouts, wait for confirmation before entering, analyze higher timeframes, and place stop-losses at safe distances from obvious levels.',
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
      '@id': 'https://arapov.trade/en/freestudying/smartestmoney#howto',
      name: 'How to Trade Using Smart Money Concepts',
      description:
        'Step-by-step guide to applying Smart Money concepts in trading',
      step: [
        {
          '@type': 'HowToStep',
          position: 1,
          name: 'Identify zones of interest',
          text: 'Locate high liquidity areas: support and resistance levels, stop-loss clusters, and order blocks.',
        },
        {
          '@type': 'HowToStep',
          position: 2,
          name: 'Analyze price behavior',
          text: 'Monitor fake breakouts, abnormal volumes, and price reactions at key levels. Determine the Wyckoff market phase.',
        },
        {
          '@type': 'HowToStep',
          position: 3,
          name: 'Find confirmation signals',
          text: 'Use candlestick patterns, volume analysis, and lower timeframe price action to filter false signals.',
        },
        {
          '@type': 'HowToStep',
          position: 4,
          name: 'Enter the position',
          text: 'After confirming direction, enter the trade with a clear stop-loss and take-profit plan.',
        },
        {
          '@type': 'HowToStep',
          position: 5,
          name: 'Manage the trade',
          text: 'Take profits at target levels or when market structure changes. Maintain discipline throughout.',
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
      '@id': 'https://arapov.trade/en/freestudying/smartestmoney#terms',
      name: 'Smart Money Trading Terms',
      hasDefinedTerm: [
        {
          '@type': 'DefinedTerm',
          name: 'Smart Money',
          description:
            'Capital of institutional market participants: banks, hedge funds, and market makers capable of influencing price movements.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Liquidity',
          description:
            'Volume of available buy and sell orders. High liquidity zones attract large players.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Order Block',
          description:
            'The last candle of opposite direction before an impulsive move, marking the entry zone of large capital.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Fake Breakout',
          description:
            'A brief price move beyond support or resistance followed by quick reversal.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Imbalance',
          description:
            'Difference between supply and demand manifested in sharp price movement without pullbacks.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Accumulation',
          description:
            'Market phase where large players secretly buy assets at low prices before an upward move.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Distribution',
          description:
            'Market phase where institutions sell accumulated assets to retail traders at high prices.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Stop Hunt',
          description:
            'Artificial price movement designed to trigger stop-loss orders of retail traders.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Wyckoff Method',
          description:
            'Market analysis concept describing accumulation and distribution cycles driven by large capital.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Market Maker',
          description:
            'Large market participant providing liquidity and capable of influencing price direction.',
        },
      ],
    };

    this.addJsonLdSchema(data);
  }
}
