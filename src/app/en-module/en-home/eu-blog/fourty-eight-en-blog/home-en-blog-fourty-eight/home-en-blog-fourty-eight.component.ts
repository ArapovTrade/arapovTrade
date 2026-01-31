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
  selector: 'app-home-en-blog-fourty-eight',
  templateUrl: './home-en-blog-fourty-eight.component.html',
  styleUrl: './home-en-blog-fourty-eight.component.scss',
})
export class HomeEnBlogFourtyEightComponent implements OnInit {
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
      'Self-Learning Trading: Complete Guide for Beginners | Igor Arapov',
    );
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.updateTag({
      name: 'description',
      content:
        'Complete guide to self-learning trading: from basic concepts to professional strategies. Practical advice for aspiring traders starting from scratch.',
    });
    this.meta.updateTag({ name: 'datePublished', content: '2025-04-03' });
    this.meta.updateTag({
      property: 'og:image',
      content: '/assets/img/content/selfstudying.webp',
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
          '@id': 'https://arapov.trade/en/freestudying/selfstudying#article',
          headline: 'Self-Learning Trading: Complete Guide for Beginners',
          description:
            'Complete guide to self-learning trading: from basic concepts to professional strategies. Practical advice for aspiring traders starting from scratch.',
          image: 'https://arapov.trade/assets/img/content/selfstudying1.webp',
          datePublished: '2025-04-15T00:00:00Z',
          dateModified: '2025-12-29T00:00:00Z',
          author: {
            '@id': 'https://arapov.trade/en#person',
          },
          publisher: {
            '@type': 'Organization',
            '@id': 'https://arapov.trade/#organization',
            name: 'Arapov Trade',
            url: 'https://arapov.trade',
            logo: {
              '@type': 'ImageObject',
              url: 'https://arapov.trade/assets/img/favicon.ico',
            },
          },
          mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': 'https://arapov.trade/en/freestudying/selfstudying',
          },
          articleSection: 'Trading Education',
          keywords: [
            'self-learning',
            'trading for beginners',
            'how to start trading',
            'demo account',
            'risk management',
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
      '@id': 'https://arapov.trade/en/freestudying/selfstudying#faq',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'Is it possible to learn trading on your own without courses?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes, self-learning trading is entirely possible with a systematic approach. Many successful traders started exactly this way. Key elements include: studying terminology, mastering market analysis, extensive practice on a demo account, and gradual transition to real trading with minimal capital.',
          },
        },
        {
          '@type': 'Question',
          name: 'How long does it take to learn trading?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: "Basic skills can be acquired in 3-6 months of intensive study. However, achieving consistent profitability typically requires 1-2 years of practical trading. Learning speed depends on the time you're willing to dedicate to studying the market and analyzing your trades.",
          },
        },
        {
          '@type': 'Question',
          name: 'How much money should I start trading with?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: "It's recommended to start with an amount you can afford to lose — typically $100-500. First, practice your strategy on a demo account for at least 1-2 months, then transition to a real account with minimal deposit, risking no more than 1-2% of capital per trade.",
          },
        },
        {
          '@type': 'Question',
          name: 'Which market should beginners choose?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'For beginners, the Forex market is optimal due to high liquidity, low spreads, and abundance of educational materials. Popular currency pairs like EUR/USD have predictable movements. After mastering Forex, you can move to the stock market or cryptocurrencies.',
          },
        },
        {
          '@type': 'Question',
          name: 'How to control emotions while trading?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: "Emotional control is achieved through strict adherence to a trading plan, mandatory use of stop-losses, limiting daily losses, and regular breaks. It's important to keep a trading journal to analyze mistakes and avoid trading when stressed or after a series of losing trades.",
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
      '@id': 'https://arapov.trade/en/freestudying/selfstudying#howto',
      name: 'How to Learn Trading on Your Own',
      description:
        'Step-by-step guide to mastering trading without paid courses',
      totalTime: 'P6M',
      estimatedCost: {
        '@type': 'MonetaryAmount',
        currency: 'USD',
        value: '100-500',
      },
      step: [
        {
          '@type': 'HowToStep',
          position: 1,
          name: 'Learn basic terminology',
          text: 'Master key concepts: long, short, spread, liquidity, volatility, margin, leverage. Create your own glossary of terms with definitions and examples.',
          url: 'https://arapov.trade/en/freestudying/selfstudying#terminology',
        },
        {
          '@type': 'HowToStep',
          position: 2,
          name: 'Master market analysis methods',
          text: 'Study technical analysis (charts, indicators, support and resistance levels) and fundamental analysis (economic indicators, news, company reports).',
          url: 'https://arapov.trade/en/freestudying/selfstudying#analysis',
        },
        {
          '@type': 'HowToStep',
          position: 3,
          name: 'Choose your market and instruments',
          text: 'Decide on a market (Forex, stocks, cryptocurrencies) and specific instruments for trading. Start with one market and the most liquid assets.',
          url: 'https://arapov.trade/en/freestudying/selfstudying#markets',
        },
        {
          '@type': 'HowToStep',
          position: 4,
          name: 'Practice on a demo account',
          text: 'Open a demo account with a reliable broker and practice strategies without risking real money for at least 1-2 months until achieving consistent results.',
          url: 'https://arapov.trade/en/freestudying/selfstudying#demo',
        },
        {
          '@type': 'HowToStep',
          position: 5,
          name: 'Transition to real trading',
          text: 'Start trading with minimal deposit, strictly following risk management (1-2% per trade). Keep a trading journal and regularly analyze your results.',
          url: 'https://arapov.trade/en/freestudying/selfstudying#real-trading',
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
      '@id': 'https://arapov.trade/en/freestudying/selfstudying#terms',
      name: 'Trading Terms',
      hasDefinedTerm: [
        {
          '@type': 'DefinedTerm',
          name: 'Long Position',
          description:
            'Opening a buy position on an asset expecting its price to rise',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Short Position',
          description:
            'Opening a sell position on an asset expecting its price to fall',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Liquidity',
          description:
            'The ability of an asset to be quickly bought or sold without significant price change',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Spread',
          description:
            'The difference between the buy price (Ask) and sell price (Bid) of an asset',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Volatility',
          description:
            'A measure of price variability of an asset over a specific period',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Stop-Loss',
          description:
            'A protective order for automatically closing a losing position when a specified level is reached',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Take-Profit',
          description:
            'An order for automatically locking in profit when a target price is reached',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Demo Account',
          description:
            'A practice trading account with virtual money for developing skills without risk',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Risk Management',
          description:
            'A system for managing trading risks to protect capital from significant losses',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Trading Plan',
          description:
            'A document with trading rules including strategy, capital management, and entry/exit criteria',
        },
      ],
    };

    this.addJsonLdSchema(data);
  }
}
