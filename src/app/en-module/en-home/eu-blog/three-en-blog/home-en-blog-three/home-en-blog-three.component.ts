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
  selector: 'app-home-en-blog-three',
  templateUrl: './home-en-blog-three.component.html',
  styleUrl: './home-en-blog-three.component.scss',
})
export class HomeEnBlogThreeComponent implements OnInit {
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
      'Market Volatility: Measurement and Trading Applications | Arapov.trade',
    );
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.updateTag({
      name: 'description',
      content:
        'Market volatility explained: complete guide to measuring price fluctuations with ATR indicator and practical trading applications',
    });
    this.meta.updateTag({ name: 'datePublished', content: '2025-03-31' });
    this.meta.updateTag({
      property: 'og:image',
      content: '/assets/img/content/volatility44.webp',
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
            'Market Volatility: Measurement Techniques and Trading Applications',
          description:
            'Complete guide to financial market volatility: types of volatility, ATR indicator, practical applications for risk management',
          image: 'https://arapov.trade/assets/img/content/volatility1.webp',
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
            '@id': 'https://arapov.trade/en/freestudying/volatility',
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
          name: 'What is volatility in trading?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Volatility is a statistical measure of price variation over a specific period. High volatility means significant price swings, low volatility indicates stable price behavior.',
          },
        },
        {
          '@type': 'Question',
          name: 'How does the ATR indicator work?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'ATR (Average True Range) measures the average true range of price fluctuations, accounting for gaps. True range is the maximum of high-low difference and deviations from previous close.',
          },
        },
        {
          '@type': 'Question',
          name: 'How to use ATR for stop loss?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Typical approach is setting stop loss at 1.5-3 ATR values from entry point. This accounts for current volatility and prevents premature stop triggers.',
          },
        },
        {
          '@type': 'Question',
          name: 'What is the difference between historical and implied volatility?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Historical volatility is calculated from past prices, implied volatility is extracted from option prices and reflects market expectations about future fluctuations.',
          },
        },
        {
          '@type': 'Question',
          name: 'Which market has the highest volatility?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Cryptocurrency market has the highest volatility - daily swings of 10-20% are common. Forex is relatively stable, stock market shows sectoral differentiation.',
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
      name: 'How to Apply ATR in Trading',
      description:
        'Step-by-step guide to using ATR indicator for risk management and determining trading parameters',
      step: [
        {
          '@type': 'HowToStep',
          position: 1,
          name: 'Configure ATR on chart',
          text: 'Add ATR indicator to your chart with period 14. Use shorter periods for short-term trading, longer periods for long-term trading.',
        },
        {
          '@type': 'HowToStep',
          position: 2,
          name: 'Determine current volatility level',
          text: 'Compare current ATR value with historical average. High values indicate active market, low values indicate consolidation period.',
        },
        {
          '@type': 'HowToStep',
          position: 3,
          name: 'Calculate stop loss',
          text: 'Set stop loss at 1.5-3 ATR distance from entry point. Use larger multiplier for volatile instruments.',
        },
        {
          '@type': 'HowToStep',
          position: 4,
          name: 'Determine profit target',
          text: 'Set take profit as ATR multiple - usually 2-4 values from entry point depending on strategy.',
        },
        {
          '@type': 'HowToStep',
          position: 5,
          name: 'Calculate position size',
          text: 'Normalize risk across instruments: high ATR assets get smaller position size to maintain constant monetary risk.',
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
      name: 'Volatility Trading Glossary',
      hasDefinedTerm: [
        {
          '@type': 'DefinedTerm',
          name: 'Volatility',
          description:
            'Statistical measure of price variation reflecting intensity of price fluctuations',
        },
        {
          '@type': 'DefinedTerm',
          name: 'ATR',
          description:
            'Average True Range - indicator measuring average true range for volatility assessment',
        },
        {
          '@type': 'DefinedTerm',
          name: 'True Range',
          description:
            'Maximum value of three: High-Low, |High-Close_prev|, |Low-Close_prev|',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Historical Volatility',
          description: 'Volatility calculated from past price data',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Implied Volatility',
          description:
            'Expected volatility extracted from option contract prices',
        },
        {
          '@type': 'DefinedTerm',
          name: 'VIX',
          description:
            'Volatility index measuring S&P 500 options market expectations',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Bollinger Bands',
          description:
            'Volatility indicator showing channel around moving average',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Standard Deviation',
          description: 'Statistical measure of value dispersion from the mean',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Dynamic Stop Loss',
          description: 'Protective level adapting to current market volatility',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Volatility Regime',
          description:
            'Current market state in terms of price fluctuation intensity',
        },
      ],
    };

    this.addJsonLdSchema(data);
  }
}
