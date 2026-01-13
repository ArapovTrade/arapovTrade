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
  selector: 'app-home-eu-blog-fifty-four',
  templateUrl: './home-eu-blog-fifty-four.component.html',
  styleUrl: './home-eu-blog-fifty-four.component.scss',
})
export class HomeEuBlogFiftyFourComponent implements OnInit {
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
      'How to Secure Your Cryptocurrency | Complete Security Guide'
    );
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.updateTag({
      name: 'description',
      content:
        'Complete guide to cryptocurrency security. Protection against hackers and phishing, two-factor authentication setup, secure storage strategies for significant digital asset holdings.',
    });
    this.meta.updateTag({ name: 'author', content: 'Igor Arapov' });
    this.meta.updateTag({ name: 'datePublished', content: '2025-01-28' });
    this.meta.updateTag({
      property: 'og:image',
      content: '/assets/img/content/cryptosafe.webp',
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
            '@id': 'https://arapov.trade/en/freestudying/cryptosafe',
          },
          headline:
            'How to Secure Your Cryptocurrency: Complete Guide to Digital Asset Protection',
          description:
            'Complete guide to cryptocurrency security. Protection against hackers and phishing, two-factor authentication setup, secure storage strategies for significant digital asset holdings.',
          image: 'https://arapov.trade/assets/img/content/cryptosafe1.webp',
          author: {
            '@id': 'https://arapov.trade/en#person',
          },
          publisher: {
            '@type': 'Organization',
            name: 'Arapov.trade',
            logo: {
              '@type': 'ImageObject',
              url: 'https://arapov.trade/assets/img/content/favicon.ico',
            },
          },
          datePublished: '2025-04-15T00:00:00Z',
          dateModified: '2025-12-12T00:00:00Z',
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
          name: 'What are the main threats to cryptocurrency assets?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Key threats include: hacker attacks on exchanges and wallets, phishing schemes using fake websites, loss of private keys or seed phrases, physical theft of storage devices, user errors during transfers, and fraudulent projects promising guaranteed high returns.',
          },
        },
        {
          '@type': 'Question',
          name: 'Why is two-factor authentication important for cryptocurrency protection?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Two-factor authentication creates an additional security barrier: even if attackers obtain your password, account access remains blocked without the second factor (code from an authenticator app). Using Google Authenticator or Authy is recommended over SMS codes, which can be intercepted.',
          },
        },
        {
          '@type': 'Question',
          name: 'How can I recognize a phishing attack in cryptocurrency?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Phishing indicators include: minor changes in website URLs, urgent demands to enter credentials, emails threatening account suspension, requests for private keys or seed phrases. Legitimate services never request private keys under any circumstances whatsoever.',
          },
        },
        {
          '@type': 'Question',
          name: 'What security measures are needed for storing large cryptocurrency amounts?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Use hardware wallets for cold storage, distribute assets across multiple wallets, configure multisignature for transactions, conduct regular security audits, and store key backups in physically protected locations (safe, bank deposit box).',
          },
        },
        {
          '@type': 'Question',
          name: 'Is it safe to use public Wi-Fi networks for cryptocurrency operations?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Using public Wi-Fi for cryptocurrency account access is strongly discouraged — such networks are easily intercepted by attackers. When working away from home, use mobile data or a VPN with reliable encryption instead.',
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
      name: 'How to Set Up Comprehensive Cryptocurrency Security',
      description:
        'Step-by-step guide to creating a multi-layered security system for cryptocurrency assets.',
      step: [
        {
          '@type': 'HowToStep',
          position: 1,
          name: 'Audit Current Security Status',
          text: 'Inventory all crypto assets and storage locations. Assess the protection level of each wallet and platform, identify vulnerabilities, and create a remediation plan.',
        },
        {
          '@type': 'HowToStep',
          position: 2,
          name: 'Configure Two-Factor Authentication',
          text: 'Install an authenticator app (Google Authenticator, Authy) and enable 2FA on all cryptocurrency platforms, exchanges, and email accounts. Store recovery backup codes in a secure location.',
        },
        {
          '@type': 'HowToStep',
          position: 3,
          name: 'Organize Secure Key Storage',
          text: 'Transfer the majority of assets to a hardware wallet. Record the seed phrase on physical media (paper, metal plate) and place copies in multiple protected locations.',
        },
        {
          '@type': 'HowToStep',
          position: 4,
          name: 'Create a Password Management System',
          text: 'Install a password manager and generate unique complex passwords for each crypto platform. Avoid password reuse and update credentials regularly.',
        },
        {
          '@type': 'HowToStep',
          position: 5,
          name: 'Implement Regular Monitoring',
          text: 'Set up notifications for account logins and transactions. Periodically check activity history, update wallet firmware, and monitor security news for platforms you use.',
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
      name: 'Cryptocurrency Security Glossary',
      description: 'Essential terms related to cryptocurrency asset protection',
      hasDefinedTerm: [
        {
          '@type': 'DefinedTerm',
          name: 'Two-Factor Authentication',
          description:
            'Account protection method requiring identity verification through two independent channels — password and temporary code.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Phishing',
          description:
            'Fraudulent scheme to obtain confidential data through fake websites, emails, or messages.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Cold Storage',
          description:
            'Method of storing cryptocurrency on devices without internet connection for maximum protection against remote attacks.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Hot Wallet',
          description:
            'Cryptocurrency wallet with constant internet connectivity, convenient for quick transactions.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Multisignature',
          description:
            'Technology requiring multiple independent signatures to authorize a transaction.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Seed Phrase',
          description:
            'Mnemonic word sequence for recovering access to a cryptocurrency wallet.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Private Key',
          description:
            'Cryptographic code providing complete control over cryptocurrency funds.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Social Engineering',
          description:
            'Psychological manipulation techniques used to obtain confidential information from individuals.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'VPN',
          description:
            "Virtual Private Network that encrypts internet traffic and conceals the user's real IP address.",
        },
        {
          '@type': 'DefinedTerm',
          name: 'Hardware Wallet',
          description:
            'Physical device for storing private keys in an isolated, protected environment.',
        },
      ],
    };

    this.addJsonLdSchema(data);
  }
}
