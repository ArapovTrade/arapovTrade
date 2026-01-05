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
  selector: 'app-home-en-blog-twenty-five',
  templateUrl: './home-en-blog-twenty-five.component.html',
  styleUrl: './home-en-blog-twenty-five.component.scss',
})
export class HomeEnBlogTwentyFiveComponent implements OnInit {
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
      'Market Makers in Cryptocurrency Trading | Role and Functions'
    );
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.updateTag({
      name: 'description',
      content:
        'Complete guide to market makers in cryptocurrency markets. Learn how they provide liquidity, reduce volatility, and impact crypto trading.',
    });

    this.meta.updateTag({ name: 'author', content: 'Ihor Arapov' });
    this.meta.updateTag({ name: 'datePublished', content: '2025-01-22' });
    this.meta.updateTag({
      property: 'og:image',
      content: '/assets/img/content/cryptommakers.webp',
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
          headline:
            'Market Makers in Cryptocurrency Markets: Role and Functions',
          description:
            'Complete guide to market makers in cryptocurrency markets. Learn how they provide liquidity, reduce volatility, and impact crypto trading.',
          author: {
            '@id': 'https://arapov.trade/en#person',
          },
          publisher: {
            '@type': 'Organization',
            name: 'Arapov Trade',
            logo: {
              '@type': 'ImageObject',
              url: 'https://arapov.trade/assets/img/favicon.ico',
            },
          },
          datePublished: '2025-04-15T00:00:00Z',
          dateModified: '2025-12-12T00:00:00Z',
          image: ['https://arapov.trade/assets/img/content/cryptommakers.webp'],
          mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': 'https://arapov.trade/en/freestudying/cryptommakers',
          },
          articleSection: 'Cryptocurrency',
          keywords: [
            'market maker',
            'cryptocurrency',
            'liquidity',
            'spread',
            'DEX',
            'CEX',
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
          name: 'What are market makers in cryptocurrency?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Market makers are professional market participants who provide liquidity by continuously placing buy and sell orders. They create conditions for fast trade execution, minimize spreads, and stabilize prices on cryptocurrency exchanges.',
          },
        },
        {
          '@type': 'Question',
          name: 'How do market makers earn money in crypto?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Market makers earn from the spread — the difference between buy and sell prices. They buy assets at lower prices (bid) and sell at higher prices (ask). They may also receive fees from exchanges for providing liquidity.',
          },
        },
        {
          '@type': 'Question',
          name: 'What is the difference between market makers on CEX and DEX?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'On centralized exchanges (CEX), market makers work through order books, placing limit orders. On decentralized exchanges (DEX), they provide liquidity through liquidity pools, adding assets to smart contracts for automatic swaps.',
          },
        },
        {
          '@type': 'Question',
          name: 'What risks are associated with market making?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Key risks include market volatility, algorithm technical failures, regulatory changes, and competition. In illiquid markets, market makers also face risk of significant losses during sharp price movements.',
          },
        },
        {
          '@type': 'Question',
          name: 'Why are market makers important for new tokens?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Market makers are critically important for new tokens as they provide initial liquidity. Without them, new projects suffer from wide spreads, low trading volumes, and high volatility, which discourages traders and investors.',
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
      name: 'How Market Makers Work in Crypto Markets',
      description:
        'Key stages of market maker operations in cryptocurrency markets',
      step: [
        {
          '@type': 'HowToStep',
          position: 1,
          name: 'Market Conditions Analysis',
          text: 'Market makers analyze trading volumes, spreads, volatility, and current trends to determine optimal strategy.',
        },
        {
          '@type': 'HowToStep',
          position: 2,
          name: 'Two-sided Order Placement',
          text: 'Buy (bid) and sell (ask) orders are placed simultaneously, creating liquidity for other market participants.',
        },
        {
          '@type': 'HowToStep',
          position: 3,
          name: 'Algorithmic Management',
          text: 'Algorithms automatically adjust orders in real-time, responding to changing market conditions.',
        },
        {
          '@type': 'HowToStep',
          position: 4,
          name: 'Risk Management',
          text: 'Hedging strategies, stop-loss orders, and position limits are applied to protect against losses.',
        },
        {
          '@type': 'HowToStep',
          position: 5,
          name: 'Position Balancing',
          text: 'Market makers continuously rebalance their positions to maintain market direction neutrality.',
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
      name: 'Market Making Terminology',
      description: 'Essential terms for cryptocurrency market making',
      hasDefinedTerm: [
        {
          '@type': 'DefinedTerm',
          name: 'Market Maker',
          description:
            'Market participant providing liquidity through continuous buy and sell order placement',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Spread',
          description:
            'Difference between best buy price (bid) and best sell price (ask)',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Liquidity',
          description:
            "Market's ability to provide fast trade execution without significant price impact",
        },
        {
          '@type': 'DefinedTerm',
          name: 'CEX',
          description:
            'Centralized Exchange — exchange with order book and custodial asset storage',
        },
        {
          '@type': 'DefinedTerm',
          name: 'DEX',
          description:
            'Decentralized Exchange — exchange based on smart contracts',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Liquidity Pool',
          description:
            'Smart contract with locked assets for automatic token swaps',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Slippage',
          description:
            'Difference between expected and actual trade execution price',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Order Book',
          description: 'List of all active buy and sell orders for an asset',
        },
        {
          '@type': 'DefinedTerm',
          name: 'HFT',
          description:
            'High-Frequency Trading — algorithmic trading at millisecond speeds',
        },
        {
          '@type': 'DefinedTerm',
          name: 'AMM',
          description:
            'Automated Market Maker — algorithm-based market maker using mathematical formulas',
        },
      ],
    };

    this.addJsonLdSchema(data);
  }
}
