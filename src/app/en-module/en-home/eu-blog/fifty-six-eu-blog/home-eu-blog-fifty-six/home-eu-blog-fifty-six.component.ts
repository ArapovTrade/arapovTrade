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
  selector: 'app-home-eu-blog-fifty-six',
  templateUrl: './home-eu-blog-fifty-six.component.html',
  styleUrl: './home-eu-blog-fifty-six.component.scss',
})
export class HomeEuBlogFiftySixComponent implements OnInit {
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
      'Trading Books for Beginners | Best Literature for Traders',
    );
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.updateTag({
      name: 'description',
      content:
        'Trading books for beginners — a complete guide to selecting professional literature. Learn how books develop trading mindset and help master market analysis.',
    });
    this.meta.updateTag({ name: 'datePublished', content: '2025-04-04' });
    this.meta.updateTag({
      property: 'og:image',
      content: '/assets/img/content/benefitsoftradingbooks.jpg',
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
            'https://arapov.trade/en/freestudying/benefitsoftradingbooks#article',
          headline:
            'Trading Books for Beginners — Complete Guide to Professional Literature',
          description:
            'Discover why books remain an indispensable tool for trading education, how to choose literature for your level, and how to integrate book knowledge into trading practice.',
          image:
            'https://arapov.trade/assets/img/content/benefitsoftradingbooks1.webp',
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
            '@id':
              'https://arapov.trade/en/freestudying/benefitsoftradingbooks',
          },
          articleSection: 'Trading Education',
          keywords: [
            'trading books',
            'trading literature',
            'trading education',
            'technical analysis',
            'trading psychology',
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
      '@id': 'https://arapov.trade/en/freestudying/benefitsoftradingbooks#faq',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'What trading books should beginners read?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Beginners should start with introductory publications explaining basic financial market concepts. Books covering technical analysis fundamentals, asset types, and pricing principles are ideal starting points. After mastering basics, progress to specialized literature on trading psychology and capital management.',
          },
        },
        {
          '@type': 'Question',
          name: 'Why are trading books better than video tutorials?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Books provide structured material presentation, allowing readers to deeply immerse in topics. Unlike short videos, quality publications guide from basic concepts to advanced strategies, ensuring comprehensive subject understanding. The ability to revisit challenging sections makes books especially valuable for learning.',
          },
        },
        {
          '@type': 'Question',
          name: 'How to apply knowledge from trading books in practice?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'The optimal approach involves sequential material mastery with parallel concept testing on demo accounts. After each book, creating summaries of key ideas and defining specific implementation actions is recommended. Alternating reading periods with active trading ensures continuous competency growth.',
          },
        },
        {
          '@type': 'Question',
          name: 'Which books help manage emotions in trading?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Trading psychology books help identify destructive behavioral patterns and develop strategies for overcoming them. Specialized literature analyzes fear of loss, greed during profit growth, and reluctance to acknowledge mistakes. Authors offer specific self-control techniques: maintaining trading journals, mindfulness practices, and cognitive reframing methods.',
          },
        },
        {
          '@type': 'Question',
          name: 'Should trading books be re-read multiple times?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Regular re-reading of key books reveals new understanding dimensions as trading experience accumulates. Concepts that seemed obvious during initial reading gain depth after experiencing real market situations. Many professional traders return to classic publications annually, extracting new insights each time.',
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
      '@id':
        'https://arapov.trade/en/freestudying/benefitsoftradingbooks#howto',
      name: 'How to Effectively Study Trading Books',
      description:
        'Step-by-step guide for working with professional literature to achieve maximum results in trading education.',
      step: [
        {
          '@type': 'HowToStep',
          position: 1,
          name: 'Choose books by level',
          text: 'Determine your current knowledge level and select literature of appropriate complexity. Beginners should choose introductory publications on basic market concepts, intermediate traders should select specialized books on specific analysis methods.',
        },
        {
          '@type': 'HowToStep',
          position: 2,
          name: 'Study actively with notes',
          text: 'Make margin notes, record key ideas, and formulate questions for further research. Creating summaries after each book deepens material understanding and builds a personal knowledge base.',
        },
        {
          '@type': 'HowToStep',
          position: 3,
          name: 'Test concepts in practice',
          text: 'Parallel to reading, verify studied concepts on demo accounts. Each completed chapter should become the basis for practical exercises in building levels, identifying trends, and applying indicators.',
        },
        {
          '@type': 'HowToStep',
          position: 4,
          name: 'Implement changes in trading',
          text: 'Define specific actions for implementation in trading practice after each book. Simple theoretical knowledge accumulation without practical application does not improve results.',
        },
        {
          '@type': 'HowToStep',
          position: 5,
          name: 'Periodically re-read key books',
          text: 'Return to classic publications as experience accumulates. Concepts gain new depth after experiencing real market situations, allowing extraction of additional insights.',
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
      '@id':
        'https://arapov.trade/en/freestudying/benefitsoftradingbooks#glossary',
      name: 'Trading Terms Glossary',
      hasDefinedTerm: [
        {
          '@type': 'DefinedTerm',
          name: 'Moving Average',
          description:
            'Technical indicator calculating average price value over a defined period to determine trend direction and smooth market noise.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Stop-Loss',
          description:
            'Protective order that automatically closes a position when a specified loss level is reached to limit trader losses.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Market Liquidity',
          description:
            "Market's ability to ensure rapid trade execution without significant impact on asset price.",
        },
        {
          '@type': 'DefinedTerm',
          name: 'Engulfing Pattern',
          description:
            'Reversal candlestick pattern where current candle body completely covers the previous candle body, signaling market sentiment change.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Technical Analysis',
          description:
            'Method of predicting price movements based on studying historical data, charts, and indicators.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Trading Journal',
          description:
            'Trader self-analysis tool recording all trades, decisions, and emotional states to identify errors and improve strategy.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Volatility',
          description:
            'Degree of asset price variability over a defined time period, reflecting market uncertainty level.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Demo Account',
          description:
            'Practice trading account with virtual funds allowing practice without real money loss risk.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Slippage',
          description:
            'Difference between expected order execution price and actual price, occurring during high volatility or low liquidity.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Take-Profit',
          description:
            'Profit-fixing order that automatically closes position when target price level is reached.',
        },
      ],
    };

    this.addJsonLdSchema(data);
  }
}
