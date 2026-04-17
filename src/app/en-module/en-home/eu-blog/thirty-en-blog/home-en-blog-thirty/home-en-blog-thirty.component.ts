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
  selector: 'app-home-en-blog-thirty',
  templateUrl: './home-en-blog-thirty.component.html',
  styleUrl: './home-en-blog-thirty.component.scss',
})
export class HomeEnBlogThirtyComponent implements OnInit {
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
      'Cryptocurrency Trading: Complete Beginner`s Guide | Arapov.trade',
    );
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.updateTag({
      name: 'description',
      content:
        'Complete cryptocurrency trading guide for beginners: blockchain technology, Bitcoin, Ethereum, exchange selection, risk management strategies and trading fundamentals.',
    });
    this.meta.updateTag({ name: 'datePublished', content: '2025-04-02' });
    this.meta.updateTag({ name: 'dateModified', content: '2026-04-15' });
    this.meta.updateTag({
      property: 'og:image',
      content: '/assets/img/content/cryptocurrencybasics.webp',
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
          headline: "Cryptocurrency Trading: Complete Beginner's Guide",
          description:
            'Complete cryptocurrency trading guide for beginners: blockchain technology, Bitcoin, Ethereum, exchange selection, risk management strategies and trading fundamentals.',
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
          datePublished: '2026-03-25T00:00:00Z',
          dateModified: '2026-04-15T00:00:00Z',
          mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': 'https://arapov.trade/en/freestudying/cryptocurrencybasics',
          },
          image:
            'https://arapov.trade/assets/img/content/cryptocurrencybasics1.webp',
          articleSection: 'Trading Education',
          keywords: 'cryptocurrency, trading, blockchain, Bitcoin, Ethereum',
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
          name: 'How much money do I need to start trading cryptocurrency?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Most exchanges allow you to start with as little as $10. Demo accounts provide risk-free practice environments where you can learn trading mechanics using virtual funds before committing real capital.',
          },
        },
        {
          '@type': 'Question',
          name: 'Which cryptocurrencies are best for beginners?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Bitcoin (BTC) and Ethereum (ETH) are optimal choices for newcomers due to their high liquidity and market stability. Stablecoins like USDT and USDC help preserve capital during volatile periods.',
          },
        },
        {
          '@type': 'Question',
          name: 'Is it safe to keep cryptocurrency on an exchange?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Exchange storage is convenient for active trading but carries hacking risks. For long-term holdings, hardware wallets like Ledger or Trezor provide superior security by storing private keys offline.',
          },
        },
        {
          '@type': 'Question',
          name: 'What is volatility and why does it matter in crypto?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: "Volatility measures price fluctuation intensity. Cryptocurrency's high volatility creates profit opportunities through price swings but also increases risk. Traders use volatility for short-term gains while managing exposure through position sizing.",
          },
        },
        {
          '@type': 'Question',
          name: 'How can I protect my crypto assets from theft?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Enable two-factor authentication on all platforms, never share private keys, store significant holdings in hardware wallets, avoid suspicious links and phishing attempts, and use unique strong passwords for each service.',
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
      name: 'How to Start Trading Cryptocurrency',
      description: 'Step-by-step guide for beginner cryptocurrency traders',
      step: [
        {
          '@type': 'HowToStep',
          position: 1,
          name: 'Learn the fundamentals',
          text: 'Study blockchain technology, wallet types, order mechanics, and basic technical analysis. Free resources like Binance Academy and CoinGecko Learn provide comprehensive educational content.',
        },
        {
          '@type': 'HowToStep',
          position: 2,
          name: 'Choose a reputable exchange',
          text: 'Compare trading fees, available instruments, security measures, and user reviews. Consider regulatory compliance and supported payment methods in your jurisdiction.',
        },
        {
          '@type': 'HowToStep',
          position: 3,
          name: 'Set up security measures',
          text: 'Enable two-factor authentication, create strong unique passwords, and consider purchasing a hardware wallet for long-term storage of significant holdings.',
        },
        {
          '@type': 'HowToStep',
          position: 4,
          name: 'Develop a trading plan',
          text: 'Define your financial goals, acceptable risk levels, entry and exit strategies. Implement the 2% rule: never risk more than 2% of your trading capital on a single position.',
        },
        {
          '@type': 'HowToStep',
          position: 5,
          name: 'Practice with small amounts',
          text: 'Start with demo accounts or minimal capital to understand market mechanics and your emotional responses. Scale up gradually as your skills and confidence develop.',
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
      name: 'Cryptocurrency Trading Glossary',
      description: 'Essential terms and concepts for cryptocurrency trading',
      hasDefinedTerm: [
        {
          '@type': 'DefinedTerm',
          name: 'Cryptocurrency',
          description:
            'A digital asset using cryptographic protocols for secure transactions and controlled creation of new units',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Blockchain',
          description:
            'A distributed ledger technology consisting of sequential blocks, each containing transaction data and linked to the previous block through cryptographic hashes',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Bitcoin',
          description:
            'The first decentralized cryptocurrency, created in 2009 with a maximum supply capped at 21 million coins',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Volatility',
          description:
            'A statistical measure indicating the degree of price variation over a specific time period',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Stop-loss',
          description:
            'A protective order that automatically closes a position when a predetermined loss level is reached',
        },
        {
          '@type': 'DefinedTerm',
          name: 'HODL',
          description:
            'A long-term holding strategy maintaining cryptocurrency positions regardless of market fluctuations',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Altcoin',
          description:
            'Any cryptocurrency other than Bitcoin, often offering unique technical features or use cases',
        },
        {
          '@type': 'DefinedTerm',
          name: 'DeFi',
          description:
            'Decentralized Finance - an ecosystem of blockchain-based financial applications operating without intermediaries',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Private key',
          description:
            'A secret cryptographic code providing complete access to a cryptocurrency wallet',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Smart contract',
          description:
            'Self-executing code on a blockchain that automatically enforces agreement terms without intermediaries',
        },
      ],
    };

    this.addJsonLdSchema(data);
  }
}
