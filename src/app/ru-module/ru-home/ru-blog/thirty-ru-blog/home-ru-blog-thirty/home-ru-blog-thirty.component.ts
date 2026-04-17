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
  selector: 'app-home-ru-blog-thirty',
  templateUrl: './home-ru-blog-thirty.component.html',
  styleUrl: './home-ru-blog-thirty.component.scss',
})
export class HomeRuBlogThirtyComponent implements OnInit {
  constructor(
    private meta: Meta,
    private titleService: Title,
    private cdr: ChangeDetectorRef,
    private router: Router,
    private themeService: ThemeservService,
    private artickleServ: ArticlesService,
    private renderer: Renderer2,
    @Inject(DOCUMENT) private document: Document,
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
      'Трейдинг криптовалют: полное руководство для начинающих | Arapov.trade',
    );
    this.meta.updateTag({ name: 'robots', content: 'index' });
    this.meta.updateTag({
      name: 'description',
      content:
        'Полное руководство по криптовалютам для начинающих трейдеров: блокчейн, Биткойн, Эфириум, выбор биржи, управление рисками и стратегии торговли.',
    });
    this.meta.updateTag({ name: 'datePublished', content: '2025-04-02' });
    this.meta.updateTag({ name: 'dateModified', content: '2026-04-15' });
    this.meta.updateTag({
      property: 'og:image',
      content: '/assets/img/content/cryptocurrencybasics.webp',
    });
    this.gerRandom();
  }
  randomArticleRus: any = [];
  gerRandom() {
    this.randomArticleRus = this.artickleServ.getRandomUkArticles();
  }

  hoveredIndex: number | null = null;

  projects = [
    { title: 'Книги по трейдингу', link: 'https://arapov.trade/ru/books' },
    {
      title: 'Профессиональные курсы',
      link: 'https://arapov.trade/ru/studying',
    },
    {
      title: 'Базовый курс',
      link: 'https://arapov.trade/ru/freestudying/freeeducation',
    },
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
        () => Math.random() - 0.5,
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
      a.titleUkr.toLowerCase().includes(this.searchQuery.toLowerCase()),
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
      (a) => a.linkUkr == path,
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
      (a) => a.linkUkr == path,
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
      'script[type="application/ld+json"]',
    );

    scripts.forEach((script) => {
      try {
        const json = JSON.parse(script.textContent || '{}');

        // Массив, объект-граф или одиночный объект
        const candidates =
          json['@graph'] ?? (Array.isArray(json) ? json : [json]);

        const shouldRemove = candidates.some(
          (entry: any) =>
            entry['@type'] && typesToRemove.includes(entry['@type']),
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
          headline: 'Трейдинг криптовалют: полное руководство для начинающих',
          description:
            'Полное руководство по криптовалютам для начинающих трейдеров: блокчейн, Биткойн, Эфириум, выбор биржи, управление рисками и стратегии торговли.',
          author: {
            '@id': 'https://arapov.trade/ru#person',
          },
          publisher: {
            '@type': 'Organization',
            name: 'Arapov.trade',
            logo: {
              '@type': 'ImageObject',
              url: 'https://arapov.trade/assets/img/favicon.ico',
            },
          },
          datePublished: '2026-03-25T00:00:00Z',
          dateModified: '2026-04-15T00:00:00Z',
          mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': 'https://arapov.trade/ru/freestudying/cryptocurrencybasics',
          },
          image:
            'https://arapov.trade/assets/img/content/cryptocurrencybasics1.webp',
          articleSection: 'Обучение трейдингу',
          keywords: 'криптовалюты, трейдинг, блокчейн, Биткойн, Эфириум',
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
      '@id': 'https://arapov.trade/ru#person',
      name: 'Игорь Арапов',
      alternateName: [
        'Igor Arapov',
        'Арапов Игорь',
        'I. Arapov',
        'Ігор Арапов',
        'І. В. Арапов',
        'Арапов Ігор',
        'Arapov Igor',
      ],
      url: 'https://arapov.trade/ru',
      image:
        'https://arapov.trade/assets/redesignArapovTrade/img/imageAuthor-light.png',
      sameAs: [
        'https://www.wikidata.org/wiki/Q137454477',
        'https://scholar.google.com/citations?user=N440tWQAAAAJ',
        'https://orcid.org/0009-0003-0430-778X',
        'https://isni.org/isni/0000000529518564',
        'https://www.amazon.com/stores/author/B0GBRFY457',
        'https://github.com/ArapovTrade',
        'https://ua.linkedin.com/in/arapovtrade',
        'https://www.youtube.com/@ArapovTrade',
        'https://t.me/ArapovTrade',
      ],
      jobTitle: [
        'Независимый исследователь',
        'трейдер',
        'автор и основатель arapov.trade',
      ],
      description:
        'Независимый исследователь, практикующий трейдер, автор книг по трейдингу и научных публикаций. Специализируется на психологии трейдинга и когнитивных искажениях на финансовых рынках.',
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
          name: 'Можно ли начать торговать криптовалютами с небольшим капиталом?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Да, многие биржи позволяют начать торговлю с минимальных сумм. На платформах вроде Binance или Coinbase можно начать с 10 долларов. Рекомендуется использовать демо-счета для изучения механики рынка без риска потери реальных средств.',
          },
        },
        {
          '@type': 'Question',
          name: 'Какие криптовалюты лучше всего подходят для начинающих трейдеров?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Биткойн (BTC) и Эфириум (ETH) — оптимальный выбор для новичков благодаря их стабильности и широкому признанию. Для дополнительной диверсификации можно использовать стейблкоины (USDT, USDC), которые привязаны к доллару США.',
          },
        },
        {
          '@type': 'Question',
          name: 'Какие основные риски торговли криптовалютами?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Основные риски включают высокую волатильность цен, отсутствие регулирования, технические сбои (потеря приватных ключей, взлом бирж), эмоциональный стресс и региональные ограничения. Для минимизации рисков используйте стоп-лоссы и диверсифицируйте портфель.',
          },
        },
        {
          '@type': 'Question',
          name: 'Как выбрать надёжную криптовалютную биржу?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'При выборе биржи обратите внимание на репутацию и отзывы пользователей, уровень безопасности (двухфакторная аутентификация, холодное хранение), комиссии за торговлю и вывод средств, качество службы поддержки и соответствие регуляторным требованиям вашей страны.',
          },
        },
        {
          '@type': 'Question',
          name: 'Что такое блокчейн и как он работает?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Блокчейн — это распределённая база данных, работающая без центрального управления. Каждый блок содержит информацию о транзакциях и связан с предыдущим через криптографический хэш, формируя непрерывную цепочку. Технология обеспечивает прозрачность, безопасность и неизменяемость данных.',
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
      name: 'Как начать торговать криптовалютами',
      description: 'Пошаговое руководство для начинающих криптотрейдеров',
      step: [
        {
          '@type': 'HowToStep',
          position: 1,
          name: 'Изучите основы',
          text: 'Изучите базовые концепции: блокчейн, криптовалютные кошельки, принципы трейдинга и анализа рынка. Используйте бесплатные ресурсы, такие как Binance Academy или YouTube-каналы о криптовалютах.',
        },
        {
          '@type': 'HowToStep',
          position: 2,
          name: 'Выберите торговую платформу',
          text: 'Определите подходящую биржу или брокера. Проверьте комиссии, доступные инструменты, уровень безопасности и отзывы пользователей.',
        },
        {
          '@type': 'HowToStep',
          position: 3,
          name: 'Создайте криптокошелёк',
          text: 'Создайте программный или аппаратный кошелёк для хранения криптовалют. Аппаратные кошельки (Ledger, Trezor) обеспечивают максимальную безопасность.',
        },
        {
          '@type': 'HowToStep',
          position: 4,
          name: 'Разработайте торговый план',
          text: 'Определите свои цели, стратегию входа и выхода, правила управления рисками. Установите лимит убытков на уровне 2% от депозита на сделку.',
        },
        {
          '@type': 'HowToStep',
          position: 5,
          name: 'Начните с минимальных вложений',
          text: 'Не рискуйте большим капиталом на начальных этапах. Используйте демо-счета или торгуйте с минимальными объёмами для понимания механики рынка.',
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
      name: 'Глоссарий криптотрейдинга',
      description: 'Основные термины и понятия криптовалютного трейдинга',
      hasDefinedTerm: [
        {
          '@type': 'DefinedTerm',
          name: 'Криптовалюта',
          description:
            'Цифровой или виртуальный актив, использующий криптографию для обеспечения безопасности и предотвращения подделки',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Блокчейн',
          description:
            'Распределённая база данных, работающая без центрального управления, где каждый блок связан с предыдущим через криптографический хэш',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Биткойн',
          description:
            'Первая и самая известная криптовалюта, созданная в 2009 году с ограниченной эмиссией 21 миллион монет',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Волатильность',
          description:
            'Степень изменчивости цены актива за определённый период времени',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Стоп-лосс',
          description:
            'Инструмент для автоматического ограничения убытков при падении цены актива до определённого уровня',
        },
        {
          '@type': 'DefinedTerm',
          name: 'HODL',
          description:
            'Стратегия долгосрочного удержания криптовалюты независимо от рыночной волатильности',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Альткоин',
          description:
            'Любая криптовалюта, кроме Биткойна, часто предлагающая уникальные функции',
        },
        {
          '@type': 'DefinedTerm',
          name: 'DeFi',
          description:
            'Децентрализованные финансы — экосистема финансовых приложений, работающих на блокчейне без посредников',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Приватный ключ',
          description:
            'Секретный криптографический код, дающий полный доступ к криптовалютному кошельку',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Смарт-контракт',
          description:
            'Самоисполняющийся программный код на блокчейне, автоматически выполняющий условия соглашения',
        },
      ],
    };

    this.addJsonLdSchema(data);
  }
}
