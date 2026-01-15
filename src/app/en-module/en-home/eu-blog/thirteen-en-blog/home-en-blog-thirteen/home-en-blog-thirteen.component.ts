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
  selector: 'app-home-en-blog-thirteen',
  templateUrl: './home-en-blog-thirteen.component.html',
  styleUrl: './home-en-blog-thirteen.component.scss',
})
export class HomeEnBlogThirteenComponent implements OnInit {
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
      'Elliott Waves: Complete Guide to Wave Analysis | Arapov.trade'
    );
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.updateTag({
      name: 'description',
      content:
        'Elliott Waves — complete guide to wave analysis for traders. Impulse and corrective waves, counting rules, practical application with Fibonacci levels.',
    });
    this.meta.updateTag({ name: 'datePublished', content: '2025-04-15' });
    this.meta.updateTag({
      property: 'og:image',
      content: '/assets/img/content/wavesofelliott.webp',
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
          '@id': 'https://arapov.trade/en/freestudying/wavesofelliott#article',
          headline: 'Elliott Waves: Complete Guide to Wave Analysis',
          description:
            'Elliott Waves — complete guide to wave analysis for traders. Impulse and corrective waves, counting rules, practical application with Fibonacci levels.',
          image: {
            '@type': 'ImageObject',
            url: 'https://arapov.trade/assets/img/content/wavesofelliott.webp',
            width: 1200,
            height: 630,
          },
          author: {
            '@id': 'https://arapov.trade/en#person',
          },
          publisher: {
            '@type': 'Organization',
            '@id': 'https://arapov.trade#organization',
            name: 'Arapov.trade',
            url: 'https://arapov.trade',
            logo: {
              '@type': 'ImageObject',
              url: 'https://arapov.trade/assets/img/content/favicon.ico',
              width: 300,
              height: 60,
            },
          },
          datePublished: '2025-04-15T00:00:00Z',
          dateModified: '2025-12-12T00:00:00Z',
          mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': 'https://arapov.trade/en/freestudying/wavesofelliott',
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
      '@id': 'https://arapov.trade/en/freestudying/wavesofelliott#faq',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'What are Elliott Waves?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Elliott Waves represent a technical analysis method describing market movement as repeating wave cycles. A complete cycle consists of eight waves: five impulse waves in the trend direction and three corrective waves against it. The theory bases itself on mass psychology of market participants.',
          },
        },
        {
          '@type': 'Question',
          name: 'What are the main Elliott Wave rules?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Three fundamental rules govern Elliott Waves: wave 2 never retraces beyond the start of wave 1; wave 3 is never the shortest among impulse waves; wave 4 never enters the price territory of wave 1. Violation of these rules indicates an error in the wave count.',
          },
        },
        {
          '@type': 'Question',
          name: 'How to apply Fibonacci levels with Elliott Waves?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Levels of 38.2%, 50%, 61.8% determine corrective wave depth. Extensions of 161.8% and 261.8% indicate impulse wave targets. Wave three often reaches 161.8% of wave one length. Confluence of wave targets with Fibonacci levels strengthens the trading signal.',
          },
        },
        {
          '@type': 'Question',
          name: 'Which wave is most profitable for trading?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'The third wave proves most powerful and profitable for trading. It is never the shortest and often reaches 161.8-261.8% of wave one. Entry occurs after the second corrective wave completion when the trend has market confirmation.',
          },
        },
        {
          '@type': 'Question',
          name: 'What corrective patterns exist in wave analysis?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Main corrective patterns include: zigzag — sharp ABC correction; flat — horizontal movement with equal waves; triangle — five waves (A-E) narrowing the range. Each pattern indicates different correction strength and helps identify completion timing.',
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
      '@id': 'https://arapov.trade/en/freestudying/wavesofelliott#howto',
      name: 'How to Apply Elliott Waves in Trading',
      description:
        'Step-by-step guide to applying Elliott Wave analysis for finding trading opportunities in financial markets.',
      step: [
        {
          '@type': 'HowToStep',
          position: 1,
          name: 'Identify the global trend',
          text: 'Begin analysis on daily or weekly charts. Find the impulse wave sequence (1-2-3-4-5) indicating the main trend direction. Determine whether the market is in an impulse or corrective phase.',
        },
        {
          '@type': 'HowToStep',
          position: 2,
          name: 'Label the wave structure',
          text: 'Mark waves on the chart following three main rules: wave 2 not below wave 1 start, wave 3 not the shortest, wave 4 not entering wave 1 territory. Use Fibonacci levels to verify proportions.',
        },
        {
          '@type': 'HowToStep',
          position: 3,
          name: 'Find entry points',
          text: 'Seek entries after corrective wave completions. Optimal points include: wave 2 end for third wave participation, wave 4 end for fifth wave, ABC correction completion for new impulse cycle.',
        },
        {
          '@type': 'HowToStep',
          position: 4,
          name: 'Set protective orders',
          text: 'Place stop-loss beyond the current wave start or key Fibonacci level. Calculate position size to limit risk to 1-2% of capital. Ensure minimum 1:2 risk-to-reward ratio.',
        },
        {
          '@type': 'HowToStep',
          position: 5,
          name: 'Determine targets and manage the position',
          text: 'Calculate targets using Fibonacci extensions: 161.8% for wave three, wave 1 length for wave five. Take partial profits at intermediate levels. Move stop-loss to breakeven after favorable movement.',
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
      '@id': 'https://arapov.trade/en/freestudying/wavesofelliott#glossary',
      name: 'Wave Analysis Terminology Glossary',
      description: 'Key terms and definitions of Elliott Wave Theory',
      hasDefinedTerm: [
        {
          '@type': 'DefinedTerm',
          name: 'Impulse Wave',
          description:
            'A wave moving in the direction of the main trend. Impulse waves carry labels 1, 3, 5 and form the primary trending movement of the market.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Corrective Wave',
          description:
            'A wave moving against the main trend. Corrective waves carry labels 2, 4 and letters A, B, C, representing retracements within the trending movement.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Wave Cycle',
          description:
            'A complete structure of eight waves: five impulse and three corrective. Each cycle represents a completed phase of market movement.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Zigzag',
          description:
            'A corrective pattern with sharp ABC structure where wave C typically equals or exceeds wave A. Commonly appears in waves 2 and 4.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Flat',
          description:
            'A horizontal corrective pattern where waves A, B, C have approximately equal length. Indicates balance between buyers and sellers.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Triangle',
          description:
            'A corrective pattern of five waves (A, B, C, D, E) progressively narrowing the price range. Precedes strong movement in trend direction.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Fractality',
          description:
            'A property of Elliott Waves where each higher-degree wave contains a complete smaller-scale wave cycle within its structure.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Fibonacci Extension',
          description:
            'A tool for projecting impulse wave targets. Levels of 161.8% and 261.8% determine potential completion points for waves three and five.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Wave Three',
          description:
            'The most powerful and longest wave in the impulse cycle. Never the shortest among waves 1, 3, 5. Characterized by maximum trading volume.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Wave Count',
          description:
            'The process of identifying and labeling waves on price charts according to Elliott Theory rules. Requires adherence to three fundamental rules.',
        },
      ],
    };

    this.addJsonLdSchema(data);
  }
}
