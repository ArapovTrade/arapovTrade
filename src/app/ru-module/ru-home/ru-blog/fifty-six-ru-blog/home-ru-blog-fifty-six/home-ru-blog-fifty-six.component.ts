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
  selector: 'app-home-ru-blog-fifty-six',
  templateUrl: './home-ru-blog-fifty-six.component.html',
  styleUrl: './home-ru-blog-fifty-six.component.scss',
})
export class HomeRuBlogFiftySixComponent implements OnInit {
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
      'Книги по трейдингу для начинающих | Лучшая литература для трейдеров',
    );
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.updateTag({
      name: 'description',
      content:
        'Книги по трейдингу для начинающих — полное руководство по выбору профессиональной литературы. Узнайте, как книги формируют торговое мышление и помогают освоить анализ рынков.',
    });
    this.meta.updateTag({ name: 'datePublished', content: '2025-04-04' });
    this.meta.updateTag({
      property: 'og:image',
      content: '/assets/img/content/benefitsoftradingbooks.jpg',
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
          '@id':
            'https://arapov.trade/ru/freestudying/benefitsoftradingbooks#article',
          headline:
            'Книги по трейдингу для начинающих — полное руководство по профессиональной литературе',
          description:
            'Узнайте, почему книги остаются незаменимым инструментом обучения трейдингу, как выбрать литературу для своего уровня и интегрировать книжные знания в торговую практику.',
          image:
            'https://arapov.trade/assets/img/content/benefitsoftradingbooks1.webp',
          datePublished: '2025-04-15T00:00:00Z',
          dateModified: '2025-12-29T00:00:00Z',
          author: {
            '@id': 'https://arapov.trade/ru#person',
          },
          publisher: {
            '@type': 'Organization',
            '@id': 'https://arapov.trade/#organization',
            name: 'Arapov Trade',
            url: 'https://arapov.trade',
            logo: {
              '@type': 'ImageObject',
              url: 'https://arapov.trade/assets/img/favicon.ico',
            },
          },
          mainEntityOfPage: {
            '@type': 'WebPage',
            '@id':
              'https://arapov.trade/ru/freestudying/benefitsoftradingbooks',
          },
          articleSection: 'Обучение трейдингу',
          keywords: [
            'книги по трейдингу',
            'литература для трейдеров',
            'обучение трейдингу',
            'технический анализ',
            'психология трейдинга',
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
      '@id': 'https://arapov.trade/ru/freestudying/benefitsoftradingbooks#faq',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'Какие книги по трейдингу лучше читать начинающим?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Начинающим трейдерам рекомендуется начинать с вводных изданий, объясняющих базовые понятия финансовых рынков. Подходят книги по основам технического анализа, типам активов и принципам формирования цен. После освоения базы можно переходить к специализированной литературе по психологии торговли и управлению капиталом.',
          },
        },
        {
          '@type': 'Question',
          name: 'Почему книги по трейдингу лучше видеоуроков?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Книги предоставляют структурированное изложение материала, позволяя читателю глубоко погрузиться в тему. В отличие от коротких видео, качественное издание проводит от базовых концепций к продвинутым стратегиям, обеспечивая целостное восприятие предмета. Возможность возвращаться к сложным моментам делает книги особенно ценными для обучения.',
          },
        },
        {
          '@type': 'Question',
          name: 'Как применять знания из книг по трейдингу на практике?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Оптимальный подход предполагает последовательное освоение материала с параллельным тестированием концепций на демонстрационных счетах. После каждой книги рекомендуется составлять конспект ключевых идей и определять конкретные действия для внедрения в торговую практику. Чередование периодов чтения с активной торговлей обеспечивает непрерывный рост компетенций.',
          },
        },
        {
          '@type': 'Question',
          name: 'Какие книги помогут справиться с эмоциями в трейдинге?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Книги по психологии торговли помогают идентифицировать деструктивные поведенческие паттерны и выработать стратегии их преодоления. Специализированная литература разбирает страх упустить прибыль, жадность при нарастающем выигрыше и отрицание убытков. Авторы предлагают конкретные техники самоконтроля: ведение торгового дневника, практики осознанности и методы когнитивной переоценки.',
          },
        },
        {
          '@type': 'Question',
          name: 'Нужно ли перечитывать книги по трейдингу несколько раз?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Регулярное перечитывание ключевых книг открывает новые грани понимания по мере накопления торгового опыта. Концепции, казавшиеся очевидными при первом прочтении, приобретают глубину после переживания реальных рыночных ситуаций. Многие профессиональные трейдеры возвращаются к классическим изданиям ежегодно, каждый раз извлекая новые инсайты.',
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
      '@id':
        'https://arapov.trade/ru/freestudying/benefitsoftradingbooks#howto',
      name: 'Как эффективно изучать книги по трейдингу',
      description:
        'Пошаговое руководство по работе с профессиональной литературой для достижения максимального результата в обучении трейдингу.',
      step: [
        {
          '@type': 'HowToStep',
          position: 1,
          name: 'Выберите книги по уровню',
          text: 'Определите свой текущий уровень знаний и выберите литературу соответствующей сложности. Начинающим подходят вводные издания по базовым понятиям рынков, трейдерам среднего уровня — специализированные книги по конкретным методам анализа.',
        },
        {
          '@type': 'HowToStep',
          position: 2,
          name: 'Изучайте активно с заметками',
          text: 'Делайте пометки на полях, выписывайте ключевые идеи, формулируйте вопросы для дальнейшего исследования. Создание конспекта после каждой книги углубляет понимание материала и формирует персональную базу знаний.',
        },
        {
          '@type': 'HowToStep',
          position: 3,
          name: 'Тестируйте концепции на практике',
          text: 'Параллельно с чтением проверяйте изученные концепции на демонстрационных счетах. Каждая прочитанная глава должна становиться основой для практических упражнений по построению уровней, идентификации трендов и применению индикаторов.',
        },
        {
          '@type': 'HowToStep',
          position: 4,
          name: 'Внедряйте изменения в торговлю',
          text: 'Определяйте конкретные действия для внедрения в торговую практику после каждой книги. Простое накопление теоретических знаний без практического применения не приводит к улучшению результатов.',
        },
        {
          '@type': 'HowToStep',
          position: 5,
          name: 'Периодически перечитывайте ключевые книги',
          text: 'Возвращайтесь к классическим изданиям по мере накопления опыта. Концепции приобретают новую глубину после переживания реальных рыночных ситуаций, позволяя извлекать дополнительные инсайты.',
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
      '@id':
        'https://arapov.trade/ru/freestudying/benefitsoftradingbooks#glossary',
      name: 'Глоссарий терминов трейдинга',
      hasDefinedTerm: [
        {
          '@type': 'DefinedTerm',
          name: 'Скользящая средняя',
          description:
            'Технический индикатор, рассчитывающий среднее значение цены за определённый период для определения направления тренда и сглаживания рыночного шума.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Стоп-лосс',
          description:
            'Защитный ордер, автоматически закрывающий позицию при достижении заданного уровня убытка для ограничения потерь трейдера.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Ликвидность рынка',
          description:
            'Способность рынка обеспечивать быстрое исполнение сделок без существенного влияния на цену актива.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Паттерн поглощения',
          description:
            'Свечная модель разворота, при которой тело текущей свечи полностью перекрывает тело предыдущей, сигнализируя о смене рыночного настроения.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Технический анализ',
          description:
            'Метод прогнозирования движения цен на основе изучения исторических данных, графиков и индикаторов.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Торговый дневник',
          description:
            'Инструмент самоанализа трейдера, в котором фиксируются все сделки, решения и эмоциональные состояния для выявления ошибок и улучшения стратегии.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Волатильность',
          description:
            'Степень изменчивости цены актива за определённый период времени, отражающая уровень рыночной неопределённости.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Демонстрационный счёт',
          description:
            'Учебный торговый счёт с виртуальными средствами, позволяющий практиковаться без риска потери реальных денег.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Проскальзывание',
          description:
            'Разница между ожидаемой ценой исполнения ордера и фактической ценой, возникающая при высокой волатильности или низкой ликвидности.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Тейк-профит',
          description:
            'Ордер на фиксацию прибыли, автоматически закрывающий позицию при достижении целевого уровня цены.',
        },
      ],
    };

    this.addJsonLdSchema(data);
  }
}
