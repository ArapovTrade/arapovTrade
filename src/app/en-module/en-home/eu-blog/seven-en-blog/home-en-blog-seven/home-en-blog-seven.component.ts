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
  selector: 'app-home-en-blog-seven',
  templateUrl: './home-en-blog-seven.component.html',
  styleUrl: './home-en-blog-seven.component.scss',
})
export class HomeEnBlogSevenComponent implements OnInit {
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

    this.titleService.setTitle('How to Make Money Trading: Complete Guide');
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.updateTag({
      name: 'description',
      content:
        'How to Make Money Trading: practical guide to market selection, trading strategies and risk management for beginner traders.',
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
            'https://arapov.trade/en/freestudying/makingmoneyintrading#article',
          headline: 'How to Make Money Trading: Practical Guide',
          description:
            'How to Make Money Trading: practical guide to market selection, trading strategies and risk management.',
          image:
            'https://arapov.trade/assets/img/content/makingmoneyintrading1.webp',
          datePublished: '2025-04-15T00:00:00Z',
          dateModified: '2025-12-29T00:00:00Z',
          author: {
            '@id': 'https://arapov.trade/en#person',
          },
          publisher: {
            '@type': 'Organization',
            '@id': 'https://arapov.trade/#organization',
            name: 'Pair Trade',
            url: 'https://arapov.trade',
            logo: {
              '@type': 'ImageObject',
              url: 'https://arapov.trade/assets/img/favicon.ico',
            },
          },
          mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': 'https://arapov.trade/en/freestudying/makingmoneyintrading',
          },
          articleSection: 'Trading',
          keywords: [
            'trading income',
            'trading',
            'Forex',
            'trading strategies',
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
      '@id': 'https://arapov.trade/en/freestudying/makingmoneyintrading#faq',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'Can beginners really make money trading?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes, but it requires education, demo account practice, and strict risk management. About 20-30% of traders achieve consistent profits after 1-2 years of practice.',
          },
        },
        {
          '@type': 'Question',
          name: 'How much money do you need to start trading?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Minimum Forex deposit is $100. For comfortable trading with proper risk management, $500-1000 is recommended.',
          },
        },
        {
          '@type': 'Question',
          name: 'Which market is best for beginners?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Forex suits beginners due to high liquidity and accessibility. Cryptocurrencies are more volatile and risky for newcomers.',
          },
        },
        {
          '@type': 'Question',
          name: 'How much time does trading require?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Depends on style: scalping requires 4-8 hours daily, swing trading needs 1-2 hours.',
          },
        },
        {
          '@type': 'Question',
          name: 'Why do most traders lose money?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Main reasons: lack of education, ignoring risk management, emotional decisions, and unrealistic expectations.',
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
      '@id': 'https://arapov.trade/en/freestudying/makingmoneyintrading#howto',
      name: 'How to Start Making Money Trading',
      step: [
        {
          '@type': 'HowToStep',
          position: 1,
          name: 'Choose a market',
          text: 'Decide on direction: Forex, stocks, cryptocurrencies, or derivatives.',
        },
        {
          '@type': 'HowToStep',
          position: 2,
          name: 'Get educated',
          text: 'Learn the basics of technical and fundamental analysis.',
        },
        {
          '@type': 'HowToStep',
          position: 3,
          name: 'Open a demo account',
          text: 'Practice for at least 3 months without risking real money.',
        },
        {
          '@type': 'HowToStep',
          position: 4,
          name: 'Develop a strategy',
          text: 'Create a trading plan with clear entry and exit rules.',
        },
        {
          '@type': 'HowToStep',
          position: 5,
          name: 'Start small',
          text: 'Transition to a live account with minimal deposit and strict risk management.',
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
      '@id': 'https://arapov.trade/en/freestudying/makingmoneyintrading#terms',
      hasDefinedTerm: [
        {
          '@type': 'DefinedTerm',
          name: 'Trading',
          description:
            'The process of buying and selling financial instruments for profit',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Leverage',
          description:
            'A tool allowing traders to control positions larger than their deposit',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Scalping',
          description:
            'Trading style with numerous quick trades for small profits',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Swing Trading',
          description:
            'Trading medium-term price movements with positions held for days to weeks',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Technical Analysis',
          description:
            'Price forecasting method based on charts and indicators',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Fundamental Analysis',
          description: 'Asset valuation based on economic indicators',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Risk Management',
          description:
            'System for controlling trading risks and position sizing',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Volatility',
          description: 'Degree of asset price variability over a period',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Liquidity',
          description:
            'Ability of an asset to be sold quickly without significant price change',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Derivatives',
          description:
            'Financial instruments whose value depends on an underlying asset',
        },
      ],
    };

    this.addJsonLdSchema(data);
  }
}
