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
  selector: 'app-home-ru-blog-thirty-three',
  templateUrl: './home-ru-blog-thirty-three.component.html',
  styleUrl: './home-ru-blog-thirty-three.component.scss',
})
export class HomeRuBlogThirtyThreeComponent implements OnInit {
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
      'Пин-бар в трейдинге: Полное руководство по торговле | Arapov.trade',
    );
    this.meta.updateTag({ name: 'robots', content: 'index' });
    this.meta.updateTag({
      name: 'description',
      content:
        'Пин-бар в трейдинге — полное руководство по торговле разворотным паттерном. Бычий и медвежий пин-бар, стратегии входа, управление рисками на форекс и криптовалютах.',
    });
    this.meta.updateTag({ name: 'datePublished', content: '2025-04-16' });
    this.meta.updateTag({
      property: 'og:image',
      content: '/assets/img/content/pinbar.jpg',
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
          '@id': 'https://arapov.trade/ru/freestudying/pinbar#article',
          headline: 'Пин-бар в трейдинге: Полное руководство по торговле',
          description:
            'Пин-бар в трейдинге — полное руководство по торговле разворотным паттерном. Бычий и медвежий пин-бар, стратегии входа, управление рисками.',
          image: {
            '@type': 'ImageObject',
            url: 'https://arapov.trade/assets/img/content/pinbar1.png',
            width: 1200,
            height: 630,
          },
          author: {
            '@id': 'https://arapov.trade/ru#person',
          },
          publisher: {
            '@type': 'Organization',
            '@id': 'https://arapov.trade#organization',
            name: 'Arapov.trade',
            url: 'https://arapov.trade',
            logo: {
              '@type': 'ImageObject',
              url: 'https://arapov.trade/assets/img/content/favicon.ico',
              width: 300,
              height: 60,
            },
          },
          datePublished: '2025-04-15T00:00:00Z',
          dateModified: '2025-12-29T00:00:00Z',
          mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': 'https://arapov.trade/ru/freestudying/pinbar',
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
      '@id': 'https://arapov.trade/ru/freestudying/pinbar#faq',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'Что такое пин-бар в трейдинге?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Пин-бар — это свечной паттерн с длинной тенью и маленьким телом, сигнализирующий о потенциальном развороте цены. Длинная тень показывает отвергнутый ценовой уровень, а компактное тело указывает на неопределённость рынка. Название происходит от Pinocchio Bar.',
          },
        },
        {
          '@type': 'Question',
          name: 'Как отличить бычий пин-бар от медвежьего?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Бычий пин-бар имеет длинную нижнюю тень и формируется после снижения, сигнализируя о развороте вверх. Медвежий пин-бар имеет длинную верхнюю тень и появляется после роста, указывая на потенциальный разворот вниз.',
          },
        },
        {
          '@type': 'Question',
          name: 'На каких уровнях пин-бар наиболее эффективен?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Пин-бар наиболее эффективен на ключевых уровнях поддержки и сопротивления, уровнях Фибоначчи (38.2%, 50%, 61.8%), круглых числах и зонах с высоким объёмом торгов. Паттерны без привязки к уровням имеют низкую надёжность.',
          },
        },
        {
          '@type': 'Question',
          name: 'Где устанавливать стоп-лосс при торговле пин-баром?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Стоп-лосс устанавливается за пределами длинной тени пин-бара. Для бычьего пин-бара — ниже минимума тени, для медвежьего — выше максимума. Рекомендуемое соотношение риска к прибыли — минимум 1:2.',
          },
        },
        {
          '@type': 'Question',
          name: 'На каких таймфреймах лучше торговать пин-бары?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Наиболее надёжные пин-бары формируются на дневных (D1) и четырёхчасовых (H4) графиках. Недельные паттерны подходят для долгосрочной торговли. На младших таймфреймах (M5, M15) много рыночного шума и ложных сигналов.',
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
      '@id': 'https://arapov.trade/ru/freestudying/pinbar#howto',
      name: 'Как торговать пин-бар',
      description:
        'Пошаговое руководство по торговле паттерном пин-бар на финансовых рынках.',
      step: [
        {
          '@type': 'HowToStep',
          position: 1,
          name: 'Определите тренд и ключевые уровни',
          text: 'Используйте скользящие средние для определения направления тренда. Найдите ключевые уровни поддержки и сопротивления на графике. Пин-бары на этих уровнях имеют наибольшую надёжность.',
        },
        {
          '@type': 'HowToStep',
          position: 2,
          name: 'Дождитесь формирования пин-бара',
          text: 'Ищите свечу с длинной тенью (минимум в 2 раза больше тела) и маленьким телом. Бычий пин-бар — на поддержке с нижней тенью, медвежий — на сопротивлении с верхней тенью.',
        },
        {
          '@type': 'HowToStep',
          position: 3,
          name: 'Подтвердите сигнал',
          text: 'Проверьте объём торгов — повышенный объём усиливает сигнал. Используйте RSI для подтверждения перекупленности/перепроданности. Дивергенции с осцилляторами дополнительно усиливают паттерн.',
        },
        {
          '@type': 'HowToStep',
          position: 4,
          name: 'Войдите в сделку',
          text: 'Агрессивный вход — сразу после закрытия пин-бара. Консервативный — после пробоя максимума (для бычьего) или минимума (для медвежьего) следующей свечой. Можно входить на откате к середине тела.',
        },
        {
          '@type': 'HowToStep',
          position: 5,
          name: 'Установите стоп-лосс и тейк-профит',
          text: 'Стоп-лосс — за пределами длинной тени. Тейк-профит — на ближайшем уровне поддержки/сопротивления. Соотношение риска к прибыли минимум 1:2. Переносите стоп в безубыток после движения в вашу сторону.',
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
      '@id': 'https://arapov.trade/ru/freestudying/pinbar#glossary',
      name: 'Глоссарий терминов пин-бара',
      description: 'Ключевые термины и определения для торговли пин-барами',
      hasDefinedTerm: [
        {
          '@type': 'DefinedTerm',
          name: 'Пин-бар',
          description:
            'Свечной паттерн с длинной тенью и маленьким телом, сигнализирующий о потенциальном развороте цены. Название происходит от Pinocchio Bar.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Бычий пин-бар',
          description:
            'Разворотный паттерн с длинной нижней тенью, формирующийся после снижения и указывающий на потенциальный рост цены.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Медвежий пин-бар',
          description:
            'Разворотный паттерн с длинной верхней тенью, формирующийся после роста и указывающий на потенциальное снижение цены.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Тень свечи',
          description:
            'Вертикальная линия выше или ниже тела свечи, показывающая максимальный и минимальный ценовой диапазон за период.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Тело свечи',
          description:
            'Прямоугольная часть свечи между ценой открытия и закрытия, показывающая итоговое изменение цены за период.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Ложный пробой',
          description:
            'Кратковременный выход цены за уровень поддержки или сопротивления с последующим возвратом. Часто формирует пин-бар.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Price Action',
          description:
            'Методология технического анализа, основанная на изучении движения цены без использования индикаторов. Пин-бар — ключевой паттерн Price Action.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Отвержение уровня',
          description:
            'Ситуация, когда цена тестирует уровень поддержки или сопротивления, но не может его пробить и разворачивается.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Подтверждение паттерна',
          description:
            'Дополнительные технические сигналы (объём, индикаторы, уровни), усиливающие надёжность торгового сетапа.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Соотношение риск/прибыль',
          description:
            'Отношение потенциального убытка к потенциальной прибыли в сделке. Для пин-баров рекомендуется минимум 1:2.',
        },
      ],
    };

    this.addJsonLdSchema(data);
  }
}
