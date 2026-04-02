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
  selector: 'app-home-en-blog-one',
  templateUrl: './home-en-blog-one.component.html',
  styleUrl: './home-en-blog-one.component.scss',
})
export class HomeEnBlogOneComponent implements OnInit {
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
      'Market Phases in Trading: How to Identify Current Cycle Stages | Igor Arapov',
    );
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.updateTag({
      name: 'description',
      content:
        'Market phases in trading: accumulation, uptrend, distribution, and downtrend. Learn how to identify current cycle phases and adapt your trading strategy accordingly.',
    });
    this.meta.updateTag({ name: 'author', content: 'Arapov Ihor' });
    this.meta.updateTag({ name: 'datePublished', content: '2025-01-13' });
    this.meta.updateTag({
      property: 'og:image',
      content: '/assets/img/content/blogmarketphases.webp',
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
          headline:
            'Market Phases in Trading: How to Identify Current Cycle Stages',
          description:
            'Comprehensive guide to the four market cycle phases: accumulation, uptrend, distribution, and downtrend. Trading strategies for each phase explained.',
          image:
            'https://arapov.trade/assets/img/content/blogmarketphases.webp',
          datePublished: '2026-03-25T00:00:00Z',
          dateModified: '2026-03-31T00:00:00Z',
          author: {
            '@id': 'https://arapov.trade/en#person',
          },
          publisher: {
            '@type': 'Organization',
            name: 'Arapov Trade',
            url: 'https://arapov.trade',
            logo: {
              '@type': 'ImageObject',
              url: 'https://arapov.trade/assets/img/favicon.ico',
            },
          },
          mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': 'https://arapov.trade/en/freestudying/blogmarketphases',
          },
          articleSection: 'Trading Education',
          keywords: [
            'market phases',
            'market cycles',
            'accumulation',
            'distribution',
            'trend',
            'technical analysis',
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
          name: 'What are the main market phases?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'There are four main market cycle phases: accumulation phase (consolidation after decline), uptrend phase (growth period), distribution phase (consolidation at top), and downtrend phase (decline period). These phases cyclically alternate in sequence.',
          },
        },
        {
          '@type': 'Question',
          name: 'How to identify the accumulation phase on a chart?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'The accumulation phase is characterized by horizontal price movement within a narrow range following a prolonged decline. Signs include: low volatility, repeated testing of support level without breaking it, increasing volumes on upward moves, bullish divergences on RSI and MACD.',
          },
        },
        {
          '@type': 'Question',
          name: 'Which indicators help identify current market phase?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Market phase identification uses: moving averages (trend direction), RSI and MACD (divergences and momentum), Bollinger Bands (volatility), ADX (trend strength), Volume Profile (volume distribution). Combining multiple indicators improves accuracy.',
          },
        },
        {
          '@type': 'Question',
          name: 'What distinguishes distribution from accumulation phase?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Accumulation occurs at lows after decline — large players buy assets. Distribution occurs at highs after growth — large players sell assets. In accumulation, volumes increase on price rises; in distribution — on price falls. Psychology also differs: pessimism in accumulation, euphoria in distribution.',
          },
        },
        {
          '@type': 'Question',
          name: 'How to trade in different market phases?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'In accumulation: prepare to buy upon resistance breakout. In uptrend: buy pullbacks, use trailing stops. In distribution: take profits, tighten stops. In downtrend: use short positions. Risk management is essential in all phases.',
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
      name: 'How to Identify Current Market Cycle Phase',
      description:
        'Step-by-step guide to determining current market phase for trading decisions',
      step: [
        {
          '@type': 'HowToStep',
          position: 1,
          name: 'Determine overall context',
          text: 'Analyze the chart on higher timeframes (daily, weekly). Determine whether the market is in an uptrend, downtrend, or sideways movement following a strong impulse.',
        },
        {
          '@type': 'HowToStep',
          position: 2,
          name: 'Evaluate price structure',
          text: 'Study the sequence of highs and lows. Higher highs and lows indicate uptrend, lower ones indicate downtrend, horizontal ones suggest accumulation or distribution phase.',
        },
        {
          '@type': 'HowToStep',
          position: 3,
          name: 'Analyze trading volumes',
          text: 'Compare volumes on upward and downward moves. In accumulation, volumes increase on price rises. In distribution, volumes increase on falls. In trends, volumes confirm movement direction.',
        },
        {
          '@type': 'HowToStep',
          position: 4,
          name: 'Check indicators',
          text: 'Use RSI and MACD to identify divergences warning of potential reversal. Apply ADX to assess current trend strength. Bollinger Bands show volatility compression before strong moves.',
        },
        {
          '@type': 'HowToStep',
          position: 5,
          name: 'Make trading decision',
          text: 'Based on identified phase, select appropriate strategy: prepare for entry in accumulation, follow trend in trending phases, take profits in distribution. Set risk management parameters according to current phase.',
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
      name: 'Market Phases Glossary',
      description:
        'Key terms and concepts related to market cycle phases in trading',
      hasDefinedTerm: [
        {
          '@type': 'DefinedTerm',
          name: 'Accumulation Phase',
          description:
            'Consolidation period at market lows when large players systematically purchase assets following extended price decline',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Distribution Phase',
          description:
            'Consolidation period at market highs when large players take profits and transfer positions to late buyers',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Uptrend',
          description:
            'Market phase with sustained price growth characterized by sequence of higher highs and higher lows',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Downtrend',
          description:
            'Market phase with sustained price decline characterized by sequence of lower highs and lower lows',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Divergence',
          description:
            'Discrepancy between price movement and indicator readings signaling potential trend reversal',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Market Maker',
          description:
            'Large market participant providing liquidity and capable of influencing asset price formation',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Consolidation',
          description:
            'Period of sideways price movement within limited range preceding strong directional impulse',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Market Cycle',
          description:
            'Sequence of recurring asset price development phases: accumulation, growth, distribution, decline',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Volume Profile',
          description:
            'Analysis tool showing trading volume distribution across price levels to identify zones of participant interest',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Capitulation',
          description:
            'Mass panic selling by market participants typically occurring in final stage of downtrend',
        },
      ],
    };

    this.addJsonLdSchema(data);
  }
}
