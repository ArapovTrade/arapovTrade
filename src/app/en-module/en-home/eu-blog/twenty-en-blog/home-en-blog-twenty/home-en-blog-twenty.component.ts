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
  selector: 'app-home-en-blog-twenty',
  templateUrl: './home-en-blog-twenty.component.html',
  styleUrl: './home-en-blog-twenty.component.scss',
})
export class HomeEnBlogTwentyComponent implements OnInit {
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
    this.titleService.setTitle('What is a Crypto Scam | Arapov.trade');
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.updateTag({
      name: 'description',
      content:
        'What is a crypto scam: types of fraud, signs of fake projects, phishing, pyramid schemes, and ways to protect your crypto assets from scammers.',
    });

    this.meta.updateTag({ name: 'author', content: 'Ihor Arapov' });
    this.meta.updateTag({ name: 'datePublished', content: '2025-01-21' });
    this.meta.updateTag({
      property: 'og:image',
      content: '/assets/img/content/cryptoscam.webp',
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
          '@context': 'https://schema.org',
          '@type': 'Article',
          headline: 'What is a Crypto Scam: Types of Fraud and Protection',
          description:
            'What is a crypto scam: types of fraud, signs of fake projects, phishing, pyramid schemes, and ways to protect your crypto assets from scammers.',
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
          datePublished: '2025-04-15T00:00:00Z',
          dateModified: '2025-12-29T00:00:00Z',
          mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': 'https://arapov.trade/en/freestudying/cryptoscam',
          },
          image: 'https://arapov.trade/assets/img/content/cryptoscam1.webp',
          articleSection: 'Trading Education',
          keywords: [
            'crypto scam',
            'fraud',
            'phishing',
            'pyramid schemes',
            'security',
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
          name: 'What is a crypto scam?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'A crypto scam is fraud aimed at stealing funds or personal data from cryptocurrency users. It includes fake ICOs, phishing attacks, pyramid schemes, and fake exchanges. Scammers exploit trust and lack of knowledge to deceive both beginners and experienced investors.',
          },
        },
        {
          '@type': 'Question',
          name: 'How to recognize a cryptocurrency scam?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Signs of scams: unrealistic promises of guaranteed profits, anonymous teams without public profiles, absence of White Paper or roadmap, pressure for urgent decisions, evasion of questions about project structure.',
          },
        },
        {
          '@type': 'Question',
          name: 'What are the most common types of crypto scams?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Main types: fake ICOs with professional websites but no real product, phishing sites copying exchanges, Ponzi schemes paying from new investor funds, fake exchanges preventing withdrawals, rug pulls in DeFi projects.',
          },
        },
        {
          '@type': 'Question',
          name: 'How to protect crypto assets from scammers?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Use hardware wallets for storage, enable two-factor authentication, verify website URLs before entering data, research projects through independent sources, never share private keys or seed phrases.',
          },
        },
        {
          '@type': 'Question',
          name: 'What to do if you become a crypto scam victim?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Immediately change passwords on all related accounts, report the fraud to law enforcement and the platform where it occurred, warn the community on social media, preserve all evidence for possible investigation.',
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
      name: 'How to Protect Yourself from Cryptocurrency Scams',
      description:
        'Step-by-step guide to protecting your crypto assets from fraudsters',
      step: [
        {
          '@type': 'HowToStep',
          position: 1,
          name: 'Research the project before investing',
          text: 'Study the White Paper, development team, and their public profiles on LinkedIn. Check the project history and reviews on independent platforms like Reddit and BitcoinTalk.',
        },
        {
          '@type': 'HowToStep',
          position: 2,
          name: 'Use reliable wallets and exchanges',
          text: 'Store cryptocurrency on hardware wallets like Ledger or Trezor. Use only verified exchanges with licenses and good reputation.',
        },
        {
          '@type': 'HowToStep',
          position: 3,
          name: 'Enable two-factor authentication',
          text: 'Activate 2FA on all cryptocurrency platforms. Use authenticator apps instead of SMS for greater security.',
        },
        {
          '@type': 'HowToStep',
          position: 4,
          name: 'Verify website URLs',
          text: 'Always check the site address before entering data. Bookmark official sites. Beware of links from unverified sources.',
        },
        {
          '@type': 'HowToStep',
          position: 5,
          name: 'Never share private keys',
          text: 'Store seed phrases and private keys offline. Never enter them on websites or share with third parties, even if they claim to be support staff.',
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
      name: 'Cryptocurrency Fraud Terms',
      description: 'Glossary of key concepts in crypto scam prevention',
      hasDefinedTerm: [
        {
          '@type': 'DefinedTerm',
          name: 'Scam',
          description:
            'Fraud aimed at stealing funds or confidential information from cryptocurrency users',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Phishing',
          description:
            'A type of fraud where attackers create fake websites or apps to steal user credentials',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Ponzi Scheme',
          description:
            'A fraudulent scheme where early investor returns are paid from new participant investments',
        },
        {
          '@type': 'DefinedTerm',
          name: 'ICO (Initial Coin Offering)',
          description:
            'Initial token placement to attract investments in a cryptocurrency project',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Rug Pull',
          description:
            'DeFi fraud where developers drain liquidity from a pool and disappear with investor funds',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Social Engineering',
          description:
            'Psychological manipulation methods to obtain confidential information from victims',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Seed Phrase',
          description:
            'A set of words for recovering access to a crypto wallet that should never be disclosed to third parties',
        },
        {
          '@type': 'DefinedTerm',
          name: '2FA (Two-Factor Authentication)',
          description:
            'An account protection method requiring login confirmation through a second channel besides password',
        },
        {
          '@type': 'DefinedTerm',
          name: 'White Paper',
          description:
            "A project's technical document describing its concept, technology, and development plan",
        },
        {
          '@type': 'DefinedTerm',
          name: 'Hardware Wallet',
          description:
            'A physical device for securely storing cryptocurrency private keys offline',
        },
      ],
    };

    this.addJsonLdSchema(data);
  }
}
