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
  selector: 'app-home-en-blog-eleven',
  templateUrl: './home-en-blog-eleven.component.html',
  styleUrl: './home-en-blog-eleven.component.scss',
})
export class HomeEnBlogElevenComponent implements OnInit {
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
      "Trader's Starting Deposit: How Much Capital Do You Need to Start Trading",
    );
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.updateTag({
      name: 'description',
      content:
        'Learn how much starting capital you need for Forex, stock market, and cryptocurrency trading. A practical guide to choosing the optimal deposit size for trading.',
    });
    this.meta.updateTag({ name: 'datePublished', content: '2025-04-01' });
    this.meta.updateTag({
      property: 'og:image',
      content: '/assets/img/content/starterdeposit.webp',
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
            "Trader's Starting Deposit: How Much Capital Do You Need to Start Trading",
          description:
            'A practical guide to determining the optimal starting deposit size for trading in financial markets',
          image: 'https://arapov.trade/assets/img/content/starterdeposit1.webp',
          author: {
            '@id': 'https://arapov.trade/en#person',
          },
          publisher: {
            '@type': 'Organization',
            name: 'Pair Trade',
            logo: {
              '@type': 'ImageObject',
              url: 'https://arapov.trade/assets/img/favicon.ico',
            },
          },
          datePublished: '2025-04-15T00:00:00Z',
          dateModified: '2025-12-29T00:00:00Z',
          mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': 'https://arapov.trade/en/freestudying/starterdeposit',
          },
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
          name: 'What is the minimum deposit needed to start trading Forex?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'To start trading Forex, a minimum of $300-500 is recommended. This allows you to follow risk management rules and risk no more than 1-2% of your deposit per trade.',
          },
        },
        {
          '@type': 'Question',
          name: "Why shouldn't I start trading with $10-50?",
          acceptedAnswer: {
            '@type': 'Answer',
            text: "With a minimum deposit of $10-50, it's impossible to follow basic risk management rules. Commissions, spreads, and minimum lot sizes make trading with such capital unprofitable.",
          },
        },
        {
          '@type': 'Question',
          name: 'How do I calculate the optimal starting deposit size?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: "The optimal deposit is calculated based on the rule: risk per trade should not exceed 1-2% of capital. If your average stop-loss is 20 pips and pip value is $1, you'll need at least $500-1000.",
          },
        },
        {
          '@type': 'Question',
          name: 'Should I use borrowed money to fund my trading deposit?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: "It is strongly not recommended to use borrowed funds for trading. This creates additional psychological pressure and can lead to rash decisions out of fear of losing someone else's money.",
          },
        },
        {
          '@type': 'Question',
          name: 'When can I increase my trading deposit size?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Increasing your deposit is recommended only after achieving stable profitability for at least 3-6 months. Before adding funds, ensure your strategy works and you maintain discipline.',
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
      name: 'How to Determine the Optimal Starting Deposit Size',
      description:
        'Step-by-step guide to calculating the necessary capital for starting to trade in financial markets',
      step: [
        {
          '@type': 'HowToStep',
          position: 1,
          name: 'Define your comfortable loss amount',
          text: 'Establish the maximum amount you can afford to lose without affecting your financial situation. This sum becomes the upper limit of your starting deposit.',
        },
        {
          '@type': 'HowToStep',
          position: 2,
          name: 'Choose your trading strategy',
          text: 'Determine your trading style: scalping requires more capital due to commissions, while swing trading requires less but needs reserves for drawdowns.',
        },
        {
          '@type': 'HowToStep',
          position: 3,
          name: 'Calculate minimum deposit by risk rule',
          text: 'Divide your average stop-loss in monetary terms by 0.01-0.02 (1-2% risk). The result is the minimum deposit needed for proper risk management.',
        },
        {
          '@type': 'HowToStep',
          position: 4,
          name: 'Test on a demo account',
          text: 'Spend at least 2-3 weeks trading on a demo account with virtual capital equal to your planned deposit. Evaluate your comfort level.',
        },
        {
          '@type': 'HowToStep',
          position: 5,
          name: 'Start with the minimum amount',
          text: 'When transitioning to a live account, start with the lower end of your calculated range. Increase your deposit only after confirming stable results.',
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
      name: "Glossary of Terms: Trader's Starting Deposit",
      hasDefinedTerm: [
        {
          '@type': 'DefinedTerm',
          name: 'Starting Deposit',
          description:
            'The initial sum of money placed in a brokerage account for executing trading operations in financial markets.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Risk Management',
          description:
            'A system for managing risks in trading, including defining maximum acceptable losses per trade and overall drawdown control.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Leverage',
          description:
            "A margin trading mechanism that allows controlling positions exceeding the trader's own capital.",
        },
        {
          '@type': 'DefinedTerm',
          name: 'Spread',
          description:
            "The difference between the buy and sell price of a trading instrument, representing the broker's commission for executing a trade.",
        },
        {
          '@type': 'DefinedTerm',
          name: 'Drawdown',
          description:
            'A temporary decrease in trading capital from its maximum value, expressed in percentage or monetary equivalent.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Margin',
          description:
            "Collateral funds blocked by the broker in a trader's account when opening a leveraged position.",
        },
        {
          '@type': 'DefinedTerm',
          name: 'Demo Account',
          description:
            'A practice trading account with virtual funds for trading practice without financial risk.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Volatility',
          description:
            'The degree of price variation of a financial instrument over a specific period of time.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Diversification',
          description:
            'Distribution of capital among various trading instruments to reduce concentration risks.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Liquidity',
          description:
            'The ability of an asset to be quickly sold or bought at market price without significantly affecting quotes.',
        },
      ],
    };

    this.addJsonLdSchema(data);
  }
}
