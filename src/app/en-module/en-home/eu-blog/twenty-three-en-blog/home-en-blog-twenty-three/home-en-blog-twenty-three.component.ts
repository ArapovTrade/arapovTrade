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
  selector: 'app-home-en-blog-twenty-three',
  templateUrl: './home-en-blog-twenty-three.component.html',
  styleUrl: './home-en-blog-twenty-three.component.scss',
})
export class HomeEnBlogTwentyThreeComponent implements OnInit {
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

    this.titleService.setTitle('Bitcoin ETF: What It Is and How It Works');
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.updateTag({
      name: 'description',
      content:
        'Complete guide to Bitcoin ETF. Learn how exchange-traded funds on bitcoin work, their advantages, risks, and impact on the cryptocurrency market.',
    });

    this.meta.updateTag({ name: 'author', content: 'Ihor Arapov' });
    this.meta.updateTag({ name: 'datePublished', content: '2025-01-21' });
    this.meta.updateTag({
      property: 'og:image',
      content: '/assets/img/content/bitcoinetf.webp',
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
          headline: 'Bitcoin ETF: What It Is and How It Works',
          description:
            'Complete guide to Bitcoin ETF. Learn how exchange-traded funds on bitcoin work, their advantages, risks, and impact on the cryptocurrency market.',
          author: {
            '@id': 'https://arapov.trade/en#person',
          },
          publisher: {
            '@type': 'Organization',
            name: 'ArapovTrade',
            url: 'https://arapov.trade',
          },
          image: {
            '@type': 'ImageObject',
            url: 'https://arapov.trade/assets/img/content/bitcoinetf1.webp',
          },
          datePublished: '2025-04-15T00:00:00Z',
          dateModified: '2025-11-29T00:00:00Z',
          mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': 'https://arapov.trade/en/freestudying/bitcoinetf',
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
          name: 'What is a Bitcoin ETF?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: "A Bitcoin ETF is an exchange-traded fund that trades on traditional exchanges and allows investing in bitcoin without directly purchasing cryptocurrency. The fund tracks bitcoin's price through ownership of real coins or futures contracts.",
          },
        },
        {
          '@type': 'Question',
          name: 'How does Bitcoin ETF differ from buying bitcoin?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'When buying an ETF, you own shares of the fund, not the bitcoins themselves. This eliminates the need to manage a crypto wallet but excludes the ability to use coins in DeFi or for transfers.',
          },
        },
        {
          '@type': 'Question',
          name: 'What types of Bitcoin ETF exist?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: "There are spot ETFs (fund owns real bitcoins) and futures ETFs (fund uses futures contracts). Spot ETFs more accurately reflect bitcoin's price, while futures may have deviations.",
          },
        },
        {
          '@type': 'Question',
          name: 'Why is Bitcoin ETF important for the market?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: "Bitcoin ETF opens access to cryptocurrencies for institutional investors, increases market liquidity, creates regulatory transparency, and promotes bitcoin's integration into traditional finance.",
          },
        },
        {
          '@type': 'Question',
          name: 'What are the risks of investing in Bitcoin ETF?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Main risks: fund fees reduce returns, lack of ownership of real bitcoins, dependence on regulatory decisions, base asset volatility, potential price deviations in futures ETFs.',
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
      name: 'How to Invest in Bitcoin ETF',
      step: [
        {
          '@type': 'HowToStep',
          position: 1,
          name: 'Research available funds',
          text: 'Compare fees, liquidity, management company reputation, and type of bitcoin tracking (spot or futures).',
        },
        {
          '@type': 'HowToStep',
          position: 2,
          name: 'Choose a broker',
          text: 'Use a reliable broker with access to NYSE or Nasdaq exchanges where Bitcoin ETFs trade.',
        },
        {
          '@type': 'HowToStep',
          position: 3,
          name: 'Open a brokerage account',
          text: 'Complete verification and fund your account. No crypto exchange account is required to purchase ETF.',
        },
        {
          '@type': 'HowToStep',
          position: 4,
          name: 'Determine investment size',
          text: 'Decide what portion of your portfolio to allocate to Bitcoin ETF. Consider cryptocurrency volatility.',
        },
        {
          '@type': 'HowToStep',
          position: 5,
          name: 'Make the purchase',
          text: "Buy ETF like a regular stock through your broker's trading terminal. Monitor performance and rebalance your portfolio.",
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
      name: 'Bitcoin ETF Terms',
      hasDefinedTerm: [
        {
          '@type': 'DefinedTerm',
          name: 'Bitcoin ETF',
          description: "Exchange-traded fund that tracks bitcoin's price",
        },
        {
          '@type': 'DefinedTerm',
          name: 'Spot ETF',
          description: 'Fund that holds real bitcoins in reserve',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Futures ETF',
          description: 'Fund that uses futures contracts to track price',
        },
        {
          '@type': 'DefinedTerm',
          name: 'SEC',
          description:
            'US Securities and Exchange Commission, market regulator',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Tracking error',
          description: 'Deviation of ETF price from underlying asset price',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Management fee',
          description: 'Annual fee paid to fund for asset management',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Institutional investors',
          description: 'Large investors: pension funds, hedge funds, banks',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Liquidity',
          description:
            'Ability to quickly buy or sell an asset without significantly affecting its price',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Cryptocurrency wallet',
          description: 'Software or device for storing cryptocurrencies',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Private key',
          description: 'Secret code for accessing cryptocurrency assets',
        },
      ],
    };

    this.addJsonLdSchema(data);
  }
}
