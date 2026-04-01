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
  selector: 'app-home-en-blog-fourty-two',
  templateUrl: './home-en-blog-fourty-two.component.html',
  styleUrl: './home-en-blog-fourty-two.component.scss',
})
export class HomeEnBlogFourtyTwoComponent implements OnInit {
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
      'Cryptocurrency Risks for Beginners: How to Protect Your Capital | Arapov.trade',
    );
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.updateTag({
      name: 'description',
      content:
        'Cryptocurrency risks for beginners: volatility, scams, technical threats. Practical methods to protect capital and trade digital assets safely.',
    });
    this.meta.updateTag({ name: 'datePublished', content: '2025-04-03' });
    this.meta.updateTag({
      property: 'og:image',
      content: '/assets/img/content/cryptocurrencyrisks.webp',
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
          headline:
            'Cryptocurrency Risks for Beginners: How to Protect Your Capital',
          description:
            'Comprehensive analysis of cryptocurrency market risks: volatility, fraud, regulatory threats. Practical methods to protect investments and trade safely.',
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
          dateModified: '2026-03-31T00:00:00Z',
          image:
            'https://arapov.trade/assets/img/content/cryptocurrencyrisks1.webp',
          mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': 'https://arapov.trade/en/freestudying/cryptocurrencyrisks',
          },
          articleSection: 'Cryptocurrency',
          keywords: [
            'cryptocurrency risks',
            'volatility',
            'scams',
            'security',
            'capital protection',
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
          name: 'What are the main cryptocurrency risks for beginners?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Main risks include high price volatility, fraud and phishing, exchange technical failures, loss of wallet access, lack of regulation, and unpredictable legislation. Each of these factors can lead to complete loss of investments.',
          },
        },
        {
          '@type': 'Question',
          name: 'How to protect cryptocurrency from scammers?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Use hardware wallets for storage, enable two-factor authentication, verify website URLs, never share private keys, avoid suspicious projects with unrealistic promises, and store your seed phrase in a secure offline location.',
          },
        },
        {
          '@type': 'Question',
          name: 'Why are cryptocurrencies so volatile?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Volatility is driven by speculative market nature, low liquidity of many tokens, influence of news and public statements, actions of large holders (whales), lack of centralized regulation, and overall market immaturity.',
          },
        },
        {
          '@type': 'Question',
          name: 'How much money is safe to invest in cryptocurrency?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Only invest funds you can afford to lose. Beginners should start with 5-10% of their investment portfolio. Never use borrowed money or funds needed for daily expenses.',
          },
        },
        {
          '@type': 'Question',
          name: 'What is a pump and dump scheme in cryptocurrency?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Pump and dump is a manipulative scheme where organizers artificially inflate the price of an obscure token through false advertising, attract investors, then sell their holdings at the peak, crashing the price and leaving others with losses.',
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
      name: 'How to Minimize Risks When Trading Cryptocurrency',
      description:
        'Step-by-step guide to protecting capital in the cryptocurrency market',
      step: [
        {
          '@type': 'HowToStep',
          position: 1,
          name: 'Learn market fundamentals',
          text: 'Master blockchain principles, cryptocurrency types, and trading mechanisms before investing.',
        },
        {
          '@type': 'HowToStep',
          position: 2,
          name: 'Choose a reliable platform',
          text: 'Use established exchanges with good reputation, two-factor authentication, and insurance funds.',
        },
        {
          '@type': 'HowToStep',
          position: 3,
          name: 'Ensure secure storage',
          text: 'Transfer large amounts to hardware wallets, store seed phrase offline in multiple locations.',
        },
        {
          '@type': 'HowToStep',
          position: 4,
          name: 'Diversify your portfolio',
          text: "Distribute capital across multiple assets, don't invest more than 10% in any single token.",
        },
        {
          '@type': 'HowToStep',
          position: 5,
          name: 'Use protective tools',
          text: 'Set stop-losses, define maximum acceptable loss, and follow your trading plan.',
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
      name: 'Cryptocurrency Risk Glossary',
      hasDefinedTerm: [
        {
          '@type': 'DefinedTerm',
          name: 'Volatility',
          description:
            'Degree of price variation of an asset over a specific time period',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Pump and Dump',
          description:
            'Manipulative scheme of artificially inflating price followed by selling at peak',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Phishing',
          description:
            'Fraudulent technique to obtain confidential data through fake websites and messages',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Private Key',
          description:
            'Secret cryptographic code providing full access to a cryptocurrency wallet',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Seed Phrase',
          description:
            'Set of words used to recover access to a cryptocurrency wallet',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Hardware Wallet',
          description:
            'Physical device for secure offline storage of cryptocurrencies',
        },
        {
          '@type': 'DefinedTerm',
          name: 'KYC',
          description:
            'Know Your Customer verification procedure on cryptocurrency exchanges',
        },
        {
          '@type': 'DefinedTerm',
          name: 'DeFi',
          description:
            'Decentralized Finance, blockchain-based financial services without intermediaries',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Stop-Loss',
          description:
            'Automatic order to sell an asset when it reaches a specified loss level',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Liquidity',
          description:
            'Ability of an asset to be sold quickly without significantly affecting its price',
        },
      ],
    };

    this.addJsonLdSchema(data);
  }
}
