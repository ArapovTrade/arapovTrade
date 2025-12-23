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
  selector: 'app-home-eu-blog-thirty-six',
  templateUrl: './home-eu-blog-thirty-six.component.html',
  styleUrl: './home-eu-blog-thirty-six.component.scss',
})
export class HomeEuBlogThirtySixComponent implements OnInit {
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
      'Cryptocurrency Market: Complete Guide to Analysis and Trading | Arapov.trade'
    );
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.updateTag({
      name: 'description',
      content:
        'Complete guide to cryptocurrency market analysis: technical and fundamental analysis, trading strategies, risk management, and platform selection.',
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
            '@id': 'https://arapov.trade/en/freestudying/cryptocurrencytrading',
          },
          headline:
            'Cryptocurrency Market: Complete Guide to Analysis and Trading | Arapov.trade',
          description:
            'Complete guide to cryptocurrency market analysis: technical and fundamental analysis, trading strategies, risk management, and platform selection.',
          image:
            'https://arapov.trade/assets/img/content/cryptocurrencytrading.webp',
          datePublished: '2025-09-15T00:00:00+02:00',
          dateModified: '2025-09-15T00:00:00+02:00',
          inLanguage: 'en',
          author: {
            '@type': 'Person',
            '@id': 'https://arapov.trade/en#person',
            name: 'Игорь Арапов',
            url: 'https://arapov.trade/en',
            sameAs: [
              'https://www.youtube.com/@ArapovTrade',
              'https://www.mql5.com/ru/signals/2246716',
            ],
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
            name: 'Криптовалюты для новичков | Полное руководство',
            description:
              'Полное руководство по криптовалютам для новичков! Объясняю простыми словами что такое крипта, как отличить Bitcoin от СКАМ монет, почему мем-коины опасны и как избежать потери денег.',
            thumbnailUrl: [
              'https://img.youtube.com/vi/T8zWPUOKcqU/maxresdefault.jpg',
              'https://img.youtube.com/vi/T8zWPUOKcqU/hqdefault.jpg',
            ],
            uploadDate: '2025-09-15T00:00:00+02:00',
            duration: 'PT22M8S',
            contentUrl: 'https://www.youtube.com/watch?v=T8zWPUOKcqU',
            embedUrl: 'https://www.youtube.com/embed/T8zWPUOKcqU',
            inLanguage: 'ru',
            keywords:
              'криптовалюты, биткоин, скам монеты, мем коины, риски криптовалют',
            hasPart: [
              {
                '@type': 'Clip',
                name: 'Что такое криптовалюты - определение и основы',
                startOffset: 0,
                endOffset: 292,
                url: 'https://www.youtube.com/watch?v=T8zWPUOKcqU&t=0',
              },
              {
                '@type': 'Clip',
                name: 'Bitcoin - модель эмиссии и преимущества',
                startOffset: 292,
                endOffset: 630,
                url: 'https://www.youtube.com/watch?v=T8zWPUOKcqU&t=292',
              },
              {
                '@type': 'Clip',
                name: 'Что такое СКАМ криптовалюты - признаки мошенничества',
                startOffset: 630,
                endOffset: 786,
                url: 'https://www.youtube.com/watch?v=T8zWPUOKcqU&t=630',
              },
              {
                '@type': 'Clip',
                name: 'Мем-коины и ловушки для трейдеров',
                startOffset: 786,
                endOffset: 976,
                url: 'https://www.youtube.com/watch?v=T8zWPUOKcqU&t=786',
              },
              {
                '@type': 'Clip',
                name: 'Делистинг монет - как биржи выкидывают скам',
                startOffset: 976,
                endOffset: 1089,
                url: 'https://www.youtube.com/watch?v=T8zWPUOKcqU&t=976',
              },
              {
                '@type': 'Clip',
                name: 'Как защитить деньги на крипторынке',
                startOffset: 1089,
                endOffset: 1328,
                url: 'https://www.youtube.com/watch?v=T8zWPUOKcqU&t=1089',
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
          name: 'What is the cryptocurrency market?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'The cryptocurrency market is a global decentralized ecosystem of digital assets built on blockchain technology. It operates 24/7, enabling trading without intermediaries.',
          },
        },
        {
          '@type': 'Question',
          name: 'What methods exist for analyzing cryptocurrencies?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Main methods include fundamental analysis (technology, team, tokenomics), technical analysis (indicators, levels), and sentiment analysis (market mood monitoring).',
          },
        },
        {
          '@type': 'Question',
          name: 'How to manage risks when trading cryptocurrencies?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Key principles: stop-losses, risk per trade limited to 1-2% of capital, portfolio diversification, and emotional discipline.',
          },
        },
        {
          '@type': 'Question',
          name: 'What strategy should a beginner choose?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Dollar-cost averaging (DCA) strategy is recommended for long-term investing, reducing volatility impact without constant monitoring.',
          },
        },
        {
          '@type': 'Question',
          name: 'How to choose a cryptocurrency exchange?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Consider: security (2FA, cold storage), liquidity, fees, and interface convenience.',
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
      name: 'How to Start Trading Cryptocurrencies',
      description: 'Step-by-step guide for beginner traders',
      step: [
        {
          '@type': 'HowToStep',
          position: 1,
          name: 'Learn the basics',
          text: 'Master blockchain principles, major cryptocurrencies, and market terminology.',
        },
        {
          '@type': 'HowToStep',
          position: 2,
          name: 'Choose an exchange',
          text: 'Register on a verified platform with 2FA and high liquidity.',
        },
        {
          '@type': 'HowToStep',
          position: 3,
          name: 'Develop a strategy',
          text: 'Define your goals, risk tolerance, and trading style.',
        },
        {
          '@type': 'HowToStep',
          position: 4,
          name: 'Set up risk management',
          text: 'Establish stop-losses and diversify your portfolio.',
        },
        {
          '@type': 'HowToStep',
          position: 5,
          name: 'Practice',
          text: 'Start with small amounts and maintain a trading journal.',
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
      name: 'Crypto Trading Glossary',
      hasDefinedTerm: [
        {
          '@type': 'DefinedTerm',
          name: 'Blockchain',
          description:
            'Distributed ledger recording cryptocurrency transactions',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Volatility',
          description: 'Degree of price variation over time',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Stop-loss',
          description: 'Order to close position at predetermined loss level',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Liquidity',
          description: 'Ability to quickly buy or sell without affecting price',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Cold wallet',
          description: 'Offline cryptocurrency storage for maximum security',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Halving',
          description:
            'Bitcoin mining reward reduction occurring every four years',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Altseason',
          description: 'Period when altcoins outperform Bitcoin',
        },
        {
          '@type': 'DefinedTerm',
          name: 'DeFi',
          description: 'Decentralized finance applications on blockchain',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Stablecoin',
          description: 'Cryptocurrency pegged to stable asset like USD',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Smart contract',
          description: 'Self-executing code on blockchain',
        },
      ],
    };

    this.addJsonLdSchema(data);
  }
}
