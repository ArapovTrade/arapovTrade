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
  selector: 'app-home-eu-blog-thirty-nine',
  templateUrl: './home-eu-blog-thirty-nine.component.html',
  styleUrl: './home-eu-blog-thirty-nine.component.scss',
})
export class HomeEuBlogThirtyNineComponent implements OnInit {
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
      'Where to Safely Store Cryptocurrency | Complete Security Guide'
    );
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.updateTag({
      name: 'description',
      content:
        'Complete guide to secure cryptocurrency storage. Hot vs cold wallets comparison, private key protection, multi-signature solutions, and combined strategies for safeguarding digital assets.',
    });
    this.meta.updateTag({ name: 'author', content: 'Igor Arapov' });
    this.meta.updateTag({ name: 'datePublished', content: '2025-01-23' });
    this.meta.updateTag({
      property: 'og:image',
      content: '/assets/img/content/safetostorecrypto.webp',
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
            '@id': 'https://arapov.trade/en/freestudying/safetostorecrypto',
          },
          headline:
            'Where to Safely Store Cryptocurrency: Complete Guide to Digital Asset Security',
          description:
            'Complete guide to secure cryptocurrency storage. Hot vs cold wallets comparison, private key protection, multi-signature solutions, and combined strategies for safeguarding digital assets.',
          image:
            'https://arapov.trade/assets/img/content/safetostorecrypto.webp',
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
          datePublished: '2025-06-15T00:00:00Z',
          dateModified: '2025-12-04T00:00:00Z',
          articleBody:
            'Protecting cryptocurrency holdings demands thorough understanding of storage methods and security threats facing digital asset owners. Unlike traditional banking where lost cards can be replaced and fraudulent transactions reversed, the blockchain ecosystem operates on principles of absolute personal responsibility.',
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
          name: 'What type of wallet should I choose for cryptocurrency storage?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Your choice depends on usage patterns: hot wallets suit active trading and daily transactions due to instant access, while cold wallets (hardware devices like Ledger, Trezor) are recommended for long-term storage of significant amounts because they isolate private keys from internet connectivity.',
          },
        },
        {
          '@type': 'Question',
          name: 'What is a seed phrase and why is protecting it critical?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'A seed phrase is a sequence of 12 or 24 words that enables wallet recovery. It represents the only method to restore access if your device is lost, so it must be stored securely offline, never photographed, and never shared with anyone under any circumstances.',
          },
        },
        {
          '@type': 'Question',
          name: 'Is keeping cryptocurrency on exchanges safe?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Exchange storage offers convenience for active trading but carries elevated risks: exchanges can be hacked, freeze assets, or go bankrupt. Keep only funds needed for immediate trading on exchange wallets and transfer the majority of holdings to personal wallets under your direct control.',
          },
        },
        {
          '@type': 'Question',
          name: 'What is multisignature and when should I use it?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Multisignature (multisig) technology requires multiple independent signatures to authorize transactions. It proves valuable for corporate crypto asset management, family investments, and situations requiring distributed control among participants to enhance security.',
          },
        },
        {
          '@type': 'Question',
          name: 'How can I protect against phishing attacks in cryptocurrency?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Always verify URLs before entering credentials, download applications exclusively from official sources, use bookmarks to access exchanges and wallets, never click links in emails or messages, and enable two-factor authentication through apps (Google Authenticator, Authy) rather than SMS.',
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
      name: 'How to Set Up Secure Cryptocurrency Storage',
      description:
        'Step-by-step guide to establishing a robust cryptocurrency storage system using combined security strategies.',
      step: [
        {
          '@type': 'HowToStep',
          position: 1,
          name: 'Assess Portfolio and Plan Distribution',
          text: 'Evaluate your crypto holdings and categorize them by purpose: active trading funds (5-10%), operational reserve (10-20%), and long-term investments (70-85%). This distribution will determine your wallet type selection.',
        },
        {
          '@type': 'HowToStep',
          position: 2,
          name: 'Purchase and Configure Hardware Wallet',
          text: 'Acquire a hardware wallet (Ledger, Trezor, SafePal) exclusively from the official manufacturer. Verify package integrity and security seals before use. Complete initial setup following device instructions.',
        },
        {
          '@type': 'HowToStep',
          position: 3,
          name: 'Create and Secure Backup Copies',
          text: 'Record your seed phrase on physical media (paper, metal plate). Create multiple copies and store them in different secure locations (safe, bank deposit box). Never store digital copies anywhere.',
        },
        {
          '@type': 'HowToStep',
          position: 4,
          name: 'Implement Multi-Layer Security',
          text: 'Enable two-factor authentication on all platforms using authenticator apps (Google Authenticator). Set unique complex passwords for each service. Configure multisignature for substantial holdings if needed.',
        },
        {
          '@type': 'HowToStep',
          position: 5,
          name: 'Conduct Regular Security Audits',
          text: 'Periodically verify wallet firmware is current, analyze transaction history for suspicious activity, update passwords, check backup accessibility, and monitor emerging threats in the cryptocurrency space.',
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
      description: 'Essential terms related to secure cryptocurrency storage',
      hasDefinedTerm: [
        {
          '@type': 'DefinedTerm',
          name: 'Private Key',
          description:
            'A cryptographic code providing complete control over cryptocurrency funds at an associated blockchain address.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Seed Phrase',
          description:
            'A mnemonic sequence of 12-24 words enabling recovery of a cryptocurrency wallet.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Hot Wallet',
          description:
            'A cryptocurrency wallet with constant internet connectivity providing quick access to assets.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Cold Wallet',
          description:
            'A cryptocurrency storage method without network connection providing maximum protection against remote attacks.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Hardware Wallet',
          description:
            'A physical device storing private keys in an isolated environment protected from malware.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Multisignature',
          description:
            'Technology requiring multiple independent signatures to authorize a cryptocurrency transaction.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Two-Factor Authentication',
          description:
            'Account protection method requiring identity verification through two independent channels.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Phishing Attack',
          description:
            'Fraudulent scheme to obtain confidential data through fake websites or messages.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Custodial Storage',
          description:
            'Storage model where private keys are controlled by a third party (exchange, service provider).',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Non-Custodial Storage',
          description:
            'Storage approach where the owner maintains complete control over private keys and bears full security responsibility.',
        },
      ],
    };

    this.addJsonLdSchema(data);
  }
}
