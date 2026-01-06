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
  selector: 'app-home-en-blog-fourty-six',
  templateUrl: './home-en-blog-fourty-six.component.html',
  styleUrl: './home-en-blog-fourty-six.component.scss',
})
export class HomeEnBlogFourtySixComponent implements OnInit {
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
      'Bitcoin Pizza Day — The First Bitcoin Purchase | History and Lessons'
    );
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.updateTag({
      name: 'description',
      content:
        'Bitcoin Pizza Day — the story of the first purchase made with Bitcoin on May 22, 2010. Learn how 10,000 BTC were exchanged for two pizzas and why this date changed financial history.',
    });
    this.meta.updateTag({ name: 'author', content: 'Igor Arapov' });
    this.meta.updateTag({ name: 'datePublished', content: '2025-01-27' });
    this.meta.updateTag({
      property: 'og:image',
      content: '/assets/img/content/pizzaday.webp',
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
          '@id': 'https://arapov.trade/en/freestudying/pizzaday#article',
          headline: 'Bitcoin Pizza Day — The Historic First Bitcoin Purchase',
          description:
            'Bitcoin Pizza Day — the story of the first purchase made with Bitcoin on May 22, 2010. Learn how 10,000 BTC were exchanged for two pizzas and why this date changed financial history.',
          datePublished: '2025-04-15T00:00:00Z',
          dateModified: '2025-12-29T00:00:00Z',
          author: {
            '@id': 'https://arapov.trade/en#person',
          },
          publisher: {
            '@type': 'Organization',
            name: 'Arapov Trade',
            logo: {
              '@type': 'ImageObject',
              url: 'https://arapov.trade/assets/img/favicon.ico',
            },
          },
          mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': 'https://arapov.trade/en/freestudying/pizzaday',
          },
          image: {
            '@type': 'ImageObject',
            url: 'https://arapov.trade/assets/img/content/pizzaday1.webp',
          },
          articleSection: 'Cryptocurrency',
          keywords: [
            'Bitcoin Pizza Day',
            'first Bitcoin purchase',
            'Laszlo Hanyecz',
            'Bitcoin history',
            'cryptocurrency',
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
      '@id': 'https://arapov.trade/en/freestudying/pizzaday#faq',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'What is Bitcoin Pizza Day?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Bitcoin Pizza Day is a commemorative date on May 22, when in 2010 programmer Laszlo Hanyecz made the first documented purchase of a real product with Bitcoin, exchanging 10,000 BTC for two pizzas.',
          },
        },
        {
          '@type': 'Question',
          name: 'How much were 10,000 bitcoins worth in 2010?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'At the time of the transaction in May 2010, 10,000 bitcoins were worth approximately $41 USD. Today, this amount is valued at hundreds of millions of dollars.',
          },
        },
        {
          '@type': 'Question',
          name: 'Who is Laszlo Hanyecz?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Laszlo Hanyecz is an American programmer of Hungarian descent who became known as the person who made the first commercial transaction using Bitcoin.',
          },
        },
        {
          '@type': 'Question',
          name: 'Why is Bitcoin Pizza Day important to the crypto community?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: "This date symbolizes Bitcoin's transition from a theoretical concept to practical application. The first purchase proved that cryptocurrency could function as a real medium of exchange.",
          },
        },
        {
          '@type': 'Question',
          name: 'How is Bitcoin Pizza Day celebrated?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'The crypto community celebrates May 22 with promotions and discounts from exchanges, themed meetups, discussions on social media, and charitable initiatives.',
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
      '@id': 'https://arapov.trade/en/freestudying/pizzaday#howto',
      name: 'How to Apply Lessons from Bitcoin Pizza Day History',
      description:
        'A step-by-step guide to applying lessons from the first cryptocurrency transaction to your investment strategy.',
      step: [
        {
          '@type': 'HowToStep',
          position: 1,
          name: 'Study Bitcoin History',
          text: "Familiarize yourself with key events in cryptocurrency development, from Bitcoin's creation by Satoshi Nakamoto in 2009 to the first transaction in 2010.",
        },
        {
          '@type': 'HowToStep',
          position: 2,
          name: 'Evaluate Long-term Potential',
          text: 'Analyze assets not just by current price but by their potential role in the future economy. The pizza story shows the importance of long-term thinking.',
        },
        {
          '@type': 'HowToStep',
          position: 3,
          name: 'Manage Risks Consciously',
          text: 'Invest only funds you are prepared to lose. Early cryptocurrency investments involve high volatility.',
        },
        {
          '@type': 'HowToStep',
          position: 4,
          name: 'Engage with the Community',
          text: 'Join crypto communities, attend events, and exchange experiences with other blockchain technology enthusiasts.',
        },
        {
          '@type': 'HowToStep',
          position: 5,
          name: 'Apply Cryptocurrencies Practically',
          text: 'Use cryptocurrencies for real purchases to better understand their function as a medium of exchange.',
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
      '@id': 'https://arapov.trade/en/freestudying/pizzaday#terms',
      name: 'Bitcoin Pizza Day Glossary',
      hasDefinedTerm: [
        {
          '@type': 'DefinedTerm',
          name: 'Bitcoin Pizza Day',
          description:
            'A commemorative date on May 22, when in 2010 the first purchase of a real product with Bitcoin was made.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Bitcoin',
          description:
            'The first decentralized cryptocurrency, created in 2009 by an anonymous developer under the pseudonym Satoshi Nakamoto.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Cryptocurrency',
          description:
            'A digital asset that uses cryptography to secure transactions and control the creation of new units.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Blockchain',
          description:
            'A distributed database where transactions are recorded as a chain of blocks, ensuring transparency and immutability of data.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Mining',
          description:
            'The process of creating new blocks in the blockchain and confirming transactions using computational power.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Volatility',
          description:
            'The degree of price variation of an asset over a certain period, characterizing the level of market risk.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Decentralization',
          description:
            'The principle of distributing management and control among multiple network participants without a single center of authority.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Crypto Exchange',
          description:
            'A platform for buying, selling, and exchanging cryptocurrencies for fiat money or other digital assets.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Bitcointalk',
          description:
            'The first major internet forum dedicated to Bitcoin and cryptocurrency discussion, founded by Satoshi Nakamoto.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'HODL',
          description:
            'Cryptocurrency slang meaning long-term holding of assets regardless of market fluctuations.',
        },
      ],
    };

    this.addJsonLdSchema(data);
  }
}
