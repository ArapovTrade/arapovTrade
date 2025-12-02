import {
  Component,
  OnInit,
  Inject,
  signal,
  ChangeDetectorRef,
  ChangeDetectionStrategy,
  AfterViewInit,
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
    this.themeSubscription = this.themeService.getTheme().subscribe((data) => {
      this.isDark = data;
      this.cdr.detectChanges();
    });

    this.ukrGroups = this.artickleServ.getRussianGroups();
    this.grr = this.artickleServ.selectedGroups;
    this.updateArticleCounts();
    this.checkedGroup = this.artickleServ.selectedGroups;

    this.removeExistingWebPageSchema();
    this.titleService.setTitle(
      'Бесплатное обучение трейдингу для начинающих с нуля | Игорь Арапов'
    );
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.updateTag({
      name: 'description',
      content:
        'Бесплатный курс по трейдингу: 130+ статей и 70 видеоуроков. Изучите основы, анализ, психологию торговли и проверенные стратегии',
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
    this.addJsonLdScript();
    this.addCourseSchema();
    this.addVideoObjectSchema();
    this.addArtickleSchema();

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

  private addJsonLdScript(): void {
    const jsonLdScript = this.document.createElement('script');
    jsonLdScript.type = 'application/ld+json';
    jsonLdScript.text = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'HowTo',
      name: 'Как пройти бесплатный курс по трейдингу от Игоря Арапова',
      description:
        'Пошаговая инструкция для самостоятельного прохождения бесплатного онлайн-курса трейдинга.',
      author: { '@type': 'Person', name: 'Игорь Арапов' },
      publisher: {
        '@type': 'Organization',
        name: 'Игорь Арапов',
        logo: {
          '@type': 'ImageObject',
          url: 'https://arapov.trade/favicon.ico',
        },
      },
      license: 'https://creativecommons.org/licenses/by-nc-sa/4.0/',
      mainEntityOfPage: {
        '@type': 'WebPage',
        '@id': 'https://arapov.trade/ru/freestudying/freeeducation',
      },
      step: [
        {
          '@type': 'HowToStep',
          name: 'Ознакомьтесь с программой курса',
          text: 'Перейдите к разделу «Программа курса» и изучите, из чего состоит обучение.',
          url: 'https://arapov.trade/ru/freestudying/freeeducation#section1',
        },
        {
          '@type': 'HowToStep',
          name: 'Пройдите модуль «Трейдинг для начинающих»',
          text: 'Разберитесь с базовыми понятиями и основами биржевой торговли.',
          url: 'https://arapov.trade/ru/freestudying/freeeducation#section2',
        },
        {
          '@type': 'HowToStep',
          name: 'Изучите технический анализ',
          text: 'Освойте базовые паттерны поведения цены, фигуры разворота , уровни.',
          url: 'https://arapov.trade/ru/freestudying/freeeducation#section3',
        },
        {
          '@type': 'HowToStep',
          name: 'Погрузитесь в объёмный анализ',
          text: 'Научитесь читать биржевые объемы и познакомьтесь с концепцией Ричарда Вайкоффа.',
          url: 'https://arapov.trade/ru/freestudying/freeeducation#section4',
        },
        {
          '@type': 'HowToStep',
          name: 'Освойте стратегию Smart Money',
          text: 'Узнайте, как работают крупные участники рынка и как следовать за ними.',
          url: 'https://arapov.trade/ru/freestudying/freeeducation#section5',
        },
        {
          '@type': 'HowToStep',
          name: 'Изучите психологию трейдинга',
          text: 'Разберитесь, как контролировать эмоции и мыслить как профи.',
          url: 'https://arapov.trade/ru/freestudying/freeeducation#section6',
        },
        {
          '@type': 'HowToStep',
          name: 'Проанализируйте торговые примеры',
          text: 'Разбор сделок поможет понять, как применять теорию на практике.',
          url: 'https://arapov.trade/ru/freestudying/freeeducation#section9',
        },
        {
          '@type': 'HowToStep',
          name: 'Ознакомьтесь с часто задаваемыми вопросами',
          text: 'Ответы на распространенные вопросы по курсу и трейдингу.',
          url: 'https://arapov.trade/ru/freestudying/freeeducation#section11',
        },
        {
          '@type': 'HowToStep',
          name: 'Подведите итоги курса',
          text: 'Сделайте для себя ключевые выводы и подготовьтесь к самостоятельной торговле.',
          url: 'https://arapov.trade/ru/freestudying/freeeducation#section10',
        },
      ],
    });
    this.document.head.appendChild(jsonLdScript);
  }

  private addCourseSchema(): void {
    const script = this.document.createElement('script');
    script.type = 'application/ld+json';

    script.text = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      '@id': 'https://arapov.trade/ru/freestudying/freeeducation#section1',
      url: 'https://arapov.trade/ru/freestudying/freeeducation',
      name: 'Бесплатный курс по трейдингу от Игоря Арапова',
      description:
        'Бесплатный курс по трейдингу: 130+ статей и 70 видеоуроков. Изучите основы, анализ, психологию торговли и проверенные стратегии',
      inLanguage: 'ru',
      mainEntity: { '@id': 'https://arapov.trade/ru/studying' },
    });

    this.document.head.appendChild(script);
  }
  private addVideoObjectSchema() {
    // Проверяем, есть ли уже такой VideoObject в head
    const exists = Array.from(
      this.document.querySelectorAll('script[type="application/ld+json"]')
    ).some((script) => {
      try {
        const json = JSON.parse(script.textContent || '{}');
        return (
          json['@type'] === 'VideoObject' &&
          json['name'] === 'Бесплатный курс по трейдингу — обзор программы'
        );
      } catch {
        return false;
      }
    });

    // Если уже существует — выходим
    if (exists) return;

    // Создаем новый JSON-LD
    const script = this.document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'VideoObject',
      name: 'Бесплатный курс по трейдингу — обзор программы',
      description:
        'Подробный разбор бесплатного курса по трейдингу: на что обращать внимание, зачем нужны разные разделы и какие ключевые темы в них раскрываются.',
      thumbnailUrl: 'https://img.youtube.com/vi/ZHhJqYzyaO4/maxresdefault.jpg',
      uploadDate: '2024-01-15',
      duration: 'PT15M',
      contentUrl: 'https://www.youtube.com/watch?v=ZHhJqYzyaO4',
      embedUrl: 'https://www.youtube.com/embed/ZHhJqYzyaO4',
      author: {
        '@type': 'Person',
        name: 'Игорь Арапов',
      },
    });

    this.document.head.appendChild(script);
  }
  private addArtickleSchema() {
    // Проверяем, есть ли уже ItemList в head
    const exists = Array.from(
      this.document.querySelectorAll('script[type="application/ld+json"]')
    ).some((script) => {
      try {
        const json = JSON.parse(script.textContent || '{}');
        return (
          json['@type'] === 'ItemList' &&
          json['name'] === 'Разделы курса по трейдингу'
        );
      } catch {
        return false;
      }
    });

    // Если уже существует — выходим
    if (exists) return;

    // Создаем новый JSON-LD
    const script = this.document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'ItemList',
      name: 'Разделы курса по трейдингу',
      description: 'Структура бесплатного курса по трейдингу для начинающих',
      numberOfItems: 6,
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Трейдинг для начинающих',
          description:
            'Основы профессии, мифы о трейдинге, типичные ошибки новичков',
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: 'Технический анализ рынка',
          description:
            'Фазы рынка, тренды, уровни поддержки и сопротивления, разворотные модели',
        },
        {
          '@type': 'ListItem',
          position: 3,
          name: 'Объёмный анализ',
          description:
            'Вертикальный и горизонтальный объём, метод Вайкоффа, принцип усилие-результат',
        },
        {
          '@type': 'ListItem',
          position: 4,
          name: 'Smart Money',
          description:
            'Концепция умных денег, манипуляции крупных игроков, ликвидность',
        },
        {
          '@type': 'ListItem',
          position: 5,
          name: 'Психология трейдинга',
          description:
            'Страх и жадность, дисциплина, мышление профессионального трейдера',
        },
        {
          '@type': 'ListItem',
          position: 6,
          name: 'Практика и примеры сделок',
          description:
            'Торговая система, расчёт позиции, риск-менеджмент, примеры входов',
        },
      ],
    });

    this.document.head.appendChild(script);
  }
  private removeExistingWebPageSchema(): void {
    const scripts = this.document.querySelectorAll(
      'script[type="application/ld+json"]'
    );

    scripts.forEach((script) => {
      try {
        const content = JSON.parse(script.textContent || '{}');
        if (content['@type'] === 'WebPage') {
          script.remove();
        }
        if (content['@type'] === 'HowTo') {
          script.remove();
        }
         if (content['@type'] === 'ItemList') {
          script.remove();
        }
        if (content['@type'] === 'VideoObject') {
          script.remove();
        }
      } catch (e) {
        // Игнорируем некорректные JSON (например, из других источников)
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
}
