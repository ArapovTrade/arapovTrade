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
  selector: 'app-home-eu-blog-fifty-nine',
  templateUrl: './home-eu-blog-fifty-nine.component.html',
  styleUrl: './home-eu-blog-fifty-nine.component.scss',
})
export class HomeEuBlogFiftyNineComponent implements OnInit {
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
      'How to Trade Level Breakouts in Trading | Breakout Strategy Guide'
    );
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.updateTag({
      name: 'description',
      content:
        'Complete guide to trading breakouts of support and resistance levels. Learn how to identify genuine breakouts, use retests and pin bars for optimal trade entries.',
    });
    this.meta.updateTag({ name: 'datePublished', content: '2025-04-18' });
    this.meta.updateTag({
      property: 'og:image',
      content: '/assets/img/content/levelbreakoutstrategy.webp',
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
          headline: 'How to Trade Level Breakouts — Complete Trading Guide',
          description:
            'Complete guide to trading breakouts of support and resistance levels. Learn how to identify genuine breakouts, use retests and pin bars for optimal trade entries.',
          author: {
            '@id': 'https://arapov.trade/en#person',
          },
          image: [
            'https://arapov.trade/assets/img/content/levelbreakoutstrategy.webp',
          ],
          publisher: {
            '@type': 'Organization',
            name: 'Arapov Trade',
            logo: {
              '@type': 'ImageObject',
              url: 'https://arapov.trade/assets/img/favicon.ico',
            },
          },
          datePublished: '2025-04-15T00:00:00Z',
          dateModified: '2025-12-29T00:00:00Z',
          mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': 'https://arapov.trade/en/freestudying/levelbreakoutstrategy',
          },
          articleSection: 'Trading',
          keywords: [
            'level breakout',
            'breakout trading',
            'support levels',
            'resistance levels',
            'retest',
            'pin bar',
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
      mainEntity: [
        {
          '@type': 'Question',
          name: 'What is a level breakout in trading?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'A level breakout occurs when price decisively moves through a significant support or resistance level and continues in the breakout direction. This technical signal indicates a shift in the balance between buyers and sellers in the market.',
          },
        },
        {
          '@type': 'Question',
          name: 'How can you distinguish a genuine breakout from a false one?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'A genuine breakout is confirmed by high trading volume, sustained price movement beyond the level, and a successful retest of the broken level. False breakouts are characterized by quick price reversal back through the level on low volume.',
          },
        },
        {
          '@type': 'Question',
          name: 'What is a level retest and why wait for it?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'A retest is when price returns to the broken level to test it. After a retest, former resistance becomes support and vice versa. Waiting for a retest reduces the risk of entering on a false breakout and provides better risk-to-reward ratios.',
          },
        },
        {
          '@type': 'Question',
          name: 'What role does a pin bar play in breakout trading?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'A pin bar at a retested breakout level confirms the breakout strength and shows price rejection by one side of the market. The long shadow of a pin bar indicates a failed attempt to reverse the movement, strengthening the entry signal.',
          },
        },
        {
          '@type': 'Question',
          name: 'What is the optimal risk-to-reward ratio for breakout trading?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: "It's recommended to select trades with a risk-to-reward ratio of at least 1:2, ideally 1:3 or higher. This ensures consistent profitability even with a 40-50% win rate and protects capital during losing streaks.",
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
      name: 'How to Trade Level Breakouts',
      description:
        'Step-by-step guide to trading breakouts of support and resistance levels',
      step: [
        {
          '@type': 'HowToStep',
          position: 1,
          name: 'Identify Key Levels',
          text: 'Locate significant support and resistance levels on higher timeframes. Analyze historical data and focus on zones with multiple price touches.',
        },
        {
          '@type': 'HowToStep',
          position: 2,
          name: 'Wait for the Breakout',
          text: 'Wait for a clear breakout of the level accompanied by high trading volume. Confirm that the candle closes beyond the level — this validates the strength of the move.',
        },
        {
          '@type': 'HowToStep',
          position: 3,
          name: 'Level Retest',
          text: 'After the breakout, wait for price to return to the broken level. A successful retest confirms that the level has changed its role.',
        },
        {
          '@type': 'HowToStep',
          position: 4,
          name: 'Find Confirmation Signal',
          text: 'Look for candlestick patterns at the retest: pin bar, engulfing pattern, or hammer. These formations show price rejection and confirm continuation of the move.',
        },
        {
          '@type': 'HowToStep',
          position: 5,
          name: 'Enter Trade with Risk Management',
          text: 'Enter the position after signal confirmation. Place stop-loss beyond the pattern boundaries and take-profit at the next significant level with a risk-to-reward ratio of at least 1:2.',
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
      name: 'Breakout Trading Terminology',
      description: 'Essential terms for level breakout trading strategy',
      hasDefinedTerm: [
        {
          '@type': 'DefinedTerm',
          name: 'Level Breakout',
          description:
            'Price overcoming a significant support or resistance level with continued movement in the breakout direction',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Retest',
          description:
            'Price returning to a broken level to test it, after which the level changes its role',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Pin Bar',
          description:
            'A candlestick pattern with a long shadow and small body indicating price rejection and potential reversal',
        },
        {
          '@type': 'DefinedTerm',
          name: 'False Breakout',
          description:
            'A situation where price crosses a level but quickly returns without continuing the movement',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Support Level',
          description:
            'A price zone where buyers actively enter the market, stopping price decline',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Resistance Level',
          description:
            'A price zone where sellers begin to dominate, stopping price increase',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Momentum',
          description:
            'Sharp acceleration of price movement after a breakout caused by order activation',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Trading Volume',
          description:
            'Number of transactions over a certain period confirming the strength or weakness of price movement',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Risk-to-Reward Ratio',
          description:
            'The relationship between potential loss and potential profit in a trade',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Trailing Stop',
          description:
            'A dynamic stop-loss that moves following price to lock in profits',
        },
      ],
    };

    this.addJsonLdSchema(data);
  }
}
