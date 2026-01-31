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
  selector: 'app-home-ru-blog-three',
  templateUrl: './home-ru-blog-three.component.html',
  styleUrl: './home-ru-blog-three.component.scss',
})
export class HomeRuBlogThreeComponent implements OnInit {
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
      'Волатильность в трейдинге: измерение и применение ATR | Arapov.trade',
    );
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.updateTag({
      name: 'description',
      content:
        'Волатильность в трейдинге: полное руководство по измерению рыночных колебаний с помощью индикатора ATR и практическому применению в торговле',
    });

    this.meta.updateTag({
      property: 'og:image',
      content: '/assets/img/content/volatility44.webp',
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
          headline:
            'Волатильность в трейдинге: полное руководство по измерению и применению',
          description:
            'Подробное руководство по волатильности финансовых рынков: типы волатильности, индикатор ATR, практическое применение для управления рисками',
          image: 'https://arapov.trade/assets/img/content/volatility1.webp',
          datePublished: '2025-04-15T00:00:00Z',
          dateModified: '2025-12-29T00:00:00Z',
          author: {
            '@id': 'https://arapov.trade/ru#person',
          },
          publisher: {
            '@type': 'Organization',
            name: 'Arapov.trade',
            url: 'https://arapov.trade',
            logo: {
              '@type': 'ImageObject',
              url: 'https://arapov.trade/assets/img/favicon.ico',
            },
          },
          mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': 'https://arapov.trade/ru/freestudying/volatility',
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
          name: 'Что такое волатильность в трейдинге?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Волатильность — это статистическая мера разброса доходности актива за определённый период. Высокая волатильность означает значительные ценовые колебания, низкая — стабильное поведение цены.',
          },
        },
        {
          '@type': 'Question',
          name: 'Как работает индикатор ATR?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'ATR (Average True Range) измеряет средний истинный диапазон ценовых колебаний, учитывая гэпы. Истинный диапазон — максимум из разницы максимума-минимума и отклонений от предыдущего закрытия.',
          },
        },
        {
          '@type': 'Question',
          name: 'Как использовать ATR для стоп-лосса?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Типичный подход — установка стоп-лосса на расстоянии 1.5-3 значений ATR от точки входа. Это позволяет учесть текущую волатильность и избежать преждевременного срабатывания стопа.',
          },
        },
        {
          '@type': 'Question',
          name: 'Чем отличается историческая волатильность от подразумеваемой?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Историческая волатильность рассчитывается по прошлым ценам, подразумеваемая — извлекается из цен опционов и отражает ожидания рынка относительно будущих колебаний.',
          },
        },
        {
          '@type': 'Question',
          name: 'На каком рынке самая высокая волатильность?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Криптовалютный рынок отличается наивысшей волатильностью — дневные колебания 10-20% не редкость. Форекс относительно стабилен, фондовый рынок демонстрирует секторальную дифференциацию.',
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
      name: 'Как применять ATR в торговле',
      description:
        'Пошаговое руководство по использованию индикатора ATR для управления рисками и определения торговых параметров',
      step: [
        {
          '@type': 'HowToStep',
          position: 1,
          name: 'Настройте ATR на графике',
          text: 'Добавьте индикатор ATR на график с периодом 14 (стандартное значение). Для краткосрочной торговли используйте меньший период, для долгосрочной — больший.',
        },
        {
          '@type': 'HowToStep',
          position: 2,
          name: 'Определите текущий уровень волатильности',
          text: 'Сравните текущее значение ATR с историческим средним. Высокое значение указывает на активный рынок, низкое — на период консолидации.',
        },
        {
          '@type': 'HowToStep',
          position: 3,
          name: 'Рассчитайте стоп-лосс',
          text: 'Установите стоп-лосс на расстоянии 1.5-3 ATR от точки входа. Используйте больший множитель для волатильных инструментов.',
        },
        {
          '@type': 'HowToStep',
          position: 4,
          name: 'Определите целевую прибыль',
          text: 'Установите тейк-профит как кратное ATR — обычно 2-4 значения от точки входа в зависимости от стратегии.',
        },
        {
          '@type': 'HowToStep',
          position: 5,
          name: 'Рассчитайте размер позиции',
          text: 'Нормализуйте риск между инструментами: активы с высоким ATR получают меньший размер позиции для поддержания постоянного денежного риска.',
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
      name: 'Глоссарий терминов волатильности',
      hasDefinedTerm: [
        {
          '@type': 'DefinedTerm',
          name: 'Волатильность',
          description:
            'Статистическая мера разброса доходности актива, отражающая интенсивность ценовых колебаний',
        },
        {
          '@type': 'DefinedTerm',
          name: 'ATR',
          description:
            'Average True Range — индикатор среднего истинного диапазона для измерения волатильности',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Истинный диапазон',
          description:
            'Максимальное значение из трёх величин: High-Low, |High-Close_prev|, |Low-Close_prev|',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Историческая волатильность',
          description:
            'Волатильность, рассчитанная на основе прошлых ценовых данных',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Подразумеваемая волатильность',
          description:
            'Ожидаемая волатильность, извлечённая из цен опционных контрактов',
        },
        {
          '@type': 'DefinedTerm',
          name: 'VIX',
          description:
            'Индекс волатильности, измеряющий ожидания рынка опционов на S&P 500',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Полосы Боллинджера',
          description:
            'Индикатор волатильности в виде канала вокруг скользящей средней',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Стандартное отклонение',
          description:
            'Статистическая мера разброса значений относительно среднего',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Динамический стоп-лосс',
          description:
            'Защитный уровень, адаптирующийся к текущей волатильности рынка',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Режим волатильности',
          description:
            'Текущее состояние рынка с точки зрения интенсивности ценовых колебаний',
        },
      ],
    };

    this.addJsonLdSchema(data);
  }
}
