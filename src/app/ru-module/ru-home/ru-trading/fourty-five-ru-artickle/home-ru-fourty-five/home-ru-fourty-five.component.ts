import {
  Component,
  OnInit,
  Inject,
  signal,
  ChangeDetectorRef,
  ChangeDetectionStrategy,
  AfterViewInit,
  Renderer2,
} from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ArticlesService } from '../../../../../servises/articles.service';
import { ActivatedRoute } from '@angular/router';
import { DOCUMENT } from '@angular/common';
import { ThemeservService } from '../../../../../servises/themeserv.service';
import { artickle } from '../../../../../servises/articles.service';
import { Subscription } from 'rxjs';
import { NavigationEnd, Router } from '@angular/router';
@Component({
  selector: 'app-home-ru-fourty-five',
  templateUrl: './home-ru-fourty-five.component.html',
  styleUrl: './home-ru-fourty-five.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeRuFourtyFiveComponent implements OnInit, AfterViewInit {
  readonly panelOpenState = signal(false);
  constructor(
    private meta: Meta,
    private titleService: Title,
    private articleServ: ArticlesService,
    private route: ActivatedRoute,
    @Inject(DOCUMENT) private document: Document,
    private renderer: Renderer2,
    private cdr: ChangeDetectorRef,
    private router: Router,
    private themeService: ThemeservService,
    private artickleServ: ArticlesService
  ) {}
  private routerSubscription!: Subscription;
  private themeSubscription!: Subscription;
  isDark!: boolean;
  ukrGroups: any = [];
  grr!: any;
  checkedGroup!: any;

  ngOnInit(): void {
    this.removeSelectedSchemas();
    this.setArticleSchema();
    this.setPersonSchema();
    this.setFaqSchema();
    this.setHowToSchema();
    this.setVideoObjectSchema();
    this.setGlossarySchema();
    this.setEducationalOccupationalProgramSchema();
    this.themeSubscription = this.themeService.getTheme().subscribe((data) => {
      this.isDark = data;
      this.cdr.detectChanges();
    });

    this.ukrGroups = this.artickleServ.getRussianGroups();
    this.grr = this.artickleServ.selectedGroups;
    this.updateArticleCounts();
    this.checkedGroup = this.artickleServ.selectedGroups;

    this.titleService.setTitle(
      'Бесплатное обучение трейдингу для начинающих с нуля | Игорь Арапов'
    );
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.updateTag({
      name: 'description',
      content:
        'Бесплатный курс по трейдингу для начинающих с нуля от практикующего трейдера. Более 150 статей и 70 видеоуроков: технический анализ, объёмы, Smart Money, психология торговли.',
    });

    this.meta.updateTag({ name: 'datePublished', content: '2025-05-30' });
    this.meta.updateTag({
      property: 'og:image',
      content: 'https://arapov.trade/assets/img/content/freeeducationnew.webp',
    });
    this.meta.updateTag({
      name: 'twitter:image',
      content: `https://arapov.trade/assets/img/content/freeeducationnew.webp`,
    });

    this.gerRandom();

    this.route.fragment.subscribe((fragment) => {
      if (fragment) {
        setTimeout(() => {
          const element = this.document.getElementById(fragment);
          if (element) {
            // Отступ сверху в пикселях, например 80px (зависит от вашего меню)
            const offset = 80;

            // Позиция элемента относительно страницы
            const elementPosition =
              element.getBoundingClientRect().top + window.pageYOffset;

            // Скроллим с учётом отступа
            window.scrollTo({
              top: elementPosition - offset,
              behavior: 'smooth',
            });
          }
        }, 100);
      }
    });
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
  ngAfterViewInit() {
    // Затримка для забезпечення ініціалізації Angular Material
    setTimeout(() => {
      this.cdr.detectChanges();
      this.cdr.markForCheck();
      // Запускаємо перевірку після рендерингу
    }, 100);
  }

  private removeSelectedSchemas(): void {
    const typesToRemove = [
      'Article',
      'FAQPage',
      'HowTo',
      'DefinedTermSet',
      'Person',
      'VideoObject',
      'EducationalOccupationalProgram',
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
  //  VIDEOOBJECT
  // ============================================================
  private setVideoObjectSchema(): void {
    const data = {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'VideoObject',
          '@id': 'https://arapov.trade/ru/freestudying/freeeducation#video',
          name: 'Бесплатный курс по трейдингу — обзор программы обучения',
          description:
            'Подробный разбор бесплатного курса по трейдингу: на что обращать внимание, зачем нужны разные разделы и какие ключевые темы в них раскрываются. Теория и практика — от базовых понятий до концепции Вайкоффа и чтения биржевых объёмов.',
          thumbnailUrl: 'https://i.ytimg.com/vi/ZHhJqYzyaO4/maxresdefault.jpg',
          uploadDate: '2025-11-15T00:00:00+02:00',
          duration: 'PT1H30M55S',
          contentUrl: 'https://www.youtube.com/watch?v=ZHhJqYzyaO4',
          embedUrl: 'https://www.youtube.com/embed/ZHhJqYzyaO4',
          author: {
            '@type': 'Person',
            '@id': 'https://arapov.trade/ru#person',
          },
          publisher: {
            '@type': 'Organization',
            name: 'Arapov Trade',
            logo: {
              '@type': 'ImageObject',
              url: 'https://arapov.trade/assets/img/favicon.ico',
            },
          },
        },
      ],
    };

    this.addJsonLdSchema(data);
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
          '@id': 'https://arapov.trade/ru/freestudying/freeeducation#article',
          headline:
            'Бесплатное обучение трейдингу с нуля — полный курс для начинающих',
          description:
            'Бесплатный курс по трейдингу для начинающих с нуля от практикующего трейдера. Более 150 статей и 70 видеоуроков: технический анализ, объёмы, Smart Money, психология торговли.',
          datePublished: '2025-01-15T00:00:00+02:00',
          dateModified: '2025-11-15T00:00:00+02:00',
          author: {
            '@type': 'Person',
            '@id': 'https://arapov.trade/ru#person',
            name: 'Игорь Арапов',
            url: 'https://arapov.trade/ru',
            sameAs: [
              'https://www.youtube.com/@ArapovTrade',
              'https://t.me/ArapovTrade',
            ],
            jobTitle: 'Профессиональный трейдер',
            worksFor: {
              '@type': 'Organization',
              name: 'Arapov Trade',
            },
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
            '@id': 'https://arapov.trade/ru/freestudying/freeeducation',
          },
          image: {
            '@type': 'ImageObject',
            url: 'https://arapov.trade/assets/img/content/phaze-trading_1.png',
          },
          articleSection: 'Обучение трейдингу',
          keywords: [
            'бесплатный курс трейдинга',
            'обучение трейдингу с нуля',
            'трейдинг для начинающих',
            'технический анализ',
            'Smart Money',
            'объёмный анализ',
          ],
          video: {
            '@id': 'https://arapov.trade/ru/freestudying/freeeducation#video',
          },
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
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      '@id': 'https://arapov.trade/ru/freestudying/freeeducation#faq',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'Можно ли научиться трейдингу бесплатно?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Да, данный курс содержит более 130 статей и 70 видеоуроков, охватывающих всю необходимую теорию и практику. Материалы достаточны для самостоятельного освоения профессии без дополнительного платного обучения.',
          },
        },
        {
          '@type': 'Question',
          name: 'Сколько времени нужно на обучение трейдингу?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Изучение теории занимает 2-4 недели при регулярных занятиях. После этого рекомендуется выполнить минимум 100 сделок на демо-счёте для отработки навыков. Полный цикл обучения до выхода на реальный счёт — 2-3 месяца.',
          },
        },
        {
          '@type': 'Question',
          name: 'Что такое правило риск/прибыль 1 к 3?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Это соотношение означает, что потенциальная прибыль в сделке должна быть минимум в 3 раза больше риска. Например, при стоп-лоссе 5 пунктов цель должна быть 15 пунктов. Это позволяет оставаться в прибыли даже при 40% успешных сделок.',
          },
        },
        {
          '@type': 'Question',
          name: 'Что такое Smart Money в трейдинге?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Smart Money — это концепция, описывающая поведение крупных участников рынка (банков, фондов, маркет-мейкеров). Они создают движение цены, забирая ликвидность у розничных трейдеров через ложные пробои и манипуляции.',
          },
        },
        {
          '@type': 'Question',
          name: 'Почему большинство трейдеров теряют деньги?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Основные причины: торговля без системы (отрицательное математическое ожидание), отсутствие стоп-лоссов, эмоциональные решения, завышенные риски и непонимание манипуляций крупных игроков.',
          },
        },
        {
          '@type': 'Question',
          name: 'С какой суммы можно начать торговать?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Рекомендуется начинать с демо-счёта для отработки навыков. Для реальной торговли минимальная сумма зависит от инструмента и брокера, но важнее не размер депозита, а соблюдение риск-менеджмента (1-2% риска на сделку).',
          },
        },
        {
          '@type': 'Question',
          name: 'Что такое уровень смены приоритета (УСП)?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'УСП — это динамическая зона на графике, откуда начинается импульсное движение, приводящее к обновлению ценовых экстремумов. Этот уровень указывает на активность доминирующей стороны — покупателей или продавцов.',
          },
        },
        {
          '@type': 'Question',
          name: 'Как определить ложный пробой уровня?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Ложный пробой характеризуется: выходом цены за уровень на повышенном объёме, отсутствием продолжения движения, формированием пин-бара или поглощения, и возвратом цены обратно в диапазон с последующим движением в противоположную сторону.',
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
      '@id': 'https://arapov.trade/ru/freestudying/freeeducation#howto',
      name: 'Как пройти бесплатный курс по трейдингу',
      description:
        'Пошаговый план прохождения курса от теории до практики на реальном счёте.',
      totalTime: 'P3M',
      step: [
        {
          '@type': 'HowToStep',
          position: 1,
          name: 'Изучите раздел для начинающих',
          text: 'Познакомьтесь с основами трейдинга, мифами о лёгком заработке и типичными ошибками новичков. Поймите, что трейдинг — это бизнес с чёткими правилами.',
        },
        {
          '@type': 'HowToStep',
          position: 2,
          name: 'Освойте технический анализ',
          text: 'Научитесь определять фазы рынка, строить уровни поддержки и сопротивления, находить тренды и уровни смены приоритета.',
        },
        {
          '@type': 'HowToStep',
          position: 3,
          name: 'Изучите объёмный анализ',
          text: 'Разберитесь в принципе усилие—результат, научитесь читать вертикальные объёмы и определять намерения крупных участников рынка.',
        },
        {
          '@type': 'HowToStep',
          position: 4,
          name: 'Освойте концепцию Smart Money',
          text: 'Изучите паттерны поведения крупных игроков, научитесь распознавать ложные пробои, захват ликвидности и манипуляции.',
        },
        {
          '@type': 'HowToStep',
          position: 5,
          name: 'Проработайте психологию и риск-менеджмент',
          text: 'Научитесь рассчитывать объём позиции, ставить стоп-лоссы и контролировать эмоции. Поймите правило 1 к 3.',
        },
        {
          '@type': 'HowToStep',
          position: 6,
          name: 'Практикуйтесь на демо-счёте',
          text: 'Выполните минимум 100 сделок на демонстрационном счёте, ведите журнал сделок и анализируйте результаты.',
        },
        {
          '@type': 'HowToStep',
          position: 7,
          name: 'Переходите на реальный счёт',
          text: 'При положительном математическом ожидании на демо начинайте торговать реальными деньгами с минимальными рисками.',
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
      '@id': 'https://arapov.trade/ru/freestudying/freeeducation#terms',
      name: 'Глоссарий трейдинга',
      hasDefinedTerm: [
        {
          '@type': 'DefinedTerm',
          name: 'Трейдинг',
          description:
            'Торговля финансовыми инструментами с целью извлечения прибыли из колебаний цен.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Технический анализ',
          description:
            'Метод прогнозирования цен на основе изучения графиков, паттернов и индикаторов.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Уровень поддержки',
          description:
            'Ценовая зона, где спрос достаточно силён, чтобы остановить падение цены.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Уровень сопротивления',
          description:
            'Ценовая зона, где предложение достаточно сильно, чтобы остановить рост цены.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Smart Money',
          description:
            'Концепция, описывающая действия крупных участников рынка и их влияние на цену.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Объёмный анализ',
          description:
            'Метод анализа рынка на основе торговых объёмов для определения намерений участников.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Ложный пробой',
          description:
            'Выход цены за уровень с последующим возвратом и движением в противоположную сторону.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Стоп-лосс',
          description:
            'Защитный ордер для автоматического закрытия убыточной позиции.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Риск-менеджмент',
          description:
            'Система управления рисками для сохранения капитала и стабильной торговли.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Математическое ожидание',
          description:
            'Средний результат на сделку, определяющий прибыльность торговой системы на дистанции.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'WinRate',
          description:
            'Процент прибыльных сделок от общего количества сделок в системе.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Price Action',
          description:
            'Метод анализа на основе движения цены и свечных паттернов без индикаторов.',
        },
      ],
    };

    this.addJsonLdSchema(data);
  }

  // ============================================================
  //  EducationalOccupationalProgram
  // ============================================================
  private setEducationalOccupationalProgramSchema(): void {
    const data = {
      '@context': 'https://schema.org',
      '@type': 'EducationalOccupationalProgram',
      '@id': 'https://arapov.trade/ru/freestudying/freeeducation#program',
      name: 'Бесплатный курс по трейдингу',
      description:
        'Полная программа обучения трейдингу с нуля: от базовых понятий до профессиональной торговой системы',
      provider: {
        '@type': 'Person',
        '@id': 'https://arapov.trade/#person',
      },
      timeToComplete: 'P3M',
      occupationalCategory: 'Трейдер',
      programType: 'Онлайн-курс',
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'USD',
      },
      hasCourse: {
        '@type': 'Course',
        name: 'Обучение трейдингу с нуля',
        description: 'Более 130 статей и 70 видеоуроков по трейдингу',
        provider: {
          '@type': 'Person',
          name: 'Игорь Арапов',
        },
      },
    };

    this.addJsonLdSchema(data);
  }
}
