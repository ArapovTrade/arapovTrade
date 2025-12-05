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
  selector: 'app-home-ru-blog-twenty-eight',
  templateUrl: './home-ru-blog-twenty-eight.component.html',
  styleUrl: './home-ru-blog-twenty-eight.component.scss',
})
export class HomeRuBlogTwentyEightComponent implements OnInit {
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

    this.ukrGroups = this.artickleServ.getRussianGroups();
    this.grr = this.artickleServ.selectedGroups;
    this.updateArticleCounts();
    this.checkedGroup = this.artickleServ.selectedGroups;
    this.titleService.setTitle(
      'Альтернативные блокчейны: обзор и отличия | Arapov.trade'
    );
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.updateTag({
      name: 'description',
      content:
        'Альтернативные блокчейны: полный обзор Solana, Polkadot, Avalanche, Cardano. Механизмы консенсуса, преимущества, недостатки и место в экосистеме Web3.',
    });

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
    { title: 'Быстрый старт', link: 'https://arapov.education/course/' },
    {
      title: 'Введение в трейдинг',
      link: 'https://arapov.education/reg-workshop/',
    },
    {
      title: 'Профессиональные курсы',
      link: 'https://arapov.trade/ru/studying',
    },
    {
      title: 'Базовый курс',
      link: 'https://arapov.trade/ru/freestudying/freeeducation',
    },
    { title: 'Копитрейдинг', link: 'https://arapovcopytrade.com' },
  ];

  onGroupChange(event: Event) {
    const checkbox = event.target as HTMLInputElement;
    const value = checkbox.value;

    this.router.navigate(['/ru/freestudying'], {
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
      article.groupsRus.forEach((group) => {
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

    this.router.navigate(['/ru/freestudying', nextpage]);
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

    this.router.navigate(['/ru/freestudying', nextpage]);
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
          headline: 'Альтернативные блокчейны: обзор и отличия',
          description:
            'Полный обзор альтернативных блокчейнов: Solana, Polkadot, Avalanche, Cardano и их место в Web3',
          author: {
            '@type': 'Person',
            name: 'Игорь Арапов',
            url: 'https://arapov.trade/ru',
            sameAs: ['https://www.youtube.com/@ArapovTrade'],
            jobTitle: 'Профессиональный трейдер',
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
          datePublished: '2025-01-10T12:00:00+02:00',
dateModified: '2025-01-10T12:00:00+02:00',
          mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': 'https://arapov.trade/ru/freestudying/altblockchains',
          },
          image: 'https://arapov.trade/assets/img/content/altblockchains1.webp',
          articleSection: 'Обучение трейдингу',
          keywords:
            'альтернативные блокчейны, Solana, Polkadot, Avalanche, Cardano, Polygon, Web3, DeFi, Layer 1',
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
      name: 'Игорь Арапов',
      url: 'https://arapov.trade/ru',
      image:
        'https://arapov.trade/assets/redesignArapovTrade/img/imageAuthor-light.png',
      sameAs: [
        'https://www.youtube.com/@ArapovTrade',
        'https://t.me/ArapovTrade',
      ],
      jobTitle: 'Профессиональный трейдер',
      description:
        'Активно торгую на финансовых рынках с 2013 года. Автор бесплатного курса по трейдингу.',
    };

    this.addJsonLdSchema(data);
  }

  // ============================================================
  //  FAQ
  // ============================================================
  private setFaqSchema(): void {
    const data = {
       "@context": "https://schema.org",
          "@type": "FAQPage",
          "mainEntity": [
            {"@type": "Question", "name": "Что такое альтернативные блокчейны?", "acceptedAnswer": {"@type": "Answer", "text": "Альтернативные блокчейны — это сети, разработанные как улучшенные версии Bitcoin и Ethereum. Они решают проблемы масштабируемости, высоких комиссий и низкой скорости транзакций, используя инновационные механизмы консенсуса."}},
            {"@type": "Question", "name": "Чем Solana отличается от Ethereum?", "acceptedAnswer": {"@type": "Answer", "text": "Solana использует механизм Proof-of-History (PoH), обеспечивающий до 65,000 транзакций в секунду с минимальными комиссиями. Ethereum работает на Proof-of-Stake и обрабатывает около 15-30 TPS на основном уровне."}},
            {"@type": "Question", "name": "Какой блокчейн лучше для DeFi?", "acceptedAnswer": {"@type": "Answer", "text": "Для DeFi популярны Ethereum (экосистема и ликвидность), Solana (скорость и низкие комиссии), Avalanche (производительность) и Polygon (масштабирование Ethereum). Выбор зависит от приоритетов проекта."}},
            {"@type": "Question", "name": "Что такое парачейны в Polkadot?", "acceptedAnswer": {"@type": "Answer", "text": "Парачейны — независимые блокчейны, работающие параллельно с основной сетью Polkadot. Они обеспечивают высокую масштабируемость и позволяют создавать специализированные сети для конкретных задач."}},
            {"@type": "Question", "name": "Безопасны ли альтернативные блокчейны?", "acceptedAnswer": {"@type": "Answer", "text": "Безопасность зависит от зрелости проекта, количества валидаторов и проведённых аудитов. Молодые проекты могут иметь уязвимости. Рекомендуется использовать проверенные сети с развитой экосистемой."}}
          ]
    };

    this.addJsonLdSchema(data);
  }

  // ============================================================
  //  HOWTO
  // ============================================================
  private setHowToSchema(): void {
    const data = {
      "@context": "https://schema.org",
          "@type": "HowTo",
          "name": "Как выбрать альтернативный блокчейн для проекта",
          "description": "Критерии выбора подходящей блокчейн-платформы",
          "step": [
            {"@type": "HowToStep", "position": 1, "name": "Оцените масштабируемость", "text": "Определите требуемую пропускную способность сети. Для высоконагруженных приложений подойдут Solana или Avalanche."},
            {"@type": "HowToStep", "position": 2, "name": "Проанализируйте комиссии", "text": "Сравните транзакционные издержки на разных платформах. Для микротранзакций важны низкие сборы."},
            {"@type": "HowToStep", "position": 3, "name": "Изучите экосистему", "text": "Оцените доступные инструменты, dApps и интеграции. Развитая экосистема ускоряет разработку."},
            {"@type": "HowToStep", "position": 4, "name": "Проверьте совместимость", "text": "Если планируется взаимодействие с другими сетями, выберите платформу с поддержкой мостов."},
            {"@type": "HowToStep", "position": 5, "name": "Оцените безопасность", "text": "Изучите историю аудитов, количество валидаторов и репутацию сети в сообществе."}
          ]
    };

    this.addJsonLdSchema(data);
  }

  // ============================================================
  //  GLOSSARY
  // ============================================================
  private setGlossarySchema(): void {
    const data = {
      "@context": "https://schema.org",
          "@type": "DefinedTermSet",
          name: "Глоссарий альтернативных блокчейнов",
          hasDefinedTerm: [
            {"@type": "DefinedTerm", name: "Layer 1", description: "Базовый уровень блокчейна с собственным механизмом консенсуса и безопасности"},
            {"@type": "DefinedTerm", name: "Layer 2", description: "Решения масштабирования поверх основного блокчейна для увеличения пропускной способности"},
            {"@type": "DefinedTerm", name: "Proof-of-Stake", description: "Механизм консенсуса, где валидаторы подтверждают транзакции на основе заблокированных токенов"},
            {"@type": "DefinedTerm", name: "Proof-of-History", description: "Механизм временных меток Solana для ускорения обработки транзакций"},
            {"@type": "DefinedTerm", name: "Шардинг", description: "Технология разделения сети на сегменты для параллельной обработки транзакций"},
            {"@type": "DefinedTerm", name: "Парачейны", description: "Независимые блокчейны в экосистеме Polkadot, работающие параллельно"},
            {"@type": "DefinedTerm", name: "TPS", description: "Transactions Per Second — количество транзакций в секунду"},
            {"@type": "DefinedTerm", name: "Мост", description: "Протокол для перевода активов между разными блокчейнами"},
            {"@type": "DefinedTerm", name: "dApp", description: "Децентрализованное приложение, работающее на блокчейне"},
            {"@type": "DefinedTerm", name: "Валидатор", description: "Участник сети, подтверждающий транзакции и получающий вознаграждение"}
          ]
    };

    this.addJsonLdSchema(data);
  }
}
