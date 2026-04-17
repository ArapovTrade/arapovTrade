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
  selector: 'app-home-eu-blog-thirty-seven',
  templateUrl: './home-eu-blog-thirty-seven.component.html',
  styleUrl: './home-eu-blog-thirty-seven.component.scss',
})
export class HomeEuBlogThirtySevenComponent implements OnInit {
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
      'Trading Drawdown: Risk Management and Capital Recovery | Arapov.trade',
    );
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.updateTag({
      name: 'description',
      content:
        'Trading drawdown explained: types of drawdown, causes, analysis methods and minimization strategies. Practical guide to risk management and capital recovery.',
    });
    this.meta.updateTag({ name: 'datePublished', content: '2025-04-02' });
    this.meta.updateTag({ name: 'dateModified', content: '2026-04-15' });
    this.meta.updateTag({
      property: 'og:image',
      content: '/assets/img/content/drawdowns.webp',
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
          headline: 'Trading Drawdown: Risk Management and Capital Recovery',
          description:
            'Comprehensive guide to drawdown management: types of drawdown, causes, analysis methods, minimization strategies and capital recovery techniques.',
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
          datePublished: '2026-03-25T00:00:00Z',
          dateModified: '2026-04-15T00:00:00Z',
          image: 'https://arapov.trade/assets/img/content/drawdowns1.webp',
          mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': 'https://arapov.trade/en/freestudying/drawdowns',
          },
          articleSection: 'Trading',
          keywords: [
            'drawdown',
            'risk management',
            'capital management',
            'account recovery',
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
          name: 'What is drawdown in trading?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Drawdown is a temporary decline in trading capital from its peak value to its current or minimum level. This metric is expressed in percentage or absolute terms and serves as a key indicator for assessing trading strategy risk.',
          },
        },
        {
          '@type': 'Question',
          name: 'What level of drawdown is considered acceptable?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'For conservative strategies, acceptable drawdown is up to 10-15%, for moderate strategies up to 20-25%, and for aggressive strategies up to 30-35%. Drawdown exceeding 50% is critically dangerous as it requires 100% profit to recover capital.',
          },
        },
        {
          '@type': 'Question',
          name: 'How to minimize drawdowns in trading?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Key minimization methods include: limiting risk per trade to 1-2% of capital, mandatory use of stop-losses, portfolio diversification, reducing position sizes during losing streaks, and following a trading plan.',
          },
        },
        {
          '@type': 'Question',
          name: 'How to recover capital after a deep drawdown?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Recovery requires reducing risks, analyzing loss causes, focusing on trade quality over quantity, and gradually increasing positions as the account grows. Avoid attempting to recover quickly through aggressive trading.',
          },
        },
        {
          '@type': 'Question',
          name: 'What is the difference between maximum and current drawdown?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Maximum drawdown represents the largest capital decline from peak to trough across entire trading history. Current drawdown is the immediate decline from the most recent peak, a dynamic metric that changes with each trade.',
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
      name: 'How to Manage Trading Drawdowns',
      description:
        'Step-by-step guide to controlling drawdowns and recovering trading capital',
      step: [
        {
          '@type': 'HowToStep',
          position: 1,
          name: 'Define acceptable risk level',
          text: 'Establish maximum acceptable drawdown for your strategy and limit risk per trade to 1-2% of capital.',
        },
        {
          '@type': 'HowToStep',
          position: 2,
          name: 'Set up protective orders',
          text: 'Place stop-losses for every position based on technical analysis, not arbitrary loss amounts.',
        },
        {
          '@type': 'HowToStep',
          position: 3,
          name: 'Monitor drawdown metrics',
          text: 'Track current, average, and maximum drawdown, analyze recovery time and recovery factor.',
        },
        {
          '@type': 'HowToStep',
          position: 4,
          name: 'Apply risk reduction rules',
          text: 'At 5% drawdown, reduce trade size by half. At 10%, pause trading for analysis.',
        },
        {
          '@type': 'HowToStep',
          position: 5,
          name: 'Recover capital systematically',
          text: 'After drawdown, reduce risks, analyze mistakes, focus on quality setups, and gradually increase positions.',
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
      name: 'Drawdown Management Glossary',
      hasDefinedTerm: [
        {
          '@type': 'DefinedTerm',
          name: 'Drawdown',
          description:
            'Temporary decline in trading capital from peak value to current or minimum level',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Maximum Drawdown',
          description:
            'The largest capital decline from peak to trough over a specified trading period',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Recovery Factor',
          description:
            'Ratio of accumulated profit to maximum drawdown, indicating strategy efficiency',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Risk Management',
          description:
            'System of controlling trading risks including position sizing and protective orders',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Stop-Loss',
          description:
            'Protective order that automatically closes a position at a predetermined loss level',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Recovery Time',
          description:
            'Period required to return capital to previous peak after a drawdown',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Diversification',
          description:
            'Distribution of capital across different assets to reduce overall portfolio risk',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Volatility',
          description:
            'Degree of price variation affecting potential drawdown magnitude',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Win Rate',
          description:
            'Percentage of profitable trades affecting drawdown frequency and depth',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Position Sizing',
          description:
            'Method of determining trade size based on risk parameters and account balance',
        },
      ],
    };

    this.addJsonLdSchema(data);
  }
}
