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
  selector: 'app-home-eu-blog-thirty-eight',
  templateUrl: './home-eu-blog-thirty-eight.component.html',
  styleUrl: './home-eu-blog-thirty-eight.component.scss',
})
export class HomeEuBlogThirtyEightComponent implements OnInit {
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
      'Secure Cryptocurrency Storage: Complete Guide | ArapovTrade'
    );
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.updateTag({
      name: 'description',
      content:
        'Learn how to safely store cryptocurrency. Cold and hot wallets, hardware devices, private key protection and best security practices.',
    });
    this.meta.updateTag({ name: 'author', content: 'Igor Arapov' });
    this.meta.updateTag({ name: 'datePublished', content: '2025-01-23' });
    this.meta.updateTag({
      property: 'og:image',
      content: '/assets/img/content/cryptostoring.webp',
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
          headline:
            'Secure Cryptocurrency Storage: Complete Guide to Protecting Digital Assets',
          description:
            'Comprehensive guide to secure cryptocurrency storage. Wallet types, private key protection, hardware devices and common mistakes.',
          author: {
            '@id': 'https://arapov.trade/en#person',
          },
          publisher: {
            '@type': 'Organization',
            name: 'ArapovTrade',
            url: 'https://arapov.trade',
            logo: {
              '@type': 'ImageObject',
              url: 'https://arapov.trade/assets/img/favicon.ico',
            },
          },
          datePublished: '2025-04-15T00:00:00Z',
          dateModified: '2025-12-11T00:00:00Z',
          mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': 'https://arapov.trade/en/freestudying/cryptostoring',
          },
          image: {
            '@type': 'ImageObject',
            url: 'https://arapov.trade/assets/img/content/cryptostoring1.webp',
          },
          articleSection: 'Cryptocurrency',
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
          name: 'What is a cold wallet?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'A cold wallet is a cryptocurrency storage method without constant internet connection. These include hardware wallets (Ledger, Trezor), paper wallets and metal plates. They provide maximum protection from hacker attacks.',
          },
        },
        {
          '@type': 'Question',
          name: "What's the difference between hot and cold wallets?",
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Hot wallets are connected to the internet and convenient for frequent transactions. Cold wallets store keys offline providing maximum security. Cold wallets are recommended for long-term storage.',
          },
        },
        {
          '@type': 'Question',
          name: 'What is a seed phrase and why is it needed?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Seed phrase is a set of 12-24 words generated when creating a wallet. It allows restoring access to funds if device is lost. Store it in a safe place and never save it digitally.',
          },
        },
        {
          '@type': 'Question',
          name: 'Is it safe to store cryptocurrency on an exchange?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Exchange storage is convenient for active trading but carries risks: exchanges can be hacked, blocked or go bankrupt. For long-term storage use personal wallets where you control private keys.',
          },
        },
        {
          '@type': 'Question',
          name: 'Which hardware wallet should I choose?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Popular hardware wallets: Ledger Nano X/S, Trezor Model T/One, SafePal. Consider supported cryptocurrencies and manufacturer reputation. Buy only from official sellers.',
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
      '@id': 'https://arapov.trade/en/freestudying/cryptostoring#howto',
      name: 'How to safely store cryptocurrency',
      description:
        'Step-by-step guide to secure storage of crypto assets and protection against hacks',
      step: [
        {
          '@type': 'HowToStep',
          position: 1,
          name: 'Determine storage amount and time horizon',
          text: 'Assess the amount of cryptocurrency you plan to store and the storage period. If this is long-term storage of a large sum, prefer cold wallets. For active trading with small amounts, hot wallets are suitable.',
        },
        {
          '@type': 'HowToStep',
          position: 2,
          name: 'Choose wallet type',
          text: 'For long-term storage use cold wallets: hardware (Ledger, Trezor), paper or metal plates. For frequent transactions - hot wallets: mobile apps or web wallets. Combine both types for maximum security.',
        },
        {
          '@type': 'HowToStep',
          position: 3,
          name: 'Purchase hardware wallet from official seller',
          text: 'Choose a trusted manufacturer (Ledger, Trezor, SafePal). Buy only from official dealers or certified stores. Avoid used devices. Check package integrity upon receipt.',
        },
        {
          '@type': 'HowToStep',
          position: 4,
          name: 'Generate seed phrase on first use',
          text: 'During wallet initialization, a 12-24 word seed phrase will be generated. Write it down on paper in the correct order. Never photograph, save to cloud or computer. Store in a secure place - safe, box, chest.',
        },
        {
          '@type': 'HowToStep',
          position: 5,
          name: 'Set strong password and PIN code',
          text: 'Set a strong password for the device (if supported). Set a 4-8 digit PIN for hardware wallet. Remember the PIN but do not share it with anyone. Do not use simple sequences (1234, 0000).',
        },
        {
          '@type': 'HowToStep',
          position: 6,
          name: 'Verify addresses and send test amount',
          text: 'Before the first large transfer, send a minimum amount of cryptocurrency. Make sure addresses match and transaction completed successfully. This will confirm the wallet is working correctly.',
        },
        {
          '@type': 'HowToStep',
          position: 7,
          name: 'Backup seed phrase in multiple locations',
          text: 'Make 2-3 copies of the written seed phrase. Store them in different secure places: at home in a safe, with a trusted person, in a bank. This protects against loss of access in case of fire, theft or other emergencies.',
        },
        {
          '@type': 'HowToStep',
          position: 8,
          name: 'Use multi-level protection',
          text: 'Split large amounts between multiple wallets. Use different passwords for each. Consider multi-sig wallets requiring multiple signatures for transactions. This prevents loss of all funds if one wallet is compromised.',
        },
        {
          '@type': 'HowToStep',
          position: 9,
          name: 'Update software and use secure network',
          text: 'Keep wallet and device software up to date. When connecting hardware wallet, use a clean virus-free computer. Avoid public Wi-Fi when conducting transactions. Check for scam sites before entering private keys.',
        },
        {
          '@type': 'HowToStep',
          position: 10,
          name: 'Verify addresses before each send',
          text: 'Always verify recipient address before confirming. Use device verification function (if available). Send a small amount first, then the remainder. Beware of phishing and substituted addresses.',
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
      name: 'Cryptocurrency Storage Glossary',
      hasDefinedTerm: [
        {
          '@type': 'DefinedTerm',
          name: 'Private Key',
          description:
            'Cryptographic sequence giving full control over cryptocurrency funds.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Public Key',
          description:
            'Wallet address that can be shared to receive cryptocurrency.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Seed Phrase',
          description: 'Mnemonic phrase of 12-24 words for wallet recovery.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Cold Wallet',
          description:
            'Cryptocurrency storage method without internet connection.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Hot Wallet',
          description:
            'Wallet with constant internet connection for quick transactions.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Hardware Wallet',
          description:
            'Physical device for secure offline private key storage.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Multisig',
          description:
            'Wallet requiring multiple signatures to execute transaction.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Custodial Wallet',
          description: 'Wallet where private keys are stored by third party.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Non-custodial Wallet',
          description: 'Wallet with full user control over private keys.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'MFA',
          description:
            'Multi-factor authentication for additional account protection.',
        },
      ],
    };

    this.addJsonLdSchema(data);
  }
}
