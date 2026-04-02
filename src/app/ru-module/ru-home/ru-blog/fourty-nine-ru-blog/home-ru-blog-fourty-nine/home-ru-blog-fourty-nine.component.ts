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
  selector: 'app-home-ru-blog-fourty-nine',
  templateUrl: './home-ru-blog-fourty-nine.component.html',
  styleUrl: './home-ru-blog-fourty-nine.component.scss',
})
export class HomeRuBlogFourtyNineComponent implements OnInit {
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
      'Как выбрать торговую платформу для трейдинга? | Полное руководство 2025',
    );
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.updateTag({
      name: 'description',
      content:
        'Узнайте, как правильно выбрать торговую платформу для трейдинга. Сравнение MetaTrader, TradingView, Interactive Brokers. Критерии выбора для новичков и профессионалов.',
    });
    this.meta.updateTag({ name: 'datePublished', content: '2025-04-03' });
    this.meta.updateTag({
      property: 'og:image',
      content: '/assets/img/content/choosingtradingplatform.webp',
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
          headline: 'Как выбрать торговую платформу для трейдинга?',
          description:
            'Полное руководство по выбору торговой платформы: критерии оценки, сравнение популярных решений, рекомендации для новичков и профессионалов.',
          image:
            'https://arapov.trade/assets/img/content/choosingtradingplatform1.webp',
          author: {
            '@id': 'https://arapov.trade/ru#person',
          },
          publisher: {
            '@type': 'Organization',
            name: 'Arapov Trade',
            url: 'https://arapov.trade',
            logo: {
              '@type': 'ImageObject',
              url: 'https://arapov.trade/assets/img/favicon.ico',
            },
          },
          datePublished: '2026-03-25T00:00:00Z',
          dateModified: '2026-03-31T00:00:00Z',
          mainEntityOfPage: {
            '@type': 'WebPage',
            '@id':
              'https://arapov.trade/ru/freestudying/choosingtradingplatform',
          },
          articleSection: 'Обучение трейдингу',
          wordCount: 1650,
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
          name: 'Какую торговую платформу выбрать новичку?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Новичкам рекомендуются платформы с интуитивным интерфейсом и образовательными ресурсами: eToro с функцией копирования сделок, Binance с обучающей академией, или MetaTrader 4 с демо-счётом для практики без риска.',
          },
        },
        {
          '@type': 'Question',
          name: 'MetaTrader 4 или MetaTrader 5 — что лучше?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'MT4 проще в освоении и имеет больше готовых советников. MT5 предлагает расширенную аналитику, больше таймфреймов и доступ к акциям. Для Форекс подойдёт MT4, для мультирыночной торговли — MT5.',
          },
        },
        {
          '@type': 'Question',
          name: 'Сколько стоит использование торговой платформы?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Большинство платформ бесплатны для использования (MetaTrader, TradingView базовый). Затраты формируются из комиссий брокера: спреды от 0.1 пункта, комиссии за сделку от $1, или процент от объёма торгов.',
          },
        },
        {
          '@type': 'Question',
          name: 'Как проверить надёжность торговой платформы?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Проверьте регуляцию брокера (FCA, CySEC, ASIC), изучите отзывы на независимых ресурсах, протестируйте демо-счёт во время волатильности, оцените скорость техподдержки и историю компании на рынке.',
          },
        },
        {
          '@type': 'Question',
          name: 'Можно ли торговать с телефона?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Да, все популярные платформы имеют мобильные приложения: MetaTrader, TradingView, Binance, eToro. Мобильные версии сохраняют основной функционал: графики, индикаторы, открытие сделок и управление позициями.',
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
      name: 'Как выбрать торговую платформу для трейдинга',
      description:
        'Пошаговое руководство по выбору оптимальной торговой платформы',
      step: [
        {
          '@type': 'HowToStep',
          position: 1,
          name: 'Определите свои цели',
          text: 'Решите, какими активами будете торговать (Форекс, акции, криптовалюты), какой стиль торговли предпочитаете (скальпинг, дейтрейдинг, инвестирование) и какой у вас уровень опыта.',
        },
        {
          '@type': 'HowToStep',
          position: 2,
          name: 'Сравните функционал платформ',
          text: 'Оцените наличие нужных инструментов: графики, индикаторы, типы ордеров, возможность автоматизации. Для новичков важна простота, для профессионалов — расширенная аналитика.',
        },
        {
          '@type': 'HowToStep',
          position: 3,
          name: 'Проверьте надёжность и регуляцию',
          text: 'Убедитесь, что брокер регулируется авторитетными органами (FCA, CySEC, ASIC). Изучите отзывы пользователей, историю компании и наличие защиты депозитов.',
        },
        {
          '@type': 'HowToStep',
          position: 4,
          name: 'Протестируйте на демо-счёте',
          text: 'Откройте демо-счёт и попрактикуйтесь минимум 2-4 недели. Оцените скорость исполнения ордеров, удобство интерфейса и работу во время высокой волатильности.',
        },
        {
          '@type': 'HowToStep',
          position: 5,
          name: 'Сравните комиссии и условия',
          text: 'Рассчитайте общие затраты: спреды, комиссии за сделку, плата за вывод средств, своп. Выберите платформу с оптимальным соотношением функционала и стоимости.',
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
      name: 'Глоссарий терминов: торговые платформы',
      description:
        'Ключевые термины, связанные с выбором и использованием торговых платформ',
      hasDefinedTerm: [
        {
          '@type': 'DefinedTerm',
          name: 'Торговая платформа',
          description:
            'Программное обеспечение для доступа к финансовым рынкам, анализа данных и совершения сделок',
        },
        {
          '@type': 'DefinedTerm',
          name: 'MetaTrader',
          description:
            'Популярная торговая платформа от MetaQuotes для торговли на Форекс и CFD, доступная в версиях MT4 и MT5',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Демо-счёт',
          description:
            'Учебный счёт с виртуальными средствами для практики торговли без финансового риска',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Спред',
          description:
            'Разница между ценой покупки (Ask) и продажи (Bid) актива, формирующая комиссию брокера',
        },
        {
          '@type': 'DefinedTerm',
          name: 'ECN',
          description:
            'Electronic Communication Network — система прямого доступа к поставщикам ликвидности с минимальными спредами',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Торговый советник',
          description:
            'Автоматизированная программа (робот), выполняющая торговые операции по заданному алгоритму',
        },
        {
          '@type': 'DefinedTerm',
          name: 'API',
          description:
            'Application Programming Interface — интерфейс для подключения сторонних приложений и автоматизации торговли',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Регуляция брокера',
          description:
            'Лицензирование и надзор со стороны финансовых органов (FCA, CySEC, ASIC), гарантирующие защиту клиентов',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Социальный трейдинг',
          description:
            'Функция копирования сделок успешных трейдеров, популярная на платформах eToro и ZuluTrade',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Скальпинг',
          description:
            'Стратегия краткосрочной торговли с множеством быстрых сделок для извлечения небольшой прибыли',
        },
      ],
    };

    this.addJsonLdSchema(data);
  }
}
