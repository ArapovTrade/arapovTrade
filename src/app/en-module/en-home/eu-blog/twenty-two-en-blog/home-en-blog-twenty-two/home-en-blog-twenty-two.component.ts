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
  selector: 'app-home-en-blog-twenty-two',
  templateUrl: './home-en-blog-twenty-two.component.html',
  styleUrl: './home-en-blog-twenty-two.component.scss',
})
export class HomeEnBlogTwentyTwoComponent implements OnInit {
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
      'Cryptocurrency Arbitrage: What It Is and How to Profit | Arapov.trade'
    );
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.updateTag({
      name: 'description',
      content:
        'Cryptocurrency arbitrage: complete guide to profiting from price differences between exchanges. Types of arbitrage, strategies, risks and practical examples.',
    });

    this.meta.updateTag({ name: 'author', content: 'Ihor Arapov' });
    this.meta.updateTag({ name: 'datePublished', content: '2025-01-21' });
    this.meta.updateTag({
      property: 'og:image',
      content: '/assets/img/content/cryptoarbitrage.webp',
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
          headline: 'Cryptocurrency Arbitrage: What It Is and How to Profit',
          description:
            'Complete guide to cryptocurrency arbitrage: types, strategies, risks and practical examples',
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
          },
          datePublished: '2025-04-15T00:00:00Z',
          dateModified: '2025-12-19T00:00:00Z',
          mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': 'https://arapov.trade/en/freestudying/cryptoarbitrage',
          },
          image:
            'https://arapov.trade/assets/img/content/cryptoarbitrage1.webp',
          articleSection: 'Trading Education',
          keywords:
            'cryptocurrency arbitrage, crypto arbitrage, cross-exchange arbitrage, triangular arbitrage, crypto trading',
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
          name: 'What is cryptocurrency arbitrage?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Cryptocurrency arbitrage is a strategy of profiting from price differences of the same asset across different exchanges. Traders buy crypto on a platform with lower prices and sell on an exchange with higher prices, earning profit minus fees.',
          },
        },
        {
          '@type': 'Question',
          name: 'What types of crypto arbitrage exist?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Main types include: cross-exchange arbitrage (buying and selling on different exchanges), triangular arbitrage (exchanging through three currencies on one exchange), cross-market arbitrage (spot and futures), and regional arbitrage.',
          },
        },
        {
          '@type': 'Question',
          name: 'How much can you earn from arbitrage?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Typical profit is 0.5-3% per trade. With active trading and substantial capital, monthly returns can reach 5-15%.',
          },
        },
        {
          '@type': 'Question',
          name: 'What risks are associated with crypto arbitrage?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Main risks include: transaction delays, high fees, price volatility, account blocking by exchanges, platform technical failures and regulatory restrictions.',
          },
        },
        {
          '@type': 'Question',
          name: 'Are bots necessary for arbitrage?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Bots significantly increase efficiency by automating opportunity detection and trade execution. However, beginners should first master manual arbitrage to understand the process mechanics.',
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
      name: 'How to Start Earning from Cryptocurrency Arbitrage',
      description: 'Step-by-step guide to crypto arbitrage',
      step: [
        {
          '@type': 'HowToStep',
          position: 1,
          name: 'Register on exchanges',
          text: 'Create accounts on several reliable exchanges and complete verification. Use at least 3-5 platforms.',
        },
        {
          '@type': 'HowToStep',
          position: 2,
          name: 'Fund your accounts',
          text: 'Distribute capital across exchanges. Keep funds in stablecoins (USDT, USDC) for quick response.',
        },
        {
          '@type': 'HowToStep',
          position: 3,
          name: 'Set up price monitoring',
          text: 'Use price tracking tools (CoinGecko, CoinMarketCap) or specialized arbitrage scanners.',
        },
        {
          '@type': 'HowToStep',
          position: 4,
          name: 'Calculate fees',
          text: 'Account for all costs: trading fees, deposits and withdrawals, network fees.',
        },
        {
          '@type': 'HowToStep',
          position: 5,
          name: 'Execute the trade',
          text: 'When finding a profitable opportunity, quickly buy on one exchange and sell on another.',
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
      name: 'Cryptocurrency Arbitrage Glossary',
      hasDefinedTerm: [
        {
          '@type': 'DefinedTerm',
          name: 'Arbitrage',
          description:
            'Strategy of profiting from price differences of the same asset on different markets',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Cross-exchange arbitrage',
          description:
            'Buying cryptocurrency on one exchange and selling on another with higher price',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Triangular arbitrage',
          description:
            'Sequential exchange of three currencies on one exchange to extract profit from rate discrepancies',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Spread',
          description: 'Difference between buy and sell price of an asset',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Liquidity',
          description:
            'Ability to quickly buy or sell an asset without significantly affecting price',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Stablecoin',
          description:
            'Cryptocurrency with value pegged to a stable asset like USD',
        },
        {
          '@type': 'DefinedTerm',
          name: 'DEX',
          description:
            'Decentralized exchange without intermediaries or central control',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Arbitrage bot',
          description:
            'Software for automated detection and execution of arbitrage trades',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Slippage',
          description:
            'Difference between expected and actual order execution price',
        },
        {
          '@type': 'DefinedTerm',
          name: 'P2P arbitrage',
          description:
            'Arbitrage using peer-to-peer platforms for buying and selling cryptocurrency',
        },
      ],
    };

    this.addJsonLdSchema(data);
  }
}
