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
  selector: 'app-home-en-blog-ten',
  templateUrl: './home-en-blog-ten.component.html',
  styleUrl: './home-en-blog-ten.component.scss',
})
export class HomeEnBlogTenComponent implements OnInit {
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
      'Why Traders Lose Their Deposits: Main Reasons and How to Avoid Them | Arapov.trade',
    );
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.updateTag({
      name: 'description',
      content:
        'Analyzing the main reasons for deposit loss in trading: lack of plan, ignoring risk management, emotional mistakes. Practical tips for capital preservation.',
    });
    this.meta.updateTag({ name: 'datePublished', content: '2025-04-09' });
    this.meta.updateTag({
      property: 'og:image',
      content: '/assets/img/content/mainreasonforlosses.webp',
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
          headline:
            'Why Traders Lose Their Deposits: Main Reasons and How to Avoid Them',
          description:
            'Analyzing the main reasons for deposit loss in trading: lack of plan, ignoring risk management, emotional mistakes. Practical tips for capital preservation.',
          image:
            'https://arapov.trade/assets/img/content/reasonfordepositeloose.webp',
          datePublished: '2025-04-15T00:00:00Z',
          dateModified: '2025-12-29T00:00:00Z',
          author: {
            '@id': 'https://arapov.trade/en#person',
          },
          publisher: {
            '@type': 'Organization',
            name: 'Arapov.trade',
            url: 'https://arapov.trade',
            logo: {
              '@type': 'ImageObject',
              url: 'https://arapov.trade/assets/img/favicon.ico',
            },
          },
          mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': 'https://arapov.trade/en/freestudying/mainreasonforlosses',
          },
          articleSection: 'Trading Education',
          wordCount: 1520,
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
          name: 'Why do most traders lose money?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Main reasons: lack of trading plan, ignoring risk management, emotional decisions, insufficient market knowledge, and unrealistic expectations. Statistics show that about 90% of traders lose their deposits due to these mistakes.',
          },
        },
        {
          '@type': 'Question',
          name: 'How to avoid blowing your account?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Develop a trading plan, limit risk to 1-2% per trade, always use stop-losses, control emotions, and regularly analyze your results. Start with a demo account to practice your strategy.',
          },
        },
        {
          '@type': 'Question',
          name: 'What percentage of traders lose money?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'According to various studies, 70% to 90% of retail traders lose their deposits. However, among those who apply systematic approaches and strict risk management, the success rate is significantly higher.',
          },
        },
        {
          '@type': 'Question',
          name: 'What is tilt in trading?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Tilt is an emotional state where a trader starts making impulsive decisions after losses, increases risks, and deviates from the trading plan trying to quickly recover. This is one of the main causes of complete deposit loss.',
          },
        },
        {
          '@type': 'Question',
          name: 'How long does it take to learn profitable trading?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'On average, it takes 1 to 3 years of consistent practice, learning, and error analysis. Success depends on discipline, quality of education, and ability to control emotions. Demo trading accelerates the process without risking real money.',
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
      name: 'How to Protect Your Deposit and Avoid Common Mistakes',
      description:
        'Step-by-step guide to protecting trading capital from common trader errors',
      step: [
        {
          '@type': 'HowToStep',
          position: 1,
          name: 'Create a Trading Plan',
          text: 'Define entry and exit rules, profit targets, acceptable risk, and instruments to trade. The plan should be specific and measurable.',
        },
        {
          '@type': 'HowToStep',
          position: 2,
          name: 'Implement Strict Risk Management',
          text: 'Limit risk per trade to 1-2% of deposit, always set stop-losses, calculate position size before entering trades.',
        },
        {
          '@type': 'HowToStep',
          position: 3,
          name: 'Control Your Emotions',
          text: "Keep a trading journal, take breaks after losses, don't trade under stress or euphoria. Recognize signs of tilt.",
        },
        {
          '@type': 'HowToStep',
          position: 4,
          name: 'Continue Learning',
          text: 'Study the market, analyze your trades, test strategies on demo accounts. Trading requires continuous development.',
        },
        {
          '@type': 'HowToStep',
          position: 5,
          name: 'Evaluate Expected Value',
          text: 'Calculate the expected profitability of your strategy. Positive expectancy is the foundation of long-term success.',
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
      name: 'Trading Terms: Mistakes and Risks',
      description: 'Key concepts related to deposit loss and risk management',
      hasDefinedTerm: [
        {
          '@type': 'DefinedTerm',
          name: 'Account Blowup',
          description:
            'Complete or significant loss of trading capital due to losing trades',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Tilt',
          description:
            'Emotional state in which a trader makes impulsive decisions after a series of losses',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Trading Plan',
          description:
            'Document with trading rules: entry/exit criteria, risk per trade, instruments traded',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Risk Management',
          description:
            'System for managing risks to protect capital from significant losses',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Stop-Loss',
          description:
            'Protective order for automatically closing a losing position',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Leverage',
          description:
            "Mechanism for increasing trading volume using broker's borrowed funds",
        },
        {
          '@type': 'DefinedTerm',
          name: 'Expected Value',
          description:
            'Average trade result in long-term perspective considering probability and profit/loss size',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Drawdown',
          description:
            'Trading account decline from maximum to current minimum',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Overtrading',
          description:
            'Excessive number of trades leading to increased commissions and emotional exhaustion',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Trading Journal',
          description:
            'Record of trades, emotions, and conclusions for analysis and improvement',
        },
      ],
    };

    this.addJsonLdSchema(data);
  }
}
