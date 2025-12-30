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
  selector: 'app-home-en-blog-nineteen',
  templateUrl: './home-en-blog-nineteen.component.html',
  styleUrl: './home-en-blog-nineteen.component.scss',
})
export class HomeEnBlogNineteenComponent implements OnInit {
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
      'Wyckoff Method in Trading | Complete Guide 2025'
    );
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.updateTag({
      name: 'description',
      content:
        'Wyckoff Method in Trading: Complete guide to market cycle analysis, accumulation and distribution phases, volume analysis and Smart Money trading strategies.',
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
            '@id': 'https://arapov.trade/en/freestudying/wyckoffmethod',
          },
          headline: 'Wyckoff Method in Trading | Complete Guide 2025',
          description:
            'Wyckoff Method in Trading: Complete guide to market cycle analysis, accumulation and distribution phases, volume analysis and Smart Money trading strategies.',
          image: 'https://arapov.trade/assets/img/content/wyckoffmethod.webp',
          datePublished: '2025-03-15T00:00:00+02:00',
          dateModified: '2025-12-15T00:00:00+02:00',
          inLanguage: 'en',
          author: {
            '@id': 'https://arapov.trade/en#person',
          },
          publisher: {
            '@type': 'Organization',
            '@id': 'https://arapov.trade/#organization',
            name: 'Arapov.Trade',
            logo: {
              '@type': 'ImageObject',
              url: 'https://arapov.trade/assets/img/favicon.ico',
            },
          },
          video: {
            '@type': 'VideoObject',
            name: 'Метод Вайкоффа для начинающих трейдеров: полное руководство по объемному анализу',
            description:
              'Метод Вайкоффа для начинающих трейдеров: полное руководство по объемному анализу рынка. Узнайте, как следовать за крупными деньгами и использовать фазы накопления и распределения.',
            thumbnailUrl: [
              'https://img.youtube.com/vi/-oEWnPGRVqs/maxresdefault.jpg',
              'https://img.youtube.com/vi/-oEWnPGRVqs/hqdefault.jpg',
            ],
            uploadDate: '2024-06-15T00:00:00+02:00',
            duration: 'PT7M41S',
            contentUrl: 'https://www.youtube.com/watch?v=-oEWnPGRVqs',
            embedUrl: 'https://www.youtube.com/embed/-oEWnPGRVqs',
            inLanguage: 'ru',
            keywords:
              'метод Вайкоффа, Wyckoff, объемный анализ, VSA, фазы рынка, накопление, распределение',
            hasPart: [
              {
                '@type': 'Clip',
                name: 'Введение в метод Вайкоффа для начинающих',
                startOffset: 0,
                endOffset: 45,
                url: 'https://www.youtube.com/watch?v=-oEWnPGRVqs&t=0',
              },
              {
                '@type': 'Clip',
                name: 'История метода Вайкоффа - почему работает с 1905 года',
                startOffset: 45,
                endOffset: 195,
                url: 'https://www.youtube.com/watch?v=-oEWnPGRVqs&t=45',
              },
              {
                '@type': 'Clip',
                name: 'Суть концепции Вайкоффа - следуйте за профессионалами',
                startOffset: 195,
                endOffset: 280,
                url: 'https://www.youtube.com/watch?v=-oEWnPGRVqs&t=195',
              },
              {
                '@type': 'Clip',
                name: 'Фазы рынка: накопление и распределение',
                startOffset: 280,
                endOffset: 380,
                url: 'https://www.youtube.com/watch?v=-oEWnPGRVqs&t=280',
              },
              {
                '@type': 'Clip',
                name: 'Как крупный капитал собирает и распределяет позиции',
                startOffset: 380,
                endOffset: 461,
                url: 'https://www.youtube.com/watch?v=-oEWnPGRVqs&t=380',
              },
            ],
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
          name: 'What is the Wyckoff Method?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'The Wyckoff Method is an analytical framework for understanding institutional market behavior through price and volume analysis. It helps traders identify accumulation and distribution phases where large operators build or liquidate positions.',
          },
        },
        {
          '@type': 'Question',
          name: 'What are the four market phases in Wyckoff?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Wyckoff identifies four phases: Accumulation (smart money buying), Markup (uptrend), Distribution (smart money selling), and Markdown (downtrend). Each phase has distinct characteristics in price structure and volume patterns.',
          },
        },
        {
          '@type': 'Question',
          name: 'What is a Spring in Wyckoff analysis?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'A Spring is a false breakdown below the support of an accumulation range designed to trigger stop losses and attract sellers. Smart money uses this liquidity to complete their buying. Price quickly reverses back into the range with increasing volume.',
          },
        },
        {
          '@type': 'Question',
          name: 'How does volume analysis work in Wyckoff?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Volume confirms price movements. Rising volume on price advances indicates trend strength, while declining volume suggests weakness. Volume profile shows value areas, delta volume reveals buying or selling dominance.',
          },
        },
        {
          '@type': 'Question',
          name: 'Does Wyckoff work for cryptocurrency trading?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'The Wyckoff Method works exceptionally well on cryptocurrency markets due to concentrated ownership among large holders. Whales create distinct accumulation zones before major rallies. The methodology helps distinguish organic accumulation from manipulation.',
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
      name: 'How to Trade Using the Wyckoff Method',
      step: [
        {
          '@type': 'HowToStep',
          position: 1,
          name: 'Identify the current market phase',
          text: 'Analyze higher timeframe charts to determine if the market is in accumulation, markup, distribution, or markdown phase.',
        },
        {
          '@type': 'HowToStep',
          position: 2,
          name: 'Locate key patterns',
          text: 'Identify characteristic Wyckoff patterns: springs in accumulation or upthrusts in distribution zones.',
        },
        {
          '@type': 'HowToStep',
          position: 3,
          name: 'Confirm with volume',
          text: 'Verify trading signals using volume analysis. Genuine breakouts are accompanied by volume expansion.',
        },
        {
          '@type': 'HowToStep',
          position: 4,
          name: 'Execute entry with stop loss',
          text: 'Open position after pattern confirmation. Place protective stop beyond the pattern extreme.',
        },
        {
          '@type': 'HowToStep',
          position: 5,
          name: 'Manage position risk',
          text: 'Move stop to breakeven after reaching intermediate target. Take partial profits at key levels.',
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
      name: 'Wyckoff Method Glossary',
      hasDefinedTerm: [
        {
          '@type': 'DefinedTerm',
          name: 'Accumulation',
          description:
            'Phase where institutional players quietly build positions within a trading range before an uptrend',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Distribution',
          description:
            'Phase where smart money gradually exits positions before a downtrend begins',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Spring',
          description:
            'False breakdown below support in accumulation range to collect liquidity',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Upthrust',
          description:
            'False breakout above resistance in distribution range to trap late buyers',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Markup',
          description: 'Uptrend phase following completed accumulation',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Markdown',
          description: 'Downtrend phase following completed distribution',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Volume Delta',
          description:
            'Difference between aggressive buying and selling volume',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Volume Profile',
          description: 'Distribution of trading activity across price levels',
        },
      ],
    };

    this.addJsonLdSchema(data);
  }
}
