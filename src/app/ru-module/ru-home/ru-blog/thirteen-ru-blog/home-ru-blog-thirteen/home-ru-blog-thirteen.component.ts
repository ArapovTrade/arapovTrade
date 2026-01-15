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
  selector: 'app-home-ru-blog-thirteen',
  templateUrl: './home-ru-blog-thirteen.component.html',
  styleUrl: './home-ru-blog-thirteen.component.scss',
})
export class HomeRuBlogThirteenComponent implements OnInit {
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
      'Волны Эллиотта: Полное руководство по волновому анализу | Arapov.trade'
    );
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.updateTag({
      name: 'description',
      content:
        'Волны Эллиотта — полное руководство по волновому анализу для трейдеров. Импульсные и коррекционные волны, правила разметки, практическое применение с уровнями Фибоначчи.',
    });
    this.meta.updateTag({ name: 'datePublished', content: '2025-04-15' });
    this.meta.updateTag({
      property: 'og:image',
      content: '/assets/img/content/wavesofelliott.webp',
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
          '@id': 'https://arapov.trade/ru/freestudying/wavesofelliott#article',
          headline: 'Волны Эллиотта: Полное руководство по волновому анализу',
          description:
            'Волны Эллиотта — полное руководство по волновому анализу для трейдеров. Импульсные и коррекционные волны, правила разметки, практическое применение с уровнями Фибоначчи.',
          image: {
            '@type': 'ImageObject',
            url: 'https://arapov.trade/assets/img/content/wavesofelliott.webp',
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
          dateModified: '2025-12-12T00:00:00Z',
          mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': 'https://arapov.trade/ru/freestudying/wavesofelliott',
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
      '@id': 'https://arapov.trade/ru/freestudying/wavesofelliott#faq',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'Что такое волны Эллиотта?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Волны Эллиотта — это метод технического анализа, описывающий движение рынка в виде повторяющихся волновых циклов. Полный цикл состоит из восьми волн: пяти импульсных в направлении тренда и трёх коррекционных против него. Теория основана на массовой психологии участников рынка.',
          },
        },
        {
          '@type': 'Question',
          name: 'Какие основные правила волн Эллиотта?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Три фундаментальных правила: волна 2 никогда не опускается ниже начала волны 1; волна 3 никогда не является самой короткой среди импульсных волн; волна 4 не пересекает ценовую территорию волны 1. Нарушение этих правил указывает на ошибку в разметке.',
          },
        },
        {
          '@type': 'Question',
          name: 'Как применять уровни Фибоначчи с волнами Эллиотта?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Уровни 38,2%, 50%, 61,8% определяют глубину коррекционных волн. Расширения 161,8% и 261,8% указывают цели импульсных волн. Третья волна часто достигает 161,8% от длины первой волны. Совпадение волновых целей с уровнями Фибоначчи усиливает торговый сигнал.',
          },
        },
        {
          '@type': 'Question',
          name: 'Какая волна самая прибыльная для торговли?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Третья волна является самой мощной и прибыльной для торговли. Она никогда не бывает самой короткой и часто достигает 161,8-261,8% от первой волны. Вход осуществляется после завершения второй коррекционной волны, когда тренд уже подтверждён рынком.',
          },
        },
        {
          '@type': 'Question',
          name: 'Какие коррекционные паттерны существуют в волновом анализе?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Основные коррекционные паттерны: зигзаг — резкая коррекция ABC; флэт — горизонтальное движение с равными волнами; треугольник — пять волн (A-E), сужающих диапазон. Каждый паттерн указывает на разную силу коррекции и помогает определить момент её завершения.',
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
      '@id': 'https://arapov.trade/ru/freestudying/wavesofelliott#howto',
      name: 'Как применять волны Эллиотта в трейдинге',
      description:
        'Пошаговое руководство по применению волнового анализа Эллиотта для поиска торговых возможностей на финансовых рынках.',
      step: [
        {
          '@type': 'HowToStep',
          position: 1,
          name: 'Определите глобальный тренд',
          text: 'Начните анализ с дневного или недельного графика. Найдите последовательность импульсных волн (1-2-3-4-5), указывающую направление основного тренда. Определите, находится ли рынок в импульсной или коррекционной фазе.',
        },
        {
          '@type': 'HowToStep',
          position: 2,
          name: 'Разметьте волновую структуру',
          text: 'Обозначьте волны на графике, соблюдая три основных правила: волна 2 не ниже начала волны 1, волна 3 не самая короткая, волна 4 не пересекает зону волны 1. Используйте уровни Фибоначчи для проверки пропорций.',
        },
        {
          '@type': 'HowToStep',
          position: 3,
          name: 'Найдите точку входа',
          text: 'Ищите вход после завершения коррекционных волн. Оптимальные точки: конец волны 2 для участия в третьей волне, конец волны 4 для пятой волны, завершение коррекции ABC для нового импульсного цикла.',
        },
        {
          '@type': 'HowToStep',
          position: 4,
          name: 'Установите защитные ордера',
          text: 'Разместите стоп-лосс за началом текущей волны или за ключевым уровнем Фибоначчи. Рассчитайте размер позиции так, чтобы риск не превышал 1-2% от депозита. Обеспечьте соотношение риска к прибыли минимум 1:2.',
        },
        {
          '@type': 'HowToStep',
          position: 5,
          name: 'Определите цель и управляйте позицией',
          text: 'Рассчитайте цель через расширения Фибоначчи: 161,8% для третьей волны, длина волны 1 для пятой волны. Частично фиксируйте прибыль на промежуточных уровнях. Перемещайте стоп-лосс в безубыток после движения в вашу сторону.',
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
      '@id': 'https://arapov.trade/ru/freestudying/wavesofelliott#glossary',
      name: 'Глоссарий терминов волнового анализа',
      description: 'Ключевые термины и определения теории волн Эллиотта',
      hasDefinedTerm: [
        {
          '@type': 'DefinedTerm',
          name: 'Импульсная волна',
          description:
            'Волна, движущаяся в направлении основного тренда. Импульсные волны обозначаются цифрами 1, 3, 5 и формируют основное трендовое движение рынка.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Коррекционная волна',
          description:
            'Волна, направленная против основного тренда. Коррекционные волны обозначаются цифрами 2, 4 и буквами A, B, C, представляя откаты в трендовом движении.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Волновой цикл',
          description:
            'Полная структура из восьми волн: пяти импульсных и трёх коррекционных. Каждый цикл отражает завершённую фазу рыночного движения.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Зигзаг',
          description:
            'Коррекционный паттерн с резкой структурой ABC, где волна C обычно равна или превышает волну A. Часто встречается в волнах 2 и 4.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Флэт',
          description:
            'Горизонтальный коррекционный паттерн, где волны A, B, C имеют примерно равную длину. Указывает на баланс сил между покупателями и продавцами.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Треугольник',
          description:
            'Коррекционный паттерн из пяти волн (A, B, C, D, E), последовательно сужающих ценовой диапазон. Предшествует сильному движению в направлении тренда.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Фрактальность',
          description:
            'Свойство волн Эллиотта, при котором каждая волна старшего порядка содержит полный волновой цикл меньшего масштаба.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Расширение Фибоначчи',
          description:
            'Инструмент для прогнозирования целей импульсных волн. Уровни 161,8% и 261,8% определяют потенциальные точки завершения третьей и пятой волн.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Третья волна',
          description:
            'Самая мощная и длинная волна в импульсном цикле. Никогда не бывает самой короткой среди волн 1, 3, 5. Характеризуется максимальными объёмами торгов.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Волновая разметка',
          description:
            'Процесс идентификации и обозначения волн на ценовом графике согласно правилам теории Эллиотта. Требует соблюдения трёх фундаментальных правил.',
        },
      ],
    };

    this.addJsonLdSchema(data);
  }
}
