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
  selector: 'app-home-en-blog-eight',
  templateUrl: './home-en-blog-eight.component.html',
  styleUrl: './home-en-blog-eight.component.scss',
})
export class HomeEnBlogEightComponent implements OnInit {
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
      'Imbalance in Trading: Complete Guide | Arapov.trade',
    );
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.updateTag({
      name: 'description',
      content:
        'Imbalance in Trading — Complete guide to supply and demand imbalance. Methods for identifying imbalance zones, volume analysis, and trading strategies.',
    });
    this.gerRandom();
  }
  randomArticleRus: any = [];
  gerRandom() {
    this.randomArticleRus = this.artickleServ.getRandomUkArticles();
  }
  hoveredIndex: number | null = null;
  projects = [
    { title: 'Trading Books', link: 'https://arapov.trade/en/books' },
    { title: 'Professional courses', link: 'https://arapov.trade/en/studying' },
    {
      title: 'Basic course',
      link: 'https://arapov.trade/en/freestudying/freeeducation',
    },
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
            'https://arapov.trade/en/freestudying/imbalanceintrading#article',
          headline:
            'Imbalance in Trading: Complete Guide to Supply and Demand Imbalance',
          description:
            'Comprehensive guide to market imbalance: types of imbalance, identification methods, volume analysis, trading strategies and risk management.',
          image:
            'https://arapov.trade/assets/img/content/imbalanceintrading3.png',
          author: { '@id': 'https://arapov.trade/en#person' },
          publisher: {
            '@type': 'Organization',
            name: 'ArapovTrade',
            url: 'https://arapov.trade',
            logo: {
              '@type': 'ImageObject',
              url: 'https://arapov.trade/assets/img/favicon.ico',
            },
          },
          datePublished: '2026-03-25T00:00:00Z',
          dateModified: '2026-03-31T00:00:00Z',
          mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': 'https://arapov.trade/en/freestudying/imbalanceintrading',
          },
          articleSection: 'Trading',
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
      alternateName: [
        'Ігор Арапов',
        'Арапов Игорь',
        'I. Arapov',
        'Игорь Арапов',
        'І. В. Арапов',
        'Арапов Ігор',
        'Arapov Igor',
      ],

      url: 'https://arapov.trade/en',
      image:
        'https://arapov.trade/assets/redesignArapovTrade/img/imageAuthor-light.png',
      sameAs: [
        'https://www.wikidata.org/wiki/Q137454477',
        'https://scholar.google.com/citations?user=N440tWQAAAAJ',
        'https://orcid.org/0009-0003-0430-778X',
        'https://isni.org/isni/0000000529518564',
        'https://www.amazon.com/stores/author/B0GBRFY457',
        'https://github.com/ArapovTrade',
        'https://ua.linkedin.com/in/arapovtrade',
        'https://www.youtube.com/@ArapovTrade',
        'https://t.me/ArapovTrade',
      ],
      jobTitle: [
        'Independent researcher,',
        'trader',
        'author and founder of arapov.trade',
      ],
      description:
        'Independent researcher, practicing trader, author of books on trading and scientific publications. Specializes in trading psychology and cognitive biases in financial markets.',
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
          name: 'What is imbalance in trading?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Imbalance is a disproportion between market supply and demand causing uneven liquidity distribution and significant price movement in one direction.',
          },
        },
        {
          '@type': 'Question',
          name: 'What types of imbalance exist?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Three main types exist: local imbalance (short-term), structural imbalance (long-term dominance of one side), and liquidity imbalance (large player manipulations).',
          },
        },
        {
          '@type': 'Question',
          name: 'How to identify imbalance zones?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Imbalance zones are identified through Market Profile, Delta Volume, Footprint Charts, and Order Flow showing volume distribution and order flows.',
          },
        },
        {
          '@type': 'Question',
          name: 'Why does price return to imbalance zones?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'After strong impulsive movement, unfilled liquidity remains in the imbalance zone. Markets seek balance, so price often returns for retests.',
          },
        },
        {
          '@type': 'Question',
          name: 'How to trade imbalance zones?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Identify sharp movement zones without pullbacks, wait for price return, find confirming signals, and open positions in trend direction.',
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
      name: 'How to Trade Imbalance',
      step: [
        {
          '@type': 'HowToStep',
          position: 1,
          name: 'Identify imbalance zone',
          text: 'Find sharp impulsive movement areas without significant corrections on the chart.',
        },
        {
          '@type': 'HowToStep',
          position: 2,
          name: 'Analyze volumes',
          text: 'Analyze Delta Volume to determine buyer or seller dominance.',
        },
        {
          '@type': 'HowToStep',
          position: 3,
          name: 'Wait for retest',
          text: 'Wait for price return to imbalance zone and look for confirming signals.',
        },
        {
          '@type': 'HowToStep',
          position: 4,
          name: 'Confirm entry',
          text: 'Use candlestick patterns or volume increase to confirm entry point.',
        },
        {
          '@type': 'HowToStep',
          position: 5,
          name: 'Manage risk',
          text: 'Place stop-loss beyond imbalance zone. Risk to reward ratio minimum 1:2.',
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
      name: 'Imbalance Trading Glossary',
      hasDefinedTerm: [
        {
          '@type': 'DefinedTerm',
          name: 'Imbalance',
          description:
            'Disproportion between supply and demand causing uneven liquidity distribution',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Volume Profile',
          description:
            'Tool showing trading volume distribution across price levels',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Delta Volume',
          description:
            'Difference between buying and selling volumes at price level',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Footprint Charts',
          description:
            'Chart visualizing trades inside candles with volume detail',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Order Flow',
          description:
            'Order flow analysis showing market participant activity',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Market Profile',
          description:
            'Method analyzing volume and time distribution across price levels',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Local Imbalance',
          description: 'Short-term disruption of supply and demand balance',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Structural Imbalance',
          description: 'Long-term dominance of one market side forming trends',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Retest',
          description: 'Price return to level to verify its significance',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Cluster Analysis',
          description:
            'Method analyzing volume distribution in clusters inside candles',
        },
      ],
    };

    this.addJsonLdSchema(data);
  }
}
