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
  selector: 'app-home-en-blog-fourty-three',
  templateUrl: './home-en-blog-fourty-three.component.html',
  styleUrl: './home-en-blog-fourty-three.component.scss',
})
export class HomeEnBlogFourtyThreeComponent implements OnInit {
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
      'Supply and Demand in Cryptocurrencies | Complete Guide'
    );
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.updateTag({
      name: 'description',
      content:
        'How to analyze supply and demand in the cryptocurrency market. Learn methods to assess market forces, trading volume, order book analysis, and strategies for profitable crypto trading.',
    });
    this.meta.updateTag({ name: 'author', content: 'Igor Arapov' });
    this.meta.updateTag({ name: 'datePublished', content: '2025-01-25' });
    this.meta.updateTag({
      property: 'og:image',
      content: '/assets/img/content/cryptomarketanalysis.png',
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
            '@id': 'https://arapov.trade/en/freestudying/cryptomarketanalysis',
          },
          headline:
            'Supply and Demand in Cryptocurrencies: Complete Guide to Market Analysis',
          description:
            'How to analyze supply and demand in the cryptocurrency market. Learn methods to assess market forces, trading volume, order book analysis, and strategies for profitable crypto trading.',
          image:
            'https://arapov.trade/assets/img/content/cryptomarketanalysis1.webp',
          author: {
            '@type': 'Person',
            name: 'Igor Arapov',
            url: 'https://arapov.trade/en',
            sameAs: [
              'https://www.youtube.com/@ArapovTrade',
              'https://t.me/ArapovTrade',
            ],
          },
          publisher: {
            '@type': 'Organization',
            name: 'ArapovTrade',
            logo: {
              '@type': 'ImageObject',
              url: 'https://arapov.trade/assets/img/favicon.ico',
            },
          },
          datePublished: '2025-04-15T00:00:00Z',
          dateModified: '2025-12-29T00:00:00Z',
          articleBody:
            'The cryptocurrency market operates on fundamental economic principles where the interaction between buyers and sellers determines the price of every digital asset...',
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
          name: 'What is supply and demand in the crypto market?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: "Demand represents buyers' willingness to purchase cryptocurrency at a specific price, while supply is the quantity of coins holders are willing to sell. The balance of these forces determines the current market price of an asset.",
          },
        },
        {
          '@type': 'Question',
          name: 'How is trading volume related to supply and demand?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Trading volume shows the intensity of market activity. Rising volume during price increases confirms strong demand, while high volume during price drops indicates seller dominance and excess supply.',
          },
        },
        {
          '@type': 'Question',
          name: 'What tools are used to analyze supply and demand balance?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Traders use order books to view orders, cluster volume analysis, OBV and A/D indicators, market profile, and data on cryptocurrency flows between wallets and exchanges.',
          },
        },
        {
          '@type': 'Question',
          name: 'Why does limited supply affect cryptocurrency prices?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: "Limited supply, like Bitcoin's 21 million coin cap, creates scarcity. When demand increases with fixed supply, prices inevitably rise according to basic economic law.",
          },
        },
        {
          '@type': 'Question',
          name: 'How do whale actions affect market balance?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Large holders (whales) can dramatically shift the supply and demand balance. Mass selling creates an oversupply and pushes prices down, while large purchases absorb supply and drive prices up.',
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
      name: 'How to Analyze Supply and Demand in the Crypto Market',
      description:
        'Step-by-step guide to assessing buyer and seller balance for trading decisions',
      step: [
        {
          '@type': 'HowToStep',
          position: 1,
          name: 'Study the Order Book',
          text: 'Open the order book on your exchange and analyze the ratio of buy and sell orders. Large order clusters indicate significant price levels.',
        },
        {
          '@type': 'HowToStep',
          position: 2,
          name: 'Analyze Trading Volume',
          text: 'Compare price dynamics with volume. Price increases on high volume confirm demand strength, while declining volume during rallies warns of weak momentum.',
        },
        {
          '@type': 'HowToStep',
          position: 3,
          name: 'Identify Key Levels',
          text: 'Find support zones where buyers actively defend price, and resistance zones where sellers create pressure. These levels reflect the balance of power.',
        },
        {
          '@type': 'HowToStep',
          position: 4,
          name: 'Track Cryptocurrency Flows',
          text: 'Monitor coin movement between wallets and exchanges. Inflows to exchanges signal readiness to sell, while outflows indicate accumulation.',
        },
        {
          '@type': 'HowToStep',
          position: 5,
          name: 'Consider Market Sentiment',
          text: 'Analyze the fear and greed index, social media activity, and news background. Participant emotions amplify supply and demand imbalances.',
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
      name: 'Cryptocurrency Supply and Demand Analysis Terms',
      description: 'Key concepts for understanding market dynamics',
      hasDefinedTerm: [
        {
          '@type': 'DefinedTerm',
          name: 'Order Book',
          description:
            'A list displaying all current buy and sell orders with price and volume information',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Liquidity',
          description:
            "The market's ability to facilitate quick trade execution without significant price impact",
        },
        {
          '@type': 'DefinedTerm',
          name: 'Whales',
          description:
            'Large cryptocurrency holders whose trades can significantly influence market price',
        },
        {
          '@type': 'DefinedTerm',
          name: 'On-chain Analysis',
          description:
            'Study of blockchain data to assess network activity, fund flows, and participant behavior',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Cluster Volume Analysis',
          description:
            'Method of visualizing trading activity at each price level to identify accumulation zones',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Fear and Greed Index',
          description:
            "Market sentiment indicator measuring participants' emotional state on a scale from 0 to 100",
        },
        {
          '@type': 'DefinedTerm',
          name: 'Halving',
          description:
            'Reduction by half of miner rewards, decreasing new coin issuance rate and affecting supply',
        },
        {
          '@type': 'DefinedTerm',
          name: 'DeFi',
          description:
            'Decentralized finance — ecosystem of financial applications on blockchain without intermediaries',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Staking',
          description:
            'Locking cryptocurrency to support network operations while earning rewards, affecting available supply',
        },
      ],
    };

    this.addJsonLdSchema(data);
  }
}
