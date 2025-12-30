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
  selector: 'app-home-ru-blog-fourty-seven',
  templateUrl: './home-ru-blog-fourty-seven.component.html',
  styleUrl: './home-ru-blog-fourty-seven.component.scss',
})
export class HomeRuBlogFourtySevenComponent implements OnInit {
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
      'Фундаментальный анализ рынка: принципы и методы оценки активов'
    );
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.updateTag({
      name: 'description',
      content:
        'Полное руководство по фундаментальному анализу финансовых рынков. Изучите макроэкономические показатели, оценку компаний и прогнозирование трендов для инвестиций.',
    });

    this.meta.updateTag({ name: 'datePublished', content: '2025-01-19' });
    this.meta.updateTag({
      property: 'og:image',
      content: '/assets/img/content/fundamentalanalysis.webp',
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
          mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': 'https://arapov.trade/ru/freestudying/fundamentalanalysis',
          },
          headline:
            'Фундаментальный анализ рынка: принципы и методы оценки активов',
          description:
            'Полное руководство по фундаментальному анализу финансовых рынков. Изучите макроэкономические показатели, оценку компаний и прогнозирование трендов для инвестиций.',
          image:
            'https://arapov.trade/assets/img/content/fundamentalanalysis.webp',
          datePublished: '2025-01-15T00:00:00+02:00',
          dateModified: '2025-06-15T00:00:00+02:00',
          inLanguage: 'ru',
          author: {
            '@id': 'https://arapov.trade/ru#person',
          },
          publisher: {
            '@type': 'Organization',
            '@id': 'https://arapov.trade/#organization',
            name: 'Arapov.Trade',
            logo: {
              '@type': 'ImageObject',
              url: 'https://arapov.trade/assets/img/favicon.ico',
            },
          },
          video: {
            '@type': 'VideoObject',
            name: 'Фундаментальный анализ рынка | Почему не работает для трейдеров',
            description:
              'Почему фундаментальный анализ рынка не работает для розничных трейдеров? Разбираем метод Вайкоффа и объясняем, как крупные игроки торгуют против новостей, используя инсайдерскую информацию и объёмный анализ.',
            thumbnailUrl: [
              'https://img.youtube.com/vi/6o21L5mLTrA/maxresdefault.jpg',
              'https://img.youtube.com/vi/6o21L5mLTrA/hqdefault.jpg',
            ],
            uploadDate: '2025-06-15T00:00:00+02:00',
            duration: 'PT8M25S',
            contentUrl: 'https://www.youtube.com/watch?v=6o21L5mLTrA',
            embedUrl: 'https://www.youtube.com/embed/6o21L5mLTrA',
            inLanguage: 'ru',
            keywords:
              'фундаментальный анализ, метод Вайкоффа, крупные игроки, инсайдерская информация, трейдинг',
            hasPart: [
              {
                '@type': 'Clip',
                name: 'Почему мы не используем фундаментальный анализ в трейдинге',
                startOffset: 0,
                endOffset: 59,
                url: 'https://www.youtube.com/watch?v=6o21L5mLTrA&t=0',
              },
              {
                '@type': 'Clip',
                name: 'Цитата Ричарда Вайкоффа о крупных операторах рынка',
                startOffset: 59,
                endOffset: 161,
                url: 'https://www.youtube.com/watch?v=6o21L5mLTrA&t=59',
              },
              {
                '@type': 'Clip',
                name: 'Проницательность крупного капитала и инсайдерская информация',
                startOffset: 161,
                endOffset: 210,
                url: 'https://www.youtube.com/watch?v=6o21L5mLTrA&t=161',
              },
              {
                '@type': 'Clip',
                name: 'Крупные деньги торгуют будущую стоимость, а не текущую цену',
                startOffset: 210,
                endOffset: 505,
                url: 'https://www.youtube.com/watch?v=6o21L5mLTrA&t=210',
              },
            ],
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
      mainEntity: [
        {
          '@type': 'Question',
          name: 'Что такое фундаментальный анализ?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Фундаментальный анализ — это метод оценки активов на основе изучения экономических, финансовых и отраслевых факторов. Его цель — определить справедливую стоимость актива и выявить недооценённые или переоценённые инструменты.',
          },
        },
        {
          '@type': 'Question',
          name: 'Какие показатели используются в фундаментальном анализе?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Основные показатели включают: макроэкономические (ВВП, инфляция, процентные ставки), корпоративные (выручка, прибыль, P/E, P/B) и отраслевые (динамика спроса, конкурентная среда, регуляторные изменения).',
          },
        },
        {
          '@type': 'Question',
          name: 'Чем фундаментальный анализ отличается от технического?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Фундаментальный анализ изучает экономические факторы и справедливую стоимость актива для долгосрочных инвестиций. Технический анализ фокусируется на графиках, паттернах и объёмах для краткосрочной торговли.',
          },
        },
        {
          '@type': 'Question',
          name: 'Для каких рынков применим фундаментальный анализ?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Фундаментальный анализ применяется на фондовом рынке (акции, облигации), валютном рынке (влияние решений центробанков), сырьевом рынке (спрос и предложение) и криптовалютном рынке (адаптация, регулирование).',
          },
        },
        {
          '@type': 'Question',
          name: 'Какие ошибки допускают при фундаментальном анализе?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Типичные ошибки: слепое доверие финансовым отчётам, игнорирование макроэкономических факторов, отсутствие диверсификации, недооценка влияния рыночных настроений на краткосрочную динамику.',
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
      name: 'Как проводить фундаментальный анализ',
      step: [
        {
          '@type': 'HowToStep',
          position: 1,
          name: 'Изучите макроэкономику',
          text: 'Проанализируйте ключевые показатели: ВВП, инфляцию, процентные ставки центробанков, уровень безработицы. Эти данные определяют общее состояние экономики.',
        },
        {
          '@type': 'HowToStep',
          position: 2,
          name: 'Оцените отрасль',
          text: 'Изучите динамику спроса и предложения в отрасли, конкурентную среду, регуляторные изменения и технологические тренды, влияющие на сектор.',
        },
        {
          '@type': 'HowToStep',
          position: 3,
          name: 'Проанализируйте компанию',
          text: 'Изучите финансовую отчётность: выручку, чистую прибыль, долговую нагрузку. Рассчитайте ключевые коэффициенты P/E, P/B, ROE для оценки стоимости.',
        },
        {
          '@type': 'HowToStep',
          position: 4,
          name: 'Определите справедливую стоимость',
          text: 'Сравните рыночную цену актива с расчётной справедливой стоимостью. Недооценённые активы представляют инвестиционные возможности.',
        },
        {
          '@type': 'HowToStep',
          position: 5,
          name: 'Учтите риски',
          text: 'Оцените геополитические, валютные и отраслевые риски. Диверсифицируйте портфель для снижения потенциальных потерь.',
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
      name: 'Термины фундаментального анализа',
      hasDefinedTerm: [
        {
          '@type': 'DefinedTerm',
          name: 'Фундаментальный анализ',
          description:
            'Метод оценки активов на основе экономических, финансовых и отраслевых факторов',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Справедливая стоимость',
          description:
            'Расчётная внутренняя стоимость актива на основе фундаментальных показателей',
        },
        {
          '@type': 'DefinedTerm',
          name: 'P/E',
          description:
            'Коэффициент цена/прибыль, показывающий сколько инвесторы платят за единицу прибыли',
        },
        {
          '@type': 'DefinedTerm',
          name: 'P/B',
          description:
            'Коэффициент цена/балансовая стоимость, сравнивающий рыночную и бухгалтерскую стоимость',
        },
        {
          '@type': 'DefinedTerm',
          name: 'ВВП',
          description:
            'Валовой внутренний продукт, измеряющий общий объём производства экономики',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Инфляция',
          description:
            'Рост общего уровня цен, снижающий покупательную способность валюты',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Процентная ставка',
          description:
            'Ставка центрального банка, влияющая на стоимость заимствований в экономике',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Дивидендная доходность',
          description: 'Отношение годовых дивидендов к рыночной цене акции',
        },
        {
          '@type': 'DefinedTerm',
          name: 'ROE',
          description:
            'Рентабельность собственного капитала, измеряющая эффективность использования капитала',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Долговая нагрузка',
          description:
            'Соотношение заёмных средств к собственному капиталу компании',
        },
      ],
    };

    this.addJsonLdSchema(data);
  }
}
