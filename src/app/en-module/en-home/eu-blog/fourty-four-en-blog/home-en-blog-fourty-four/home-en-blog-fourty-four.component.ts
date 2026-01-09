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
  selector: 'app-home-en-blog-fourty-four',
  templateUrl: './home-en-blog-fourty-four.component.html',
  styleUrl: './home-en-blog-fourty-four.component.scss',
})
export class HomeEnBlogFourtyFourComponent implements OnInit {
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
      'What is Cryptocurrency Staking? | Passive Income in Crypto'
    );
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.updateTag({
      name: 'description',
      content:
        'Cryptocurrency staking: how to earn passive income by locking tokens. Complete guide to staking types, platform selection, and risk mitigation strategies.',
    });
    this.meta.updateTag({ name: 'author', content: 'Igor Arapov' });
    this.meta.updateTag({ name: 'datePublished', content: '2025-01-27' });
    this.meta.updateTag({
      property: 'og:image',
      content: '/assets/img/content/cryptostaking.webp',
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
            '@id': 'https://arapov.trade/en/freestudying/cryptostaking',
          },
          headline:
            'What is Cryptocurrency Staking? Complete Guide to Passive Income',
          description:
            'Cryptocurrency staking: how to earn passive income by locking tokens. Complete guide to staking types, platform selection, and risk mitigation strategies.',
          image: 'https://arapov.trade/assets/img/content/cryptostaking1.webp',
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
          datePublished: '2025-04-15T00:00:00Z',
          dateModified: '2025-12-29T00:00:00Z',
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
          name: 'What is cryptocurrency staking and how does it work?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Cryptocurrency staking is the process of locking tokens in a specialized wallet or platform to support blockchain network operations. In return, participants receive rewards in the form of new tokens. The mechanism is based on Proof-of-Stake consensus, where validators confirm transactions proportionally to their locked assets.',
          },
        },
        {
          '@type': 'Question',
          name: 'What returns can you expect from staking?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Staking yields typically range from 5% to 20% annually depending on the chosen cryptocurrency and platform. For example, Ethereum staking generates approximately 4-5% APY, while newer projects may offer rates above 15-20% to attract validators.',
          },
        },
        {
          '@type': 'Question',
          name: 'What are the risks of cryptocurrency staking?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Primary staking risks include token price volatility (price drops can offset earnings), liquidity lockup (inability to quickly sell assets), smart contract vulnerabilities, token inflation, and risks from dishonest validators in delegated staking arrangements.',
          },
        },
        {
          '@type': 'Question',
          name: 'What is the difference between liquid staking and regular staking?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'In regular staking, tokens are locked for a specified period and unavailable for operations. Liquid staking allows you to receive derivative tokens (e.g., stETH instead of ETH) that can be used for trading or DeFi operations while maintaining staking rewards.',
          },
        },
        {
          '@type': 'Question',
          name: 'How do you choose a reliable staking platform?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'When selecting a platform, consider reputation and track record, security audit availability, transparency of reward conditions, fee structure, lockup requirements, and supported cryptocurrencies. Trusted platforms include Binance, Kraken, Lido Finance, and Coinbase.',
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
      name: 'How to Start Earning with Cryptocurrency Staking',
      description:
        'Step-by-step guide to cryptocurrency staking from token selection to receiving your first rewards',
      step: [
        {
          '@type': 'HowToStep',
          position: 1,
          name: 'Choose a cryptocurrency for staking',
          text: 'Research available PoS cryptocurrencies: Ethereum, Cardano, Polkadot, Solana. Evaluate their growth potential, project history, and staking yield rates. Prefer established blockchains with active communities.',
        },
        {
          '@type': 'HowToStep',
          position: 2,
          name: 'Select staking type and platform',
          text: 'Decide between solo, pooled, delegated, or liquid staking. For beginners, pooled or delegated staking on trusted exchanges (Binance, Kraken) or protocols (Lido, Rocket Pool) is recommended.',
        },
        {
          '@type': 'HowToStep',
          position: 3,
          name: 'Acquire the required tokens',
          text: 'Purchase cryptocurrency on a reliable exchange. Consider minimum platform requirements for staking. Ethereum 2.0 requires 32 ETH for a full validator, but pools allow participation with any amount.',
        },
        {
          '@type': 'HowToStep',
          position: 4,
          name: 'Lock your tokens in staking',
          text: 'Transfer tokens to your chosen platform and activate staking. Carefully review terms: lockup period, fee structure, payout frequency. With liquid staking, receive derivative tokens for additional operations.',
        },
        {
          '@type': 'HowToStep',
          position: 5,
          name: 'Monitor and optimize returns',
          text: 'Regularly track reward accruals and market conditions. Reinvest earned tokens for compound interest. Diversify across multiple validators or platforms as needed to reduce risks.',
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
      name: 'Cryptocurrency Staking Glossary',
      description: 'Key terms and concepts related to cryptocurrency staking',
      hasDefinedTerm: [
        {
          '@type': 'DefinedTerm',
          name: 'Staking',
          description:
            'The process of locking cryptocurrency to support blockchain operations and earn rewards',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Proof-of-Stake (PoS)',
          description:
            'A consensus mechanism where validators are selected proportionally to their staked tokens',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Validator',
          description:
            'A network node that confirms transactions and creates new blocks in a PoS blockchain',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Delegated staking',
          description:
            'Transferring tokens to a validator for staking while retaining ownership',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Liquid staking',
          description:
            'Staking with issuance of derivative tokens that maintain liquidity of locked assets',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Pool staking',
          description:
            'Combining funds from multiple participants for collective staking',
        },
        {
          '@type': 'DefinedTerm',
          name: 'APY',
          description:
            'Annual Percentage Yield — the yearly return rate including compound interest',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Slashing',
          description:
            'A penalty mechanism where validators lose a portion of staked tokens for violations',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Unbonding period',
          description:
            'The waiting time for token withdrawal after deactivating staking',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Smart contract',
          description:
            'Blockchain code that automatically executes staking conditions',
        },
      ],
    };

    this.addJsonLdSchema(data);
  }
}
