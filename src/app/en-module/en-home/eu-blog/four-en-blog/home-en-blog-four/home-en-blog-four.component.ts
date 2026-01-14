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
  selector: 'app-home-en-blog-four',
  templateUrl: './home-en-blog-four.component.html',
  styleUrl: './home-en-blog-four.component.scss',
})
export class HomeEnBlogFourComponent implements OnInit {
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
      'Margin Trading Without Losses: How to Avoid Losses | ArapovTrade'
    );
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.updateTag({
      name: 'description',
      content:
        'Learn how to avoid losses in margin trading. Risk management, leverage, stop-losses, trading psychology and proven strategies.',
    });
    this.meta.updateTag({ name: 'author', content: 'Ihor Arapov' });
    this.meta.updateTag({ name: 'datePublished', content: '2025-01-24' });
    this.meta.updateTag({
      property: 'og:image',
      content: '/assets/img/content/reasonfordepositeloose.png',
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
            'Margin Trading Without Losses: Complete Risk Management Guide',
          description:
            'Comprehensive guide to avoiding losses in margin trading. Capital management, trading psychology, technical tools and proven strategies.',
          author: {
            '@id': 'https://arapov.trade/en#person',
          },
          publisher: {
            '@type': 'Organization',
            name: 'ArapovTrade',
            url: 'https://arapov.trade',
            logo: {
              '@type': 'ImageObject',
              url: 'https://arapov.trade/assets/img/favicon.ico',
            },
          },
          datePublished: '2025-04-15T00:00:00Z',
          dateModified: '2025-12-13T00:00:00Z',
          mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': 'https://arapov.trade/en/freestudying/avoidlosingmoney',
          },
          image: {
            '@type': 'ImageObject',
            url: 'https://arapov.trade/assets/img/content/reasonfordepositeloose.png',
            width: 1200,
            height: 630,
          },
          articleSection: 'Risk Management',
          keywords: 'margin trading, leverage, risk management, stop-loss',
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
      mainEntity: [
        {
          '@type': 'Question',
          name: 'What is margin trading?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Margin trading is a form of trading where a trader uses borrowed funds from a broker to open positions exceeding their own capital. Leverage increases both potential profit and loss risks.',
          },
        },
        {
          '@type': 'Question',
          name: 'What risk is acceptable per trade?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Recommended risk per trade is 1-2% of total deposit. This approach allows surviving a series of losing trades without critical damage to the trading account and preserves capital for future opportunities.',
          },
        },
        {
          '@type': 'Question',
          name: 'Why is it important to use stop-losses?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Stop-loss automatically closes position when reaching a set loss level, protecting capital from significant losses. This helps maintain emotional control and avoid panic during unfavorable market movements.',
          },
        },
        {
          '@type': 'Question',
          name: 'What leverage is recommended for beginners?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Beginners are recommended to use minimum leverage of 1:2 or 1:3. High leverage significantly increases risks: at 1:20 leverage even a 5% price change can lead to complete position liquidation.',
          },
        },
        {
          '@type': 'Question',
          name: 'What is position liquidation?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: "Liquidation is forced position closure by the broker when losses reach a level where the deposit cannot cover them. To avoid liquidation, it's important to maintain sufficient margin and use stop-losses.",
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
      '@id': 'https://arapov.trade/en/freestudying/avoidlosingmoney#howto',
      name: 'How to Avoid Losses in Margin Trading',
      description:
        'Step-by-step guide to risk management and capital protection in margin trading',
      step: [
        {
          '@type': 'HowToStep',
          position: 1,
          name: 'Define acceptable risk level',
          text: 'Before starting trading, determine what portion of capital you are willing to lose. It is recommended to risk no more than 1-2% of deposit per trade and maximum 5% per day. This will protect your account from ruin during a series of losing trades.',
        },
        {
          '@type': 'HowToStep',
          position: 2,
          name: 'Set stop-losses for each position',
          text: 'Before opening a position, determine the stop-loss level below key support levels in advance. Stop-loss will automatically close the position at a loss, protecting your capital from further losses.',
        },
        {
          '@type': 'HowToStep',
          position: 3,
          name: 'Use conservative leverage',
          text: 'Beginning traders are recommended to use 1:2 or 1:3 leverage. Experienced traders can increase leverage depending on asset volatility and market conditions, but avoid maximum leverage.',
        },
        {
          '@type': 'HowToStep',
          position: 4,
          name: 'Conduct analysis before trading',
          text: 'Study technical analysis (charts, support/resistance levels), fundamental analysis (news, events), and market sentiment. The more data you analyze, the more informed your decisions will be.',
        },
        {
          '@type': 'HowToStep',
          position: 5,
          name: 'Diversify your portfolio',
          text: 'Distribute capital across multiple assets and strategies. Never open all positions in one instrument — this will reduce the risk of total loss in case of unfavorable movement of one asset.',
        },
        {
          '@type': 'HowToStep',
          position: 6,
          name: 'Reduce position size when approaching loss limit',
          text: 'If you have lost 3-4% of deposit in a day, close remaining positions and stop trading. This will prevent emotional decisions and protect capital from critical losses.',
        },
        {
          '@type': 'HowToStep',
          position: 7,
          name: 'Keep a trading journal',
          text: 'Record each trade: date, asset, position size, entry reason, result. Analyze mistakes and successes to continuously improve your strategy.',
        },
        {
          '@type': 'HowToStep',
          position: 8,
          name: 'Control emotions',
          text: 'Margin trading requires psychological stability. Do not open positions in haste, do not increase leverage during losses, and follow your trading plan even if the market moves against you.',
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
      name: 'Margin Trading Glossary',
      description:
        'Key terms and definitions related to margin trading and risk management',
      definedTerm: [
        {
          '@type': 'DefinedTerm',
          name: 'Margin Trading',
          description:
            "Trading using borrowed broker funds, allowing opening positions exceeding trader's own capital.",
        },
        {
          '@type': 'DefinedTerm',
          name: 'Leverage',
          description:
            "Ratio of borrowed funds to trader's own capital. 1:10 leverage allows trading with 10 times the deposit amount.",
        },
        {
          '@type': 'DefinedTerm',
          name: 'Margin',
          description:
            "Trader's own funds provided as collateral for opening a margin position.",
        },
        {
          '@type': 'DefinedTerm',
          name: 'Liquidation',
          description:
            'Forced position closure by broker when reaching critical loss level to protect borrowed funds.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Stop-Loss',
          description:
            'Protective order that automatically closes position when reaching a set loss level.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Take-Profit',
          description:
            'Order for automatic position closure when reaching target profit level.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Trailing Stop',
          description:
            'Dynamic stop-loss that automatically moves with price, locking in profit on reversal.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Risk Management',
          description:
            'System of risk control including position sizing, stop-loss placement and portfolio diversification.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Slippage',
          description:
            'Difference between expected and actual order execution price occurring during high volatility or low liquidity.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Margin Call',
          description:
            "Broker's request to deposit additional funds to maintain open positions when reaching critical loss level.",
        },
      ],
    };

    this.addJsonLdSchema(data);
  }
}
