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
  selector: 'app-home-ru-blog-twenty-four',
  templateUrl: './home-ru-blog-twenty-four.component.html',
  styleUrl: './home-ru-blog-twenty-four.component.scss',
})
export class HomeRuBlogTwentyFourComponent implements OnInit {
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
      'Паттерн Флаг в трейдинге: как распознать и торговать | Arapov.trade',
    );
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.updateTag({
      name: 'description',
      content:
        'Паттерн Флаг в трейдинге: полное руководство по идентификации, построению и торговым стратегиям. Узнайте, как использовать фигуру продолжения тренда для прибыльной торговли.',
    });

    this.meta.updateTag({ name: 'datePublished', content: '2025-04-15' });
    this.meta.updateTag({
      property: 'og:image',
      content: '/assets/img/content/flagfigure.webp',
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
          mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': 'https://arapov.trade/ru/freestudying/flagfigure',
          },
          headline:
            'Паттерн Флаг в трейдинге: полное руководство по идентификации и торговым стратегиям',
          description:
            'Исчерпывающее руководство по паттерну Флаг: структура фигуры, типы флагов, методы торговли и практические рекомендации для трейдеров всех уровней.',
          image: 'https://arapov.trade/assets/img/content/flagfigure.webp',
          datePublished: '2025-04-15T00:00:00Z',
          dateModified: '2025-12-29T00:00:00Z',
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
            url: 'https://arapov.trade',
          },
          articleSection: 'Технический анализ',
          keywords: [
            'паттерн флаг',
            'фигура флаг',
            'продолжение тренда',
            'древко флага',
            'пробой',
          ],
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
          name: 'Что такое паттерн Флаг в трейдинге?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Паттерн Флаг — это графическая модель продолжения тренда, состоящая из двух элементов: древка (резкого импульсного движения) и полотнища флага (короткой консолидации в узком канале). После завершения консолидации цена обычно продолжает движение в направлении первоначального импульса.',
          },
        },
        {
          '@type': 'Question',
          name: 'Какие типы паттерна Флаг существуют?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Выделяют два основных типа: бычий флаг (формируется после импульса вверх, консолидация наклонена вниз) и медвежий флаг (образуется после импульса вниз, консолидация наклонена вверх). Оба типа сигнализируют о продолжении предшествующего тренда.',
          },
        },
        {
          '@type': 'Question',
          name: 'Как правильно торговать паттерн Флаг?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Основной метод — вход на пробое границы флага в направлении тренда. Стоп-лосс размещается за противоположной границей консолидации. Цель по прибыли рассчитывается как проекция длины древка от точки пробоя.',
          },
        },
        {
          '@type': 'Question',
          name: 'Как отличить истинный пробой Флага от ложного?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Истинный пробой сопровождается увеличением торгового объёма и закрытием свечи за границей флага. Ложные пробои характеризуются низким объёмом и быстрым возвратом цены в диапазон консолидации. Дополнительно используйте подтверждение от индикаторов.',
          },
        },
        {
          '@type': 'Question',
          name: 'На каких рынках работает паттерн Флаг?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Флаг универсален и эффективен на всех финансовых рынках: Форекс, акции, криптовалюты, сырьевые товары. Паттерн работает на любых таймфреймах, от минутных до недельных, хотя наиболее надёжные сигналы формируются на H1-D1.',
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
      name: 'Как торговать паттерн Флаг',
      description:
        'Пошаговая инструкция по идентификации и торговле паттерна Флаг',
      step: [
        {
          '@type': 'HowToStep',
          position: 1,
          name: 'Идентифицируйте импульс',
          text: 'Найдите на графике резкое направленное движение цены (древко флага), сопровождающееся повышенным объёмом торгов. Импульс должен быть выраженным и однозначным.',
        },
        {
          '@type': 'HowToStep',
          position: 2,
          name: 'Определите консолидацию',
          text: 'После импульса цена входит в фазу консолидации, формируя узкий канал с наклоном против основного тренда. Границы канала должны быть параллельными.',
        },
        {
          '@type': 'HowToStep',
          position: 3,
          name: 'Дождитесь пробоя',
          text: 'Наблюдайте за поведением цены у границ флага. Вход осуществляется после закрытия свечи за границей канала в направлении первоначального импульса.',
        },
        {
          '@type': 'HowToStep',
          position: 4,
          name: 'Подтвердите сигнал объёмом',
          text: 'Убедитесь, что пробой сопровождается ростом торгового объёма. Низкий объём при пробое повышает вероятность ложного сигнала.',
        },
        {
          '@type': 'HowToStep',
          position: 5,
          name: 'Установите стоп и цель',
          text: 'Разместите стоп-лосс за противоположной границей флага. Цель по прибыли равна длине древка, отложенной от точки пробоя.',
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
      name: 'Глоссарий терминов паттерна Флаг',
      hasDefinedTerm: [
        {
          '@type': 'DefinedTerm',
          name: 'Паттерн Флаг',
          description:
            'Графическая модель продолжения тренда, состоящая из импульса (древка) и последующей консолидации (полотнища)',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Древко флага',
          description:
            'Резкое импульсное движение цены, предшествующее консолидации и формирующее основу паттерна',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Полотнище флага',
          description:
            'Фаза консолидации в узком канале с наклоном против основного тренда',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Бычий флаг',
          description:
            'Паттерн продолжения восходящего тренда с консолидацией, наклонённой вниз',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Медвежий флаг',
          description:
            'Паттерн продолжения нисходящего тренда с консолидацией, наклонённой вверх',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Пробой флага',
          description:
            'Выход цены за границу консолидации с закрытием свечи, сигнализирующий о продолжении тренда',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Ложный пробой',
          description:
            'Кратковременный выход цены за границу флага с последующим возвратом в диапазон консолидации',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Проекция цели',
          description:
            'Метод расчёта целевой цены путём откладывания длины древка от точки пробоя',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Консолидация',
          description:
            'Период бокового движения цены в узком диапазоне, отражающий временную паузу в тренде',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Импульс',
          description:
            'Резкое однонаправленное движение цены с высоким объёмом, формирующее начало паттерна',
        },
      ],
    };

    this.addJsonLdSchema(data);
  }
}
