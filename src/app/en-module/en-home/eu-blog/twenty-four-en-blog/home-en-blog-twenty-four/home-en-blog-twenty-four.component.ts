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
  selector: 'app-home-en-blog-twenty-four',
  templateUrl: './home-en-blog-twenty-four.component.html',
  styleUrl: './home-en-blog-twenty-four.component.scss',
})
export class HomeEnBlogTwentyFourComponent implements OnInit {
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
      'Flag Pattern in Trading: How to Identify and Trade | Arapov.trade',
    );
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.updateTag({
      name: 'description',
      content:
        'Flag Pattern in Trading: comprehensive guide to identification, construction, and trading strategies. Learn how to use this trend continuation pattern for profitable trading.',
    });
    this.meta.updateTag({ name: 'datePublished', content: '2025-04-15' });
    this.meta.updateTag({
      property: 'og:image',
      content: '/assets/img/content/flagfigure.webp',
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
          mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': 'https://arapov.trade/en/freestudying/flagfigure',
          },
          headline:
            'Flag Pattern in Trading: Complete Guide to Identification and Trading Strategies',
          description:
            'Comprehensive guide to the Flag pattern: structure, types, trading methods, and practical recommendations for traders of all skill levels.',
          image: 'https://arapov.trade/assets/img/content/flagfigure.webp',
          datePublished: '2025-04-15T00:00:00Z',
          dateModified: '2025-12-29T00:00:00Z',
          author: {
            '@id': 'https://arapov.trade/en#person',
          },
          publisher: {
            '@type': 'Organization',
            name: 'Arapov.trade',
            logo: {
              '@type': 'ImageObject',
              url: 'https://arapov.trade/assets/img/favicon.ico',
            },
          },
          articleSection: 'Technical Analysis',
          wordCount: 1650,
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
          name: 'What is a Flag pattern in trading?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'The Flag pattern is a trend continuation chart formation consisting of two elements: the flagpole (a sharp impulse move) and the flag itself (a short consolidation within a narrow channel). After consolidation completes, price typically continues moving in the direction of the initial impulse.',
          },
        },
        {
          '@type': 'Question',
          name: 'What types of Flag patterns exist?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'There are two main types: bull flag (forms after an upward impulse, consolidation slopes downward) and bear flag (forms after a downward impulse, consolidation slopes upward). Both types signal continuation of the preceding trend.',
          },
        },
        {
          '@type': 'Question',
          name: 'How do you properly trade the Flag pattern?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'The primary method involves entering on a breakout of the flag boundary in the trend direction. Stop-loss is placed beyond the opposite boundary of consolidation. Profit target is calculated as the flagpole length projected from the breakout point.',
          },
        },
        {
          '@type': 'Question',
          name: 'How can you distinguish a genuine Flag breakout from a false one?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'A genuine breakout is accompanied by increased trading volume and a candle close beyond the flag boundary. False breakouts are characterized by low volume and quick price return into the consolidation range.',
          },
        },
        {
          '@type': 'Question',
          name: 'Which markets does the Flag pattern work in?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'The Flag is universal and effective across all financial markets: Forex, stocks, cryptocurrencies, and commodities. The pattern works on any timeframe from minutes to weeks, though the most reliable signals form on H1-D1.',
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
      name: 'How to Trade the Flag Pattern',
      description:
        'Step-by-step instructions for identifying and trading the Flag pattern',
      step: [
        {
          '@type': 'HowToStep',
          position: 1,
          name: 'Identify the Impulse',
          text: 'Locate a sharp directional price move (the flagpole) on the chart accompanied by elevated trading volume.',
        },
        {
          '@type': 'HowToStep',
          position: 2,
          name: 'Define the Consolidation',
          text: 'After the impulse, price enters a consolidation phase forming a narrow channel sloping against the main trend.',
        },
        {
          '@type': 'HowToStep',
          position: 3,
          name: 'Wait for the Breakout',
          text: 'Entry is executed after a candle closes beyond the channel boundary in the direction of the initial impulse.',
        },
        {
          '@type': 'HowToStep',
          position: 4,
          name: 'Confirm with Volume',
          text: 'Ensure the breakout is accompanied by rising trading volume. Low volume increases false signal probability.',
        },
        {
          '@type': 'HowToStep',
          position: 5,
          name: 'Set Stop and Target',
          text: 'Place stop-loss beyond the opposite flag boundary. Profit target equals the flagpole length projected from breakout.',
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
      name: 'Flag Pattern Terminology',
      hasDefinedTerm: [
        {
          '@type': 'DefinedTerm',
          name: 'Flag Pattern',
          description:
            'A trend continuation chart formation consisting of an impulse (flagpole) followed by consolidation',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Flagpole',
          description:
            'A sharp impulse price move preceding consolidation that forms the pattern foundation',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Flag Body',
          description:
            'A consolidation phase within a narrow channel sloping against the main trend',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Bull Flag',
          description:
            'A continuation pattern in an uptrend with consolidation sloping downward',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Bear Flag',
          description:
            'A continuation pattern in a downtrend with consolidation sloping upward',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Flag Breakout',
          description:
            'Price exit beyond consolidation boundary signaling trend continuation',
        },
        {
          '@type': 'DefinedTerm',
          name: 'False Breakout',
          description:
            'Brief price excursion beyond flag boundary followed by return into range',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Target Projection',
          description:
            'Method of calculating target by projecting flagpole length from breakout point',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Consolidation',
          description:
            'Period of sideways movement reflecting temporary pause in trend',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Impulse',
          description:
            'Sharp unidirectional price move with high volume forming pattern beginning',
        },
      ],
    };

    this.addJsonLdSchema(data);
  }
}
