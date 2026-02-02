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
  selector: 'app-home-en-blog-twenty-nine',
  templateUrl: './home-en-blog-twenty-nine.component.html',
  styleUrl: './home-en-blog-twenty-nine.component.scss',
})
export class HomeEnBlogTwentyNineComponent implements OnInit {
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
      'Trading for Beginners: Complete Guide 2025 | Arapov.trade',
    );
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.updateTag({
      name: 'description',
      content:
        'Complete trading guide for beginners 2025. Learn how to choose a market, master technical analysis, develop strategies, and start trading from scratch.',
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
          headline:
            'Trading for Beginners: Complete Guide on How to Start Trading in 2025',
          description:
            'Complete trading guide for beginners. Learn how to choose a market, master technical analysis, develop strategies, and start trading from scratch.',
          image:
            'https://arapov.trade/assets/img/content/tradingquickstart1.webp',
          datePublished: '2025-04-15T00:00:00Z',
          dateModified: '2025-12-29T00:00:00Z',
          author: {
            '@id': 'https://arapov.trade/en#person',
          },
          publisher: {
            '@type': 'Organization',
            name: 'Arapov.trade',
            url: 'https://arapov.trade',
            logo: {
              '@type': 'ImageObject',
              url: 'https://arapov.trade/assets/img/favicon.ico',
            },
          },
          mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': 'https://arapov.trade/en/freestudying/tradingquickstart',
          },
          articleSection: 'Trading Education',
          keywords: [
            'trading for beginners',
            'how to start trading',
            'technical analysis',
            'trading strategies',
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
      mainEntity: [
        {
          '@type': 'Question',
          name: 'How much money do I need to start trading?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'You can start trading with as little as $10-50 on cryptocurrency exchanges or $100-200 on Forex. However, for comfortable trading with proper risk management, a starting capital of $500-1000 is recommended.',
          },
        },
        {
          '@type': 'Question',
          name: 'Can I make money trading without experience?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Trading without preparation almost guarantees losses. You need to first learn the basics of technical analysis, test strategies on a demo account, and master risk management.',
          },
        },
        {
          '@type': 'Question',
          name: 'Which market should a beginner choose?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'For beginners, the stock market is optimal due to its stability. The cryptocurrency market suits those ready for high volatility. Forex attracts with low entry barriers and high liquidity.',
          },
        },
        {
          '@type': 'Question',
          name: 'How long does it take to learn trading?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Basic market understanding can be achieved in 2-3 months of active learning. Developing stable skills requires 6 months to 2 years of practice. Professional level is reached after 3-5 years.',
          },
        },
        {
          '@type': 'Question',
          name: 'What is a demo account and why do I need it?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'A demo account is a practice account with virtual money that fully simulates real trading. It allows you to learn the platform and test strategies without risking real funds.',
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
      name: 'How to Start Trading in Financial Markets',
      description: 'Step-by-step guide for beginner traders',
      totalTime: 'P3M',
      estimatedCost: {
        '@type': 'MonetaryAmount',
        currency: 'USD',
        value: '100-500',
      },
      step: [
        {
          '@type': 'HowToStep',
          position: 1,
          name: 'Choose the right market',
          text: 'Determine which market aligns with your goals: stock market for stability, cryptocurrencies for volatility, or Forex for 24/7 trading.',
        },
        {
          '@type': 'HowToStep',
          position: 2,
          name: 'Learn basic terminology',
          text: 'Master key concepts: liquidity, volatility, spread, leverage. Study technical analysis fundamentals.',
        },
        {
          '@type': 'HowToStep',
          position: 3,
          name: 'Open a demo account',
          text: 'Register with a reliable broker and test strategies without risking real money for at least 2-3 months.',
        },
        {
          '@type': 'HowToStep',
          position: 4,
          name: 'Develop a trading strategy',
          text: 'Create your trading plan with clear entry and exit rules. Define risk per trade at 1-2% of deposit.',
        },
        {
          '@type': 'HowToStep',
          position: 5,
          name: 'Transition to real trading',
          text: 'After stable demo results, open a real account with minimum deposit and strictly follow your strategy.',
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
      name: 'Trading Glossary for Beginners',
      hasDefinedTerm: [
        {
          '@type': 'DefinedTerm',
          name: 'Trading',
          description:
            'The process of actively buying and selling financial instruments to profit from price changes.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Liquidity',
          description:
            'The ability of an asset to be quickly bought or sold at market price without significantly affecting its value.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Volatility',
          description:
            'The degree of price variation of an asset over a specific period of time.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Spread',
          description:
            'The difference between the buy price and sell price of an asset.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Leverage',
          description:
            'Borrowed capital that allows trading with amounts exceeding your own capital.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Stop-Loss',
          description:
            'A protective order that automatically closes a position when price reaches a specified loss level.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Technical Analysis',
          description:
            'A method of forecasting price movements based on studying charts and indicators.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Swing Trading',
          description:
            'A trading style where positions are held from several days to several weeks.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Scalping',
          description:
            'A short-term trading strategy with many quick trades aimed at capturing small profits.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Demo Account',
          description:
            'A practice trading account with virtual funds for risk-free learning.',
        },
      ],
    };

    this.addJsonLdSchema(data);
  }
}
