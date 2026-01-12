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
  selector: 'app-home-ru-blog-fourty-five',
  templateUrl: './home-ru-blog-fourty-five.component.html',
  styleUrl: './home-ru-blog-fourty-five.component.scss',
})
export class HomeRuBlogFourtyFiveComponent implements OnInit {
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
      'Скользящие средние в трейдинге: полное руководство | ArapovTrade'
    );
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.updateTag({
      name: 'description',
      content:
        'Узнайте, как использовать скользящие средние (Moving Averages) в трейдинге. SMA, EMA, WMA — виды, стратегии, примеры на реальных рынках и практические рекомендации.',
    });

    this.meta.updateTag({ name: 'datePublished', content: '2025-04-17' });
    this.meta.updateTag({
      property: 'og:image',
      content: '/assets/img/content/movingaverages.png',
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
          headline:
            'Скользящие средние в трейдинге: полное руководство по применению MA',
          description:
            'Подробное руководство по скользящим средним в трейдинге. Виды MA (SMA, EMA, WMA, SMMA), стратегии пересечений, практические примеры на фондовом, криптовалютном и форекс рынках.',
          author: {
            '@id': 'https://arapov.trade/ru#person',
          },
          publisher: {
            '@type': 'Organization',
            name: 'ArapovTrade',
            url: 'https://arapov.trade',
            logo: {
              '@type': 'ImageObject',
              url: 'https://arapov.trade/assets/img/favicon.ico',
            },
          },
          datePublished: '2025-04-15T00:00:00Z',
          dateModified: '2025-11-11T00:00:00Z',
          mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': 'https://arapov.trade/ru/freestudying/movingaverages',
          },
          image: {
            '@type': 'ImageObject',
            url: 'https://arapov.trade/assets/img/content/movingaverages.png',
            width: 1200,
            height: 630,
          },
          articleSection: 'Технический анализ',
          keywords:
            'скользящие средние, SMA, EMA, WMA, технический анализ, трейдинг, золотой крест',
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
      mainEntity: [
        {
          '@type': 'Question',
          name: 'Что такое скользящее среднее в трейдинге?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Скользящее среднее (Moving Average, MA) — это технический индикатор, который рассчитывает среднюю цену актива за определённый период времени, сглаживая ценовые колебания и делая рыночные тренды более заметными. MA помогает трейдерам определять направление тренда, находить точки входа и выхода, а также фильтровать рыночный шум.',
          },
        },
        {
          '@type': 'Question',
          name: 'В чём разница между SMA и EMA?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Простое скользящее среднее (SMA) рассчитывается как среднее арифметическое цен за выбранный период, придавая одинаковый вес всем значениям. Экспоненциальное скользящее среднее (EMA) использует экспоненциальную формулу, присваивая больший вес последним ценовым данным, что делает его более чувствительным к недавним изменениям рынка. EMA лучше подходит для краткосрочной торговли, SMA — для анализа долгосрочных трендов.',
          },
        },
        {
          '@type': 'Question',
          name: 'Что такое золотой крест и мёртвый крест?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Золотой крест — это бычий сигнал, возникающий когда краткосрочное скользящее среднее (например, 50-дневное) пересекает долгосрочное (например, 200-дневное) снизу вверх, указывая на начало восходящего тренда. Мёртвый крест — медвежий сигнал, когда краткосрочное MA пересекает долгосрочное сверху вниз, сигнализируя о возможном нисходящем тренде.',
          },
        },
        {
          '@type': 'Question',
          name: 'Какой период скользящего среднего лучше использовать?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Выбор периода зависит от стиля торговли. Для скальпинга и дейтрейдинга подходят краткосрочные MA с периодами 9-21 день. Для свинг-трейдинга эффективны периоды 20-50 дней. Для долгосрочных инвестиций и определения глобального тренда используют 100-200 дневные скользящие средние. Рекомендуется комбинировать несколько периодов для более точного анализа.',
          },
        },
        {
          '@type': 'Question',
          name: 'Почему скользящие средние плохо работают во флэте?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Скользящие средние являются трендовыми индикаторами и эффективны при чётком направленном движении рынка. Во время флэта (бокового движения) цена часто пересекает MA в обоих направлениях, генерируя множество ложных сигналов. Для определения флэта используйте индикатор ADX: значение ниже 20 указывает на слабый тренд, и торговля по сигналам MA будет неэффективной.',
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
      name: 'Как использовать скользящие средние для торговли',
      description:
        'Пошаговое руководство по применению скользящих средних в трейдинге для определения трендов и поиска точек входа.',
      step: [
        {
          '@type': 'HowToStep',
          position: 1,
          name: 'Выберите тип и период скользящего среднего',
          text: 'Определите свой стиль торговли и выберите подходящий тип MA. Для краткосрочной торговли используйте EMA с периодами 9-21, для долгосрочного анализа — SMA 50-200. Настройте индикаторы на своей торговой платформе.',
        },
        {
          '@type': 'HowToStep',
          position: 2,
          name: 'Определите направление тренда',
          text: 'Проанализируйте положение цены относительно скользящего среднего. Если цена выше MA — тренд восходящий, если ниже — нисходящий. Используйте 200-дневное SMA для определения глобального тренда на дневном графике.',
        },
        {
          '@type': 'HowToStep',
          position: 3,
          name: 'Ищите сигналы пересечений',
          text: 'Отслеживайте пересечения скользящих средних с разными периодами. Золотой крест (краткосрочное MA пересекает долгосрочное снизу вверх) — сигнал на покупку. Мёртвый крест (сверху вниз) — сигнал на продажу.',
        },
        {
          '@type': 'HowToStep',
          position: 4,
          name: 'Подтвердите сигнал дополнительными индикаторами',
          text: 'Используйте RSI для проверки перекупленности/перепроданности, MACD для подтверждения силы тренда, объёмы для валидации сигнала. Не входите в позицию только на основании одного индикатора.',
        },
        {
          '@type': 'HowToStep',
          position: 5,
          name: 'Установите стоп-лосс и управляйте рисками',
          text: 'Разместите стоп-лосс ниже ближайшего уровня поддержки или на расстоянии 1-2 ATR от точки входа. Рискуйте не более 1-2% депозита на сделку. Используйте MA как динамический уровень для трейлинг-стопа.',
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
      name: 'Глоссарий терминов скользящих средних',
      description:
        'Основные термины и определения, связанные со скользящими средними в техническом анализе',
      hasDefinedTerm: [
        {
          '@type': 'DefinedTerm',
          name: 'Скользящее среднее (Moving Average)',
          description:
            'Технический индикатор, рассчитывающий среднюю цену актива за определённый период для сглаживания ценовых колебаний и выявления трендов.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'SMA (Simple Moving Average)',
          description:
            'Простое скользящее среднее, вычисляемое как среднее арифметическое цен закрытия за выбранный период времени.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'EMA (Exponential Moving Average)',
          description:
            'Экспоненциальное скользящее среднее, которое придаёт больший вес последним ценовым данным, обеспечивая более быструю реакцию на изменения рынка.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'WMA (Weighted Moving Average)',
          description:
            'Взвешенное скользящее среднее, использующее линейную шкалу весов для присвоения большего значения недавним ценам.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Золотой крест (Golden Cross)',
          description:
            'Бычий сигнал, возникающий при пересечении краткосрочного скользящего среднего долгосрочного снизу вверх.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Мёртвый крест (Death Cross)',
          description:
            'Медвежий сигнал, формирующийся при пересечении краткосрочного скользящего среднего долгосрочного сверху вниз.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Период скользящего среднего',
          description:
            'Количество временных интервалов (свечей), используемых для расчёта среднего значения цены. Определяет чувствительность индикатора.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Динамическая поддержка/сопротивление',
          description:
            'Функция скользящего среднего как изменяющегося уровня, от которого цена может отскакивать в направлении тренда.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Запаздывание индикатора (Lag)',
          description:
            'Свойство скользящих средних реагировать на ценовые изменения с задержкой, так как они основаны на исторических данных.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Флэт (Боковое движение)',
          description:
            'Состояние рынка без выраженного направленного тренда, при котором скользящие средние генерируют множество ложных сигналов.',
        },
      ],
    };

    this.addJsonLdSchema(data);
  }
}
