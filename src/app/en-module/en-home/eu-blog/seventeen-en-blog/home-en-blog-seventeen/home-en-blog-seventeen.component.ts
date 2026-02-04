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
  selector: 'app-home-en-blog-seventeen',
  templateUrl: './home-en-blog-seventeen.component.html',
  styleUrl: './home-en-blog-seventeen.component.scss',
})
export class HomeEnBlogSeventeenComponent implements OnInit {
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
      'Trading Myths: Debunking Popular Misconceptions | ArapovTrade',
    );
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.updateTag({
      name: 'description',
      content:
        'Examining major trading myths: from the illusion of quick riches to misconceptions about requiring large capital. Discover the truth about financial market trading.',
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
          '@id': 'https://arapov.trade/en/freestudying/tradingmyths#article',
          headline: 'Trading Myths: Debunking Popular Misconceptions',
          description:
            'Examining major trading myths: from the illusion of quick riches to misconceptions about requiring large capital. Discover the truth about financial market trading.',
          image: 'https://arapov.trade/assets/img/content/tradingmyths1.webp',
          datePublished: '2025-04-15T00:00:00Z',
          dateModified: '2025-12-29T00:00:00Z',
          author: {
            '@id': 'https://arapov.trade/en#person',
          },
          publisher: {
            '@type': 'Organization',
            '@id': 'https://arapov.trade/#organization',
            name: 'ArapovTrade',
            url: 'https://arapov.trade',
            logo: {
              '@type': 'ImageObject',
              url: 'https://arapov.trade/assets/img/favicon.ico',
            },
          },
          mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': 'https://arapov.trade/en/freestudying/tradingmyths',
          },
          articleSection: 'Trading Education',
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
      '@id': 'https://arapov.trade/en/freestudying/tradingmyths#faq',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'Can you get rich quickly through trading?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'No, trading requires months of learning and practice. Most beginners lose capital in the first year due to unrealistic expectations. Success comes through gradual development of analysis and risk management skills.',
          },
        },
        {
          '@type': 'Question',
          name: 'Do you need large capital to start trading?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'No, modern brokers allow starting with minimal amounts. Demo accounts provide practice opportunities without investment. Capital size affects absolute profit but not percentage strategy returns.',
          },
        },
        {
          '@type': 'Question',
          name: 'Why do professional traders also suffer losses?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Losing trades are an integral part of any trading system. Even strategies with mathematical advantage allow for a percentage of failures. Professionals manage profit-to-loss ratios through proper risk management.',
          },
        },
        {
          '@type': 'Question',
          name: 'Is trading gambling?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'No, unlike casinos, skilled traders create statistical advantage through analysis and risk management. Financial markets allow forming positive mathematical expectancy with a disciplined approach.',
          },
        },
        {
          '@type': 'Question',
          name: 'Do you need to constantly monitor the market?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'No, swing and position strategies require chart analysis only several times daily or weekly. Automatic orders protect positions without trader involvement. Excessive screen time often harms results.',
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
      '@id': 'https://arapov.trade/en/freestudying/tradingmyths#howto',
      name: 'How to Avoid Common Trading Misconceptions',
      description:
        'Step-by-step guide to developing realistic understanding of financial market trading',
      step: [
        {
          '@type': 'HowToStep',
          position: 1,
          name: 'Form realistic expectations',
          text: 'Abandon the idea of quick riches. Trading requires months of learning and practice. Plan for gradual skill development.',
        },
        {
          '@type': 'HowToStep',
          position: 2,
          name: 'Start with a demo account',
          text: 'Practice without risking real money. Master basic operations and test your strategy.',
        },
        {
          '@type': 'HowToStep',
          position: 3,
          name: 'Learn analysis fundamentals',
          text: 'Master technical and fundamental analysis. Focus on simple strategies based on support and resistance levels.',
        },
        {
          '@type': 'HowToStep',
          position: 4,
          name: 'Implement risk management',
          text: 'Limit risk per trade to a predetermined percentage of capital. Use stop-losses to protect positions.',
        },
        {
          '@type': 'HowToStep',
          position: 5,
          name: 'Keep a trading journal',
          text: 'Record all trades and analyze results. Learn from mistakes and improve your strategy based on real data.',
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
      '@id': 'https://arapov.trade/en/freestudying/tradingmyths#glossary',
      name: 'Trading Terms Glossary',
      hasDefinedTerm: [
        {
          '@type': 'DefinedTerm',
          name: 'Trading',
          description:
            'Buying and selling financial instruments to profit from price changes',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Risk Management',
          description:
            'System for controlling risks that defines acceptable losses per trade and overall position sizes',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Stop-Loss',
          description:
            'Automatic order to close a position when a specified loss level is reached',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Technical Analysis',
          description:
            'Method of predicting prices based on studying charts, patterns, and indicators',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Fundamental Analysis',
          description:
            'Asset valuation based on economic, financial, and other qualitative factors',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Demo Account',
          description:
            'Practice trading account with virtual money for risk-free learning',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Volatility',
          description:
            'Degree of price variability of an asset over a specific time period',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Mathematical Expectancy',
          description:
            'Average profit or loss per trade when a trading strategy is applied repeatedly',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Support and Resistance Levels',
          description:
            'Price zones where historically increased buyer or seller activity was observed',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Drawdown',
          description:
            'Decline in trading capital from a local maximum to a local minimum',
        },
      ],
    };

    this.addJsonLdSchema(data);
  }
}
