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
  selector: 'app-home-en-blog-fourty-seven',
  templateUrl: './home-en-blog-fourty-seven.component.html',
  styleUrl: './home-en-blog-fourty-seven.component.scss',
})
export class HomeEnBlogFourtySevenComponent implements OnInit {
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
      'Fundamental Analysis: Principles and Methods for Asset Valuation'
    );
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.updateTag({
      name: 'description',
      content:
        'Complete guide to fundamental analysis of financial markets. Learn macroeconomic indicators, company valuation, and trend forecasting for successful investing.',
    });
    this.meta.updateTag({ name: 'author', content: 'Ihor Arapov' });
    this.meta.updateTag({ name: 'datePublished', content: '2025-01-17' });
    this.meta.updateTag({
      property: 'og:image',
      content: '/assets/img/content/fundamentalanalysis.webp',
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
            '@id': 'https://arapov.trade/en/freestudying/fundamentalanalysis',
          },
          headline:
            'Fundamental Analysis: Principles and Methods for Asset Valuation',
          description:
            'Complete guide to fundamental analysis of financial markets. Learn macroeconomic indicators, company valuation, and trend forecasting for successful investing.',
          image:
            'https://arapov.trade/assets/img/content/fundamentalanalysis.webp',
          datePublished: '2025-01-15T00:00:00+02:00',
          dateModified: '2025-07-15T00:00:00+02:00',
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
            name: 'Фундаментальный анализ рынка | Почему не работает для трейдеров',
            description:
              'Почему фундаментальный анализ рынка не работает для розничных трейдеров? Разбираем метод Вайкоффа и объясняем, как крупные игроки торгуют против новостей, используя инсайдерскую информацию и объёмный анализ.',
            thumbnailUrl: [
              'https://img.youtube.com/vi/6o21L5mLTrA/maxresdefault.jpg',
              'https://img.youtube.com/vi/6o21L5mLTrA/hqdefault.jpg',
            ],
            uploadDate: '2025-07-15T00:00:00+02:00',
            duration: 'PT8M25S',
            contentUrl: 'https://www.youtube.com/watch?v=6o21L5mLTrA',
            embedUrl: 'https://www.youtube.com/embed/6o21L5mLTrA',
            inLanguage: 'ru',
            keywords:
              'фундаментальный анализ, метод Вайкоффа, крупные игроки, инсайдерская информация, трейдинг',
            hasPart: [
              {
                '@type': 'Clip',
                name: 'Почему мы не используем фундаментальный анализ в трейдинге',
                startOffset: 0,
                endOffset: 59,
                url: 'https://www.youtube.com/watch?v=6o21L5mLTrA&t=0',
              },
              {
                '@type': 'Clip',
                name: 'Цитата Ричарда Вайкоффа о крупных операторах рынка',
                startOffset: 59,
                endOffset: 161,
                url: 'https://www.youtube.com/watch?v=6o21L5mLTrA&t=59',
              },
              {
                '@type': 'Clip',
                name: 'Проницательность крупного капитала и инсайдерская информация',
                startOffset: 161,
                endOffset: 210,
                url: 'https://www.youtube.com/watch?v=6o21L5mLTrA&t=161',
              },
              {
                '@type': 'Clip',
                name: 'Крупные деньги торгуют будущую стоимость, а не текущую цену',
                startOffset: 210,
                endOffset: 505,
                url: 'https://www.youtube.com/watch?v=6o21L5mLTrA&t=210',
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
          name: 'What is fundamental analysis?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: "Fundamental analysis is an asset valuation method based on studying economic, financial, and industry factors. Its goal is to determine an asset's fair value and identify undervalued or overvalued instruments.",
          },
        },
        {
          '@type': 'Question',
          name: 'What indicators are used in fundamental analysis?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Main indicators include: macroeconomic (GDP, inflation, interest rates), corporate (revenue, profit, P/E, P/B), and industry factors (demand dynamics, competitive environment, regulatory changes).',
          },
        },
        {
          '@type': 'Question',
          name: 'How does fundamental analysis differ from technical analysis?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Fundamental analysis studies economic factors and fair asset value for long-term investments. Technical analysis focuses on charts, patterns, and volumes for short-term trading.',
          },
        },
        {
          '@type': 'Question',
          name: 'Which markets is fundamental analysis applicable to?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: "Fundamental analysis applies to stock markets, forex, commodity markets, and cryptocurrency markets. Methods are adapted to each market's specifics.",
          },
        },
        {
          '@type': 'Question',
          name: 'What mistakes are made in fundamental analysis?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Typical mistakes: blind trust in financial statements, ignoring macroeconomic factors, lack of diversification, underestimating market sentiment impact on short-term dynamics.',
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
      name: 'How to Conduct Fundamental Analysis',
      step: [
        {
          '@type': 'HowToStep',
          position: 1,
          name: 'Study macroeconomics',
          text: 'Analyze key indicators: GDP, inflation, central bank interest rates, unemployment levels. These data determine the overall state of the economy.',
        },
        {
          '@type': 'HowToStep',
          position: 2,
          name: 'Evaluate the industry',
          text: 'Study demand and supply dynamics in the industry, competitive environment, regulatory changes, and technological trends affecting the sector.',
        },
        {
          '@type': 'HowToStep',
          position: 3,
          name: 'Analyze the company',
          text: 'Study financial statements: revenue, net profit, debt load. Calculate key ratios P/E, P/B, ROE for valuation.',
        },
        {
          '@type': 'HowToStep',
          position: 4,
          name: 'Determine fair value',
          text: "Compare the asset's market price with calculated fair value. Undervalued assets represent investment opportunities.",
        },
        {
          '@type': 'HowToStep',
          position: 5,
          name: 'Consider risks',
          text: 'Assess geopolitical, currency, and industry risks. Diversify your portfolio to reduce potential losses.',
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
      name: 'Fundamental Analysis Terms',
      hasDefinedTerm: [
        {
          '@type': 'DefinedTerm',
          name: 'Fundamental analysis',
          description:
            'Asset valuation method based on economic, financial, and industry factors',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Fair value',
          description:
            'Calculated intrinsic asset value based on fundamental indicators',
        },
        {
          '@type': 'DefinedTerm',
          name: 'P/E ratio',
          description:
            'Price-to-earnings ratio showing how much investors pay per unit of profit',
        },
        {
          '@type': 'DefinedTerm',
          name: 'P/B ratio',
          description: 'Price-to-book ratio comparing market and book value',
        },
        {
          '@type': 'DefinedTerm',
          name: 'GDP',
          description: 'Gross Domestic Product measuring total economic output',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Inflation',
          description:
            'Rise in general price level reducing currency purchasing power',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Interest rate',
          description:
            'Central bank rate affecting borrowing costs in the economy',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Dividend yield',
          description: 'Ratio of annual dividends to stock market price',
        },
        {
          '@type': 'DefinedTerm',
          name: 'ROE',
          description:
            'Return on equity measuring capital utilization efficiency',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Debt load',
          description: "Ratio of borrowed funds to company's equity",
        },
      ],
    };

    this.addJsonLdSchema(data);
  }
}
