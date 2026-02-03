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
  selector: 'app-home-eu-blog-sixty',
  templateUrl: './home-eu-blog-sixty.component.html',
  styleUrl: './home-eu-blog-sixty.component.scss',
})
export class HomeEuBlogSixtyComponent implements OnInit {
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
      'Trading vs Options: What Should a Trader Choose | ArapovTrade',
    );
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.updateTag({
      name: 'description',
      content:
        'Trading vs Options: comparing two approaches to financial markets. Learn key differences, advantages and disadvantages of each instrument for beginner and experienced traders.',
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
          '@id':
            'https://arapov.trade/en/freestudying/tradingvsoptions#article',
          headline: 'Trading vs Options: What Should a Trader Choose',
          description:
            'Comparing trading and options: key differences, advantages and disadvantages of each instrument for beginner and experienced traders.',
          image:
            'https://arapov.trade/assets/img/content/tradingvsoptions1.webp',
          datePublished: '2025-04-15T00:00:00Z',
          dateModified: '2025-12-29T00:00:00Z',
          author: {
            '@id': 'https://arapov.trade/en#person',
          },
          publisher: {
            '@type': 'Organization',
            '@id': 'https://arapov.trade/#organization',
            name: 'ArapovTrade',
          },
          mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': 'https://arapov.trade/en/freestudying/tradingvsoptions',
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
          name: 'What is better for beginners: trading or options?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Beginners are recommended to start with traditional stock or currency trading. This allows mastering basic principles of market analysis and risk management. Options require understanding complex concepts such as Greeks and time decay.',
          },
        },
        {
          '@type': 'Question',
          name: 'How much capital is needed for trading and options?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Trading can be started with a minimum deposit of $100-500 on Forex or crypto exchanges. Options on the US market typically require $2,000 or more.',
          },
        },
        {
          '@type': 'Question',
          name: 'Where are risks higher: in trading or options?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'When buying options, risk is limited to the premium paid. In trading, losses can exceed the initial deposit when using leverage. However, selling options carries unlimited risk.',
          },
        },
        {
          '@type': 'Question',
          name: 'Can trading and options be combined?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes, many experienced traders use both instruments. For example, you can trade stocks while hedging positions with put options.',
          },
        },
        {
          '@type': 'Question',
          name: 'What are Greeks in options?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Greeks are metrics measuring option price sensitivity to various factors: delta (asset price change), theta (time decay), vega (volatility), gamma (rate of delta change).',
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
      name: 'How to Choose Between Trading and Options',
      step: [
        {
          '@type': 'HowToStep',
          position: 1,
          name: 'Define your goals',
          text: 'Decide what you want to achieve: regular income from short-term trading, long-term investments, or portfolio hedging.',
        },
        {
          '@type': 'HowToStep',
          position: 2,
          name: 'Assess your experience',
          text: 'If you are a beginner, start with trading to master basic skills.',
        },
        {
          '@type': 'HowToStep',
          position: 3,
          name: 'Determine risk tolerance',
          text: 'Leveraged trading carries high risks. Buying options limits losses to the premium.',
        },
        {
          '@type': 'HowToStep',
          position: 4,
          name: 'Study available instruments',
          text: 'Open a demo account and try both instruments in a risk-free environment.',
        },
        {
          '@type': 'HowToStep',
          position: 5,
          name: 'Start small',
          text: 'Begin with minimum amounts and gradually increase volumes.',
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
      name: 'Trading and Options Glossary',
      hasDefinedTerm: [
        {
          '@type': 'DefinedTerm',
          name: 'Option',
          description:
            'A derivative financial instrument giving the right to buy or sell an asset at a predetermined price within a specified period.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Call Option',
          description:
            'A contract giving the buyer the right to purchase the underlying asset at a fixed price before expiration.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Put Option',
          description:
            'A contract giving the buyer the right to sell the underlying asset at a fixed price before expiration.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Premium',
          description:
            'The price paid by the buyer to the option seller for the right to execute the contract.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Strike Price',
          description:
            'The fixed price at which the option holder can buy or sell the underlying asset.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Expiration',
          description:
            'The date when the option contract expires and becomes void.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Delta',
          description:
            'Measures option price sensitivity to changes in the underlying asset price.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Theta',
          description:
            'Measures time decay - the rate at which option value decreases as expiration approaches.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Hedging',
          description:
            'Strategy to protect a portfolio from adverse market movements using derivatives.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Volatility',
          description:
            'The degree of price variability of an asset. High volatility increases option premiums.',
        },
      ],
    };

    this.addJsonLdSchema(data);
  }
}
