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
  selector: 'app-home-eu-blog-thirty-two',
  templateUrl: './home-eu-blog-thirty-two.component.html',
  styleUrl: './home-eu-blog-thirty-two.component.scss',
})
export class HomeEuBlogThirtyTwoComponent implements OnInit {
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
      'Is Trading Education Worth the Investment? | Arapov.trade',
    );
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.updateTag({
      name: 'description',
      content:
        'Is trading education worth the investment? Analysis of paid course benefits, self-learning risks, and how to choose quality programs for beginner traders.',
    });
    this.meta.updateTag({ name: 'datePublished', content: '2025-04-02' });
    this.meta.updateTag({
      property: 'og:image',
      content: '/assets/img/content/purchasingcourses.webp',
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
          headline: 'Is Trading Education Worth the Investment?',
          description:
            'Comprehensive analysis of paid trading education benefits, comparison with self-learning, and recommendations for choosing quality courses',
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
          datePublished: '2025-04-15T00:00:00Z',
          dateModified: '2025-12-29T00:00:00Z',
          mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': 'https://arapov.trade/en/freestudying/purchasingcourses',
          },
          image:
            'https://arapov.trade/assets/img/content/purchasingcourses1.webp',
          articleSection: 'Trading Education',
          wordCount: 1550,
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
          name: 'Should I pay for trading courses when free materials exist?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Paid courses offer structured curricula, practical exercises, and mentorship that significantly accelerate learning. Free materials are often fragmented and contain outdated information. Investing in quality education pays off through time savings and reduced losses during the initial trading phase.',
          },
        },
        {
          '@type': 'Question',
          name: 'How long does it take to learn trading?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'With a systematic approach, basic skills can be mastered in 2-3 months. Achieving consistent profitability typically requires 6 months to a year of practice. Professional courses shorten this timeline through structured programs and mentor feedback.',
          },
        },
        {
          '@type': 'Question',
          name: 'What skills do trading courses provide?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Quality courses teach technical and fundamental analysis, risk management, trading platform operation, and trading psychology. They also develop discipline, emotional control, and systematic thinking skills.',
          },
        },
        {
          '@type': 'Question',
          name: 'Can you learn trading on your own?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Self-learning is possible but takes significantly longer and carries risks: unstructured knowledge, lack of feedback, and high probability of financial losses from experimenting with real accounts.',
          },
        },
        {
          '@type': 'Question',
          name: 'How to choose quality trading courses?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Consider the instructors experience, availability of practical assignments, access to mentorship, and graduate reviews. A good course includes modules on market analysis, risk management, and psychology. Avoid programs promising quick riches.',
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
      name: 'How to Start Learning Trading',
      description:
        'Step-by-step guide for beginners starting their trading education',
      step: [
        {
          '@type': 'HowToStep',
          position: 1,
          name: 'Define your learning goals',
          text: 'Decide what you want to achieve: master basic concepts, develop a trading strategy, or improve current results.',
        },
        {
          '@type': 'HowToStep',
          position: 2,
          name: 'Study basics independently',
          text: 'Familiarize yourself with basic terminology and financial market principles through free materials.',
        },
        {
          '@type': 'HowToStep',
          position: 3,
          name: 'Choose a quality course',
          text: 'Evaluate the curriculum, instructor experience, and class format. Prefer courses with practical assignments.',
        },
        {
          '@type': 'HowToStep',
          position: 4,
          name: 'Practice on a demo account',
          text: 'Apply your knowledge on a demonstration account without risking real money. Test strategies and analyze results.',
        },
        {
          '@type': 'HowToStep',
          position: 5,
          name: 'Keep a trading journal',
          text: 'Record all trades, analyze successes and mistakes to improve your trading approach.',
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
      name: 'Trading Terms Glossary',
      description: 'Key terms related to trading education',
      hasDefinedTerm: [
        {
          '@type': 'DefinedTerm',
          name: 'Technical Analysis',
          description:
            'A method of forecasting price movements based on studying charts, patterns, and indicators',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Fundamental Analysis',
          description:
            'A method of asset valuation based on economic indicators and macroeconomic factors',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Risk Management',
          description:
            'A system of risk control methods in trading, including position sizing and protective order placement',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Stop-Loss',
          description:
            'A protective order that automatically closes a position when a specified loss level is reached',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Demo Account',
          description:
            'A practice trading account with virtual money for risk-free learning',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Leverage',
          description:
            'A margin trading tool allowing traders to control amounts exceeding their own capital',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Volatility',
          description:
            'A measure of price variability of an asset over a specific time period',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Trading Strategy',
          description:
            'A systematic set of rules for entering trades, managing positions, and taking profits',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Trading Psychology',
          description:
            'The branch of trading studying the impact of emotions on trading decisions',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Scalping',
          description:
            'A short-term trading strategy based on making multiple quick trades with small profits',
        },
      ],
    };

    this.addJsonLdSchema(data);
  }
}
