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
  selector: 'app-home-en-blog-twenty-eight',
  templateUrl: './home-en-blog-twenty-eight.component.html',
  styleUrl: './home-en-blog-twenty-eight.component.scss',
})
export class HomeEnBlogTwentyEightComponent implements OnInit {
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
      'Alternative Blockchains: Overview and Differences | Arapov.trade'
    );
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.updateTag({
      name: 'description',
      content:
        'Alternative blockchains: complete overview of Solana, Polkadot, Avalanche, Cardano. Consensus mechanisms, advantages, disadvantages and place in Web3 ecosystem.',
    });
    this.meta.updateTag({ name: 'author', content: 'Ihor Arapov' });
    this.meta.updateTag({ name: 'datePublished', content: '2025-01-22' });
    this.meta.updateTag({
      property: 'og:image',
      content: '/assets/img/content/altblockchains.webp',
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
          headline: 'Alternative Blockchains: Overview and Differences',
          description:
            'Complete overview of alternative blockchains: Solana, Polkadot, Avalanche, Cardano and their place in Web3',
          author: {
            '@type': 'Person',
            name: 'Igor Arapov',
            url: 'https://arapov.trade/en',
            sameAs: ['https://www.youtube.com/@ArapovTrade'],
            jobTitle: 'Professional Trader',
            worksFor: { '@type': 'Organization', name: 'Arapov.trade' },
          },
          publisher: {
            '@type': 'Organization',
            name: 'Arapov.trade',
            logo: {
              '@type': 'ImageObject',
              url: 'https://arapov.trade/assets/img/favicon.ico',
            },
          },
          datePublished: '2025-01-10',
          dateModified: '2025-01-10',
          mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': 'https://arapov.trade/en/freestudying/altblockchains',
          },
          image: 'https://arapov.trade/assets/img/content/altblockchains1.webp',
          articleSection: 'Trading Education',
          keywords:
            'alternative blockchains, Solana, Polkadot, Avalanche, Cardano, Polygon, Web3, DeFi, Layer 1',
          inLanguage: 'ru',
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
      '@id': 'https://arapov.trade/#person',
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
          name: 'What are alternative blockchains?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Alternative blockchains are networks developed as improved versions of Bitcoin and Ethereum. They solve problems of scalability, high fees and low transaction speeds using innovative consensus mechanisms.',
          },
        },
        {
          '@type': 'Question',
          name: 'How does Solana differ from Ethereum?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Solana uses Proof-of-History mechanism providing up to 65,000 transactions per second with minimal fees. Ethereum runs on PoS and processes about 15-30 TPS on the base layer.',
          },
        },
        {
          '@type': 'Question',
          name: 'Which blockchain is best for DeFi?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Popular DeFi blockchains include Ethereum (ecosystem and liquidity), Solana (speed and low fees), Avalanche and Polygon. Choice depends on project priorities.',
          },
        },
        {
          '@type': 'Question',
          name: 'What are parachains in Polkadot?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: "Parachains are independent blockchains running parallel to Polkadot's main network. They provide high scalability and allow creating specialized networks.",
          },
        },
        {
          '@type': 'Question',
          name: 'Are alternative blockchains secure?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Security depends on project maturity, number of validators and completed audits. Younger projects may have vulnerabilities. Use proven networks with developed ecosystems.',
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
      name: 'How to Choose an Alternative Blockchain for Your Project',
      description: 'Criteria for selecting the right blockchain platform',
      step: [
        {
          '@type': 'HowToStep',
          position: 1,
          name: 'Evaluate scalability',
          text: 'Determine required network throughput. Solana or Avalanche suit high-load applications.',
        },
        {
          '@type': 'HowToStep',
          position: 2,
          name: 'Analyze fees',
          text: 'Compare transaction costs across platforms. Low fees matter for microtransactions.',
        },
        {
          '@type': 'HowToStep',
          position: 3,
          name: 'Study the ecosystem',
          text: 'Assess available tools, dApps and integrations. Developed ecosystem accelerates development.',
        },
        {
          '@type': 'HowToStep',
          position: 4,
          name: 'Check compatibility',
          text: 'Choose platforms with bridge support if cross-chain interaction is needed.',
        },
        {
          '@type': 'HowToStep',
          position: 5,
          name: 'Assess security',
          text: 'Review audit history, validator count and network reputation in the community.',
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
      name: 'Alternative Blockchains Glossary',
      hasDefinedTerm: [
        {
          '@type': 'DefinedTerm',
          name: 'Layer 1',
          description:
            'Base blockchain layer with its own consensus mechanism and security',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Layer 2',
          description:
            'Scaling solutions built on top of base blockchain to increase throughput',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Proof-of-Stake',
          description:
            'Consensus mechanism where validators confirm transactions based on staked tokens',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Proof-of-History',
          description:
            "Solana's timestamping mechanism for accelerating transaction processing",
        },
        {
          '@type': 'DefinedTerm',
          name: 'Sharding',
          description:
            'Technology dividing network into segments for parallel transaction processing',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Parachains',
          description:
            'Independent blockchains in Polkadot ecosystem running in parallel',
        },
        {
          '@type': 'DefinedTerm',
          name: 'TPS',
          description: 'Transactions Per Second — network throughput metric',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Bridge',
          description:
            'Protocol for transferring assets between different blockchains',
        },
        {
          '@type': 'DefinedTerm',
          name: 'dApp',
          description: 'Decentralized application running on blockchain',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Validator',
          description:
            'Network participant confirming transactions and receiving rewards',
        },
      ],
    };

    this.addJsonLdSchema(data);
  }
}
