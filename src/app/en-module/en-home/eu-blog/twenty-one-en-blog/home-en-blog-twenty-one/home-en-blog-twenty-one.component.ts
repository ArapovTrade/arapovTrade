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
  selector: 'app-home-en-blog-twenty-one',
  templateUrl: './home-en-blog-twenty-one.component.html',
  styleUrl: './home-en-blog-twenty-one.component.scss',
})
export class HomeEnBlogTwentyOneComponent implements OnInit {
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
      'Market Maker in Trading: Complete Guide | Arapov.trade',
    );
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.updateTag({
      name: 'description',
      content:
        'Market Maker in Trading: who they are, how they operate, and how to use their strategies in your trading. Complete guide by Igor Arapov.',
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
          headline: 'Market Maker in Trading: Complete Guide',
          description:
            'Market Maker in Trading: who they are, how they operate, and how to use their strategies in your trading.',
          image: 'https://arapov.trade/assets/img/content/marketmaker1.webp',
          datePublished: '2026-03-15T00:00:00Z',
          dateModified: '2026-03-22T00:00:00Z',
          author: {
            '@id': 'https://arapov.trade/en#person',
          },
          publisher: {
            '@type': 'Organization',
            name: 'Arapov Trade',
            url: 'https://arapov.trade',
            logo: {
              '@type': 'ImageObject',
              url: 'https://arapov.trade/assets/img/favicon.ico',
            },
          },
          mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': 'https://arapov.trade/en/freestudying/marketmaker',
          },
          articleSection: 'Trading Education',
          keywords: [
            'market maker',
            'liquidity provider',
            'market manipulation',
            'Smart Money',
            'order flow',
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
          name: 'What is a market maker in simple terms?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'A market maker is a major market participant (bank, hedge fund, or specialized firm) that provides liquidity by continuously placing buy and sell orders. Thanks to market makers, traders can execute trades quickly at fair prices without significant slippage.',
          },
        },
        {
          '@type': 'Question',
          name: 'How do market makers make money?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Market makers profit from several sources: the spread between bid and ask prices, rebates from exchanges for providing liquidity, and directional trading based on order flow analysis and informational advantages.',
          },
        },
        {
          '@type': 'Question',
          name: 'Do market makers manipulate the market?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Market makers use various liquidity management techniques that may appear as manipulation: creating false breakouts, stop hunting, and spoofing. However, their primary function is providing liquidity, not manipulating prices against retail traders.',
          },
        },
        {
          '@type': 'Question',
          name: 'How to identify market maker activity on charts?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Signs of market maker activity: volume spikes without price movement, false breakouts with quick reversals, long candle wicks at key levels, unusual activity during low liquidity periods, sudden spread widening.',
          },
        },
        {
          '@type': 'Question',
          name: 'How to trade alongside market makers?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'To trade in the direction of market makers: analyze volume for position accumulation, avoid entries at obvious levels, wait for confirmation after false breakouts, place stops beyond liquidity hunting zones.',
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
      name: 'How to Identify and Trade with Market Maker Activity',
      description:
        'Step-by-step guide to detecting market maker actions and using this information to improve trading results.',
      step: [
        {
          '@type': 'HowToStep',
          position: 1,
          name: 'Volume Analysis',
          text: 'Study volume indicators using Volume Profile and Delta Volume. Look for anomalies: high volume without price movement indicates position accumulation by market makers.',
        },
        {
          '@type': 'HowToStep',
          position: 2,
          name: 'Identify Key Levels',
          text: 'Mark liquidity zones: areas beyond obvious support and resistance levels where retail traders place stop orders.',
        },
        {
          '@type': 'HowToStep',
          position: 3,
          name: 'Watch for False Breakouts',
          text: 'Monitor breakouts of key levels. If price quickly returns to the range after a breakout, it signals liquidity collection by market makers.',
        },
        {
          '@type': 'HowToStep',
          position: 4,
          name: 'Confirm Entry',
          text: 'Wait for confirming signals before entry: candlestick patterns, delta volume changes, level retests without new breakouts.',
        },
        {
          '@type': 'HowToStep',
          position: 5,
          name: 'Position Management',
          text: 'Place stop-losses beyond obvious liquidity zones. Use ATR to calculate safe stop distance.',
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
      name: 'Market Making Terminology Glossary',
      hasDefinedTerm: [
        {
          '@type': 'DefinedTerm',
          name: 'Market Maker',
          description:
            'A major market participant providing liquidity by continuously placing buy and sell orders for assets',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Liquidity',
          description:
            "The market's ability to facilitate quick trade execution without significantly impacting asset price",
        },
        {
          '@type': 'DefinedTerm',
          name: 'Spread',
          description:
            'The difference between the best bid price and best ask price for an asset',
        },
        {
          '@type': 'DefinedTerm',
          name: 'False Breakout',
          description:
            'A short-term price movement beyond a key level followed by quick return to the previous range',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Stop Hunting',
          description:
            'Price movement toward zones of clustered stop orders to trigger them and collect liquidity',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Spoofing',
          description:
            'Placing large fictitious orders to create illusion of demand or supply with subsequent cancellation',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Order Flow',
          description:
            'Analysis of the sequence and volume of market orders to understand participant intentions',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Volume Profile',
          description:
            'An analysis tool displaying volume distribution across price levels over a specific period',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Delta Volume',
          description:
            'The difference between buying and selling volume at a specific price level',
        },
        {
          '@type': 'DefinedTerm',
          name: 'HFT',
          description:
            'High-Frequency Trading using algorithms to execute trades in milliseconds',
        },
      ],
    };

    this.addJsonLdSchema(data);
  }
}
